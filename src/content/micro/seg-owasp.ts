// Microaula "OWASP Top 10:2025 e DevSecOps" (cap.seg.02, seção owasp), no formato aprovado em
// 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do texto
// do capítulo (cap02-defesa/03-owasp.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegOwasp: MicroLesson = {
  id: 'micro.seg.owasp',
  chapterId: 'cap.seg.02',
  sectionId: 'owasp',
  title: 'OWASP Top 10:2025 e DevSecOps',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'No portal, a URL /processos/123 mostra um processo seu. Você troca para /processos/124 e aparece o processo de outra pessoa. O que falhou?',
    options: [
      { text: 'O sistema não verificou se você podia ver aquele processo', why: 'Isso. É controle de acesso quebrado, o primeiro da lista do OWASP Top 10:2025.' },
      { text: 'Nada: se o número existe, pode ser visto', why: 'Existir não é o mesmo que poder ver. O servidor precisa conferir a autorização.' },
      { text: 'A senha do usuário era fraca', why: 'A senha não entra aqui: você já estava logado e viu o que não devia.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'lista-a',
      part: 'Top 10:2025',
      title: 'Da A01 à A05',
      goal: 'Conhecer as cinco primeiras categorias do OWASP Top 10:2025.',
      explain:
        'O **OWASP Top 10** é o documento de conscientização mais conhecido sobre riscos em aplicações web. O edital cita a edição **2025**.\n\n| | Categoria | Em poucas palavras |\n|---|---|---|\n| A01 | **Controle de acesso quebrado** | Acessar o que não deveria; inclui SSRF |\n| A02 | **Configuração incorreta** | Padrões inseguros, erros detalhados, permissões abertas |\n| A03 | **Cadeia de suprimentos** | Dependências e build comprometidos |\n| A04 | **Falhas criptográficas** | Dados sem cifragem, algoritmos fracos |\n| A05 | **Injeção** | Dado do usuário vira comando: SQL, SO, LDAP, XSS |',
      check: {
        kind: 'choice',
        id: 'la-c',
        prompt: 'Qual é a categoria A01 do OWASP Top 10:2025?',
        options: [
          { text: 'Controle de acesso quebrado', why: 'Isso.' },
          { text: 'Injeção', why: 'A injeção é a A05.' },
          { text: 'Falhas criptográficas', why: 'As falhas criptográficas são a A04.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Uma frase ajuda: **Acesso, Configuração, Cadeia, Cripto, Injeção** (A01 a A05). A primeira é sempre "quem pode fazer o quê": **controle de acesso**.',
        check: {
          kind: 'sort',
          id: 'la-r',
          prompt: 'Ligue cada problema à categoria.',
          categories: ['A01 Acesso', 'A02 Configuração', 'A05 Injeção'],
          items: [
            { text: 'Ver o processo de outro órgão trocando o número na URL', cat: 0, why: 'Acesso indevido.' },
            { text: 'Página de erro mostra detalhes internos do servidor', cat: 1, why: 'Mensagem de erro detalhada.' },
            { text: 'Texto digitado vira parte de um comando SQL', cat: 2, why: 'Injeção.' },
          ],
        },
      },
    },
    {
      id: 'lista-b',
      part: 'Top 10:2025',
      title: 'Da A06 à A10',
      goal: 'Conhecer as cinco últimas categorias do OWASP Top 10:2025.',
      explain:
        '| | Categoria | Em poucas palavras |\n|---|---|---|\n| A06 | **Projeto inseguro** | Falha de concepção que implementação nenhuma corrige |\n| A07 | **Falhas de autenticação** | Senha fraca aceita, sem MFA, sessão mal gerida |\n| A08 | **Integridade de software ou dados** | Atualização aceita sem verificar origem; desserialização insegura |\n| A09 | **Registro e alerta** | Ataque não registrado, ou registrado sem aviso |\n| A10 | **Condições excepcionais** | Erros tratados de forma insegura: falhar "aberto", vazar detalhes |',
      check: {
        kind: 'choice',
        id: 'lb-c',
        prompt: 'O sistema sofreu dezenas de tentativas de invasão, ficou tudo no log e ninguém foi avisado. Qual categoria?',
        options: [
          { text: 'A09, falhas de registro e alerta', why: 'Isso: registrado sem que ninguém fosse avisado.' },
          { text: 'A07, falhas de autenticação', why: 'O problema descrito é ninguém ser avisado.' },
          { text: 'A06, projeto inseguro', why: 'Projeto inseguro é falha de concepção.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Associe uma imagem a cada uma. **A06**: a planta da casa já nasceu errada. **A07**: a porta aceita qualquer chave. **A08**: aceitar uma "atualização" sem conferir de onde veio. **A09**: o alarme gravou, mas não tocou. **A10**: quando algo dá errado, a porta fica aberta.',
        check: {
          kind: 'sort',
          id: 'lb-r',
          prompt: 'Classifique.',
          categories: ['A07 Autenticação', 'A08 Integridade', 'A10 Condições excepcionais'],
          items: [
            { text: 'Sistema aceita a senha "123456" e não tem MFA', cat: 0, why: 'Falha de autenticação.' },
            { text: 'Atualização instalada sem verificar a origem', cat: 1, why: 'Integridade não verificada.' },
            { text: 'Ao dar erro, o sistema libera o acesso', cat: 2, why: 'Falhar "aberto".' },
          ],
        },
      },
    },
    {
      id: 'mudancas',
      part: 'Top 10:2025',
      title: 'O que mudou desde 2021',
      goal: 'Saber as mudanças da edição 2025 em relação à de 2021.',
      explain:
        'Mudanças que podem cair:\n\n- **duas categorias novas**: **A03** (cadeia de suprimentos) e **A10** (condições excepcionais);\n- o **SSRF** foi incorporado ao **A01**;\n- **configuração incorreta subiu** para o 2º lugar;\n- **falhas criptográficas desceram** do 2º para o 4º.\n\nA A03 amplia a antiga "componentes vulneráveis e desatualizados".',
      check: {
        kind: 'choice',
        id: 'mu-c',
        prompt: 'Quais categorias o OWASP Top 10:2025 introduziu como novas?',
        options: [
          { text: 'Cadeia de suprimentos (A03) e condições excepcionais (A10)', why: 'Isso.' },
          { text: 'Injeção (A05) e controle de acesso (A01)', why: 'Essas já existiam.' },
          { text: 'Falhas criptográficas (A04) e projeto inseguro (A06)', why: 'Essas já existiam; a criptográfica só desceu de posição.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'As novas são **as duas pontas "de fora"** da aplicação: o que vem **de fora para dentro** (dependências, cadeia de suprimentos, A03) e o que acontece **quando tudo dá errado** (condições excepcionais, A10).',
        check: {
          kind: 'multi',
          id: 'mu-r',
          prompt: 'Marque as mudanças corretas da edição 2025.',
          options: [
            { text: 'O SSRF passou a fazer parte do A01', correct: true, why: 'Incorporado ao controle de acesso.' },
            { text: 'Configuração incorreta subiu para o 2º lugar', correct: true, why: 'Subiu.' },
            { text: 'Falhas criptográficas subiram para o 1º lugar', correct: false, why: 'Desceram do 2º para o 4º.' },
          ],
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'idor',
      part: 'Exemplos',
      title: 'Trocar o número na URL (IDOR)',
      goal: 'Reconhecer a referência direta insegura a objeto e a defesa.',
      explain:
        'A URL `/api/processos/123` mostra o processo de outro órgão quando o usuário troca **123 por 124**.\n\nEsse padrão é a **referência direta insegura a objeto** (**IDOR**; em APIs, **BOLA**), dentro do **A01**.\n\n**Defesa:** verificar a autorização **no servidor, a cada requisição**, para **aquele objeto específico**; negar por padrão.',
      check: {
        kind: 'choice',
        id: 'id-c',
        prompt: 'Qual é a defesa contra o IDOR?',
        options: [
          { text: 'Verificar no servidor, a cada requisição, se o usuário pode acessar aquele objeto', why: 'Isso.' },
          { text: 'Esconder o número da URL no navegador', why: 'Esconder não impede: o servidor precisa checar a autorização.' },
          { text: 'Usar senhas mais fortes', why: 'O usuário já está logado; falta checar a autorização por objeto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine um **guarda-volumes** que entrega qualquer mochila a quem disser o número dela, sem olhar o seu ticket. A correção é olhar o ticket **toda vez** e **para aquela mochila**. No sistema, o "ticket" é a checagem de autorização no servidor.',
        check: {
          kind: 'choice',
          id: 'id-r',
          prompt: 'O IDOR (ou BOLA, em APIs) se enquadra em qual categoria?',
          options: [
            { text: 'A01, controle de acesso quebrado', why: 'Isso.' },
            { text: 'A05, injeção', why: 'Não há comando injetado; o usuário acessa um objeto que não é dele.' },
            { text: 'A04, falhas criptográficas', why: 'Não é problema de cifragem.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'sql',
      part: 'Exemplos',
      title: 'Injeção de SQL e a consulta parametrizada',
      goal: 'Explicar a injeção de SQL e a defesa principal.',
      explain:
        '```js\n// Vulnerável: o valor vira parte do comando\ndb.query("SELECT * FROM usuarios WHERE login = \'" + login + "\'");\n\n// Seguro: consulta parametrizada\ndb.query(\'SELECT * FROM usuarios WHERE login = $1\', [login]);\n```\n\nCom `login = \' OR \'1\'=\'1`, a primeira devolve **todos** os usuários.\n\nDefesa principal: **consulta parametrizada** (*prepared statement*). Validação de entrada e menor privilégio no banco **complementam**.',
      check: {
        kind: 'choice',
        id: 'sq-c',
        prompt: 'Qual é a medida mais eficaz contra injeção de SQL?',
        options: [
          { text: 'Consulta parametrizada (prepared statement)', why: 'Isso: o valor nunca é interpretado como SQL.' },
          { text: 'Só validar a entrada', why: 'Validação complementa, mas a defesa principal é a consulta parametrizada.' },
          { text: 'Cifrar o banco de dados', why: 'Cifrar não impede o comando injetado de rodar.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Na versão vulnerável, o texto do usuário é **colado dentro do comando**, e ele pode escrever pedaços de SQL. Na parametrizada, o comando vai **pronto** e o valor vai **separado**, numa caixinha: o banco nunca o lê como comando.',
        check: {
          kind: 'fix',
          id: 'sq-r',
          prompt: 'Toque na linha vulnerável.',
          lines: [
            "db.query('SELECT * FROM processos WHERE id = $1', [id]);",
            "db.query(\"SELECT * FROM usuarios WHERE login = '\" + login + \"'\");",
            "db.query('SELECT * FROM setores WHERE nome = $1', [nome]);",
          ],
          bug: 1,
          why: 'Concatena o texto do usuário dentro do SQL.',
          fixed: "db.query('SELECT * FROM usuarios WHERE login = $1', [login]);",
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'xss',
      part: 'Exemplos',
      title: 'XSS: código que roda no navegador da vítima',
      goal: 'Saber o que é XSS e como se defende.',
      explain:
        'O **XSS** também é **injeção** (A05): o dado injetado é **código JavaScript** que roda **no navegador da vítima**.\n\n**Defesa:** **codificar a saída** conforme o contexto e usar **política de segurança de conteúdo (CSP)**.',
      check: {
        kind: 'choice',
        id: 'xs-c',
        prompt: 'Um comentário com um script é exibido e o script roda no navegador de quem lê. Qual é a defesa?',
        options: [
          { text: 'Codificar a saída conforme o contexto e usar CSP', why: 'Isso.' },
          { text: 'Consulta parametrizada no banco', why: 'Isso defende o SQL; o XSS se combate na saída para o navegador.' },
          { text: 'Aumentar o tamanho das senhas', why: 'Não tem relação com o script injetado.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'No SQL, o alvo é o **banco**; no XSS, o alvo é o **navegador de quem lê**. Por isso a defesa do XSS está no momento de **mostrar** o dado: codificar a saída para que ela apareça como texto, nunca como código, e a CSP limitando o que pode rodar.',
        check: {
          kind: 'sort',
          id: 'xs-r',
          prompt: 'Ligue o ataque à defesa principal.',
          categories: ['Injeção de SQL', 'XSS'],
          items: [
            { text: 'Consulta parametrizada', cat: 0, why: 'Valor separado do comando.' },
            { text: 'Codificar a saída conforme o contexto', cat: 1, why: 'O dado aparece como texto.' },
            { text: 'Política de segurança de conteúdo (CSP)', cat: 1, why: 'Limita o que roda no navegador.' },
          ],
        },
      },
    },
    {
      id: 'cadeia',
      part: 'Exemplos',
      title: 'Cadeia de suprimentos e SBOM',
      goal: 'Reconhecer o risco da cadeia de suprimentos e suas defesas.',
      explain:
        'Exemplo do **A03**: uma biblioteca popular é **comprometida** e passa a enviar dados a terceiros.\n\nDefesas:\n\n- inventário de componentes (**SBOM**);\n- **fixação de versões**;\n- análise de dependências;\n- verificação de **assinaturas**;\n- revisão de atualizações.',
      check: {
        kind: 'multi',
        id: 'ca-c',
        prompt: 'Quais medidas defendem contra falhas na cadeia de suprimentos? Marque todas.',
        options: [
          { text: 'Manter um SBOM (inventário de componentes)', correct: true, why: 'Saber o que se usa.' },
          { text: 'Fixar as versões das dependências', correct: true, why: 'Evita trocas silenciosas.' },
          { text: 'Atualizar tudo automaticamente, sem revisar', correct: false, why: 'O texto pede revisão das atualizações.' },
          { text: 'Verificar assinaturas dos pacotes', correct: true, why: 'Confere a origem.' },
        ],
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **cozinha de restaurante**: é preciso saber a **lista de ingredientes** (SBOM), comprar sempre do mesmo lote conferido (fixar versões), checar o **lacre** do fornecedor (assinatura) e olhar o que chega antes de usar (revisar atualizações).',
        check: {
          kind: 'choice',
          id: 'ca-r',
          prompt: 'O que é um SBOM?',
          options: [
            { text: 'Um inventário dos componentes do software', why: 'Isso.' },
            { text: 'Um tipo de ataque à cadeia de suprimentos', why: 'É uma defesa, não um ataque.' },
            { text: 'Uma ferramenta que executa a aplicação para testá-la', why: 'Isso é DAST; o SBOM é um inventário.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'devsecops',
      part: 'DevSecOps',
      title: 'Segurança desde o começo: SAST, DAST e SCA',
      goal: 'Diferenciar SAST, DAST e SCA e entender o shift left.',
      explain:
        '**DevSecOps** integra a segurança a **todo o ciclo**, em vez de deixá-la para o fim (*shift left*).\n\n| Sigla | O que analisa | Quando |\n|---|---|---|\n| **SAST** | O **código-fonte**, sem executar | Desde o commit |\n| **DAST** | A **aplicação em execução**, de fora, como atacante | Em homologação |\n| **SCA** | **Componentes e dependências** com falhas conhecidas | A cada build |\n\nTambém: varredura de **segredos** no código e de **IaC e imagens** antes da implantação.',
      check: {
        kind: 'choice',
        id: 'de-c',
        prompt: 'Qual ferramenta analisa o código-fonte em busca de vulnerabilidades sem executar a aplicação?',
        options: [
          { text: 'SAST', why: 'Isso: análise estática.' },
          { text: 'DAST', why: 'O DAST testa a aplicação rodando.' },
          { text: 'SCA', why: 'O SCA olha as dependências de terceiros.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Use as letras. **S**AST = **S**tatic: lê o código parado. **D**AST = **D**ynamic: ataca a aplicação rodando. **SCA** = análise de **componentes**: confere as bibliotecas de terceiros. E *shift left* é trazer tudo isso para o começo da linha do tempo.',
        check: {
          kind: 'sort',
          id: 'de-r',
          prompt: 'Ligue cada ferramenta ao que analisa.',
          categories: ['SAST', 'DAST', 'SCA'],
          items: [
            { text: 'Código-fonte, sem executar', cat: 0, why: 'Estática.' },
            { text: 'Aplicação rodando, vista de fora', cat: 1, why: 'Dinâmica.' },
            { text: 'Bibliotecas de terceiros com falhas conhecidas', cat: 2, why: 'Componentes.' },
          ],
        },
      },
    },
    {
      id: 'apis',
      part: 'Ambientes',
      title: 'APIs, containers e nuvem',
      goal: 'Aplicar os cuidados de segurança em APIs, containers e nuvem.',
      explain:
        '- **APIs**: autenticação e autorização **em cada chamada**, verificação **por objeto** (o BOLA lidera o OWASP API Security Top 10), limitação de taxa, validação de entrada, não expor campos além do necessário.\n- **Containers**: imagens mínimas e confiáveis, varredura, **não rodar como root**, segredos fora da imagem, arquivos somente leitura.\n- **Nuvem**: responsabilidade compartilhada; a maioria dos incidentes vem de **configurações incorretas** e permissões excessivas do cliente.',
      check: {
        kind: 'choice',
        id: 'ap-c',
        prompt: 'Qual prática é recomendada para containers?',
        options: [
          { text: 'Não executar o container como root', why: 'Isso.' },
          { text: 'Guardar as senhas dentro da imagem, para facilitar', why: 'Segredos devem ficar fora da imagem.' },
          { text: 'Usar a maior imagem possível, com todas as ferramentas', why: 'O recomendado são imagens mínimas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em **menos é mais**. Imagem **mínima** tem menos coisas para atacar. **Sem root**, um invasor no container pode menos. **Segredo fora da imagem** não vaza junto com ela. E na nuvem, quem mais causa incidente é a **configuração errada** do próprio cliente.',
        check: {
          kind: 'choice',
          id: 'ap-r',
          prompt: 'Segundo o texto, de onde vem a maior parte dos incidentes em nuvem?',
          options: [
            { text: 'De configurações incorretas e permissões excessivas do cliente', why: 'Isso.' },
            { text: 'De falhas físicas nos datacenters do provedor', why: 'O texto aponta a configuração do cliente.' },
            { text: 'Do uso de containers', why: 'O texto aponta a configuração do cliente.' },
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
      prompt: 'A anotação sobre o Top 10:2025 tem um erro. Toque na linha errada.',
      lines: ['A01: controle de acesso quebrado (inclui SSRF)', 'A05: injeção (SQL, SO, LDAP e XSS)', 'Falhas criptográficas subiram para o 1º lugar'],
      bug: 2,
      why: 'As falhas criptográficas desceram do 2º para o 4º lugar.',
      fixed: 'Falhas criptográficas desceram do 2º para o 4º lugar',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'A equipe quer achar vulnerabilidades o quanto antes, ainda no commit. Qual plano?',
      scenarios: [
        { title: 'Plano A', body: 'Rodar só um DAST no ambiente de homologação, perto da entrega.' },
        { title: 'Plano B', body: 'Rodar SAST e varredura de segredos a cada commit, e SCA a cada build.' },
      ],
      answer: 1,
      why: 'Shift left: SAST e varredura de segredos já no commit, SCA a cada build. O DAST complementa depois, em homologação.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'Classifique cada situação na categoria do Top 10:2025.',
      categories: ['A01 Acesso', 'A03 Cadeia', 'A05 Injeção'],
      items: [
        { text: 'API devolve dados de qualquer ID que o cliente pedir', cat: 0, why: 'BOLA.' },
        { text: 'Biblioteca de terceiros comprometida envia dados para fora', cat: 1, why: 'Cadeia de suprimentos.' },
        { text: 'Campo de busca aceita trechos de SQL', cat: 2, why: 'Injeção.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: quando o serviço de login dá erro, o sistema deixa o usuário entrar "para não atrapalhar". Que categoria?',
      options: [
        { text: 'A10, tratamento inadequado de condições excepcionais', why: 'Isso: falhar "aberto".' },
        { text: 'A04, falhas criptográficas', why: 'Não há falha de cifragem.' },
        { text: 'A03, cadeia de suprimentos', why: 'Não envolve dependências de terceiros.' },
      ],
      answer: 0,
      errorKind: 'confusao',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.008' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.009' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.010' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.011' },
    { kind: 'exam', id: 'prova-5', prompt: 'Questão no estilo da prova', questionId: 'q.seg.02.012' },
  ],
  summary: [
    'Top 10:2025: A01 acesso, A02 configuração, A03 cadeia, A04 cripto, A05 injeção, A06 projeto, A07 autenticação, A08 integridade, A09 registro e alerta, A10 condições excepcionais.',
    'Novas: A03 e A10. SSRF entrou no A01. Configuração subiu ao 2º; cripto desceu ao 4º.',
    'IDOR/BOLA: checar a autorização no servidor, a cada requisição, por objeto.',
    'SQL: consulta parametrizada. XSS: codificar a saída e CSP.',
    'Cadeia de suprimentos: SBOM, fixar versões, analisar dependências, verificar assinaturas.',
    'DevSecOps (shift left): SAST (código parado), DAST (aplicação rodando), SCA (dependências).',
    'APIs: autorização em cada chamada. Containers: sem root, imagem mínima. Nuvem: configuração incorreta é a maior causa.',
  ],
};
