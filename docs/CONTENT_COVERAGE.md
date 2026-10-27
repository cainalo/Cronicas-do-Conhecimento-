# Matriz de cobertura (base: Anexo II oficial, cargo B02)

Cobertura atual: **68 de 68 tópicos** com material (14 disciplinas/materiais, 33 capítulos, 37 lições, 407 questões autorais; todas as 112 seções têm explicação simples "do zero" em `src/content/game/simple/` e `grimoires/primeiros/simple.ts`, 8 estudos de caso (segurança, IA, desenvolvimento, banco de dados, infraestrutura, DevOps, governança/contratações, engenharia de software), flashcards dos glossários). Cobertura **não é integral em profundidade**: Legislação de TI (normas do TCE-GO e LC 205) e Legislação Institucional (normas estaduais) estão só em panorama verificável; EBIA/PBIA e o Manual de Redação foram conferidos em fontes secundárias. Todas as questões são autorais e não revisadas por especialista. Não declarar cobertura integral enquanto houver lacunas.
Os IDs de tópico estão em `src/content/contests/tce-go-2026/contest.ts`; a tela **Progresso → Edital e cobertura** calcula esta matriz automaticamente.

| Disciplina (questões) | Tópicos | Com material | Material |
|---|---|---|---|
| Introdutório (apoio, sem peso próprio) | — | — | Primeiros Passos em TI: cap.prim.01 (computador, hardware e software, SO e arquivos, programação) com `ti.infra.so`, `ti.dev.algoritmos`; cap.prim.02 (redes e internet, dados e bancos, segurança básica) com `ti.infra.redes`, `ti.dados.modelagem`, `ti.seguranca.principios`; lic.prim.01/02; q.prim.01.001–008, q.prim.02.001–008 (fáceis). Só conceitos básicos consolidados |
| Língua Portuguesa (10) | 4 | **4** (completa) | Língua Portuguesa — leitura, gramática e redação: cap. 1 (`cg.portugues.interpretacao`, `.gramatica`: interpretação, figuras, discursos, intertextualidade, Acordo de 1990, hífen, crase, pontuação, pronomes, colocação, morfologia e formação de palavras); cap. 2 (`.sintaxe`, `.redacao`: concordância, regência, vozes, correlação, flexões, período, conectivos, reescrita, Redação Oficial pelo Manual da Presidência 3ª ed.); lic.port.01/02; q.port.01.001–012, q.port.02.001–013. **Fonte secundária**: detalhes do Manual (PDF oficial bloqueado), com notas no texto |
| Matemática e Raciocínio Lógico (10) | 3 | **3** (completa) | Matemática e Raciocínio Lógico: cap. 1 (`cg.matematica.aritmetica`, `.proporcao`: inteiros, racionais, potências, frações, divisibilidade, MMC/MDC, razões, proporções, divisão proporcional, regra de três simples e composta, porcentagem, acréscimos e descontos sucessivos); cap. 2 (`.logica`: tabelas de associação, verdade/mentira, ordenação, sequências, raciocínio verbal, calendários, relógios, orientação espacial); lic.mat.01/02; q.mat.01.001–012, q.mat.02.001–012, cálculos e deduções conferidos por script |
| Legislação Institucional (5) | 8 | **8** (cap. 2 só panorama) | Legislação Institucional: cap. 1 CF/88 (`cg.legislacao.cf`: arts. 37 a 41, 70 a 75); cap. 2 (`ce-go`, `lei-organica`, `regimento`, `pccr`, `regime-juridico`, `etica`, `resolucoes`): **apenas o que foi confirmado em fontes secundárias**, com notas em cada seção; portais oficiais bloqueados. Pendências listadas em OPEN_QUESTIONS (pedir PDFs ao usuário); q.inst.01.001–012, q.inst.02.001–010 |
| Engenharia de Software (4) | 5 | **5** (completa) | Engenharia de Software: cap. 1 (`ti.engsoft.ciclo`, `.requisitos`: preditivo/iterativo/incremental/ágil, espiral, V, Kanban, Lean, XP/TDD; RF/RNF, engenharia de requisitos, INVEST, Dado/Quando/Então, casos de uso include/extend); cap. 2 (`.arquitetura`, `.modelagem`, `.qualidade`: camadas, SOA, microsserviços, eventos, SOLID/DRY/KISS/YAGNI, coesão/acoplamento; UML 2.5, BPMN 2.0, 23 padrões GoF; ISO/IEC 25010, tipos de teste, revisão, refatoração, dívida técnica); lições lic.es.01/02; q.es.01.001–010, q.es.02.001–012 |
| Desenvolvimento de Sistemas (5) | 5 | **5** (completa) | Desenvolvimento de Sistemas: caps. 1 APIs e 2 Identidade; cap. 3 (`ti.dev.algoritmos`: lógica, Big-O, estruturas, buscas e ordenações, POO, funcional); cap. 4 (`ti.dev.linguagens`, `ti.dev.git-pacotes`: Java, JS/Node, React, Python, HTML5/CSS3, TypeScript, dependências, SemVer, empacotamento e publicação); lic.dev.01–04; q.dev.01–04; estudo de caso ec.dev.01 |
| Eng. Software Assistida por IA e Sistemas Agentivos (4) | 5 | 5 | IA aplicada e sistemas agentivos: cap. 1 (`ti.ia-eng.llm`, `ti.ia-eng.contexto`) e cap. 2 (`ti.ia-eng.agentes`, `ti.ia-eng.mcp`, `ti.ia-eng.qualidade`); lições lic.ia.01.a/b, lic.ia.02.a/b; questões q.ia.01.001–020, q.ia.02.001–020 |
| DevOps, Plataforma e Entrega (4) | 5 | **5** (completa) | DevOps, Plataforma e Entrega: cap. 1 (`ti.devops.git`, `.cicd`: comandos, revert × rebase, Git Flow, trunk-based, PR/MR e proteção de branch; CI, entrega × implantação contínua, pipeline, ambientes, blue-green/canary/feature flags, GitHub Actions, GitLab CI, Jenkins); cap. 2 (`.iac`, `.containers`, `.observabilidade`: declarativo × imperativo, idempotência, deriva; Docker, Compose, Kubernetes; métricas/logs/traces, OpenTelemetry, sinais dourados, SLI/SLO/SLA, alertas, DORA); lições lic.devops.01/02; q.devops.01.001–012, q.devops.02.001–010 |
| Banco de Dados (4) | 5 | **5** (completa) | O Arquivo Profundo: cap. 1 Modelagem, SQL e Transações (`ti.dados.modelagem`, `ti.dados.sql`: MER, chaves, 1FN–FNBC, desnormalização, DDL/DML/DCL, junções, NULL, álgebra relacional, views/procedures/triggers, ACID, isolamento, índices/EXPLAIN); cap. 2 SGBDs, NoSQL e Governança (`ti.dados.sgbd`, `ti.dados.nosql`, `ti.dados.governanca`: PostgreSQL, Oracle, MongoDB, Redis, grafos, CAP/BASE, replicação, backup/PITR, mascaramento, LGPD); lições lic.dados.01/02; q.dados.01.001–012, q.dados.02.001–010. Bancos vetoriais também no cap. 1 de IA |
| IA, Ciência de Dados e Automação (5) | 4 | **4** (completa) | IA aplicada e sistemas agentivos: cap. 1 (`ti.ia.generativa`); cap. 3 (`ti.ia.fundamentos`: supervisionado, não supervisionado, reforço, overfitting, redes neurais, CNN/RNN/transformer, PLN, RPA); cap. 4 (`ti.ia.etica`, `ti.ia.dados`: ética, XAI, LGPD art. 20, EBIA e PBIA em **fonte secundária**, CRISP-DM, estatística, métricas, Big Data); lic.ia.03/04; q.ia.03–04 |
| Segurança da Informação (4) | 8 | **8** (completa) | Cap. 2 Defesa em Profundidade (cap.seg.02): princípios/riscos/LAI, acesso/IAM, Zero Trust (NIST SP 800-207), OWASP Top 10:2025 + DevSecOps/APIs/containers, ameaças/IDS/IPS/pentest, backup/continuidade, ISO 27000 (27001:2022); lições lic.seg.02.a/b; q.seg.02.001–020. Cap. 1: | `ti.seguranca.criptografia` → Códice das Sete Chaves, cap. 1; lições lic.seg.01.a/b; questões q.seg.01.001–020 (autorais, não revisadas) |
| SO, Redes e Nuvem (5) | 5 | **5** (completa) | Atlas: caps. 1 Redes e 2 Nuvem; cap. 3 (`ti.infra.so`, `ti.infra.diretorio`: processos, memória, arquivos e permissões, shell, PowerShell, cron, AD, GPO, Kerberos, LDAP, hipervisores, containers por namespaces/cgroups); lic.infra.01–03; q.infra.01–03 |
| Governança de TI (4) | 5 | **5** (completa) | As Atas do Conselho: cap. 1 (`ti.governanca.estrategia`, `.itil`, `.projetos`: alinhamento/PDTI, ISO/IEC 38500:2024, COBIT 2019, ITIL 4, PMBOK 8, Scrum/Kanban); cap. 2 (`ti.governanca.contratacoes`, `.governo-digital`: Lei 14.133 aplicada a TIC, IN SGD/ME 94/2022, Lei 14.129, ENGD 2024–2027); lições lic.gov.01/02; q.gov.01.001–012, q.gov.02.001–010. **Fontes secundárias**: princípios da ISO 38500:2024, estrutura do PMBOK 8 e objetivos da ENGD conferidos por busca (normas pagas; Planalto/Câmara bloqueados no contêiner) |
| Legislação Aplicada à TI (4) | 5 | 5 (**2 parciais**) | O Livro das Leis do Reino: cap. 1 (`ti.legislacao.lgpd`, `.marco-civil`: conceitos, princípios, by design/default, anonimização × pseudonimização, incidentes, sanções; neutralidade, registros 1 ano/6 meses, ordem judicial); cap. 2 (`ti.legislacao.contratacoes`: segurança no ciclo da contratação, termos de sigilo/ciência, ICP-Brasil, Lei 14.063; `ti.legislacao.goias` e `ti.legislacao.tce`: **apenas panorama verificável**, textos oficiais não acessados, aguardando PDFs do usuário); lições lic.leg.01/02; q.leg.01.001–012, q.leg.02.001–010 |
| Língua Inglesa (2) | 1 | **1** (completa) | O Códice dos Estrangeiros: estratégias de leitura, conectivos, referência, modais, voz passiva; vocabulário de APIs, release notes, erros, segurança e nuvem; textos autorais em inglês; lic.ingles.01/02; q.ingles.01–02 |

Seções do cap. 1: fundamentos e objetivos · simétrica (DES/3DES/AES, ECB/CBC/CTR/GCM) · assimétrica (RSA, DH, ECC, DSA) · hash/MAC/senhas · assinatura digital, certificados, ICP-Brasil · híbrida e TLS 1.3. O texto oficial do tópico ("Criptografia simétrica e assimétrica; infraestrutura de chaves públicas; certificados e assinatura digital") está integralmente coberto.

## Prioridade sugerida (peso 2 e volume)
IA total = 9 questões (Eng. Software Assistida por IA 4 + IA/Ciência de Dados 5) → Desenvolvimento 5 → SO/Redes/Nuvem 5 → Segurança (restante) → Banco de Dados, DevOps, Governança, Legislação de TI, Eng. de Software (4 cada) → Gerais.

## Microaulas (formato aprovado em 24/10/2026)
Uma ideia por etapa, checagem imediata, recuperação com outro exemplo, prática final variada e questão no estilo da prova. Telas sem rolagem vertical. Todas autorais, `nao-revisado`.

| Microaula | Trecho | Etapas | Questões de prova usadas |
|---|---|---|---|
| Processos, memória e serviços | cap.infra.03 / processos | 15 | q.infra.03.001, q.infra.03.003 |
| Sistemas de arquivos e permissões | cap.infra.03 / arquivos | 15 | q.infra.03.005, q.infra.03.006 |
| Shell Linux, PowerShell e scripts | cap.infra.03 / shell | 16 | q.infra.03.008, q.infra.03.009 |
| Active Directory, LDAP, virtualização e containers | cap.infra.03 / diretorio | 16 | q.infra.03.012, q.infra.03.013 |

| Arquitetura TCP/IP | cap.infra.01 / tcpip | 10 | q.infra.01.002, q.infra.01.003 |
| Endereçamento IPv4 e IPv6 | cap.infra.01 / enderecos | 10 | q.infra.01.004, q.infra.01.006 |
| DNS, DHCP e protocolos de aplicação | cap.infra.01 / servicos | 12 | q.infra.01.009, q.infra.01.010 |
| Firewalls, VPN, proxies e balanceamento | cap.infra.01 / perimetro | 9 | q.infra.01.011, q.infra.01.012 |

| Modelos de nuvem | cap.infra.02 / modelos | 10 | q.infra.02.003, q.infra.02.004 |
| Escala, disponibilidade e serverless | cap.infra.02 / escala | 10 | q.infra.02.007, q.infra.02.008 |

Grimório de Infraestrutura inteiro em microaulas: cap.infra.01 (Redes, 41 etapas), cap.infra.02 (Nuvem, 20 etapas) e cap.infra.03 (Sistemas Operacionais, 62 etapas). Total: 10 microaulas, 123 etapas.

| Fundamentos e objetivos da criptografia | cap.seg.01 / fundamentos | 10 | q.seg.01.001, q.seg.01.002 |
| Criptografia simétrica | cap.seg.01 / simetrica | 10 | q.seg.01.003, q.seg.01.004, q.seg.01.005, q.seg.01.006 |
| Criptografia assimétrica | cap.seg.01 / assimetrica | 9 | q.seg.01.007, q.seg.01.008, q.seg.01.009, q.seg.01.010 |
| Funções hash, MAC e senhas | cap.seg.01 / hash | 8 | q.seg.01.011, q.seg.01.012, q.seg.01.013, q.seg.01.014 |
| Assinatura digital e certificados | cap.seg.01 / assinatura | 8 | q.seg.01.015, q.seg.01.016, q.seg.01.017, q.seg.01.018 |
| Criptografia híbrida e TLS | cap.seg.01 / hibrida | 6 | q.seg.01.019, q.seg.01.020 |

Capítulo de Criptografia (cap.seg.01) inteiro em microaulas: 6 aulas, 51 etapas, 20 questões autorais na prova das aulas. Revisão editorial humana pendente.

| Princípios, riscos e classificação | cap.seg.02 / principios | 8 | q.seg.02.001, q.seg.02.002, q.seg.02.003 |
| Controle de acesso, IAM e Zero Trust | cap.seg.02 / acesso | 8 | q.seg.02.004, q.seg.02.005, q.seg.02.006, q.seg.02.007 |
| OWASP Top 10:2025 e DevSecOps | cap.seg.02 / owasp | 9 | q.seg.02.008 a q.seg.02.012 |
| Ameaças, detecção e testes | cap.seg.02 / ameacas | 8 | q.seg.02.013 a q.seg.02.016 |
| Backup e continuidade | cap.seg.02 / continuidade | 6 | q.seg.02.017, q.seg.02.018 |
| Família ISO/IEC 27000 | cap.seg.02 / iso | 6 | q.seg.02.019, q.seg.02.020 |

Grimório de Segurança inteiro em microaulas: cap.seg.01 (Criptografia, 6 aulas, 51 etapas) e cap.seg.02 (Defesa, 6 aulas, 45 etapas). Revisão editorial humana pendente.

## Simulador e Sala dos Professores (25/10/2026)
- Cenário `cen.suporte-lento` (SO: memória, swap, thrashing, sinais, nice). Fonte: microaula `micro.infra.processos`. Não revisado por humano.
- 16 posts de professores fictícios. Assuntos: processos, arquivos, shell, diretório, TCP/IP, endereços, serviços, perímetro, nuvem e fundamentos de criptografia. Todos reescrevem fatos das microaulas. Não revisados por humano.

## Ritmo lento com história e sequência única (25/10/2026, pedido do usuário)
- **Piloto do novo ritmo:** cap.prim.01 / computador virou a série `prim.computador` (4 aulas, 20 etapas).
  - **Aula 1, Como o computador surgiu:** a história, do ábaco ao smartphone.
  - **Aula 2, As quatro tarefas:** entrada, saída, processamento e memória, uma por etapa.
  - **Aula 3, Ligado ou desligado: o bit:** os dois estados, o bit e as combinações.
  - **Aula 4, Do byte ao terabyte:** os degraus de tamanho, o 1.024 e o uso no Tribunal.
  - **Questões e fonte:** prova com q.prim.01.001 e 002. O texto do capítulo (01-o-que-e.md) ganhou a seção "Como o computador surgiu", fonte das aulas.
- **Trecho 2, hardware:** série `prim.hardware` (3 aulas, 11 etapas).
  - **Aulas:** "Da fiação ao programa" (ENIAC, von Neumann e EDVAC em 1945, hardware e software), "As peças por dentro" (processador, RAM, armazenamento do cartão ao pendrive, HD e SSD) e "Sistema e aplicativo".
  - **Questões e fonte:** prova com q.prim.01.003 e 004. O texto 02-hardware-software.md ganhou a parte histórica.
- **Trecho 3, sistema:** série `prim.sistema` (3 aulas, 13 etapas).
  - **Aulas:** "Do operador ao sistema operacional" (operador humano, GM-NAA I/O em 1956, Unix em 1969, MS-DOS, Macintosh e Windows, Linux, iOS e Android), "O gerente da máquina" (as quatro tarefas, com o cartório) e "Arquivos, pastas, extensões e permissões" (caminho, extensões, o golpe do .exe, leitura, escrita e execução).
  - **Questões e fonte:** prova com q.prim.01.005 e 006. O texto 03-sistema-arquivos.md ganhou "Como o sistema operacional surgiu".
- **Trecho 4, programação:** série `prim.programacao` (3 aulas, 14 etapas).
  - **Aulas:** "Da receita à linguagem de programação" (al-Khwarizmi, Ada Lovelace, linguagem de máquina, a mariposa de 1947, Grace Hopper e o A-0, FORTRAN, Python, Java e JavaScript), "Algoritmo e variável" e "Condição e repetição" (se/senão, para cada, enquanto, laço infinito).
  - **Questões e fonte:** prova com q.prim.01.007 e 008. O texto 04-programacao.md ganhou "Como a programação surgiu".
- **cap.prim.02, trecho redes:** série `prim.redes` (3 aulas, 14 etapas).
  - **Aulas:** "Da ARPANET à internet" (ARPANET e o "LO" de 1969, TCP/IP de Cerf e Kahn, DNS de Mockapetris, a Web de Tim Berners-Lee, internet comercial no Brasil em 1995, nuvem em 2006), "Endereço, roteador e pacote" e "Cliente, servidor, DNS e nuvem".
  - **Questões e fonte:** prova com q.prim.02.001 a 003. O texto 01-redes-internet.md ganhou "Como a internet surgiu".
- **cap.prim.02, trecho dados:** série `prim.dados` (3 aulas, 13 etapas).
  - **Aulas:** "Das fichas de papel ao banco relacional" (fichas e arquivos de aço, Hollerith e o censo de 1890, IDS de Bachman, modelo relacional de Codd em 1970, SQL na IBM, Oracle em 1979, MySQL e PostgreSQL), "Dado, informação e o SGBD" e "Tabelas, linhas, colunas e chaves".
  - **Questões e fonte:** prova com q.prim.02.004 e 005. O texto 02-dados-bancos.md ganhou "Como os bancos de dados surgiram".
- **cap.prim.02, trecho seguranca:** série `prim.seguranca` (3 aulas, 13 etapas).
  - **Aulas:** "Da cifra de César ao golpe por e-mail" (cifra de César, Enigma e Bletchley Park, senha no CTSS em 1961, verme de Morris em 1988, phishing nos anos 1990), "Os três pilares: C, I e D" e "Senha, dois fatores, backup e phishing".
  - **Questões e fonte:** prova com q.prim.02.006 a 008. O texto 03-seguranca.md ganhou "Como a segurança da informação surgiu".
- **cap.dados.01 (Modelagem, SQL e transações):** séries `dados.modelagem`, `dados.sql` e `dados.transacoes`, 3 aulas cada.
  - **História:** Codd (1970), formas normais (1971 a 1974), Peter Chen (1976), SEQUEL e System R, norma ANSI e ISO, Jim Gray e a transação, árvore B (1972), sigla ACID (1983), níveis do SQL-92. Seções históricas acrescentadas aos três textos.
  - **Aulas:** MER e mapeamento, chaves e formas normais, desnormalização, categorias de comandos, ordem lógica, WHERE e HAVING, NULL, junções, subconsultas, álgebra, views e triggers, ACID, anomalias, níveis de isolamento e índices.
  - **Questões:** prova com q.dados.01.001 a 012.
- **cap.dev.03 (Lógica, estruturas e paradigmas):** séries `dev.logica`, `dev.estruturas` e `dev.paradigmas`, 3 aulas cada.
  - **História:** Fibonacci (1202), notação O (Bachmann, 1894; Knuth, 1976), Böhm e Jacopini (1966), Dijkstra (1968), Knuth (1968), Euler (1736), merge sort de von Neumann, busca binária de Mauchly, hash de Luhn, pilha de Bauer e Samelson, quick sort de Hoare, AVL, cálculo lambda, Lisp, Simula, Smalltalk, Design Patterns e Java 8. Seções históricas acrescentadas aos três textos.
  - **Questões:** prova com q.dev.03.001 a 012.
- **cap.mat.01, trecho divisores:** série `mat.divisores` (3 aulas, 15 etapas). História de Euclides (Elementos), do crivo de Eratóstenes e de Gauss (1801); múltiplos, divisores, primos, decomposição, quantidade de divisores, critérios de 2 a 11, MMC, MDC, lotes e problemas com resto. Prova com q.mat.01.004 a 006.
- **cap.mat.01, trechos razoes e porcentagem:** séries `mat.razoes` e `mat.porcentagem`, 3 aulas cada. História de Tales, Eudoxo e Euclides, Brahmagupta (628), Fibonacci (1202), imposto do centésimo de Augusto e símbolo % (século XV). Razão, proporção, partes, grandezas diretas e inversas, rateios, regra de três simples e composta; fração, fator, variação, sucessivos, problema reverso e ponto percentual. Prova com q.mat.01.007 a 012. O capítulo de matemática básica está completo.
- **cap.port.01 (Leitura, ortografia, pontuação e morfologia):** séries `port.interpretacao`, `port.ortografia`, `port.pontuacao` e `port.morfologia`, 3 aulas cada.
  - **História:** Aristóteles, Quintiliano, Canção do Exílio e a paródia de Oswald, Vidas Secas; crase (krâsis), reformas de 1911 e 1943, Acordo de 1990 e decretos de 2008 e 2012; Aristófanes de Bizâncio, vírgula (varinha), Aldo Manúcio, Vossa Mercê a você; Dionísio Trácio, Fernão de Oliveira e João de Barros, NGB (1959). Seções históricas acrescentadas aos quatro textos.
  - **Questões:** prova com q.port.01.001 a 012.
- **cap.ia.03 (Fundamentos de IA):** séries `ia.aprendizado`, `ia.redes` e `ia.pln`, 3 aulas cada.
  - **História:** Turing (1950), Dartmouth (1956), Samuel (1959), sistemas especialistas e invernos, AlphaGo (2016); McCulloch e Pitts (1943), Rosenblatt (1958), Minsky e Papert (1969), retropropagação (1986), AlexNet (2012), transformer (2017); Georgetown-IBM (1954), ELIZA (1966), IDF de Spärck Jones (1972), Porter (1980), word2vec (2013).
  - **Questões:** prova com q.ia.03.001 a 012.
- **cap.ia.01 (LLM, prompts, contexto, RAG e vetores):** séries `ia.llm`, `ia.prompts`, `ia.contexto`, `ia.rag`, `ia.vetores` (3 aulas cada) e `ia.resumo` (2 aulas: linha do tempo e quadro-resumo).
- **cap.dev.01 (APIs):** séries `dev.rest`, `dev.formatos`, `dev.graphql` e `dev.openapi` (3 aulas cada), com história do HTTP, do JSON e XML, do polling ao GraphQL e do WSDL ao OpenAPI.
- **cap.dados.02 (SGBDs):** séries `dados.relacionais` (3 aulas: origem do Oracle e do PostgreSQL, PostgreSQL por dentro, Oracle e rotina) e `dados.nosql` (4 aulas: Bigtable, Dynamo e CAP; os quatro modelos; BASE e CAP; replicação, backup e governança).
- **cap.dev.02 (identidade):** séries `dev.identidade` (3 aulas: da senha do CTSS ao SAML e ao IdP; identificação, autenticação, autorização e MFA; sessões, tokens e claims), `dev.oauth` (4 aulas), `dev.oidc` (4 aulas: do OpenID ao JWT; OIDC; JWT por dentro; validação, revogação e armazenamento) e `dev.idresumo` (2 aulas: linha do tempo de APIs e identidade; quadro-resumo e pegadinhas).
- **cap.mat.02 (raciocínio lógico):** séries `mat.logica` (Aristóteles, estoicos, Euler, Venn e Smullyan; associação; ordenação e verdade ou mentira; dedução válida), `mat.sequencias` (Euclides, Fibonacci e Dirichlet; roteiro numérico; letras e ciclos; analogias, intrusos e contagens) e `mat.espaco` (calendários juliano e gregoriano e relógio de Huygens; calendário; relógios; orientação), 4 aulas cada.
- **cap.port.02 (sintaxe e redação oficial):** séries `port.concordancia` (do latim às gramáticas de 1536 e 1540), `port.regencia` (dos casos latinos às preposições), `port.periodo` (NGB de 1959 e a origem de "embora") e `port.redacao` (Manual de 1991 e 2018, Decreto nº 9.758/2019), 4 aulas cada.
- **cap.dev.04 (linguagens e pacotes):** séries `dev.javapy` (Python 1991, Java 1995; plataforma Java; exceções; Python para automação), `dev.jsts` (JavaScript 1995, Node.js 2009, TypeScript 2012; tipos; event loop; Node e TS), `dev.web` (HTML 1991, CSS 1994/1996, React 2013, HTML5 2014; HTML5 e acessibilidade; CSS; React) e `dev.pacotes` (CPAN, Maven, npm, SemVer, left-pad e lockfile; SemVer; package.json e lockfile; pip, Maven e publicação), 4 aulas cada.
- **cap.es.01 (processo de software):** séries `es.ciclo` (da conferência da OTAN de 1968 ao Manifesto Ágil; abordagens; Kanban e Lean; XP e TDD) e `es.requisitos` (casos de uso de Jacobson, UML, INVEST e BDD; funcionais e não funcionais; engenharia de requisitos; histórias e casos de uso), 4 aulas cada.
- **cap.es.02 (arquitetura, modelagem e qualidade):** séries `es.arquitetura` (Dijkstra, Parnas, Liskov, SOLID, microsserviços), `es.modelagem` (Alexander, GoF, UML, BPMN) e `es.qualidade` (ISO 9126 e 25010, dívida técnica, refatoração, pirâmide de testes), 4 aulas cada.
- **cap.devops.01 (Git e CI/CD):** séries `devops.git` (do SCCS ao Git, GitHub e Git Flow; áreas e comandos; branching; PR e segredos) e `devops.cicd` (integração contínua, Hudson/Jenkins, DevOpsDays e Actions; CI e entrega; ambientes e estratégias; ferramentas), 4 aulas cada.
- **cap.devops.02 (plataforma e observabilidade):** séries `devops.iac-containers` (história de IaC/Docker/Kubernetes; estado declarativo, idempotência e deriva; imagens, volumes, Compose e segurança; Pods, Deployments, Services e probes) com 4 aulas, e `devops.observabilidade` (história e OpenTelemetry; sinais; SLI/SLO/SLA e orçamento de erro; alertas, correlação e indicadores de entrega) com 3 aulas. Revisão editorial humana pendente.
- **cap.ia.02 (Agentes de Programação e MCP):** 15 microaulas nas cinco seções (`ia.agentes`, `ia.ciclo`, `ia.mcp`, `ia.skills`, `ia.qualidade`), com abertura, duas etapas, checagens, recuperação e consolidação variada. As 20 questões autorais estão conectadas à seção adequada. Revisão editorial humana pendente.
  - **História:** Shannon (1948), transformer, BERT e GPT, GPT-3, RLHF e ChatGPT; few-shot (2020), cadeia de pensamento e "injeção de prompt" (2022), OWASP Top 10 para LLM (2023); janelas de 2020 e 2023, Lost in the Middle; BM25 e o artigo do RAG (2020); Salton (1975), word2vec, HNSW, FAISS, pgvector (2021).
  - **Questões:** prova com q.ia.01.001 a 020.
- **Revisão:** as séries novas de Primeiros Passos, cap.dados.01, cap.dev.03, cap.mat.01, cap.port.01, cap.ia.03, cap.ia.01, cap.dev.01, cap.dados.02, cap.dev.02, cap.mat.02, cap.port.02, cap.dev.04, cap.es.01, cap.es.02, cap.devops.01 e cap.devops.02 ainda sem revisão humana.
- **Aulas narradas novas:** "Do ábaco ao celular", com o novo tipo de cena linha do tempo, e "As quatro tarefas do computador".
- **Sequência única:** a aula narrada e as videoaulas conferidas entram na própria aula, numa fase "Veja de outro jeito" antes da prática. As bibliotecas de aulas narradas e de vídeos mostram "Na trilha" com o link para a aula.


## 27/10/2026 — microaulas de Inglês técnico (branch de trabalho)

- Implementadas 11 microaulas para `cap.ingles.01`: quatro de estratégias de leitura (skimming/scanning, falsos cognatos, limites e inferência), quatro de coesão (conectivos, condições, referência pronominal e comparativos) e três de gramática (modais de obrigação, voz passiva e afixos).
- As aulas reutilizam as 11 questões autorais existentes (`q.ingles.01.001–011`); não foram criadas questões nem rotuladas questões como oficiais.
- As três seções completas receberam um bloco de contexto histórico com referências: Maxwell (1969/1972), Halliday e Hasan (1976), RFC 2119/8174.
- Implementação em `src/content/micro/ingles-estrategias.ts`; registro em `src/content/index.ts`; teste de regressão em `src/test/ingles-estrategias.test.ts`.
- **Estado de validação:** o teste foi escrito, mas não executado nesta branch; revisão editorial humana e inspeção visual seguem pendentes.
