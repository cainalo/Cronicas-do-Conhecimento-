# Design system: o livro medieval

Aprovado em 17/10/2026. O app é um livro aberto sobre uma mesa de leitura.

## Camadas
| Camada | Classe | Aparência |
|---|---|---|
| Mesa | `body` | Madeira escura (`--tex-wood`), vinheta e luz de vela (`body::before`, oscilação lenta; desligada com `prefers-reduced-motion`). |
| Fólio | `.folio` (no `<main>`) | Pergaminho com manchas, fibras e grão (`--tex-stains`, `--tex-fibers`, `--tex-grain`), bordas escurecidas. |
| Couro | `.leather-band top/bottom` | Cabeçalho e navegação em couro vermelho com filete dourado. |
| Moldura de pautado | `.manuscript` | Filetes duplos em vermelhão, como a regragem dos copistas. |
| Folhas soltas | `.card` | Velino mais claro com sombra leve. |
| Capas | `components/BookCover.tsx` | Couro por grimório (`binding`: sangue, floresta, noite, castanho), filetes a ouro, cantoneiras e fecho metálicos, brasão (`sigil`). |
| Lacre | `components/WaxSeal.tsx` | Selo de cera vermelha com inicial gótica. |

Texturas são filtros SVG `feTurbulence` em data-URI (sem imagens externas, funcionam offline).

## Pigmentos (tokens em `src/styles/index.css`)
| Token | Uso |
|---|---|
| `ink` / `muted` | Tinta ferrogálica (texto) e tinta esmaecida |
| `ember` (vermelhão) | Rubricas, subtítulos, links, ¶, numerais |
| `azure` (ultramar) | Campo das capitulares ímpares |
| `ok` (verdete) / `bad` | Acerto / erro |
| `leaf` (ouro em folha) | Texto sobre couro |
| `leather`, `desk`, `parchment`, `surface`, `raised` | Materiais |

Temas: `dark` = noite (pergaminho à luz de vela, mesa quase negra); `light` = dia. O texto é sempre escuro sobre pergaminho.

## Tipografia
- **UnifrakturMaguntia** (gótica textura): só `h1` e títulos de capa.
- **IM Fell English SC** (tipos de imprensa antiga): `h2`, `h3`, botões, navegação.
- **EB Garamond**: texto corrido (1,15rem × escala do leitor) e capitulares (romana, legível).
- Justificado apenas em telas ≥ 560px.

## Convenções de texto e numeração
Capítulos em romanos ("Capitulum ii"), seções com numeral em rubrica, "fol. iii" no fim de cada seção, listas com ¶ em vermelho, divisores ❧ e ✠, "Glossarium", "Index capitulorum", "Bibliotheca".

## Ícones
`src/components/Icon.tsx`: SVG próprios em traço de pena.

## Anti-padrões proibidos ("cara de site feito por IA")
Levantados em 17/10/2026 (pesquisa sobre *vibe-coded design tells* e sinais de texto gerado por IA). Não usar:
- Emojis como ícones. Usar `src/components/Icon.tsx` (SVG próprio, traço de pena 1.6).
- Bibliotecas de ícones padrão (Lucide etc.) e paleta cinza padrão do shadcn/Tailwind.
- Gradiente roxo, texto com gradiente, brilho neon, "orbs" desfocados, glassmorphism.
- Hero centralizado seguido de três cartões iguais; fileiras de cartões de estatística idênticos (usar `.ledger` com linhas).
- Rótulos pequenos em MAIÚSCULAS com espaçamento largo ("eyebrow") acima de títulos.
- Cantos muito arredondados em tudo (`rounded-xl`, `rounded-full`): usar `rounded-sm`.
- Texto: excesso de travessões (—), construção "não é X, é Y", palavras-muleta ("robusto", "sem esforço", "mergulhar", "Além disso" em série), exclamações, negrito em frases inteiras.
Usar no lugar: elementos de manuscrito reais, como rubricas em vermelho (`ember`) nos subtítulos, ❧ (hedera) como separador, capitular iluminada e linhas duplas de livro-razão.
