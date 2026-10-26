# Relatório mestre de auditoria

## 1. Parecer executivo

**Parecer:** o projeto já tem uma base de produto real — conteúdo amplo, testes automatizados, trilha, livro paginado, uma missão 3D, modo visitante, sincronização planejada/implementada e aplicativo Android —, mas o modelo pedagógico e a navegação ainda não formam uma experiência única. A prioridade não é adicionar mais gamificação ou mais texto: é tornar a aprendizagem progressiva, verificável, retomável e visualmente consistente.

O problema central é sistêmico: o “Aprender” trabalha em páginas curtas de uma versão simples; o “texto completo” fica separado; as verificações aparecem após várias páginas; a prática padrão tem poucas famílias de exercícios; missões usam outro motor de atividades e mantêm seu estado em componentes React; e Home, planejador e recomendação podem escolher próximos passos diferentes. Essas decisões combinadas geram exatamente a sensação de conteúdo desigual, ordem perdida e retomada imprecisa relatada pelo usuário.

## 2. Escopo observado

- Repositório público: `cainalo/Cronicas-do-Conhecimento-`.
- Branch de implementação: `claude/cronicas-conhecimento-estudos-jgbofo`.
- Commit-base consultado: `be2ece0059622aeb00bdd3fa638b60cb13eb7fdd`.
- Stack documentada: React 18, TypeScript, Vite 5, Tailwind 3, React Router 6, Capacitor 7 e Supabase.
- Domínio: preparação para TCE-GO 2026 — Técnico de Controle Externo, TI (B02/FCC).
- Documentação existente informa 14 grimórios, 33 capítulos, 112 seções, 407 questões autorais, 37 lições, 8 estudos de caso e uma missão-piloto SQL. Esses números devem ser recalculados pela branch atual no início da implementação, pois alguns documentos do próprio repositório divergem.
- Documentação existente informa 715/715 testes Vitest em 23/10/2026 e build concluído com alerta de chunk maior que 500 kB. Isso é um registro preexistente do projeto, não uma execução independente desta auditoria.

## 3. Achados mais importantes

### A-01 — O avanço do curso não possui uma única fonte de verdade (P0)

**Evidência:** `src/pages/Dashboard.tsx` usa `recommend(...)` para o botão “Começar”; `PaceCard` oferece outra próxima atividade; `src/components/Layout.tsx` usa `useNextActivity()`; `src/app/usePlanOfToday.ts` escolhe a primeira atividade pendente do plano diário e, em seguida, cai em outra recomendação. `src/lib/pace.ts` constrói outra sequência via `courseUnits(...)`.

**Impacto:** dois botões com intenção parecida podem abrir passos diferentes; a pessoa precisa compreender a arquitetura interna do app para saber qual é o próximo item.

**Correção:** centralizar uma máquina de estados da aprendizagem e uma função `getContinueTarget(progress)`, usada por todo botão principal. A home precisa ter uma única ação primária: “Continuar — [etapa atual]”. “Explorar estudos” fica como ação secundária.

### A-02 — “Aprender” é explicitamente uma versão curta separada do texto completo (P0)

**Evidência:** `src/content/types.ts` define `SimpleSection` como 4–7 páginas curtas, uma ideia por página; `src/pages/Learn.tsx` apresenta essas páginas, depois “Palavras novas”, três verificações e uma tela final; o texto completo está em outra rota e é rotulado “mais difícil”. `src/test/content.test.ts` reforça limites de 4–7 páginas e até 70 palavras por página.

**Impacto:** o modelo testa a forma “resumo curto + material completo à parte”, que o usuário rejeita. Além disso, uma sequência longa pode ficar sem verificações até o final.

**Correção:** um único conteúdo canônico estruturado em microetapas, não dois conteúdos paralelos. Cada etapa revela uma explicação, um exemplo e uma checagem imediata; os detalhes completos continuam a ser ensinados, só que progressivamente. O livro de referência e o curso interativo devem consumir os mesmos blocos, sem duplicar a matéria.

### A-03 — A correção pedagógica não acontece a cada novo conceito (P0)

**Evidência:** as checagens `simple.checks` são agrupadas em uma página “Você entendeu?” ao final de `LearnPage`; são verdadeiro/falso. `PracticePage` usa uma fila posterior à leitura.

**Impacto:** a pessoa pode seguir acumulando conceitos sem evidência de que entendeu. Só descobre a lacuna depois de várias ideias.

**Correção:** inserir miniavaliação após cada microetapa. Em caso de erro, interromper o avanço opcionalmente de acordo com criticidade do conceito, explicar por que as outras respostas não servem, oferecer pista gradual e propor outra questão equivalente com dados diferentes.

### A-04 — O leitor do livro permite rolagem vertical dentro da página (P0)

**Evidência:** `src/components/LeatherBook.tsx`, componente `Leaf`, usa `overflow-y-auto overscroll-contain` na área de conteúdo, embora comentários e decisões de produto declarem “sem rolagem vertical”. `src/lib/book.ts` também diz que blocos maiores que a página ocupam uma página com rolagem interna.

**Impacto:** quebra a metáfora física do livro e faz uma tabela ou parágrafo parecer uma área de rolagem dentro da folha.

**Correção:** não apenas remover o CSS de rolagem. Refazer a distribuição por altura real, dividir blocos permitidos em subblocos sem perder sentido, quebrar tabelas por linhas com cabeçalhos repetidos, colocar código em páginas consecutivas com numeração e oferecer zoom/acessibilidade. Se um bloco for indivisível, ele não deve exceder a área útil: deve virar objeto expandível de leitura em tela própria ou modo “texto acessível”, sem rolagem aninhada no fólio.

### A-05 — Estado da missão não é persistido passo a passo (P0)

**Evidência:** `src/pages/Mission.tsx` inicia `step` em `'cena'`, `di`, `li`, `queue`, `firstTry` e `errors` em estado local do componente. A conclusão é persistida por `completeMission`, mas os passos intermediários não aparecem salvos no estado de estudo.

**Impacto:** se a pessoa sair no laboratório, voltar para a home ou o app recarregar, a missão pode reabrir do começo, embora o comentário prometa voltar à missão. Isso é diferente de “continuar exatamente onde parei”.

**Correção:** persistir checkpoint por usuário/visitante: missão, passo, índice da descoberta, tarefa do laboratório, fila de treino, tentativas e roteiro da cena. Recuperar checkpoint ao montar; permitir “retomar” e “reiniciar” sem sobrescrever progresso. Sync deve ser idempotente e compatível com o merge atual.

### A-06 — Atividades padrão variam pouco e podem concentrar verdadeiro/falso (P1)

**Evidência:** `src/lib/practice.ts` possui apenas `tf`, `blank`, `term`, `pairs`, `mcq`. No aquecimento, adiciona duas checagens `tf` seguidas; em seguida acrescenta uma lista de tipos mistos. O motor de missões `src/lib/activities.ts` já tem tipos mais ricos (`multi`, `order`, `sort`, `compare`, `fix`), mas as regras de diversidade estão nesse motor e não parecem governar a prática padrão.

**Impacto:** o curso ordinário não herda o repertório e as garantias de variedade do motor de missão. Repetir o mesmo padrão pode transformar a prática em adivinhação, em vez de aplicação.

**Correção:** unificar ou compartilhar tipos de atividade e validadores; limitar sequências repetidas; controlar proporção de V/F; adicionar casos práticos, interpretação de telas/tabelas, sequência de processos, detecção de erro, decisão de comando e simulação com feedback.

### A-07 — Testes verificam formato, não a qualidade pedagógica real (P1)

**Evidência:** `src/test/content.test.ts` verifica presença de cena, quantidade de páginas, limite de palavras, vocabulário e número de verificações. Não garante que toda verificação apareça após o conceito correspondente, que os exemplos subam de dificuldade gradualmente ou que as alternativas erradas sejam plausíveis e diagnósticas.

**Impacto:** conteúdo pode satisfazer as regras estruturais e continuar difícil, confuso ou artificial.

**Correção:** acrescentar schema de microetapas e métricas de cobertura pedagógica; testes de progressão, diversidade, feedback por resposta e ausência de conceitos não ensinados antes de cobrar. Acrescentar revisão editorial humana por lotes, com estado visível.

### A-08 — A página inicial tem caminhos concorrentes e muita informação concorrente (P1)

**Evidência:** a Dashboard apresenta “Começar”, cartão de ritmo com “Próxima”, bloco de meta, missões, estatísticas, atalhos, fato diário, conta visitante, download e domínio por disciplina; o layout adiciona o botão global Continuar.

**Impacto:** múltiplos CTAs podem contradizer-se e a home vira painel de funcionalidades, não uma orientação clara.

**Correção:** hierarquia: (1) retomar o exato passo atual, (2) progresso de hoje, (3) plano compacto, (4) acesso à página Estudos. A missão narrativa aparece como recomendação opcional quando ela for o próximo passo real da trilha.

### A-09 — A missão 3D não substitui uma videoaula explicativa (P1)

**Evidência:** `src/components/scene/Scene3D.tsx` implementa cenas com personagens, câmera, luzes, legendas e falas; é um recurso narrativo para missão SQL, não um catálogo geral de explicação docente. O repositório não mostra uma central de player educacional com metadados, transcrição e incorporação YouTube.

**Impacto:** o estudante não tem uma sala de Estudos com modalidades claras (aula micro, exercício rápido, livro de referência, vídeo externo).

**Correção:** uma página Estudos com cards consistentes. Vídeos incorporados apenas quando realmente ajudam o objetivo, com título, canal/autor, duração, idioma, legenda/transcrição, fonte, data de verificação e alternativa textual. Não obrigar a assistir vídeo para concluir a trilha.

### A-10 — Documentação do próprio repositório diverge (P1)

**Evidência:** `docs/PROJECT_STATUS.md` tem cabeçalho de 17/10/2026 e descreve 6 tabelas e partes como não iniciadas; a auditoria e testes de 23/10 descrevem recursos mais novos e 10 tabelas. `docs/ROADMAP.md` lista próximos passos que parecem conflitar com recursos recentes. Também há medidas de bundle diferentes em documentos (660 kB versus 2,4 MB), sem esclarecer se medem arquivo, chunk, raw ou gzip.

**Impacto:** Claude pode implementar duplicado, remover recursos existentes ou estimar incorretamente a regressão.

**Correção:** no início, validar a branch e atualizar status/roadmap/handoff. O CI passa a anexar relatório datado de testes, build, chunks e screenshots.

## 4. Outras áreas que exigem inspeção

- Erros de clique, alinhamento, estados desabilitados e navegação de retorno precisam ser confirmados visualmente em aparelho. Não declaro todos como bugs confirmados sem executar a interface.
- O bloco “Continue” em desktop e navegação inferior móvel são responsivos alternativos; devem se comportar como o mesmo destino e a mesma fonte de verdade.
- Verificar modo de página dupla, zoom/tamanho de fonte e páginas com tabela/código/lista longa, porque a paginação depende de alturas medidas.
- Verificar sincronização real Supabase/Auth e instalação APK em aparelho: a própria documentação registra que a rede local não testou esses fluxos ponta a ponta.
- Verificar bundle: documentação do projeto aponta um alerta de chunk >500 kB e outro documento mede cerca de 2,4 MB; medir com build reproduzível.

## 5. Ordem de prioridade

**P0 — impedir perda e desorientação:** trilha única, checkpoint persistente, livro sem rolagem interna, sequência microaprendizagem.

**P1 — garantir aprendizagem:** motor de atividades, feedback adaptativo, auditoria editorial, página Estudos, alinhamento responsivo.

**P2 — enriquecer sem criar dívida:** vídeo externo curado, recursos audiovisuais, polimento de imersão, otimização de bundle, expansão da narrativa.

## 6. Critério global de sucesso

A pessoa abre o app e vê uma ação primária com o ponto exato salvo. Aprende uma ideia por vez, verifica a compreensão antes de avançar, recebe uma explicação específica ao errar e pode sair/voltar sem perder o estado. A tela não exige procurar a cena ou mudar de seção; o livro não tem rolagem interna; as telas respeitam grade e alinhamento em 390×844, 768×1024 e 1280×800; todos os controles têm comportamento, rótulo e estado testados; conteúdo e fontes têm rastreabilidade.


## 7. Inventário de telas e estado de sessão

A aplicação declara rotas para Dashboard, biblioteca/grimórios/livro, Aprender, Prática, Lição, Missão, Treino, Plano, Revisão, Histórico, Progresso, Edital, Conta, Reino, Personagem, Flashcards, Rodada relâmpago, Diário, Simulado, Estudo de caso e Download. O inventário detalhado está em `17_INVENTARIO_TELAS_E_COMPONENTES.md`.

Além da missão, várias sessões interativas guardam índice/fila/respostas parciais em `useState`: `LessonPage` mantém a fase e os resultados locais; `PracticePage` mantém fila, fase, valor e veredicto locais; `ReviewPage` mantém a fila congelada, índice e contador da sessão locais; `FlashcardsPage` mantém fila, cartão revelado e progresso locais; `BlitzPage` mantém índice, sequência e resultado locais. Isso não prova que toda resposta registrada se perca — algumas respostas são gravadas no `StudyData` —, mas significa que o **checkpoint de sessão exato** não está modelado de forma durável e deve ser coberto por testes de sair/voltar/recarregar.

Também foram observados fallbacks de interface que merecem padronização: `AccountPage` retorna um parágrafo simples quando o Supabase não está configurado, e a rota curinga mostra apenas “Página não encontrada.” sem ação explícita para voltar à trilha. São itens de prioridade secundária quando comparados a retomada e pedagogia, porém contam para a consistência de tela.
