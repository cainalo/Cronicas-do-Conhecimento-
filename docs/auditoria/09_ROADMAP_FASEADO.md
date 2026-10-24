# Roadmap de correção por fases

## Fase 0 — baseline verificável

**Objetivo:** descobrir o estado atual antes de tocar no produto.

- Confirmar branch/commit/árvore de trabalho.
- Rodar testes e build; guardar resultados e medidas de bundle.
- Capturar as telas e o livro atual nas resoluções QA.
- Atualizar contradições entre status, handoff e roadmap.
- Inventariar os esquemas de progresso local/Supabase e o checkpoint de missão.

**Aceite:** baseline documentada, sem operações destrutivas e com defeitos reproduzíveis registrados.

## Fase 1 — fonte única da trilha e continuidade

- Definir o objeto central de unidade/etapa/checkpoint.
- Centralizar `next`, `isDone` e destino de Continuar.
- Migrar header, Dashboard, PaceCard e navegação inferior para o destino único.
- Persistir checkpoint da missão e de todas as sessões com índice/fila local: Lição, Prática, Revisão, Flashcards e Rodada relâmpago.
- Tratar migration/versionamento e merge visitante → conta.

**Aceite:** todos os botões concordam e o estudante retoma exatamente o lugar salvo.

## Fase 2 — piloto pedagógico em Sistemas Operacionais

- Usar `cap.infra.03` e seção `processos` como piloto porque o usuário informou que essa matéria está confusa.
- Decompor a seção em conceitos pequenos ordenados por pré-requisito.
- Criar exemplos trabalhados, checagem após cada microetapa, pistas, feedback e questões equivalentes.
- Aplicar a aula sem depender de cena narrativa longa; testar uma microaula do professor como alternativa.
- Fazer avaliação editorial humana antes de declarar modelo aprovado.

**Aceite:** uma pessoa iniciante consegue explicar programa/processo, identificar estado de processo e comparar comandos básicos sem receber tudo em um único bloco. Não avançar pelo curso inteiro se esse piloto falhar.

## Fase 3 — plataforma de microaprendizagem

- Definir schema canônico de conteúdo.
- Atualizar gerador da prática para usar famílias de atividades compartilhadas.
- Aplicar regras de variedade, ordem e reforço.
- Migrar a camada “simple” e o texto completo para uma única fonte estruturada; manter compatibilidade temporária durante a migração.
- Adicionar auditoria automática de anomalias e painel/relatório editorial.

**Aceite:** testes cobrem todas as etapas, checagens, feedback e progressão; não existe duplicação divergente da matéria.

## Fase 4 — livro/códice e layout

- Corrigir paginação para tirar a rolagem interna.
- Testar tabelas e código longos, zoom e fonte ampliada.
- Revisar livro de página simples e dupla, capa, sumário, navegação e modo acessível.
- Criar componentes de layout estáveis e tokens de espaçamento/tipografia.

**Aceite:** o livro não rola dentro da página, conteúdo nunca desaparece e todos os viewports passam a matriz de QA.

## Fase 5 — página Estudos e mídia

- Criar rota e item de navegação Estudos.
- Organizar Continuar, Biblioteca, Atividades rápidas, Videoaulas, Revisão e Materiais externos.
- Implementar player de vídeo como componente lazy-load, com transcrição/fallback.
- Não incluir vídeo sem curadoria ou vídeo que apenas enfeita o card.

**Aceite:** cada card tem uma função distinta, funciona e conduz a um fluxo testado.

## Fase 6 — realismo medieval, áudio e 3D

- Aplicar a paleta tokens definida na decisão atual.
- Corrigir alinhamento, materialidade de couro/pergaminho/pedra, ícones e feedback de controles.
- Melhorar ambiente de áudio e integração com voz/vídeo.
- Otimizar cena e remover carregamento desnecessário.

**Aceite:** capturas visualmente consistentes, legibilidade mantida e nenhum recurso essencial dependente de som/animação.

## Fase 7 — ampliar o conteúdo e validar release

- Aplicar schema e regras editoriais em lotes por disciplina.
- Revisar materiais pendentes e marcar fontes/status.
- Rodar testes de regressão, sincronização externa e APK em dispositivo.
- Atualizar documentação e preparar relatório final do que foi alterado versus o que continua pendente.

**Aceite:** cobertura com estado editorial honesto, release testado e documentação coerente.

## Ordem do backlog

Comece por tarefas P0 em `10_BACKLOG_PRIORIZADO.csv`. Não trocar a ordem para priorizar vídeo, arte ou expansão de gamificação antes de resolver retomada, trilha, pedagogia e livro.
