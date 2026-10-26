# Matriz de prioridade e definição de pronto

## P0 — Corrigir antes de expandir

| ID | Problema | Evidência | Resultado esperado |
|---|---|---|---|
| P0-01 | Fontes diferentes decidem próximo passo | Dashboard, `useNextActivity`, `courseUnits` | Um único checkpoint e destino |
| P0-02 | Checkpoint intermediário não é durável | estado local em `MissionPage` | Retomar em qualquer etapa da missão |
| P0-03 | Conteúdo “simples” separado do completo | `SimpleSection` + tela “texto completo” | Uma fonte canônica entregue aos poucos |
| P0-04 | Checagem só no fim | `LearnPage` agrupa `checks` | Checagem após cada microetapa |
| P0-05 | Rolagem interna no livro | `Leaf` usa `overflow-y-auto` | Cada folha cabe ou usa modo acessível explícito |

## P1 — Consolidar o ensino e a interface

| ID | Problema | Resultado esperado |
|---|---|---|
| P1-01 | Prática comum com cinco famílias | Biblioteca de atividades variada, compartilhada e testada |
| P1-02 | Erro volta à fila sem adaptação adequada | Pista, explicação de confusão e item equivalente |
| P1-03 | Home carregada e CTA concorrentes | Uma hierarquia principal de ação e atalhos secundários |
| P1-04 | Testes estruturais confundidos com qualidade editorial | Métricas de progressão, cobertura e revisão humana |
| P1-05 | Falta uma central de modalidades de estudo | Página Estudos com objetivos e fluxos distintos |
| P1-06 | Contradição entre documentos | Status, handoff, roadmap e teste atualizados juntos |

## P2 — Melhorar a experiência sem prejudicar estudo

| ID | Problema | Resultado esperado |
|---|---|---|
| P2-01 | Falta player de vídeo curado | Embed sob demanda + transcrição + fallback |
| P2-02 | Identidade medieval precisa de polimento | Materiais e iluminação realistas com sistema de tokens |
| P2-03 | Áudio não está separado por preferência | Música/lareira e volume independentes |
| P2-04 | Bundle precisa de métrica consistente | Code splitting e relatório raw/gzip |
| P2-05 | Acessibilidade e dispositivos externos incompletos | testes mobile/teclado/leitor de tela/APK |

## Definição de pronto para qualquer ticket

- O comportamento foi descrito antes da implementação.
- O código atende o critério funcional/visual.
- Teste de regressão foi adicionado ou atualizado.
- Testes/build executados e resultado registrado.
- Persistência e IDs preservados.
- Capturas verificadas para mudanças de layout.
- Documentação e handoff atualizados.
- Nenhuma limitação é escondida sob “concluído”.
