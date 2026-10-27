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
