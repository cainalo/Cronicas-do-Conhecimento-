// Microaula "Assinatura digital e certificados" (cap.seg.01, seção assinatura), no formato aprovado
// em 24/10/2026. Uma ideia por etapa, checagem imediata e recuperação com outro exemplo. Fatos só do
// texto do capítulo (05-assinatura-certificados.md). Revisão editorial humana: pendente.
import type { MicroLesson } from '@/content/types';

export const microSegAssinatura: MicroLesson = {
  id: 'micro.seg.assinatura',
  chapterId: 'cap.seg.01',
  sectionId: 'assinatura',
  title: 'Assinatura digital e certificados',
  opening: {
    kind: 'choice',
    id: 'abertura',
    prompt: 'Você recebe "a chave pública de Bruno" por e-mail. Antes de confiar nela, o que precisa saber?',
    options: [
      { text: 'Se ela é mesmo de Bruno, e não de um impostor', why: 'Isso. Uma chave pública não traz o nome do dono escrito de forma confiável: é o que o certificado digital resolve.' },
      { text: 'Nada: chave pública pode ser divulgada, então é sempre confiável', why: 'Pode ser divulgada, mas alguém pode divulgar a própria chave fingindo ser Bruno.' },
      { text: 'Qual é a chave privada de Bruno', why: 'A privada nunca é compartilhada. A pergunta certa é se a pública é dele.' },
    ],
    answer: 0,
  },
  steps: [
    {
      id: 'assinar',
      part: 'Assinatura',
      title: 'Como se assina',
      goal: 'Descrever os passos de quem assina.',
      explain:
        'A assinatura digital combina **hash** e **criptografia assimétrica**.\n\nPara **assinar**, o remetente:\n\n1. calcula o **hash** do documento;\n2. cifra esse hash com a **sua chave privada**: o resultado é a **assinatura**;\n3. envia o documento **junto com** a assinatura.',
      check: {
        kind: 'order',
        id: 'as-c',
        prompt: 'Ordene os passos de quem assina.',
        items: ['Calcular o hash do documento', 'Cifrar o hash com a própria chave privada', 'Enviar o documento com a assinatura'],
        why: 'Primeiro o resumo, depois a operação com a privada, por fim o envio.',
        errorKind: 'procedimento',
      },
      recovery: {
        explain: 'Pense em **carimbar o resumo**: primeiro você tira o resumo do documento (hash), depois carimba esse resumo com algo que só você tem (a chave privada). O carimbo é a assinatura, e ela segue grudada no documento.',
        check: {
          kind: 'choice',
          id: 'as-r',
          prompt: 'O que o remetente cifra com a chave privada?',
          options: [
            { text: 'O hash do documento', why: 'Isso.' },
            { text: 'O documento inteiro', why: 'Assina-se o hash, que é pequeno e de tamanho fixo.' },
            { text: 'A chave pública do destinatário', why: 'A assinatura não envolve a chave do destinatário.' },
          ],
          answer: 0,
          errorKind: 'procedimento',
        },
      },
    },
    {
      id: 'verificar',
      part: 'Assinatura',
      title: 'Como se confere',
      goal: 'Descrever os passos de quem verifica a assinatura.',
      explain:
        'Para **verificar**, qualquer destinatário:\n\n1. calcula **por conta própria** o hash do documento recebido;\n2. usa a **chave pública do remetente** para verificar a assinatura e obter o hash original;\n3. se os dois hashes **coincidem**, a assinatura é **válida**.\n\nRegra de prova: **assina-se com a privada** do signatário e **verifica-se com a pública** do signatário.',
      check: {
        kind: 'choice',
        id: 've-c',
        prompt: 'O signatário usa ____ para assinar, e o verificador usa ____ para conferir.',
        options: [
          { text: 'a chave privada do signatário; a chave pública do signatário', why: 'Isso.' },
          { text: 'a chave pública do verificador; a chave privada do verificador', why: 'Essa é a regra do sigilo, não da assinatura.' },
          { text: 'a chave pública do signatário; a chave privada do signatário', why: 'Invertido: a privada assina, a pública confere.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'Só o dono **faz** o carimbo (privada); **todo mundo confere** o carimbo (pública). E as duas chaves são **do mesmo par: o do signatário**. A chave do destinatário não entra na assinatura.',
        check: {
          kind: 'choice',
          id: 've-r',
          prompt: 'O destinatário calculou o hash do documento e ele não bateu com o que saiu da verificação. Conclusão:',
          options: [
            { text: 'A assinatura não é válida: o documento ou a assinatura foram alterados', why: 'Isso. Hashes diferentes invalidam a assinatura.' },
            { text: 'A assinatura é válida, só o hash mudou', why: 'Se o hash não bate, a assinatura não vale.' },
            { text: 'É preciso a chave privada do remetente para tirar a dúvida', why: 'A verificação só usa a pública do remetente.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'garantias',
      part: 'Assinatura',
      title: 'O que a assinatura garante',
      goal: 'Saber o que a assinatura garante e o que não garante.',
      explain:
        '| Garante | Não garante |\n|---|---|\n| **Integridade**: qualquer alteração invalida a assinatura | **Confidencialidade**: o documento continua legível |\n| **Autenticidade**: só o dono da privada a produziria | **Disponibilidade** |\n| **Não repúdio**: o signatário não pode negar a autoria | |\n\nAssina-se o **hash**, e não o documento inteiro, porque a operação assimétrica é **lenta** e o hash é pequeno e muda com qualquer alteração.',
      check: {
        kind: 'choice',
        id: 'ga-c',
        prompt: 'Um documento assinado digitalmente foi enviado por e-mail sem outra proteção. A assinatura NÃO garante:',
        options: [
          { text: 'A confidencialidade', why: 'Isso: o documento assinado continua legível.' },
          { text: 'A integridade', why: 'Garante: qualquer alteração invalida a assinatura.' },
          { text: 'O não repúdio', why: 'Garante: só o titular da privada poderia assinar.' },
        ],
        answer: 0,
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'A assinatura é um **lacre com o nome do autor**, não um envelope fechado: todos veem o conteúdo, mas qualquer mexida rompe o lacre e ninguém além do autor poderia ter lacrado. Se precisar de sigilo **e** assinatura, faz-se as duas coisas: assina e também cifra para o destinatário.',
        check: {
          kind: 'sort',
          id: 'ga-r',
          prompt: 'A assinatura digital garante ou não?',
          categories: ['Garante', 'Não garante'],
          items: [
            { text: 'Integridade', cat: 0, why: 'Alteração invalida.' },
            { text: 'Não repúdio', cat: 0, why: 'O autor não pode negar.' },
            { text: 'Confidencialidade', cat: 1, why: 'Continua legível.' },
            { text: 'Disponibilidade', cat: 1, why: 'Não é papel da assinatura.' },
          ],
        },
      },
    },
    {
      id: 'certificado',
      part: 'Certificados',
      title: 'Certificado: a chave pública com nome e carimbo',
      goal: 'Saber o que é um certificado digital e quem o assina.',
      explain:
        'Se Ana recebe "a chave pública de Bruno", como sabe que é mesmo dele?\n\nO **certificado digital** é um documento eletrônico que **vincula uma chave pública a uma identidade** (pessoa, empresa, servidor), **assinado por uma Autoridade Certificadora (AC)**.',
      check: {
        kind: 'choice',
        id: 'ce-c',
        prompt: 'Qual é a função do certificado digital?',
        options: [
          { text: 'Vincular uma chave pública a uma identidade, com a assinatura de uma AC', why: 'Isso.' },
          { text: 'Guardar a chave privada do titular em local seguro', why: 'O certificado não guarda a privada.' },
          { text: 'Cifrar o documento para o destinatário', why: 'Cifrar não é papel do certificado.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Pense numa **carteira de identidade da chave**: diz "esta chave pública é de Bruno", e quem garante isso é o **órgão emissor** (a AC), que assina a carteira. Quem confia na AC passa a confiar que a chave é de Bruno.',
        check: {
          kind: 'choice',
          id: 'ce-r',
          prompt: 'Quem assina o certificado digital de um servidor?',
          options: [
            { text: 'A Autoridade Certificadora emissora', why: 'Isso.' },
            { text: 'O próprio servidor, com a chave pública dele', why: 'Quem assina o certificado é a AC.' },
            { text: 'O navegador de quem acessa', why: 'O navegador confere, não assina.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'x509',
      part: 'Certificados',
      title: 'O que vai dentro de um X.509',
      goal: 'Reconhecer os campos do X.509 e saber que a privada não está lá.',
      explain:
        'O formato padrão é o **X.509**. Entre outros campos:\n\n- titular (*subject*) e emissor (*issuer*);\n- **chave pública do titular**;\n- período de validade;\n- número de série;\n- **assinatura da AC emissora**.\n\n**O certificado não contém a chave privada do titular.** Dizer o contrário é erro típico de prova.',
      check: {
        kind: 'multi',
        id: 'x5-c',
        prompt: 'O que um certificado X.509 contém? Marque todos.',
        options: [
          { text: 'A chave pública do titular', correct: true, why: 'É o que ele vincula à identidade.' },
          { text: 'O período de validade', correct: true, why: 'Campo do X.509.' },
          { text: 'A assinatura da AC emissora', correct: true, why: 'É o que dá confiança.' },
          { text: 'A chave privada do titular', correct: false, why: 'Nunca: a privada fica só com o titular.' },
        ],
        errorKind: 'confusao',
      },
      recovery: {
        explain: 'O certificado é **público**: qualquer site o entrega a qualquer visitante. Se a chave privada estivesse ali, todo mundo a teria e ela deixaria de ser privada. Por isso ele traz só a **pública**, os dados de quem é, a validade, o número de série e a assinatura da AC.',
        check: {
          kind: 'tf',
          id: 'x5-r',
          prompt: 'O certificado digital X.509 contém a chave privada do titular.',
          answer: false,
          why: 'Falso. Contém a pública; a privada fica só com o titular.',
          errorKind: 'confusao',
        },
      },
    },
    {
      id: 'icp',
      part: 'Infraestrutura',
      title: 'A ICP e a cadeia de confiança',
      goal: 'Saber os papéis de AC Raiz, ACs intermediárias e ARs, e como a cadeia é validada.',
      explain:
        'A **ICP** (PKI) é o conjunto de entidades, normas e tecnologias que emite e gerencia certificados:\n\n- **AC Raiz**: topo da hierarquia; certificado **autoassinado**, confiado previamente (vem instalado em sistemas e navegadores);\n- **ACs intermediárias**: emitem certificados aos usuários finais;\n- **Autoridades de Registro (AR)**: **identificam** o solicitante e encaminham o pedido à AC.\n\nO navegador valida o certificado do site, depois o da AC que o assinou, e assim por diante, até uma **raiz confiável**: é a **cadeia de certificação**.',
      check: {
        kind: 'sort',
        id: 'ic-c',
        prompt: 'Ligue cada entidade ao papel.',
        categories: ['AC Raiz', 'AC intermediária', 'AR'],
        items: [
          { text: 'Certificado autoassinado, no topo', cat: 0, why: 'Topo da hierarquia.' },
          { text: 'Emite certificados aos usuários finais', cat: 1, why: 'Subordinada à raiz.' },
          { text: 'Identifica o solicitante e encaminha o pedido', cat: 2, why: 'Autoridade de Registro.' },
        ],
      },
      recovery: {
        explain: 'Pense num **cartório**. A **AR** é o balcão que confere seus documentos. A **AC intermediária** emite o seu certificado. A **AC Raiz** é a autoridade máxima, em quem todos já confiam de antemão. Para confiar no seu certificado, o navegador sobe a escada até chegar à raiz.',
        check: {
          kind: 'choice',
          id: 'ic-r',
          prompt: 'Por que o certificado da AC Raiz é aceito, se ele é autoassinado?',
          options: [
            { text: 'Porque é confiado previamente: vem instalado em sistemas e navegadores', why: 'Isso.' },
            { text: 'Porque uma AR o assina', why: 'A AR não assina certificados: ela identifica o solicitante.' },
            { text: 'Porque ele contém a chave privada da raiz', why: 'Nenhum certificado contém chave privada.' },
          ],
          answer: 0,
          errorKind: 'conceito',
        },
      },
    },
    {
      id: 'revogacao',
      part: 'Infraestrutura',
      title: 'Revogação: LCR e OCSP',
      goal: 'Saber quando um certificado é revogado e como se consulta.',
      explain:
        'Um certificado pode ser **revogado antes do vencimento**, por exemplo se a **chave privada vazou**.\n\nConsulta-se a situação:\n\n- pela **LCR** (Lista de Certificados Revogados, *CRL*);\n- ou pelo protocolo **OCSP**, que responde o estado de **um certificado específico**.',
      check: {
        kind: 'choice',
        id: 'rv-c',
        prompt: 'A chave privada do servidor vazou ontem, e o certificado vence só no ano que vem. O que se faz?',
        options: [
          { text: 'Revoga-se o certificado; a situação aparece na LCR e no OCSP', why: 'Isso.' },
          { text: 'Nada: ele continua válido até vencer', why: 'Revogação existe justamente para casos como esse.' },
          { text: 'Troca-se só a data de validade', why: 'Não resolve: a chave vazada continua ligada ao certificado.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'É como um **cartão de banco roubado**: não se espera a data de validade, cancela-se já. A **LCR** é a lista de cartões cancelados; o **OCSP** é perguntar ao banco "este cartão específico ainda vale?".',
        check: {
          kind: 'sort',
          id: 'rv-r',
          prompt: 'Qual mecanismo?',
          categories: ['LCR', 'OCSP'],
          items: [
            { text: 'Lista com os certificados revogados', cat: 0, why: 'Lista de Certificados Revogados.' },
            { text: 'Responde o estado de um certificado específico', cat: 1, why: 'Consulta pontual.' },
          ],
        },
      },
    },
    {
      id: 'brasil',
      part: 'Infraestrutura',
      title: 'ICP-Brasil e assinatura digitalizada',
      goal: 'Saber a origem da ICP-Brasil, sua AC Raiz, e diferenciar assinatura digital de digitalizada.',
      explain:
        'A **ICP-Brasil** foi instituída pela **MP nº 2.200-2, de 24 de agosto de 2001**. A **AC Raiz** é o **ITI** (Instituto Nacional de Tecnologia da Informação). Documentos assinados com certificados ICP-Brasil têm **presunção de veracidade** em relação aos signatários (art. 10, § 1º).\n\n**Assinatura digitalizada** é a **imagem escaneada** de uma assinatura à mão: **não oferece** integridade nem não repúdio criptográficos.',
      check: {
        kind: 'choice',
        id: 'br-c',
        prompt: 'Sobre a ICP-Brasil, é correto:',
        options: [
          { text: 'Foi instituída pela MP 2.200-2/2001, e a AC Raiz é o ITI', why: 'Isso.' },
          { text: 'A AC Raiz é a Receita Federal', why: 'A AC Raiz da ICP-Brasil é o ITI.' },
          { text: 'Foi criada por uma lei de 2020', why: 'Foi a MP 2.200-2, de 2001.' },
        ],
        answer: 0,
        errorKind: 'conceito',
      },
      recovery: {
        explain: 'Guarde o par **MP 2.200-2/2001 + ITI**. E não confunda: **assinatura digital** é criptografia (hash e chave privada); **digitalizada** é só a **foto** da assinatura no papel, que qualquer um copia.',
        check: {
          kind: 'choice',
          id: 'br-r',
          prompt: 'Uma assinatura à mão foi escaneada e colada num PDF. Ela oferece não repúdio criptográfico?',
          options: [
            { text: 'Não: é assinatura digitalizada, só uma imagem', why: 'Isso.' },
            { text: 'Sim: está num arquivo digital', why: 'Estar num arquivo não a torna assinatura digital.' },
            { text: 'Sim, se o PDF for grande', why: 'O tamanho não importa: é só uma imagem.' },
          ],
          answer: 0,
          errorKind: 'confusao',
        },
      },
    },
  ],
  consolidation: [
    {
      kind: 'fix',
      id: 'cons-1',
      prompt: 'A anotação tem um erro. Toque na linha errada.',
      lines: ['Assinar: hash do documento cifrado com a privada do signatário', 'Verificar: com a pública do signatário', 'O certificado X.509 traz a chave privada do titular'],
      bug: 2,
      why: 'O certificado traz a pública; a privada nunca sai do titular.',
      fixed: 'O certificado X.509 traz a chave pública do titular',
      errorKind: 'confusao',
    },
    {
      kind: 'compare',
      id: 'cons-2',
      prompt: 'O relator precisa enviar um parecer que só o destinatário leia e cuja autoria não possa ser negada. Qual solução?',
      scenarios: [
        { title: 'Solução A', body: 'Apenas assinar digitalmente com a chave privada do relator.' },
        { title: 'Solução B', body: 'Assinar com a privada do relator e também cifrar para o destinatário.' },
      ],
      answer: 1,
      why: 'A assinatura sozinha não dá sigilo: o documento continua legível. Para sigilo e autoria, faz-se as duas coisas.',
      errorKind: 'conceito',
    },
    {
      kind: 'order',
      id: 'cons-3',
      prompt: 'Ordene a validação da cadeia pelo navegador.',
      items: ['Certificado do site', 'Certificado da AC intermediária que o assinou', 'Certificado da AC Raiz confiável'],
      why: 'O navegador sobe a cadeia até chegar a uma raiz em que já confia.',
      errorKind: 'procedimento',
    },
    {
      kind: 'choice',
      id: 'cons-4',
      prompt: 'Situação nova: alguém alterou uma vírgula de um contrato assinado digitalmente. O que acontece na verificação?',
      options: [
        { text: 'Os hashes não batem e a assinatura fica inválida', why: 'Isso: qualquer alteração muda o hash.' },
        { text: 'Nada: uma vírgula não muda a assinatura', why: 'Muda o hash, e a assinatura deixa de valer.' },
        { text: 'A assinatura passa a valer só para o trecho alterado', why: 'Ela vale ou não para o documento inteiro.' },
      ],
      answer: 0,
      errorKind: 'conceito',
    },
  ],
  exam: [
    { kind: 'exam', id: 'prova-1', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.015' },
    { kind: 'exam', id: 'prova-2', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.016' },
    { kind: 'exam', id: 'prova-3', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.017' },
    { kind: 'exam', id: 'prova-4', prompt: 'Questão no estilo da prova', questionId: 'q.seg.01.018' },
  ],
  summary: [
    'Assinar: hash do documento + chave privada do signatário. Verificar: pública do signatário e comparação dos hashes.',
    'Garante integridade, autenticidade e não repúdio. Não garante confidencialidade nem disponibilidade.',
    'Certificado digital: vincula chave pública a identidade, assinado por uma AC. Formato X.509.',
    'O certificado NÃO contém a chave privada.',
    'ICP: AC Raiz (autoassinada, confiada previamente), ACs intermediárias, ARs (identificação). Cadeia até a raiz.',
    'Revogação: LCR (lista) e OCSP (consulta pontual).',
    'ICP-Brasil: MP 2.200-2/2001, AC Raiz é o ITI. Assinatura digitalizada é só imagem.',
  ],
};
