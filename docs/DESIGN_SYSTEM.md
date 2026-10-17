# Design system (aprovado: "Noite na torre" + "Manuscritos antigos")

## Tokens (CSS vars em `src/styles/index.css`, expostos ao Tailwind)
| Token | Escuro (padrão) | Claro (pergaminho) | Uso |
|---|---|---|---|
| bg | #0F1220 | #E9E2D2 | fundo |
| surface / raised | #181C2E / #21263C | #F5EFE2 / #FCF8EE | cartões |
| ink / muted | #E8E1D0 / #9E9EAA | #282018 / #6E6254 | texto |
| gold | #D4A44C | #96681E | destaque, títulos, botão primário |
| ember | #C45C3C | #A03C24 | alertas, citações |
| ok / bad | #6EB478 / #DE6A60 | #2E7840 / #AA3228 | correção |
| parchment / sepia | #26211A / #ECE0C6 | #F6EDD6 / #2B2116 | página do manuscrito |

## Tipografia
Cinzel (títulos, botões) · Literata (texto, 17px × escala do usuário 0,85–1,5, entrelinha 1,75).

## Componentes
`.card`, `.btn-primary`, `.btn-ghost` (alvo mínimo 44px), `.chip`, `.input`, `.manuscript` (pergaminho com moldura dupla dourada), `.prose-manuscript` (tabelas roláveis, código, citações), `.illuminated` (capitular dourada), `.divider-ornament` (✦).

## Navegação
Cabeçalho fixo de 48px (nome, estado de sync, nível) + barra inferior com 5 destinos: Torre, Grimórios, Revisão, Progresso, Conta. Respeita `prefers-reduced-motion` e área segura do iOS.

## Pendente de decisão
Ícones próprios (hoje emojis), ilustrações, personagens, mapa.
