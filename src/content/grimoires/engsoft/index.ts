import type { Chapter, Grimoire, Lesson } from '@/content/types';
import c1s1 from './cap01-processo/01-ciclo.md?raw';
import c1s2 from './cap01-processo/02-requisitos.md?raw';
import c2s1 from './cap02-arquitetura/01-arquitetura.md?raw';
import c2s2 from './cap02-arquitetura/02-modelagem.md?raw';
import c2s3 from './cap02-arquitetura/03-qualidade.md?raw';

export const grimorioEngSoft: Grimoire = {
  id: 'grim.engsoft',
  contestId: 'tce-go-2026-tecnico-ti',
  disciplineId: 'ti.engsoft',
  title: 'Engenharia de Software',
  description: 'Como se constrói um sistema que dura: ciclos de vida, Scrum, Kanban, Lean e XP, requisitos e histórias, arquiteturas, SOLID, UML, BPMN, padrões de projeto, testes e dívida técnica.',
  chapterIds: ['cap.es.01', 'cap.es.02'],
};

export const capEsProcesso: Chapter = {
  id: 'cap.es.01',
  grimoireId: 'grim.engsoft',
  number: 1,
  title: 'Processos e Requisitos',
  subtitle: 'Do jeito de trabalhar ao que deve ser construído',
  topicIds: ['ti.engsoft.ciclo', 'ti.engsoft.requisitos'],
  review: 'nao-revisado',
  estimatedMinutes: 30,
  sections: [
    { id: 'ciclo', title: '1. Ciclos de vida e métodos ágeis', body: c1s1 },
    { id: 'requisitos', title: '2. Requisitos, histórias e casos de uso', body: c1s2 },
  ],
  glossary: [
    { term: 'Iterativo', definition: 'Repetir ciclos para refinar a solução com feedback.' },
    { term: 'Incremental', definition: 'Entregar o produto em partes funcionais que se somam.' },
    { term: 'Modelo espiral', definition: 'Ciclo iterativo de Boehm orientado à análise de riscos.' },
    { term: 'Lead time', definition: 'Tempo do pedido até a entrega de um item.' },
    { term: 'TDD', definition: 'Desenvolvimento guiado por testes: vermelho, verde, refatorar.' },
    { term: 'Requisito não funcional', definition: 'Qualidade ou restrição do sistema, como desempenho ou segurança; deve ser mensurável.' },
    { term: 'INVEST', definition: 'Independente, negociável, valiosa, estimável, pequena e testável.' },
    { term: 'Validação', definition: 'Confirmar que se constrói o produto certo para a necessidade real.' },
    { term: 'Verificação', definition: 'Confirmar que o produto está conforme a especificação.' },
    { term: 'Extend', definition: 'Relação de caso de uso para comportamento opcional ou condicional.' },
  ],
  references: [
    { title: 'SOMMERVILLE, I.', detail: 'Engenharia de Software. Pearson.' },
    { title: 'PRESSMAN, R.; MAXIM, B.', detail: 'Engenharia de Software: uma abordagem profissional. AMGH.' },
    { title: 'POPPENDIECK, M.; POPPENDIECK, T.', detail: 'Implementing Lean Software Development. Addison-Wesley.' },
    { title: 'BECK, K.', detail: 'Extreme Programming Explained. Addison-Wesley.' },
    { title: 'COHN, M.', detail: 'User Stories Applied. Addison-Wesley.' },
  ],
  lessonIds: ['lic.es.01'],
};

export const capEsArquitetura: Chapter = {
  id: 'cap.es.02',
  grimoireId: 'grim.engsoft',
  number: 2,
  title: 'Arquitetura, Modelagem e Qualidade',
  subtitle: 'Desenhar, modelar, testar e manter',
  topicIds: ['ti.engsoft.arquitetura', 'ti.engsoft.modelagem', 'ti.engsoft.qualidade'],
  review: 'nao-revisado',
  estimatedMinutes: 45,
  sections: [
    { id: 'arquitetura', title: '1. Estilos arquiteturais e princípios', body: c2s1 },
    { id: 'modelagem', title: '2. UML, BPMN e padrões de projeto', body: c2s2 },
    { id: 'qualidade', title: '3. Qualidade, testes e dívida técnica', body: c2s3 },
  ],
  glossary: [
    { term: 'Alta coesão', definition: 'Responsabilidades de um módulo fortemente relacionadas entre si.' },
    { term: 'Baixo acoplamento', definition: 'Pouca dependência entre módulos.' },
    { term: 'Responsabilidade única', definition: 'Uma classe deve ter um só motivo para mudar (S do SOLID).' },
    { term: 'Inversão de dependência', definition: 'Depender de abstrações, não de implementações (D do SOLID).' },
    { term: 'YAGNI', definition: 'Não implementar o que ainda não é necessário.' },
    { term: 'Composição (UML)', definition: 'Losango cheio: a parte não existe sem o todo.' },
    { term: 'Fluxo de mensagem (BPMN)', definition: 'Seta tracejada que liga participantes (pools) diferentes.' },
    { term: 'Adapter', definition: 'Padrão estrutural que converte uma interface na esperada pelo cliente.' },
    { term: 'Observer', definition: 'Padrão comportamental que notifica dependentes quando um objeto muda.' },
    { term: 'Teste de estresse', definition: 'Leva o sistema além do limite para ver como falha e se recupera.' },
    { term: 'Refatoração', definition: 'Melhorar a estrutura interna sem alterar o comportamento externo.' },
    { term: 'Dívida técnica', definition: 'Custo futuro, com juros, de atalhos tomados hoje.' },
  ],
  references: [
    { title: 'GAMMA, E.; HELM, R.; JOHNSON, R.; VLISSIDES, J.', detail: 'Padrões de Projeto. Bookman.' },
    { title: 'MARTIN, R. C.', detail: 'Arquitetura Limpa. Alta Books.' },
    { title: 'FOWLER, M.', detail: 'Refatoração. Novatec.' },
    { title: 'OMG', detail: 'UML 2.5.1 e BPMN 2.0.2 Specifications.' },
    { title: 'ISO/IEC 25010', detail: 'Modelos de qualidade de produto de software.' },
  ],
  lessonIds: ['lic.es.02'],
};

export const licoesEngSoft: Lesson[] = [
  {
    id: 'lic.es.01',
    chapterId: 'cap.es.01',
    title: 'Processos de Engenharia de Software',
    goal: 'Ciclos de vida, Kanban, Lean, XP e TDD; requisitos, histórias INVEST, critérios de aceite e casos de uso.',
    cards: [
      { title: 'Ciclos e métodos', body: '**Iterativo** refina; **incremental** acrescenta. Espiral = riscos.\n\nKanban: **limite de WIP**, fluxo. Lean: eliminar desperdício. XP: par, **TDD**, integração contínua, refatoração.' },
      { title: 'Requisitos', body: 'Funcional = **o que**; não funcional = **como**, mensurável.\n\nHistória: Como… quero… para…, **INVEST**, critérios Dado/Quando/Então.\n\n**include** sempre; **extend** às vezes.' },
    ],
    questionIds: Array.from({ length: 10 }, (_, i) => `q.es.01.${String(i + 1).padStart(3, '0')}`),
  },
  {
    id: 'lic.es.02',
    chapterId: 'cap.es.02',
    title: 'Plantas e Provas',
    goal: 'Camadas, SOA, microsserviços e eventos; SOLID e afins; UML, BPMN, padrões GoF; testes, refatoração e dívida técnica.',
    cards: [
      { title: 'Arquitetura', body: 'Microsserviços: cada um com **seus dados**. Eventos: baixo acoplamento.\n\n**Alta coesão, baixo acoplamento.** SOLID; DRY, KISS, YAGNI.' },
      { title: 'Modelagem', body: 'UML: **14 diagramas**. Composição (cheio) × agregação (vazio).\n\nBPMN: sequência dentro do pool, **mensagem entre pools**.\n\nGoF: 5 criacionais, 7 estruturais, 11 comportamentais.' },
      { title: 'Qualidade', body: '**Carga** = esperado; **estresse** = além do limite. Regressão a cada mudança.\n\nRefatorar não muda o comportamento. Dívida técnica cobra **juros**.' },
    ],
    questionIds: Array.from({ length: 12 }, (_, i) => `q.es.02.${String(i + 1).padStart(3, '0')}`),
  },
];
