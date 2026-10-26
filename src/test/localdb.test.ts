import 'fake-indexeddb/auto';
import { emptyData } from '@/lib/model';
import { getChapter, questionsForContest, DEFAULT_CONTEST_ID } from '@/content';
import { markSectionRead, recordAnswer } from '@/lib/study';
import { clearData, hasData, loadData, readBackup, saveData } from '@/lib/storage';
import { getSnapshot, pickRecovery, putSnapshot } from '@/lib/localdb';
import { mergeData } from '@/lib/merge';

beforeEach(() => localStorage.clear());

describe('armazenamento local sem perda silenciosa', () => {
  it('versão desconhecida ou JSON quebrado: guarda cópia de segurança e não apaga o original', () => {
    localStorage.setItem('cronicas:v1:ana', JSON.stringify({ version: 2, attempts: [1] }));
    expect(hasData(loadData('ana'))).toBe(false);
    expect(readBackup('ana')?.reason).toMatch(/versão desconhecida/);
    expect(localStorage.getItem('cronicas:v1:ana')).toContain('"version":2');
    localStorage.setItem('cronicas:v1:bia', '{quebrado');
    loadData('bia');
    expect(readBackup('bia')?.raw).toBe('{quebrado');
  });

  it('limpar após migração guarda cópia antes de remover', () => {
    const d = markSectionRead(emptyData(), getChapter('cap.seg.01')!, 'fundamentos').data;
    saveData('visitante', d);
    clearData('visitante');
    expect(localStorage.getItem('cronicas:v1:visitante')).toBeNull();
    expect(JSON.parse(readBackup('visitante')!.raw).reading['cap.seg.01'].sectionsRead).toEqual(['fundamentos']);
  });

  it('espelho no IndexedDB: grava, lê depois de reabrir e recupera se a cópia principal sumiu', async () => {
    const q = questionsForContest(DEFAULT_CONTEST_ID)[0];
    const d = recordAnswer(emptyData(), q, q.answer, 'practice', 'x').data;
    expect(await putSnapshot('carla', d, '2026-10-25T10:00:00.000Z')).toBe(true);
    const snap = await getSnapshot('carla');
    expect(snap?.savedAt).toBe('2026-10-25T10:00:00.000Z');
    const rec = pickRecovery(loadData('carla'), snap, hasData);
    expect(rec?.attempts).toHaveLength(1);
    expect(rec?.attempts[0].id).toBe(d.attempts[0].id);
    // Se a principal tem progresso, ela vale (o espelho não sobrescreve).
    saveData('carla', d);
    expect(pickRecovery(loadData('carla'), snap, hasData)).toBeNull();
  });

  it('contas isoladas no espelho: um dono não vê o snapshot do outro', async () => {
    const q = questionsForContest(DEFAULT_CONTEST_ID)[1];
    await putSnapshot('dono-a', recordAnswer(emptyData(), q, q.answer, 'practice', 'x').data);
    expect(await getSnapshot('dono-b')).toBeNull();
  });

  it('a mesma tentativa recebida duas vezes não duplica (id estável, fusão idempotente)', () => {
    const q = questionsForContest(DEFAULT_CONTEST_ID)[2];
    const d = recordAnswer(emptyData(), q, q.answer, 'practice', 'x').data;
    expect(mergeData(mergeData(d, d), d).attempts).toHaveLength(1);
  });
});
