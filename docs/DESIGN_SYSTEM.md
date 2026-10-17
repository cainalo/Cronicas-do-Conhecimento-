# Design system: medieval moderno

Aprovado em 17/10/2026 (substitui o "livro gótico realista"). Materiais e pigmentos de códice aplicados a uma interface atual.

## Princípios
- **Base escura de pedra** com luz quente de tocha (gradientes radiais dourado e couro), tema claro "Dia" disponível.
- **Cards arredondados** (`rounded-2xl`), borda fina, sombra macia em camadas; links em card sobem 2px no toque/hover e encolhem levemente ao pressionar.
- **Pergaminho** (`.manuscript`) como superfície de leitura e de destaque (missão, flashcards, lições): tinta sempre escura dentro dele (variáveis redefinidas localmente).
- **Ilustrações próprias em SVG**: cena da Torre ao entardecer (`components/HeroScene.tsx`, estrelas, janelas e bandeiras animadas), capas de couro dos grimórios (`BookCover`, inclinação 3D no hover), mapa do reino, selo de lacre com animação de carimbo.
- **Movimento curto e com propósito**: entrada de página (`page-enter`), entrada escalonada de listas (`stagger`), carimbo (`stamp`), pulso na resposta certa (`pop`), anéis de progresso animados. Tudo desligado com `prefers-reduced-motion`.
- **Navegação**: cabeçalho translúcido com desfoque; barra inferior flutuante arredondada com indicador dourado no item ativo.

## Tipografia
- **Cinzel** (capitulares romanas): títulos, botões, números.
- **Alegreya Sans**: interface. **Alegreya**: texto longo do leitor (família desenhada para literatura).
- **UnifrakturMaguntia** (gótica): só a marca "Crônicas" e títulos das capas.

## Cores (tokens em `src/styles/index.css`)
| Token | Noite | Uso |
|---|---|---|
| bg / surface / raised | #120F0C / #201B16 / #2D261F | Fundo, cards, elementos internos |
| ink / muted | #EEE4D0 / #AA9A82 | Texto |
| gold | #E0B25A | Ação principal, destaque, progresso |
| ember (vermelhão) | #E26E52 | Rubricas, alertas, pendências |
| azure (ultramar) | #4668A6 | Capitulares, simulado |
| ok / bad | #84C68C / #EE7664 | Acerto / erro |
| leather / leaf | #76241A / #EEC676 | Superfícies de couro e ouro em folha |

## Componentes
`.card`, `.btn-primary` (ouro em relevo), `.btn-ghost`, `.chip` (pílula), `.ledger`/`.ledger-row` (lista em cartão), `.meter` (barra arredondada), `.icon-tile` (ícone em placa colorida), `.input`, `.manuscript`, `.prose-manuscript` (tabelas arredondadas e zebradas, capitular em placa), `ProgressRing`, `HeroScene`, `BookCover`, `WaxSeal`, `RealmMap`, `AppDownload`.

## Anti-padrões proibidos ("cara de site feito por IA")
Levantados em 17/10/2026 (pesquisa sobre *vibe-coded design tells* e sinais de texto gerado por IA). Não usar:
- Emojis como ícones. Usar `src/components/Icon.tsx` (SVG próprio, traço de pena 1.6).
- Bibliotecas de ícones padrão (Lucide etc.) e paleta cinza padrão do shadcn/Tailwind.
- Gradiente roxo, texto com gradiente, brilho neon, "orbs" desfocados, glassmorphism.
- Hero centralizado seguido de três cartões iguais; fileiras de cartões de estatística idênticos (usar `.ledger` com linhas).
- Rótulos pequenos em MAIÚSCULAS com espaçamento largo ("eyebrow") acima de títulos.
- Texto: excesso de travessões (—), construção "não é X, é Y", palavras-muleta ("robusto", "sem esforço", "mergulhar", "Além disso" em série), exclamações, negrito em frases inteiras.
Usar no lugar: elementos de manuscrito reais, como rubricas em vermelho (`ember`) nos subtítulos, ❧ (hedera) como separador, capitular iluminada e linhas duplas de livro-razão.
