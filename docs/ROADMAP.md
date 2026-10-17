# Roadmap

| Fase | Conteúdo | Estado | Critério de conclusão |
|---|---|---|---|
| A | Projeto do zero, stack, documentação, fontes do edital, 1ª rodada de perguntas | ✅ (edital oficial pendente por rede) | App roda, testes passam, docs criados |
| B | Primeiro fluxo: grimório → capítulo → lição → questões → correção → revisão → progresso | ✅ | Fluxo testado de ponta a ponta localmente |
| C | Supabase real + ampliação de conteúdo com rastreabilidade | 🟡 Banco e RLS prontos; sync do cliente não testado; conteúdo: 1 capítulo | Login+sync testado em aparelho real; edital oficial conferido; ≥1 capítulo por disciplina de maior peso |
| D | Planejador, flashcards (repetição espaçada), simulados, discursiva | ✅ (falta só ampliar conteúdo) | Cada item usável e testado |
| E | Trilha, missões, conquistas, inventário | ✅ mapa, títulos, selos, inventário e missões semanais | Missões funcionam de ponta a ponta |
| F | Narrativa, personagens, mapas, animações | ⬜ (aguarda decisões) | Aprovado pelo usuário |
| G | PWA offline (service worker, downloads), Capacitor Android | 🟡 PWA offline pronto e testado; falta Capacitor | Abrir offline e sincronizar após reconexão, testado |
| H | Testes amplos, expansão para outros concursos | ⬜ | — |

## Próximas entregas, em ordem
1. ~~Conferir edital oficial~~ ✅ feito em 17/10/2026.
2. Testar login/sincronização no navegador real.
3. ~~Grimório de IA, caps. 1 e 2~~ ✅ (falta cap. 3: fundamentos de ML, ética, ciência de dados).
4. Grimório de Desenvolvimento de Sistemas (5 questões).
4. Flashcards com repetição espaçada ligados aos capítulos.
5. Service worker (vite-plugin-pwa) para leitura offline.
