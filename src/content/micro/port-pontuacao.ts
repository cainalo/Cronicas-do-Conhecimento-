// Série "Pontuação e pronomes" (cap.port.01, trecho pontuacao), no ritmo lento com história pedido em
// 25/10/2026: a primeira aula conta dos pontos de Aristófanes ao "você"; as seguintes ensinam a
// vírgula e os outros sinais, depois pronomes pessoais, colocação e relativos, uma ideia por etapa.
// Regras conferidas com o texto do capítulo (03-pontuacao-pronomes.md). Revisão editorial humana:
// pendente.
import type { MicroLesson } from '@/content/types';

const S = { chapterId: 'cap.port.01', sectionId: 'pontuacao' } as const;

export const portPonHistoria: MicroLesson = {
  ...S,
  id: 'port.pontuacao.1',
  series: { id: 'port.pontuacao', order: 1 },
  title: 'Da varinha ao "você"',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Tente ler: "osauditoresconcluiramorelatorio". Fica fácil?',
    options: [
      { text: 'Não: faltam espaços e sinais', why: 'Isso. Os textos antigos eram assim, e esta aula conta como os sinais foram inventados.' },
      { text: 'Sim, é igual a qualquer texto', why: 'Sem espaços e sinais, a leitura fica lenta e confusa.' },
      { text: 'Só com dicionário', why: 'O problema não são as palavras, e sim a falta de separação e de pausas.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'aristofanes',
      part: 'A história',
      title: 'Os pontos de Aristófanes',
      art: 'livro',
      goal: 'Saber que a pontuação nasceu para marcar pausas na leitura.',
      explain:
        'Os textos gregos eram escritos **sem espaços nem sinais**: tudo emendado.\n\nPor volta de **200 a.C.**, o bibliotecário **Aristófanes de Bizâncio**, em **Alexandria**, propôs **pontos em alturas diferentes** para indicar as **pausas** na leitura em voz alta.\n\nA pontuação nasceu assim: para mostrar **onde respirar** e **como agrupar** as palavras.',
      check: {
        kind: 'choice',
        id: 'ar-c',
        prompt: 'Para que Aristófanes de Bizâncio propôs os pontos?',
        options: [
          { text: 'Para indicar as pausas na leitura', why: 'Isso.' },
          { text: 'Para enfeitar os livros', why: 'A função era marcar pausas.' },
          { text: 'Para numerar as páginas', why: 'Os pontos marcavam pausas na leitura.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense num **ditado** em voz alta: a professora faz pausas para você entender as frases. Aristófanes pôs essas pausas **no papel**, com pontos. Até hoje a vírgula e o ponto organizam a leitura e o sentido.',
        check: {
          kind: 'choice',
          id: 'ar-r',
          prompt: 'Onde trabalhava Aristófanes de Bizâncio?',
          options: [
            { text: 'Em Alexandria', why: 'Isso: na famosa biblioteca.' },
            { text: 'Em Veneza', why: 'Em Veneza trabalhou Aldo Manúcio, muito depois.' },
            { text: 'Em Portugal', why: 'Ele era grego e trabalhou em Alexandria.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'virgula',
      part: 'A história',
      title: 'Varinha e ponto e vírgula',
      art: 'cartao',
      goal: 'Saber a origem da palavra vírgula e do ponto e vírgula impresso.',
      explain:
        'Na **Idade Média**, os copistas usavam um **traço fino** para marcar pausa curta. Em latim, ***virgula*** quer dizer "**varinha**": daí o nome **vírgula**.\n\nNo **fim do século XV**, o impressor veneziano **Aldo Manúcio** foi um dos primeiros a imprimir o **ponto e vírgula**.\n\nCom a imprensa, os sinais se espalharam e foram ficando parecidos em toda a Europa.',
      check: {
        kind: 'choice',
        id: 'vi-c',
        prompt: 'O que quer dizer virgula, em latim?',
        options: [
          { text: 'Varinha', why: 'Isso: o traço fino dos manuscritos.' },
          { text: 'Pausa longa', why: 'Quer dizer varinha.' },
          { text: 'Ponto', why: 'Quer dizer varinha.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Olhe uma vírgula: é um **tracinho**, como uma **varinha** caída. O nome guarda o desenho. E foi a **imprensa**, com impressores como Aldo Manúcio, que espalhou e padronizou esses sinais.',
        check: {
          kind: 'choice',
          id: 'vi-r',
          prompt: 'Quem foi um dos primeiros a imprimir o ponto e vírgula?',
          options: [
            { text: 'Aldo Manúcio, em Veneza', why: 'Isso, no fim do século XV.' },
            { text: 'Aristófanes de Bizâncio', why: 'Aristófanes propôs os pontos de pausa, por volta de 200 a.C.' },
            { text: 'Quintiliano', why: 'Quintiliano organizou as figuras de linguagem.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'voce',
      part: 'A história',
      title: 'De Vossa Mercê a você',
      art: 'pessoal',
      goal: 'Entender por que "você" e os pronomes de tratamento levam o verbo à 3ª pessoa.',
      explain:
        'O tratamento respeitoso **Vossa Mercê** foi **encurtando** na fala: virou "**vosmecê**" e chegou a **você**.\n\nComo nasceu de um tratamento ("a mercê de quem fala comigo"), **você** leva o verbo à **3ª pessoa**: "você **decidiu**", não "você decidiste".\n\nO mesmo vale para os pronomes de tratamento de hoje: "Vossa Excelência **decidiu**".',
      check: {
        kind: 'order',
        id: 'vo-c',
        prompt: 'Ordene a mudança do tratamento.',
        items: ['Vossa Mercê', 'vosmecê', 'você'],
        why: 'O tratamento foi encurtando na fala.',
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense em como "**está**" virou "**tá**" na fala rápida. Com "Vossa Mercê" aconteceu o mesmo ao longo de séculos: **vosmecê**, depois **você**. Mas a gramática guardou a origem: o verbo continua na 3ª pessoa, como em "Vossa Mercê **sabe**".',
        check: {
          kind: 'choice',
          id: 'vo-r',
          prompt: 'Com "Vossa Excelência", o verbo vai para qual pessoa?',
          options: [
            { text: '3ª pessoa: Vossa Excelência decidiu', why: 'Isso.' },
            { text: '2ª pessoa: Vossa Excelência decidistes', why: 'Pronomes de tratamento levam o verbo à 3ª pessoa.' },
            { text: '1ª pessoa', why: 'A 1ª pessoa é de quem fala.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Aristófanes: pontos para as pausas', 'Vírgula: do latim "varinha"', '"Você" leva o verbo à 2ª pessoa'],
      bug: 2,
      why: '"Você" veio de "Vossa Mercê" e leva o verbo à 3ª pessoa.',
      fixed: '"Você" leva o verbo à 3ª pessoa',
      errorKind: 'conceito',
    },
    {
      kind: 'sort',
      id: 'cons-2',
      prompt: 'Quem ou o que corresponde a cada época?',
      categories: ['Cerca de 200 a.C.', 'Fim do século XV'],
      items: [
        { text: 'Pontos de pausa em Alexandria', cat: 0, why: 'Aristófanes de Bizâncio.' },
        { text: 'Ponto e vírgula impresso em Veneza', cat: 1, why: 'Aldo Manúcio.' },
      ],
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: qual frase está correta?',
      options: [
        { text: 'Vossa Excelência e sua equipe receberão o relatório.', why: 'Isso: possessivo de 3ª pessoa.' },
        { text: 'Vossa Excelência e vossa equipe receberão o relatório.', why: 'Com tratamento, usa-se "sua", de 3ª pessoa.' },
        { text: 'Vossa Excelência recebereis o relatório.', why: 'O verbo vai à 3ª pessoa: receberá.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [],
  summary: [
    'Textos gregos não tinham espaços nem sinais; Aristófanes de Bizâncio (cerca de 200 a.C.) propôs pontos para as pausas.',
    'Vírgula vem do latim virgula, "varinha". Aldo Manúcio foi um dos primeiros a imprimir o ponto e vírgula, no fim do século XV.',
    'Vossa Mercê → vosmecê → você: por isso você e os pronomes de tratamento levam verbo e possessivo à 3ª pessoa.',
  ],
};

export const portPonVirgula: MicroLesson = {
  ...S,
  id: 'port.pontuacao.2',
  series: { id: 'port.pontuacao', order: 2 },
  title: 'A vírgula e os outros sinais',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Os auditores do Tribunal, concluíram o relatório." Essa vírgula está certa?',
    options: [
      { text: 'Não: separa o sujeito do verbo', why: 'Isso. Esta aula começa pela regra que mais derruba candidatos.' },
      { text: 'Sim: o sujeito é longo', why: 'Mesmo longo, o sujeito não se separa do verbo com uma vírgula.' },
      { text: 'Sim: marca uma pausa', why: 'Pausa na fala não justifica vírgula entre sujeito e verbo.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'nunca',
      part: 'Vírgula',
      title: 'O que nunca se separa',
      art: 'cadeado',
      goal: 'Não separar com vírgula sujeito e verbo, nem verbo e complemento.',
      explain:
        '**Nunca** se separa com vírgula:\n\n- o **sujeito** do **verbo**: "Os auditores do Tribunal concluíram o relatório";\n- o **verbo** de seus **complementos**: "O gestor apresentou as contas";\n- o **nome** de seu **complemento** ou adjunto restritivo.\n\n**Exceção aparente**: um termo **intercalado** entre sujeito e verbo vem **entre duas vírgulas**: "Os auditores, **após três meses de trabalho**, concluíram o relatório". O erro típico é pôr **só uma** delas.',
      check: {
        kind: 'choice',
        id: 'nu-c',
        prompt: 'Qual frase está corretamente pontuada?',
        options: [
          { text: 'Os auditores, após três meses de trabalho, concluíram o relatório.', why: 'Isso: intercalação entre duas vírgulas.' },
          { text: 'Os auditores, após três meses de trabalho concluíram o relatório.', why: 'Falta a segunda vírgula da intercalação.' },
          { text: 'O gestor apresentou, as contas do exercício.', why: 'Vírgula entre verbo e objeto.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O sujeito e o verbo são **parceiros de mão dada**: uma vírgula sozinha entre eles é como **soltar as mãos**. Se algo vai **entrar no meio** (a intercalação), ele precisa de **duas** vírgulas, como **dois parênteses**: uma abre, outra fecha.',
        check: {
          kind: 'choice',
          id: 'nu-r',
          prompt: '"Pode-se separar sujeito e verbo com uma vírgula, se o sujeito for longo." Isso está:',
          options: [
            { text: 'Errado: a vírgula isolada entre sujeito e verbo é sempre erro', why: 'Isso.' },
            { text: 'Certo', why: 'O tamanho do sujeito não muda a regra.' },
            { text: 'Certo em textos oficiais', why: 'A regra vale para qualquer texto na norma-padrão.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'usos',
      part: 'Vírgula',
      title: 'Quando se usa',
      art: 'trilha',
      goal: 'Reconhecer os principais usos da vírgula.',
      explain:
        '- **Adjunto adverbial deslocado** (obrigatória se longo): "**No exercício de 2025**, o órgão descumpriu o limite."\n- **Aposto explicativo**: "O TCE-GO, **órgão de controle externo**, emitiu parecer."\n- **Vocativo**: "**Senhor Presidente**, encaminho o relatório."\n- **Coordenadas** assindéticas, adversativas, conclusivas, explicativas: "Analisou as notas, **mas** não encontrou o contrato."\n- **Adverbiais antepostas**: "**Quando o prazo terminar**, o processo será arquivado."\n- **Zeugma**: "Eu revisei o voto; ele, a ementa."\n- **Isto é, ou seja, por exemplo**: "O ato é nulo, **isto é**, não produz efeitos."',
      check: {
        kind: 'sort',
        id: 'us-c',
        prompt: 'Por que cada vírgula foi usada?',
        categories: ['Vocativo', 'Aposto', 'Adverbial anteposta'],
        items: [
          { text: 'Senhor Relator, peço a palavra.', cat: 0, why: 'Chamamento.' },
          { text: 'Goiânia, capital do estado, sedia o Tribunal.', cat: 1, why: 'Explica o termo anterior.' },
          { text: 'Se houver dano, haverá ressarcimento.', cat: 2, why: 'Oração adverbial antes da principal.' },
        ],
      },
      recovery: {
        explain: 'Três perguntas resolvem quase tudo. **Estou chamando alguém?** Vocativo, com vírgula. **Estou explicando quem é?** Aposto, entre vírgulas. **A circunstância (quando, se, onde) veio antes?** Adverbial deslocada, com vírgula. Na ordem direta, essa vírgula muitas vezes some.',
        check: {
          kind: 'choice',
          id: 'us-r',
          prompt: '"Senhor Presidente encaminho o relatório anexo." O que falta?',
          options: [
            { text: 'Vírgula depois do vocativo: "Senhor Presidente, encaminho..."', why: 'Isso.' },
            { text: 'Vírgula entre "encaminho" e "o relatório"', why: 'Isso separaria verbo e objeto: erro.' },
            { text: 'Nada', why: 'O vocativo pede vírgula.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'restritiva',
      part: 'Vírgula',
      title: 'Restritiva ou explicativa',
      art: 'balanca',
      goal: 'Perceber que vírgulas na oração adjetiva mudam o sentido.',
      explain:
        '- "Os servidores **que faltaram** serão notificados." **Sem vírgulas**: só **os que faltaram** (oração **restritiva**).\n- "Os servidores, **que faltaram**, serão notificados." **Com vírgulas**: **todos** faltaram (oração **explicativa**).\n\nInserir ou retirar as vírgulas **altera o sentido**. É a distinção de pontuação mais cobrada.',
      check: {
        kind: 'choice',
        id: 're-c',
        prompt: '"Os servidores que participaram da auditoria receberam elogio." Se vírgulas fossem postas depois de "servidores" e de "auditoria", a frase passaria a indicar que:',
        options: [
          { text: 'Todos os servidores mencionados participaram da auditoria', why: 'Isso: a oração vira explicativa.' },
          { text: 'Só parte dos servidores foi elogiada', why: 'Esse é o sentido sem vírgulas (restritiva).' },
          { text: 'Nada muda', why: 'As vírgulas mudam o sentido.' },
        ],
        answer: 0,
        errorKind: 'leitura',
      },
      recovery: {
        explain: '**Sem vírgula**, a oração **escolhe** dentro do grupo: dos servidores, só os que participaram. **Com vírgulas**, ela só **comenta** o grupo inteiro: os servidores (todos eles), aliás, participaram. Restringir é escolher; explicar é comentar.',
        check: {
          kind: 'choice',
          id: 're-r',
          prompt: 'Uma oração adjetiva entre vírgulas é:',
          options: [
            { text: 'Explicativa: vale para todo o antecedente', why: 'Isso.' },
            { text: 'Restritiva', why: 'A restritiva vem sem vírgulas.' },
            { text: 'Sempre um erro', why: 'A explicativa vem entre vírgulas, corretamente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'outros',
      part: 'Outros sinais',
      title: 'Ponto e vírgula, dois-pontos, travessão, aspas',
      art: 'cartao',
      goal: 'Reconhecer os usos principais dos outros sinais.',
      explain:
        '- **Ponto e vírgula**: separa orações **longas** ou que **já têm vírgulas**; separa itens de **enumeração** (incisos de lei).\n- **Dois-pontos**: introduz **enumeração**, **citação**, **explicação**, **síntese** ou **consequência**.\n- **Travessão e parênteses**: isolam **intercalações**; o travessão duplo pode substituir um par de vírgulas.\n- **Aspas**: **citação** literal, **ironia**, **estrangeirismo**, destaque de termo.',
      check: {
        kind: 'choice',
        id: 'ou-c',
        prompt: '"O auditor pediu três documentos: contrato, nota fiscal e empenho." Para que servem os dois-pontos?',
        options: [
          { text: 'Introduzir uma enumeração', why: 'Isso.' },
          { text: 'Separar sujeito e verbo', why: 'Nenhum sinal separa sujeito e verbo.' },
          { text: 'Indicar ironia', why: 'Ironia costuma vir com aspas.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Os **dois-pontos** são uma **porta que se abre** para o que vem: a lista, a fala, a explicação. O **ponto e vírgula** é uma **pausa maior que a vírgula**, ótima quando as partes já têm vírgulas dentro. As **aspas** "levantam a sobrancelha": citação ou ironia.',
        check: {
          kind: 'choice',
          id: 'ou-r',
          prompt: 'Nos incisos de uma lei, os itens costumam ser separados por:',
          options: [
            { text: 'Ponto e vírgula', why: 'Isso.' },
            { text: 'Aspas', why: 'Aspas marcam citação, ironia ou destaque.' },
            { text: 'Travessão duplo', why: 'O travessão isola intercalações.' },
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
      lines: ['Vocativo: com vírgula', 'Intercalação: entre duas vírgulas', 'Oração restritiva: entre vírgulas'],
      bug: 2,
      why: 'A restritiva vem sem vírgulas; entre vírgulas é a explicativa.',
      fixed: 'Oração explicativa: entre vírgulas',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'Qual frase está corretamente pontuada?',
      scenarios: [
        { title: 'Frase A', body: 'No exercício de 2025, o órgão descumpriu o limite de gastos com pessoal.' },
        { title: 'Frase B', body: 'O órgão, descumpriu o limite de gastos com pessoal no exercício de 2025.' },
      ],
      answer: 0,
      why: 'Em A, a vírgula marca o adjunto adverbial deslocado. Em B, ela separa sujeito e verbo.',
      errorKind: 'procedimento',
    },
    {
      kind: 'sort',
      id: 'cons-3',
      prompt: 'A vírgula está certa ou errada?',
      categories: ['Certa', 'Errada'],
      items: [
        { text: 'Analisou as notas, mas não achou o contrato.', cat: 0, why: 'Antes de adversativa.' },
        { text: 'Os técnicos do setor, instalaram os computadores.', cat: 1, why: 'Sujeito separado do verbo.' },
        { text: 'O ato é nulo, isto é, não produz efeitos.', cat: 0, why: 'Expressão explicativa.' },
        { text: 'O relator solicitou, novos documentos.', cat: 1, why: 'Verbo separado do objeto.' },
      ],
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.007' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.008' },
  ],
  summary: [
    'Nunca separe sujeito e verbo, nem verbo e complemento. Intercalação: entre duas vírgulas.',
    'Vírgula: adjunto deslocado, aposto, vocativo, coordenadas (mas, logo, pois), adverbiais antepostas, zeugma, isto é.',
    'Restritiva (sem vírgulas) escolhe parte; explicativa (com vírgulas) vale para todos. As vírgulas mudam o sentido.',
    'Ponto e vírgula: orações longas e incisos. Dois-pontos: enumeração, citação, explicação. Travessão: intercalação. Aspas: citação, ironia.',
  ],
};

export const portPonPronomes: MicroLesson = {
  ...S,
  id: 'port.pontuacao.3',
  series: { id: 'port.pontuacao', order: 3 },
  title: 'Pronomes: pessoais, colocação e relativos',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: '"Me informaram que o prazo acabou." Na fala é comum. E na norma-padrão, numa prova?',
    options: [
      { text: 'Está errado: não se começa frase com esse pronome', why: 'Isso: o certo é "Informaram-me". Esta aula mostra onde o pronome vai.' },
      { text: 'Está certo', why: 'Na norma-padrão não se inicia período com pronome oblíquo átono.' },
      { text: 'Tanto faz', why: 'Na prova vale a norma-padrão.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'retos-obliquos',
      part: 'Pessoais',
      title: 'Retos, oblíquos, mim e eu',
      art: 'pessoal',
      goal: 'Usar pronomes retos e oblíquos e acertar "entre mim e ti" e "para eu fazer".',
      explain:
        '- **Retos** (eu, tu, ele...) funcionam como **sujeito**.\n- **Oblíquos** (me, te, o, a, lhe, se, mim, comigo...) funcionam como **complemento**.\n\nDois casos clássicos:\n\n- "Entre **mim** e **ti**": depois de preposição, usa-se o oblíquo tônico.\n- "Para **eu** fazer": quando o pronome é **sujeito** do infinitivo, usa-se o **reto**.',
      check: {
        kind: 'choice',
        id: 'ro-c',
        prompt: 'Qual frase está correta?',
        options: [
          { text: 'O chefe trouxe o processo para eu analisar.', why: 'Isso: "eu" é sujeito de "analisar".' },
          { text: 'O chefe trouxe o processo para mim analisar.', why: '"Mim" não faz ação: o sujeito de "analisar" pede "eu".' },
          { text: 'Isso fica entre eu e você.', why: 'Depois de preposição: entre mim e você.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pergunte: **quem vai fazer a ação?** Em "para ___ analisar", quem analisa sou **eu**: sujeito, pronome **reto**. Já em "trouxe para **mim**", ninguém faz ação depois: é só complemento depois da preposição, pronome **oblíquo**. "Mim não conjuga verbo."',
        check: {
          kind: 'choice',
          id: 'ro-r',
          prompt: '"Não há nada entre ___ e o relator." Qual pronome?',
          options: [
            { text: 'mim', why: 'Isso: depois de preposição.' },
            { text: 'eu', why: 'Depois de preposição usa-se o oblíquo: mim.' },
            { text: 'me', why: 'Depois de preposição, a forma é mim.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'o-lhe',
      part: 'Pessoais',
      title: 'O, a, lhe e as formas lo, no',
      art: 'cartao',
      goal: 'Substituir complementos por o, a, lhe e ajustar as formas lo, la, no, na.',
      explain:
        '- **o, a, os, as** substituem o **objeto direto**: "Entreguei **o relatório**" → "Entreguei-**o**".\n- **lhe(s)** substitui o **objeto indireto** de pessoa: "Entreguei **ao chefe**" → "Entreguei-**lhe**".\n- Depois de verbo terminado em **r, s, z**, o pronome vira **lo, la**: analisar + o → **analisá-lo**; fiz + o → **fi-lo**.\n- Depois de som **nasal** (m, ão, õe), vira **no, na**: fizeram + o → **fizeram-no**.',
      check: {
        kind: 'choice',
        id: 'ol-c',
        prompt: '"Precisamos analisar o contrato." Substituindo "o contrato" por pronome:',
        options: [
          { text: 'Precisamos analisá-lo.', why: 'Isso: verbo em r + o vira -lo.' },
          { text: 'Precisamos analisar-lhe.', why: '"Lhe" é objeto indireto de pessoa; "o contrato" é direto.' },
          { text: 'Precisamos analisar-o.', why: 'Depois de r, o pronome vira lo: analisá-lo.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Dois passos. **1)** É direto ou indireto? "Analisar **o** contrato" não tem preposição: direto, pronome **o**. **2)** Como o verbo termina? Em **r**: o r cai e o pronome ganha **l**: anali**sá-lo**. Se fosse som nasal, ganharia **n**: fizeram-**no**.',
        check: {
          kind: 'choice',
          id: 'ol-r',
          prompt: '"Entreguei o ofício ao diretor." Substituindo "ao diretor":',
          options: [
            { text: 'Entreguei-lhe o ofício.', why: 'Isso: objeto indireto de pessoa.' },
            { text: 'Entreguei-o o ofício.', why: '"O" substitui objeto direto; "ao diretor" é indireto.' },
            { text: 'Entreguei-lo o ofício.', why: 'A forma "lo" só aparece depois de r, s, z.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'colocacao',
      part: 'Colocação',
      title: 'Próclise, ênclise e mesóclise',
      art: 'degraus',
      goal: 'Escolher a posição do pronome átono.',
      explain:
        '- **Próclise** (antes do verbo): com **palavras atrativas**: negação (não, nunca), advérbios sem vírgula, relativos, indefinidos, interrogativos, conjunções subordinativas. "**Não se** admite recurso"; "**Quando o** encontraram".\n- **Ênclise** (depois): **início** de período, após vírgula ou pausa, imperativo afirmativo, gerúndio. "**Encaminho-lhe** o processo."\n- **Mesóclise** (no meio): **futuro** do presente ou do pretérito, **sem** palavra atrativa. "**Far-se-á** a auditoria."',
      check: {
        kind: 'choice',
        id: 'co-c',
        prompt: 'Qual frase está de acordo com a norma-padrão?',
        options: [
          { text: 'Não se admitirá recurso fora do prazo.', why: 'Isso: a negação atrai o pronome.' },
          { text: 'Ninguém informou-me sobre a decisão.', why: '"Ninguém" é atrativo: ninguém me informou.' },
          { text: 'Encaminharei-lhe o processo.', why: 'Futuro sem atrativo pede mesóclise: encaminhar-lhe-ei.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Use uma ordem de perguntas. **1) Há palavra atrativa** (não, ninguém, que, quando)? Próclise, sempre. **2) Não há, e o verbo está no futuro?** Mesóclise. **3) Nenhum dos dois, e o período começa no verbo?** Ênclise. Com atrativa, a mesóclise some: "**não se fará**".',
        check: {
          kind: 'choice',
          id: 'co-r',
          prompt: '"Não se far-se-á a auditoria" está:',
          options: [
            { text: 'Errado: com atrativa, "não se fará"', why: 'Isso.' },
            { text: 'Certo', why: 'O pronome aparece duas vezes e ignora a atração da negação.' },
            { text: 'Errado: o certo é "não far-se-á"', why: 'Com "não", usa-se próclise: não se fará.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'proibicoes',
      part: 'Colocação',
      title: 'O que é proibido',
      art: 'cadeado',
      goal: 'Reconhecer as colocações proibidas na norma-padrão.',
      explain:
        '- **Não se inicia período** com pronome oblíquo átono: "Me informaram" (errado) → "**Informaram-me**".\n- **Não há ênclise** com **futuro** nem com **particípio**: "Tinha encaminhado-o" (errado) → "**Tinha-o** encaminhado" ou "**o tinha** encaminhado".\n- Com **palavra atrativa**, a mesóclise cede à próclise: "**Não se fará** a auditoria".',
      check: {
        kind: 'choice',
        id: 'pb-c',
        prompt: 'Qual forma está correta?',
        options: [
          { text: 'O auditor tinha-o encaminhado ao setor.', why: 'Isso: pronome junto ao auxiliar.' },
          { text: 'O auditor tinha encaminhado-o ao setor.', why: 'Não há ênclise ao particípio.' },
          { text: 'Me encaminharam o processo ontem.', why: 'Não se inicia período com pronome átono.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'O particípio ("encaminhado", "feito") **não aceita** pronome pendurado depois. A solução é pendurar no **verbo auxiliar** ("tinha-**o** encaminhado") ou pôr antes dele ("**o** tinha encaminhado"). E começo de frase com "me", "te", "se" fica só para a fala informal.',
        check: {
          kind: 'choice',
          id: 'pb-r',
          prompt: '"___ o relatório na próxima semana." (encaminhar, futuro, com "lhe")',
          options: [
            { text: 'Encaminhar-lhe-ei', why: 'Isso: mesóclise.' },
            { text: 'Encaminharei-lhe', why: 'Futuro não admite ênclise.' },
            { text: 'Lhe encaminharei', why: 'Não se inicia período com pronome átono.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'relativos',
      part: 'Relativos',
      title: 'Que, o qual, quem, cujo, onde',
      art: 'livro',
      goal: 'Empregar os pronomes relativos de acordo com a norma-padrão.',
      explain:
        '- **que**: pessoa ou coisa, o mais genérico.\n- **o qual**: equivale a "que"; preferido após preposições longas: "a norma **segundo a qual**".\n- **quem**: pessoa, sempre com **preposição**: "o gestor **a quem** me referi".\n- **cujo**: **posse**; concorda com o termo **seguinte** e **não admite artigo** depois: "o órgão **cujas contas**" (nunca "cujas as contas").\n- **onde**: **lugar físico**: "a sala **onde** ocorreu a sessão".',
      check: {
        kind: 'choice',
        id: 'rl-c',
        prompt: 'Qual frase está correta?',
        options: [
          { text: 'O órgão cujas contas foram rejeitadas apresentou recurso.', why: 'Isso.' },
          { text: 'O órgão cujas as contas foram rejeitadas apresentou recurso.', why: '"Cujo" não admite artigo depois.' },
          { text: 'A sala aonde ocorreu a sessão foi interditada.', why: '"Aonde" indica movimento; aqui é "onde".' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: '**Cujo** é um "**de quem**" em uma palavra: "o órgão **cujas** contas" = "o órgão, **as contas do qual**". Como ele já carrega a ideia de "as", **não** se põe outro artigo. E **onde** é só para lugar físico; "aonde" é para movimento ("aonde vai?").',
        check: {
          kind: 'choice',
          id: 'rl-r',
          prompt: '"Cujo" concorda com:',
          options: [
            { text: 'O termo seguinte', why: 'Isso: "cujas contas".' },
            { text: 'O termo anterior', why: 'Concorda com o que vem depois.' },
            { text: 'Sempre no masculino singular', why: 'Varia: cujo, cuja, cujos, cujas.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'preposicao',
      part: 'Relativos',
      title: 'A preposição vem antes do relativo',
      art: 'balanca',
      goal: 'Pôr antes do relativo a preposição exigida pelo verbo.',
      explain:
        'A **preposição** exigida pelo verbo da oração vem **antes do relativo**:\n\n- "O cargo **a que** aspira" (aspirar **a**);\n- "A lei **de que** dependemos" (depender **de**);\n- "O contrato **em que** se baseou" (basear-se **em**);\n- "O gestor **a quem** me referi" (referir-se **a**).\n\nO erro típico é **esquecer** a preposição: "a lei que dependemos" (errado).',
      check: {
        kind: 'choice',
        id: 'pp-c',
        prompt: 'Qual frase está correta?',
        options: [
          { text: 'O cargo a que o servidor aspira exige nível superior.', why: 'Isso: aspirar a.' },
          { text: 'A lei que dependemos ainda não foi sancionada.', why: 'Depender pede "de": de que dependemos.' },
          { text: 'O gestor que me referi já se explicou.', why: 'Referir-se pede "a": a quem me referi.' },
        ],
        answer: 0,
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Desfaça a frase: "dependemos **da** lei" (depender **de**). Agora junte com o relativo, levando a preposição junto: "a lei **de que** dependemos". O verbo **depois** do relativo é quem manda na preposição que vem **antes** dele.',
        check: {
          kind: 'choice',
          id: 'pp-r',
          prompt: '"O contrato ___ se baseou a decisão." Qual forma?',
          options: [
            { text: 'em que', why: 'Isso: basear-se em.' },
            { text: 'que', why: 'Falta a preposição exigida por "basear-se".' },
            { text: 'de que', why: 'Basear-se pede "em".' },
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
      prompt: 'Próclise, ênclise ou mesóclise?',
      categories: ['Próclise', 'Ênclise', 'Mesóclise'],
      items: [
        { text: 'Nunca ___ (se) viu tal irregularidade.', cat: 0, why: 'Negação atrai.' },
        { text: '___ (Encaminho-lhe) o processo.', cat: 1, why: 'Início de período.' },
        { text: '___ (Far-se-á) a auditoria.', cat: 2, why: 'Futuro sem atrativo.' },
      ],
    },
    {
      kind: 'fix',
      id: 'cons-2',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Para eu fazer: eu é sujeito', 'Entre mim e ti: depois de preposição', 'Cujas as contas: forma correta'],
      bug: 2,
      why: '"Cujo" não admite artigo depois: cujas contas.',
      fixed: 'Cujas contas: sem artigo depois',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-3',
      prompt: 'Situação nova: "A norma ___ o Tribunal decidiu foi publicada." (decidir com base em uma norma, "segundo a norma")',
      options: [
        { text: 'segundo a qual', why: 'Isso: preposição longa pede "o qual".' },
        { text: 'que', why: 'Falta a preposição.' },
        { text: 'cuja', why: '"Cuja" indica posse, não é o caso.' },
      ],
      answer: 0,
      errorKind: 'procedimento',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.009' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.port.01.010' },
  ],
  summary: [
    'Retos como sujeito; oblíquos como complemento. Entre mim e ti; para eu fazer.',
    'O, a: objeto direto; lhe: indireto de pessoa. Depois de r, s, z: lo, la (analisá-lo); depois de nasal: no, na.',
    'Próclise com atrativas; ênclise no início e após pausa; mesóclise no futuro sem atrativa.',
    'Proibido: começar com átono, ênclise com futuro ou particípio, mesóclise com atrativa.',
    'Relativos: que, o qual, quem (com preposição), cujo (sem artigo depois), onde (lugar). A preposição do verbo vem antes do relativo.',
  ],
};
