# Design system: claro e organizado, no estilo do NutriConnect

Aprovado em 17/10/2026 (substitui o "medieval moderno" escuro). O usuário relatou dificuldade de se localizar e pediu o visual do NutriConnect (repositório `cainalo/nutriconnect-simple-site`, usado só como referência de linguagem visual).

## Decisões do usuário (rodada de 17/10/2026)
- Tema padrão **claro creme**; o escuro continua em Conta → Aparência.
- Abas com **nomes medievais**: Torre, Grimórios, Treino, Reino (Conta vai para o avatar no canto do cabeçalho).
- Medieval **leve**: capas de couro dos grimórios, selos, mapa do reino, cena da Torre e o pergaminho do leitor e das lições. O resto tem cara de app atual.
- **Botão central "Continuar"** na barra inferior: leva à primeira atividade pendente da ordem do dia (ou à recomendação). Hook `useNextActivity` em `src/app/usePlanOfToday.ts`.

## Orientação (o problema que motivou a revisão)
- **Cada área tem a sua cor** (`src/app/areas.ts`): Torre terracota, Grimórios azul, Treino âmbar, Reino verde, Conta anil. A aba da área atual fica colorida, com fundo suave e rótulo em negrito, inclusive nas páginas internas (mapa de prefixos de rota por área).
- **Cabeçalho de página** (`PageHeader` em `src/components/Page.tsx`): migalha "‹ Área" na cor da área, ícone em placa colorida, título e subtítulo. Páginas internas mostram também o botão **voltar** no cabeçalho do app.
- **Páginas centrais como grades de cartões** (`Tile`/`TileGrid`), agrupados por `SectionTitle` (ícone colorido + título + fio que se apaga), como a página Funções do NutriConnect.
- Títulos claros em português (nada de "Exercitia", "Ordo diei").

## Cores (tokens em `src/styles/index.css`, mesmos valores do NutriConnect)
| Token | Claro | Escuro | Uso |
|---|---|---|---|
| bg / surface / raised | #FAF7F0 / #FFFDFA / #F0EBE1 | #1F1B15 / #27221B / #322C24 | Fundo creme, cartões, elementos internos |
| ink / muted / line | #342D24 / #6D6355 / #E6DED2 | #F4EEE2 / #B8AD9C / #423B31 | Texto e bordas |
| gold (verde-oliva) | #555F36 | #9BA86A | Estrutura, links, destaques |
| ember (terracota) | #B4532A | #D8764A | Botão principal, ações, rubricas |
| ok / bad | #3D7D42 / #AA3D2A | #84BA78 / #D4634F | Acerto / erro |

## Tipografia
- **IBM Plex Sans**: interface. **Libre Baskerville**: títulos (`font-display`, h1–h3).
- **Cinzel**: só a marca no cabeçalho. **Alegreya**: texto longo do leitor e das lições. **UnifrakturMaguntia**: só nas capas dos grimórios.

## Forma e movimento
- Cartões `rounded-3xl`, cartões de função `rounded-[1.6rem]`, abertura `rounded-[2rem]`; sombras macias e quentes.
- Botões em pílula (`rounded-full`); principal em terracota sólida.
- Movimento curto: `page-enter`, `stagger`, inclinação do ícone ao passar o dedo/mouse; tudo desligado com `prefers-reduced-motion`.

## Camada divertida (inspirada no NutriConnect)
- **Mascote** `components/Mascot.tsx` (Bubo, provisório): respira, pisca, acena e fala; humores idle/talk/cheer/sad/think. Aparece na Torre, nas cenas das páginas centrais, na trilha, no fim das lições, na revisão vazia, no simulado e no plano.
- **Trilha** `components/Trail.tsx`: paradas por seção e lição, caminho em curvas, parada atual pulsando, cenário (árvores, torres, bandeiras).
- **Cenas** `components/SceneBanner.tsx` (biblioteca, treino, reino, conta) e **desenhos dos cartões** `components/TileArt.tsx` (ampulheta escorrendo, cartas virando, relógio, pena escrevendo etc.), com inclinação 3D no mouse.
- **Efeitos** `app/fx.tsx`: confete, avisos (+XP, novo nível, selo), sons sintetizados (Web Audio, desligáveis em Conta). Tudo respeita `prefers-reduced-motion`.

## Componentes
`PageHeader`, `SectionTitle`, `Tile`, `TileGrid`, `IconBadge` (Page.tsx); `.card`, `.btn-primary`, `.btn-ghost`, `.chip`, `.ledger`/`.ledger-row`, `.meter`, `.input`, `.manuscript`, `.prose-manuscript`; `ProgressRing`, `HeroScene`, `BookCover`, `WaxSeal`, `RealmMap`, `AppDownload`.

## Anti-padrões proibidos ("cara de site feito por IA")
Levantados em 17/10/2026 (pesquisa sobre *vibe-coded design tells* e sinais de texto gerado por IA). Não usar:
- Emojis como ícones. Usar `src/components/Icon.tsx` (SVG próprio, traço de pena 1.6).
- Bibliotecas de ícones padrão (Lucide etc.) e paleta cinza padrão do shadcn/Tailwind.
- Gradiente roxo, texto com gradiente, brilho neon, "orbs" desfocados, glassmorphism.
- Hero centralizado seguido de três cartões iguais; fileiras de cartões de estatística idênticos (usar `.ledger` com linhas).
- Rótulos pequenos em MAIÚSCULAS com espaçamento largo ("eyebrow") acima de títulos.
- Texto: excesso de travessões (—), construção "não é X, é Y", palavras-muleta ("robusto", "sem esforço", "mergulhar", "Além disso" em série), exclamações, negrito em frases inteiras.
Nota: o degradê suave da própria cor nos ícones e cartões (herdado do NutriConnect) é permitido; continua proibido o degradê roxo e o texto em degradê.
