# Decisões de arquitetura e riscos de implementação

## 1. Não começar pela reescrita geral

O app já tem IDs estáveis, regras de progressão, armazenamento local, sincronização, conteúdo versionado, testes e build Android. A correção deve ser incremental e compatível; reescrever tudo aumenta o risco de perda de progresso e gera regressão visual.

## 2. Fonte canônica de conteúdo

Definir uma estrutura de conteúdo por conceito, por exemplo:

- metadados: id, disciplina, tópico de edital, revisão e fontes;
- objetivos e pré-requisitos;
- sequência de microetapas;
- conteúdo de cada etapa: explicação, exemplo, figura/diagrama opcional;
- verificação e respostas/feedback;
- recuperação: pista, exemplo menor e item equivalente;
- prática cumulativa;
- síntese e itens de revisão.

A biblioteca e o fluxo interativo devem ler a mesma fonte. No período de migração, usar adaptador para dados antigos e validação que compare IDs antigos/novos; remover o formato legado só após migrar e testar o conteúdo.

## 3. Estado de aprendizagem versus interface

Separar três coisas:

- **Conteúdo estático:** lição, atividades, mídia, fonte e versão.
- **Estado durável de estudo:** checkpoint, respostas, tentativas, conclusão, revisões e preferências.
- **Estado efêmero da UI:** hover, animação corrente, menu aberto, foco do teclado.

Somente o estado necessário para retomar deve ser persistido. A interface reconstrói o resto a partir do checkpoint e conteúdo versionado.

## 4. Banco e compatibilidade

- Investigar se o checkpoint deve entrar na tabela de configurações do usuário já existente ou em nova estrutura. Não criar tabela antes de provar necessidade.
- Se migration for necessária: schema versionado, migração aditiva, rollback documentado, RLS testada, sem reset.
- Garantir que visitantes e usuários autenticados têm namespaces separados e que fusão não duplica XP.
- Testar merge quando duas sessões fizeram progresso divergente.
- Todo dado remoto deve ser considerado não confiável até ser validado no client.

## 5. Livro e paginação

A quebra de página não é apenas CSS. O texto deve ser segmentado por blocos semânticos e medido no mesmo estilo em que é exibido. Tabelas, código e itens de lista precisam de estratégia específica. Evitar heurística baseada apenas na altura aproximada e garantir recalcular quando a tela, orientação ou fonte mudarem.

## 6. Performance

A auditoria existente relata alerta de chunk >500 kB e também cerca de 2,4 MB em um arquivo único; outro status informa ~660 kB. A diferença precisa ser explicada por métricas medidas na branch atual. Fazer carregamento por rota e por grimório; cena 3D e player de vídeo devem ser lazy-loaded. Evitar incluir todos os recursos de áudio/vídeo na carga inicial.

## 7. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Progresso antigo perdido | teste de migração com fixtures reais/anonimizadas e backup; migrations aditivas |
| Conteúdo antigo fica órfão | mapeamento de IDs, verificação de cobertura e adaptador temporal |
| Usuário retoma em passo inválido | versionamento e fallback explícito do checkpoint |
| Paginação corta conteúdo | teste de blocos extremos, fonte ampliada e modo acessível |
| Vídeo desaparece/bloqueia | transcript, fallback e estado indisponível |
| Mudança visual vira reescrita subjetiva | tokens, screenshot baseline e checklist de aceite |
| Testes passam mas ensino continua ruim | revisão humana do piloto e teste de compreensão, além do teste estrutural |
| Conteúdo oficial incorreto | metadados de origem, fonte primária e validação editorial |

## 8. Política de aprovação

Mudanças visuais reversíveis e ajustes de código podem ser decididos pela implementação dentro dos critérios. Operações destrutivas no banco, introdução de custos/serviços externos, publicação/deploy e alterações de identidade/publicação devem respeitar os controles de aprovação definidos no `CLAUDE.md` do projeto.
