import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-sql/01-modelagem.md?raw';
import c1s2 from './cap01-sql/02-sql.md?raw';
import c1s3 from './cap01-sql/03-transacoes.md?raw';
import c2s1 from './cap02-sgbd/01-relacionais.md?raw';
import c2s2 from './cap02-sgbd/02-nosql.md?raw';

export const grimorioDados: Grimoire = {
  id: 'grim.dados',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.dados',
  title: 'O Arquivo Profundo',
  epithet: 'Grimório de Banco de Dados',
  description: 'Os registros guardados sob o castelo: modelagem e normalização, SQL e álgebra relacional, transações e índices, PostgreSQL e Oracle, NoSQL, replicação e governança dos dados.',
  chapterIds: ['cap.dados.01', 'cap.dados.02'],
  sigil: 'grimorio',
  binding: 'castanho',
};

export const capDadosSql: Chapter = {
  id: 'cap.dados.01',
  grimoireId: 'grim.dados',
  number: 1,
  title: 'Modelagem, SQL e Transações',
  subtitle: 'Do desenho das tabelas à consulta que não trava o banco',
  topicIds: ['ti.dados.modelagem', 'ti.dados.sql'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'modelagem', title: '1. Modelo ER, chaves e normalização', body: c1s1 },
    { id: 'sql', title: '2. SQL e álgebra relacional', body: c1s2 },
    { id: 'transacoes', title: '3. Transações, isolamento e índices', body: c1s3 },
  ],
  glossary: [
    { term: 'Chave candidata', definition: 'Conjunto mínimo de atributos que identifica cada linha de forma única.' },
    { term: 'Chave estrangeira', definition: 'Atributo que referencia a chave de outra tabela e garante a integridade referencial.' },
    { term: '2FN', definition: '1FN e nenhum atributo não chave dependendo de só parte da chave composta.' },
    { term: '3FN', definition: '2FN e nenhum atributo não chave dependendo de outro não chave (sem dependência transitiva).' },
    { term: 'FNBC', definition: 'Todo determinante é chave candidata.' },
    { term: 'HAVING', definition: 'Filtra grupos depois do GROUP BY; aceita funções de agregação.' },
    { term: 'Projeção (π)', definition: 'Operação da álgebra relacional que escolhe colunas.' },
    { term: 'Seleção (σ)', definition: 'Operação da álgebra relacional que filtra linhas.' },
    { term: 'Trigger', definition: 'Rotina disparada automaticamente por INSERT, UPDATE ou DELETE.' },
    { term: 'ACID', definition: 'Atomicidade, Consistência, Isolamento e Durabilidade das transações.' },
    { term: 'Leitura fantasma', definition: 'Linhas que aparecem ou somem ao repetir uma consulta, por inserção ou exclusão de outra transação.' },
    { term: 'EXPLAIN', definition: 'Mostra o plano de execução que o SGBD escolheu para a consulta.' },
  ],
  references: [
    { title: 'ELMASRI, R.; NAVATHE, S.', detail: 'Sistemas de Banco de Dados. Pearson.' },
    { title: 'SILBERSCHATZ, A.; KORTH, H.; SUDARSHAN, S.', detail: 'Sistema de Banco de Dados. Elsevier.' },
    { title: 'DATE, C. J.', detail: 'Introdução a Sistemas de Bancos de Dados. Elsevier.' },
    { title: 'PostgreSQL Documentation', detail: 'Capítulos "Transaction Isolation", "Indexes" e "Using EXPLAIN".' },
  ],
  lessonIds: ['lic.dados.01'],
};

export const capDadosSgbd: Chapter = {
  id: 'cap.dados.02',
  grimoireId: 'grim.dados',
  number: 2,
  title: 'SGBDs, NoSQL e Governança',
  subtitle: 'PostgreSQL, Oracle, bancos não relacionais e o cuidado com os dados',
  topicIds: ['ti.dados.sgbd', 'ti.dados.nosql', 'ti.dados.governanca'],
  review: 'nao-revisado',
  estimatedMinutes: 35,
  sections: [
    { id: 'relacionais', title: '1. PostgreSQL e Oracle', body: c2s1 },
    { id: 'nosql', title: '2. NoSQL, replicação e governança', body: c2s2 },
  ],
  glossary: [
    { term: 'MVCC', definition: 'Controle de concorrência por múltiplas versões: leitores não bloqueiam escritores.' },
    { term: 'VACUUM', definition: 'Recupera no PostgreSQL o espaço das versões de linha que já não são visíveis.' },
    { term: 'WAL', definition: 'Write-Ahead Log: alterações gravadas no log antes dos arquivos de dados.' },
    { term: 'PITR', definition: 'Recuperação a um ponto no tempo, com backup físico e WAL arquivado.' },
    { term: 'RMAN', definition: 'Ferramenta oficial de backup e recuperação do Oracle.' },
    { term: 'Data Guard', definition: 'Mantém bancos Oracle standby sincronizados para recuperação de desastres.' },
    { term: 'RAC', definition: 'Várias instâncias Oracle acessando o mesmo banco, para disponibilidade e escala.' },
    { term: 'BASE', definition: 'Basicamente disponível, estado flexível, consistência eventual.' },
    { term: 'Teorema CAP', definition: 'Diante de partição de rede, escolhe-se entre consistência e disponibilidade.' },
    { term: 'Sharding', definition: 'Divisão dos dados entre servidores por uma chave, para escalar horizontalmente.' },
  ],
  references: [
    { title: 'PostgreSQL Documentation', detail: 'Capítulos "Routine Vacuuming", "Backup and Restore", "High Availability".' },
    { title: 'Oracle Database Concepts', detail: 'Arquitetura de instância, armazenamento, backup (RMAN) e alta disponibilidade.' },
    { title: 'MongoDB Manual e Redis Documentation', detail: 'Modelo de documentos, replica sets, sharding; estruturas e expiração de chaves.' },
    { title: 'BREWER, E.', detail: 'Towards Robust Distributed Systems (PODC, 2000), origem do teorema CAP.' },
    { title: 'Lei nº 13.709/2018 (LGPD)', detail: 'Tratamento e proteção de dados pessoais.' },
  ],
  lessonIds: ['lic.dados.02'],
};

export const licoesDados: Lesson[] = [
  {
    id: 'lic.dados.01',
    chapterId: 'cap.dados.01',
    title: 'Os Livros de Registro',
    goal: 'Modelo ER, chaves, formas normais, SQL, junções, álgebra relacional, ACID, isolamento e índices.',
    cards: [
      { title: 'Modelar e normalizar', body: 'N:M vira **tabela associativa**; 1:N leva a chave do lado 1 como **estrangeira** no lado N.\n\n**2FN**: sem dependência parcial. **3FN**: sem dependência transitiva. **FNBC**: todo determinante é chave candidata.' },
      { title: 'Consultar', body: 'Ordem lógica: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.\n\n`COUNT(*)` conta linhas; `COUNT(coluna)` ignora NULL. Use `IS NULL`, nunca `= NULL`.\n\nσ filtra **linhas**; π escolhe **colunas**.' },
      { title: 'Transações e índices', body: '**ACID**. READ COMMITTED evita só a leitura suja; SERIALIZABLE evita tudo.\n\nÍndice acelera leitura, **pesa na escrita**. Índice `(ano, orgao)` não serve bem a filtro só por `orgao`.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.dados.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.dados.02',
    chapterId: 'cap.dados.02',
    title: 'Os Cofres Espalhados',
    goal: 'PostgreSQL e Oracle, backup e replicação, modelos NoSQL, CAP e governança de dados.',
    cards: [
      { title: 'PostgreSQL e Oracle', body: '**MVCC** + **VACUUM** + **ANALYZE**. Backup lógico `pg_dump`; físico `pg_basebackup` + WAL = **PITR**.\n\nOracle: **RMAN** (backup), **Data Guard** (standby), **RAC** (várias instâncias, um banco), Data Pump (`expdp`).' },
      { title: 'NoSQL e distribuição', body: '**MongoDB**: documentos BSON. **Redis**: chave-valor em memória, TTL. Cassandra: colunas. Neo4j: grafos.\n\n**CAP**: na partição, consistência ou disponibilidade. Replicação **não** substitui backup.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.dados.02.${String(i + 1).padStart(3, '0')}`),
  },
];
