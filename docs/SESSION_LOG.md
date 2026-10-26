# Registro de sessões

## Sessão 1 — 2026-10-17
- Pasta vazia (só README). Criado projeto Vite/React/TS/Tailwind.
- Rede bloqueou sites oficiais; edital levantado por buscas em fontes secundárias (marcado como tal).
- Rodada 1 de perguntas: Supabase novo; liberar domínios; manuscritos antigos; noite na torre.
- Criado projeto Supabase `cronicas-do-conhecimento` (sa-east-1) e aplicada migração inicial com RLS.
- Escrito Grimório "O Códice das Sete Chaves", cap. 1 Criptografia (6 seções), 2 lições, 20 questões autorais.
- Implementados leitor, lições, revisão, histórico, progresso, edital, conta/sync, XP/níveis, recomendação.
- 37 testes, build, verificação de RLS no banco remoto, capturas mobile.
- Usuário enviou o edital consolidado (15/09/2026): salvo em docs/fontes/, contest.ts reescrito com dados oficiais (68 tópicos), divergências das fontes secundárias registradas.
- Publicação automática no GitHub Pages (workflow + branch gh-pages) para uso só pelo celular.
- Pesquisa de "cara de site feito por IA": emojis trocados por ícones SVG próprios, painel em livro-razão, sem rótulos em maiúsculas espaçadas, rubricas em vermelho, texto sem excesso de travessões. Regras em DESIGN_SYSTEM.md.
- Grimório "O Livro dos Autômatos" (IA): 2 capítulos (11 seções), 4 lições, 40 questões autorais. 77 testes.
- Visual de livro medieval gótico (pedido do usuário).
- Fase D: migração 2 (mock_exams, essay_answers, flashcard_states, novos tipos de XP), simulados, estudos de caso, flashcards, central de treino. 87 testes.
- PWA: vite-plugin-pwa, ícones, service worker; leitura e respostas offline testadas.
- Planejador de estudos (migração 3, study_settings). 92 testes.
- Grimório de Desenvolvimento de Sistemas (2 capítulos, 24 questões, 2 lições) e estudo de caso de API. 116 testes.
- Grimório de Redes e Nuvem (2 capítulos, 22 questões, 2 lições). 138 testes.
- Rodada criativa 2 respondida. Fase E: migração 4 (XP de missão), mapa do reino, títulos, selos, inventário, missões semanais. 142 testes.
- Usuário pediu app nativo e visual medieval moderno: Capacitor Android com APK no site (CI), PWA removido; redesign completo (cards arredondados, ilustrações SVG, animações, nova tipografia).
- Segurança cap. 2 (Defesa em Profundidade): 6 seções, 20 questões, 2 lições, 7 artefatos. OWASP Top 10:2025 conferido por busca (site oficial bloqueado). 162 testes.
- Grimório de Banco de Dados "O Arquivo Profundo": 2 capítulos (5 seções), 22 questões, 2 lições, 5 artefatos. 184 testes.
- Grimório de Governança de TI "As Atas do Conselho": 2 capítulos (5 seções), 22 questões, 2 lições, 5 artefatos. PMBOK 8, ISO 38500:2024 e ENGD conferidos em fontes secundárias (registrado). 206 testes.
- Grimório de Legislação Aplicada à TI "O Livro das Leis do Reino": 2 capítulos (4 seções), 22 questões, 2 lições, 5 artefatos. LC 205/2025 e normativos do TCE-GO só em panorama (portais bloqueados; PDFs pedidos ao usuário). 228 testes.
- Grimório de Engenharia de Software "O Caderno dos Arquitetos": 2 capítulos (5 seções), 22 questões, 2 lições, 5 artefatos. 250 testes.
- Grimório de DevOps "O Diário do Porto": 2 capítulos (4 seções), 22 questões, 2 lições, 5 artefatos. 272 testes.
- Revisão estética pedida pelo usuário (dificuldade de se localizar; "mais parecido com o NutriConnect"): estudado o repositório do NutriConnect; rodada de 4 perguntas; tema claro creme, cor por área, PageHeader com migalha, grades de cartões, barra inferior com botão "Continuar", Conta no avatar, IBM Plex Sans + Libre Baskerville. Capturas 390×844 (claro e escuro) e 1280×800 sem overflow nem erros. 272 testes.
- Pedido do usuário: site mais divertido (inspiração NutriConnect) e continuar o conteúdo sem parar. Visual: mascote Bubo, trilha por capítulo, cenas, TileArt, efeitos e sons, cartão de flashcard que vira, ficha com inventário enxuto, Rodada relâmpago. Conteúdo com 7 agentes em paralelo (cada um só em sua pasta, integração central): SO/diretório, IA caps. 3–4, Dev caps. 3–4, Inglês, Português, Matemática/RL, Legislação Institucional. 68/68 tópicos; 391 questões; 428 testes. Três agentes pararam por limite de uso e foram retomados.
- Simulado "Prova completa" (70 questões, distribuição do edital, boletim ponderado) e matérias recolhíveis no simulado personalizado. 430 testes.
- 5 estudos de caso novos (dados, infra, DevOps, governança/contratações, engenharia de software) e teste de integridade dos estudos de caso. 438 testes.
- Rodada 3 de perguntas (narrativa) respondida; implementados prólogo, falas de Bubo por região e diário de pistas com aviso de nova pista. Agente de revisão de questões em andamento.
- Revisão das 160 questões novas por agente: gabaritos conferidos, 3 ajustes (q.dev.03.008, q.port.02.003, q.inst.02.008). Névoa animada no mapa do reino, rarefeita conforme o domínio, com brilho nas regiões libertadas.
- Comemoração ao libertar uma região da névoa (≥ 80%) e desfecho do diário ao reunir as 35 pistas.
- Pedido do usuário: mais Duolingo, capítulos curtos, livro real sem rolagem. Feito: livro paginado com virada 3D, trilha Ler/Praticar/Desafio, prática com 5 tipos de atividade e painel de resposta, "Pare e pense" no livro, cenas e atividades próprias para as 105 seções (4 agentes; 3 retomados após limite de uso). 550 testes.
- Pedido do usuário: linguagem difícil demais ("comecei e não entendia nada"), lições mais curtas, livro de verdade com textura medieval. Feito: camada "do zero" para as 105 seções (4 agentes) + grimório introdutório O Primeiro Pergaminho (1 agente, 7 seções, 16 questões fáceis, 2 lições, cenas e camada simples); tela Aprender; prática com aquecimento fácil e mais curta; trilha Aprender → Praticar → Desafio, com texto completo opcional; livro de couro com folhas empilhadas, pergaminho envelhecido e virada por dobra mostrando o verso; 2 pistas novas (37). Testes de integridade da camada simples, do Aprender e do aquecimento.
- Revisão da camada simples por 2 agentes lendo como iniciante: 81 de 115 entradas reescritas (termos explicados na primeira vez, frases curtas, ordem das páginas), 8 erros de fato corrigidos (definição de risco, crase em exemplo de regência, estágio probatório, ENGD refeita a cada 4 anos, domínios do COBIT, PITR, entidade × tipo de ficha, potências de 1.024). Caminho recomendado do mais fácil ao mais difícil (`journey`), selo "Comece aqui", botão "Palavras do trecho" na prática. 689 testes.
- Kit de reformulação "Arquivo Real": auditoria somente leitura (PDFs do kit bloqueados pela rede), 5 decisões do usuário (edital 2026, 3D grátis, Arquivo Real com Bubo, piloto SQL, paleta do kit em tudo). Fase 1 paleta e nome; motor SQL e laboratório; 7 famílias de atividade com regras de diversidade; missão-piloto completa; cena 3D com modelos KayKit CC0 (3,6 MB → 480 KB cada); códice de duas páginas. 709 testes.
- Pedido do usuário: contagem exata e meta diária, explicações passo a passo, visual medieval imersivo, sons reais. Feito: ritmo na Torre (`lib/pace.ts`, registro de data do Aprender em `StudyData.unitLog`), guia Onde estou, tema Noite padrão com pedra/madeira/tochas e Dia em pergaminho (prefs v3), ambiente sonoro sintetizado (lareira + alaúde/flauta/bordão/tambor) medido offline sem distorção (pico 0,34, −25 dB RMS), amostra de 40 s enviada ao usuário. Sem vozes. 715 testes.
- Auditoria completa enviada pelo usuário (24/10): baseline registrada; fase 1 (trilha única + retomada exata), fase 2 (microaula-piloto de Processos com 15 etapas e recuperação), fase 4 (livro sem rolagem interna, divisão de tabelas/listas/código/parágrafos, leitura contínua). 731 testes; 66 verificações de folha sem transbordo.
- Rodada seguinte (24/10): ordem do dia alinhada à trilha única; página Estudos com player de vídeo sob demanda (sem autoplay, youtube-nocookie, link para o original) e materiais oficiais; página não encontrada; Conta em modo local sem servidor; volumes separados; recuperação adaptativa na Prática. 740 testes; capturas 390×844 e 1280×800 sem overflow nem erros.
- Microaula aprovada pelo usuário; pedido de nenhuma rolagem vertical. Criado SwipePages (partes lado a lado), ActivityView em modo `fit`, StepGuide compacto. Varredura Playwright das 69 fases (antes e depois de responder): 0 rolagem e 0 conteúdo cortado em 390×844, 360×640 e 1280×800. 741 testes.
- Fase 3 (escala das microaulas) iniciada após a aprovação: microaulas de Arquivos e permissões (15 etapas), Shell e PowerShell (16) e Active Directory/LDAP/virtualização/containers (16), todas autorais e não revisadas, fatos só do texto do capítulo. Lista do chmod achatada para caber em 360×640. 753 testes.
- Redes (cap.infra.01) em microaulas: TCP/IP (10 etapas), Endereçamento (10), DNS/DHCP/aplicação (12), Perímetro (9). Correção do 'ordenar' passou a ir em blocos por item (cortava em 360×640); teste novo proíbe listas aninhadas nas explicações. 777 testes.
- Nuvem (cap.infra.02) em microaulas: Modelos (10 etapas) e Escala/disponibilidade/serverless (10). Grimório de Infraestrutura completo no formato aprovado. 787 testes.

## 25/10/2026: fases 6 e 7 e início do redesenho editorial
- **Fase 6:** simulador 2D e Sala dos Professores.
- **Fase 7:** auditoria de segurança somente leitura e `docs/RELEASE_CHECKLIST.md`.
- **Redesenho editorial (parcial):** escolhido pelo usuário via perguntas. Base visual, marca, ícones, ilustrações, shell e cartões prontos; as telas ainda usam a estrutura antiga com o novo estilo. 841 testes, tsc e build OK.

## 25/10/2026: pacote v4 (etapas 1 a 9)
- **Didática:** Matemática (9 aulas de inteiros) e Processos revisados.
- **Escritório 2D, aula narrada, videoteca e feed curricular.**
- **Limpeza da identidade:** sem RPG; Hoje reescrita.
- **Conta:** página de entrada com áreas; sons gerados no aparelho.
- **Reinício seguro do progresso:** marca de tempo, sem apagar o servidor; migrações aditivas aplicadas.
- **Modo imersivo no Android:** sem teste em aparelho.
- **Varredura visual:** 216 combinações sem estouro nem erro.
- **Validação:** 913 testes, tsc e build OK, CI 72 com APK verde. Registro em `docs/V4_EXECUCAO.md`.

## 25/10/2026 (noite): ritmo com história, sequência única, feed social e Escritório em tela cheia
- **Perguntas ao usuário:** 4 perguntas por AskUserQuestion, respostas registradas.
- **Aulas:** piloto do ritmo lento com história em cap.prim.01 / computador (4 aulas).
- **Sequência única:** aula narrada e vídeo dentro da aula; "Na trilha" nas bibliotecas.
- **Feed:** retratos, perfis, revisões rápidas e comentários.
- **Escritório:** 2D em tela cheia, refeito.
- **Ilustrações:** 10 novas; o mascote virou ilustração.
- **Limpeza:** removidas 18 capturas que tinham entrado no repositório por engano.
- **Validação:** 1003 testes; build OK.

## 25/10/2026 (madrugada): ritmo com história no restante de cap.prim.01
- **Aulas:** séries `prim.hardware`, `prim.sistema` e `prim.programacao` (3 aulas cada), com história verificável acrescentada aos textos dos capítulos.
- **Validação:** 1057 testes, tsc e build OK; sem rolagem nas 18 combinações de aula e tela (360×640 e 390×844).

## 25/10/2026 (madrugada, parte 2): ritmo com história em cap.prim.02
- **Aulas:** séries `prim.redes`, `prim.dados` e `prim.seguranca` (3 aulas cada), com história verificável acrescentada aos textos.
- **Validação:** 1111 testes, tsc e build OK; sem rolagem nas 18 combinações de aula e tela.

## 26/10/2026: ritmo com história em cap.dados.01 e cap.dev.03
- **Aulas:** 6 séries (18 aulas), com história verificável nos textos dos capítulos.
- **Validação:** 1219 testes, tsc e build OK; rolagem conferida a 360×640 e 390×844.
- **Raciocínio lógico:** cap.mat.02 completo (associação e dedução, sequências e conceitos, espaço e tempo). 1761 testes.
- **Matemática e Português:** cap.mat.01 completo (divisores, razões, porcentagem) e cap.port.01 completo (interpretação, ortografia, pontuação, morfologia). 1345 testes; rolagem conferida.
- **IA:** cap.ia.03 completo (aprendizado, redes, PLN) e cap.ia.01 completo (LLM, prompts, contexto, RAG, vetores, resumo). 1502 testes.
- **APIs:** cap.dev.01 completo (REST, formatos, GraphQL e WebSocket, OpenAPI). 1574 testes, tsc OK.
- **SGBDs:** cap.dados.02 completo (PostgreSQL e Oracle; NoSQL, CAP, replicação e governança). 1615 testes.
- **Identidade:** cap.dev.02 completo (conceitos, OAuth 2.0, OIDC e JWT, resumo com a linha do tempo de APIs e identidade). 1692 testes; rolagem de cap.ia.01 (34) e cap.dev.01 (24) conferida a 360×640 e 390×844.
