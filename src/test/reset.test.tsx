// Reinício do progresso de estudos (pacote v4, etapa 7; checklist 20_CHECKLIST_RESET_PROGRESSO).
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import { StudyProvider } from '@/app/StudyProvider';
import { PrefsProvider } from '@/app/prefs';
import { AppRoutes } from '@/App';
import { waitForRouteReady } from './route-ready';
import { emptyData, type StudyData } from '@/lib/model';
import { mergeData } from '@/lib/merge';
import { dropBefore, progressStoreKeys, resetFeedState, resetProgress } from '@/lib/reset';
import { hasData, loadData, loadPrefs, readBackup, savePrefs } from '@/lib/storage';
import { pickRecovery } from '@/lib/localdb';
import { syncAll } from '@/lib/sync';
import { trailUnits } from '@/app/useCheckpoint';

vi.mock('@/lib/supabase', () => ({ supabase: null }));

const OLD = '2026-10-20T10:00:00.000Z';
const RESET = '2026-10-25T12:00:00.000Z';
const NEW = '2026-10-26T09:00:00.000Z';

/** Progresso de exemplo em todas as fontes do StudyData. */
function studied(at = OLD): StudyData {
  const u = trailUnits();
  const d = emptyData();
  d.attempts = [{ id: 'a1', contestId: 'c', questionId: 'q1', topicId: 't', selectedOption: 'A', isCorrect: true, context: 'practice', answeredAt: at }];
  d.xp = [{ id: 'x1', kind: 'question_first_correct', refId: 'q1', amount: 10, createdAt: at }];
  d.reading = { cap: { chapterId: 'cap', sectionsRead: ['s1'], updatedAt: at } };
  d.lessons = { l1: { lessonId: 'l1', bestScore: 1, firstCompletedAt: at, lastCompletedAt: at } };
  d.exams = { e1: { id: 'e1', contestId: 'c', questionIds: ['q1'], answers: {}, startedAt: at, finishedAt: at, correct: 1 } };
  d.cards = { k1: { cardId: 'k1', dueAt: at, intervalDays: 1, ease: 2.5, reps: 1, lapses: 0, updatedAt: at } };
  d.unitLog = { [u[0].key]: at, [u[1].key]: at };
  d.progress = { [u[2].key]: { step: 3, label: 'Etapa 4', updatedAt: at } };
  d.story = { choices: { m: 'x' }, trust: {}, clues: [], reviews: {}, updatedAt: at };
  d.bookmarks = [{ id: 'b1', chapterId: 'cap', sectionId: 's1', createdAt: at }];
  d.essays = { p1: { promptId: 'p1', body: 'Minha redação', checklist: [], updatedAt: at } };
  d.settings = { minutesPerDay: 90, weekdays: [1, 2, 3], dailyQuestionGoal: 20, updatedAt: at };
  d.pending.attempts = ['a1'];
  d.pending.essays = ['p1'];
  return d;
}

const studyCount = (d: StudyData) =>
  d.attempts.length + d.xp.length + Object.keys(d.reading).length + Object.keys(d.lessons).length + Object.keys(d.exams).length + Object.keys(d.cards).length + Object.keys(d.unitLog ?? {}).length + Object.keys(d.progress ?? {}).length + (d.story ? 1 : 0);

describe('regra do reinício (pura)', () => {
  it('limpa todas as fontes de progresso e mantém marcadores, redações e meta', () => {
    const r = resetProgress(studied(), RESET);
    expect(studyCount(r)).toBe(0);
    expect(r.progressResetAt).toBe(RESET);
    expect(r.bookmarks).toHaveLength(1);
    expect(r.essays.p1.body).toBe('Minha redação');
    expect(r.settings?.minutesPerDay).toBe(90);
    expect(r.pending.reset).toBe(true);
    expect(r.pending.attempts).toEqual([]);
    expect(r.pending.essays).toEqual(['p1']);
    // Idempotente: reiniciar de novo não traz nada e só avança a marca.
    const again = resetProgress(r, NEW);
    expect(studyCount(again)).toBe(0);
    expect(again.progressResetAt).toBe(NEW);
  });

  it('um estado antigo que chega depois (outro aparelho, sync atrasada) não volta', () => {
    const local = resetProgress(studied(), RESET);
    const lateOld = studied(OLD);
    const merged = mergeData(lateOld, local);
    expect(studyCount(merged)).toBe(0);
    expect(merged.progressResetAt).toBe(RESET);
    // Ao contrário também: a marca vale venha de qual lado vier.
    expect(studyCount(mergeData(local, lateOld))).toBe(0);
    // O que foi estudado depois do reinício conta normalmente.
    const fresh = studied(NEW);
    const m2 = mergeData(local, fresh);
    expect(m2.attempts.map((a) => a.id)).toEqual(['a1']);
    expect(m2.attempts[0].answeredAt).toBe(NEW);
  });

  it('dropBefore remove só o anterior à marca e as pendências dele', () => {
    const d = studied(OLD);
    d.attempts.push({ ...d.attempts[0], id: 'a2', answeredAt: NEW });
    d.pending.attempts = ['a1', 'a2'];
    const out = dropBefore(d, RESET);
    expect(out.attempts.map((a) => a.id)).toEqual(['a2']);
    expect(out.pending.attempts).toEqual(['a2']);
    expect(dropBefore(d, undefined)).toBe(d);
  });

  it('o espelho do IndexedDB não restaura o progresso antigo depois do reinício', () => {
    const r = resetProgress(studied(), RESET);
    expect(hasData(r)).toBe(true);
    const snap = { owner: 'ana', savedAt: OLD, data: studied() };
    expect(pickRecovery(r, snap, hasData)).toBeNull();
  });

  it('só toca nas chaves de andamento de estudo; feed mantém notas, dúvidas e guardados', () => {
    const keys = ['cronicas:prefs:v4', 'cronicas:mundo:escritorio', 'cronicas:cenario:suporte-lento', 'cronicas:plano:v2:visitante:2026-10-25', 'cronicas:plano:v2:outra:2026-10-25', 'cronicas:plan-snapshots', 'cronicas:videos-proprios', 'cronicas:v1:visitante', 'cronicas:backup:visitante', 'outro-app'];
    expect(progressStoreKeys(keys, 'visitante')).toEqual(['cronicas:mundo:escritorio', 'cronicas:cenario:suporte-lento', 'cronicas:plano:v2:visitante:2026-10-25', 'cronicas:plan-snapshots']);
    const feed = { cursor: { l: 4 }, answers: { p: true }, react: { a: { entendi: true }, b: { salvo: true, rever: true } }, notes: { a: 'nota' }, questions: { b: 'dúvida' } };
    expect(resetFeedState(feed)).toEqual({ cursor: {}, answers: {}, react: { b: { salvo: true } }, notes: { a: 'nota' }, questions: { b: 'dúvida' } });
  });
});

/** Supabase falso, só com o necessário para a sincronização. */
function fakeSupabase(tables: Record<string, unknown[]>, profile: { progress_reset_at: string | null } | null) {
  const calls: { table: string; op: string; payload?: unknown }[] = [];
  const result = (data: unknown) => {
    const p = Promise.resolve({ data, error: null });
    const q: Record<string, unknown> = {
      eq: () => q,
      maybeSingle: () => Promise.resolve({ data: profile, error: null }),
      select: () => Promise.resolve({ data: profile ? [{ id: 'u' }] : [], error: null }),
      then: p.then.bind(p),
    };
    return q;
  };
  const sb = {
    from: (table: string) => ({
      select: () => result(tables[table] ?? []),
      upsert: (payload: unknown) => (calls.push({ table, op: 'upsert', payload }), Promise.resolve({ error: null })),
      update: (payload: unknown) => (calls.push({ table, op: 'update', payload }), result(null)),
      delete: () => result(null),
    }),
  } as unknown as SupabaseClient;
  return { sb, calls };
}

describe('reinício e sincronização', () => {
  it('sobe a marca para o perfil e não traz de volta o histórico antigo do servidor', async () => {
    const remoteOld = {
      question_attempts: [{ id: 'r1', contest_id: 'c', question_id: 'q9', topic_id: 't', selected_option: 'B', is_correct: false, context: 'pratica', answered_at: OLD }],
      xp_events: [{ id: 'rx', kind: 'question', ref_id: 'q9', amount: 5, created_at: OLD }],
      reading_progress: [{ chapter_id: 'cap', sections_read: ['s1', 's2'], updated_at: OLD }],
    };
    const { sb, calls } = fakeSupabase(remoteOld, { progress_reset_at: null });
    const local = resetProgress(studied(), RESET);
    const out = await syncAll(sb, 'u', local);
    expect(studyCount(out)).toBe(0);
    expect(calls).toContainEqual({ table: 'profiles', op: 'update', payload: { progress_reset_at: RESET } });
    expect(out.pending.reset).toBeFalsy();
    // Nada de progresso antigo é reenviado (redação e meta de estudo são mantidas e podem subir).
    expect(calls.filter((c) => c.op === 'upsert' && !['essay_answers', 'study_settings'].includes(c.table))).toEqual([]);
  });

  it('reinício feito em outro aparelho vale aqui; sem perfil gravado, a marca segue pendente', async () => {
    const { sb } = fakeSupabase({}, { progress_reset_at: RESET });
    const out = await syncAll(sb, 'u', studied(OLD));
    expect(studyCount(out)).toBe(0);
    expect(out.progressResetAt).toBe(RESET);
    expect(out.pending.reset).toBeFalsy();

    const noProfile = fakeSupabase({}, null);
    const out2 = await syncAll(noProfile.sb, 'u', resetProgress(studied(), RESET));
    expect(out2.pending.reset).toBe(true);
  });
});

function renderAt(path: string) {
  return render(
    <PrefsProvider>
      <StudyProvider>
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>
      </StudyProvider>
    </PrefsProvider>,
  );
}

describe('tela de reinício', () => {
  const KEY = 'cronicas:v1:visitante';
  const seed = () => {
    localStorage.clear();
    localStorage.setItem(KEY, JSON.stringify(studied(new Date(Date.now() - 86400000).toISOString())));
    localStorage.setItem('cronicas:feed:v1', JSON.stringify({ cursor: { x: 3 }, answers: { p: true }, react: { p: { entendi: true } }, notes: { p: 'nota minha' }, questions: {} }));
    localStorage.setItem('cronicas:mundo:escritorio', JSON.stringify({ pos: [3, 3] }));
    localStorage.setItem('cronicas:cenario:suporte-lento', JSON.stringify({ node: 'n2' }));
    savePrefs({ fontScale: 1.2, theme: 'dark', sounds: { chuva: { on: true, vol: 0.3 } } });
  };

  it('cancelar não muda nada; a ação exige marcar a confirmação', async () => {
    seed();
    const before = localStorage.getItem(KEY);
    const user = userEvent.setup();
    renderAt('/conta/dados');
    await waitForRouteReady();
    await user.click(screen.getByTestId('abrir-reinicio'));
    const dialog = screen.getByRole('dialog', { name: 'Reiniciar todo o progresso?' });
    expect(dialog).toHaveTextContent('Volta ao zero');
    expect(dialog).toHaveTextContent('Continua como está');
    expect(screen.getByTestId('reinicio-confirmar')).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Cancelar' }));
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(localStorage.getItem(KEY)).toBe(before);
    expect(localStorage.getItem('cronicas:mundo:escritorio')).not.toBeNull();
  });

  it('confirmar reinicia tudo, guarda cópia, mantém preferências e Continuar volta à primeira etapa', async () => {
    seed();
    const user = userEvent.setup();
    const first = renderAt('/');
    const start = trailUnits()[0].to;
    const before = screen.getByTestId('continuar-topo').getAttribute('href');
    expect(before).not.toBe(start);
    first.unmount();

    const view = renderAt('/conta/dados');
    await waitForRouteReady();
    await user.click(screen.getByTestId('abrir-reinicio'));
    await user.click(screen.getByTestId('reinicio-confirmo'));
    await user.click(screen.getByTestId('reinicio-confirmar'));
    await screen.findByText('Progresso reiniciado neste aparelho.');
    view.unmount();

    // Recarregar: o estado zerado vem do armazenamento, não da memória.
    const d = loadData('visitante');
    expect(studyCount(d)).toBe(0);
    expect(d.bookmarks).toHaveLength(1);
    expect(d.essays.p1).toBeTruthy();
    expect(d.settings?.minutesPerDay).toBe(90);
    expect(readBackup('visitante')?.reason).toMatch(/reiniciar/);
    expect(JSON.parse(readBackup('visitante')!.raw).attempts).toHaveLength(1);
    expect(localStorage.getItem('cronicas:mundo:escritorio')).toBeNull();
    expect(localStorage.getItem('cronicas:cenario:suporte-lento')).toBeNull();
    const feed = JSON.parse(localStorage.getItem('cronicas:feed:v1')!);
    expect(feed.cursor).toEqual({});
    expect(feed.answers).toEqual({});
    expect(feed.notes).toEqual({ p: 'nota minha' });
    const prefs = loadPrefs();
    expect(prefs.theme).toBe('dark');
    expect(prefs.fontScale).toBe(1.2);
    expect(prefs.sounds?.chuva).toEqual({ on: true, vol: 0.3 });

    renderAt('/');
    await waitFor(() => expect(screen.getByTestId('continuar-topo').getAttribute('href')).toBe(start));
  });
});
