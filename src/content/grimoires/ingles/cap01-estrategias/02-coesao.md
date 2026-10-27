### Contexto histórico

Em 1976, M. A. K. Halliday e Ruqaiya Hasan publicaram *Cohesion in English*, obra que sistematizou o estudo de relações entre frases, incluindo referência, repetição lexical e conjunções como *but* e *so*. O livro não inventou os conectivos; oferece uma descrição influente de como palavras e estruturas ligam partes de um texto. Essa perspectiva ajuda a ler documentação técnica sem traduzir frases como unidades isoladas: é necessário identificar se uma expressão acrescenta informação, contrasta, explica uma causa ou estabelece uma condição. Fonte bibliográfica: [Routledge — Cohesion in English](https://www.routledge.com/Cohesion-in-English/Hallidayah2-Hasanah2/p/book/9780582550414).

Boa parte das questões de leitura depende de duas peças pequenas: os **marcadores de discurso** (conectivos), que dizem como uma ideia se relaciona com a outra, e as **referências**, que retomam algo já dito. Errar um *however* ou o antecedente de um *it* basta para inverter o sentido de um parágrafo.

### Marcadores de discurso

| Relação | Conectivos | Tradução usual |
|---|---|---|
| **Contraste** | *however*, *but*, *yet*, *nevertheless*, *nonetheless*, *on the other hand* | contudo, porém, no entanto, por outro lado |
| **Concessão** | *although*, *though*, *even though*, *despite*, *in spite of* | embora, ainda que, apesar de |
| **Comparação contrastiva** | *whereas*, *while* | ao passo que, enquanto |
| **Adição** | *moreover*, *furthermore*, *in addition*, *besides*, *also*, *as well as* | além disso, também, assim como |
| **Conclusão / consequência** | *therefore*, *thus*, *hence*, *consequently*, *as a result*, *so* | portanto, assim, por isso, como resultado |
| **Causa** | *because*, *since*, *as*, *due to*, *owing to* | porque, já que, devido a |
| **Condição** | *if*, *unless*, *as long as*, *provided that*, *otherwise* | se, a menos que, desde que, contanto que, caso contrário |
| **Finalidade** | *in order to*, *so that* | a fim de, para que |
| **Exemplificação** | *for example*, *for instance*, *such as* | por exemplo, como |
| **Substituição** | *instead*, *instead of*, *rather than* | em vez disso, em vez de |
| **Tempo** | *meanwhile*, *until*, *once*, *as soon as* | enquanto isso, até, assim que |

Alguns pontos merecem atenção especial:

- ***although*** introduz uma oração inteira (*although the test passed*), ao passo que ***despite*** e ***in spite of*** vêm seguidos de substantivo ou de verbo com *-ing* (*despite the failure*, *despite failing*). O sentido é o mesmo: concessão.
- ***whereas*** compara dois elementos que diferem: *"SQL databases use fixed schemas, whereas many NoSQL databases allow flexible ones"*.
- ***while*** pode indicar tempo ("enquanto") ou contraste ("ao passo que, embora"). Decida pelo contexto.
- ***since*** pode indicar tempo ("desde": *since version 2.0*) ou causa ("já que": *since the token expired, the request failed*).
- ***unless*** equivale a *if not*: *"The job fails unless the file exists"* significa "o processo falha a menos que o arquivo exista", ou seja, se o arquivo não existir, falha.
- ***as long as*** é condição, e não comprimento: *"The cache remains valid as long as the data does not change"* (o cache continua válido desde que, enquanto, os dados não mudem).
- ***otherwise*** indica a consequência do contrário: *"Save your changes; otherwise, they will be lost"* (caso contrário, serão perdidas).

### Como a FCC cobra conectivos

O formato mais comum é "a palavra X, no contexto, pode ser substituída, sem alteração de sentido, por...". Para acertar:

1. Classifique a relação que o conectivo expressa no trecho (contraste, causa, condição...).
2. Procure entre as alternativas outro conectivo da **mesma relação**.
3. Verifique a **estrutura**: *however* fica bem no início da frase seguida de vírgula; *although* exige oração depois; *despite* exige substantivo.

Exemplo autoral: *"The new framework is faster. However, it requires more memory."* Substituto adequado: *nevertheless*. Inadequados: *therefore* (conclusão), *moreover* (adição), *because* (causa).

### Referência pronominal

Pronomes e outras palavras de referência retomam termos anteriores (às vezes posteriores). As perguntas têm o formato "o pronome *it*, na linha X, refere-se a...".

| Palavra | Retoma | Exemplo |
|---|---|---|
| *it* / *its* | singular (coisa) | *The server restarted because its disk was full.* (*its* = do servidor) |
| *they* / *them* / *their* | plural | *Users must update their passwords.* |
| *this* / *that* | uma ideia ou termo próximo | *The log was deleted. This made the audit harder.* (*this* = a exclusão do log) |
| *these* / *those* | plural próximo / distante | *Those who...* (aqueles que...) |
| *which* / *that* (relativo) | o substantivo imediatamente anterior, em geral | *the file which contains the keys* |
| *who* / *whose* | pessoas / posse | *the analyst whose account was locked* |
| *the former* / *the latter* | o primeiro / o último de dois | *Python and Java are popular; the latter is compiled to bytecode.* (= Java) |
| *one* / *ones* | substitui um substantivo já citado | *If the old key expires, create a new one.* |

Técnica: **substitua** o pronome por cada candidato e leia de novo. O candidato correto concorda em número (singular ou plural) e faz sentido. Em *"The client sends the token to the server, which validates it"*, *which* retoma *the server* (quem valida) e *it* retoma *the token* (o que é validado).

### Um texto de treino

*"Although the audit system stores every access attempt, it does not record the content of the documents. Therefore, investigators must combine its logs with other sources. Moreover, logs older than one year are archived, unless a legal hold is active."*

- *Although*: concessão (embora o sistema armazene...).
- *it*, *its*: o sistema de auditoria.
- *Therefore*: conclusão (portanto, os investigadores precisam combinar fontes).
- *Moreover*: adição de nova informação.
- *unless*: os logs com mais de um ano são arquivados, exceto se houver uma retenção legal ativa.

Esse tipo de texto é próximo do dia a dia de um Tribunal de Contas, onde trilhas de auditoria e preservação de evidências são temas constantes.

### Pegadinhas

1. "*Unless* tem o mesmo sentido de *if*." Falso. Equivale a *if not*, "a menos que".
2. "*Whereas* introduz uma conclusão." Falso. Introduz contraste entre dois elementos, "ao passo que".
3. "*Despite* pode ser seguido diretamente de uma oração com sujeito e verbo conjugado." Falso. Pede substantivo ou forma em *-ing*; para oração, usa-se *although*.
4. "Em 'Python and Java are popular; the latter is compiled', *the latter* retoma Java." Verdadeiro. *The latter* é o último de dois.
5. "*As long as* indica comprimento ou duração física." Falso. Na leitura técnica, indica condição: desde que, contanto que.
