# Auditoria do projeto para a reformulação "Arquivo Real"

Fase 0 do kit (somente leitura). Nenhum arquivo do projeto foi alterado nesta etapa. Data: 23/10/2026.
Repositório `cainalo/Cronicas-do-Conhecimento-`, branch `claude/cronicas-conhecimento-estudos-jgbofo`, árvore limpa, 42 commits.

## Achado que muda o plano: o edital-alvo

O kit parte do **TCE-GO 2024, Analista de Controle Externo – TI (FGV)**, tratado como histórico. O projeto já tem o edital
**vigente**: **TCE-GO 2026, Técnico de Controle Externo – TI, código B02 (FCC)**.
- O PDF oficial consolidado de 15/09/2026 está em `docs/fontes/`.
- Inscrições abertas de 05/10 a 06/11/2026; prova prevista para 17/01/2027.
- Os 68 tópicos do Anexo II estão em `src/content/contests/tce-go-2026/contest.ts`, já com status de verificação por item.

São cargos, bancas e programas diferentes:

| | 2024 (kit) | 2026 (projeto) |
|---|---|---|
| Cargo e banca | Analista, FGV | Técnico, FCC |
| Questões | 100 | 70 |
| Disciplinas de TI | 6 | 13 disciplinas, incluindo IA agentiva, DevOps e Engenharia de Software |
| Conhecimentos gerais | Controle Externo e Auditoria Governamental | Não cobra essas duas matérias |

A estrutura que o kit pede (programa versionado por edital) **já existe**: `Contest` → `Discipline` → `Topic` com `status`,
e as telas só leem conteúdo via `src/content/index.ts`. Acrescentar o programa 2024 como segunda versão é barato.
Trocar o alvo, porém, significaria reescrever grande parte do conteúdo.

**Recomendação:**
- Manter o 2026 como alvo, porque é a prova que o usuário vai fazer.
- Usar as provas 2024 (FGV) e principalmente a **2014 (FCC, mesma banca de 2026)** como fontes de **questões oficiais rotuladas**, com o cargo indicado.

## Fontes: bloqueio de rede

O contêiner recebe **403 do proxy** em conhecimento.fgv.br, eticaconcursos.com.br e portal.tce.go.gov.br. Não li nenhuma
prova, gabarito nem edital do kit, e não vou afirmar nada sobre o conteúdo deles. É preciso **anexar os PDFs** à conversa.
Prioridade:
1. Prova 2014 FCC TI e gabarito 2014.
2. Prova objetiva 2024 TI (Tipo 1) e gabarito definitivo 2024.
3. Prova discursiva 2024.
4. Edital 2024 retificado.

Ficam alcançáveis: registry.npmjs.org (por exemplo, `three`) e raw.githubusercontent.com.

## (a) O que existe hoje

**Stack**
- Vite 5, React 18, TypeScript, Tailwind 3, React Router 6.
- Capacitor 7: APK publicado pelo CI em GitHub Pages.
- Supabase com 10 tabelas e RLS: profiles, question_attempts, reading_progress, bookmarks, lesson_completions, xp_events,
  mock_exams, essay_answers, flashcard_states e study_settings.
- Progresso local-first (localStorage), com sincronização e fusão entre aparelhos.

**Rotas (23)**
- Torre: `/`.
- Biblioteca: `/biblioteca`, `/grimorio/:id`, `/capitulo/:id` (livro completo).
- Estudo: `/aprender/:cap/:trecho`, `/pratica/:cap/:trecho`, `/licao/:id`.
- Revisão e acompanhamento: `/revisao`, `/historico`, `/progresso`, `/edital`, `/plano`.
- Treino: `/treino`, `/simulado`, `/discursiva`, `/flashcards`, `/relampago`.
- Jogo e conta: `/reino`, `/personagem`, `/diario`, `/conta`.

**Conteúdo**
- 14 grimórios, 33 capítulos, 112 seções, 37 lições e 407 questões, todas **autorais**. Nenhuma questão oficial.
- 8 estudos de caso discursivos.
- Flashcards com SM-2.
- Simulado no formato da prova (70 questões, pesos do edital).
- Explicação "do zero" por seção.

**Jogo**
- XP único por ação, níveis, sequência, 12 selos, inventário de artefatos, missões semanais.
- Mapa do reino com névoa.
- Prólogo de 3 telas, falas por região e diário de 37 pistas lineares.
- Mascote Bubo em SVG.

**Testes**
- 689 testes Vitest: integridade do conteúdo, regras de estudo, fusão de dados, fluxos de tela.
- Proibição de marcar uma questão como `oficial`.
- Capturas Playwright a 390×844.

## (b) O que preservar

- O modelo `Contest/Discipline/Topic` com status por item e o registro central em `content/index.ts`.
- Todo o progresso e as tabelas do Supabase, sem migração destrutiva.
- O XP idempotente, a revisão de erros, o simulado ponderado, os flashcards e o planejador.
- O conteúdo 68/68 e a camada simples.
- O pipeline de publicação: site e APK.
- As travas de honestidade: `origin`, `review` e "Nota de fonte".

## (c) Problemas de UX e pedagogia, medidos no código

1. **Verdadeiro ou falso domina.** O Aprender termina com 3 V/F. A Prática típica tem 12 atividades, das quais cerca de 4 são V/F (33%; o kit pede ~10%) e
   2 aparecem seguidas no início. O texto completo tem "Pare e pense", também em V/F. É exatamente o padrão que o kit quer abolir.
2. **Só 5 famílias de atividade:** V/F, lacuna, escolha do termo, pares e múltipla escolha. Faltam seleção múltipla, arrastar,
   ordenar, anotar diagrama, laboratório de dados, depuração, terminal, incidente e arquitetura.
3. **Nenhum laboratório visual manipulável.** Tabelas e código aparecem só como texto estático no livro. Não há rede, consulta, painel nem gráfico interativo.
4. **Cenas não são cinematográficas.** Os personagens são SVG 2D, com balões de fala e animação de flutuar, que o kit declara insuficiente.
5. **O livro é sempre uma página só**, mesmo no desktop (largura máxima de 3xl). Não há dupla de páginas. O Aprender força a virada de página para cada ideia curta,
   o que o kit desaconselha ("não obrigar a virar páginas para cada frase").
6. **A narrativa é linear.** Não há escolhas, consequências, elenco com objetivos próprios nem estado de história.
7. **O erro só reenfileira a mesma atividade.** Não há categoria do erro, pista graduada nem nova questão equivalente com outros dados.
8. **Paleta:** creme e bege por toda parte, por decisão anterior do usuário (estilo NutriConnect). O kit pede verde profundo,
   carvão, pergaminho e bronze, e diz "evitar bege em tudo". Há conflito de decisão.

## (d) Arquitetura relevante

**Conteúdo em TypeScript e Markdown no repositório.** As atividades da prática são **montadas** por `lib/practice.ts` a partir dos extras e da camada simples.
- Isso facilita acrescentar `Activity` novos de forma declarativa: os tipos atuais são `tf`, `blank`, `term`, `pairs` e `mcq`.

**O tipo `Question` já tem `origin` (`autoral | oficial | gerada-nao-revisada`).**
- Falta o valor `adaptada`.
- Falta o registro de fonte: banca, ano, cargo, caderno, número, página, situação do gabarito e revisão humana.
- Pode ser um campo `source?` opcional, sem mudança no banco: as tentativas referenciam `question_id` em texto.

**O banco guarda só dados do usuário.**
- Missões, escolhas narrativas e domínio por habilidade podem ir primeiro para o `StudyData` local.
- Uma tabela nova só viria depois de aprovada, com migração reversível.

**Desempenho:** o bundle JS tem **2,4 MB em um único arquivo**, porque todo o conteúdo está embutido. É preciso dividir por rota e carregar os grimórios sob demanda
antes de somar vídeo ou 3D.

## (e) Riscos e dependências

**Vídeo cinematográfico.** **Eu não tenho ferramenta de geração de vídeo nem de 3D.** O conector Canva disponível gera
imagens estáticas, que servem como arte conceitual e quadros-chave, não como filme. Caminhos reais:
- **A. Vídeo pré-renderizado, gerado pelo usuário** em ferramentas como Veo, Sora, Runway ou Kling, a partir de fichas de cena
  e roteiro que eu escrevo. Eu integro o player com legendas, transcrição, pular e rever, pôster e fallback.
  - Custo: créditos da ferramenta escolhida. Uma cena de 30 a 60 s costuma exigir várias gerações.
  - Peso estimado: 3 a 8 MB por cena de 30 s em 720p.
- **B. Cena 3D em tempo real** (Three.js, que está acessível pelo npm) com modelos livres (CC0), com rig e animação.
  - Custo zero e é interativa.
  - Mas a qualidade depende dos modelos. Os modelos acessíveis daqui não são medievais, e uma cena feita só com formas geométricas não cumpre o requisito.
  - Somaria de 600 KB a 1 MB de JavaScript, mais os modelos.
- **C. Híbrido:** vídeo para as aberturas e 3D ou diagramas para os laboratórios.

**Direitos das provas.**
- Para uso pessoal, transcrever as questões oficiais é tranquilo.
- O app é publicado em URL pública (GitHub Pages). Por isso, por padrão, guardo os metadados e a transcrição só das questões usadas, sempre com link para o PDF oficial.

**Escopo.** O kit equivale a reconstruir o app inteiro. A regra é fazer um piloto antes de escalar, e é isso que proponho.

**Tempo até a prova (cerca de 86 dias).** Cada semana de reformulação é uma semana sem conteúdo novo. O piloto precisa reaproveitar o conteúdo que já existe.

## (f) Plano em fases (incremental e reversível)

**Fase 1, direção visual (curta).**
- Tokens da paleta do kit: verde profundo, carvão, pergaminho e bronze, se aprovada.
- Protótipo de 3 telas: painel da campanha, sala da missão e laboratório.
- Divisão do bundle por rota.

**Fase 2, sistema de atividades.**
- Componentes declarativos: seleção múltipla, ordenar sequência, arrastar para categorias, laboratório de tabela/consulta,
  anotar diagrama e comparar cenários.
- Regras de diversidade testadas: no máximo 2 atividades iguais seguidas e V/F até 10%.
- Feedback por categoria de erro e nova tentativa com dados diferentes.

**Fase 3, missão-piloto de ponta a ponta.**
- Sequência: prólogo, objetivos, descoberta guiada, laboratório, treino variado, questão de prova, fechamento narrativo e revisão agendada.

**Fase 4, prova de conceito da cena**, pelo caminho escolhido (A, B ou C), com medição de peso e custo.

**Fase 5, códice.**
- Dupla de páginas no desktop e tablet horizontal, uma página no celular.
- O Aprender sai do formato livro e vira passos de missão.
- O livro fica só para o texto completo, glossário e dossiês.

**Fase 6, questões oficiais.**
- Lote pequeno e conferido, vindo dos PDFs anexados, com campo `source` e trava de teste.

**Fase 7, narrativa com estado.**
- Elenco, escolhas que alteram confiança e pistas, caderno de erros.

**Fase 8, expansão** para as demais disciplinas, só depois de aprovado o piloto.

## (g) Perguntas realmente bloqueantes

1. Edital-alvo: 2026 Técnico FCC (recomendado) ou trocar para 2024 Analista FGV?
2. Pipeline das cenas: A, B ou C, e há orçamento ou créditos de vídeo?
3. Narrativa e nome: adotar "Crônicas do Arquivo Real" com o elenco novo? Manter Bubo?
4. Tema da missão-piloto.
5. Paleta: a do kit (verde e carvão) substitui o creme no estilo NutriConnect?

Valores padrão nos demais pontos:
- O app é tratado como potencialmente público: nada de republicar cadernos completos.
- Todo o progresso é preservado: sem migração destrutiva, e mudanças de dados só com aprovação.
