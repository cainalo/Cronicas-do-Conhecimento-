// Microaula "Família ISO/IEC 27000" (cap.seg.02, seção iso), no formato aprovado em 24/10/2026. Uma
// ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto do capítulo
// (cap02-defesa/06-iso.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegIso: MicroLesson = {
  id: 'micro.seg.iso',
  chapterId: 'cap.seg.02',
  sectionId: 'iso',
  title: 'Família ISO/IEC 27000',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um órgão quer um certificado oficial de que sua gestão de segurança segue uma norma internacional. Ele precisa de uma norma que diga:',
    options: [
      { text: 'O que o sistema de gestão precisa ter, para poder ser auditado e certificado', why: 'Isso. Certificação exige requisitos verificáveis: é o papel da ISO/IEC 27001.' },
      { text: 'Só dicas de boas práticas, sem requisitos', why: 'Dicas ajudam a implementar, mas não servem de base para certificar.' },
      { text: 'Apenas o vocabulário da área', why: 'Vocabulário não é requisito; não dá para certificar com ele.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'familia',
      part: 'A família',
      title: 'As principais normas',
      goal: 'Associar cada norma da família ao seu conteúdo.',
      explain:
        'Publicadas pela ISO e pela IEC e adotadas no Brasil pela ABNT (prefixo NBR).\n\n| Norma | Conteúdo |\n|---|---|\n| **27000** | Visão geral e **vocabulário** |\n| **27001** | **Requisitos** do SGSI; **certificável** |\n| **27002** | **Diretrizes** para implementar os controles; não certificável |\n| **27005** | **Gestão de riscos** de segurança |\n| **27701** | Extensão para **privacidade** (dados pessoais) |',
      check: {
        kind: 'sort',
        id: 'fa-c',
        prompt: 'Ligue cada norma ao conteúdo.',
        categories: ['27000', '27005', '27701'],
        items: [
          { text: 'Vocabulário da família', cat: 0, why: 'Visão geral e termos.' },
          { text: 'Orientações para gestão de riscos', cat: 1, why: 'Riscos de segurança.' },
          { text: 'Gestão da privacidade de dados pessoais', cat: 2, why: 'Extensão de privacidade.' },
        ],
      },
      recovery: {
        explain: 'Use o final do número. **27000**: o **dicionário**. **27001**: as **regras** (o que precisa ter). **27002**: o **manual** (como fazer os controles). **27005**: **riscos**. **27701**: **privacidade**.',
        check: {
          kind: 'choice',
          id: 'fa-r',
          prompt: 'Qual norma traz orientações para a gestão de riscos de segurança da informação?',
          options: [
            { text: 'ISO/IEC 27005', why: 'Isso.' },
            { text: 'ISO/IEC 27000', why: 'A 27000 é o vocabulário.' },
            { text: 'ISO/IEC 27701', why: 'A 27701 é sobre privacidade.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'diferenca',
      part: 'A família',
      title: '27001 × 27002',
      goal: 'Diferenciar a 27001 da 27002, a distinção mais cobrada.',
      explain:
        'A diferença mais cobrada:\n\n- a **27001 diz o que o SGSI precisa ter** e **permite certificação**;\n- a **27002 explica como implementar** os controles (código de prática) e **não é certificável**.\n\nSGSI = **Sistema de Gestão da Segurança da Informação**.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'Qual norma estabelece os requisitos do SGSI e permite certificação?',
        options: [
          { text: 'ISO/IEC 27001', why: 'Isso.' },
          { text: 'ISO/IEC 27002', why: 'A 27002 orienta a implementação, mas não é certificável.' },
          { text: 'ISO/IEC 27005', why: 'A 27005 trata da gestão de riscos.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense em **prova e apostila**. A **27001** é a **prova**: diz o que você precisa ter, e o auditor confere (certificação). A **27002** é a **apostila**: ensina como fazer cada controle, mas ninguém é "certificado na apostila".',
        check: {
          kind: 'tf',
          id: 'di-r',
          prompt: 'A ISO/IEC 27002 é a norma certificável da família.',
          answer: false,
          why: 'Falso. Certifica-se pela 27001; a 27002 traz diretrizes.',
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sgsi',
      part: 'ISO/IEC 27001:2022',
      title: 'A estrutura do SGSI e o PDCA',
      goal: 'Reconhecer a estrutura do SGSI e sua relação com o PDCA.',
      explain:
        'A versão vigente é a **27001:2022**.\n\nO SGSI segue a estrutura comum dos sistemas de gestão: contexto, liderança, **planejamento** (com **avaliação e tratamento de riscos**), apoio, operação, avaliação de desempenho e **melhoria contínua**.\n\nEssa lógica corresponde ao ciclo **PDCA**: **planejar, fazer, checar, agir**.',
      check: {
        kind: 'order',
        id: 'sg-c',
        prompt: 'Ordene o ciclo PDCA.',
        items: ['Planejar', 'Fazer', 'Checar', 'Agir'],
        why: 'P-D-C-A: planejar, fazer, checar e agir para melhorar, recomeçando o ciclo.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O SGSI não é um projeto que termina: é um **ciclo**. Planeja-se (inclusive os riscos), executa-se, confere-se se funcionou e corrige-se o que falhou. Depois, de novo. Daí a **melhoria contínua**.',
        check: {
          kind: 'choice',
          id: 'sg-r',
          prompt: 'Em que parte do SGSI entram a avaliação e o tratamento de riscos?',
          options: [
            { text: 'No planejamento', why: 'Isso.' },
            { text: 'Só depois da certificação', why: 'Os riscos são parte do próprio SGSI, no planejamento.' },
            { text: 'Em nenhuma: riscos ficam só na 27005', why: 'A 27005 orienta, mas a 27001 exige que a avaliação e o tratamento existam.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'anexo-a',
      part: 'ISO/IEC 27001:2022',
      title: 'Anexo A: 93 controles em 4 temas',
      goal: 'Saber quantos controles e temas tem o Anexo A de 2022.',
      explain:
        'O **Anexo A** lista **93 controles** em **4 temas**:\n\n| Tema | Qtde. | Exemplos |\n|---|---|---|\n| Organizacionais | 37 | Políticas, fornecedores, incidentes |\n| Pessoas | 8 | Seleção, conscientização, trabalho remoto |\n| Físicos | 14 | Perímetros, mesa limpa e tela limpa |\n| Tecnológicos | 34 | Acesso, criptografia, backup, registros |\n\nAtenção: **114 controles em 14 domínios** era a versão de **2013**.',
      check: {
        kind: 'choice',
        id: 'aa-c',
        prompt: 'O Anexo A da ISO/IEC 27001:2022 organiza seus controles em:',
        options: [
          { text: '93 controles em 4 temas', why: 'Isso.' },
          { text: '114 controles em 14 domínios', why: 'Essa era a versão de 2013.' },
          { text: '37 controles em 8 temas', why: '37 é a quantidade só dos organizacionais.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Guarde **93 e 4** para 2022, e **114 e 14** para 2013. Os 4 temas são fáceis: **organização, pessoas, físico, tecnologia**. O maior é o organizacional (37); o menor, pessoas (8).',
        check: {
          kind: 'sort',
          id: 'aa-r',
          prompt: 'Em que tema fica cada controle?',
          categories: ['Organizacionais', 'Pessoas', 'Físicos', 'Tecnológicos'],
          items: [
            { text: 'Gestão de fornecedores', cat: 0, why: 'Organizacional.' },
            { text: 'Conscientização dos servidores', cat: 1, why: 'Pessoas.' },
            { text: 'Mesa limpa e tela limpa', cat: 2, why: 'Físico.' },
            { text: 'Backup', cat: 3, why: 'Tecnológico.' },
          ],
        },
      },
    },
    {
      id: 'novidades',
      part: 'ISO/IEC 27001:2022',
      title: 'Controles novos e Declaração de Aplicabilidade',
      goal: 'Saber os controles novos de 2022 e o papel da Declaração de Aplicabilidade.',
      explain:
        'A edição de 2022 introduziu controles novos, como:\n\n- **inteligência de ameaças**;\n- **segurança no uso de serviços em nuvem**;\n- **prevenção de vazamento de dados**;\n- **codificação segura**.\n\nA **Declaração de Aplicabilidade** registra **quais controles** do Anexo A a organização adota e **justifica os excluídos**.',
      check: {
        kind: 'choice',
        id: 'no-c',
        prompt: 'Que documento registra quais controles do Anexo A a organização adota e justifica os excluídos?',
        options: [
          { text: 'A Declaração de Aplicabilidade', why: 'Isso.' },
          { text: 'A política de segurança da informação', why: 'A política define diretrizes de alto nível.' },
          { text: 'A ISO/IEC 27000', why: 'A 27000 é o vocabulário da família.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **cardápio de 93 pratos**: a organização marca quais vai servir e explica por que deixou outros de fora. Essa lista marcada e justificada é a **Declaração de Aplicabilidade**.',
        check: {
          kind: 'multi',
          id: 'no-r',
          prompt: 'Quais controles foram introduzidos na edição de 2022? Marque todos.',
          options: [
            { text: 'Inteligência de ameaças', correct: true, why: 'Novo.' },
            { text: 'Segurança no uso de serviços em nuvem', correct: true, why: 'Novo.' },
            { text: 'Codificação segura', correct: true, why: 'Novo.' },
            { text: 'Prevenção de vazamento de dados', correct: true, why: 'Novo.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'politica',
      part: 'Política',
      title: 'A política de segurança',
      goal: 'Saber o papel da política de segurança e a do TCE-GO.',
      explain:
        'A **política de segurança** é o documento de **mais alto nível**: **aprovada pela direção**, define diretrizes, papéis e responsabilidades, e se desdobra em **normas e procedimentos**.\n\nNo **TCE-GO**, é a **Resolução Administrativa nº 17/2024**, citada no edital em Legislação Institucional e em Legislação Aplicada à TI.',
      check: {
        kind: 'choice',
        id: 'po-c',
        prompt: 'Quem aprova a política de segurança da informação?',
        options: [
          { text: 'A direção da organização', why: 'Isso: é o documento de mais alto nível.' },
          { text: 'Cada servidor, para si mesmo', why: 'A política vale para todos e é aprovada pela direção.' },
          { text: 'O fornecedor de antivírus', why: 'A política é da própria organização, aprovada pela direção.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **constituição** da segurança: a direção aprova, ela diz os princípios e quem faz o quê, e dela saem as **normas** e os **procedimentos** do dia a dia. No TCE-GO, é a **RA nº 17/2024**.',
        check: {
          kind: 'order',
          id: 'po-r',
          prompt: 'Ordene do documento de MAIS alto nível ao mais detalhado.',
          items: ['Política', 'Normas', 'Procedimentos'],
          why: 'A política se desdobra em normas e procedimentos.',
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['27001: requisitos do SGSI, certificável', '27002: diretrizes para implementar os controles', '27001:2022: 114 controles em 14 domínios'],
      bug: 2,
      why: '114 controles em 14 domínios era a versão de 2013. A de 2022 tem 93 controles em 4 temas.',
      fixed: '27001:2022: 93 controles em 4 temas',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O órgão quer certificar seu SGSI. Qual norma usar como base da auditoria?',
      scenarios: [
        { title: 'Opção A', body: 'ISO/IEC 27002, por ser mais detalhada.' },
        { title: 'Opção B', body: 'ISO/IEC 27001, que traz os requisitos do SGSI.' },
      ],
      answer: 1,
      why: 'A certificação é feita pela 27001; a 27002 apoia a implementação dos controles.',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'Ligue cada número à edição.',
      categories: ['27001:2022', '27001:2013'],
      items: [
        { text: '93 controles', cat: 0, why: 'Versão vigente.' },
        { text: '4 temas', cat: 0, why: 'Versão vigente.' },
        { text: '114 controles', cat: 1, why: 'Versão anterior.' },
        { text: '14 domínios', cat: 1, why: 'Versão anterior.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: a equipe decidiu não adotar um controle do Anexo A porque o órgão não desenvolve software. Onde isso fica registrado?',
      options: [
        { text: 'Na Declaração de Aplicabilidade, com a justificativa', why: 'Isso: os excluídos são justificados ali.' },
        { text: 'Em lugar nenhum: basta não aplicar', why: 'A exclusão precisa ser registrada e justificada.' },
        { text: 'Na ISO/IEC 27000', why: 'A 27000 é a norma de vocabulário, não um registro do órgão.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.019' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.020' },
  ],
  summary: [
    '27000 vocabulário; 27001 requisitos do SGSI (certificável); 27002 diretrizes dos controles; 27005 riscos; 27701 privacidade.',
    'A 27001 diz o que ter; a 27002 explica como fazer.',
    'SGSI: contexto, liderança, planejamento (riscos), apoio, operação, avaliação, melhoria contínua (PDCA).',
    'Anexo A 2022: 93 controles em 4 temas (organizacionais 37, pessoas 8, físicos 14, tecnológicos 34). 2013: 114 em 14.',
    'Novos em 2022: inteligência de ameaças, nuvem, vazamento de dados, codificação segura.',
    'Declaração de Aplicabilidade: controles adotados e exclusões justificadas.',
    'Política: aprovada pela direção, desdobra-se em normas e procedimentos. TCE-GO: RA nº 17/2024.',
  ],
};
