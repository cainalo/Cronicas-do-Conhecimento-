# Roadmap

| Fase | Conteúdo | Estado | Critério de conclusão |
|---|---|---|---|
| A | Projeto do zero, stack, documentação, fontes do edital, 1ª rodada de perguntas | ✅ (edital oficial pendente por rede) | App roda, testes passam, docs criados |
| B | Primeiro fluxo: grimório → capítulo → lição → questões → correção → revisão → progresso | ✅ | Fluxo testado de ponta a ponta localmente |
| C | Supabase real + ampliação de conteúdo com rastreabilidade | 🟡 Banco e RLS prontos; sync do cliente não confirmado pelo usuário; conteúdo: 68/68 tópicos (normas estaduais em panorama) | Login+sync testado em aparelho real; edital oficial conferido; ≥1 capítulo por disciplina de maior peso |
| D | Planejador, flashcards (repetição espaçada), simulados, discursiva | ✅ (falta só ampliar conteúdo) | Cada item usável e testado |
| E | Trilha, missões, conquistas, inventário | ✅ mapa, títulos, selos, inventário e missões semanais | Missões funcionam de ponta a ponta |
| F | Narrativa, personagens, mapas, animações | ✅ prólogo, falas por região, diário de pistas, mascote, trilha, cenas e animações | Aprovado pelo usuário |
| G | App nativo e offline | ✅ Android (Capacitor) com APK no site; PWA removido a pedido; iOS pendente | Abrir offline e sincronizar após reconexão, testado |
| H | Testes amplos, expansão para outros concursos | ⬜ | — |

## Próximas entregas, em ordem
1. ~~Conferir edital oficial~~ ✅ feito em 17/10/2026.
2. Testar login/sincronização no navegador real.
3. ~~Grimório de IA, caps. 1 e 2~~ ✅ (falta cap. 3: fundamentos de ML, ética, ciência de dados).
4. Grimório de Desenvolvimento de Sistemas (5 questões).
4. Flashcards com repetição espaçada ligados aos capítulos.
5. Service worker (vite-plugin-pwa) para leitura offline.

## Feito em 17/10 (pedido "do zero")
- Explicação simples por trecho, tela Aprender, grimório introdutório, livro de couro com virada por dobra. Próximo: ouvir o usuário sobre a clareza das explicações e ajustar o tom; revisar a camada simples com olhar humano.

## Roteiro da auditoria (24/10/2026, docs/auditoria/09_ROADMAP_FASEADO.md)
- ✅ Fase 0 baseline · ✅ Fase 1 trilha única e retomada · ✅ Fase 2 piloto Processos (aguarda aprovação) · ✅ Fase 4 livro sem rolagem
- 🔄 Fase 3 migração por lotes (grimório de Infraestrutura completo em microaulas; próximos: Segurança e Dados) · ✅ Fase 5 página Estudos e vídeos (curadoria de vídeos pendente de conferência) · ✅ P1-14 ordem do dia na trilha única · ✅ página não encontrada e Conta em modo local · ✅ volumes separados · ✅ recuperação adaptativa na Prática · ⬜ Fase 6 polimento visual/áudio · ⬜ Fase 7 auditoria total de conteúdo e release
