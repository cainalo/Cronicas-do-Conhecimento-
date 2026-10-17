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
  {
    id: 'ec.dev.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.dev.apis', 'ti.dev.auth'],
    title: 'A API de remessa dos municípios',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `Um Tribunal de Contas quer que os sistemas de contabilidade dos municípios enviem, toda noite e sem intervenção humana, os dados de empenhos ao Tribunal. Além disso, servidores municipais usarão um aplicativo de celular do Tribunal para consultar o andamento das remessas, entrando com a conta gov.br.

A equipe precisa definir a interface, o modo de autenticação de cada tipo de acesso e como documentar a API para as empresas que desenvolvem os sistemas municipais.`,
    command: `Proponha: (a) dois endpoints REST para a remessa e a consulta de uma remessa, com método, URI e códigos de status de sucesso e de erro relevantes; (b) o fluxo OAuth 2.0 adequado para os sistemas municipais e o adequado para o aplicativo, justificando; (c) como a API deve validar os tokens JWT recebidos; (d) como documentar a API para os fornecedores.`,
    criteria: [
      { id: 'c1', text: '(a) Endpoints REST coerentes (ex.: POST /remessas → 201 com Location; GET /remessas/{id} → 200), com substantivos na URI e métodos corretos.', points: 20 },
      { id: 'c2', text: '(a) Cita códigos de erro pertinentes e os diferencia (400/422 para dados inválidos, 401 sem credencial, 403 sem permissão, 404 inexistente, 429 excesso).', points: 15 },
      { id: 'c3', text: '(b) Client credentials para os sistemas municipais (sem usuário) e código de autorização com PKCE para o aplicativo, com OpenID Connect para identificar o usuário via gov.br.', points: 25 },
      { id: 'c4', text: '(c) Validação de JWT: assinatura com a chave do emissor, lista fixa de algoritmos (sem "none"), exp, iss, aud e escopos; tokens de vida curta.', points: 20 },
      { id: 'c5', text: '(d) Documentação com OpenAPI (esquemas, códigos, segurança) e Swagger UI ou portal equivalente; versionamento.', points: 10 },
      { id: 'c6', text: 'Texto organizado nas partes pedidas, terminologia correta, dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `(a) A remessa seria recebida por POST /v1/remessas, com os empenhos em JSON no corpo. Em caso de sucesso, a API responde 201 Created, com o cabeçalho Location apontando para /v1/remessas/{id}. A consulta seria GET /v1/remessas/{id}, com 200 OK e a situação do processamento. Erros: 400 ou 422 para dados malformados ou inválidos, 401 quando faltar token válido, 403 quando o município tentar acessar remessa de outro ente, 404 para remessa inexistente e 429 se houver excesso de chamadas.

(b) Os sistemas municipais atuam sem usuário, de madrugada; por isso o fluxo indicado é o client credentials, em que cada sistema se autentica com suas credenciais e recebe um token com escopo restrito, como remessas:envio. O aplicativo tem usuário e é cliente público, que não guarda segredos; deve usar o código de autorização com PKCE, e o login gov.br via OpenID Connect fornece o ID Token que identifica o servidor municipal.

(c) A API deve verificar a assinatura do JWT com a chave pública publicada pelo servidor de autorização, aceitar apenas os algoritmos previstos (rejeitando "none"), conferir exp, iss e aud e checar se o escopo autoriza a operação. Os tokens de acesso devem durar poucos minutos.

(d) A API seria descrita em um documento OpenAPI 3, com esquemas, exemplos, códigos de resposta e o esquema de segurança, publicado com Swagger UI em um portal para os fornecedores, com versão explícita na URI.`,
    commentary: `Responder por letras, na ordem do enunciado, é a forma mais segura de não esquecer um item pedido. Note a justificativa de cada escolha de fluxo: "sem usuário" leva ao client credentials; "cliente público" leva ao PKCE. Um erro frequente seria usar o fluxo de senha no aplicativo ou dizer que o OAuth, sozinho, autentica o usuário.`,
  },
  {
    id: 'ec.dados.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.dados.modelagem', 'ti.dados.sql', 'ti.dados.sgbd'],
    title: 'A base de contratos que perdeu a tarde',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `O sistema de acompanhamento de contratos de um Tribunal de Contas usa PostgreSQL. A tabela principal foi criada assim:

\`Contrato(num_contrato, ano, cnpj_fornecedor, nome_fornecedor, endereco_fornecedor, fiscais, valor)\`

A coluna \`fiscais\` guarda os nomes de todos os servidores fiscais do contrato separados por vírgula, e um mesmo servidor fiscaliza vários contratos.

Na última semana ocorreram dois problemas:

1. ao corrigir o endereço de um fornecedor, só alguns contratos foram atualizados, e os relatórios passaram a mostrar dois endereços diferentes para a mesma empresa;
2. às 15h40, um analista executou por engano \`DELETE FROM contrato WHERE ano = 2025;\` em produção, sem transação explícita. O único backup é um \`pg_dump\` feito toda madrugada, à 1h.`,
    command: `(a) Identifique as falhas de modelagem da tabela, indicando a forma normal violada em cada caso, e proponha o novo modelo de tabelas com chaves primárias e estrangeiras. (b) Explique como o problema 1 se relaciona com a modelagem. (c) Explique o que se perdeu no problema 2 com o backup atual e proponha uma estratégia de backup e recuperação que permitiria voltar ao estado das 15h39, justificando. (d) Indique uma medida preventiva para que um comando como o do problema 2 não cause o mesmo dano.`,
    criteria: [
      { id: 'c1', text: 'Aponta a coluna multivalorada "fiscais" como violação da 1FN e a dependência nome/endereço → cnpj_fornecedor (não chave) como dependência transitiva, violação da 3FN.', points: 25 },
      { id: 'c2', text: 'Propõe Fornecedor(cnpj PK, nome, endereço), Servidor(matrícula PK, nome), Contrato(num, ano, cnpj FK, valor; PK composta ou surrogate) e tabela associativa Fiscalizacao(contrato FK, matrícula FK) para o N:M.', points: 20 },
      { id: 'c3', text: 'Explica que a redundância do endereço causou anomalia de atualização, resolvida com o dado guardado uma única vez.', points: 15 },
      { id: 'c4', text: 'Explica que o pg_dump da 1h perderia as alterações entre 1h e 15h40 e propõe backup físico (pg_basebackup) com arquivamento contínuo do WAL e PITR até 15h39; observa que replicação não substitui backup.', points: 25 },
      { id: 'c5', text: 'Medida preventiva concreta (ex.: menor privilégio sem DELETE em produção para analistas, uso de transação com conferência antes do COMMIT, exigência de revisão de scripts, ambiente de homologação).', points: 5 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `(a) A coluna fiscais é multivalorada, pois guarda vários nomes no mesmo campo, o que viola a 1FN (atributos atômicos). Além disso, nome_fornecedor e endereco_fornecedor dependem de cnpj_fornecedor, que não é chave da tabela: há dependência transitiva, o que viola a 3FN. O modelo proposto é: Fornecedor(cnpj PK, nome, endereco); Servidor(matricula PK, nome); Contrato(id PK, num_contrato, ano, cnpj FK → Fornecedor, valor), com restrição UNIQUE em (num_contrato, ano); e, como um contrato tem vários fiscais e um servidor fiscaliza vários contratos, a tabela associativa Fiscalizacao(id_contrato FK, matricula FK), com chave primária composta pelas duas colunas.

(b) Como o endereço se repetia em cada contrato, a atualização precisava alcançar todas as cópias; ao falhar em algumas, surgiu a anomalia de atualização e a inconsistência. No novo modelo o endereço fica uma única vez em Fornecedor.

(c) O pg_dump é um backup lógico pontual: restaurá-lo devolveria o banco ao estado de 1h, perdendo tudo o que foi incluído ou alterado até 15h40. A estratégia adequada é o backup físico com pg_basebackup combinado ao arquivamento contínuo do WAL, que permite a recuperação a um ponto no tempo (PITR): restaura-se a base e reaplica-se o WAL até 15h39, imediatamente antes do DELETE. Réplicas não resolveriam, porque o DELETE seria replicado.

(d) Analistas não devem ter permissão de DELETE em produção (menor privilégio, GRANT só do necessário); alterações em massa devem passar por script revisado e executado em transação, conferindo o número de linhas afetadas antes do COMMIT.`,
    commentary: `A resposta segue as letras do enunciado e nomeia as formas normais com a causa exata (atributo multivalorado; dependência transitiva). Na letra (c), o ponto central é distinguir backup lógico pontual de PITR e lembrar que replicação não protege de erro lógico, pegadinha frequente.`,
  },
  {
    id: 'ec.infra.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.infra.so', 'ti.infra.perimetro', 'ti.infra.redes'],
    title: 'O servidor de relatórios exposto',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `Um servidor Linux que gera relatórios para o portal de transparência de um Tribunal de Contas fica na mesma rede dos computadores dos servidores e do banco de dados. Uma verificação encontrou:

1. o serviço web roda como **root**;
2. a pasta \`/srv/relatorios\`, que contém arquivos com dados pessoais ainda não anonimizados, tem permissão \`777\`;
3. o acesso remoto é feito por SSH com usuário e senha, a partir de qualquer endereço da internet;
4. o servidor está lento: o comando \`top\` mostra um processo de compactação antigo consumindo 100% de uma CPU e o uso de swap está alto.`,
    command: `Como técnico de TI, proponha correções para cada um dos quatro achados, citando comandos ou configurações quando cabível e justificando cada medida. Proponha também uma reorganização da rede que reduza o impacto de uma eventual invasão desse servidor.`,
    criteria: [
      { id: 'c1', text: 'Achado 1: executar o serviço com usuário de sistema sem privilégios (menor privilégio), explicando que uma invasão herdaria os poderes de root.', points: 15 },
      { id: 'c2', text: 'Achado 2: ajustar dono, grupo e permissões (ex.: chown para o usuário do serviço e chmod 750 ou 640), explicando o significado da notação octal e que 777 permite a qualquer usuário ler e alterar.', points: 20 },
      { id: 'c3', text: 'Achado 3: autenticação por chave no SSH, desabilitar senha e login de root, e restringir a origem por firewall ou VPN.', points: 20 },
      { id: 'c4', text: 'Achado 4: identificar o processo (ps/top) e encerrá-lo (kill com SIGTERM e, se preciso, SIGKILL) ou reduzir prioridade (renice); relacionar swap alto à falta de memória e thrashing.', points: 15 },
      { id: 'c5', text: 'Reorganização: colocar o servidor exposto em DMZ, separado da rede interna e do banco por firewall, liberando apenas as portas necessárias (segmentação).', points: 20 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `1. O serviço deve rodar com um usuário de sistema próprio e sem privilégios (por exemplo, relatorios), aplicando o menor privilégio. Executado como root, qualquer falha no serviço daria ao invasor controle total do servidor.

2. A permissão 777 dá leitura, escrita e execução a dono, grupo e outros, ou seja, qualquer usuário pode ler e alterar dados pessoais. Corrige-se com chown relatorios:relatorios /srv/relatorios e chmod 750 no diretório (e 640 nos arquivos): o dono lê e grava, o grupo lê, os demais nada.

3. No SSH, deve-se usar autenticação por chave pública, desativar a senha (PasswordAuthentication no) e o login direto de root (PermitRootLogin no), e restringir a porta 22 no firewall aos endereços da rede administrativa ou à VPN.

4. Com ps ou top identifica-se o PID do processo de compactação; ele é encerrado com kill (SIGTERM) e, se não responder, kill -9 (SIGKILL). Se for necessário, ele pode ser reagendado com prioridade menor (nice/renice) fora do horário de uso. O swap alto indica falta de memória e risco de thrashing, o que pede avaliar a memória do servidor.

Reorganização: o servidor que atende a internet deve ficar em uma DMZ, separada da rede interna e do banco por firewall. Só as portas necessárias seriam liberadas (443 da internet para a DMZ; a porta do banco apenas a partir do servidor de relatórios). Assim, uma invasão ficaria contida na DMZ.`,
    commentary: `Responder por item, na mesma numeração do enunciado, garante que nada fique sem resposta. Os comandos aparecem com o motivo de cada um, e o fecho de rede usa o conceito de DMZ e segmentação, que é o que o enunciado pede ao falar em "reduzir o impacto".`,
  },
  {
    id: 'ec.devops.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.devops.cicd', 'ti.devops.git', 'ti.devops.observabilidade'],
    title: 'A sexta-feira das publicações manuais',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `A equipe que mantém o sistema de processos eletrônicos de um Tribunal de Contas trabalha assim: cada desenvolvedor passa semanas em seu próprio branch; uma vez por mês, numa sexta-feira à noite, um técnico junta os branches, compila o sistema em sua máquina e copia os arquivos para o servidor de produção. Não há testes automatizados. Na última publicação, o sistema ficou fora do ar por quatro horas, e a equipe só soube do problema quando usuários reclamaram na segunda-feira. Ninguém conseguiu dizer qual alteração causou a falha.`,
    command: `Proponha um novo processo de entrega para essa equipe abordando: (a) estratégia de branching e revisão de código; (b) um pipeline de integração e entrega contínuas, descrevendo suas etapas e explicando a diferença entre entrega contínua e implantação contínua; (c) uma estratégia de implantação que reduza o risco em produção; (d) como a equipe deveria detectar e diagnosticar falhas antes dos usuários, citando os sinais de observabilidade.`,
    criteria: [
      { id: 'c1', text: 'Propõe integração frequente (trunk-based com branches curtos ou fluxo com PR/MR pequenos), proteção de branch, revisão por pull/merge request e pipeline obrigatório antes do merge.', points: 20 },
      { id: 'c2', text: 'Descreve etapas do pipeline (build, testes unitários, análise estática/segurança, empacotamento, implantação em homologação, testes, produção) e o princípio de construir o artefato uma vez.', points: 20 },
      { id: 'c3', text: 'Diferencia entrega contínua (pronta para produção, publicação com decisão manual) de implantação contínua (automática).', points: 15 },
      { id: 'c4', text: 'Propõe estratégia de baixo risco (blue-green, canary ou feature flags) com reversão rápida.', points: 15 },
      { id: 'c5', text: 'Observabilidade: métricas, logs estruturados e traces correlacionados; alertas por sintomas (erros, latência) e metas (SLO), com rastreio da versão implantada.', points: 20 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `(a) Os branches de semanas devem dar lugar à integração frequente: trunk-based development, com branches de poucas horas ou dias e funcionalidades incompletas atrás de feature flags. Toda mudança entra por pull/merge request pequeno, revisado por outro desenvolvedor, com a main protegida contra push direto e o merge condicionado ao pipeline aprovado. Assim cada mudança é pequena e rastreável.

(b) A cada push, o pipeline (por exemplo, no GitHub Actions ou no GitLab CI) faz o build, roda testes unitários e análise estática e de dependências vulneráveis, gera o artefato (imagem de contêiner) uma única vez, implanta em homologação, executa testes de integração e aceitação e deixa a versão pronta para produção. Na entrega contínua, a publicação em produção é uma decisão manual; na implantação contínua, ela ocorre automaticamente quando o pipeline passa.

(c) Em produção, uma estratégia blue-green manteria a versão anterior pronta para retorno imediato; alternativamente, uma implantação canary exporia a nova versão a uma pequena parte dos usuários antes de ampliá-la.

(d) A equipe deve instrumentar o sistema para emitir métricas (taxa de erros, latência, uso de recursos), logs estruturados e traces distribuídos correlacionados por um identificador da requisição, por exemplo com OpenTelemetry. Alertas devem disparar por sintomas que afetam o usuário, como erros e latência acima do SLO, e cada implantação deve ser registrada com sua versão, permitindo relacionar uma falha à mudança que a causou.`,
    commentary: `A resposta segue as letras do enunciado e usa o vocabulário cobrado (trunk-based, pull request, pipeline, entrega × implantação contínua, canary, SLO). O ponto que mais diferencia é explicar como cada prática resolve um sintoma do cenário: mudanças grandes, ausência de testes, falha descoberta pelos usuários e falta de rastreabilidade.`,
  },
  {
    id: 'ec.gov.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.governanca.contratacoes', 'ti.governanca.itil', 'ti.legislacao.contratacoes'],
    title: 'A contratação da central de serviços',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `Um Tribunal de Contas pretende contratar uma empresa para prestar atendimento de primeiro e segundo nível aos usuários de TI (central de serviços), por 30 meses. A minuta preparada pela área demandante prevê pagamento mensal fixo por quantidade de atendentes alocados, não define indicadores e não menciona sigilo das informações acessadas pelos atendentes. Um dos conselheiros perguntou como o Tribunal saberia se o serviço está bom e quem seria responsável por descobrir a causa de falhas que se repetem.`,
    command: `Analise a minuta à luz das boas práticas de contratação de soluções de TIC sob a Lei nº 14.133/2021 e do ITIL 4. Aborde: (a) os documentos de planejamento que devem preceder a contratação e o papel de cada um; (b) o modelo de remuneração e os indicadores que deveriam constar do termo de referência; (c) os requisitos de segurança da informação que faltam; (d) a resposta à pergunta do conselheiro, usando as práticas do ITIL 4.`,
    criteria: [
      { id: 'c1', text: 'Cita o Estudo Técnico Preliminar (problema, alternativas, justificativa da solução) e o Termo de Referência (objeto, forma de medição, obrigações), além da análise de riscos.', points: 20 },
      { id: 'c2', text: 'Critica o pagamento por posto e propõe remuneração vinculada a resultados, com níveis mínimos de serviço (ANS) e indicadores mensuráveis (ex.: tempo de atendimento e de solução, taxa de solução no primeiro contato, satisfação), com glosas por descumprimento.', points: 25 },
      { id: 'c3', text: 'Requisitos de segurança: termo de compromisso de sigilo e termos de ciência, acesso com menor privilégio e contas nominais, registro e auditoria, conformidade com a LGPD e devolução/eliminação de dados ao fim.', points: 20 },
      { id: 'c4', text: 'ITIL: diferencia gerenciamento de incidentes (restaurar o serviço) de gerenciamento de problemas (causa raiz, erro conhecido) e atribui a medição ao gerenciamento de nível de serviço.', points: 25 },
      { id: 'c5', text: 'Texto organizado, objetivo, com terminologia correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `(a) A contratação deve começar pelo Estudo Técnico Preliminar, que descreve a necessidade, compara as alternativas de mercado e justifica a solução escolhida, acompanhado da análise de riscos. A partir dele elabora-se o Termo de Referência, que define o objeto, a forma de medição, os níveis de serviço e as obrigações das partes. Sem esses documentos, a minuta não demonstra que o modelo escolhido é o mais vantajoso.

(b) O pagamento fixo por atendente alocado remunera esforço, não resultado. O modelo adequado vincula o pagamento a entregas mensuráveis, com acordo de nível de serviço no termo de referência: tempo para o primeiro atendimento, tempo de solução por prioridade, percentual resolvido no primeiro contato e satisfação dos usuários, com glosas proporcionais quando as metas não forem atingidas.

(c) Faltam requisitos de segurança: termo de compromisso de manutenção de sigilo assinado pela empresa e termos de ciência pelos atendentes; acesso com contas nominais e menor privilégio; registro e auditoria das ações; cláusulas de tratamento de dados pessoais conforme a LGPD, com a contratada como operadora; e, ao fim, revogação de acessos e devolução ou eliminação dos dados.

(d) Pelo ITIL 4, a qualidade é acompanhada pelo gerenciamento de nível de serviço, que mede os indicadores acordados. O atendimento cotidiano é gerenciamento de incidentes, cujo objetivo é restaurar o serviço rapidamente. As falhas repetidas exigem o gerenciamento de problemas, que investiga a causa raiz, registra erros conhecidos e soluções de contorno e propõe a correção definitiva. O contrato deve atribuir claramente quem executa cada prática.`,
    commentary: `O enunciado mistura legislação, contratação e ITIL; a resposta separa cada parte por letra. O ponto de maior peso é o modelo de remuneração: trocar "postos" por resultados com ANS e glosas. Na letra (d), a distinção incidente × problema é a pegadinha clássica.`,
  },
  {
    id: 'ec.es.01',
    contestId: 'tce-go-2026-tecnico-ti',
    topicIds: ['ti.engsoft.requisitos', 'ti.engsoft.arquitetura', 'ti.engsoft.qualidade'],
    title: 'O sistema de denúncias da ouvidoria',
    origin: 'autoral',
    review: 'nao-revisado',
    lineLimit: 30,
    scenario: `A ouvidoria de um Tribunal de Contas quer um novo sistema para receber denúncias de cidadãos sobre irregularidades em contratos públicos. O pedido inicial diz apenas: "o sistema deve ser rápido, seguro e fácil de usar; o cidadão envia a denúncia com anexos e acompanha o andamento; a ouvidoria classifica e encaminha para a unidade técnica". A equipe também discute se o sistema deve ser construído como microsserviços, porque "é o padrão moderno". O sistema antigo, que será substituído, quebrava a cada correção feita.`,
    command: `(a) Reescreva o pedido em requisitos: apresente dois requisitos funcionais e três não funcionais mensuráveis. (b) Escreva uma história de usuário do cidadão com dois critérios de aceite no formato Dado/Quando/Então. (c) Avalie a proposta de usar microsserviços para esse sistema, considerando vantagens e custos. (d) Proponha uma estratégia de testes que evite que correções quebrem o que já funcionava.`,
    criteria: [
      { id: 'c1', text: 'Dois requisitos funcionais corretos (ex.: registrar denúncia com anexos, consultar andamento por protocolo, classificar e encaminhar).', points: 15 },
      { id: 'c2', text: 'Três requisitos não funcionais mensuráveis (ex.: tempo de resposta em percentil, disponibilidade em %, criptografia/LGPD, acessibilidade por norma), não apenas adjetivos.', points: 20 },
      { id: 'c3', text: 'História no formato Como/quero/para e dois critérios de aceite Dado/Quando/Então testáveis.', points: 20 },
      { id: 'c4', text: 'Avalia microsserviços com equilíbrio: independência e escala versus complexidade distribuída; conclui por solução proporcional (ex.: monólito modular com baixo acoplamento) e justifica.', points: 20 },
      { id: 'c5', text: 'Estratégia de testes: testes unitários e de integração automatizados, regressão a cada mudança no pipeline, pirâmide de testes, revisão de código; possível refatoração com rede de testes.', points: 15 },
      { id: 'c6', text: 'Texto organizado, objetivo, com terminologia correta e dentro do limite de linhas.', points: 10 },
    ],
    modelAnswer: `(a) Requisitos funcionais: RF1, o sistema deve permitir ao cidadão registrar denúncia com descrição e até cinco anexos em PDF ou imagem, gerando número de protocolo; RF2, o sistema deve permitir consultar o andamento da denúncia pelo protocolo. Requisitos não funcionais: RNF1, 95% das consultas devem responder em até 2 segundos; RNF2, disponibilidade mínima de 99,5% ao mês; RNF3, dados pessoais e anexos cifrados em trânsito (TLS) e em repouso, com acesso registrado, em conformidade com a LGPD.

(b) Como cidadão, quero acompanhar minha denúncia pelo número de protocolo, para saber se ela foi analisada. Critério 1: dado que registrei uma denúncia com o protocolo 2026-0001, quando eu consultar esse protocolo, então o sistema mostra a situação atual e a data da última movimentação. Critério 2: dado um protocolo inexistente, quando eu consultá-lo, então o sistema informa que não o encontrou, sem revelar dados de outras denúncias.

(c) Microsserviços trazem implantação e escala independentes, mas também rede, consistência eventual, observabilidade e operação mais complexas. Para um sistema de escopo limitado e equipe pequena, esse custo não se justifica. É mais adequado um monólito modular, com módulos coesos e pouco acoplados (registro, acompanhamento, triagem), que pode ser dividido no futuro se houver necessidade real.

(d) Para que correções não quebrem o que funcionava, a equipe deve criar testes automatizados unitários e de integração, seguindo a pirâmide de testes, e executá-los como testes de regressão em todo pull request no pipeline de integração contínua. A revisão de código e a refatoração apoiada nesses testes reduzem a dívida técnica herdada.`,
    commentary: `O que diferencia a resposta é transformar adjetivos ("rápido", "seguro") em metas mensuráveis e escrever critérios de aceite testáveis. Na letra (c), a banca costuma valorizar a análise de custo e benefício; responder apenas "microsserviços são melhores" perde pontos.`,
  },
];