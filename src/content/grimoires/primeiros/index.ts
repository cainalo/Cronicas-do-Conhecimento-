import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-computador/01-o-que-e.md?raw';
import c1s2 from './cap01-computador/02-hardware-software.md?raw';
import c1s3 from './cap01-computador/03-sistema-arquivos.md?raw';
import c1s4 from './cap01-computador/04-programacao.md?raw';
import c2s1 from './cap02-redes-dados/01-redes-internet.md?raw';
import c2s2 from './cap02-redes-dados/02-dados-bancos.md?raw';
import c2s3 from './cap02-redes-dados/03-seguranca.md?raw';

// Grimório introdutório para quem nunca estudou TI. Conteúdo autoral, só conceitos básicos
// consolidados; serve de porta de entrada para os grimórios técnicos.

export const grimorioPrimeiros: Grimoire = {
  id: 'grim.primeiros',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.infra',
  title: 'Primeiros Passos em TI',
  epithet: 'Primeiros Passos em TI',
  description: 'Para quem começa do zero: o que é um computador, hardware e software, sistema operacional e arquivos, algoritmos, redes e internet, bancos de dados e as primeiras regras de segurança.',
  chapterIds: ['cap.prim.01', 'cap.prim.02'],
  sigil: 'grimorio',
  binding: 'castanho',
};

export const capPrimComputador: Chapter = {
  id: 'cap.prim.01',
  grimoireId: 'grim.primeiros',
  number: 1,
  title: 'O computador por dentro',
  subtitle: 'Da tecla apertada ao resultado na tela',
  topicIds: ['ti.infra.so', 'ti.dev.algoritmos'],
  review: 'nao-revisado',
  estimatedMinutes: 25,
  sections: [
    { id: 'computador', title: '1. O que é um computador', body: c1s1 },
    { id: 'hardware', title: '2. Hardware e software', body: c1s2 },
    { id: 'sistema', title: '3. Sistema operacional e arquivos', body: c1s3 },
    { id: 'programacao', title: '4. Programas e programação', body: c1s4 },
  ],
  glossary: [
    { term: 'Bit', definition: 'Menor unidade de informação do computador: vale 0 ou 1.' },
    { term: 'Byte', definition: 'Grupo de 8 bits; basta para guardar uma letra simples.' },
    { term: 'CPU', definition: 'Processador: a peça que executa as instruções e faz as contas.' },
    { term: 'Memória RAM', definition: 'Memória de trabalho, rápida e volátil: apaga quando o computador desliga.' },
    { term: 'Hardware', definition: 'Parte física do computador: peças, cabos, tela, teclado.' },
    { term: 'Software', definition: 'Parte lógica: os programas, instruções que dizem ao hardware o que fazer.' },
    { term: 'Sistema operacional', definition: 'Software que gerencia a máquina, os programas, os arquivos e os usuários. Ex.: Windows, Linux.' },
    { term: 'Extensão de arquivo', definition: 'Final do nome depois do ponto (.pdf, .xlsx) que indica o tipo do arquivo.' },
    { term: 'Algoritmo', definition: 'Sequência ordenada e finita de passos para resolver um problema, como uma receita.' },
    { term: 'Variável', definition: 'Espaço na memória com um nome, onde o programa guarda um valor que pode mudar.' },
  ],
  references: [
    { title: 'TANENBAUM, A. S.; AUSTIN, T.', detail: 'Organização Estruturada de Computadores. Pearson.' },
    { title: 'TANENBAUM, A. S.; BOS, H.', detail: 'Sistemas Operacionais Modernos. Pearson.' },
    { title: 'FORBELLONE, A. L. V.; EBERSPÄCHER, H. F.', detail: 'Lógica de Programação. Pearson.' },
    { title: 'Edital TCE-GO 2026', detail: 'Anexo II, Conhecimentos Específicos. Capítulo introdutório de apoio; não substitui o conteúdo programático.' },
  ],
  lessonIds: ['lic.prim.01'],
};

export const capPrimRedesDados: Chapter = {
  id: 'cap.prim.02',
  grimoireId: 'grim.primeiros',
  number: 2,
  title: 'Redes, dados e segurança do zero',
  subtitle: 'Como a informação viaja, onde ela mora e como protegê-la',
  topicIds: ['ti.infra.redes', 'ti.dados.modelagem', 'ti.seguranca.principios'],
  review: 'nao-revisado',
  estimatedMinutes: 25,
  sections: [
    { id: 'redes', title: '1. Redes e internet', body: c2s1 },
    { id: 'dados', title: '2. Dados e bancos de dados', body: c2s2 },
    { id: 'seguranca', title: '3. Segurança básica', body: c2s3 },
  ],
  glossary: [
    { term: 'Endereço IP', definition: 'Número que identifica um aparelho na rede, como o endereço de uma casa.' },
    { term: 'Roteador', definition: 'Aparelho que liga redes entre si e escolhe o caminho dos dados.' },
    { term: 'Servidor', definition: 'Computador que fica à espera de pedidos e entrega as respostas aos clientes.' },
    { term: 'DNS', definition: 'Serviço que traduz nomes de sites em endereços IP, como uma agenda.' },
    { term: 'Banco de dados', definition: 'Conjunto organizado de dados, cuidado por um programa chamado SGBD.' },
    { term: 'Chave primária', definition: 'Coluna que identifica cada linha de uma tabela sem se repetir, como um CPF.' },
    { term: 'Chave estrangeira', definition: 'Coluna que aponta para a chave primária de outra tabela, ligando as duas.' },
    { term: 'Confidencialidade', definition: 'Pilar da segurança: só quem tem autorização vê a informação.' },
    { term: 'Backup', definition: 'Cópia de segurança dos dados, guardada em outro lugar para recuperação.' },
    { term: 'Phishing', definition: 'Golpe em que o criminoso finge ser alguém confiável para roubar dados.' },
  ],
  references: [
    { title: 'KUROSE, J. F.; ROSS, K. W.', detail: 'Redes de Computadores e a Internet: uma abordagem top-down. Pearson.' },
    { title: 'ELMASRI, R.; NAVATHE, S. B.', detail: 'Sistemas de Banco de Dados. Pearson.' },
    { title: 'ABNT NBR ISO/IEC 27002', detail: 'Segurança da informação, segurança cibernética e proteção à privacidade: controles de segurança da informação.' },
    { title: 'Edital TCE-GO 2026', detail: 'Anexo II, Conhecimentos Específicos. Capítulo introdutório de apoio; não substitui o conteúdo programático.' },
  ],
  lessonIds: ['lic.prim.02'],
};

export const licoesPrimeiros: Lesson[] = [
  {
    id: 'lic.prim.01',
    chapterId: 'cap.prim.01',
    title: 'A Primeira Página do Aprendiz',
    goal: 'Entrada, processamento, memória e saída; bits e bytes; hardware e software; sistema operacional, arquivos e permissões; algoritmo, variável, condição e repetição.',
    cards: [
      { title: 'O que a máquina faz', body: '**Entrada** (teclado, mouse), **processamento** (CPU), **memória** e **saída** (tela, impressora).\n\n**Bit** é 0 ou 1. **Byte** = 8 bits.\n\nKB, MB, GB, TB: cada degrau é cerca de mil vezes o anterior.' },
      { title: 'Peças e programas', body: '**Hardware** é físico; **software** são as instruções.\n\n**RAM** é a mesa de trabalho e apaga ao desligar. **HD/SSD** é o armário.\n\nO **sistema operacional** (Windows, Linux) gerencia tudo: programas, arquivos e permissões de **ler, gravar e executar**.' },
      { title: 'Pensar como programa', body: '**Algoritmo** é uma receita: passos claros, em ordem, com fim.\n\n**Variável** é um pote com etiqueta.\n\n**Se... senão** escolhe caminhos. **Para cada** e **enquanto** repetem passos.' },
    ],
    questionIds: Array.from({ length: 8 }, (_, i) => `q.prim.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.prim.02',
    chapterId: 'cap.prim.02',
    title: 'Redes, dados e segurança básica',
    goal: 'Endereço IP, roteador, cliente e servidor, navegador, DNS e nuvem; tabela, linha, coluna e chaves; confidencialidade, integridade, disponibilidade, senha, backup e phishing.',
    cards: [
      { title: 'A rede', body: '**IP** é o endereço do aparelho. **Roteador** liga redes.\n\n**Cliente** pede, **servidor** atende. O **navegador** é cliente.\n\n**DNS** troca nome de site por IP. **Nuvem** é usar computadores de outra empresa pela internet.' },
      { title: 'Os dados', body: '**Tabela** = assunto; **coluna** = característica; **linha** = um registro.\n\n**Chave primária** não se repete (como CPF).\n\n**Chave estrangeira** aponta para outra tabela.' },
      { title: 'A proteção', body: '**C**onfidencialidade: quem vê. **I**ntegridade: se mudou. **D**isponibilidade: se está lá.\n\nSenha longa e **dois fatores**. **Backup** testado.\n\n**Phishing**: desconfie de urgência e links estranhos.' },
    ],
    questionIds: Array.from({ length: 8 }, (_, i) => `q.prim.02.${String(i + 1).padStart(3, '0')}`),
  },
];
