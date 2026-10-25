// Série "Segurança básica" (cap.prim.02, trecho seguranca), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta como a proteção da informação evoluiu, da cifra de César ao
// phishing; as seguintes apresentam os três pilares (CID) e as defesas do dia a dia (senha, dois
// fatores, backup, phishing), uma ideia por etapa. Fatos conferidos com o texto do capítulo
// (03-seguranca.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.prim.02', sectionId: 'seguranca' } as const;

export const primSegHistoria: MicroLesson = {
  ...S,
  id: 'prim.seguranca.1',
  series: { id: 'prim.seguranca', order: 1 },
  title: 'Da cifra de César ao golpe por e-mail',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Guardar segredos e proteger mensagens é uma preocupação que nasceu com o computador?',
    options: [
      { text: 'Não: é muito mais antiga', why: 'Isso. Esta aula começa na Roma antiga e chega ao golpe por e-mail.' },
      { text: 'Sim, começou com a internet', why: 'Muito antes da internet já se escondiam mensagens. Esta aula conta como.' },
      { text: 'Só existe nos celulares', why: 'A preocupação é de milhares de anos. Esta aula mostra.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'cesar',
      part: 'A história',
      title: 'A cifra de César',
      art: 'livro',
      goal: 'Entender a cifra de César como um exemplo antigo de mensagem em código.',
      explain:
        'O historiador romano Suetônio conta que **Júlio César** escrevia mensagens **trocando cada letra** pela que vem **três posições adiante** no alfabeto.\n\nO **A** virava **D**; o **B** virava **E**.\n\nQuem pegasse a carta **sem saber a regra** não entendia nada. É a **cifra de César**, uma das primeiras formas conhecidas de proteger um segredo.',
      example: 'Com a regra de César, a palavra "CAB" vira "FDE".',
      check: {
        kind: 'choice',
        id: 'ce-c',
        prompt: 'Na cifra de César, com a troca de três posições, a letra C vira:',
        options: [
          { text: 'F', why: 'Isso: C, D, E, F. Três posições adiante.' },
          { text: 'D', why: 'D é só uma posição adiante. São três: F.' },
          { text: 'A', why: 'A cifra anda para frente: C vira F.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Conte nos dedos a partir da letra: para o **C**, ande **um** (D), **dois** (E), **três** (F). A letra cifrada é **F**. Quem recebe faz o caminho de volta: anda três para trás e lê a mensagem original.',
        check: {
          kind: 'choice',
          id: 'ce-r',
          prompt: 'Com a regra de César, a letra A vira:',
          options: [
            { text: 'D', why: 'Isso: B, C, D.' },
            { text: 'B', why: 'B é só uma posição. São três: D.' },
            { text: 'Z', why: 'A cifra anda para frente: A vira D.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'enigma',
      part: 'A história',
      title: 'A Enigma e Alan Turing',
      art: 'engrenagem',
      goal: 'Conhecer a máquina Enigma e quem ajudou a decifrá-la.',
      explain:
        'Na **Segunda Guerra Mundial**, o exército alemão cifrava as mensagens com a máquina **Enigma**.\n\n**Matemáticos poloneses** fizeram os primeiros avanços para decifrá-la.\n\nDepois, na Inglaterra, em **Bletchley Park**, a equipe de **Alan Turing** construiu máquinas que **ajudaram a ler** essas mensagens.\n\nA proteção da informação virou assunto de guerra, e de matemática.',
      check: {
        kind: 'choice',
        id: 'en-c',
        prompt: 'O que era a Enigma?',
        options: [
          { text: 'A máquina alemã que cifrava mensagens na Segunda Guerra', why: 'Isso.' },
          { text: 'O primeiro computador pessoal', why: 'A Enigma cifrava mensagens; não era computador pessoal.' },
          { text: 'Um vírus de computador', why: 'Era uma máquina de cifrar, dos anos 1940.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'A Enigma fazia algo parecido com a cifra de César, só que muito mais complicado: a regra de troca **mudava a cada letra**, por engrenagens. Por isso foi tão difícil decifrar, e foi preciso o trabalho de poloneses e da equipe de **Alan Turing**.',
        check: {
          kind: 'choice',
          id: 'en-r',
          prompt: 'Onde a equipe de Alan Turing trabalhou para ler as mensagens da Enigma?',
          options: [
            { text: 'Em Bletchley Park, na Inglaterra', why: 'Isso.' },
            { text: 'No CERN, na Suíça', why: 'No CERN nasceu a Web, em 1989.' },
            { text: 'No MIT, nos Estados Unidos', why: 'No MIT surgiu o CTSS, com senhas, em 1961.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'senha',
      part: 'A história',
      title: '1961: a primeira senha',
      art: 'cadeado',
      goal: 'Saber por que o computador passou a pedir senha.',
      explain:
        'Em **1961**, no **MIT**, o sistema **CTSS** permitia que **várias pessoas** usassem o **mesmo computador**.\n\nSurgiu um problema novo: como impedir que um usuário mexesse nos arquivos do outro?\n\nA solução foi pedir uma **senha** para cada usuário. A senha prova que **você é você**.',
      check: {
        kind: 'choice',
        id: 'sn-c',
        prompt: 'Por que o CTSS, em 1961, passou a pedir senha?',
        options: [
          { text: 'Para um usuário não mexer nos arquivos do outro', why: 'Isso: várias pessoas usavam a mesma máquina.' },
          { text: 'Para deixar o computador mais rápido', why: 'A senha protege; não acelera.' },
          { text: 'Para se conectar à Web', why: 'A Web só surgiu em 1989.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **armário compartilhado** no trabalho, com uma gaveta para cada pessoa. Para ninguém abrir a gaveta do outro, cada uma ganha um **cadeado** com segredo próprio. No computador compartilhado do MIT, esse cadeado foi a **senha**.',
        check: {
          kind: 'choice',
          id: 'sn-r',
          prompt: 'A senha serve para:',
          options: [
            { text: 'Provar que você é você', why: 'Isso.' },
            { text: 'Dar nome a um arquivo', why: 'Nome de arquivo não prova identidade.' },
            { text: 'Ligar uma rede à outra', why: 'Isso é o roteador.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'morris',
      part: 'A história',
      title: '1988: o verme de Morris',
      art: 'rede',
      goal: 'Conhecer o verme de Morris como o primeiro grande ataque na internet.',
      explain:
        'Em **1988**, um programa chamado **verme de Morris** começou a **se copiar sozinho**, de máquina em máquina, pela internet.\n\nEle deixou **lentos ou parados milhares de computadores**.\n\nO caso mostrou que a rede, criada para pesquisadores que confiavam uns nos outros, **precisava de proteção**.',
      check: {
        kind: 'choice',
        id: 'mo-c',
        prompt: 'O que o verme de Morris fazia?',
        options: [
          { text: 'Se copiava sozinho de máquina em máquina pela internet', why: 'Isso.' },
          { text: 'Cifrava mensagens como a Enigma', why: 'A Enigma é dos anos 1940; o verme se espalhava pela rede.' },
          { text: 'Pedia senha aos usuários', why: 'Ele se copiava sozinho; não pedia nada.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Lembra que a ARPANET nasceu ligando **universidades**, entre pessoas que se conheciam? Ninguém pensou em trancas. O verme de Morris foi como uma **praga** que passou de vizinho em vizinho, e todos descobriram que precisavam de proteção.',
        check: {
          kind: 'order',
          id: 'mo-r',
          prompt: 'Ordene do mais antigo ao mais recente.',
          items: ['Cifra de César (Roma antiga)', 'Máquina Enigma (Segunda Guerra)', 'Senha no CTSS (1961)', 'Verme de Morris (1988)'],
          why: 'Da Roma antiga ao primeiro grande ataque na internet.',
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'phishing',
      part: 'A história',
      title: 'Anos 1990: a pescaria',
      art: 'celular',
      goal: 'Saber de onde vem o nome phishing.',
      explain:
        'Com o **e-mail** e a **internet comercial**, nos **anos 1990**, criminosos passaram a mandar **mensagens falsas** pedindo **senhas**.\n\nO nome **phishing** (lê-se "fíchin") vem do inglês **"fishing"**, **pescar**: o criminoso joga a **isca** e espera alguém morder.\n\nO golpe é antigo, mas continua sendo um dos mais comuns até hoje.',
      check: {
        kind: 'choice',
        id: 'ph-c',
        prompt: 'O nome phishing vem de:',
        options: [
          { text: '"Fishing", pescar em inglês', why: 'Isso: o criminoso joga uma isca.' },
          { text: 'O nome de quem inventou o golpe', why: 'Vem de "fishing", pescar.' },
          { text: 'Uma marca de computador', why: 'Vem de "fishing", pescar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na pescaria, o peixe vê a **minhoca** e não o **anzol**. No phishing, a pessoa vê uma mensagem que parece do banco ou do órgão (a isca) e não percebe o golpe (o anzol) até digitar a senha.',
        check: {
          kind: 'choice',
          id: 'ph-r',
          prompt: 'O phishing começou a se espalhar com:',
          options: [
            { text: 'O e-mail e a internet comercial, nos anos 1990', why: 'Isso.' },
            { text: 'A máquina Enigma', why: 'A Enigma é dos anos 1940 e cifrava mensagens militares.' },
            { text: 'O censo de 1890', why: 'O censo de 1890 usou cartões perfurados; não tem relação.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'order',
      id: 'cons-1',
      prompt: 'Ordene a história inteira.',
      items: ['Júlio César troca letras nas cartas', 'A equipe de Turing ajuda a ler a Enigma', 'O verme de Morris se espalha (1988)', 'Mensagens de phishing se espalham por e-mail (anos 1990)'],
      why: 'Do segredo das cartas ao golpe por e-mail.',
      errorKind: 'conceito',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Cifra de César: troca cada letra por outra, três adiante', 'CTSS (1961): uma senha para cada usuário', 'Verme de Morris: máquina de cifrar da Segunda Guerra'],
      bug: 2,
      why: 'A máquina de cifrar da guerra era a Enigma. O verme de Morris foi um programa que se espalhou pela internet em 1988.',
      fixed: 'Verme de Morris: programa que se copiava pela internet (1988)',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: com a regra de César, decifre "ROD". Ande três letras para trás em cada uma.',
      options: [
        { text: 'OLA', why: 'Isso: R volta para O, O volta para L, D volta para A.' },
        { text: 'URG', why: 'Isso foi andar para frente; para decifrar, volte três.' },
        { text: 'SPE', why: 'Isso foi andar só uma para frente.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Júlio César trocava cada letra pela de três posições adiante: a cifra de César.',
    'Na Segunda Guerra, poloneses e a equipe de Alan Turing, em Bletchley Park, ajudaram a ler a Enigma alemã.',
    'Em 1961, o CTSS do MIT passou a pedir senha a cada usuário: a senha prova que você é você.',
    'Em 1988, o verme de Morris se copiou pela internet e parou milhares de computadores.',
    'Nos anos 1990 surgiu o phishing, de "fishing", pescar: a mensagem falsa é a isca.',
  ],
};

export const primSegPilares: MicroLesson = {
  ...S,
  id: 'prim.seguranca.2',
  series: { id: 'prim.seguranca', order: 2 },
  title: 'Os três pilares: C, I e D',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Um vazamento de salários, um contrato com valor trocado às escondidas e um sistema fora do ar. São o mesmo problema?',
    options: [
      { text: 'Não: são três problemas diferentes', why: 'Isso. Cada um fere um pilar da segurança, e esta aula mostra qual.' },
      { text: 'Sim, é tudo a mesma coisa', why: 'Parecem, mas cada um fere um pilar diferente.' },
      { text: 'Nenhum deles é problema de segurança', why: 'Os três são, e esta aula mostra por quê.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'confidencialidade',
      part: 'Os pilares',
      title: 'C: confidencialidade, quem vê',
      art: 'cadeado',
      goal: 'Saber o que é confidencialidade.',
      explain:
        'A segurança da informação se apoia em três ideias, a sigla **CID**.\n\nA primeira é a **confidencialidade**: **só quem tem autorização** pode **ver** a informação.\n\nExemplo: o salário de um servidor não deve aparecer para qualquer pessoa.\n\nÉ como uma **carta lacrada**: só o destinatário lê.',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'A lista de salários dos servidores vazou na internet. Qual pilar foi ferido?',
        options: [
          { text: 'Confidencialidade', why: 'Isso: pessoas sem autorização viram a informação.' },
          { text: 'Disponibilidade', why: 'A lista continuou acessível; o problema é quem a viu.' },
          { text: 'Integridade', why: 'Os valores não mudaram; foram vistos por quem não devia.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Lembre da **cifra de César**: o objetivo era que só quem conhecia a regra lesse a carta. Isso é **confidencialidade**: a pergunta é sempre **"quem pode ver?"**.',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: 'Confidencialidade é sobre:',
          options: [
            { text: 'Quem pode ver a informação', why: 'Isso.' },
            { text: 'Se a informação mudou', why: 'Isso é integridade.' },
            { text: 'Se o sistema está no ar', why: 'Isso é disponibilidade.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'integridade',
      part: 'Os pilares',
      title: 'I: integridade, se mudou',
      art: 'balanca',
      goal: 'Saber o que é integridade.',
      explain:
        'A **integridade** garante que a informação **não foi alterada sem autorização**.\n\nExemplo: o **valor de um contrato** não pode ser trocado às escondidas.\n\nÉ como um **lacre** que mostra se a caixa foi aberta: se o lacre rompeu, você sabe que alguém mexeu.\n\nNum órgão de controle, um dado alterado pode **esconder uma fraude**.',
      check: {
        kind: 'choice',
        id: 'in-c',
        prompt: 'Alguém sem autorização mudou o valor de um contrato no sistema. Qual pilar foi ferido?',
        options: [
          { text: 'Integridade', why: 'Isso: a informação foi alterada sem autorização.' },
          { text: 'Confidencialidade', why: 'O problema não foi quem viu, foi a mudança.' },
          { text: 'Disponibilidade', why: 'O sistema continuou no ar; o dado é que mudou.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '**Íntegro** quer dizer **inteiro, sem mexida**. A pergunta da integridade é **"mudou sem autorização?"**. Se o contrato dizia R$ 100 mil e agora diz R$ 900 mil sem ninguém autorizado ter mexido, a integridade foi ferida.',
        check: {
          kind: 'choice',
          id: 'in-r',
          prompt: 'O lacre que mostra se a caixa foi aberta lembra qual pilar?',
          options: [
            { text: 'Integridade', why: 'Isso: mostra se houve mexida.' },
            { text: 'Confidencialidade', why: 'A carta lacrada lembra confidencialidade; o lacre que denuncia mexida lembra integridade.' },
            { text: 'Disponibilidade', why: 'Disponibilidade é estar lá quando precisa.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'disponibilidade',
      part: 'Os pilares',
      title: 'D: disponibilidade, está lá quando preciso',
      art: 'calendario',
      goal: 'Saber o que é disponibilidade.',
      explain:
        'A **disponibilidade** garante que a informação está **acessível quando quem tem direito precisa** dela.\n\nExemplo: o **sistema de processos** precisa estar **no ar no horário de trabalho**.\n\nUm sistema fora do ar **paralisa o atendimento**, mesmo que nada tenha vazado nem mudado.\n\nLembra do verme de Morris? Ele deixou milhares de computadores parados: um ataque à disponibilidade.',
      check: {
        kind: 'choice',
        id: 'di-c',
        prompt: 'O sistema de processos ficou fora do ar a manhã inteira. Qual pilar foi ferido?',
        options: [
          { text: 'Disponibilidade', why: 'Isso: quem precisava não conseguiu acessar.' },
          { text: 'Integridade', why: 'Nada foi alterado; o sistema é que não estava lá.' },
          { text: 'Confidencialidade', why: 'Ninguém viu o que não devia; o sistema estava parado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Pense numa **biblioteca fechada** no dia da prova: os livros estão lá, inteiros e protegidos, mas você não consegue usá-los. A pergunta da disponibilidade é **"está lá quando eu preciso?"**.',
        check: {
          kind: 'choice',
          id: 'di-r',
          prompt: '"Confidencialidade significa que o sistema fica no ar o tempo todo." Isso está:',
          options: [
            { text: 'Errado: ficar acessível é disponibilidade', why: 'Isso. Confidencialidade é quem pode ver.' },
            { text: 'Certo', why: 'Ficar no ar é disponibilidade, não confidencialidade.' },
            { text: 'Certo só à noite', why: 'Não depende do horário: ficar acessível é disponibilidade.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Qual pilar cada situação fere?',
      categories: ['Confidencialidade', 'Integridade', 'Disponibilidade'],
      items: [
        { text: 'Estagiário vê os salários de todos sem autorização', cat: 0, why: 'Quem vê.' },
        { text: 'Data de um pagamento trocada às escondidas', cat: 1, why: 'Se mudou.' },
        { text: 'Site do órgão fora do ar no prazo de entrega', cat: 2, why: 'Se está lá quando preciso.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Confidencialidade: quem vê', 'Integridade: se mudou', 'Disponibilidade: se a senha é forte'],
      bug: 2,
      why: 'Disponibilidade é a informação estar lá quando quem tem direito precisa.',
      fixed: 'Disponibilidade: se está lá quando preciso',
      errorKind: 'confusao',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: um programa espalhado pela rede trava o servidor e ninguém consegue abrir os processos, mas nada vaza nem muda. Qual pilar foi atingido?',
      options: [
        { text: 'Disponibilidade', why: 'Isso: como no verme de Morris.' },
        { text: 'Confidencialidade', why: 'Nada vazou.' },
        { text: 'Integridade', why: 'Nada mudou.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.006' }],
  summary: [
    'Os três pilares da segurança formam a sigla CID.',
    'Confidencialidade: só quem tem autorização vê (carta lacrada). Pergunta: quem vê?',
    'Integridade: a informação não foi alterada sem autorização (lacre que denuncia). Pergunta: mudou?',
    'Disponibilidade: está acessível quando quem tem direito precisa. Pergunta: está lá quando preciso?',
  ],
};

export const primSegDefesas: MicroLesson = {
  ...S,
  id: 'prim.seguranca.3',
  series: { id: 'prim.seguranca', order: 3 },
  title: 'Senha, dois fatores, backup e phishing',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você usa a mesma senha, "12345678", no e-mail, no banco e no sistema do trabalho. Isso é seguro?',
    options: [
      { text: 'Não: é fácil de adivinhar e repetida', why: 'Isso. Esta aula mostra como fazer melhor e outras defesas do dia a dia.' },
      { text: 'Sim, porque tem oito caracteres', why: 'Tamanho só não basta: é uma sequência óbvia, e repetida em todo lugar.' },
      { text: 'Sim, se ninguém souber', why: 'Uma senha tão óbvia é adivinhada; e, repetida, um vazamento abre tudo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'senha-forte',
      part: 'Senha',
      title: 'Senha forte',
      art: 'cadeado',
      goal: 'Reconhecer as marcas de uma senha forte e os cuidados com ela.',
      explain:
        'A **senha** prova que você é você. Uma senha **forte**:\n\n- é **longa**;\n- **mistura** letras, números e símbolos;\n- **não usa** dados fáceis de adivinhar, como **data de nascimento**.\n\nE dois cuidados: **não repita** a mesma senha em vários lugares e **não compartilhe**.',
      check: {
        kind: 'multi',
        id: 'sf-c',
        prompt: 'O que deixa uma senha forte? Marque todos.',
        options: [
          { text: 'Ser longa', correct: true, why: 'Isso.' },
          { text: 'Misturar letras, números e símbolos', correct: true, why: 'Isso.' },
          { text: 'Usar a data de nascimento', correct: false, why: 'É fácil de adivinhar.' },
          { text: 'Ser a mesma em todos os sites', correct: false, why: 'Repetir é perigoso: se uma vaza, todas caem.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **chave de casa**: se for igual à de todas as casas da rua, ou se o segredo for o seu aniversário, qualquer um abre. Senha forte é a chave **difícil de copiar** e **só sua**, diferente para cada porta.',
        check: {
          kind: 'choice',
          id: 'sf-r',
          prompt: 'Por que não repetir a mesma senha em vários sites?',
          options: [
            { text: 'Se ela vazar em um, abre todos os outros', why: 'Isso.' },
            { text: 'Porque o site não aceita', why: 'Muitos aceitariam; o risco é o vazamento abrir tudo.' },
            { text: 'Não há problema em repetir', why: 'Há: um vazamento abriria todas as contas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'dois-fatores',
      part: 'Senha',
      title: 'Dois fatores: a segunda chave',
      art: 'celular',
      goal: 'Entender a autenticação em dois fatores.',
      explain:
        'Melhor ainda que uma senha forte é a **autenticação em dois fatores**.\n\nAlém da **senha**, o sistema pede **outra prova**, como um **código no celular**.\n\nQuem descobrir a sua senha **ainda não tem a segunda chave**, e não consegue entrar.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Um criminoso descobriu sua senha, mas a conta tem dois fatores. O que acontece?',
        options: [
          { text: 'Ele ainda precisa da segunda prova, como o código no seu celular', why: 'Isso: falta a segunda chave.' },
          { text: 'Ele entra normalmente', why: 'Sem a segunda prova, não entra.' },
          { text: 'A senha deixa de existir', why: 'A senha continua; só não basta sozinha.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como uma porta com **duas fechaduras**: uma abre com a chave (a senha), a outra com um código que chega no seu celular. Quem roubou só a chave fica do lado de fora.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: 'Na autenticação em dois fatores, além da senha, o sistema pede:',
          options: [
            { text: 'Outra prova, como um código no celular', why: 'Isso.' },
            { text: 'A mesma senha duas vezes', why: 'Repetir a senha não é segundo fator: é preciso outra prova.' },
            { text: 'O endereço IP', why: 'O segundo fator é uma prova a mais de que é você.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'backup',
      part: 'Cópia',
      title: 'Backup: a cópia de segurança',
      art: 'dados',
      goal: 'Saber o que é backup e por que ajuda na disponibilidade.',
      explain:
        '**Backup** é uma **cópia dos dados** guardada **em outro lugar**, para recuperar se o original se perder.\n\nSe um **disco queima** ou um arquivo é **apagado por engano**, o backup **recente e testado** salva o trabalho.\n\nPor isso ele ajuda muito na **disponibilidade**: a informação volta a estar lá quando você precisa.',
      check: {
        kind: 'choice',
        id: 'bk-c',
        prompt: 'O disco do setor queimou, mas os arquivos voltaram no mesmo dia. O que tornou isso possível?',
        options: [
          { text: 'Um backup recente', why: 'Isso: a cópia guardada em outro lugar.' },
          { text: 'Uma senha forte', why: 'A senha protege o acesso; não recupera um disco queimado.' },
          { text: 'O antivírus', why: 'Antivírus não recupera arquivos de um disco queimado.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense na **chave reserva** da casa, guardada com um parente: se você perde a sua, ainda entra. O backup é a **cópia reserva** dos dados, guardada **em outro lugar**. E precisa ser **testado**: uma chave reserva que não abre a porta não serve.',
        check: {
          kind: 'choice',
          id: 'bk-r',
          prompt: 'Por que o backup deve ficar em outro lugar, e não no mesmo disco?',
          options: [
            { text: 'Se o disco queimar, a cópia também se perderia', why: 'Isso.' },
            { text: 'Para ocupar menos espaço', why: 'O motivo é não perder as duas coisas juntas.' },
            { text: 'Não importa onde fica', why: 'Importa: se fica junto, some junto.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'isca',
      part: 'Phishing',
      title: 'Phishing: a isca',
      art: 'revisao',
      goal: 'Saber como o phishing funciona.',
      explain:
        '**Phishing** é o golpe em que o criminoso **finge ser alguém confiável** para enganar você.\n\nChega como **e-mail**, **mensagem** ou **site falso**, pedindo **senha**, **código** ou **clique em um link**.\n\nO criminoso não precisa quebrar nenhuma máquina: ele **engana a pessoa** para que ela mesma entregue a chave.',
      check: {
        kind: 'choice',
        id: 'is-c',
        prompt: 'No phishing, como o criminoso consegue a senha?',
        options: [
          { text: 'Enganando a pessoa, que entrega a senha', why: 'Isso: ele finge ser alguém confiável.' },
          { text: 'Quebrando o disco do computador', why: 'O phishing engana a pessoa; não mexe no disco.' },
          { text: 'Pelo backup', why: 'O backup é uma cópia de segurança; o phishing é engano.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É o golpe do **falso funcionário** que bate à porta de uniforme dizendo ser da companhia de luz. Ele não arromba nada: você abre a porta porque **confiou**. No phishing, o "uniforme" é um e-mail ou site com cara de oficial.',
        check: {
          kind: 'choice',
          id: 'is-r',
          prompt: 'Por onde o phishing costuma chegar?',
          options: [
            { text: 'E-mail, mensagem ou site falso', why: 'Isso.' },
            { text: 'Só por carta de papel', why: 'Chega principalmente por e-mail, mensagem ou site falso.' },
            { text: 'Pelo cabo de energia', why: 'O phishing chega como mensagem enganosa.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'sinais',
      part: 'Phishing',
      title: 'Sinais de alerta',
      art: 'alvo',
      goal: 'Reconhecer os sinais de phishing e a atitude certa.',
      explain:
        'Sinais de alerta:\n\n- **urgência** ("sua conta será bloqueada hoje");\n- **remetente estranho**;\n- **erros de escrita**;\n- **links com endereço esquisito**.\n\n**Na dúvida, não clique**: procure o órgão pelo **canal oficial**, como o telefone ou o site que você já conhece.',
      check: {
        kind: 'multi',
        id: 'si-c',
        prompt: 'Quais são sinais de alerta de phishing? Marque todos.',
        options: [
          { text: '"Sua conta será bloqueada hoje!"', correct: true, why: 'Urgência é sinal clássico.' },
          { text: 'Remetente que você não conhece', correct: true, why: 'Remetente estranho.' },
          { text: 'Link com endereço esquisito', correct: true, why: 'Sinal de site falso.' },
          { text: 'Mensagem que você mesmo pediu, pelo site oficial', correct: false, why: 'Se você mesmo pediu pelo canal oficial, não é sinal de golpe.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'O golpista quer que você **aja rápido, sem pensar**. Por isso usa pressa, ameaça e links. A defesa é o contrário: **parar**, desconfiar e **conferir pelo canal oficial** que você já conhece, nunca pelo link da mensagem.',
        check: {
          kind: 'choice',
          id: 'si-r',
          prompt: 'Chegou um e-mail urgente pedindo sua senha por um link. O que fazer?',
          options: [
            { text: 'Não clicar e procurar o órgão pelo canal oficial', why: 'Isso.' },
            { text: 'Clicar rápido para não perder a conta', why: 'A pressa é justamente a isca do golpe.' },
            { text: 'Responder com a senha', why: 'Nunca envie senha por e-mail.' },
          ],
          answer: 0,
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
      lines: ['Senha forte: longa e misturada', 'Backup: cópia em outro lugar', 'Phishing: cópia de segurança dos dados'],
      bug: 2,
      why: 'Phishing é o golpe em que o criminoso finge ser alguém confiável.',
      fixed: 'Phishing: golpe que engana a pessoa',
      errorKind: 'confusao',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual defesa ajuda em cada caso?',
      categories: ['Dois fatores', 'Backup', 'Desconfiar e ir ao canal oficial'],
      items: [
        { text: 'Sua senha vazou', cat: 0, why: 'Falta a segunda chave para o criminoso.' },
        { text: 'Um arquivo foi apagado por engano', cat: 1, why: 'A cópia recupera o arquivo.' },
        { text: 'E-mail urgente pede para clicar num link', cat: 2, why: 'Não clicar; conferir pelo canal oficial.' },
      ],
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual senha é mais forte?',
      scenarios: [
        { title: 'Senha A', body: 'maria1985' },
        { title: 'Senha B', body: 'Ponte!Verde7Chuva#Rio' },
      ],
      answer: 1,
      why: 'A senha B é longa e mistura letras, números e símbolos. A A usa nome e ano, fáceis de adivinhar.',
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.prim.02.008' },
  ],
  summary: [
    'Senha forte: longa, mistura letras, números e símbolos, sem dados fáceis. Não repita nem compartilhe.',
    'Dois fatores: além da senha, outra prova, como um código no celular.',
    'Backup: cópia em outro lugar, recente e testada. Ajuda na disponibilidade.',
    'Phishing: o criminoso finge ser confiável. Sinais: urgência, remetente estranho, erros, links esquisitos.',
    'Na dúvida, não clique: procure o canal oficial.',
  ],
};
