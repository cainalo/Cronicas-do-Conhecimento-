# Decisões de produto

## Aprovadas pelo usuário
| Data | Assunto | Decisão | Consequência |
|---|---|---|---|
| 2026-10-17 | Backend | Criar projeto Supabase novo e separado (`cronicas-do-conhecimento`, sa-east-1, custo $0 informado na criação). | Não usar o projeto NutriConnect. |
| 2026-10-17 | Edital | O usuário vai liberar `concursosfcc.com.br` e `portal.tce.go.gov.br` na rede do ambiente. | Próxima sessão deve ler o edital oficial e trocar `fonte-secundaria` por `oficial-verificado` onde conferido. |
| 2026-10-17 | Estética dos grimórios | **Manuscritos antigos**: pergaminho, iluminuras (capitulares) e ornamentos também durante a leitura. | Implementado com página de pergaminho, capitular dourada, divisores ✦. Legibilidade preservada (Literata, 17px, entrelinha 1.75). |
| 2026-10-17 | Imersão medieval (pedido do usuário: "transforme nosso grimório num livro medieval, gótico, o mais realista possível") | App inteiro vira um livro sobre mesa de leitura: fólio de pergaminho com texturas, faixas de couro gravado a ouro, capas de grimório em couro com cantoneiras e fecho, capitulares iluminadas, rubricas em vermelhão, títulos em letra gótica, selo de lacre. Os temas passam a ser "noite" (pergaminho à luz de vela) e "dia" (luz de janela); o texto é sempre tinta escura sobre pergaminho. | Gótico só em títulos; texto corrido em EB Garamond e capitulares em romana, para não prejudicar a leitura. |
| 2026-10-17 | Atmosfera geral (substituída pela linha acima quanto às cores) | **Noite na torre**: azul-noite, couro, dourado envelhecido; modo claro "pergaminho" disponível. | Tema escuro é o padrão. |

| 2026-10-17 | Tom da história | **Mistério investigativo**: o aprendiz é um auditor-escriba que investiga registros adulterados e sistemas corrompidos no reino. | Narrativa detalhada (protagonista, conflito, personagens) ainda a definir com o usuário. |
| 2026-10-17 | Trilha | **Mapa do reino**: cada disciplina é uma região; capítulos e lições se revelam com o estudo. | Implementado em `/reino` (`components/RealmMap.tsx`). |
| 2026-10-17 | Recompensas | **Selos (conquistas), inventário de artefatos, missões semanais e títulos do personagem**, além de XP e níveis. | Implementado em `/personagem` (`lib/game.ts`). |
| 2026-10-17 | Nome | "Crônicas do Conhecimento" permanece **provisório**; decidir depois. | — |

| 2026-10-17 | App | **App nativo Android (Capacitor), não PWA**, com opção de download no site. | PWA removido; APK compilado no CI e publicado em `/download/`. iOS fica preparado para o futuro. |
| 2026-10-17 | Visual (substitui o "livro gótico" quanto ao acabamento) | **Medieval moderno**: estilo medieval sem cara de site antigo nem de IA; cantos arredondados, ilustrações, cards interativos, animações e sombras. | Novo design system (abaixo e em DESIGN_SYSTEM.md). Pergaminho mantido como superfície de leitura e destaque. |

## Decisões técnicas delegadas (tomadas por Claude)
| Assunto | Decisão | Justificativa |
|---|---|---|
| Stack | React 18 + TypeScript + Vite 5 + Tailwind 3 + React Router 6 + supabase-js 2 + Vitest | Moderna, compatível com Capacitor e PWA. |
| Conteúdo | Versionado no repositório (TS + Markdown), não no banco | Revisão por diff, funciona offline, sem custo; o banco guarda só dados do usuário referenciando IDs estáveis. Reavaliar quando houver editor de conteúdo. |
| Persistência | Local-first: tudo grava no aparelho e sincroniza com o Supabase (ids gerados no cliente, envio idempotente) | Funciona sem rede, sem perder dados, sem duplicar. |
| Visitante | Uso sem conta permitido; ao entrar, o progresso do visitante é migrado para a conta | Começar a estudar sem atrito. |
| XP | Concedido uma vez por (tipo, referência): 1º acerto da questão 10, recuperação na revisão 5, lição 30, capítulo lido 50. Unicidade também no banco | Evita recompensas infinitas/duplicadas. |
| Domínio | "Domínio" = questões cuja última resposta está correta ÷ total do tópico | Leitura não é evidência de domínio. |
| Sem vidas | Nenhuma penalidade que impeça praticar | Exigência do brief. |
| Fontes | Cinzel (títulos) e Literata (texto), empacotadas via @fontsource | Funcionam offline; Literata foi feita para leitura longa em tela. |
| 2026-10-17 | Visual e navegação (substitui o "medieval moderno" escuro) | **Estilo NutriConnect**: tema claro creme padrão, cor por área, cabeçalho de página com migalha, páginas centrais em grade de cartões; abas com nomes medievais (Torre, Grimórios, Treino, Reino); medieval leve; botão central "Continuar". | Motivo: dificuldade de se localizar. Detalhes em DESIGN_SYSTEM.md. |
| 2026-10-17 | Narrativa (Fase F) | Protagonista: **auditor aprendiz** da Ordem dos Auditores; conflito: **a Névoa do Esquecimento** (apaga registros e regiões do mapa; o domínio a dissipa); mentor: **Bubo, a coruja escriba** (mantido). A história aparece no **prólogo** (3 telas, primeira visita, pode pular e rever no Reino), em **falas por região** (abertura do grimório e região dominada ≥ 80%) e no **diário de pistas** (uma pista por lição concluída, 35 pistas lineares até o Grande Exame). | Texto em `src/content/game/story.ts`. |
| 2026-10-17 | Estudo estilo Duolingo e livro real (pedido do usuário) | Capítulo = livro de páginas que viram (sem rolagem vertical; arrastar, tocar na borda, setas ou botões; animação 3D; paginação pela altura real da tela). Cada seção = trecho com **cena** da história + leitura + "Pare e pense" (pegadinhas interativas) e uma parada **Praticar** na trilha (V/F, complete a lacuna, qual é o termo, pares, questões; painel de resposta e erros voltando ao fim da fila). A lição do capítulo virou **Desafio**. Pistas do diário proporcionais ao avanço total. | `pages/Book.tsx`, `pages/Practice.tsx`, `lib/book.ts`, `lib/practice.ts`, `content/game/scenes/*`. |
