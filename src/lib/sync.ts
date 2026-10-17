// Sincronização com o Supabase: puxa o remoto, funde com o local e envia as pendências.
// Todos os envios são idempotentes (ids gerados no cliente + restrições de unicidade).
import type { SupabaseClient } from '@supabase/supabase-js';
import { emptyData, emptyPending, type StudyData } from './model';
import { mergeData } from './merge';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

/** Normaliza timestamps do Postgres para o formato ISO usado localmente. */
const iso = (v: string | null | undefined) => (v ? new Date(v).toISOString() : undefined);
const same = (a: unknown, b: unknown) => JSON.stringify(a, Object.keys(a ?? {}).sort()) === JSON.stringify(b, Object.keys(b ?? {}).sort());

export async function pullRemote(sb: SupabaseClient, userId: string): Promise<StudyData> {
  const [att, rp, bm, les, xp] = await Promise.all([
    sb.from('question_attempts').select('*').eq('user_id', userId),
    sb.from('reading_progress').select('*').eq('user_id', userId),
    sb.from('bookmarks').select('*').eq('user_id', userId),
    sb.from('lesson_completions').select('*').eq('user_id', userId),
    sb.from('xp_events').select('*').eq('user_id', userId),
  ]);
  const err = att.error ?? rp.error ?? bm.error ?? les.error ?? xp.error;
  if (err) throw err;
  const d = emptyData();
  d.attempts = (att.data as Row[]).map((r) => ({
    id: r.id,
    contestId: r.contest_id,
    questionId: r.question_id,
    topicId: r.topic_id,
    selectedOption: r.selected_option,
    isCorrect: r.is_correct,
    context: r.context,
    contextRef: r.context_ref ?? undefined,
    answeredAt: iso(r.answered_at)!,
  }));
  for (const r of rp.data as Row[]) {
    d.reading[r.chapter_id] = {
      chapterId: r.chapter_id,
      lastSectionId: r.last_section_id ?? undefined,
      sectionsRead: r.sections_read ?? [],
      completedAt: iso(r.completed_at),
      updatedAt: iso(r.updated_at)!,
    };
  }
  d.bookmarks = (bm.data as Row[]).map((r) => ({ id: r.id, chapterId: r.chapter_id, sectionId: r.section_id, createdAt: iso(r.created_at)! }));
  for (const r of les.data as Row[]) {
    d.lessons[r.lesson_id] = {
      lessonId: r.lesson_id,
      bestScore: r.best_score,
      firstCompletedAt: iso(r.first_completed_at)!,
      lastCompletedAt: iso(r.last_completed_at)!,
    };
  }
  d.xp = (xp.data as Row[]).map((r) => ({ id: r.id, kind: r.kind, refId: r.ref_id, amount: r.amount, createdAt: iso(r.created_at)! }));
  return d;
}

export async function pushPending(sb: SupabaseClient, userId: string, data: StudyData): Promise<StudyData> {
  const p = data.pending;
  const left = emptyPending();

  const attempts = data.attempts.filter((a) => p.attempts.includes(a.id));
  if (attempts.length) {
    const { error } = await sb.from('question_attempts').upsert(
      attempts.map((a) => ({
        id: a.id,
        user_id: userId,
        contest_id: a.contestId,
        question_id: a.questionId,
        topic_id: a.topicId,
        selected_option: a.selectedOption,
        is_correct: a.isCorrect,
        context: a.context,
        context_ref: a.contextRef ?? null,
        answered_at: a.answeredAt,
      })),
      { onConflict: 'id', ignoreDuplicates: true },
    );
    if (error) left.attempts = p.attempts;
  }

  const xp = data.xp.filter((e) => p.xp.includes(e.id));
  if (xp.length) {
    const { error } = await sb
      .from('xp_events')
      .upsert(
        xp.map((e) => ({ id: e.id, user_id: userId, kind: e.kind, ref_id: e.refId, amount: e.amount, created_at: e.createdAt })),
        { onConflict: 'user_id,kind,ref_id', ignoreDuplicates: true },
      );
    if (error) left.xp = p.xp;
  }

  const reading = p.reading.map((id) => data.reading[id]).filter(Boolean);
  if (reading.length) {
    const { error } = await sb.from('reading_progress').upsert(
      reading.map((r) => ({
        user_id: userId,
        chapter_id: r.chapterId,
        last_section_id: r.lastSectionId ?? null,
        sections_read: r.sectionsRead,
        completed_at: r.completedAt ?? null,
        updated_at: r.updatedAt,
      })),
      { onConflict: 'user_id,chapter_id' },
    );
    if (error) left.reading = p.reading;
  }

  const lessons = p.lessons.map((id) => data.lessons[id]).filter(Boolean);
  if (lessons.length) {
    const { error } = await sb.from('lesson_completions').upsert(
      lessons.map((l) => ({
        user_id: userId,
        lesson_id: l.lessonId,
        best_score: l.bestScore,
        first_completed_at: l.firstCompletedAt,
        last_completed_at: l.lastCompletedAt,
      })),
      { onConflict: 'user_id,lesson_id' },
    );
    if (error) left.lessons = p.lessons;
  }

  const bookmarks = data.bookmarks.filter((b) => p.bookmarks.includes(b.id));
  if (bookmarks.length) {
    const { error } = await sb
      .from('bookmarks')
      .upsert(
        bookmarks.map((b) => ({ id: b.id, user_id: userId, chapter_id: b.chapterId, section_id: b.sectionId, created_at: b.createdAt })),
        { onConflict: 'user_id,chapter_id,section_id', ignoreDuplicates: true },
      );
    if (error) left.bookmarks = p.bookmarks;
  }

  for (const d of p.bookmarkDeletes) {
    const { error } = await sb.from('bookmarks').delete().eq('user_id', userId).eq('chapter_id', d.chapterId).eq('section_id', d.sectionId);
    if (error) left.bookmarkDeletes.push(d);
  }

  return { ...data, pending: left };
}

/**
 * Ciclo completo. Puxa primeiro para que os registros mutáveis (leitura, lições) sejam
 * enviados já fundidos com o que existe em outros dispositivos.
 */
export async function syncAll(sb: SupabaseClient, userId: string, local: StudyData): Promise<StudyData> {
  const remote = await pullRemote(sb, userId);
  // Marcadores apagados localmente e ainda não enviados não devem "voltar" do remoto.
  remote.bookmarks = remote.bookmarks.filter(
    (b) => !local.pending.bookmarkDeletes.some((d) => d.chapterId === b.chapterId && d.sectionId === b.sectionId),
  );
  const merged = mergeData(remote, local);
  // Registros mutáveis que mudaram pela fusão precisam ser reenviados.
  merged.pending.reading = Object.keys(merged.reading).filter(
    (k) => merged.pending.reading.includes(k) || !same(merged.reading[k], remote.reading[k]),
  );
  merged.pending.lessons = Object.keys(merged.lessons).filter(
    (k) => merged.pending.lessons.includes(k) || !same(merged.lessons[k], remote.lessons[k]),
  );
  const pushed = await pushPending(sb, userId, merged);
  return { ...pushed, lastSyncAt: new Date().toISOString() };
}
