A prova de Língua Inglesa do cargo de TI é de **leitura técnica**. O edital pede compreensão de textos técnicos e científicos, identificação da **ideia principal**, **localização de informações específicas**, vocabulário de TI e interpretação de manuais, documentação de software, artigos técnicos e documentação de APIs. As perguntas costumam vir em português, sobre um texto em inglês. Ninguém vai pedir que você escreva em inglês, mas é preciso entender com precisão o que o texto afirma, o que ele apenas sugere e o que ele não diz.

> Nota de fonte: o edital prevê 2 questões de Língua Inglesa (Leitura Técnica) na prova de Conhecimentos Específicos. O formato exato (um texto para as duas questões ou textos separados) só se conhece no dia da prova. Os exemplos deste grimório são autorais.

### Skimming e scanning

São as duas estratégias de leitura que o edital chama de "identificação da ideia principal" e "localização de informações específicas".

| Estratégia | Objetivo | Como fazer | Pergunta típica |
|---|---|---|---|
| **Skimming** | Captar a **ideia geral** | Ler título, primeira e última frase de cada parágrafo, palavras repetidas, tabelas e destaques | "O texto trata principalmente de..." |
| **Scanning** | Achar um **dado pontual** | Procurar com os olhos um número, nome, data, comando ou palavra-chave, sem ler tudo | "Segundo o texto, o limite de requisições é..." |

Procedimento prático para a prova:

1. **Leia a pergunta antes do texto.** Ela diz se você precisa de visão geral (skimming) ou de um detalhe (scanning).
2. **Faça um skimming** de 30 segundos: título, primeira frase de cada parágrafo, conclusão.
3. **Volte ao trecho** que responde a pergunta e leia esse trecho com atenção total.
4. **Desconfie de alternativas** que repetem palavras do texto mas mudam a relação entre elas (quem faz o quê, condição, negação).

### Palavras-chave e tipografia

Em documentação técnica, a informação mais importante costuma estar sinalizada:

- **títulos e subtítulos**: *Installation*, *Usage*, *Configuration*, *Troubleshooting*;
- **avisos**: *Note* (observação), *Tip* (dica), *Important* (importante), *Warning* (aviso de risco), *Caution* (cuidado), *Danger* (perigo);
- **código em fonte monoespaçada**: nomes de comandos, parâmetros e arquivos, que não se traduzem;
- **números e unidades**: *up to 100 requests per minute* (até 100 requisições por minuto), *at least 8 characters* (pelo menos 8 caracteres), *no more than 5 MB* (não mais que 5 MB).

Expressões de quantidade que a banca adora trocar: *at least* (no mínimo), *at most* / *up to* / *no more than* (no máximo), *more than* (mais que, exclusivo), *fewer/less than* (menos que), *approximately* / *roughly* (aproximadamente), *only* (somente), *each* / *every* (cada / todo).

### Cognatos e falsos cognatos

**Cognatos** são palavras parecidas com o português e de mesmo sentido: *system*, *configuration*, *application*, *function*, *parameter*, *security*, *integrity*. Eles aceleram a leitura. Os **falsos cognatos** (*false friends*) parecem uma palavra portuguesa, mas significam outra coisa. Na área de TI, os mais perigosos:

| Palavra | Parece | Significa |
|---|---|---|
| *actually* | atualmente | na verdade, de fato (atualmente = *currently*) |
| *eventually* | eventualmente | por fim, com o tempo, mais cedo ou mais tarde (eventualmente = *occasionally*) |
| *library* | livraria | biblioteca (de código); livraria = *bookstore* |
| *data* | data | dados; data do calendário = *date* |
| *support* | suportar (tolerar) | dar suporte, oferecer compatibilidade (*the API supports JSON*: a API aceita JSON); tolerar = *stand* |
| *assume* | assumir | supor, presumir (*the script assumes Python 3 is installed*) |
| *pretend* | pretender | fingir; pretender, ter a intenção = *intend* |
| *realize* | realizar | perceber, dar-se conta |
| *sensible* / *sensitive* | sensível / sensível | sensato / sensível (*sensitive data*: dados sensíveis) |
| *comprehensive* | compreensivo | abrangente, completo |
| *current* | corrente | atual (*current version*: versão atual) |
| *issue* | (sem par óbvio) | problema, questão; como verbo, emitir (*issue a token*) |
| *record* | recorde | registro (de banco de dados, de log) |
| *prevent* | prevenir (avisar) | impedir, evitar |
| *argument* | argumento (debate) | também argumento de função ou de linha de comando |
| *push* | puxar | empurrar; no Git, enviar commits ao repositório remoto (*pull* = puxar, trazer) |

Exemplo autoral: *"Eventually, all legacy endpoints will be removed. Actually, two of them are already disabled."* Tradução adequada: "Por fim (com o tempo), todos os endpoints legados serão removidos. Na verdade, dois deles já estão desativados." Traduzir *eventually* por "eventualmente" transforma uma certeza em uma possibilidade ocasional, e essa diferença basta para errar a questão.

### Inferência pelo contexto

Quando aparecer uma palavra desconhecida, não pare. Use:

- **a classe da palavra**: depois de *the* vem substantivo; terminação *-ly* sugere advérbio (*securely*: de forma segura);
- **o contraste**: em *"The old method was cumbersome, whereas the new one is simple"*, *cumbersome* se opõe a *simple*, logo significa algo como "complicado, pesado";
- **a definição embutida**: *"Throttling, that is, deliberately slowing down requests, protects the server"* traz o sentido logo depois de *that is*;
- **o exemplo**: *"Use a strong passphrase, such as a sentence with numbers and symbols"*.

A inferência tem limite: a resposta precisa estar **apoiada no texto**. A FCC costuma colocar alternativas verdadeiras no mundo real, mas que o texto não afirma. Se o texto não diz, a alternativa está errada para fins da questão.

### Um texto de treino

*"Version 3 of the payment API introduces asynchronous processing. Requests are now queued and processed in the background, so clients no longer wait for a final answer. Instead, they receive an identifier that can be used to check the status later. Version 2 will be supported until March, after which it will be retired."*

| Pergunta | Estratégia | Resposta |
|---|---|---|
| Ideia principal | skimming | A versão 3 passa a processar requisições de forma assíncrona |
| O que o cliente recebe | scanning | Um identificador para consultar o status depois |
| Até quando vale a versão 2 | scanning | Até março; depois será desativada (*retired*) |
| Sentido de *no longer* | vocabulário | "não mais" |

### Pegadinhas

1. "*Actually* significa atualmente." Falso. Significa "na verdade"; atualmente é *currently*.
2. "*Eventually* indica algo que talvez aconteça de vez em quando." Falso. Indica que algo acontecerá por fim, com o tempo.
3. "No scanning, o leitor percorre o texto em busca de um dado específico, sem ler tudo." Verdadeiro. É a estratégia para localizar informações pontuais.
4. "*Library*, em documentação de software, significa livraria." Falso. Significa biblioteca de código.
5. "Se uma alternativa é tecnicamente verdadeira, ela deve ser marcada mesmo que o texto não a mencione." Falso. A resposta precisa estar apoiada no texto.
