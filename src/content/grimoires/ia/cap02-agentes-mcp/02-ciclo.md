### Da pesquisa em ciclos ao fluxo de desenvolvimento

Em 2022, o artigo ReAct estudou a alternância entre raciocínio, ações e observações de fontes externas. O ciclo de desenvolvimento agentivo deste capítulo usa uma ideia semelhante, organizada em quatro fases práticas: contexto, planejamento, execução e verificação. Não se deve atribuir essas quatro fases ao artigo; ele é uma referência histórica para a combinação de raciocínio e ação, enquanto o ciclo do edital é um procedimento de trabalho.

Fonte: [ReAct: Synergizing Reasoning and Acting in Language Models (2022)](https://arxiv.org/abs/2210.03629).

O edital descreve o **ciclo agentivo de desenvolvimento** em quatro fases. Elas se repetem até a tarefa ficar pronta.

```
1. Descoberta e coleta de contexto
   ▼
2. Planejamento e tomada de decisão
   ▼
3. Execução de ações (arquivos e shell)
   ▼
4. Verificação e autocorreção
   ▼
volta a 1 ou 2 se algo falhou
```

### 1. Descoberta e coleta de contexto

O agente investiga antes de alterar: lê a estrutura de pastas, procura arquivos relacionados, lê instruções do projeto, examina testes existentes e o histórico do git. Um agente que começa a escrever sem essa etapa tende a duplicar código ou quebrar convenções.

### 2. Planejamento e tomada de decisão

Com o contexto em mãos, o agente divide o objetivo em passos, escolhe onde mexer e em que ordem. Em tarefas grandes, muitas ferramentas oferecem um **modo de planejamento**, em que o agente apresenta o plano e só executa depois da aprovação humana.

### 3. Execução de ações

O agente edita arquivos e executa **comandos de shell**: instalar dependências, rodar o build, chamar o git. Por isso as permissões importam. Boas práticas:

- conceder o mínimo necessário (**princípio do menor privilégio**);
- exigir confirmação para ações destrutivas ou externas (apagar arquivos, publicar, enviar dados);
- executar em ambiente isolado (*sandbox*, container) quando possível;
- nunca expor credenciais ao agente sem necessidade.

### 4. Verificação autônoma e autocorreção

Depois de agir, o agente **verifica** o resultado com evidências objetivas: compila, roda os testes, executa o linter, lê a mensagem de erro. Se algo falha, ele analisa a causa, corrige e verifica de novo. Esse laço de corrigir os próprios erros a partir do retorno das ferramentas é o que o edital chama de **mecanismos de autocorreção** (*self-healing*).

A verificação só é tão boa quanto os testes disponíveis. Se não há teste para um comportamento, o agente não tem como saber que o quebrou. Daí a importância de pedir ao agente que **escreva testes** junto com o código.

### Exemplo de ciclo

Tarefa: "o cálculo de dias até a prova está errado".

1. **Contexto**: o agente procura a função de datas, lê o componente que a usa e o teste correspondente.
2. **Plano**: identifica que a data é comparada em UTC e não no fuso de Brasília; decide corrigir a conversão e acrescentar um teste.
3. **Ação**: edita a função e escreve o teste com um horário próximo da meia-noite.
4. **Verificação**: roda a suíte; um teste antigo falha; o agente lê o erro, ajusta e roda de novo até tudo passar.

### Onde entra o humano

O agente acelera, mas a responsabilidade continua com quem aprova. Revisar o *diff*, conferir se os testes realmente cobrem o pedido e decidir sobre ações irreversíveis são tarefas humanas. Em terminologia de prova: *human-in-the-loop* (humano no laço de decisão).
