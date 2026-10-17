import type { EssayPrompt } from '@/content/types';

// Estudos de caso AUTORAIS para treino. Não reproduzem provas da FCC.
// Critérios e pontuações são PEDAGÓGICOS (orientam a autoavaliação); a banca define a
// própria grade de correção, que só é divulgada na vista de prova (edital, item 11.20).

export const estudosDeCaso: EssayPrompt[] = [
  {
    id: 'ec.seg.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.seguranca.criptografia', 'ti.seguranca.principios'],
    title: 'O protocolo eletrônico de prestações de contas',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `Um Tribunal de Contas vai substituir a entrega presencial de prestações de contas por um portal na internet. Gestores municipais farão o envio de arquivos PDF com balancetes e relatórios. A área técnica levantou as seguintes exigências:

1. ninguém além do Tribunal pode ler os documentos durante o envio;
2. o Tribunal precisa detectar qualquer alteração feita no documento depois de assinado;
3. o gestor não pode, depois, negar que enviou e assinou o documento;
4. o gestor precisa receber um comprovante que permita provar, mais tarde, qual arquivo exatamente foi entregue;
5. as senhas de acesso ao portal não podem ser recuperadas em caso de vazamento do banco de dados.`,
    command: `Como técnico de TI do Tribunal, proponha uma solução que atenda às cinco exigências. Para cada uma, indique o mecanismo criptográfico ou a tecnologia adequada e explique **por que** ele atende à exigência. Aponte também um erro comum de implementação que deve ser evitado.`,
    criteria: [
      { id: 'c1', text: 'Exigência 1: propõe TLS (HTTPS, versão 1.2 ou 1.3) e explica que cifra o canal, garantindo confidencialidade em trânsito.', points: 20 },
      { id: 'c2', text: 'Exigências 2 e 3: propõe assinatura digital com certificado (ICP-Brasil) e explica que ela garante integridade, autenticidade e não repúdio porque só o gestor detém a chave privada.', points: 25 },
      { id: 'c3', text: 'Exigência 4: propõe recibo com o hash (SHA-256) do arquivo recebido, de preferência com data e hora, e explica que qualquer alteração muda o resumo.', points: 20 },
      { id: 'c4', text: 'Exigência 5: propõe armazenar senhas com função própria (Argon2id, scrypt, bcrypt ou PBKDF2) e sal único, e explica por que hash simples ou cifragem reversível são inadequados.', points: 20 },
      { id: 'c5', text: 'Aponta um erro de implementação concreto (ex.: aceitar TLS 1.0, usar MD5/SHA-1, guardar a chave junto aos dados, confundir assinatura com confidencialidade).', points: 5 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia técnica correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `Para proteger o envio (exigência 1), o portal deve aceitar apenas HTTPS com TLS 1.2 ou 1.3. O TLS combina troca de chaves assimétrica, autenticação do servidor por certificado e cifragem simétrica do tráfego, de modo que terceiros não conseguem ler os arquivos em trânsito.

As exigências 2 e 3 são atendidas pela assinatura digital do PDF com certificado ICP-Brasil do gestor. O sistema calcula o hash do documento e o assina com a chave privada do signatário; o Tribunal verifica com a chave pública contida no certificado. Qualquer alteração invalida a assinatura (integridade), e, como só o gestor possui a chave privada, ele não pode negar a autoria (não repúdio). A MP 2.200-2/2001 confere presunção de veracidade a essas assinaturas.

Para o comprovante (exigência 4), o portal deve emitir recibo contendo o resumo SHA-256 do arquivo recebido, a data e a hora, assinado pelo Tribunal. Como qualquer modificação no arquivo altera o resumo, o gestor pode provar exatamente o que entregou.

Quanto às senhas (exigência 5), elas devem ser guardadas com Argon2id (ou bcrypt, scrypt, PBKDF2) e sal único por usuário. Essas funções são lentas e irreversíveis, o que dificulta ataques de dicionário. Cifrar as senhas seria inadequado, pois quem obtivesse a chave as recuperaria.

Erro comum a evitar: usar MD5 ou SHA-1 para o recibo ou para senhas, algoritmos já quebrados ou rápidos demais. Também é erro supor que a assinatura digital esconde o conteúdo; o sigilo vem do TLS.`,
    commentary: `A resposta-modelo segue a ordem das exigências, o que facilita a correção por grade. Cada mecanismo vem acompanhado da justificativa ("porque..."), parte que costuma separar respostas medianas de boas. Note que o limite de linhas obriga a escolher: o texto não explica o handshake do TLS em detalhe, porque o enunciado não pede.`,
  },
  {
    id: 'ec.ia.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.ia.generativa', 'ti.ia-eng.agentes', 'ti.ia-eng.qualidade'],
    title: 'O assistente das resoluções e o agente de código',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `A presidência de um Tribunal de Contas pediu à área de TI duas iniciativas com inteligência artificial:

**A.** Um assistente interno que responda a perguntas dos servidores sobre as resoluções do próprio Tribunal, que são alteradas com frequência. As respostas devem indicar a resolução e o artigo de onde a informação foi tirada.

**B.** O uso de um agente de codificação em terminal (CLI) pela equipe de desenvolvimento, que poderá ler o repositório, editar arquivos e executar comandos para manter os sistemas de fiscalização.

Uma servidora alertou que já viu assistentes de IA "inventando artigos de lei" e perguntou se o agente poderia apagar arquivos ou expor dados de jurisdicionados.`,
    command: `Proponha a arquitetura do assistente da iniciativa A, explicando as etapas principais e por que ela é adequada a normas que mudam com frequência. Em seguida, indique **três** medidas para reduzir respostas inventadas e **três** controles para o uso seguro do agente da iniciativa B, considerando a LGPD.`,
    criteria: [
      { id: 'c1', text: 'Propõe RAG e descreve as etapas: divisão em trechos, embeddings, banco vetorial, busca por similaridade e inserção dos trechos no prompt antes da geração.', points: 25 },
      { id: 'c2', text: 'Justifica o RAG frente ao ajuste fino: atualização pela base indexada, sem retreino, e possibilidade de citar a fonte.', points: 15 },
      { id: 'c3', text: 'Três medidas contra alucinação (ex.: responder só com base nos trechos, exigir citação de resolução e artigo, permitir "não encontrado", busca híbrida para números de normas, avaliação periódica com perguntas de referência).', points: 20 },
      { id: 'c4', text: 'Três controles para o agente (ex.: menor privilégio, confirmação humana para ações destrutivas, ambiente isolado, sem acesso a segredos e dados reais, revisão de código e testes obrigatórios, hooks).', points: 20 },
      { id: 'c5', text: 'Relaciona privacidade à LGPD e à política institucional de IA (RA nº 24/2024): não enviar dados pessoais a ferramentas não autorizadas; usar dados fictícios ou anonimizados.', points: 10 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia técnica correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `Para a iniciativa A, a arquitetura indicada é a geração aumentada por recuperação (RAG). As resoluções são divididas em trechos, preferencialmente por artigo, convertidas em embeddings e armazenadas em um banco vetorial (por exemplo, PostgreSQL com pgvector), com metadados de número, data e vigência. A cada pergunta, o sistema gera o embedding da consulta, recupera os trechos mais semelhantes e os insere no prompt; o modelo então redige a resposta com base neles. Como o conhecimento fica na base, uma nova resolução exige apenas reindexação, sem retreinar o modelo, e cada resposta pode citar a fonte, o que o ajuste fino não oferece.

Para reduzir respostas inventadas: (1) instruir o modelo a responder somente com os trechos recuperados e a declarar quando a informação não for encontrada; (2) exigir a citação da resolução e do artigo em cada afirmação; (3) usar busca híbrida, combinando palavras-chave e vetores, para que números de normas sejam recuperados corretamente, e avaliar periodicamente o sistema com perguntas de referência.

Para o agente da iniciativa B: (1) aplicar o menor privilégio, restringindo-o ao repositório e exigindo confirmação humana para comandos destrutivos ou que publiquem algo; (2) executá-lo em ambiente isolado, sem credenciais de produção nem bases com dados reais; (3) submeter todo código gerado a testes automatizados e revisão humana antes da integração.

Em respeito à LGPD e à Resolução Administrativa nº 24/2024, dados pessoais de jurisdicionados não devem ser enviados a ferramentas não autorizadas; em testes, usam-se dados fictícios ou anonimizados.`,
    commentary: `A resposta responde exatamente na ordem pedida: arquitetura, justificativa, três medidas, três controles e o fecho sobre privacidade. Numerar as medidas ajuda o corretor a encontrar cada item. Um erro frequente seria propor ajuste fino para normas que mudam a cada mês, ou dizer que o RAG "elimina" alucinações.`,
  },
];
