**Engenharia de prompts** é a prática de redigir as instruções dadas ao modelo para obter respostas úteis e previsíveis. Não há mágica: valem as mesmas regras de um bom pedido feito a um colega competente que não conhece o seu projeto.

### Partes de um prompt

- **Prompt de sistema**: instruções gerais que definem papel, regras e tom para toda a conversa. Costuma ser fixado pela aplicação.
- **Prompt do usuário**: o pedido específico daquela interação.
- **Contexto**: documentos, dados ou exemplos que o modelo precisa para responder.
- **Formato de saída**: como a resposta deve vir (lista, tabela, JSON com campos definidos).

### Técnicas cobradas em prova

| Técnica | Como funciona | Quando usar |
|---|---|---|
| *Zero-shot* | Pede-se a tarefa sem exemplos. | Tarefas simples e comuns. |
| *Few-shot* | Incluem-se alguns exemplos de entrada e saída antes do pedido. | Quando o formato ou o critério é específico. |
| Cadeia de pensamento (*chain-of-thought*) | Pede-se que o modelo raciocine passo a passo antes de concluir. | Problemas de várias etapas (cálculo, lógica, depuração). |
| Atribuição de papel | Define-se quem o modelo deve ser ("você é um auditor de TI"). | Ajustar vocabulário e foco. |
| Delimitadores | Separa-se instrução de dado com marcações (aspas triplas, tags). | Evitar que o texto colado seja lido como instrução. |
| Saída estruturada | Exige-se um esquema (por exemplo, JSON Schema). | Quando outro programa vai ler a resposta. |

O termo *few-shot* ganhou destaque com o artigo do GPT-3, *Language Models are Few-Shot Learners* (2020), que mostrou modelos aprendendo uma tarefa só com exemplos no próprio prompt, sem alterar seus pesos. Isso se chama **aprendizado em contexto** (*in-context learning*).

### Boas práticas

1. Diga o objetivo e o motivo, não só a tarefa. "Resuma para um candidato que vai revisar na véspera da prova" orienta melhor que "resuma".
2. Seja específico sobre o resultado: tamanho, público, formato, o que deixar de fora.
3. Dê exemplos quando o padrão for difícil de descrever.
4. Separe com clareza instruções, dados e exemplos.
5. Peça verificação: "se a informação não estiver no texto, diga que não está".
6. Itere: ajuste o prompt a partir das falhas observadas.

### Exemplo

Prompt fraco:

```
Fale sobre o edital.
```

Prompt melhor:

```
Você vai ajudar um candidato ao cargo de Técnico de TI do TCE-GO.
Com base apenas no trecho do edital entre <edital> e </edital>,
liste as disciplinas de Conhecimentos Específicos e o número de
questões de cada uma, em uma tabela. Se algum dado não aparecer
no trecho, escreva "não informado".

<edital>
...
</edital>
```

O segundo define papel, fonte permitida, formato e o que fazer na falta de dado.

### Injeção de prompt

**Injeção de prompt** (*prompt injection*) ocorre quando um texto malicioso faz o modelo ignorar as instruções originais. Ela pode ser:

- **direta**: o próprio usuário escreve algo como "ignore as instruções anteriores";
- **indireta**: a instrução maliciosa está escondida em um conteúdo que o modelo lê, como uma página web, um e-mail ou um arquivo do repositório.

É o primeiro item (LLM01) do *OWASP Top 10 for LLM Applications*. Delimitadores ajudam, mas não resolvem sozinhos. As defesas mais eficazes estão fora do prompt: tratar todo conteúdo externo como dado não confiável, limitar as permissões das ferramentas que o modelo pode acionar e exigir confirmação humana para ações sensíveis.
