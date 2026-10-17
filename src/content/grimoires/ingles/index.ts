import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-estrategias/01-estrategias.md?raw';
import c1s2 from './cap01-estrategias/02-coesao.md?raw';
import c1s3 from './cap01-estrategias/03-gramatica.md?raw';
import c2s1 from './cap02-vocabulario/01-api.md?raw';
import c2s2 from './cap02-vocabulario/02-generos.md?raw';
import c2s3 from './cap02-vocabulario/03-seguranca-nuvem.md?raw';

export const grimorioIngles: Grimoire = {
  id: 'grim.ingles',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.ingles',
  title: 'O Códice dos Estrangeiros',
  epithet: 'Grimório de Língua Inglesa (Leitura Técnica)',
  description: 'Como decifrar manuais, documentação de software, artigos técnicos e APIs escritos em inglês: skimming e scanning, falsos cognatos, conectivos, referência pronominal, modais, voz passiva, afixos e o vocabulário de TI.',
  chapterIds: ['cap.ingles.01', 'cap.ingles.02'],
  sigil: 'pena',
  binding: 'floresta',
};

export const capInglesLeitura: Chapter = {
  id: 'cap.ingles.01',
  grimoireId: 'grim.ingles',
  number: 1,
  title: 'Estratégias de Leitura',
  subtitle: 'Ideia principal, informação específica e as pequenas palavras que mudam tudo',
  topicIds: ['ti.ingles.leitura'],
  review: 'nao-revisado',
  estimatedMinutes: 35,
  sections: [
    { id: 'estrategias', title: '1. Skimming, scanning, cognatos e inferência', body: c1s1 },
    { id: 'coesao', title: '2. Conectivos e referência pronominal', body: c1s2 },
    { id: 'gramatica', title: '3. Imperativo, voz passiva, modais e afixos', body: c1s3 },
  ],
  glossary: [
    { term: 'Skimming', definition: 'Leitura rápida para captar a ideia geral do texto.' },
    { term: 'Scanning', definition: 'Varredura do texto em busca de um dado específico, sem ler tudo.' },
    { term: 'Actually', definition: 'Na verdade, de fato. Atualmente é currently.' },
    { term: 'Eventually', definition: 'Por fim, com o tempo. Eventualmente é occasionally.' },
    { term: 'Library', definition: 'Biblioteca (de código). Livraria é bookstore.' },
    { term: 'However', definition: 'Contudo, no entanto: conectivo de contraste.' },
    { term: 'Whereas', definition: 'Ao passo que: contrasta dois elementos.' },
    { term: 'Unless', definition: 'A menos que; equivale a if not.' },
    { term: 'As long as', definition: 'Desde que, contanto que: conectivo de condição.' },
    { term: 'Must not × don\'t have to', definition: 'Must not proíbe; don\'t have to apenas dispensa a obrigação.' },
    { term: 'Should', definition: 'Recomendação, de força menor que must.' },
    { term: '-less', definition: 'Sufixo que indica ausência: stateless, serverless.' },
  ],
  references: [
    { title: 'MUNHOZ, R.', detail: 'Inglês Instrumental: estratégias de leitura. Módulos I e II. Textonovo.' },
    { title: 'SWAN, M.', detail: 'Practical English Usage. Oxford University Press.' },
    { title: 'MURPHY, R.', detail: 'English Grammar in Use. Cambridge University Press.' },
    { title: 'BRADNER, S. (IETF)', detail: 'RFC 2119: Key words for use in RFCs to Indicate Requirement Levels, 1997; e RFC 8174, 2017.' },
    { title: 'Cambridge Dictionary', detail: 'dictionary.cambridge.org (verbetes e exemplos de uso).' },
  ],
  lessonIds: ['lic.ingles.01'],
};

export const capInglesVocabulario: Chapter = {
  id: 'cap.ingles.02',
  grimoireId: 'grim.ingles',
  number: 2,
  title: 'Vocabulário Técnico e Gêneros',
  subtitle: 'APIs, README, release notes, mensagens de erro, artigos, segurança e nuvem',
  topicIds: ['ti.ingles.leitura'],
  review: 'nao-revisado',
  estimatedMinutes: 40,
  sections: [
    { id: 'api', title: '1. Documentação de APIs', body: c2s1 },
    { id: 'generos', title: '2. README, release notes, erros, artigos e abreviações', body: c2s2 },
    { id: 'seguranca-nuvem', title: '3. Vocabulário de segurança e nuvem', body: c2s3 },
  ],
  glossary: [
    { term: 'Endpoint', definition: 'URL de uma API que responde a determinada operação.' },
    { term: 'Payload', definition: 'Conteúdo transportado no corpo da requisição ou da resposta.' },
    { term: 'Query parameter', definition: 'Parâmetro informado na URL depois do sinal de interrogação.' },
    { term: 'Deprecated', definition: 'Obsoleto: ainda funciona, mas é desaconselhado e será removido.' },
    { term: 'Rate limit', definition: 'Limite de requisições por período; excedê-lo gera o código 429.' },
    { term: 'Breaking change', definition: 'Mudança incompatível que quebra integrações existentes.' },
    { term: 'e.g. × i.e.', definition: 'e.g. = por exemplo; i.e. = isto é, ou seja.' },
    { term: 'TBD', definition: 'To be determined/defined: a definir.' },
    { term: 'Known issue', definition: 'Problema conhecido que ainda não foi corrigido.' },
    { term: 'Workaround', definition: 'Solução de contorno temporária.' },
    { term: 'On-premises', definition: 'Infraestrutura própria, no local da organização.' },
    { term: 'Failover', definition: 'Passagem automática para um recurso reserva quando o principal falha.' },
  ],
  references: [
    { title: 'IETF', detail: 'RFC 9110: HTTP Semantics, 2022 (métodos e códigos de status); RFC 6585 (código 429).' },
    { title: 'PRESTON-WERNER, T.', detail: 'Semantic Versioning 2.0.0. semver.org.' },
    { title: 'LACAN, O. et al.', detail: 'Keep a Changelog. keepachangelog.com.' },
    { title: 'NIST', detail: 'Glossary of Computer Security Resource Center (csrc.nist.gov/glossary).' },
    { title: 'Google', detail: 'Google developer documentation style guide (developers.google.com/style).' },
  ],
  lessonIds: ['lic.ingles.02'],
};

export const licoesIngles: Lesson[] = [
  {
    id: 'lic.ingles.01',
    chapterId: 'cap.ingles.01',
    title: 'A Língua dos Estrangeiros',
    goal: 'Skimming e scanning, falsos cognatos de TI, conectivos, referência pronominal, voz passiva, imperativo, modais e afixos.',
    cards: [
      { title: 'Ler com estratégia', body: 'Leia a **pergunta antes** do texto. Ideia geral = **skimming**; dado pontual = **scanning**.\n\nFalsos cognatos: *actually* = na verdade; *eventually* = por fim; *library* = biblioteca; *data* = dados; *assume* = supor.' },
      { title: 'Conectivos e referência', body: '*however*, *nevertheless* = contraste. *although* + oração; *despite* + substantivo.\n\n*whereas* = ao passo que. *therefore* = portanto. *moreover* = além disso. *unless* = a menos que. *as long as* = desde que.\n\nPronome: substitua pelo candidato e confira número e sentido.' },
      { title: 'Gramática dos manuais', body: 'Imperativo: *Open*, *Do not share*. Passiva: *be* + particípio; agente com *by*.\n\n*must* obriga; *must not* proíbe; *don\'t have to* dispensa; *should* recomenda; *may/might* = possibilidade.\n\n*un-*, *re-*, *-able*, *-less* (sem).' },
    ],
    questionIds: Array.from({ length: 11 }, (_, i) => `q.ingles.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.ingles.02',
    chapterId: 'cap.ingles.02',
    title: 'Os Pergaminhos das Máquinas',
    goal: 'Vocabulário de APIs, códigos de status, versionamento, README, release notes, erros, artigos, abreviações, segurança e nuvem.',
    cards: [
      { title: 'APIs', body: '*endpoint*, *request/response*, *payload*, *header*, *query parameter* (`?x=1`).\n\n*deprecated* = obsoleto, ainda funciona. *breaking change* = incompatível (MAJOR no semver).\n\n401 sem autenticação; 403 sem permissão; 404 não encontrado; 429 limite excedido.' },
      { title: 'Gêneros e abreviações', body: 'README: *Installation*, *Usage*, *Configuration*. Changelog: *Added*, *Changed*, *Deprecated*, *Removed*, *Fixed*, *Security*. *Known issues* = ainda existem.\n\n*e.g.* = por exemplo; *i.e.* = isto é; *TBD* = a definir; *EOL* = fim do suporte.' },
      { title: 'Segurança e nuvem', body: '*threat* ameaça; *vulnerability* fraqueza; *breach* violação; *patch* correção; *workaround* contorno.\n\n*on-premises* = próprio; *scale out* = mais máquinas; *failover* = troca automática; *so far* = até agora; *not yet* = ainda não.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.ingles.02.${String(i + 1).padStart(3, '0')}`),
  },
];
