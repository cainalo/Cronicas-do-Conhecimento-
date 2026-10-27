# Roadmap

| Fase | Conteúdo | Estado | Critério de conclusão |
|---|---|---|---|
| A | Projeto do zero, stack, documentação, fontes do edital, 1ª rodada de perguntas | ✅ (edital oficial pendente por rede) | App roda, testes passam, docs criados |
| B | Primeiro fluxo: grimório → capítulo → lição → questões → correção → revisão → progresso | ✅ | Fluxo testado de ponta a ponta localmente |
| C | Supabase real + ampliação de conteúdo com rastreabilidade | 🟡 Banco e RLS prontos; sync do cliente não confirmado pelo usuário; conteúdo: 68/68 tópicos (normas estaduais em panorama) | Login+sync testado em aparelho real; edital oficial conferido; ≥1 capítulo por disciplina de maior peso |
| D | Planejador, flashcards (repetição espaçada), simulados, discursiva | ✅ (falta só ampliar conteúdo) | Cada item usável e testado |
| E | Trilha, missões, conquistas, inventário | ✅ mapa, títulos, selos, inventário e missões semanais | Missões funcionam de ponta a ponta |
| F | Narrativa, personagens, mapas, animações | ↩︎ Substituída no pacote v4 por identidade editorial, escritório 2D de trabalho, aula narrada e feed curricular | Aprovado pelo usuário |
| G | App nativo e offline | ✅ Android (Capacitor) com APK no site e modo imersivo (a validar no aparelho); PWA removido a pedido; iOS pendente | Abrir offline e sincronizar após reconexão, testado |
| H | Testes amplos, expansão para outros concursos | ⬜ | — |

## Próximas entregas, em ordem (atualizado em 27/10/2026)
1. **Validar o código da branch de manutenção sem deploy:** Vitest, typecheck/build web, E2E de layout e compilação Android. O run [40444629202](https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40444629202) foi verde para `d2f6e93`, mas não cobre alterações posteriores na branch `gpt/ingles01-microaulas-2026-10-27`.
2. **Corrigir regressões reais**, acrescentar testes para cada falha e repetir o pipeline; não inferir sucesso a partir de testes apenas escritos.
3. **Auditar o conteúdo novo:** 12 microaulas de cap.ia.04 e 11 de cap.ingles.01, mantendo questões autorais identificadas como tais e referências históricas verificáveis. A revisão editorial humana ainda está pendente.
4. **Verificar interface móvel:** capturas 360×640 e 390×844, sem barras laterais claras, clipping, rolagem horizontal ou overlays menores que a tela. Depois, conferir a experiência real no Galaxy A14.
5. **Continuar conteúdo só após a validação:** cap.ingles.02, depois os próximos trechos na ordem de `JOURNEY`.
6. **Validar Auth/sincronização reais** no navegador/aparelho, incluindo redirecionamentos do Supabase e recuperação de dados; manter cópia de segurança antes de testar reinício.
7. **Curadoria e fontes oficiais:** confirmar vídeos manualmente, obter PDFs/gabaritos do TCE-GO e normativos pendentes, e concluir a revisão humana das questões/textos.
8. **Release Android:** manter a assinatura estável; não publicar APKs em branch diferente nem alternar chave sem autorização e plano para usuários que já instalaram o app.

## Feito em 17/10 (pedido "do zero")
- Explicação simples por trecho, tela Aprender, grimório introdutório, livro de couro com virada por dobra. Próximo: ouvir o usuário sobre a clareza das explicações e ajustar o tom; revisar a camada simples com olhar humano.

## Roteiro da auditoria (24/10/2026, docs/auditoria/09_ROADMAP_FASEADO.md)
- ✅ Fase 0 baseline · ✅ Fase 1 trilha única e retomada · ✅ Fase 2 piloto Processos (aguarda aprovação) · ✅ Fase 4 livro sem rolagem
- 🔄 Fase 3 migração por lotes (grimório de Infraestrutura completo em microaulas; próximos: Segurança e Dados) · ✅ Fase 5 página Estudos e vídeos (curadoria de vídeos pendente de conferência) · ✅ P1-14 ordem do dia na trilha única · ✅ página não encontrada e Conta em modo local · ✅ volumes separados · ✅ recuperação adaptativa na Prática · ⬜ Fase 6 polimento visual/áudio · ⬜ Fase 7 auditoria total de conteúdo e release


## Atualização de sequência — 27/10/2026

1. Revisar e validar a rodada de `cap.ia.04` (12 microaulas) e a rodada de `cap.ingles.01` (11 microaulas em branch isolada).
2. Integrar os arquivos escolhidos após comparar versões e garantir que não haja séries duplicadas.
3. Depois de testes, build e E2E concluídos, continuar para `cap.ingles.02` e os demais trechos na ordem de `JOURNEY`.
4. Continuam pendentes a revisão editorial humana e a inspeção física da experiência Android; nenhum status de CI é presumido a partir da mera escrita dos testes.
