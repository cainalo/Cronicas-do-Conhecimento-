// Aula narrada gerada a partir de uma aula em texto (trilha integrada, 26/10/2026). Não acrescenta
// conteúdo: usa só o que a aula já diz (explicações, exemplos, títulos e resumo), já conferido, e
// escolhe a cena que melhor mostra cada parte (título com ilustração, cartões para listas, linha do
// tempo para a história). Função pura, sem React.
import type { MicroLesson } from '@/content/types';
import type { Beat, NarratedLesson, Scene, Visual } from '@/content/narrated/types';

/** Texto falado: sem marcação, sem blocos de código e sem tabelas. */
export function plainSpeech(md: string): string[] {
  const out: string[] = [];
  let inCode = false;
  for (const raw of md.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode || !line || line.startsWith('|') || line.startsWith('>')) continue;
    const text = line
      .replace(/^#+\s*/, '')
      .replace(/^[-*]\s+/, '')
      .replace(/^\d+\.\s+/, '')
      .replace(/\*\*\*?|__/g, '')
      .replace(/(^|\s)\*([^*]+)\*/g, '$1$2')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/;$/, '.')
      .trim();
    if (text) out.push(/[.!?:]$/.test(text) ? text : `${text}.`);
  }
  return out;
}

/** Junta frases curtas para que cada fala tenha um tamanho confortável (até ~220 caracteres). */
function toBeats(sentences: string[]): Beat[] {
  const beats: Beat[] = [];
  let cur = '';
  for (const s of sentences) {
    if (cur && (cur + ' ' + s).length > 220) {
      beats.push({ say: cur });
      cur = s;
    } else cur = cur ? `${cur} ${s}` : s;
  }
  if (cur) beats.push({ say: cur });
  return beats;
}

/** Itens de lista da explicação viram cartões (título em negrito, quando houver). */
function listCards(md: string): { title: string; text: string }[] {
  const items = md
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^([-*]|\d+\.)\s+/.test(l))
    .map((l) => l.replace(/^([-*]|\d+\.)\s+/, ''));
  return items.slice(0, 6).map((it) => {
    const bold = it.match(/\*\*([^*]+)\*\*/);
    const clean = plainSpeech(it)[0] ?? it;
    if (bold) {
      const title = bold[1].replace(/[:.]$/, '');
      const rest = clean.replace(bold[1], '').replace(/^[\s:,.–-]+/, '').trim();
      return { title, text: rest || clean };
    }
    const words = clean.split(' ');
    return { title: words.slice(0, 4).join(' ').replace(/[,:;.]$/, ''), text: clean };
  });
}

const YEARISH = /^(\d{3,4}|século|anos|por volta|há |cerca|meados|início|fim|hoje)/i;

export function narratedFromMicro(m: MicroLesson): NarratedLesson {
  const scenes: Scene[] = [];
  const firstArt = m.steps.find((s) => s.art)?.art;
  scenes.push({
    id: 'abertura',
    heading: 'Nesta aula',
    visual: { kind: 'title', title: m.title, subtitle: m.steps.map((s) => s.title.replace(/^[^:]+:\s*/, '')).slice(0, 3).join(' · '), art: firstArt },
    beats: [{ say: m.opening.prompt.replace(/\?$/, '?') }, { say: `Nesta aula, ${m.steps.length} partes: ${m.steps.map((s) => s.title.replace(/^[^:]+:\s*/, '').toLowerCase()).join('; ')}.` }],
  });
  for (const s of m.steps) {
    const sentences = plainSpeech(s.explain);
    if (s.example) sentences.push(...plainSpeech(`Por exemplo: ${s.example}`));
    const beats = toBeats(sentences);
    const cards = listCards(s.explain);
    const visual: Visual =
      cards.length >= 2 ? { kind: 'cards', cards } : { kind: 'title', title: s.title, subtitle: s.goal, art: s.art };
    // Com cartões, cada fala revela um cartão a mais, até mostrar todos na última.
    if (visual.kind === 'cards') beats.forEach((b, i) => (b.show = Math.min(cards.length, Math.max(1, Math.ceil(((i + 1) * cards.length) / beats.length)))));
    scenes.push({ id: s.id, heading: s.title, visual, beats });
  }
  const dated = m.steps.filter((s) => YEARISH.test(s.title) && s.title.includes(':'));
  if (dated.length >= 2) {
    const items = dated.map((s) => {
      const [year, ...rest] = s.title.split(':');
      return { year: year.trim(), title: rest.join(':').trim(), text: s.goal };
    });
    scenes.push({
      id: 'linha-do-tempo',
      heading: 'A linha do tempo',
      visual: { kind: 'timeline', items },
      beats: items.map((it, i) => ({ say: `${it.year}: ${it.title}.`, show: i + 1 })),
    });
  }
  if (m.summary.length) {
    const cards = m.summary.slice(0, 6).map((t) => {
      const [head, ...rest] = t.split(':');
      return rest.length && head.length < 40 ? { title: head.trim(), text: rest.join(':').trim() } : { title: `Ponto ${m.summary.indexOf(t) + 1}`, text: t };
    });
    scenes.push({
      id: 'resumo',
      heading: 'Para guardar',
      visual: { kind: 'cards', cards },
      beats: cards.map((c, i) => ({ say: c.title.startsWith('Ponto ') ? c.text : `${c.title}: ${c.text}`, show: i + 1 })),
    });
  }
  const words = scenes.flatMap((sc) => sc.beats).reduce((n, b) => n + b.say.split(/\s+/).length, 0);
  return {
    id: `narrada.auto.${m.id}`,
    title: m.title,
    chapterId: m.chapterId,
    sectionId: m.sectionId,
    lessonId: m.id,
    minutes: Math.max(2, Math.round(words / 140)),
    scenes,
    review: 'nao-revisado',
  };
}
