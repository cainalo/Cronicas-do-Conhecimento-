# Handoff de sessão

**Última atualização:** 2026-10-25
**Fase:** reformulação "Arquivo Real" (kit em `docs/kit/`, auditoria em `docs/AUDITORIA_REFORMULACAO.md`): fases 0 a 5 do kit feitas para o piloto; expansão pendente.

## Situação atual
- **Rodada de 25/10/2026 (noite): pedidos do usuário. Decisões em PRODUCT_DECISIONS.md, seção "ritmo das aulas, sequência única, feed e Escritório".**
  - **Ritmo lento com história (piloto):** cap.prim.01 / computador virou a série `prim.computador`, com 4 aulas: história, quatro tarefas, bit e tamanhos. O texto do capítulo ganhou "Como o computador surgiu".
  - **Ritmo lento nos trechos 2 a 4 de cap.prim.01:** séries `prim.hardware`, `prim.sistema` e `prim.programacao`, 3 aulas cada, todas começando pela história. Os textos dos capítulos ganharam as seções históricas que servem de fonte. Sem rolagem a 360×640 e 390×844.
  - **Ritmo lento em cap.prim.02:** séries `prim.redes`, `prim.dados` e `prim.seguranca`, 3 aulas cada, com história. O grimório Primeiros Passos está inteiro no novo formato.
  - **Ritmo lento em cap.dados.01, cap.dev.03, cap.mat.01, cap.port.01, cap.ia.03, cap.ia.01, cap.dev.01, cap.dados.02, cap.dev.02 e cap.mat.02:** 38 séries, com história.
  - **Sequência única:** aula narrada e videoaula conferida entram dentro da aula ("Veja de outro jeito", fase `midia` em `MicroLesson.tsx`). As bibliotecas mostram "Na trilha" (`components/TrailPlace.tsx`, `trailPlaceOf`).
  - **Aulas narradas novas:** "Do ábaco ao celular", com a cena nova de linha do tempo, e "As quatro tarefas".
  - **Feed:** retratos ilustrados (`components/TeacherAvatar.tsx`), perfis, revisões rápidas, posts com desenho, hashtags, curtir, comentário fixado e anotações como comentários. O espaço para fotos reais (`content/estudos/imagens.ts`) está vazio enquanto a Wikimedia segue bloqueada na rede.
  - **Escritório 2D em tela cheia:** mapa novo 24×16 com 7 ambientes, móveis em vetor, personagem em 4 direções com passos e braços, painéis por cima (`pages/World.tsx`, `content/world/escritorio.ts`, versão 2).
  - **Ilustrações:** 10 novas em traço (`Illustration.tsx`). O antigo mascote virou ilustração de momento.
- **Pacote v4 (25/10/2026), registro em `docs/V4_EXECUCAO.md`.** As etapas 1 a 8 estão feitas e a 9 tem varredura automática.
  - **Telas novas:** Conta em áreas (`src/pages/settings/`); sons para estudar (`app/soundscape.ts`); reinício seguro do progresso (`lib/reset.ts`, coluna `profiles.progress_reset_at`); modo imersivo no Android (`MainActivity.java`, `ImmersivePlugin.java`); Hoje editorial.
  - **Removido:** telas de RPG e a dependência `three`.
  - **Pendente:** teste do modo imersivo em aparelho e reinício contra o servidor real.
- **Reformulação do pacote técnico (25/10/2026), registro completo em `docs/REFORMULACAO_EXECUCAO.md`:** fases 0 a 6 feitas.
  - **Navegação:** 5 áreas (Hoje, Trilha, Explorar, Revisar, Progresso).
  - **Unidade interativa:** o piloto é Processos.
  - **Plano:** viabilidade em minutos e plano dos próximos 7 dias.
  - **Domínio:** estimado por trecho, com os motivos.
  - **Dados no aparelho:** espelho em IndexedDB e cópia de segurança antes de qualquer descarte.
  - **Personalização:** painel em `/personalizar` (8 paletas, 21 cores por tema, estilos).
  - **Simulador 2D:** em `/simulador` (`lib/scenario.ts`, cenário `content/scenarios/suporte-lento.ts`).
  - **Sala dos Professores:** em `/sala` (`content/teachers.ts`, `lib/teachers.ts`).
- **Auditoria de 24/10/2026** (pacote em `docs/auditoria/`, baseline em `docs/BASELINE_2026-10-24.md`). Feitas as fases 0, 1, 2 e 4:
  - **Fase 1:** fonte única da trilha (`lib/checkpoint.ts`, `app/useCheckpoint.ts`): Torre, cabeçalho e botão do menu levam ao mesmo passo. Retomada exata (`StudyData.progress`, `app/useSession.ts`) em Aprender, Prática, Desafio, Missão e Microaula.
  - **Fase 2:** microaula-piloto `cap.infra.03/processos` (`content/micro/infra-processos.ts`, `pages/MicroLesson.tsx`) com 15 etapas, cada uma com explicação, exemplo, checagem imediata e recuperação. **Aguarda aprovação do usuário antes de migrar outras seções.**
  - **Fase 4:** livro sem rolagem interna (divisão de blocos em `lib/book.ts`) e leitura contínua; verificado em 33 capítulos.
  - Pendentes do roteiro: fase 3 (schema único para todo o conteúdo e motor de prática compartilhado), fase 5 (página Estudos e vídeos), fase 6 (polimento visual e áudio com volume separado), fase 7 (auditoria total de conteúdo), plano do dia ainda com lógica própria (P1-14), divisão do bundle (P2-05).
- **23/10, rodada 2:** ritmo até a prova na Torre (dias, total de atividades, meta de hoje); guia "Onde estou"; visual medieval imersivo (Noite padrão, prefs `cronicas:prefs:v3`); ambiente sonoro gerado no aparelho (`app/ambience.ts`, botão de alaúde no cabeçalho, chaves em Conta; a cena 3D usa o mesmo); sem vozes. Aguardando retorno do usuário sobre a amostra de som e o visual.
- **Reformulação Arquivo Real (23/10/2026):** nome "Crônicas do Arquivo Real"; paleta verde profundo, carvão, pergaminho e bronze em todo o app; elenco em `content/game/cast.ts` (Isolda mentora, Bubo coruja dela, Brites, Tomé, Leonor, Ambrósio, Conde Valério); novo prólogo (`PROLOGUE_KEY` v2).
- **Missão-piloto SQL** (`/missao/missao.sql.01`, conteúdo em `content/missions/sql-01.ts`): cena 3D (Three.js + KayKit CC0, `public/scene/arquivo/`, créditos em `CREDITOS.txt`) com legendas e transcrição; objetivos; descoberta com tabela; laboratório SQL (`lib/sql.ts`, `components/activities/SqlLab.tsx`); treino com 7 famílias de atividade (`lib/activities.ts`, `components/activities/ActivityView.tsx`); questão de prova autoral rotulada; desfecho com escolha persistente (`StudyData.story`, `lib/mission.ts`); revisão marcada. Aparece na Torre, na trilha do cap. de Banco de Dados e no Diário.
- **Códice:** em tela larga deitada, livro e Aprender abrem em duas páginas (`useSpread`), a folha gira sobre a lombada; setas do teclado.
- App publicado automaticamente no GitHub Pages a cada push (workflow `.github/workflows/pages.yml` → branch `gh-pages`): https://cainalo.github.io/Cronicas-do-Conhecimento-/ e APK em `/download/`. Usuário confirmou que o APK instala e funciona.
- Edital oficial conferido (`docs/fontes/`), 68 tópicos em `contest.ts`.
- **Conteúdo: 68/68 tópicos com material** (14 grimórios, 33 capítulos, 37 lições, 407 questões autorais, 8 estudos de caso), incluindo o grimório introdutório **O Primeiro Pergaminho**.
- **Estudo do zero**: cada trecho começa em **Aprender** (`/aprender/:cap/:trecho`, explicação simples de 4–7 páginas curtas, palavras novas, 3 verificações) → **Praticar** (aquecimento fácil primeiro) → **Desafio**; texto completo opcional. As 112 seções têm camada simples (`content/game/simple/`, `grimoires/primeiros/simple.ts`), escrita e revisada por agentes (leitura de iniciante, 8 erros de fato corrigidos), **ainda sem revisão humana**.
- **Livro de couro** (`components/LeatherBook.tsx`): capa, folhas empilhadas, pergaminho envelhecido, virada por dobra mostrando o verso. Ver `docs/CONTENT_COVERAGE.md`; normas estaduais/TCE-GO e LC 205 só em panorama (faltam os PDFs oficiais).
- **Estudo estilo Duolingo**: livro com páginas que viram, trilha Ler → Praticar por trecho e Desafio por capítulo; 105 seções com cena e atividades próprias (`content/game/scenes/`).
- Narrativa (Fase F): prólogo, falas por região e diário de pistas (`src/content/game/story.ts`).
- Visual claro no estilo do NutriConnect + camada divertida: mascote Bubo (coruja escriba, **provisório**), trilha estilo Duolingo em cada capítulo, cenas ilustradas nas páginas centrais, desenhos animados nos cartões, confete/avisos de XP/nível/selo, sons (chave em Conta), Rodada relâmpago, "Você sabia?".
- Simulado no formato da prova (70 questões por disciplina conforme o edital, pontos ponderados gerais × 1 e específicas × 2).
- Fases D e E completas; Supabase com RLS verificado; login/sync pelo navegador ainda **não confirmados pelo usuário**.

## Testes
25/10: `npm test` 840/840; tsc OK; build OK; /simulador, /sala e /explorar sem estouro nem rolagem interna em 360×640 e 1280×800.
Antes: `npm test` 792/792; `tsc -b` OK; build OK; capturas 390×844 (claro/escuro) e 1280×800 sem overflow nem erros.

## Pendências com o usuário
- Pedir retorno sobre a clareza da explicação simples (o usuário disse que não entendia nada) e sobre o livro de couro; e sobre login/sincronização.
- Configurar Site URL/Redirect URLs no Supabase (passo em `docs/MOBILE_AND_OFFLINE.md`).
- PDFs: LC estadual 205/2025, RN 13/2016, RA 14/2024, RA 17/2024, RA 14/2025, PDTI 2025–2026, Lei 16.168/2007, Regimento (Res. 22/2008), Lei 15.122/2005, Lei 20.756/2020, Código de Ética, RN 5/2024, RA 24/2024, RA 5/2024, RA 19/2024, RA 15/2024, Constituição de Goiás (TCE).
- Nome definitivo: "Crônicas do Arquivo Real" (provisório do kit, aprovado).
- **PDFs das provas** (rede bloqueia FGV/eticaconcursos/TCE): prova TCE-GO 2014 FCC TI + gabarito; prova 2024 TI Tipo 1 + gabarito definitivo, para questões OFICIAIS rotuladas.

## Próxima tarefa exata
1. **Aplicar o novo ritmo com história aos trechos seguintes, um por vez.** O grimório Primeiros Passos está completo (cap.prim.01 e cap.prim.02, 7 séries):
   - **Feitos fora de Primeiros Passos:** cap.dados.01, cap.dev.03, cap.mat.01, cap.port.01, cap.ia.03, cap.ia.01, cap.dev.01, cap.dados.02, cap.dev.02 e cap.mat.02.
   - **Próximo, na ordem da trilha (`JOURNEY` em `src/content/index.ts`):** cap.infra.02 e cap.seg.01 já têm microaulas; o próximo é cap.port.02, depois cap.dev.04, cap.es.01, cap.es.02 e assim por diante. Hoje 44 trechos ainda usam só a camada Aprender simples.
   - **Depois:** os demais capítulos.
   - **Regra:** cada trecho começa contando como aquilo surgiu, usando só fatos verificáveis, acrescentados também ao texto do capítulo.
2. **Fotos reais no feed:** quando a Wikimedia (`commons.wikimedia.org` e `upload.wikimedia.org`) estiver liberada na rede do ambiente, preencher `content/estudos/imagens.ts`. Usar só domínio público ou licença livre, com autor, licença e link conferidos na página do arquivo.
3. **Mais aulas narradas** para as aulas em série, cada uma entrando na fase "Veja de outro jeito".
4. **Com o usuário:**
   - modo imersivo no Galaxy A14;
   - reinício com a conta real;
   - opinião sobre o novo Escritório e o novo feed.
- Fase 7 do pacote técnico: auditoria de RLS e fluxos de Auth (só leitura no banco), checklist de release (spec 36) com evidência real e riscos declarados.
- Depois: mais cenários no simulador (Redes, Banco de Dados) e mais posts; aula visual narrada opcional (spec 20); microaulas de cap.seg.01 (simetrica, assimetrica, hash, assinatura, hibrida); remover as telas medievais restantes (Reino, Diário, Personagem).
0000. Fase 3 em andamento: grimório de Infraestrutura inteiro em microaulas (cap.infra.01, .02, .03; `src/content/micro/infra-*.ts`, 10 aulas, 123 etapas). Segurança iniciada: `seg-fundamentos` (cap.seg.01/fundamentos, 10 etapas). Próximo: cap.seg.01 simetrica, assimetrica, hash, assinatura, hibrida; depois cap.seg.02 e Dados. Varredura sem rolagem: `scratchpad/pw/runall.sh <tela>` (usa mscroll4.cjs). Regras novas: sem listas aninhadas nas explicações (teste), correção do 'ordenar' em blocos por item.
000. Microaula de Processos **aprovada** pelo usuário (24/10). Ela agora não tem rolagem vertical (SwipePages; `ActivityView fit`; `StepGuide compact`). Próximo: fase 3 da auditoria, migrar as demais seções para microaulas, começando pelas outras seções de SO, já no formato sem rolagem. Avaliar levar o mesmo formato à Prática, ao Aprender simples e à Missão.
00. Rodada de 24/10 (tarde) feita: ordem do dia segue a trilha única (itens `trail`, chave do plano `cronicas:plano:v2`), página `/estudos` (Continuar, biblioteca, relâmpago, flashcards, revisão, videoaulas sob demanda, materiais oficiais), página "não encontrada" dentro do app, Conta sem servidor em modo local, volumes separados de música e lareira, recuperação adaptativa na Prática (`recoveryFor`/`nextQueue`). Videoaulas curadas: lista vazia de propósito até conferência humana.
0. Ouvir o usuário sobre a microaula de Processos (clareza, ritmo, tamanho). Se aprovada: fase 3 do roteiro da auditoria (schema único e migração por lotes), começando pelas outras seções de SO; depois página Estudos.
0a. Ouvir o usuário sobre a missão-piloto (cena 3D, laboratório, atividades, desfecho) e o códice. Só depois expandir o padrão para outras disciplinas (fase 8 do kit): próximas missões sugeridas Redes (topologia), Segurança (incidente), Aquisição (propostas).
0b. Ao receber os PDFs, criar o campo `source` em Question e importar lote pequeno de questões oficiais conferidas.
0c. Dividir o bundle principal (2,4 MB) por rota.
0. Ouvir o usuário sobre o Aprender e ajustar o tom/tamanho; considerar revisão humana da camada simples por amostragem.
1. Conferir no texto oficial os pontos que a revisão não confirmou: multa de até 2x o dano (art. 111 da Lei 16.168/2007), arts. 26/28 da Constituição de Goiás, arts. 73/77 da Lei Orgânica, art. 33 da Lei 20.756 (precisa dos PDFs).
2. Quando o usuário enviar os PDFs, ampliar `legislacao/cap02-normas/02-goias-tce.md` e `institucional/cap02-goias/*` e suas questões.
3. Narrativa: falas extras por marco (nível, selos) se o usuário quiser.
4. Ideias pendentes: virada de página no leitor, ilustrações nas margens.
