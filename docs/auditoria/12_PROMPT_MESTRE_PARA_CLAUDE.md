# PROMPT MESTRE — corrigir Crônicas do Conhecimento com auditoria completa

Você vai atuar como engenheiro de software sênior, designer de produto educacional, especialista em UI/UX e arquiteto de aprendizagem. Trabalhe diretamente no repositório existente, mantendo o que já funciona e corrigindo os problemas descritos neste pacote. Leia primeiro `00_INSTRUCOES_PARA_CLAUDE.md` e `01_RELATORIO_MESTRE.md`, depois a documentação temática necessária.

## Contexto e objetivo

O projeto é o Crônicas do Conhecimento, uma plataforma gamificada de estudo para concurso de TI, com identidade medieval, trilha, grimórios, atividades, missão 3D SQL, Supabase e aplicativo Android/Capacitor. O usuário diz que o app já é interessante, mas o conteúdo está desequilibrado, difícil de entender em temas como processos de Linux/Windows, navegação confusa, ações “Começar/Continuar/Próxima” semelhantes e uma experiência de livro com rolagem interna que parece errada. Quer ensino de professor, gradual, completo e com verificação imediata; uma trilha com ordem única; uma página Estudos; design alinhado e mais realista; som e imagens controlados; vídeo externo incorporado quando útil.

O problema não se resolve criando mais um resumo e deixando o texto completo separado. O sistema deve ensinar **todo o conteúdo necessário** em uma sequência de pequenos blocos, verificando a compreensão no caminho e reutilizando os mesmos blocos para o material de referência.

## Repositório alvo

Confirme a branch `claude/cronicas-conhecimento-estudos-jgbofo` e o commit-base observado `be2ece0059622aeb00bdd3fa638b60cb13eb7fdd`. A branch `main` pode conter só um README. Não sobrescreva a branch de implementação por engano.

## Antes de mudar qualquer coisa

1. Inspecione `git status`, árvore, branches e commit atual.
2. Leia `CLAUDE.md`, `docs/SESSION_HANDOFF.md`, `docs/PROJECT_STATUS.md`, `docs/ROADMAP.md`, `docs/PRODUCT_DECISIONS.md`, `docs/OPEN_QUESTIONS.md`, `docs/TESTING.md` e este pacote.
3. Rode `npm ci`, `npm test` e `npm run build`. Registre os números e falhas; não escreva “passou” sem executar.
4. Recalcule métricas atuais de capítulos, seções, lições, atividades, tipos de exercício, fontes, status editoriais e tamanho de bundle (raw e gzip). Resolva a divergência de documentos antigos.
5. Faça screenshots nas resoluções 390×844 e 1280×800, no mínimo.
6. Inspecione persistência local, merge visitante→conta, Supabase, rotas e IDs antes de alterar modelos.

## Regras de preservação

- Não fazer reset de banco nem migrations destrutivas.
- Preservar IDs estáveis, dados dos usuários, tentativas, XP, progresso, bookmarks, histórico, perfis e sincronização.
- Não mover secrets ao client nem incluir `service_role`.
- Não rotular autoral como oficial. Preservar TCE-GO 2026, Técnico TI B02/FCC, salvo decisão explícita diferente no próprio repositório.
- Não remover Capacitor/APK, modo visitante, tema medieval, progresso local ou recurso funcional sem motivo documentado.
- Não introduzir serviços pagos, vídeo ou áudio autoplay; toda mídia precisa de fallback.
- Não fazer mega-refatoração sem etapas e sem testes.

## Requisitos funcionais inegociáveis

### 1. Uma trilha e um botão Continuar

Implementar uma fonte de verdade para a sequência. O header, a home, o plano e o botão inferior têm de calcular o mesmo destino usando o checkpoint salvo. Na home, a ação mais importante é “Continuar” com contexto do passo; se nunca iniciou, vira “Começar”. Não deixar “Começar”, “Próxima” e “Continuar” abrirem três unidades distintas. A pessoa não pode precisar procurar em outra página uma cena que deveria anteceder a atividade.

### 2. Progresso exato e persistente

Salvar o ponto exato da lição, microetapa, questão, estado da tentativa, recuperação e etapa de missão. `MissionPage` não pode voltar ao início ao remontar se o usuário estava no laboratório ou treino. Persistir localmente e sincronizar seguindo a arquitetura atual, com versionamento, merge idempotente e opção consciente de reiniciar. Cobrir visitante→conta, offline, falha e retomada depois de atualizar a página em Missão, Lição, Prática, Revisão, Flashcards e Rodada relâmpago.

### 3. Pedagogia: currículo completo em microetapas

Eliminar a arquitetura de “texto simples curto” versus “texto completo separado” como duas versões independentes. Definir blocos canônicos estruturados por objetivo e pré-requisito. Cada microetapa deve ter:

- objetivo ou pergunta curta;
- explicação com termos definidos imediatamente;
- analogia quando realmente ajuda;
- exemplo trabalhado;
- checagem imediata do conceito recém-ensinado;
- explicação específica das alternativas;
- se houver erro, pista gradual e exercício equivalente;
- avanço somente depois da checagem conforme criticidade;
- revisão cumulativa e síntese ao fim da unidade.

Não despejar capítulos longos de uma vez; não truncar conteúdo só para cumprir limite de palavras. Ensinar de forma calma, progressiva e completa. Variar o formato de explicação e evitar prosa repetitiva, genérica ou mecânica.

### 4. Atividades

Compartilhar motor/schema/validador entre prática comum e missões quando isso for seguro. As atividades podem incluir escolha, múltipla seleção, pares, lacuna, ordenar, classificar, comparar cenários, depuração, interpretar tabela/log, prever saída de comando, laboratório e questão de concurso. Não obrigar todas em cada lição; evitar repetições extensas de V/F. Garantir que a pergunta cobre somente o que já foi ensinado ou esteja marcada como diagnóstico. Um erro não deve apenas reenfileirar a mesma pergunta sem pista ou mudança didática.

### 5. Livro sem rolagem dentro do fólio

Corrigir `Leaf`/`LeatherBook` e `paginate`. O requisito não é esconder a barra: é fazer cada folha caber em seu espaço. Quebrar tabelas por linha com cabeçalho repetido, listas e código de forma semanticamente válida; recalcular ao aumentar fonte; evitar título solto, conteúdo cortado e rodapé sobreposto. Uma página dupla desktop e página única móvel têm que permanecer equilibradas. Oferecer modo de leitura acessível fora da metáfora do livro para conteúdo difícil de paginar.

### 6. Página Estudos

Criar rota e navegação “Estudos” com cards consistentes para: Continuar a trilha, Biblioteca/Grimórios, Atividades rápidas, Videoaulas, Revisão inteligente e Materiais externos. Cada card deve explicar sua finalidade e abrir o fluxo correto. Não competir com o botão principal da home.

### 7. Vídeos e cenas

Permitir embed de YouTube com player responsivo, carregado sob demanda, título/autor/duração/idioma quando confirmados, legendas ou transcrição, fallback se indisponível e botão para abrir o original. Não autoplay. Não inventar título/duração/fonte. A cena 3D narrativa existe e pode permanecer, mas não é uma videoaula docente. Diferenciar `storyScene`, microaula visual, diagrama e `videoEmbed`. Muitas etapas podem ser somente professor + exemplo interativo.

### 8. Design e simetria

Construir sistema de design por tokens para verde profundo, carvão, pergaminho e bronze, materiais medievais com texturas realistas discretas, tipografia de título medieval e texto corrido legível. Usar grade e espaçamento consistentes. Centralizar títulos, cartões, textos e botões; nada desalinhado; não criar vazios artificiais; tables sem scroll desnecessário; sem texto cortado. Preservar controles de áudio independentes e acessíveis, respeitar reduzir movimento e não iniciar som sozinho.

### 9. Fallbacks e rotas de erro

Padronizar estados de erro e backend ausente. A página de Conta sem Supabase precisa manter o cabeçalho, explicar claramente o modo local e dar ação de retorno; a rota desconhecida precisa mostrar a identidade visual do app e oferecer “Voltar à trilha” e “Abrir Estudos/Biblioteca”. Não deixar fallbacks como parágrafos soltos fora do sistema de layout.

### 10. Conteúdo confiável

Revisar todos os temas quanto a progressão, comandos, siglas, exemplos, questões, feedback, fontes e status editorial. Gerar relatórios de extremos de tamanho/densidade e revisão manual por lote. Não afirmar cobertura profunda quando há somente panorama e não marcar material como validado sem comprovação.

## Ordem de execução obrigatória

Siga exatamente `09_ROADMAP_FASEADO.md` e o backlog. Comece pelo checkpoint único; implemente e teste um piloto em “Processos, memória e serviços” (`cap.infra.03`, seção `processos`) antes de migrar toda a matéria. Use `13_EXEMPLO_AULA_MODELO_LINUX_PROCESSOS.md` como referência. Não investir primeiro em mais cenas, vídeos ou animações.

## Testes e entrega

- Acrescentar testes de unidade, fluxo, conteúdo e visual.
- Fazer o checklist `11_CHECKLIST_QA_MANUAL.md` nas resoluções indicadas.
- Testar no mínimo: home sem progresso, retomar após recarregar, erro e recuperação, sair no meio da missão, livro com tabelas longas, fonte ampliada, vídeo offline, visitante→conta e plano vs. home.
- Rodar `npm test` e `npm run build` após cada fatia.
- Atualizar documentação e descrever exatamente: arquivos alterados, migrations (se houver), teste executado e resultado real, limites ainda pendentes e passos para teste manual.
- Não declarar concluído o que não foi exercitado.

**Comece pela inspeção e baseline, depois implemente a Fase 1 e o piloto. Não faça perguntas que já têm resposta neste pacote. Se encontrar conflito, preserve dados e descreva a decisão reversível nos docs.**
