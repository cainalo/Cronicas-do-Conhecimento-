# Inventário de telas e componentes — cobertura de auditoria

## Como interpretar

Este documento distingue **comportamento visível no código observado** de testes que ainda precisam ser feitos em navegador/aparelho. O inventário de rotas é extraído de `src/App.tsx` na branch auditada. Não significa que cada tela foi executada visualmente nesta auditoria: o ambiente não permitiu rodar o app. Todas as rotas devem entrar na matriz de regressão.

## Fluxos de aprendizagem e biblioteca

| Rota | Componente | Evidência/risco observado | Teste/ação recomendada |
|---|---|---|---|
| `/` | `Dashboard` | “Começar”, “Próxima” e “Continuar” podem vir de fontes diferentes; home mistura várias funções | Testar sem progresso e com progresso; apenas um CTA primário; conferir alinhamento em mobile/desktop |
| `/biblioteca` | `LibraryPage` | Grid de grimórios, progresso de leitura e lista “Livros por escrever” | Testar títulos longos, card sem material, escala móvel, estados vazio e de progresso |
| `/grimorio/:id` | `GrimoirePage` | Entrada de um grimório; precisa preservar relação entre capítulos, tópicos e status de revisão | Verificar sumário, capítulo sem material, links e ida/volta da trilha |
| `/capitulo/:id` | `BookPage` | Livro com paginação e conteúdo denso; há `overflow-y-auto` no componente `Leaf` e scroll interno previsto para blocos grandes | Corrigir paginação; testar tabela/código, zoom, virar página, modo simples/duplo e retorno à trilha |
| `/aprender/:chapterId/:sectionId` | `LearnPage` | Páginas simples, vocabulário e checks ao final; link separado para texto completo | Migrar a uma única fonte canônica em microetapas com checagem integrada |
| `/pratica/:chapterId/:sectionId` | `PracticePage` | Fila/phase/value/verdict locais; cinco famílias de atividade na prática comum | Retomada exata, variedade, feedback, questão equivalente e acessibilidade do painel de resposta |
| `/licao/:id` | `LessonPage` | `phase` e `results` locais; progresso do desafio depende da sessão; há gravação de respostas | Atualizar a página em cada fase e verificar retomar no cartão/pergunta atual |
| `/missao/:id` | `MissionPage` | `step`, índices, fila de treino e tentativas mantidos localmente; final da missão é persistido separadamente | Checkpoint durável para cena, descoberta, laboratório, treino e encerramento |

## Treino e revisão

| Rota | Componente | Evidência/risco observado | Teste/ação recomendada |
|---|---|---|---|
| `/treino` | `TrainingPage` | Concentra plano, relâmpago, revisão, flashcards, simulado, discursiva e histórico | Manter cards alinhados e separar por objetivo; integrar com Estudos sem apagar rotas úteis |
| `/plano` | `PlanPage` | Plano diário congelado/reconstruído por lógica própria; texto promete que Continuar leva à próxima | Fazer plano obedecer à trilha central e explicar “descanso”, itens concluídos e rebuild |
| `/revisao` | `ReviewPage` | A fila, índice e contador são estados locais; a fila é congelada ao abrir | Atualizar/sair no meio, retomar sessão ou recomeçar conscientemente; preservar estado da resposta |
| `/flashcards` | `FlashcardsPage` | Fila/revelação/contagem da sessão são estados locais; a avaliação do cartão é gravada | Salvar o checkpoint da sessão e testar atualização entre revelar e classificar |
| `/relampago` | `BlitzPage` | Índice, hits, combo e seed são locais e a sessão tem questões sorteadas | Definir se a sessão retoma ou reinicia com aviso; o botão principal da trilha não deve saltar para uma rodada aleatória sem contexto |
| `/simulado` | `ExamPage` | Configura exame completo ou personalizado, questões ponderadas e tempo; exame ativo vem do modelo de estudo | Testar tempo, atualização, resposta, encerrar/reabrir, pausa e precisão do número de questões disponíveis |
| `/simulado/:id` | `ExamResultPage` | Boletim de resultado e histórico de exame | Verificar resultado vazio/ID inválido, explicações, links de revisão e consistência das pontuações |
| `/discursiva` | `EssayListPage` | Lista casos e estados de entregue/rascunho/não iniciado | Confirmar que estado é claro e card mantém grade mesmo com títulos longos |
| `/discursiva/:id` | `EssayPage` | Autosave após 1,5 s; pode haver risco de sair antes do debounce concluir | Testar navegação rápida, refresh, indicador “salvo”, limite de escrita, teclado móvel e recuperação do rascunho |
| `/historico` | `HistoryPage` | Filtro Todas/Certas/Erradas, itens expansíveis e status de sincronização pendente | Testar lista longa, item sem questão disponível, abrir explicação e navegação de retorno à matéria |
| `/progresso` | `ProgressPage` | Lista de domínio por tópico; a métrica usa última resposta correta, não leitura | Explicar métrica de modo consistente; lidar com tópicos sem material e listas longas sem tabela ilegível |

## Conta, mundo e recursos complementares

| Rota | Componente | Evidência/risco observado | Teste/ação recomendada |
|---|---|---|---|
| `/conta` | `AccountPage` | Auth, sync, preferências, áudio e download; se Supabase não existe, retorna um parágrafo simples | Fallback deve seguir o design system e explicar persistência local; testar login, reset, sync, offline, áudio e APK |
| `/edital` | `EditalPage` | Exibe status “Oficial verificado”, “Fonte secundária” e “Não confirmado”; reconhece cobertura não integral | Garantir evidência/fonte por afirmação, rótulos fiéis e layout de todos os tópicos em celular |
| `/reino` | `RealmPage` | Mapa/disciplinas, progresso, personagem, pistas e atalhos para edital | Testar o nexo entre progresso acadêmico e desbloqueios; verificar contagem de pistas contra `totalUnits` |
| `/personagem` | `CharacterPage` | XP, nível, selos, inventário e missões da semana | Conferir consistência de cálculo de nível/artefato; não premiar progresso duplicado após sync |
| `/diario` | `DiaryPage` | Pistas são reveladas por `cluesRevealed(Object.keys(data.lessons).length, totalUnits, ...)` | Verificar se contagem de lessons inclui vários tipos de conclusão e revela pistas no ritmo pretendido |
| `/download` | `DownloadPage` | Ponto de acesso ao app Android | Confirmar URL/arquivo vigente, instalação, atualização, permissão e mensagem se build não estiver disponível |
| `*` | fallback em `App.tsx` | Retorna só “Página não encontrada.” | Usar layout consistente e ações “Voltar à trilha” e “Abrir Estudos/Biblioteca” |

## Layout compartilhado e componentes

- `Layout.tsx`: header, áreas, retorno, CTA de continuação, navegação inferior, sync badge e prólogo. O topo e FAB móvel precisam usar o mesmo `getContinueTarget`. Testar `navigate(-1)` em rota aberta diretamente/deep link e garantir fallback previsível.
- `Page.tsx`: page headers, grids e tiles precisam ter mesma grade e espaçamento por área.
- `QuestionCard.tsx` e `ActivityView.tsx`: a hierarquia de pergunta, feedback e CTA deve ser igual em prática/questões/revisão onde possível, sem confundir padrões de resposta.
- `LeatherBook.tsx` / `lib/book.ts`: corrigir rolagem e medir conteúdo após fonte/viewport mudarem.
- `Scene3D.tsx` / `SceneTranscript.tsx`: garantir legenda/transcrição, fallback e que pausa/voltar não percam progresso.
- `TileArt.tsx`, `BookCover.tsx`, `SceneBanner.tsx`, `Mascot.tsx`, `Torch.tsx` e `WaxSeal.tsx`: auditar performance, consistência de estilo e alinhamento; a decoração não pode aumentar o ruído visual nem competir com texto.

## Foco de regressão prioritário

- `/` → Continuar → Microetapa → errar → reforçar → sair → continuar.
- `/biblioteca` → grimório → livro com tabela/código → voltar sem perda de posição indevida.
- Missão SQL: sair em cada fase e reabrir.
- Revisão/flashcards/relâmpago/questão discursiva: navegar e recarregar no meio.
- `/plano` concluído ou dia de descanso versus o botão central Continuar.
- Conta com e sem backend configurado, em rede e offline.
- Tópico sem conteúdo, rota inválida e link direto para rota interna.
- Cada fluxo nas resoluções 360×740, 390×844 e 1280×800, além da matriz completa de QA.
