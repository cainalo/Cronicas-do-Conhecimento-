# Arquitetura de navegação: uma única trilha e retomada exata

## Problema verificado

O “próximo passo” nasce de várias regras: recomendação geral (`recommend`), plano do dia (`usePlanOfToday`), progresso até o exame (`courseUnits`/`computePace`) e ações locais de telas. A Dashboard oferece “Começar”, a meta oferece “Próxima” e o layout mostra “Continuar”. Isso cria mais de uma autoridade sobre a ordem de estudo.

Além disso, `MissionPage` guarda passo, descoberta, tarefa do laboratório, fila, tentativas e erros em estado React local. Concluir a missão é persistido, mas o estado intermediário não é suficiente para retomar com precisão.

## Modelo recomendado

Criar um modelo explícito de unidade de aprendizagem, por exemplo:

- `courseId`, `chapterId`, `sectionId`, `unitId`;
- `stage`: orientação, explicação, checagem, recuperação, prática cumulativa, síntese ou revisão;
- `microStepId` e `activityId`;
- `attemptCount`, respostas necessárias para feedback e etapa de recuperação;
- `sceneStatus` (não iniciada, iniciada, concluída ou pulada);
- `mediaStatus` opcional (não iniciado, em andamento, concluído) e `lastPosition` quando necessário;
- `updatedAt`, versão do schema e origem visitante/usuário.

Não persistir toda variável efêmera de UI; persistir o mínimo necessário para que a pessoa retome no mesmo passo e a atividade possa ser reconstituída sem ambiguidade.

## Autoridade única

Criar uma função/serviço puro, testável, que derive:

1. próxima etapa disponível;
2. destino e rótulo do botão primário;
3. se a unidade foi concluída;
4. se há reforço ou revisão vencida;
5. o que mostrar no cartão de progresso;
6. o destino de continuar após recarregar.

O nome pode ser `getLearningCheckpoint()` ou equivalente. Não copiar algoritmos em várias páginas. Dashboard, cabeçalho, botão inferior, planejamento diário e resumo final devem chamar a mesma fonte de verdade.

## Sequência pedagógica por unidade

Uma trilha coerente não significa “toda página deve contar a história do RPG”. Significa que a ordem de aprendizagem é sempre clara. A unidade pode ter:

1. Abertura: cena narrativa curta **ou** quadro de professor/problema visual.
2. Uma microexplicação.
3. Checagem imediata.
4. Feedback e recuperação se necessário.
5. Próxima microexplicação e checagem.
6. Prática cumulativa, com formatos variados.
7. Questão de prova quando os pré-requisitos tiverem sido cobertos.
8. Síntese, próximos passos e revisão agendada.

A história é uma camada de contexto; o núcleo didático deve continuar inteligível sem ela.

## Requisitos do botão “Continuar”

- Só uma ação visual primária na home.
- Rótulo: `Continuar` + contexto pequeno, por exemplo, “Etapa 3 de 8 — distinguir programa de processo”.
- O botão abre a etapa salva, não o começo genérico da seção.
- Após concluir, segue para a próxima unidade definida pela trilha central.
- Se não existir progresso, inicia o primeiro passo recomendado do curso e mostra que está começando do zero.
- Reiniciar uma unidade exige ação secundária clara; nunca substituir silenciosamente o checkpoint.
- As versões desktop e móvel do botão devem usar exatamente o mesmo destino.
- Se a sequência mudou após uma atualização, fazer migração de checkpoint com regras explícitas; se a etapa foi removida, abrir o fallback mais próximo com explicação.

## Persistência e sincronização

- Visitante: checkpoint no armazenamento local, namespaced pelo dono, sem mistura entre perfis.
- Usuário autenticado: sincronizar com o mecanismo local-first já existente, respeitando idempotência e merge determinístico.
- Ao migrar visitante → conta, unir progresso e checkpoint sem duplicar XP, tentativas ou conclusões.
- Offline: retomar localmente e enviar pendências ao voltar a rede.
- Falha de sync: não remover o checkpoint local; indicar estado sem interromper a lição.
- Versionar o schema do checkpoint; testar checkpoints antigos e incompletos.

## Testes mínimos

1. Começar uma microaula, responder uma questão, fechar/atualizar e continuar no mesmo conceito/atividade.
2. Errar, ver feedback, selecionar “reforçar” e sair; ao voltar, persistir a etapa de recuperação.
3. Sair de cena 3D, descoberta, laboratório e treino da missão SQL; retomar exatamente a parte em que estava.
4. Completar uma unidade e garantir que header, Dashboard e plano apontam ao mesmo próximo passo.
5. Verificar ausência de duplicação após sincronização em dois dispositivos.
6. Sem histórico, todos os botões principais levam ao mesmo primeiro passo.
7. Completar a unidade em outra rota e confirmar que o botão não continua oferecendo item já concluído.
