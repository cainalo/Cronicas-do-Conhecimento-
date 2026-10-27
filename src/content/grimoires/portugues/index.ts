import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-leitura/01-interpretacao.md?raw';
import c1s2 from './cap01-leitura/02-ortografia-crase.md?raw';
import c1s3 from './cap01-leitura/03-pontuacao-pronomes.md?raw';
import c1s4 from './cap01-leitura/04-morfologia.md?raw';
import c2s1 from './cap02-sintaxe/01-concordancia.md?raw';
import c2s2 from './cap02-sintaxe/02-regencia-verbos.md?raw';
import c2s3 from './cap02-sintaxe/03-periodo-reescrita.md?raw';
import c2s4 from './cap02-sintaxe/04-redacao-oficial.md?raw';

export const grimorioPortugues: Grimoire = {
  id: 'grim.portugues',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'cg.portugues',
  title: 'Língua Portuguesa',
  description: 'Ler, acentuar, pontuar e concordar como manda a norma: interpretação e figuras, Acordo Ortográfico, crase, pronomes, concordância, regência, conectivos, reescrita e Redação Oficial pelo Manual da Presidência.',
  chapterIds: ['cap.port.01', 'cap.port.02'],
};

export const capPortLeitura: Chapter = {
  id: 'cap.port.01',
  grimoireId: 'grim.portugues',
  number: 1,
  title: 'Leitura, Grafia e Forma',
  subtitle: 'Do sentido do texto ao acento, à vírgula e ao pronome',
  topicIds: ['cg.portugues.interpretacao', 'cg.portugues.gramatica'],
  review: 'nao-revisado',
  estimatedMinutes: 50,
  sections: [
    { id: 'interpretacao', title: '1. Interpretação, discursos e figuras de linguagem', body: c1s1 },
    { id: 'ortografia', title: '2. Ortografia, acentuação e crase', body: c1s2 },
    { id: 'pontuacao', title: '3. Pontuação e pronomes', body: c1s3 },
    { id: 'morfologia', title: '4. Morfossintaxe, formação de palavras e sinonímia', body: c1s4 },
  ],
  glossary: [
    { term: 'Pressuposto', definition: 'Informação garantida pela própria frase, como "voltou a" pressupor que já ocorreu antes.' },
    { term: 'Conotação', definition: 'Sentido figurado ou ampliado que a palavra ganha no contexto.' },
    { term: 'Discurso indireto livre', definition: 'Fala ou pensamento do personagem fundido à voz do narrador, sem verbo de elocução.' },
    { term: 'Metonímia', definition: 'Troca de um termo por outro com relação de proximidade: lugar pela instituição, autor pela obra.' },
    { term: 'Paródia', definition: 'Retomada de texto conhecido com inversão ou subversão do sentido.' },
    { term: 'Crase', definition: 'Fusão da preposição "a" com o artigo "a" ou com o "a" inicial de aquele, aquela, aquilo.' },
    { term: 'Acento diferencial', definition: 'Após o Acordo de 1990 restam pôr, pôde e o plural têm/vêm; fôrma e dêmos são facultativos.' },
    { term: 'Próclise', definition: 'Pronome átono antes do verbo, exigida por palavras atrativas como "não" e "que".' },
    { term: 'Mesóclise', definition: 'Pronome no meio do verbo no futuro do presente ou do pretérito, sem palavra atrativa.' },
    { term: 'Oração adjetiva explicativa', definition: 'Vem entre vírgulas e generaliza o antecedente; a restritiva não tem vírgulas e o delimita.' },
    { term: 'Parassíntese', definition: 'Prefixo e sufixo acrescentados ao mesmo tempo, como em entardecer.' },
    { term: 'Derivação regressiva', definition: 'Forma substantivo reduzindo o verbo: combater gera combate.' },
  ],
  references: [
    { title: 'BECHARA, E.', detail: 'Moderna Gramática Portuguesa. Nova Fronteira.' },
    { title: 'CUNHA, C.; CINTRA, L.', detail: 'Nova Gramática do Português Contemporâneo. Lexikon.' },
    { title: 'BRASIL. Decreto nº 6.583, de 29 de setembro de 2008', detail: 'Promulga o Acordo Ortográfico da Língua Portuguesa (alterado pelo Decreto nº 7.875/2012).' },
    { title: 'ACADEMIA BRASILEIRA DE LETRAS', detail: 'Vocabulário Ortográfico da Língua Portuguesa (VOLP).' },
    { title: 'KOCH, I. V.; ELIAS, V. M.', detail: 'Ler e compreender: os sentidos do texto. Contexto.' },
  ],
  lessonIds: ['lic.port.01'],
};

export const capPortSintaxe: Chapter = {
  id: 'cap.port.02',
  grimoireId: 'grim.portugues',
  number: 2,
  title: 'Sintaxe, Reescrita e Redação Oficial',
  subtitle: 'Concordar, reger, conectar e escrever como o Estado escreve',
  topicIds: ['cg.portugues.sintaxe', 'cg.portugues.redacao'],
  review: 'nao-revisado',
  estimatedMinutes: 55,
  sections: [
    { id: 'concordancia', title: '1. Concordância verbal e nominal', body: c2s1 },
    { id: 'regencia', title: '2. Regência, vozes, tempos e flexões', body: c2s2 },
    { id: 'periodo', title: '3. Coordenação, subordinação, conectivos e reescrita', body: c2s3 },
    { id: 'redacao-oficial', title: '4. Redação Oficial', body: c2s4 },
  ],
  glossary: [
    { term: 'Haver impessoal', definition: 'No sentido de existir ou de tempo decorrido, fica no singular e contamina o auxiliar: "deve haver".' },
    { term: 'Se apassivador', definition: 'Com verbo transitivo direto; o verbo concorda com o sujeito paciente: "vendem-se imóveis".' },
    { term: 'Índice de indeterminação do sujeito', definition: 'Com verbo transitivo indireto, intransitivo ou de ligação; verbo no singular: "precisa-se de técnicos".' },
    { term: 'Visar (objetivar)', definition: 'Transitivo indireto, com a preposição "a": "visa ao controle".' },
    { term: 'Preferir', definition: 'Prefere-se uma coisa a outra, sem "mais" nem "do que".' },
    { term: 'Voz passiva analítica', definition: 'Verbo ser no tempo do verbo da ativa + particípio, com agente da passiva.' },
    { term: 'Conquanto', definition: 'Conjunção concessiva, equivalente a "embora"; pede subjuntivo.' },
    { term: 'À medida que', definition: 'Locução de proporção; "na medida em que" indica causa.' },
    { term: 'Padrão ofício', definition: 'Diagramação única da 3ª edição do Manual, que passou a chamar de ofício também o antigo aviso e o memorando.' },
    { term: 'Respeitosamente', definition: 'Fecho para autoridade de hierarquia superior, inclusive o Presidente da República.' },
    { term: 'Atenciosamente', definition: 'Fecho para autoridade de mesma hierarquia, inferior e demais casos.' },
    { term: 'Concisão', definition: 'Transmitir o máximo de informação com o mínimo de palavras, sem perder o essencial.' },
  ],
  references: [
    { title: 'BRASIL. Presidência da República', detail: 'Manual de Redação da Presidência da República. 3. ed., rev., atual. e ampl. Brasília, 2018.' },
    { title: 'BRASIL. Decreto nº 9.758, de 11 de abril de 2019', detail: 'Dispõe sobre a forma de tratamento e de endereçamento nas comunicações com agentes públicos da administração pública federal.' },
    { title: 'LUFT, C. P.', detail: 'Dicionário Prático de Regência Verbal. Ática.' },
    { title: 'BECHARA, E.', detail: 'Moderna Gramática Portuguesa. Nova Fronteira.' },
    { title: 'CEGALLA, D. P.', detail: 'Novíssima Gramática da Língua Portuguesa. Companhia Editora Nacional.' },
  ],
  lessonIds: ['lic.port.02'],
};

export const licoesPortugues: Lesson[] = [
  {
    id: 'lic.port.01',
    chapterId: 'cap.port.01',
    title: 'A Lente e o Cinzel',
    goal: 'Interpretação, discursos e figuras; Acordo Ortográfico e crase; vírgula, colocação pronominal e relativos; formação de palavras e sinonímia.',
    cards: [
      { title: 'Ler e acentuar', body: 'Resposta **sustentada pelo texto**; desconfie de "sempre" e "nunca".\n\nAcordo: **ideia, heroico** perdem acento; **herói, papéis** mantêm. **Creem, voo**, sem circunflexo. Restam **pôr, pôde, têm/vêm**.' },
      { title: 'Crase', body: 'Troque por masculino: deu **ao**, há crase.\n\nNunca antes de **verbo**, **masculino**, **Vossa Excelência**, "a" + plural.\n\nFacultativa: **possessivo**, **nome de mulher**, **até**.' },
      { title: 'Vírgula e pronomes', body: '**Nunca** vírgula entre sujeito e verbo.\n\nExplicativa (com vírgulas) × restritiva (sem).\n\nPróclise com **não, que, quando**; não iniciar frase com oblíquo; mesóclise no futuro. **Cujo** sem artigo depois.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.port.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.port.02',
    chapterId: 'cap.port.02',
    title: 'As Leis da Frase e do Ofício',
    goal: 'Concordância, regência, vozes, correlação verbal, conectivos, reescrita e Redação Oficial pelo Manual da Presidência (3ª ed., 2018).',
    cards: [
      { title: 'Concordância', body: '**Haver** (existir) e **fazer** (tempo): singular, inclusive o auxiliar.\n\n**Vendem-se** casas (VTD) × **precisa-se** de técnicos (VTI).\n\nSujeito posposto: ponha na ordem direta.' },
      { title: 'Regência e conectivos', body: 'Assistir **a** (ver), visar **a** (objetivar), aspirar **a**, obedecer **a**, implicar (VTD), preferir **x a y**.\n\n**Embora/conquanto** = concessão + subjuntivo. **À medida que** = proporção.' },
      { title: 'Redação Oficial', body: 'Atributos: clareza, objetividade, **concisão**, coesão, **impessoalidade**, formalidade, norma padrão.\n\n**Padrão ofício** unificado. **Respeitosamente** (superior) × **Atenciosamente** (demais). Abolidos **DD** e **Ilmo.**' },
    ],
    questionIds: Array.from({ length: 13 }, (_, i) => `q.port.02.${String(i + 1).padStart(3, '0')}`),
  },
];
