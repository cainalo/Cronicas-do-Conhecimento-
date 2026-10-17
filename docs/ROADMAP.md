# Roadmap

| Fase | Conteúdo | Estado | Critério de conclusão |
|---|---|---|---|
| A | Projeto do zero, stack, documentação, fontes do edital, 1ª rodada de perguntas | ✅ (edital oficial pendente por rede) | App roda, testes passam, docs criados |
| B | Primeiro fluxo: grimório → capítulo → lição → questões → correção → revisão → progresso | ✅ | Fluxo testado de ponta a ponta localmente |
| C | Supabase real + ampliação de conteúdo com rastreabilidade | 🟡 Banco e RLS prontos; sync do cliente não testado; conteúdo: 1 capítulo | Login+sync testado em aparelho real; edital oficial conferido; ≥1 capítulo por disciplina de maior peso |
| D | Planejador, flashcards (repetição espaçada), simulados, discursiva | ⬜ | Cada item usável e testado |
| E | Trilha, missões, conquistas, inventário | ⬜ (XP e níveis prontos) | Missões funcionam de ponta a ponta |
| F | Narrativa, personagens, mapas, animações | ⬜ (aguarda decisões) | Aprovado pelo usuário |
| G | PWA offline (service worker, downloads), Capacitor Android | ⬜ (manifesto pronto) | Abrir offline e sincronizar após reconexão, testado |
| H | Testes amplos, expansão para outros concursos | ⬜ | — |

## Próximas entregas, em ordem
1. ~~Conferir edital oficial~~ ✅ feito em 17/10/2026.
2. Testar login/sincronização no navegador real.
3. Grimório de IA (9 questões em dois blocos: Eng. de Software Assistida por IA e Sistemas Agentivos 4 + IA, Ciência de Dados e Automação 5).
4. Flashcards com repetição espaçada ligados aos capítulos.
5. Service worker (vite-plugin-pwa) para leitura offline.
