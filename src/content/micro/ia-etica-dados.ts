// Microaulas graduais de cap.ia.04: ética, LGPD/EBIA, ciência de dados e Big Data.
// A primeira aula de cada trecho começa pela história; cada aula traz checagem, recuperação e prática.
// Revisão editorial humana pendente.
import type { MicroLesson } from '@/content/types';
import type { MissionActivity } from '@/lib/activities';

type Section = 'etica' | 'lgpd-ebia' | 'ciencia-dados' | 'big-data';
type Q = {
  prompt: string;
  correct: string;
  wrong: [string, string];
  answer: 0 | 1 | 2;
  why: string;
};
type LessonDef = {
  id: string;
  section: Section;
  group: string;
  order: number;
  title: string;
  history: string;
  core: string;
  application: string;
  q1: Q;
  q2: Q;
  transfer: Q;
  examQuestion: string;
  summary: [string, string, string];
};

const base: Record<Section, { chapterId: string; sectionId: Section }> = {
  etica: { chapterId: 'cap.ia.04', sectionId: 'etica' },
  'lgpd-ebia': { chapterId: 'cap.ia.04', sectionId: 'lgpd-ebia' },
  'ciencia-dados': { chapterId: 'cap.ia.04', sectionId: 'ciencia-dados' },
  'big-data': { chapterId: 'cap.ia.04', sectionId: 'big-data' },
};

function activity(q: Q, id: string): MissionActivity {
  const options: string[] = [];
  const reasons: string[] = [];
  const spare = [0, 1, 2].filter((i) => i !== q.answer);
  options[q.answer] = q.correct;
  reasons[q.answer] = q.why;
  options[spare[0]] = q.wrong[0];
  reasons[spare[0]] = 'Essa alternativa ignora uma condição importante do conceito.';
  options[spare[1]] = q.wrong[1];
  reasons[spare[1]] = 'Essa alternativa não corresponde ao procedimento explicado.';
  return {
    kind: 'choice',
    id,
    prompt: q.prompt,
    options: options.map((text, i) => ({ text, why: reasons[i] })),
    answer: q.answer,
    errorKind: 'conceito',
  };
}

function variant(q: Q, prefix: string): Q {
  return {
    ...q,
    prompt: prefix + q.prompt,
    wrong: [q.wrong[1], q.wrong[0] + ' — sem verificar os dados'],
  };
}

function build(l: LessonDef): MicroLesson {
  const first = {
    id: 'base',
    part: l.order === 1 ? 'A história' : 'Ideia principal',
    title: l.order === 1 ? 'Como surgiu ' + l.title : l.title,
    goal: 'Compreender a ideia principal de ' + l.title + '.',
    explain: (l.history ? l.history + '\n\n' : '') + l.core,
    art: 'livro' as const,
    check: activity(l.q1, l.id + '-base-check'),
    recovery: {
      explain: 'Retome a ideia central: ' + l.core,
      check: activity(variant(l.q1, 'Em outra situação: '), l.id + '-base-recovery'),
    },
  };
  const second = {
    id: 'aplicar',
    part: 'Aplicação prática',
    title: 'Aplicar ' + l.title,
    goal: 'Usar o conceito em uma situação concreta e reconhecer seus limites.',
    explain: l.application,
    art: 'engrenagem' as const,
    check: activity(l.q2, l.id + '-apply-check'),
    recovery: {
      explain: 'Compare a situação com o princípio estudado: ' + l.application,
      check: activity(variant(l.q2, 'Em um novo caso: '), l.id + '-apply-recovery'),
    },
  };
  const third = {
    id: 'transferir',
    part: 'Síntese',
    title: 'Transferir para outro cenário',
    goal: 'Escolher uma ação adequada e indicar qual evidência confirma a decisão.',
    explain:
      'Em uma situação nova, comece pelo objetivo e pelos limites do problema. Identifique qual dado, etapa ou controle sustenta a conclusão; depois confira o resultado observado em vez de confiar apenas na intenção inicial. Se a evidência contradisser a hipótese, volte à etapa que precisa de ajuste. Em auditoria, registre a justificativa, os limites conhecidos e quem responde pela decisão.',
    art: 'revisao' as const,
    check: activity(l.transfer, l.id + '-transfer-check'),
    recovery: {
      explain:
        'Na recuperação, separe o que foi observado do que foi presumido. Retorne ao critério de aceite, procure a evidência correspondente e explique por que ela sustenta a escolha. Não declare sucesso quando o resultado ainda não foi verificado.',
      check: activity(variant(l.transfer, 'Em outro cenário, qual decisão é melhor? '), l.id + '-transfer-recovery'),
    },
  };
  return {
    ...base[l.section],
    id: l.id,
    series: { id: l.group, order: l.order },
    title: l.title,
    opening: activity({ ...l.q1, prompt: 'Antes da explicação: ' + l.q1.prompt }, l.id + '-opening'),
    steps: [first, second, third],
    consolidation: [
      {
        kind: 'sort',
        id: 'classificar',
        prompt: 'Classifique as afirmações sobre ' + l.title + '.',
        categories: ['Correta', 'Erro comum'],
        items: [
          { text: l.q1.correct, cat: 0, why: l.q1.why },
          { text: l.q1.wrong[0], cat: 1, why: 'A afirmação ignora uma condição central.' },
          { text: l.q2.wrong[1], cat: 1, why: 'A afirmação não corresponde ao critério explicado.' },
        ],
      },
      {
        kind: 'fix',
        id: 'depurar',
        prompt: 'Uma anotação contém um erro. Toque na linha que precisa de correção.',
        lines: [l.q1.correct, l.q2.correct, l.q2.wrong[1]],
        bug: 2,
        why: l.q2.why,
        fixed: l.q2.correct,
        errorKind: 'conceito',
      },
      {
        kind: 'compare',
        id: 'comparar',
        prompt: 'Qual decisão aplica melhor ' + l.title + '?',
        scenarios: [
          { title: 'Opção A', body: l.q2.correct + ' ' + l.q2.why },
          { title: 'Opção B', body: 'Aceitar uma conclusão sem conferir os dados, as permissões ou o resultado observado.' },
        ],
        answer: 0,
        why: 'A escolha precisa corresponder ao conceito e ser sustentada por uma evidência verificável.',
        errorKind: 'procedimento',
      },
    ],
    exam: [
      {
        kind: 'exam',
        id: l.id + '-exam',
        prompt: 'Questão de fixação',
        questionId: l.examQuestion,
      },
    ],
    summary: [...l.summary],
  };
}

const lessons: LessonDef[] = [
  {
    id: 'ia.etica.1', section: 'etica', group: 'ia.etica', order: 1,
    title: 'Princípios da IA responsável',
    history: 'Em 22 de maio de 2019, a OCDE adotou uma recomendação intergovernamental sobre inteligência artificial. Em 23 de novembro de 2021, a UNESCO aprovou uma recomendação global sobre ética da IA. Esses marcos registram uma mudança importante: não basta perguntar se um modelo produz respostas úteis; também é preciso considerar direitos, justiça, transparência e responsabilidade.',
    core: 'IA responsável reúne princípios e práticas para que sistemas sejam desenvolvidos e usados com segurança, justiça e controle. Entre os princípios estão privacidade, transparência, explicabilidade, robustez, não discriminação, responsabilização e supervisão humana. Retirar um atributo sensível de uma tabela não garante justiça: CEP ou escola podem funcionar como substitutos indiretos desse atributo.',
    application: 'Imagine um modelo que prioriza pedidos de benefício público. A equipe deve documentar a finalidade, conferir a qualidade dos dados, comparar erros entre grupos e definir quem pode revisar ou interromper decisões problemáticas. O sistema ajuda a equipe, mas não elimina a responsabilidade institucional. Para auditoria, registre limitações, testes, responsáveis e medidas corretivas.',
    q1: {
      prompt: 'Por que retirar sexo e raça dos dados não garante, por si só, um modelo imparcial?',
      correct: 'Outras variáveis podem funcionar como substitutos indiretos e preservar desigualdades.',
      wrong: ['Porque a imparcialidade depende apenas do tamanho do conjunto de treino.', 'Porque todo modelo que usa dados pessoais é necessariamente discriminatório.'],
      answer: 0, why: 'Variáveis como CEP, renda e escola podem reproduzir relações com atributos sensíveis; é necessário avaliar resultados e possíveis vieses.',
    },
    q2: {
      prompt: 'Qual prática combina melhor com IA responsável em uma decisão de alto impacto?',
      correct: 'Definir supervisão humana efetiva, registrar limites e avaliar resultados por grupo.',
      wrong: ['Confiar apenas na acurácia média do modelo.', 'Retirar todos os registros que revelam um erro, sem documentar o motivo.'],
      answer: 0, why: 'A supervisão e a avaliação por grupo ajudam a detectar impactos que uma métrica geral pode esconder.',
    },
    transfer: {
      prompt: 'Um modelo reduz o tempo de análise, mas erra mais para um grupo específico. O que a equipe deve fazer?',
      correct: 'Investigar os dados e o erro por grupo, documentar o achado e corrigir antes de ampliar o uso.',
      wrong: ['Manter o modelo porque a média geral melhorou.', 'Ocultar o resultado para evitar que o projeto seja interrompido.'],
      answer: 0, why: 'A vantagem operacional não elimina o dever de avaliar impactos desiguais e agir sobre eles.',
    },
    examQuestion: 'q.ia.04.001',
    summary: ['A OCDE adotou uma recomendação sobre IA em 2019; a UNESCO aprovou uma recomendação global de ética em 2021.', 'IA responsável combina justiça, transparência, privacidade, segurança e responsabilização.', 'Remover atributos sensíveis não elimina automaticamente vieses indiretos ou históricos.'],
  },
  {
    id: 'ia.etica.2', section: 'etica', group: 'ia.etica', order: 2,
    title: 'Vieses e explicações locais',
    history: '',
    core: 'Viés algorítmico é um padrão de erro que pode favorecer ou prejudicar grupos. Ele pode vir de dados históricos desiguais, de amostras que representam mal a população, de medidas inadequadas ou do excesso de confiança humana na automação. Para investigar uma decisão específica de uma caixa-preta, LIME altera os dados próximos daquela instância e ajusta um modelo simples que aproxima o comportamento local do modelo complexo.',
    application: 'Se uma ferramenta classifica um contrato como arriscado, o auditor deve perguntar quais fatores contribuíram para aquela classificação e se a explicação é coerente com a finalidade. Uma explicação local é uma aproximação, não uma prova de causalidade nem uma garantia de que o modelo esteja correto. Compare-a com os dados de origem e com outras evidências.',
    q1: {
      prompt: 'Qual exemplo representa viés de amostragem ou representação?',
      correct: 'O conjunto de treino contém poucos exemplos de parte da população e o sistema erra mais para esse grupo.',
      wrong: ['A equipe registra a versão do modelo usado na análise.', 'O modelo é testado em dados separados daqueles usados no treino.'],
      answer: 0, why: 'A representação insuficiente de um grupo pode reduzir a qualidade do modelo para esse grupo.',
    },
    q2: {
      prompt: 'Como a técnica LIME explica uma classificação individual?',
      correct: 'Perturba exemplos próximos e ajusta um modelo simples que imita localmente a caixa-preta.',
      wrong: ['Calcula apenas a acurácia global de todos os registros.', 'Mostra necessariamente a sequência completa de cálculos internos da rede.'],
      answer: 0, why: 'LIME oferece uma aproximação interpretável em torno de uma instância específica.',
    },
    transfer: {
      prompt: 'Uma explicação de LIME parece plausível. O que ainda deve ser conferido?',
      correct: 'Verificar a explicação contra os dados, o contexto da decisão e outras evidências.',
      wrong: ['Tratá-la como prova definitiva de causalidade.', 'Dispensar avaliação por grupo porque a explicação tem palavras compreensíveis.'],
      answer: 0, why: 'Uma explicação local ajuda a investigar, mas não demonstra sozinha a correção da decisão.',
    },
    examQuestion: 'q.ia.04.002',
    summary: ['Vieses podem surgir de dados históricos, amostras desequilibradas, medições ruins ou automação excessiva.', 'LIME ajusta uma aproximação interpretável perto de uma instância específica.', 'Explicação local ajuda a auditar, mas não prova causalidade nem correção.'],
  },
  {
    id: 'ia.etica.3', section: 'etica', group: 'ia.etica', order: 3,
    title: 'SHAP e governança de IA',
    history: '',
    core: 'SHAP usa valores de Shapley, da teoria dos jogos cooperativos, para distribuir entre as variáveis a contribuição para uma previsão. A governança de IA dá estrutura ao controle: inventário de sistemas, classificação por risco, avaliação de impacto, documentação, monitoramento e responsáveis identificados. A supervisão pode ocorrer em cada decisão, durante o funcionamento ou ser ausente; decisões de maior impacto pedem controles mais fortes.',
    application: 'Em uma auditoria, uma explicação SHAP pode indicar que aditivos elevados e a idade recente de uma entidade pesaram na classificação de risco. A equipe ainda precisa confirmar se esses fatores são legítimos e suficientes. Um programa de governança registra sistemas, dados, finalidade, versões, limitações, incidentes, critérios de revisão e ações corretivas.',
    q1: {
      prompt: 'Qual é a base conceitual dos valores SHAP?',
      correct: 'Os valores de Shapley, que distribuem a contribuição entre participantes de um jogo cooperativo.',
      wrong: ['A contagem de frequência de palavras em um documento.', 'A divisão aleatória dos dados em treino e teste.'],
      answer: 0, why: 'SHAP adapta a ideia de contribuição dos valores de Shapley para explicar previsões.',
    },
    q2: {
      prompt: 'Qual é um componente básico da governança de IA?',
      correct: 'Manter inventário, avaliar riscos, documentar limitações e monitorar o sistema.',
      wrong: ['Permitir que qualquer equipe instale modelos sem registro.', 'Avaliar somente na primeira semana e nunca revisar de novo.'],
      answer: 0, why: 'A governança exige papéis, registros e acompanhamento contínuo.',
    },
    transfer: {
      prompt: 'Um sistema de IA afeta direitos de cidadãos. Qual medida é mais adequada antes de ampliar seu uso?',
      correct: 'Avaliar impactos, definir responsáveis e mecanismos de intervenção, e manter registros auditáveis.',
      wrong: ['Confiar na explicação do modelo sem teste de impacto.', 'Retirar a supervisão para acelerar decisões.'],
      answer: 0, why: 'O nível de controle deve acompanhar o risco e permitir que pessoas detectem e corrijam problemas.',
    },
    examQuestion: 'q.ia.04.003',
    summary: ['SHAP distribui a previsão entre variáveis usando valores de Shapley.', 'Governança inclui inventário, riscos, documentação, responsáveis e monitoramento.', 'Supervisão humana efetiva é proporcional ao impacto da decisão.'],
  },
  {
    id: 'ia.lgpd.1', section: 'lgpd-ebia', group: 'ia.lgpd-ebia', order: 1,
    title: 'Da proteção de dados à política nacional de IA',
    history: 'A Lei nº 13.709, a LGPD, foi sancionada em 14 de agosto de 2018 para regular o tratamento de dados pessoais também em meios digitais. Em 6 de abril de 2021, a Portaria MCTI nº 4.617 instituiu a Estratégia Brasileira de Inteligência Artificial (EBIA). Em 2024, o governo apresentou o Plano Brasileiro de Inteligência Artificial (PBIA) para o período 2024–2028. São instrumentos diferentes: lei, estratégia de política pública e plano de ações.',
    core: 'A LGPD estabelece regras obrigatórias para o tratamento de dados pessoais por organizações públicas e privadas. A EBIA orienta a política brasileira de pesquisa, inovação e uso consciente de IA; ela tem nove eixos temáticos, três transversais e seis verticais. O PBIA 2024–2028 organiza iniciativas e investimentos. A estratégia e o plano não substituem as obrigações da LGPD.',
    application: 'Ao iniciar um sistema de IA em órgão público, defina a finalidade do tratamento, a base legal adequada, os dados necessários, os controles de segurança e a forma de prestar contas. A EBIA pode orientar objetivos institucionais de uso responsável e desenvolvimento de capacidades, mas a equipe continua obrigada a cumprir a lei aplicável e documentar as escolhas.',
    q1: {
      prompt: 'Qual afirmação distingue corretamente LGPD e EBIA?',
      correct: 'A LGPD é uma lei de proteção de dados; a EBIA é uma estratégia pública instituída por portaria em 2021.',
      wrong: ['A EBIA substitui a LGPD para sistemas de IA do governo.', 'A LGPD se aplica somente a dados armazenados em papel.'],
      answer: 0, why: 'A estratégia orienta políticas e iniciativas, enquanto a LGPD estabelece obrigações legais de tratamento de dados.',
    },
    q2: {
      prompt: 'Quantos eixos temáticos a EBIA organiza, segundo o documento estudado?',
      correct: 'Nove eixos: três transversais e seis verticais.',
      wrong: ['Um único eixo centrado em segurança pública.', 'Dezesseis eixos, todos classificados como verticais.'],
      answer: 0, why: 'O documento distribui os temas em três eixos transversais e seis verticais.',
    },
    transfer: {
      prompt: 'Uma equipe quer usar uma estratégia pública de IA como justificativa para ignorar uma obrigação da LGPD. Como agir?',
      correct: 'Tratar a estratégia como orientação de política, sem dispensar a análise da base legal e dos deveres da LGPD.',
      wrong: ['Considerar toda estratégia superior a uma lei.', 'Usar os dados primeiro e procurar uma base legal depois.'],
      answer: 0, why: 'A estratégia pública não afasta obrigações legais de proteção de dados.',
    },
    examQuestion: 'q.ia.04.006',
    summary: ['A LGPD foi sancionada em 2018; a EBIA foi instituída por portaria do MCTI em 2021.', 'A EBIA tem nove eixos; o PBIA organiza ações para 2024–2028.', 'Lei, estratégia e plano têm funções diferentes e não devem ser confundidos.'],
  },
  {
    id: 'ia.lgpd.2', section: 'lgpd-ebia', group: 'ia.lgpd-ebia', order: 2,
    title: 'Finalidade, necessidade e dados pessoais',
    history: '',
    core: 'A LGPD exige uma base legal para cada tratamento. Entre os princípios do art. 6º, a finalidade exige propósitos legítimos, específicos e informados; a adequação exige compatibilidade com eles; a necessidade limita a coleta ao mínimo necessário. Dados sensíveis têm hipóteses mais restritas. Dados pseudonimizados continuam pessoais; dados anonimizados podem deixar de ser pessoais se a reversão não puder ocorrer com meios razoáveis.',
    application: 'Antes de treinar um modelo, a equipe registra para que os dados serão usados, quais atributos são necessários, de onde vieram, quem pode acessá-los e quando serão descartados. A expressão “talvez seja útil no futuro” não basta para coletar tudo. No poder público, a base legal deve ser avaliada de acordo com a finalidade pública e as regras aplicáveis, sem presumir que consentimento seja sempre a única opção.',
    q1: {
      prompt: 'Qual princípio da LGPD fundamenta coletar apenas os atributos necessários à finalidade?',
      correct: 'Necessidade, que limita o tratamento ao mínimo necessário.',
      wrong: ['Livre acesso, que trata da consulta facilitada pelo titular.', 'Qualidade dos dados, que exige exatidão e atualização.'],
      answer: 0, why: 'O princípio da necessidade reduz a coleta e o uso de dados que não são necessários para a finalidade.',
    },
    q2: {
      prompt: 'Qual afirmação sobre pseudonimização é correta?',
      correct: 'Dados pseudonimizados continuam sendo dados pessoais e exigem proteção.',
      wrong: ['A pseudonimização torna todos os dados públicos.', 'A pseudonimização equivale sempre à anonimização irreversível.'],
      answer: 0, why: 'A possibilidade de vincular os dados a alguém não desaparece necessariamente com a pseudonimização.',
    },
    transfer: {
      prompt: 'Uma equipe quer guardar todos os dados coletados “para talvez usá-los depois”. Qual ajuste é mais adequado?',
      correct: 'Definir a finalidade e limitar a coleta aos dados necessários, com base legal e prazo definidos.',
      wrong: ['Guardar tudo indefinidamente porque armazenamento é barato.', 'Substituir a base legal por uma declaração genérica de interesse.'],
      answer: 0, why: 'Finalidade e necessidade exigem limitar o tratamento e explicar por que os dados são utilizados.',
    },
    examQuestion: 'q.ia.04.005',
    summary: ['Cada tratamento precisa de base legal; consentimento não é a única hipótese.', 'Necessidade significa coletar e usar o mínimo necessário à finalidade.', 'Dados pseudonimizados continuam pessoais; anonimização depende da possibilidade de reversão razoável.'],
  },
  {
    id: 'ia.lgpd.3', section: 'lgpd-ebia', group: 'ia.lgpd-ebia', order: 3,
    title: 'Decisões automatizadas e revisão',
    history: '',
    core: 'O art. 20 da LGPD dá ao titular o direito de solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses. O controlador deve fornecer informações claras e adequadas sobre critérios e procedimentos, respeitados os segredos comercial e industrial. A redação vigente não exige expressamente que a revisão seja feita por pessoa natural; supervisão humana continua sendo uma boa prática conforme o risco.',
    application: 'Se um sistema negar crédito, benefício ou outro serviço, a organização deve ter procedimento para receber o pedido, avaliar a decisão, explicar critérios e guardar registros. Para tratamentos de alto risco, um relatório de impacto pode ajudar a documentar riscos e salvaguardas. A auditoria pode verificar se o sistema gera efeitos discriminatórios e se os controles funcionam na prática.',
    q1: {
      prompt: 'O que o titular pode fazer diante de uma decisão unicamente automatizada que afete seus interesses?',
      correct: 'Solicitar a revisão e obter informações claras sobre critérios e procedimentos, observados os segredos protegidos.',
      wrong: ['Exigir sempre o código-fonte completo sem qualquer ressalva.', 'Perder todos os direitos porque a decisão foi tomada por software.'],
      answer: 0, why: 'O art. 20 prevê solicitação de revisão e informações sobre critérios e procedimentos, com respeito aos segredos comercial e industrial.',
    },
    q2: {
      prompt: 'A redação vigente do art. 20 exige expressamente que a revisão seja feita por pessoa natural?',
      correct: 'Não; a exigência explícita de revisão por pessoa natural não consta da redação vigente.',
      wrong: ['Sim, em todos os casos e sem exceções.', 'O artigo proíbe qualquer revisão de decisão automatizada.'],
      answer: 0, why: 'A redação atual garante a possibilidade de solicitar revisão, mas não contém a exigência expressa de revisão humana que existia na versão original.',
    },
    transfer: {
      prompt: 'Qual evidência ajuda a auditoria a verificar uma decisão automatizada contestada?',
      correct: 'Registro da decisão, critérios usados, informações fornecidas ao titular e procedimento de revisão.',
      wrong: ['Apenas uma declaração de que o modelo é confiável.', 'Omitir os dados e registros para evitar questionamentos.'],
      answer: 0, why: 'Registros e critérios permitem reconstruir a decisão e verificar se o procedimento foi seguido.',
    },
    examQuestion: 'q.ia.04.004',
    summary: ['O art. 20 permite solicitar revisão de determinadas decisões exclusivamente automatizadas.', 'O controlador deve informar critérios e procedimentos, observados segredos comercial e industrial.', 'A lei vigente não exige expressamente revisão por pessoa natural, embora supervisão humana possa ser boa prática.'],
  },
  {
    id: 'ia.ciencia.1', section: 'ciencia-dados', group: 'ia.ciencia-dados', order: 1,
    title: 'Da mineração de dados à ciência de dados',
    history: 'No fim do século XX, equipes de mineração de dados buscaram uma forma comum de organizar projetos e reduzir erros repetidos. Com apoio da União Europeia, profissionais construíram uma metodologia entre setores; em 1999 foi apresentada a primeira versão do CRISP-DM, um processo de referência para projetos de mineração de dados. A abordagem permanece útil porque trata o trabalho como um ciclo que pode retornar a etapas anteriores.',
    core: 'CRISP-DM reúne seis fases: entendimento do negócio, entendimento dos dados, preparação, modelagem, avaliação e implantação. O ciclo não é uma escada rígida. Um problema descoberto na avaliação pode exigir corrigir dados ou rever o objetivo. Na análise descritiva, média é a soma dividida pela quantidade, mediana é o valor central em dados ordenados e moda é o valor mais frequente.',
    application: 'Suponha pagamentos de 2, 3, 3, 5 e 12 mil reais. A média é 5, a mediana é 3 e a moda é 3. O valor 12 puxa a média para cima, mas não muda a posição central. Um analista deve escolher a medida que melhor descreve os dados e registrar como tratou ausências, duplicatas e valores extremos; não deve apagar um outlier sem investigar sua origem.',
    q1: {
      prompt: 'Qual conjunto corresponde às seis fases do CRISP-DM?',
      correct: 'Negócio, dados, preparação, modelagem, avaliação e implantação.',
      wrong: ['Coleta, publicação, descarte, cobrança, cópia e arquivamento.', 'Treino, teste, publicação, garantia, venda e manutenção, sem análise do negócio.'],
      answer: 0, why: 'O CRISP-DM começa pelo problema de negócio e inclui compreensão, preparação e avaliação dos dados.',
    },
    q2: {
      prompt: 'Nos pagamentos 2, 3, 3, 5 e 12, em milhares de reais, qual é a mediana?',
      correct: '3, porque é o valor central depois de ordenar os cinco pagamentos.',
      wrong: ['5, porque é a média aritmética.', '12, porque é o maior valor do conjunto.'],
      answer: 0, why: 'Com cinco valores ordenados, a mediana ocupa a terceira posição.',
    },
    transfer: {
      prompt: 'Um pagamento aparece muito acima dos demais. Qual atitude é mais adequada antes de removê-lo?',
      correct: 'Investigar se é erro de registro ou um caso real e documentar o tratamento escolhido.',
      wrong: ['Apagá-lo sempre, pois todo valor extremo é inválido.', 'Mantê-lo sem conferir, pois outliers nunca afetam médias.'],
      answer: 0, why: 'Um valor extremo pode ser erro ou um achado relevante; a decisão precisa de contexto.',
    },
    examQuestion: 'q.ia.04.007',
    summary: ['CRISP-DM foi apresentado em 1999 e organiza o trabalho em seis fases iterativas.', 'Média, mediana e moda respondem a perguntas diferentes sobre um conjunto.', 'Ausências, duplicatas e outliers exigem tratamento documentado, não exclusão automática.'],
  },
  {
    id: 'ia.ciencia.2', section: 'ciencia-dados', group: 'ia.ciencia-dados', order: 2,
    title: 'Matriz de confusão, precisão e revocação',
    history: '',
    core: 'Um modelo de classificação pode acertar muitos casos comuns e ainda falhar justamente nos casos importantes. A matriz de confusão separa verdadeiros positivos (VP), falsos positivos (FP), falsos negativos (FN) e verdadeiros negativos (VN). Precisão = VP/(VP+FP): entre os alertas, quantos são positivos reais. Revocação = VP/(VP+FN): entre os positivos reais, quantos foram encontrados.',
    application: 'Em 1.000 contratos, 50 eram irregulares; o modelo apontou 40 e acertou 30. Há 30 VP, 10 FP e 20 FN. A precisão é 30/40 = 75%, e a revocação é 30/50 = 60%. A acurácia é 97%, mas pode parecer alta porque a maioria dos contratos é regular. A métrica prioritária depende do custo de falsos alertas e de irregularidades que passam despercebidas.',
    q1: {
      prompt: 'O que a precisão mede em um classificador?',
      correct: 'Entre os casos apontados como positivos, a proporção que realmente é positiva.',
      wrong: ['Entre os positivos reais, a proporção que o modelo encontrou.', 'A proporção de todos os casos classificados corretamente, sem separar tipos de erro.'],
      answer: 0, why: 'Precisão usa VP/(VP+FP); revocação usa VP/(VP+FN); acurácia considera acertos totais.',
    },
    q2: {
      prompt: 'Por que a acurácia pode ser enganosa quando há poucas irregularidades?',
      correct: 'Um modelo que prevê a classe majoritária pode ter acurácia alta e perder os casos relevantes.',
      wrong: ['Porque a acurácia mede somente os falsos positivos.', 'Porque a matriz de confusão só funciona para regressão.'],
      answer: 0, why: 'Em classes desbalanceadas, comparar precisão, revocação e F1 revela tipos de erro que a acurácia esconde.',
    },
    transfer: {
      prompt: 'A equipe precisa reduzir irregularidades que passam despercebidas. Qual métrica deve observar com atenção?',
      correct: 'Revocação, pois mede quantos dos positivos reais foram identificados.',
      wrong: ['Acurácia isoladamente, sem olhar os falsos negativos.', 'O número total de registros, sem separar previsão e realidade.'],
      answer: 0, why: 'Revocação se relaciona diretamente à fração dos casos positivos reais que o modelo encontra.',
    },
    examQuestion: 'q.ia.04.008',
    summary: ['Precisão olha os positivos previstos; revocação olha os positivos reais.', 'A matriz de confusão separa VP, FP, FN e VN.', 'Em classes desbalanceadas, a acurácia isolada pode esconder falsos negativos.'],
  },
  {
    id: 'ia.ciencia.3', section: 'ciencia-dados', group: 'ia.ciencia-dados', order: 3,
    title: 'Validação e limites das métricas',
    history: '',
    core: 'Separe treino e teste: o teste deve representar dados que o modelo não viu ao aprender. Na validação cruzada k-fold, o procedimento repete o treino k vezes, mudando a parte reservada para teste em cada rodada. AUC mede a área sob a curva ROC; 0,5 corresponde a desempenho equivalente ao acaso, enquanto 1 indica separação perfeita. Em regressão, RMSE penaliza mais os erros grandes do que MAE.',
    application: 'Avaliar nos mesmos dados usados para treinar tende a produzir uma impressão otimista e pode ocultar overfitting. Também não confunda correlação com causalidade: dois indicadores podem variar juntos por causa de uma terceira variável. Para comunicar um resultado, informe conjunto de avaliação, métrica, limitações e o que ela não demonstra.',
    q1: {
      prompt: 'Como funciona a validação cruzada k-fold?',
      correct: 'O modelo é treinado k vezes, cada uma reservando uma parte diferente dos dados para avaliação.',
      wrong: ['O modelo é testado apenas nos dados de treino.', 'O mesmo único registro é repetido k vezes e conta como k exemplos novos.'],
      answer: 0, why: 'A rotação das partes fornece uma estimativa mais estável do desempenho.',
    },
    q2: {
      prompt: 'Uma correlação forte entre duas variáveis demonstra que uma causa a outra?',
      correct: 'Não; pode haver coincidência ou uma terceira variável que influencie ambas.',
      wrong: ['Sim, desde que a correlação seja maior que zero.', 'Sim, mas somente quando há muitos registros.'],
      answer: 0, why: 'Correlação mede associação; causalidade exige evidência e desenho de análise compatíveis com a hipótese causal.',
    },
    transfer: {
      prompt: 'Um modelo tem ótimo resultado no treino e desempenho ruim em dados novos. Qual suspeita deve ser investigada?',
      correct: 'Overfitting e possíveis diferenças entre os dados de treino e os dados novos.',
      wrong: ['Que os dados de teste devem ser apagados.', 'Que o modelo está correto porque já obteve uma métrica alta.'],
      answer: 0, why: 'A diferença entre treino e dados não vistos pode indicar sobreajuste ou mudança de distribuição.',
    },
    examQuestion: 'q.ia.04.009',
    summary: ['Validação cruzada k-fold alterna as partes reservadas para avaliação.', 'AUC 0,5 equivale ao acaso; RMSE penaliza mais erros grandes do que MAE.', 'Correlação não prova causalidade; desempenho no treino não garante generalização.'],
  },
  {
    id: 'ia.bigdata.1', section: 'big-data', group: 'ia.big-data', order: 1,
    title: 'Por que surgiu o Big Data',
    history: 'Um marco para o processamento de grandes volumes foi o artigo MapReduce: Simplified Data Processing on Large Clusters, de Jeffrey Dean e Sanjay Ghemawat, publicado em 2004. Ele descreveu uma forma de distribuir etapas de processamento por vários computadores e agrupar resultados. A família de tecnologias de Big Data cresceu em torno de armazenamento distribuído, processamento em lote e, depois, ferramentas voltadas a diferentes ritmos e formatos de dados.',
    core: 'Os três Vs clássicos, destacados no edital, são volume (quantidade), velocidade (ritmo de chegada e processamento) e variedade (formatos diferentes). A literatura acrescenta veracidade (confiabilidade) e valor (utilidade). O processamento distribuído divide o trabalho entre máquinas de um cluster; pode operar em lote, com conjuntos acumulados, ou em fluxo, acompanhando eventos à medida que chegam.',
    application: 'Um tribunal pode analisar anos de pagamentos em lote e, ao mesmo tempo, receber eventos para alertar sobre possíveis duplicidades. Arquivos de planilhas, PDFs, JSON e registros de sistemas ilustram a variedade. A arquitetura deve ser escolhida pela escala, pelo tempo de resposta, pela qualidade exigida e pelo objetivo da análise, não só pelo nome popular da ferramenta.',
    q1: {
      prompt: 'Quais são os três Vs clássicos de Big Data exigidos no edital?',
      correct: 'Volume, velocidade e variedade.',
      wrong: ['Volume, veracidade e valor.', 'Velocidade, validade e visibilidade.'],
      answer: 0, why: 'Veracidade e valor são extensões posteriores; os três Vs clássicos são volume, velocidade e variedade.',
    },
    q2: {
      prompt: 'O que diferencia processamento em fluxo do processamento em lote?',
      correct: 'O fluxo trata eventos à medida que chegam; o lote processa conjuntos acumulados.',
      wrong: ['O fluxo só aceita dados estruturados e o lote só aceita imagens.', 'O lote sempre exige baixa latência e o fluxo sempre espera um mês.'],
      answer: 0, why: 'O modo em fluxo busca tratar eventos continuamente; o lote processa uma coleção reunida.',
    },
    transfer: {
      prompt: 'Uma análise precisa detectar possível pagamento duplicado quase em tempo real. Qual abordagem combina melhor com esse objetivo?',
      correct: 'Processamento em fluxo, com regras e dados disponíveis conforme os eventos chegam.',
      wrong: ['Esperar acumular todos os pagamentos do ano e processar uma única vez.', 'Eliminar registros antigos sem examinar a repetição.'],
      answer: 0, why: 'O fluxo reduz a espera entre a chegada de um evento e a análise.',
    },
    examQuestion: 'q.ia.04.010',
    summary: ['MapReduce, publicado em 2004, é um marco de processamento distribuído.', 'Os três Vs clássicos são volume, velocidade e variedade.', 'Lote processa conjuntos acumulados; fluxo acompanha eventos que chegam.'],
  },
  {
    id: 'ia.bigdata.2', section: 'big-data', group: 'ia.big-data', order: 2,
    title: 'Hadoop, HDFS e MapReduce',
    history: '',
    core: 'O Hadoop é um ecossistema de código aberto para armazenamento e processamento distribuídos. No HDFS, arquivos são divididos em blocos e replicados em vários DataNodes; o NameNode mantém metadados sobre os blocos. No MapReduce, map processa registros e emite pares chave-valor, shuffle agrupa valores por chave e reduce combina os grupos. O YARN gerencia recursos e agenda tarefas no cluster.',
    application: 'Para contar palavras em milhões de documentos, cada máquina pode contar palavras em sua parte e emitir pares como (palavra, quantidade); depois, o shuffle reúne valores da mesma palavra e o reduce soma as quantidades. A replicação do HDFS tolera falhas de nós. O NameNode não guarda o conteúdo de todos os blocos: mantém a estrutura e sua localização.',
    q1: {
      prompt: 'Qual é a divisão correta de responsabilidades no HDFS?',
      correct: 'O NameNode mantém metadados; os DataNodes armazenam os blocos de dados.',
      wrong: ['O NameNode guarda todos os blocos e os DataNodes guardam só índices.', 'Cada arquivo fica inteiro em uma máquina, sem replicação.'],
      answer: 0, why: 'O HDFS distribui blocos pelos DataNodes e mantém metadados no NameNode.',
    },
    q2: {
      prompt: 'Qual é a função principal do YARN?',
      correct: 'Gerenciar recursos do cluster e agendar tarefas.',
      wrong: ['Ser uma linguagem SQL para consultar documentos.', 'Substituir o armazenamento distribuído por uma única máquina.'],
      answer: 0, why: 'O YARN cuida da gestão dos recursos de processamento no ecossistema Hadoop.',
    },
    transfer: {
      prompt: 'Em um pipeline MapReduce, o que acontece entre map e reduce?',
      correct: 'O shuffle agrupa os pares por chave antes de combinar os valores.',
      wrong: ['Os dados são descartados sem agrupamento.', 'A fase reduce precisa iniciar antes que exista qualquer par chave-valor.'],
      answer: 0, why: 'O shuffle reúne os valores associados à mesma chave para que o reduce os agregue.',
    },
    examQuestion: 'q.ia.04.011',
    summary: ['HDFS divide arquivos em blocos replicados; NameNode mantém metadados e DataNodes guardam blocos.', 'MapReduce usa map, shuffle e reduce.', 'YARN gerencia recursos e agenda tarefas no cluster.'],
  },
  {
    id: 'ia.bigdata.3', section: 'big-data', group: 'ia.big-data', order: 3,
    title: 'Spark, data lake e ELT',
    history: '',
    core: 'O Apache Spark é um motor de processamento distribuído que pode manter dados em memória entre etapas, o que favorece tarefas iterativas. Em armazenamento analítico, um data warehouse costuma aplicar schema-on-write: a estrutura é definida antes de gravar. Um data lake aceita dados brutos variados e costuma usar schema-on-read, interpretando a estrutura no momento da leitura. ETL transforma antes de carregar; ELT carrega e transforma depois, no destino.',
    application: 'Se a equipe quer guardar planilhas, PDFs, logs e JSON brutos para explorar perguntas que ainda vão mudar, um data lake com schema-on-read pode dar flexibilidade. O ELT executa a transformação dentro da plataforma depois de carregar os dados. Se a necessidade é relatório corporativo com esquema rígido e controlado, um warehouse pode ser mais adequado. A escolha depende de governança, qualidade e finalidade.',
    q1: {
      prompt: 'Qual combinação descreve um data lake usado para explorar dados brutos e variados?',
      correct: 'Schema-on-read, com estrutura interpretada quando os dados são lidos.',
      wrong: ['Schema-on-write obrigatório para cada arquivo antes de armazenar qualquer dado.', 'Somente tabelas relacionais normalizadas e sem dados brutos.'],
      answer: 0, why: 'O data lake mantém dados variados e costuma aplicar a interpretação do esquema na leitura.',
    },
    q2: {
      prompt: 'Qual é a diferença entre ETL e ELT?',
      correct: 'No ETL, transforma-se antes de carregar; no ELT, carrega-se e transforma-se depois.',
      wrong: ['No ETL, nunca há transformação; no ELT, os dados não são carregados.', 'Os dois processos exigem sempre transformar antes da carga.'],
      answer: 0, why: 'A ordem da transformação em relação à carga é a distinção central.',
    },
    transfer: {
      prompt: 'A equipe precisa guardar registros de origens e formatos variados e decidir o esquema durante a análise. Qual desenho atende melhor?',
      correct: 'Data lake com schema-on-read, governança de acesso e transformação conforme a necessidade.',
      wrong: ['Eliminar os dados não estruturados sem verificar a finalidade.', 'Aplicar obrigatoriamente um esquema fixo a todos os arquivos antes de conhecê-los.'],
      answer: 0, why: 'Schema-on-read permite interpretar dados variados no uso, mantendo controles de acesso e governança.',
    },
    examQuestion: 'q.ia.04.012',
    summary: ['Spark favorece tarefas iterativas ao manter dados em memória entre etapas.', 'Data lake costuma usar schema-on-read; data warehouse costuma usar schema-on-write.', 'ETL transforma antes da carga; ELT transforma depois da carga.'],
  },
];

export const microLessonsEticaDados: MicroLesson[] = lessons.map(build);
