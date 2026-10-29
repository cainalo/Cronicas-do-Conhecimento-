# Estado do projeto (atualizado em 2026-10-29)

## Rodada Pórtico de 29/10 — estado a validar
- Feed social demonstrativo na rota `/sala`, com stories, links de referência, perfis completos e posts de professores; publicações de estudante persistem apenas no aparelho.
- Posts editoriais escolhidos dentro da trilha por `/trilha-post/:chapterId/:sectionId`; rota didática antiga preservada em `/feed-aulas`.
- Workspace da videoaula com resumo, notas, timestamps e checklist persistidos localmente; o player continua em proporção 16:9 e a página recebe largura extra em telas grandes.
- Identidade visual oficial aplicada por assets recortados de `public/brand/`.
- Cobertura de testes adicionada para feed e workspace de vídeo. O workflow do commit `26ff415dcfbf` passou em testes, build web e E2E e publicou o site. Na `main`, o APK foi preservado em vez de recompilado sem keystore estável (versão publicada mantida em `0.1.521`).
- A implementação desta rodada é parcial: o feed é local-only, ainda não sincroniza entre usuários; os próximos passos estão em `docs/PORTICO_IMPLEMENTATION_PLAN.md`.

- **Laboratório Linux virtual:** chamado 2318 integrado com o escritório 2D. Seis verificações sobre `top`, `free -h`, `vmstat 2` e `ps aux | grep importador` levam ao diagnóstico de thrashing; o resultado fica em armazenamento local e, ao retornar ao mapa, a investigação é marcada e o estudante avança para a decisão sobre o PID 4127. O terminal não é uma shell real do dispositivo.

## Funciona e foi testado
- **25/10 (noite):** série piloto com história em cap.prim.01 / computador; aula narrada e vídeo dentro da aula; feed com perfis, revisões rápidas e comentários; Escritório 2D em tela cheia (mapa novo, 4 direções). Testes automáticos e capturas em 390 e 1280 px.
- **Pacote v4 (25/10/2026):** Conta em áreas, sons para estudar, reinício seguro do progresso (testado com servidor simulado), Hoje editorial, sem telas de RPG, escritório 2D, aula narrada, feed curricular. Detalhes em `docs/V4_EXECUCAO.md`.

## Mudanças de 26/10 na main — validação pendente
- A implementação do Claude foi integrada por PR #3 no commit [4517633](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/4517633ea243189b754fe494382004c23fe65a25), preservando as correções recentes de narração, feed e layout da trilha.
- **Cap. DevOps 02 — Plataforma e Observabilidade:** foram adicionadas 7 microaulas em `src/content/micro/devops-plataforma.ts` (4 de IaC/contêineres/Kubernetes e 3 de observabilidade), registradas na trilha por `src/content/index.ts`. Os textos completos agora têm introduções históricas e referências técnicas.
- Adicionado `src/test/devops-platform.test.ts` para conferir a ordem das sete aulas, existência de capítulos/seções, estrutura das etapas, diversidade das consolidações e coerência das questões.
- **Ainda não declarar pronto:** a revisão editorial humana, o resultado do CI dessa rodada, a verificação E2E e a compilação/publicação do APK ainda precisam de confirmação. A conectividade desta sessão não forneceu o resultado dos Actions para o commit mais recente.
- A publicação pela `main` depende da assinatura Android fixa (`ANDROID_KEYSTORE_BASE64` e segredos associados). Sem ela, o workflow pode testar e compilar, mas a etapa de publicação é deliberadamente ignorada para evitar incompatibilidade de assinatura em instalações existentes.

| Fonte única do próximo passo e retomada exata (Aprender, Prática, Desafio, Missão, Microaula) | `checkpoint.test.ts`, `flow.test.tsx` |
| Microaula-piloto Processos, memória e serviços (15 etapas com checagem e recuperação) | `micro.test.ts`, `flow.test.tsx`, captura 390×844 |
| Ordem do dia seguindo a trilha única (mesmo destino do Continuar, nada concluído como próximo) | `planner.test.ts` |
| Página Estudos (/estudos): Continuar, atalhos, videoaulas só ao tocar (sem autoplay), materiais oficiais | `studies.test.tsx`, capturas 390×844 e 1280×800 |
| Página não encontrada dentro do app; Conta sem servidor em modo local; volumes separados de música e lareira | `studies.test.tsx` |
| Prática: no erro, item equivalente com outros dados logo adiante (termo do glossário, questão do trecho) | `studies.test.tsx` |
| Livro sem rolagem dentro da folha + leitura contínua | `study.test.ts` (divisão), varredura Playwright de 33 capítulos |
| Funcionalidade | Evidência |
|---|---|
| Leitor do capítulo (sumário, busca com destaque, marcadores, retomada pela última seção, fonte A−/A+, tema claro/escuro, glossário, referências, marcar seção lida) | Teste de fluxo `flow.test.tsx` + inspeção visual 390×844 |
| Lições (cartões → 10 questões → correção comentada → resultado) | `flow.test.tsx` |
| Histórico com filtros (todas/certas/erradas), indicando pendente/salvo | Build + inspeção de código (sem teste dedicado) |
| Revisão de erradas até acertar | `flow.test.tsx`, `study.test.ts` |
| XP único, níveis, progresso/domínio por tópico, recomendação com motivo | `study.test.ts` |
| Persistência local (visitante e por usuário) | `flow.test.tsx` |
| Fusão entre dispositivos / migração visitante→conta | `merge.test.ts` |
| Banco Supabase: 6 tabelas, RLS, privilégios, trigger de perfil, unicidade de XP | `supabase/tests/rls_check.sql` executado no banco remoto (13/13 esperados), advisors de segurança sem alertas |
| Integridade do conteúdo (gabarito, comentários, tópicos do edital, nunca 'oficial') | `content.test.ts` |
| Edital oficial (consolidado 15/09/2026) transcrito: provas, pesos, nº de questões, regras da discursiva, 68 tópicos do Anexo II | Conferido contra o PDF; `npm test` |
| Tela do edital com status de verificação e cobertura por tópico | Build |
| Central de treino (`/treino`) | Captura mobile |
| Simulado: escolha de tópicos, 10–40 questões, tempo livre ou 2–3 min/questão, entrega automática no fim do tempo, boletim por tópico, histórico | `training.test.ts`, `flow.test.tsx`, captura |
| Estudo de caso: 2 enunciados autorais, orientação com critérios pedagógicos, editor com estimativa de linhas e salvamento automático, entrega, autoavaliação, resposta-modelo comentada | `training.test.ts`, captura |
| Flashcards com repetição espaçada (SM-2 simplificado) a partir dos glossários (29 cartões) | `training.test.ts`, `flow.test.tsx` |
| Sincronização dessas três áreas com o Supabase (tabelas novas com RLS) | RLS verificado no remoto (`rls_check_02.sql`); envio pelo app não testado (rede) |
| Camada divertida: mascote, trilha estilo Duolingo, cenas, desenhos animados, confete, sons, Rodada relâmpago | `game.test.ts` (rodada), capturas |
| Visual claro estilo NutriConnect: cor por área, cabeçalho com migalha, grades de cartões, botão "Continuar"; medieval leve (capas, selos, mapa, pergaminho do leitor) | Capturas 390×844 claro/escuro e 1280×800 |
| Planejador (`/plano`): ordem do dia congelada no aparelho, atividades marcadas pelo estudo real, revisão de erros, flashcards, estudo de caso semanal (1º dia), simulado semanal (último dia), leitura e lições; dias de descanso sem culpa; previsto/lido/respondido/domínio; preferências sincronizadas | `planner.test.ts`, captura |
| App Android nativo (Capacitor), APK compilado e publicado pelo CI com download no site | Execução 11 do workflow; APK inspecionado (assinatura, conteúdo). Não testado em aparelho físico |
| Aprender (explicação do zero por trecho, palavras novas, verificações, trecho estudado), prática com aquecimento, livro de couro com virada por dobra, grimório introdutório | `flow.test.tsx`, `study.test.ts`, `content.test.ts` (camada simples), capturas 390×844 |
| Gamificação: mapa do reino (`/reino`), ficha do personagem (`/personagem`) com título, sequência, missões semanais com resgate de XP, 12 selos e inventário de artefatos | `game.test.ts`, capturas |

## Implementado, mas NÃO testado ponta a ponta
- **Fotos reais no feed:** estrutura pronta, sem fotos (Wikimedia bloqueada na rede do ambiente).
- **Modo imersivo no Android** (barras ocultas, reveladas por deslize): compila no CI, sem teste em aparelho.
- **Reinício do progresso contra o servidor real** (marca em `profiles.progress_reset_at`): só testado com servidor simulado.
- **Sincronização real com Supabase e Auth (cadastro, login, recuperação de senha) pelo app.** O container bloqueia `*.supabase.co`; o caminho SQL foi validado, o cliente HTTP não. Testar no navegador do celular/PC.
- Confirmação de e-mail: depende da configuração padrão do Supabase Auth (provavelmente ativa). URL de redirecionamento precisa ser cadastrada ao publicar.

## Incompleto / não iniciado
- Cobertura do edital: 68 de 68 tópicos com material (13 grimórios, 391 questões autorais); normas estaduais/TCE-GO em panorama verificável (ver CONTENT_COVERAGE).
- Narrativa de RPG removida no pacote v4 a pedido; lembretes não iniciados.

## Conhecido
- Bundle JS ~660 kB (sem code-splitting) — aceitável por ora.
- Ao publicar em hospedagem estática é preciso fallback de SPA.

### Atualização de validação — 26/10/2026
- A publicação anterior do cap.devops.02 passou pelo Actions run [40394408966](https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40394408966) e gerou o site/APK versão 0.1.129; assinatura Android segue em debug para preservar a identidade de atualização.
- Depois dessa publicação, foram adicionadas 15 microaulas de cap.ia.02 e testes de regressão. Essa nova rodada ainda precisa passar por CI antes de ser publicada.
- A revisão editorial humana e o teste em aparelho Android continuam pendentes.
