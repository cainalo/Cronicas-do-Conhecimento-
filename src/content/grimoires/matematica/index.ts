import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-aritmetica/01-inteiros-fracoes.md?raw';
import c1s2 from './cap01-aritmetica/02-multiplos-divisores.md?raw';
import c1s3 from './cap01-aritmetica/03-razoes-regra-de-tres.md?raw';
import c1s4 from './cap01-aritmetica/04-porcentagem.md?raw';
import c2s1 from './cap02-logica/01-relacoes-deducao.md?raw';
import c2s2 from './cap02-logica/02-sequencias-conceitos.md?raw';
import c2s3 from './cap02-logica/03-espaco-tempo.md?raw';

export const grimorioMatematica: Grimoire = {
  id: 'grim.matematica',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'cg.matematica',
  title: 'O Ábaco do Tesoureiro',
  epithet: 'Grimório de Matemática e Raciocínio Lógico',
  description: 'As contas que guardam o erário e as deduções que desmascaram mentirosos: inteiros, frações, MMC e MDC, razões, divisão proporcional, regra de três, porcentagem, associações, sequências, calendários e relógios.',
  chapterIds: ['cap.mat.01', 'cap.mat.02'],
  sigil: 'selo',
  binding: 'noite',
};

export const capMatAritmetica: Chapter = {
  id: 'cap.mat.01',
  grimoireId: 'grim.matematica',
  number: 1,
  title: 'Números, Proporções e Porcentagens',
  subtitle: 'As contas do livro-caixa, conferidas duas vezes',
  topicIds: ['cg.matematica.aritmetica', 'cg.matematica.proporcao'],
  review: 'nao-revisado',
  estimatedMinutes: 50,
  sections: [
    { id: 'inteiros', title: '1. Inteiros, racionais, potências e frações', body: c1s1 },
    { id: 'divisores', title: '2. Múltiplos, divisores, MMC e MDC', body: c1s2 },
    { id: 'razoes', title: '3. Razões, divisão proporcional e regra de três', body: c1s3 },
    { id: 'porcentagem', title: '4. Porcentagem, acréscimos e descontos', body: c1s4 },
  ],
  glossary: [
    { term: 'Número racional', definition: 'Número que pode ser escrito como a/b, com a e b inteiros e b diferente de zero; inclui dízimas periódicas.' },
    { term: 'Dízima periódica simples', definition: 'Vira fração com o período no numerador e tantos noves quantos algarismos do período: 0,3636... = 36/99 = 4/11.' },
    { term: 'Expoente negativo', definition: 'Indica o inverso: a elevado a −n é 1 sobre a elevado a n. Exemplo: 2⁻³ = 1/8.' },
    { term: 'Número primo', definition: 'Natural com exatamente dois divisores, 1 e ele mesmo. O 1 não é primo; o 2 é o único primo par.' },
    { term: 'MMC', definition: 'Menor múltiplo comum: todos os fatores primos com o maior expoente. Usado em eventos que voltam a coincidir.' },
    { term: 'MDC', definition: 'Maior divisor comum: fatores primos comuns com o menor expoente. Usado para formar grupos iguais do maior tamanho.' },
    { term: 'Divisão inversamente proporcional', definition: 'Divisão proporcional aos inversos dos números dados: quem tem o menor número recebe a maior parte.' },
    { term: 'Regra de três composta', definition: 'Compara a grandeza procurada com cada uma das outras, uma de cada vez, classificando a relação como direta ou inversa.' },
    { term: 'Fator multiplicativo', definition: 'Acréscimo de p% multiplica por (1 + p/100); desconto de p% multiplica por (1 − p/100).' },
    { term: 'Percentuais sucessivos', definition: 'Multiplicam-se os fatores, e não se somam as taxas: +10% e −10% resultam em × 0,99.' },
    { term: 'Ponto percentual', definition: 'Diferença simples entre duas taxas: de 40% para 50% são 10 pontos percentuais, ou 25% de aumento relativo.' },
  ],
  references: [
    { title: 'IEZZI, G.; DOLCE, O.; MACHADO, A.', detail: 'Matemática e Realidade (Ensino Fundamental). Atual Editora.' },
    { title: 'IEZZI, G.; MURAKAMI, C.', detail: 'Fundamentos de Matemática Elementar, v. 1: Conjuntos e Funções. Atual Editora.' },
    { title: 'LIMA, E. L. et al.', detail: 'A Matemática do Ensino Médio, v. 1. Coleção do Professor de Matemática, SBM.' },
    { title: 'Edital TCE-GO 2026', detail: 'Anexo II, Conhecimentos Gerais para A01 e B02: Matemática e Raciocínio Lógico.' },
  ],
  lessonIds: ['lic.mat.01'],
};

export const capMatLogica: Chapter = {
  id: 'cap.mat.02',
  grimoireId: 'grim.matematica',
  number: 2,
  title: 'Raciocínio Lógico',
  subtitle: 'Tabelas, hipóteses, sequências, calendários e ponteiros',
  topicIds: ['cg.matematica.logica'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'associacao', title: '1. Relações arbitrárias, ordenação e dedução', body: c2s1 },
    { id: 'sequencias', title: '2. Sequências, raciocínio verbal e formação de conceitos', body: c2s2 },
    { id: 'espacial', title: '3. Orientação temporal e espacial', body: c2s3 },
  ],
  glossary: [
    { term: 'Tabela de dupla entrada', definition: 'Quadro com pessoas nas linhas e atributos nas colunas; cada linha e cada coluna recebe um único ✓.' },
    { term: 'Método das hipóteses', definition: 'Em problemas de verdade e mentira, testar cada culpado possível e contar as afirmações verdadeiras.' },
    { term: 'Argumento válido', definition: 'Aquele em que premissas verdadeiras garantem a verdade da conclusão; depende da forma.' },
    { term: 'Modus tollens', definition: 'Se P então Q; não Q; logo não P. Forma válida.' },
    { term: 'Afirmação do consequente', definition: 'Se P então Q; Q; logo P. Falácia: a conclusão não decorre.' },
    { term: 'Negação de "todo"', definition: '"Algum não": a negação de "Todo servidor é concursado" é "Algum servidor não é concursado".' },
    { term: 'Sequência intercalada', definition: 'Termos de posição ímpar e de posição par seguem regras diferentes.' },
    { term: 'Padrão cíclico', definition: 'Com período k, o termo n é o mesmo da posição dada pelo resto de n ÷ k.' },
    { term: 'Princípio da casa dos pombos', definition: 'Raciocínio do pior caso: para garantir repetição entre k tipos, retire k + 1 itens.' },
    { term: 'Resto por 7', definition: 'Avançar n dias muda o dia da semana conforme o resto de n ÷ 7; ano comum avança 1 dia, bissexto 2.' },
    { term: 'Ângulo dos ponteiros', definition: '|30H − 5,5M| graus; se passar de 180°, o menor ângulo é 360° menos esse valor.' },
  ],
  references: [
    { title: 'MORGADO, A. C.; CESAR, B.', detail: 'Raciocínio Lógico-Quantitativo. Elsevier/Campus.' },
    { title: 'ALENCAR FILHO, E.', detail: 'Iniciação à Lógica Matemática. Nobel.' },
    { title: 'COPI, I. M.', detail: 'Introdução à Lógica. Mestre Jou.' },
    { title: 'Edital TCE-GO 2026', detail: 'Anexo II, Conhecimentos Gerais para A01 e B02: Raciocínio Lógico.' },
  ],
  lessonIds: ['lic.mat.02'],
};

export const licoesMatematica: Lesson[] = [
  {
    id: 'lic.mat.01',
    chapterId: 'cap.mat.01',
    title: 'O Livro-Caixa do Tesoureiro',
    goal: 'Expressões, potências e frações; MMC e MDC; razões, divisão proporcional e regra de três; porcentagem e percentuais sucessivos.',
    cards: [
      { title: 'Contas e frações', body: 'Ordem: parênteses, **potências**, × e ÷ da esquerda para a direita, + e −.\n\n**−2² = −4**, mas (−2)² = 4. a⁻ⁿ = 1/aⁿ.\n\nFração **do restante**: multiplique o que sobra em cada etapa (5/8 × 3/5 = 3/8).' },
      { title: 'Múltiplos e divisores', body: '**MMC**: maior expoente, eventos que voltam a coincidir.\n\n**MDC**: menor expoente dos comuns, lotes iguais do maior tamanho.\n\nMDC × MMC = produto (para dois números).' },
      { title: 'Proporção e porcentagem', body: 'Inversa a 2, 3, 6 = direta a **3, 2, 1**.\n\nComposta: compare cada grandeza com a procurada.\n\nSucessivos **multiplicam**: 1,08 × 0,95 = 1,026. Reverso: **divida** pelo fator.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.mat.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.mat.02',
    chapterId: 'cap.mat.02',
    title: 'O Interrogatório dos Fictícios',
    goal: 'Tabelas de associação, ordenação, verdade e mentira, argumentos válidos; sequências e conceitos; calendários, relógios e direções.',
    cards: [
      { title: 'Relações e dedução', body: 'Tabela: um **✓** por linha e por coluna.\n\nVerdade e mentira: **teste cada hipótese** e conte as verdades.\n\nTodo A é B + algum B é C **não** garante algum A é C.' },
      { title: 'Sequências', body: 'Teste: diferenças, quocientes, 2ª ordem, × e + alternados, **intercaladas**.\n\nCiclo de k: use o **resto de n ÷ k**.\n\nPior caso: k cores, k + 1 retiradas.' },
      { title: 'Tempo e espaço', body: 'Dia da semana: **resto ÷ 7**. Mês de 31 avança 3; de 30, 2.\n\nPonteiros: **|30H − 5,5M|**.\n\nGiros: N = 0°, horário soma, anti-horário subtrai.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.mat.02.${String(i + 1).padStart(3, '0')}`),
  },
];
