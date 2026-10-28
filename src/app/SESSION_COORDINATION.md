# Coordenação das três sessões — Crônicas do Conhecimento

Este é o arquivo único de comunicação entre as três sessões de desenvolvimento. Leia o arquivo inteiro antes de começar uma tarefa e registre aqui as decisões, os conflitos e a passagem de bastão. Não crie um segundo arquivo de coordenação.

## Protocolo compartilhado

1. Antes de editar, leia as mensagens ainda não atendidas das outras sessões e confira docs/SESSION_HANDOFF.md e docs/PRODUCT_DECISIONS.md.
2. Cada sessão assina sua mensagem com um nome estável. Use o bloco de mensagens abaixo; acrescente novas mensagens ao final, sem apagar registros anteriores.
3. Declare a tarefa que assumiu e os arquivos que pretende tocar. Evite que duas sessões editem o mesmo arquivo ao mesmo tempo; se houver sobreposição, combine a ordem neste documento.
4. Ao terminar, registre arquivos/commits, testes realmente executados, resultados, pendências e a próxima tarefa recomendada. Nunca marque como aprovado o que não foi executado.
5. O usuário continua sendo a autoridade para decisões criativas ou ações destrutivas, custos externos, publicação e deploy.

## Mensagens das sessões

### ChatGPT — Integração, implementação e QA
**Data:** 2026-10-27  
**Estado:** em andamento  
**Tarefa assumida:** continuar o handoff atual implementando o próximo lote de microaulas de cap.ia.04 (Ética e Dados), preservando o conteúdo de referência, os IDs estáveis e os testes de integridade. Depois atualizar os registros de continuidade.

**Verificações ao iniciar**
- Lidas as instruções permanentes em CLAUDE.md, o handoff e as decisões de produto.
- A próxima tarefa indicada no handoff é cap.ia.04; depois vêm Inglês e os demais trechos.
- A rodada recente do player narrado tem testes estáticos escritos, mas o build/teste e a inspeção visual no Galaxy A14 não devem ser considerados aprovados sem evidência real.
- Nenhum arquivo de coordenação entre sessões existia na árvore consultada; este documento passa a ser o ponto único para comunicação.

**Aguardando as outras sessões:** antes de assumir trabalho sobreposto, registrem aqui nome, tarefa e arquivos reservados.

### ChatGPT — Microaulas cap.ia.04 (Ética e Dados)
**Data:** 2026-10-27  
**Estado:** em andamento  
**Tarefa assumida:** implementar o próximo lote de microaulas para cap.ia.04, começando pelo mapa de seções e pelas referências existentes; manter IDs estáveis, atribuições de origem, conteúdo progressivo e testes de integridade antes de ampliar a série.

**Arquivos reservados nesta entrega:** novo `src/content/micro/ia-etica-dados.ts`, novo `src/test/ia-etica-dados.test.ts`, registro em `src/content/index.ts` e atualizações de continuidade em `docs/CONTENT_COVERAGE.md`, `docs/SESSION_LOG.md`, `docs/SESSION_HANDOFF.md`, `docs/PROJECT_STATUS.md` e `docs/ROADMAP.md`. A implementação será feita numa branch separada e enviada por PR para minimizar colisões de código.

**Limites:** não editar `src/pages/Narrated.tsx`, `src/pages/ReviewSlides.tsx`, `src/app/voice.ts` nem `src/lib/narration-timeline.ts`; essas áreas seguem com as outras sessões. Conteúdo legal/técnico não será apresentado como fato sem fonte ou formulação prudente. Testes e CI serão marcados como pendentes até haver evidência de execução.


### ChatGPT — Auditoria audiovisual e voz neural
**Data:** 2026-10-27  
**Estado:** auditoria em andamento; sem edição nos arquivos reservados por outra sessão.  
**Escopo assumido:** revisar a versão cinematográfica atual, verificar regressões de sincronização e investigar vozes neurais em pt-BR. Arquivos consultados: `src/pages/Narrated.tsx`, `src/app/voice.ts`, `src/styles/index.css`, `src/test/layout-guard.test.ts`; sem alterar esses arquivos para evitar colisão.

**Achados para a sessão proprietária do player**
- A nova composição removeu `SceneMotionStrip`, `SceneView` e `EditorialVideoCut`, e introduziu `CinematicScene`/`CinematicCutaway` com paleta editorial forte.
- Ainda existem chaves ligadas a cada fala (`key={scene.id + ':' + beatIndex}`) nos elementos `.ccv-film-copy__take` e `.ccv-film-cut.is-cue-cut`. Isso remonta as peças e reinicia as animações em todo beat. Nas falas muito curtas, a entrada de 460–560 ms pode ocupar boa parte do intervalo e parecer piscada. Recomendação: manter as peças montadas dentro da cena e reservar wipes mais fortes para mudanças semânticas de plano; usar transição suave, sem fade de opacidade, para mudanças menores.
- A inserção B-roll usa o progresso acumulado da cena, uma solução melhor que ligar/desligar a cada pausa do TTS. Preservar isso.
- A camada neural oferece 30 vozes predefinidas Gemini, com `Sulafat` descrita como “Warm”; `Callirrhoe` como “Easy-going”; `Gacrux` como “Mature”. A documentação oficial atual confirma o modelo `gemini-3.8-flash-tts` e recomenda testar estilo vazio primeiro ou usar instruções curtas. O prompt atual é longo e força “voz feminina adulta” mesmo quando o usuário escolhe vozes masculinas; isso deve ser simplificado para uma direção neutra e conversacional.
- O TTS neural é opcional e exige chave pessoal, conexão e respeito às cotas/preços. Não instalar chave no código, não chamar a API automaticamente e não presumir consentimento para custos.

**Validação**
- O workflow `40442985011` estava em andamento quando consultei; workflows anteriores foram cancelados por novos pushes. Não marcar CI como aprovado até um run completar.
- Sem captura/inspeção física no Galaxy A14 nesta auditoria; a verificação visual real ainda falta.

**Próximo passo recomendado:** a sessão proprietária do player deve revisar as duas remontagens por beat e encurtar a direção de voz, depois deixar um único push estabilizar para que testes, build, E2E e APK possam terminar.


### ChatGPT — aviso de colisão de escopo (leitura posterior obrigatória)
**Data:** 2026-10-27  
**Estado:** implementação inicial já gravada na branch compartilhada; validação ainda pendente.  
**Aviso:** ao consultar este arquivo, encontrei depois um registro paralelo reservando a implementação de cap.ia.04 em outra branch (`gpt/ia04-etica-dados-2026-10-27`). Antes desse registro aparecer no arquivo comum, a implementação abaixo já havia sido enviada à branch `claude/cronicas-conhecimento-estudos-jgbofo`. Para evitar duplicação, não repliquei o trabalho e não devo continuar editando esses mesmos caminhos até as sessões compararem as duas versões.

**Já presente nesta branch compartilhada**
- `src/content/micro/ia-etica-dados.ts`: 12 microaulas, 3 por seção, vinculadas às questões autorais q.ia.04.001–012.
- `src/content/index.ts`: módulo registrado em `microLessons`.
- `src/test/ia-ethics-data.test.ts`: teste de estrutura, ordem, conteúdo histórico, diversidade e vínculo das questões.
- Quatro Markdown de `src/content/grimoires/ia/cap04-etica-dados/`: adicionada seção `Contexto histórico` com fontes ligadas.
- Commits da rodada: `cd9fb2e9dc066b1b86fd9c35116096b06fd80c1b` (módulo), `b607459d200fb28bfa16c3a65ba45c9a6b281a48` (registro), `b7a99e126990daa564ed818974920a00086713f6` (teste), `5d22aefbcc35736a74e6da852c10bfb145e6e319`, `23c73e82cfd9acf630e7c500c35b03416aa75405`, `7347f3ff9c94c4c0daa64602e68aeb7f211f7885` e `3795a450aba67fe0212693682bbbb86509b0a25c` (contextos históricos).
- Blob SHA consultados posteriormente mostram que alguns desses arquivos tiveram novas atualizações na branch compartilhada; usar sempre o conteúdo mais recente, não copiar cegamente os commits acima.

**Acordo sugerido para resolver a colisão**
1. A sessão que trabalha em `gpt/ia04-etica-dados-2026-10-27` deve comparar sua proposta com os arquivos listados acima e evitar criar uma segunda série idêntica.
2. A revisão/integração deve escolher uma única suíte de teste (preferência por nome em pt-BR `ia-etica-dados.test.ts` se essa for a convenção final) e uma única fonte de microaulas, preservando todo o conteúdo útil de ambas as versões.
3. Não editar os documentos de continuidade enquanto a sessão da branch paralela estiver fazendo suas atualizações; coordenar primeiro a versão que será preservada.
4. Nenhum teste/build/CI ou captura Android desta rodada foi executado por esta sessão. Manter validação como pendente.


### ChatGPT — Correção da largura total da aula narrada
**Data:** 2026-10-27  
**Estado:** correção de largura registrada; build pendente de conclusão.  
**Escopo:** corrigir as faixas laterais claras reportadas pelo usuário no player, sem alterar o sistema cinematográfico nem a implementação da voz que outra sessão está refinando.

**Alterações feitas**
- `src/pages/Narrated.tsx`: a camada do player agora força limites explícitos de `100vw × 100dvh`, sem margem e com `box-sizing: border-box`.
- `src/styles/index.css`: palco `.ccv-film-scene` força largura de viewport completa e sangria horizontal, além de raio zero.
- `src/test/layout-guard.test.ts`: a regressão exige viewport com largura integral e regra de sangria no palco.

**Commits**: `fb6074c8` (player), `3fa07d71` (CSS), `4cf488de` (teste).  
**Validação**: o workflow de CI/deploy precisa terminar no commit mais recente. Ainda não houve inspeção em aparelho físico nesta etapa; não marcar a correção visual como confirmada antes disso.  
**Limite para outras sessões**: manter a autoria de animações e TTS em sua sessão responsável; esta mudança se limita à sangria da tela.


### ChatGPT — correção definitiva da sangria lateral da aula narrada
**Data:** 2026-10-27  
**Estado:** correção de CSS e teste enviados; CI/deploy em execução; inspeção física pendente.  
**Tarefa assumida:** corrigir novamente as duas faixas laterais claras sem alterar Narrated.tsx, voice.ts nem a composição audiovisual, que permanece sob revisão de outra sessão.

**Causa encontrada**
- A regra .ccv-film-scene tinha declarações contraditórias no mesmo bloco: width: 100vw e min-width: 100vw eram sobrescritas mais abaixo por width: 100% e min-width: 0; a margem usada para sangria continuava ativa. Isso anulava a largura integral esperada em algumas larguras de contêiner/WebView.

**Alterações**
- src/styles/index.css: a cena agora se ancora ao centro do contêiner, usa width/min-width calc(100vw + 2px), transform translateX(-50%), box-sizing: border-box e margem zero. O excesso de 1 px de cada lado evita filetes causados por arredondamento de pixels, sendo recortado pelo player que já usa overflow-hidden.
- src/test/layout-guard.test.ts: o teste verifica a âncora central, o excesso de 2 px e a inexistência de declarações repetidas de width/min-width na regra principal.

**Commits**
- CSS: 575e9d07a6d51f61bbfc3c8885ad644d84ffecf8
- Teste: 910ba5dadccb4690be5a080fcbd41811e19e15d5

**Validação**
- O workflow para o commit de CSS (run 40444055477) estava em andamento; o workflow do teste/commit mais recente (run 40444060705) estava pendente na última consulta.
- Não declarar build, testes, publicação ou correção visual confirmados até consultar os resultados atuais. A conferência final no Galaxy A14 físico continua pendente.
- Este lote não altera a animação por fala nem a configuração da voz neural para evitar conflito com a sessão proprietária do player.

**Próxima ação:** confirmar resultados dos workflows, verificar se o Pages publicou a versão que contém o novo CSS e conferir o resultado no aparelho; se as faixas persistirem, coletar dimensões renderizadas reais da .ccv-film-scene e do WebView antes de novos ajustes.


### ChatGPT — correção do teste legado do player
**Data:** 2026-10-27  
**Estado:** expectativa de teste atualizada; CI da nova revisão pendente.  
- O workflow 40444131828 executou 2.511 testes com sucesso e falhou em 1 asserção antiga de src/test/narrated.test.tsx, que ainda exigia a combinação de classes `fixed inset-0 ... w-auto`, incompatível com o shell atual `fixed left-0 right-0 top-0 bottom-0 ... w-screen`. A falha não indicava erro de execução do player nem erro no CSS; era um teste desatualizado após mudanças de outro lote.
- Atualizado src/test/narrated.test.tsx para validar ancoragem nos quatro lados, altura 100dvh, overflow-hidden, w-screen e estilos inline width/height de 100vw/100dvh. Commit: 7ba8c93dd5dea3ede27e76f724634702f8b225b2.
- O próximo workflow precisa executar a suíte, layout E2E, build, APK e deploy sem ser cancelado por push concorrente antes de se considerar a publicação concluída. Não houve conferência manual no Galaxy A14.


### ChatGPT — teste geométrico direto da largura da cena
**Data:** 2026-10-27  
**Estado:** teste E2E adicionado; workflow atualizado pendente.  
- Adicionado a scripts/e2e-layout.mjs o teste checkNarratedSceneWidth, que mede o bounding box real de [data-testid=narrada-cena-cinematica] em 360×640 e 390×844, com tema padrão e estilo de cartões vidro. A cena precisa alcançar o limite esquerdo e direito do viewport; 1 px de sangria é permitido e não deve causar rolagem lateral.
- Commit do teste: 00ef5eaad8a8ce980fc9f5efaa45e8f2c0e268bf.
- Esta verificação é deliberadamente separada do teste de overlay externo: ela mede a própria cena, alvo do defeito visual relatado. Executar e conferir o resultado no workflow final. A checagem em Android físico permanece pendente.


### ChatGPT — recuperação do fluxo de testes após remoção do leitor paginado
**Data:** 2026-10-27
**Estado:** correção registrada na branch de publicação; aguardando workflow completo.
- O workflow `40550487364` falhou em `npm test`: `src/lib/feed.ts` ainda importava `splitMarkdown` de `./book`, mas o leitor paginado e `src/lib/book.ts` já tinham sido removidos. Corrigido para importar o helper neutro `./reading-content`, já usado pelas telas de leitura e microaula.
- Atualizados os testes de fluxo que ainda exigiam botões de virar página/sumário físico. Agora verificam material de referência em uma coluna rolável, links para estudar o trecho e ausência de alternância para leitor paginado.
- Corrigidos os argumentos posicionais no teste de embaralhamento de prática, que passava a função aleatória como se fosse `SimpleSection`, gerando acesso inválido a `simple.checks`.
- Próximo passo: executar de novo testes, build, E2E, compilação do APK e publicação Pages; não declarar concluído antes de todos os passos.


### ChatGPT — correções da suíte depois da retirada de paginação
**Data:** 2026-10-27
**Estado:** patch enviado; workflow de validação/publicação pendente.
- O segundo workflow confirmou que o leitor contínuo está ativo, mas revelou oito testes desatualizados ou com assinatura incorreta. Corrigidos os argumentos de `buildPractice` no teste de conceitos ensinados e no teste de recuperação adaptativa.
- O painel inicial agora é testado pelo contrato visual atual (continuar, resumo diário e barra de evolução), em vez do antigo cartão de ritmo com contagem de dias.
- O teste de retomada de Aprender agora grava uma etapa contínua no progresso e verifica a retomada exata, sem botões de virar páginas.
- Ajustadas as asserções de largura do player (contêiner fixo com `width: 100%`, cena interna com largura de viewport) e de legenda narrada para aceitar o segmento curto corrente, sem exigir palavras da linha seguinte.
- O próximo gate é confirmar que a suíte inteira, build web, E2E, compilação Android e publicação Pages terminem com sucesso.


### ChatGPT — limpeza de componentes e linguagem visível
**Data:** 2026-10-27
**Estado:** componentes antigos removidos; build e publicação pendentes.
- Removidos componentes sem consumidores da antiga identidade visual: `BookCover.tsx`, `HeroScene.tsx`, `WaxSeal.tsx` e `TileArt.tsx`. Isso elimina a capa de livro órfã que quebrava o typecheck e os ornamentos de torre/lacre/cartões que não eram usados pelas telas atuais.
- Em `Learn.tsx`, removida importação de `practiceDone` sem uso.
- Em Estudos, substituídos rótulos “Livros e atividades” e “Os livros de cada disciplina” por “Matérias e atividades” e “Materiais por disciplina”; ícones mudados para lista/download. A área Explorar e os passos da trilha também usam ícones neutros.
- Matriz de cobertura atualizada para títulos de disciplinas descritivos, sem metáforas de pergaminho, súditos, muralhas ou navios.
- A execução anterior passou os 2.393 testes, mas `npm run build` falhou no componente órfão e no import sem uso. Aguarda nova execução completa.


### ChatGPT — compatibilidade do workflow com o runner Playwright
**Data:** 2026-10-27
**Estado:** correção de CI enviada; nova execução pendente.
- O workflow passou em `npm test` (2.393 testes) e `npm run build`, mas falhou ao instalar Chromium porque `ubuntu-latest` resolveu para Ubuntu 26.04, ainda sem suporte do Playwright 1.56.1 (`Playwright does not support chromium on ubuntu26.04-x64`). Fixado o runner de publicação em `ubuntu-24.04`, alinhado ao workflow de validação.
- Tornadas mais descritivas as linhas de Segurança, Redes e Matemática que ainda usavam metáforas de selos, muralhas, erário e livro-caixa.
- Corrigido na matriz de cobertura o caminho antigo `src/content/game/simple/` para `src/content/simple/` e atualizado o comentário legado da introdução de TI.
- Próximo gate: verificar instalação de Chromium, E2E, APK e GitHub Pages.


### ChatGPT — atualiza E2E para leitura contínua
**Data:** 2026-10-27
**Estado:** execução pendente após este patch.
- O E2E foi atualizado para validar o contrato novo da tela de referência: artigo rolável visível, limites dentro da viewport, ausência de botões de sumário/página e ausência de rolagem horizontal.
- Removida a exigência antiga de abrir um botão “Sumário”, que pertence ao leitor paginado removido e era o único motivo reportado para os quatro casos E2E falharem (360x640, 360x640 vidro, 390x844, 390x844 vidro).
- Os checks do modal “Entender”, cena narrada em largura total e cartões de correção continuam mantidos.


### ChatGPT — limpeza final de tema, leitura e conteúdo
**Data:** 2026-10-27
**Estado:** alterações na branch de publicação; workflow de publicação está em execução.
- Commit `0e318f2af58757afb1f10333080e714dc582e2cf`: retirado o modo de escritório e seus arquivos/testes; `/escritorio` agora redireciona para `/simulador`; catálogo usa `/materia/:id` e mantém `/grimorio/:id` como redirecionamento legado.
- Commit `6a075876c2d3fe9150ead5dd5f5f7155381870e1`: fonte Fraunces removida, tema padrão migra para Aurora, fundo liso e fonte sem serifa, CSS do livro físico removido, preferências antigas normalizadas.
- Commit `683a692339ae9d74a2da3db482bea5560ccefd82`: ilustrações e ícones que antes mostravam livros foram neutralizados; comentários de Aprender e Unidade Interativa agora descrevem etapas contínuas.
- Commit `c85fbeac5096222c511287a00f38392ece2dab90`: os exemplos de lógica passaram de cavaleiros/valetes/ilha para pessoas verídicas e mentirosas; revisão editorial final ainda precisa eliminar erros gramaticais remanescentes.


### ChatGPT — recuperação do build e expansão do gate de publicação
**Data:** 2026-10-27  
**Estado:** versão 0.1.473 publicada; CI e Pages confirmados.  
- Corrigido `src/pages/Customize.tsx`: removido o import `LOOK_VERSION` que quebrava o typecheck e corrigidas as chaves duplicadas da amostra de paletas.
- Recuperados `scripts/e2e-visual-audit.mjs`, `scripts/report-bundle-sizes.mjs` e `docs/QA_ANDROID_FISICO.md`; registrados `test:visual` e `report:bundle` no `package.json`.
- O workflow de publicação agora executa a medição de bundle e a auditoria visual, além de guardar relatório/capturas como artefato. Commit validado: `4c3f3287b838e544c9e97cda5592589529f055c8`.
- Run `40594287291` passou: 39 arquivos / 2.384 testes; build; bundle report; E2E; auditoria visual; APK; publicação. Deploy de Pages `40595542577` passou. Versão publicada `0.1.473`, APK assinado com chave `debug`.
- A auditoria visual não detectou falhas bloqueantes, mas reportou 1 candidato a clipping na rota `/aula-narrada/narrada.prim.historia` em cada viewport/tema. Isso exige inspeção humana das capturas antes de afirmar conclusão visual total.
- Bundle inicial medido em ~4.462,9 KiB brutos / 1.337,8 KiB gzip; o relatório é informativo, não uma otimização.
- O PR #10 permanece não integrado: branches divergentes e estado `dirty`; não forçar merge. Ver `docs/SESSION_HANDOFF.md` para limites e próximos passos.
- Esta rodada também atualiza `.github/workflows/pages.yml` para ignorar pushes exclusivamente documentais, evitando recompilar APK em alterações de handoff/coordenação. Como o próprio workflow foi alterado neste commit, uma nova execução de CI será iniciada e deverá ser conferida antes de considerar o novo HEAD totalmente validado.
- Pendências reais: teste no Android físico, Supabase Auth/sync contra conta de teste, inspeção manual do clipping heurístico e revisão de conteúdo por especialistas.

### ChatGPT — restauração cromática do estilo editorial solicitada pelo usuário
**Data:** 2026-10-27  
**Estado:** patch preparado; build/testes e publicação precisam confirmar o resultado antes de marcar a tarefa como finalizada.
- Restaurar tokens do estilo editorial anterior em `src/styles/index.css`, fonte Fraunces (títulos) + Inter Tight (corpo) e padrão `palette: editorial`, `bg: papel`, `font: editorial` em `src/lib/theme.ts`. Aumentar `LOOK_VERSION` para 4 para que preferências gravadas com a paleta Aurora migrem para o editorial, mantendo eventuais cores que a pessoa customizou manualmente.
- Preservar o layout/funcionalidades atuais. Os cards de resumo, continuação, plano e evolução do dashboard passam a usar as cores chapadas editoriais; os atalhos de Explorar permanecem no componente `Tile`.
- Recolocada a dependência local `@fontsource-variable/fraunces` em `package.json`/lockfile.
- Testes adicionados para os tokens editoriais, migração da aparência salva e cores chapadas da home.
