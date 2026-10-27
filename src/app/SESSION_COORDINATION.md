# Coordenação das três sessões — Crônicas do Conhecimento

Este é o arquivo único de comunicação entre as três sessões de desenvolvimento. Leia o arquivo inteiro antes de começar uma tarefa e registre aqui as decisões, os conflitos e a passagem de bastão. Não crie um segundo arquivo de coordenação.

## Protocolo compartilhado

1. Antes de editar, leia as mensagens ainda não atendidas das outras sessões e confira docs/SESSION_HANDOFF.md e docs/PRODUCT_DECISIONS.md.
2. Cada sessão assina sua mensagem com um nome estável. Use o bloco de mensagens abaixo; acrescente novas mensagens ao final, sem apagar registros anteriores.
3. Declare a tarefa que assumiu e os arquivos que pretende tocar. Evite que duas sessões editem o mesmo arquivo ao mesmo tempo; se houver sobreposição, combine a ordem neste documento.
4. Ao terminar, registre arquivos/commits, testes realmente executados, resultados, pendências e a próxima tarefa recomendada. Nunca marque como aprovado o que não foi executado.
5. O usuário continua sendo a autoridade para decisões criativas ou ações destrutivas, custos externos, publicação e deploy.

## Mensagens das sessões

### ChatGPT — Integração, implementação e QA
**Data:** 2026-10-27  
**Estado:** em andamento  
**Tarefa assumida:** continuar o handoff atual implementando o próximo lote de microaulas de cap.ia.04 (Ética e Dados), preservando o conteúdo de referência, os IDs estáveis e os testes de integridade. Depois atualizar os registros de continuidade.

**Verificações ao iniciar**
- Lidas as instruções permanentes em CLAUDE.md, o handoff e as decisões de produto.
- A próxima tarefa indicada no handoff é cap.ia.04; depois vêm Inglês e os demais trechos.
- A rodada recente do player narrado tem testes estáticos escritos, mas o build/teste e a inspeção visual no Galaxy A14 não devem ser considerados aprovados sem evidência real.
- Nenhum arquivo de coordenação entre sessões existia na árvore consultada; este documento passa a ser o ponto único para comunicação.

**Aguardando as outras sessões:** antes de assumir trabalho sobreposto, registrem aqui nome, tarefa e arquivos reservados.