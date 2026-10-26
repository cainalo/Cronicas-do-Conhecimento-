// Série "Período e reescrita" (cap.port.02, trecho periodo), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta da Nomenclatura Gramatical Brasileira e da origem de "embora";
// as seguintes ensinam coordenação e subordinação, o valor dos conectivos e as técnicas de reescrita,
// uma ideia por etapa. Fatos conferidos com o texto do capítulo (03-periodo-reescrita.md). Revisão
// editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.02', sectionId: 'periodo' } as const;

export const portPerHistoria: MicroLesson = {
  ...S,
  id: 'port.periodo.1',
  series: { id: 'port.periodo', order: 1 },
  title: 'De onde vêm os nomes das orações',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Oração subordinada adverbial concessiva": por que todas as gramáticas usam o mesmo nome comprido?',
    options: [
      { text: 'Porque uma nomenclatura oficial padronizou esses nomes', why: 'Isso. Esta aula conta essa história e a de uma palavra muito usada: "embora".' },
      { text: 'Por coincidência', why: 'Houve uma padronização oficial no Brasil, em 1959.' },
      { text: 'Porque é lei federal usar esse nome', why: 'Foi uma portaria do Ministério da Educação, para o ensino.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'ngb',
      part: 'A história',
      title: '1959: a Nomenclatura Gramatical Brasileira',
      art: 'livro',
      goal: 'Saber que a NGB padronizou a terminologia gramatical no ensino.',
      explain:
        'Até os anos 1950, cada gramática brasileira usava **nomes diferentes** para as mesmas coisas. O aluno que trocava de livro ficava perdido.\n\nEm **1959**, uma portaria do **Ministério da Educação** adotou a **Nomenclatura Gramatical Brasileira** (**NGB**), preparada por uma comissão de professores.\n\nDela vêm os nomes que as provas usam: oração **coordenada**, **subordinada**, **adverbial**, **concessiva**.',
      check: {
        kind: 'choice',
        id: 'ng-c',
        prompt: 'Para que serviu a NGB?',
        options: [
          { text: 'Padronizar os nomes da gramática no ensino', why: 'Isso.' },
          { text: 'Criar novas regras de concordância', why: 'Ela padronizou nomes, não criou regras.' },
          { text: 'Mudar a ortografia', why: 'Ortografia é assunto dos acordos ortográficos.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Imagine cada hospital chamando o mesmo remédio por um nome diferente. A NGB foi como uma **lista oficial de nomes**: desde 1959, "oração subordinada adverbial concessiva" quer dizer a mesma coisa em qualquer livro.',
        check: {
          kind: 'choice',
          id: 'ng-r',
          prompt: 'Em que ano a NGB foi adotada?',
          options: [
            { text: '1959', why: 'Isso.' },
            { text: '1536', why: '1536 é a primeira gramática do português.' },
            { text: '2018', why: '2018 é a 3ª edição do Manual de Redação da Presidência.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'embora',
      part: 'A história',
      title: '"Embora" vem de "em boa hora"',
      art: 'calendario',
      goal: 'Perceber que os conectivos mudam de sentido ao longo do tempo.',
      explain:
        'A palavra **embora** nasceu de "**em boa hora**". No começo, servia para desejar sorte: "vá **embora**" era "vá em boa hora".\n\nCom os séculos, ganhou outro uso: o de **concessão**, como em "**Embora** o prazo fosse curto, a equipe concluiu".\n\nOs conectivos mudam de valor com o tempo e com o contexto. Por isso a prova pergunta **qual relação** um conectivo estabelece **naquela frase**.',
      check: {
        kind: 'choice',
        id: 'em-c',
        prompt: 'De que expressão vem "embora"?',
        options: [
          { text: '"Em boa hora"', why: 'Isso.' },
          { text: '"Em hora má"', why: 'Vem de "em boa hora".' },
          { text: '"Em outra hora"', why: 'Vem de "em boa hora".' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Ainda hoje convivem dois "emboras": o de **ir** ("vou **embora**", restos do "em boa hora") e o de **concessão** ("**embora** chovesse, saímos"). A mesma palavra, valores diferentes conforme a frase.',
        check: {
          kind: 'choice',
          id: 'em-r',
          prompt: 'Em "Embora houvesse falhas, as contas foram aprovadas", "embora" indica:',
          options: [
            { text: 'Concessão', why: 'Isso: algo que poderia impedir, mas não impediu.' },
            { text: 'Causa', why: 'As falhas não causaram a aprovação.' },
            { text: 'Partida', why: 'Esse é o "ir embora", outro uso.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'prova',
      part: 'Hoje',
      title: 'O que a prova pede',
      art: 'alvo',
      goal: 'Reconhecer os três tipos de questão deste trecho.',
      explain:
        'O edital junta "coordenação e subordinação", "conectivos" e "reescrita". Na prática, são três tipos de questão:\n\n- **substituir um conectivo** sem alterar o sentido;\n- **reescrever** um trecho mantendo a correção;\n- **identificar a relação** que uma oração tem com outra (causa, concessão, condição...).\n\nAs próximas aulas treinam um tipo de cada vez.',
      check: {
        kind: 'multi',
        id: 'pv-c',
        prompt: 'Quais são tipos de questão deste trecho? Marque todas.',
        options: [
          { text: 'Substituir um conectivo sem alterar o sentido', correct: true, why: 'Isso.' },
          { text: 'Reescrever mantendo a correção', correct: true, why: 'Isso.' },
          { text: 'Identificar a relação entre orações', correct: true, why: 'Isso.' },
          { text: 'Contar as sílabas de um verso', correct: false, why: 'Isso é métrica, de outra área.' },
        ],
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Pense num **mecânico**: às vezes ele **troca uma peça** (o conectivo), às vezes **remonta** o motor (reescrita), às vezes só **diagnostica** o que uma peça faz (a relação). As três tarefas usam o mesmo conhecimento.',
        check: {
          kind: 'choice',
          id: 'pv-r',
          prompt: 'Trocar "embora" por "porque" mantém o sentido?',
          options: [
            { text: 'Não: muda concessão em causa', why: 'Isso.' },
            { text: 'Sim, são sinônimos', why: 'Têm valores diferentes: concessão e causa.' },
            { text: 'Sim, se a frase for curta', why: 'O tamanho não muda o valor do conectivo.' },
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
      prompt: 'Ordene do mais antigo ao mais recente.',
      items: ['"Em boa hora" vira "embora"', 'NGB adotada pelo Ministério da Educação (1959)', 'Questões de reescrita nas provas de hoje'],
      why: 'Da palavra antiga à prova atual.',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Qual o valor de "embora" em cada frase?',
      categories: ['Concessão', 'Partida'],
      items: [
        { text: 'Embora chovesse, a sessão ocorreu.', cat: 0, why: 'A chuva não impediu.' },
        { text: 'Embora fosse tarde, ele ficou.', cat: 0, why: 'O horário não impediu.' },
        { text: 'O servidor foi embora às 18 h.', cat: 1, why: 'Sentido de ir.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-3',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['NGB: nomes padronizados em 1959', '"Embora" vem de "em boa hora"', 'Conectivos têm sempre o mesmo valor'],
      bug: 2,
      why: 'Muitos conectivos mudam de valor conforme o contexto, como "como" e "desde que".',
      fixed: 'O valor do conectivo depende da frase',
      errorKind: 'conceito',
    },
  ],
  exam: [],
  summary: [
    '1959: o Ministério da Educação adota a Nomenclatura Gramatical Brasileira (NGB).',
    '"Embora" vem de "em boa hora"; hoje é concessivo.',
    'Três tipos de questão: trocar conectivo, reescrever, identificar a relação.',
  ],
};

export const portPerOracoes: MicroLesson = {
  ...S,
  id: 'port.periodo.2',
  series: { id: 'port.periodo', order: 2 },
  title: 'Coordenação e subordinação',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Em "O auditor analisou as notas e redigiu o relatório", uma oração depende da outra?',
    options: [
      { text: 'Não: são independentes, somadas pelo "e"', why: 'Isso: é coordenação. Esta aula compara com a subordinação.' },
      { text: 'Sim: "redigiu" depende de "analisou"', why: 'Cada oração tem sentido completo; o "e" só as soma.' },
      { text: 'Não há oração', why: 'Há duas: "analisou as notas" e "redigiu o relatório".' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'diferenca',
      part: 'A diferença',
      title: 'Somar ou encaixar',
      art: 'balanca',
      goal: 'Distinguir coordenação de subordinação.',
      explain:
        '- **Coordenação**: orações **independentes**, **somadas**. "O auditor analisou as notas **e** redigiu o relatório."\n- **Subordinação**: uma oração **exerce função** na outra, a principal. "O auditor concluiu **que as notas eram falsas**": a oração destacada é o **objeto direto** de "concluiu".\n\nTeste: dá para trocar a oração por "**isso**"? "Concluiu **isso**." Então ela está encaixada.',
      check: {
        kind: 'choice',
        id: 'df-c',
        prompt: 'Em "É necessário que se publique o edital", a oração destacada "que se publique o edital" é:',
        options: [
          { text: 'Subordinada: é o sujeito de "é necessário"', why: 'Isso: "isso é necessário".' },
          { text: 'Coordenada aditiva', why: 'Ela exerce função (sujeito) na principal.' },
          { text: 'Uma oração independente', why: 'Ela completa "é necessário".' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Coordenação é **trem**: vagões engatados, cada um inteiro. Subordinação é **encaixe**: uma peça entra **dentro** de outra e faz parte dela. Se você troca a oração por "isso" e a frase continua de pé, ela é uma peça encaixada.',
        check: {
          kind: 'choice',
          id: 'df-r',
          prompt: 'Qual destas frases tem subordinação?',
          options: [
            { text: 'O contrato que foi aditado está irregular.', why: 'Isso: "que foi aditado" caracteriza "contrato".' },
            { text: 'O prazo acabou e o processo foi julgado.', why: 'São duas orações independentes, somadas.' },
            { text: 'Ou apresenta as contas, ou será multado.', why: 'Duas alternativas independentes: coordenação.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'coordenadas',
      part: 'Coordenadas',
      title: 'Os cinco tipos de coordenada',
      art: 'trilha',
      goal: 'Classificar as coordenadas pelo conectivo.',
      explain:
        '| Tipo | Conectivos |\n|---|---|\n| Aditiva | e, nem, não só... mas também |\n| Adversativa | mas, porém, contudo, todavia, no entanto |\n| Alternativa | ou... ou, ora... ora |\n| Conclusiva | logo, portanto, por isso, pois (depois do verbo) |\n| Explicativa | porque, que, pois (antes do verbo) |\n\nO **pois** muda: "Apresse-se, **pois** o prazo termina hoje" é explicativo; "o gestor deve, **pois**, ressarcir" é conclusivo.',
      check: {
        kind: 'choice',
        id: 'cd-c',
        prompt: '"O prazo era curto; contudo, a equipe concluiu." A segunda oração é:',
        options: [
          { text: 'Coordenada adversativa', why: 'Isso: "contudo" opõe.' },
          { text: 'Coordenada conclusiva', why: 'Conclusivas usam "logo", "portanto".' },
          { text: 'Subordinada causal', why: '"Contudo" é coordenativo adversativo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Troque o conectivo por **mas**. Funcionou? É **adversativa**. Por **portanto**? **Conclusiva**. Por **e**? **Aditiva**. "O prazo era curto, **mas** a equipe concluiu": funciona, então "contudo" é adversativo.',
        check: {
          kind: 'choice',
          id: 'cd-r',
          prompt: '"Houve dano; o gestor deve, pois, ressarcir." Aqui "pois" é:',
          options: [
            { text: 'Conclusivo', why: 'Isso: depois do verbo e entre vírgulas, equivale a "portanto".' },
            { text: 'Explicativo', why: 'Explicativo vem antes do verbo.' },
            { text: 'Aditivo', why: 'Equivale a "portanto", não a "e".' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'subordinadas',
      part: 'Subordinadas',
      title: 'Substantivas, adjetivas e adverbiais',
      art: 'engrenagem',
      goal: 'Classificar as subordinadas pela função.',
      explain:
        'As subordinadas se dividem pela **função** que exercem:\n\n- **substantivas**: sujeito, objeto, predicativo, complemento, aposto. "É necessário **que se publique o edital**";\n- **adjetivas**: caracterizam um nome, começando por **pronome relativo**. "O contrato **que foi aditado** está irregular";\n- **adverbiais**: dão uma **circunstância** (causa, concessão, condição...). "**Embora o prazo fosse curto**, a equipe concluiu".',
      check: {
        kind: 'choice',
        id: 'sb-c',
        prompt: '"O processo que tramitou no setor foi arquivado." A oração destacada "que tramitou no setor" é:',
        options: [
          { text: 'Adjetiva', why: 'Isso: caracteriza "processo" e começa com relativo.' },
          { text: 'Adverbial', why: 'Não dá circunstância; caracteriza um nome.' },
          { text: 'Substantiva', why: 'Não exerce função de sujeito ou objeto.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Use a **troca por uma palavra**: se cabe um **substantivo** ("isso"), é substantiva; se cabe um **adjetivo** ("o processo **tramitado**"), é adjetiva; se cabe um **advérbio** ("a equipe concluiu **mesmo assim**"), é adverbial.',
        check: {
          kind: 'choice',
          id: 'sb-r',
          prompt: '"Caso haja dano, instaura-se tomada de contas." A oração com "caso" é:',
          options: [
            { text: 'Adverbial condicional', why: 'Isso.' },
            { text: 'Adjetiva', why: 'Não caracteriza um nome.' },
            { text: 'Coordenada aditiva', why: 'Ela dá uma condição à principal.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'sort',
      id: 'cons-1',
      prompt: 'Que tipo de coordenada o conectivo forma?',
      categories: ['Adversativa', 'Conclusiva', 'Alternativa'],
      items: [
        { text: 'todavia', cat: 0, why: 'Opõe.' },
        { text: 'portanto', cat: 1, why: 'Conclui.' },
        { text: 'ora... ora', cat: 2, why: 'Alterna.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Coordenação: orações independentes', 'Adjetiva: começa com pronome relativo', 'Subordinação: orações somadas pelo "e"'],
      bug: 2,
      why: 'Na subordinação uma oração exerce função na outra; somar com "e" é coordenação.',
      fixed: 'Subordinação: uma oração tem função na outra',
      errorKind: 'conceito',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual frase tem "pois" explicativo?',
      scenarios: [
        { title: 'Opção A', body: '"Apresse-se, **pois** o prazo termina hoje."' },
        { title: 'Opção B', body: '"Houve dano; o gestor deve, **pois**, ressarcir."' },
      ],
      answer: 0,
      why: 'Antes do verbo, "pois" explica; depois do verbo e entre vírgulas, conclui.',
      errorKind: 'confusao',
    },
  ],
  exam: [],
  summary: [
    'Coordenação: orações independentes, somadas. Subordinação: uma oração exerce função na principal.',
    'Coordenadas: aditiva, adversativa, alternativa, conclusiva, explicativa. "Pois" antes do verbo explica; depois, conclui.',
    'Subordinadas: substantivas (função de nome), adjetivas (pronome relativo), adverbiais (circunstância).',
  ],
};

export const portPerConectivos: MicroLesson = {
  ...S,
  id: 'port.periodo.3',
  series: { id: 'port.periodo', order: 3 },
  title: 'O valor de cada conectivo',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Como faltavam documentos, o processo voltou." O "como" indica:',
    options: [
      { text: 'Causa', why: 'Isso: a falta de documentos causou a volta. Esta aula percorre os valores dos conectivos.' },
      { text: 'Comparação', why: 'Não há comparação; há causa.' },
      { text: 'Conformidade', why: 'Conformidade seria "como previsto"; aqui é causa.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'causa',
      part: 'Valores',
      title: 'Causa, consequência e concessão',
      art: 'balanca',
      goal: 'Distinguir causa, consequência e concessão.',
      explain:
        '- **Causa**: porque, **como** (antes da principal), visto que, já que, uma vez que. "**Como** faltavam documentos, o processo voltou";\n- **consequência**: tão/tanto... **que**, de modo que. "O erro foi **tão** grave **que** anulou o certame";\n- **concessão**: embora, **conquanto**, ainda que, mesmo que, posto que, se bem que. "**Conquanto** houvesse falhas, as contas foram aprovadas".\n\nConcessão é o fato que **poderia impedir**, mas **não impediu**.',
      check: {
        kind: 'choice',
        id: 'cs-c',
        prompt: '"Conquanto houvesse falhas, as contas foram aprovadas." "Conquanto" pode ser trocado, sem mudar o sentido, por:',
        options: [
          { text: 'Embora', why: 'Isso: os dois são concessivos.' },
          { text: 'Porquanto', why: '"Porquanto" é causal ou explicativo.' },
          { text: 'Portanto', why: '"Portanto" é conclusivo.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Faça a pergunta da **concessão**: "isso deveria ter atrapalhado?". As falhas **deveriam** atrapalhar a aprovação, mas **não atrapalharam**. É concessão. Já na **causa**, o fato **provoca** o resultado: faltar documento **fez** o processo voltar.',
        check: {
          kind: 'choice',
          id: 'cs-r',
          prompt: '"O erro foi tão grave que anulou o certame" expressa:',
          options: [
            { text: 'Consequência', why: 'Isso: tão... que.' },
            { text: 'Concessão', why: 'O erro não foi superado; ele produziu a anulação.' },
            { text: 'Condição', why: 'Não há "se" nem "caso".' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'condicao',
      part: 'Valores',
      title: 'Condição, finalidade, tempo, proporção',
      art: 'calendario',
      goal: 'Distinguir condição, finalidade, tempo, proporção e conformidade.',
      explain:
        '- **Condição**: se, caso, **desde que**, contanto que. "**Caso** haja dano...";\n- **finalidade**: para que, a fim de que. "Publicou **para que** a sociedade conhecesse";\n- **tempo**: quando, assim que, **desde que**. "**Assim que** o prazo venceu...";\n- **proporção**: **à medida que**, quanto mais... mais;\n- **conformidade**: conforme, segundo, consoante, **como**. "**Conforme** determina a lei...".',
      check: {
        kind: 'choice',
        id: 'cd-c',
        prompt: '"À medida que a auditoria avançava, surgiam achados." O conectivo indica:',
        options: [
          { text: 'Proporção', why: 'Isso.' },
          { text: 'Causa', why: 'Causa seria "na medida em que".' },
          { text: 'Finalidade', why: 'Finalidade é "para que".' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: '"À medida que" é uma **gangorra**: quanto mais um lado sobe, mais o outro acompanha. Quanto mais a auditoria **avança**, mais achados **aparecem**. Cuidado: "**à medida em que**" não existe.',
        check: {
          kind: 'choice',
          id: 'cd-r',
          prompt: '"Será aprovado desde que haja dotação." "Desde que" indica:',
          options: [
            { text: 'Condição', why: 'Isso: = contanto que.' },
            { text: 'Tempo', why: 'Tempo seria "desde que assumiu" (a partir de quando).' },
            { text: 'Concessão', why: 'Concessão é "embora".' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'ambiguos',
      part: 'Cuidado',
      title: 'Conectivos que mudam de valor',
      art: 'interruptor',
      goal: 'Reconhecer os conectivos de valor múltiplo.',
      explain:
        'Cinco que confundem:\n\n- **desde que**: condição ("desde que haja dotação") ou tempo ("desde que assumiu");\n- **como**: causa (antes: "como chovia..."), conformidade ("como previsto"), comparação ("agiu como um perito");\n- **pois**: explicativo antes do verbo; conclusivo depois;\n- **posto que**: na norma tradicional, **concessivo** (= embora);\n- **à medida que** (proporção) e **na medida em que** (causa).',
      check: {
        kind: 'choice',
        id: 'am-c',
        prompt: '"Agiu como um perito." O "como" indica:',
        options: [
          { text: 'Comparação', why: 'Isso.' },
          { text: 'Causa', why: 'Causa seria "como chovia, ficou".' },
          { text: 'Conformidade', why: 'Conformidade seria "como previsto".' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: 'Troque por um sinônimo de cada valor e veja qual funciona: "agiu **tal qual** um perito" (comparação) funciona; "agiu **porque** um perito" não; "agiu **conforme** um perito" muda o sentido. Sobrou a comparação.',
        check: {
          kind: 'choice',
          id: 'am-r',
          prompt: 'Na norma tradicional, "posto que" equivale a:',
          options: [
            { text: 'Embora', why: 'Isso: é concessivo.' },
            { text: 'Porque', why: 'É muito usado como causal, mas a norma tradicional o registra como concessivo.' },
            { text: 'Portanto', why: '"Portanto" é conclusivo.' },
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
      prompt: 'Qual o valor de cada conectivo?',
      categories: ['Causa', 'Concessão', 'Condição'],
      items: [
        { text: 'visto que', cat: 0, why: 'Causa.' },
        { text: 'conquanto', cat: 1, why: 'Concessão.' },
        { text: 'ainda que', cat: 1, why: 'Concessão.' },
        { text: 'contanto que', cat: 2, why: 'Condição.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['à medida que: proporção', 'na medida em que: causa', 'à medida em que: proporção'],
      bug: 2,
      why: '"À medida em que" não existe.',
      fixed: 'à medida em que: forma inexistente',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Em "Como faltavam documentos essenciais, o processo foi devolvido", qual troca mantém o sentido?',
      scenarios: [
        { title: 'Opção A', body: '"**Já que** faltavam documentos essenciais, o processo foi devolvido."' },
        { title: 'Opção B', body: '"**Embora** faltassem documentos essenciais, o processo foi devolvido."' },
      ],
      answer: 0,
      why: '"Como" anteposto é causal; "já que" mantém a causa. "Embora" mudaria para concessão.',
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.010' },
  ],
  summary: [
    'Causa: porque, como (anteposto), visto que, já que. Consequência: tão... que. Concessão: embora, conquanto, ainda que, posto que.',
    'Condição: se, caso, desde que, contanto que. Finalidade: para que. Proporção: à medida que. Conformidade: conforme, como.',
    'Valor múltiplo: desde que, como, pois. "À medida em que" não existe.',
  ],
};

export const portPerReescrita: MicroLesson = {
  ...S,
  id: 'port.periodo.4',
  series: { id: 'port.periodo', order: 4 },
  title: 'Reescrever sem mudar o sentido',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Embora havia falhas, as contas foram aprovadas." Está certo?',
    options: [
      { text: 'Não: com "embora", o verbo vai ao subjuntivo, "houvesse"', why: 'Isso. Esta aula mostra o checklist da reescrita.' },
      { text: 'Sim', why: '"Embora" pede o subjuntivo: "embora houvesse".' },
      { text: 'Só falta uma vírgula', why: 'O problema é o modo verbal.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'checklist1',
      part: 'Checklist',
      title: 'Conectivo e modo verbal',
      art: 'revisao',
      goal: 'Conferir o valor do conectivo e o modo verbal na reescrita.',
      explain:
        'Ao reescrever, confira primeiro:\n\n1. **o conectivo novo tem o mesmo valor?** Trocar "embora" por "porque" muda concessão em causa;\n2. **o modo verbal foi ajustado?** "Embora" pede **subjuntivo**: "Embora **houvesse** falhas". Com "**apesar de**", usa-se **infinitivo** ou **substantivo**: "**Apesar de haver** falhas", "**Apesar das** falhas".',
      check: {
        kind: 'choice',
        id: 'c1-c',
        prompt: 'Qual reescrita de "Embora o prazo fosse exíguo, a equipe concluiu" está correta?',
        options: [
          { text: 'Apesar de o prazo ser exíguo, a equipe concluiu.', why: 'Isso: "apesar de" + infinitivo mantém a concessão.' },
          { text: 'Porque o prazo era exíguo, a equipe concluiu.', why: 'Mudou de concessão para causa.' },
          { text: 'Embora o prazo era exíguo, a equipe concluiu.', why: '"Embora" pede o subjuntivo: fosse.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Cada conectivo tem o seu **"encaixe" de verbo**: "embora" pede **subjuntivo** (fosse, houvesse); "apesar de" pede **infinitivo** (ser, haver) ou **nome** (apesar **das** falhas). Trocou o conectivo? Troque o encaixe.',
        check: {
          kind: 'choice',
          id: 'c1-r',
          prompt: '"Apesar de que" pede qual modo?',
          options: [
            { text: 'Subjuntivo, como "embora"', why: 'Isso: as duas locuções são concessivas e pedem subjuntivo.' },
            { text: 'Indicativo', why: 'Pegadinha: "apesar de que" pede subjuntivo.' },
            { text: 'Infinitivo', why: 'Infinitivo é com "apesar de", sem "que".' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'checklist2',
      part: 'Checklist',
      title: 'Vírgula, concordância e regência',
      art: 'engrenagem',
      goal: 'Conferir pontuação, concordância e regência na reescrita.',
      explain:
        'Depois, confira:\n\n3. **a pontuação acompanhou?** Ao antepor uma oração adverbial, use **vírgula** depois dela;\n4. **a concordância continua certa?** Trocar "existiam" por "haver" leva ao **singular**: "**havia**";\n5. **a regência e a crase se mantêm?** Trocar "chegar" por "atingir" **tira** a preposição: "chegou **à** meta" vira "atingiu **a** meta".',
      check: {
        kind: 'choice',
        id: 'c2-c',
        prompt: '"Existiam falhas no edital." Trocando "existir" por "haver":',
        options: [
          { text: 'Havia falhas no edital.', why: 'Isso: "haver" impessoal fica no singular.' },
          { text: 'Haviam falhas no edital.', why: '"Haver" de existir é impessoal: havia.' },
          { text: 'Houveram falhas no edital.', why: '"Haver" de existir fica no singular.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Reescrever é **trocar uma peça e conferir o motor**. Trocou o verbo? Confira se ele **concorda** do mesmo jeito (haver não concorda) e se pede a **mesma preposição** (chegar **a**, atingir sem preposição).',
        check: {
          kind: 'choice',
          id: 'c2-r',
          prompt: '"O setor chegou à meta." Trocando por "atingir":',
          options: [
            { text: 'O setor atingiu a meta.', why: 'Isso: "atingir" é direto; some a crase.' },
            { text: 'O setor atingiu à meta.', why: '"Atingir" não pede preposição: sem crase.' },
            { text: 'O setor atingiu na meta.', why: '"Atingir" é transitivo direto.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'transformacoes',
      part: 'Transformações',
      title: 'Equivalências que caem',
      art: 'trilha',
      goal: 'Reconhecer transformações equivalentes cobradas.',
      explain:
        'Transformações aceitas, com o mesmo sentido:\n\n- **concessão em adversidade**: "Embora o prazo fosse curto, a equipe concluiu" vira "O prazo era curto; **no entanto**, a equipe concluiu";\n- **causa anteposta em posposta**: "Como faltavam documentos, o processo voltou" vira "O processo voltou **porque** faltavam documentos";\n- **oração reduzida**: "**Quando terminou a sessão**, o relator divulgou o voto" vira "**Terminada a sessão**, o relator divulgou o voto".',
      check: {
        kind: 'choice',
        id: 'tf-c',
        prompt: '"Embora o prazo fosse exíguo, a equipe concluiu a auditoria." Qual reescrita preserva o sentido?',
        options: [
          { text: 'O prazo era exíguo; no entanto, a equipe concluiu a auditoria.', why: 'Isso: a concessão vira oposição, com o mesmo sentido.' },
          { text: 'O prazo era exíguo; portanto, a equipe concluiu a auditoria.', why: '"Portanto" cria conclusão: o prazo curto teria causado a conclusão.' },
          { text: 'Se o prazo fosse exíguo, a equipe concluiria a auditoria.', why: 'Virou hipótese; o original afirma os dois fatos.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: '"Embora A, B" e "A; **no entanto**, B" dizem a mesma coisa: **A aconteceu**, **B também**, e A **não impediu** B. Só mudou o lugar da oposição: de um conectivo **concessivo** para um **adversativo**.',
        check: {
          kind: 'choice',
          id: 'tf-r',
          prompt: '"Terminada a sessão" equivale a:',
          options: [
            { text: 'Quando terminou a sessão', why: 'Isso: reduzida de particípio, com valor de tempo.' },
            { text: 'Embora terminasse a sessão', why: 'Não há concessão; há tempo.' },
            { text: 'Para que terminasse a sessão', why: 'Não há finalidade; há tempo.' },
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
      prompt: 'Ordene o checklist da reescrita.',
      items: ['Mesmo valor do conectivo?', 'Modo verbal ajustado?', 'Pontuação acompanhou?', 'Concordância e regência mantidas?'],
      why: 'Sentido primeiro, depois a correção.',
      errorKind: 'procedimento',
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Embora + subjuntivo', 'Apesar de + infinitivo', 'Apesar de que + indicativo'],
      bug: 2,
      why: '"Apesar de que" é concessivo e pede subjuntivo.',
      fixed: 'Apesar de que + subjuntivo',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-3',
      prompt: 'Qual reescrita de "É preciso que o gestor apresente as contas" está correta?',
      scenarios: [
        { title: 'Opção A', body: '"É preciso **o gestor apresentar** as contas."' },
        { title: 'Opção B', body: '"É preciso **que o gestor apresentar** as contas."' },
      ],
      answer: 0,
      why: 'A reduzida de infinitivo tira o "que": "é preciso o gestor apresentar".',
      errorKind: 'procedimento',
    },
  ],
  exam: [{ kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.02.011' }],
  summary: [
    'Checklist: mesmo valor do conectivo; modo verbal (embora + subjuntivo; apesar de + infinitivo); vírgula; concordância; regência e crase.',
    'Equivalências: concessão vira adversidade (embora → no entanto); causa anteposta vira posposta (como → porque).',
    'Reduzidas: "terminada a sessão" (particípio); "é preciso o gestor apresentar" (infinitivo).',
  ],
};
