Modelar dados é decidir **o que** o sistema vai guardar e **como** as informações se relacionam, antes de criar qualquer tabela.

### Como a modelagem de dados surgiu

- **1970: tabelas.** **Edgar F. Codd**, da IBM, propôs o **modelo relacional**: dados guardados em tabelas (relações) ligadas por valores em comum.
- **1971 a 1974: as formas normais.** O próprio Codd definiu a **primeira forma normal** junto com o modelo e, em 1971, a **segunda** e a **terceira**. Em 1974, com **Raymond Boyce**, veio a **forma normal de Boyce-Codd (FNBC)**.
- **1976: o desenho.** **Peter Chen** publicou o **modelo entidade-relacionamento**, com o diagrama de retângulos (entidades), losangos (relacionamentos) e elipses (atributos), para conversar sobre os dados antes de criar as tabelas.

### Modelo entidade-relacionamento (MER)

| Elemento | Significado | Exemplo |
|---|---|---|
| **Entidade** | Algo sobre o qual se guardam dados | Processo, Jurisdicionado, Servidor |
| **Atributo** | Propriedade da entidade | número do processo, data de autuação |
| **Atributo-chave** | Identifica cada ocorrência | CPF, número do processo |
| **Relacionamento** | Associação entre entidades | Servidor *relata* Processo |
| **Cardinalidade** | Quantas ocorrências se associam | 1:1, 1:N, N:M |

Tipos de atributo: **simples** (indivisível), **composto** (endereço = rua, número, cidade), **multivalorado** (vários telefones), **derivado** (idade, calculada da data de nascimento). Uma **entidade fraca** depende de outra para ser identificada (o item de um empenho só existe com o empenho).

### Do modelo conceitual às tabelas

- Relacionamento **1:N**: a chave da entidade do lado "1" vira **chave estrangeira** na tabela do lado "N" (cada processo guarda o código do seu relator).
- Relacionamento **N:M**: cria-se uma **tabela associativa** com as chaves das duas entidades (processo e auditores que nele atuam).
- Atributo multivalorado: vira uma tabela própria.

Chaves no modelo relacional:

| Chave | Definição |
|---|---|
| **Candidata** | Conjunto mínimo de atributos que identifica uma linha de forma única |
| **Primária** | A candidata escolhida como identificador oficial (única e não nula) |
| **Alternativa** | Candidata que não foi escolhida como primária (costuma receber restrição UNIQUE) |
| **Estrangeira** | Atributo que referencia a chave de outra tabela, garantindo a **integridade referencial** |

### Normalização

Normalizar é organizar as tabelas para **eliminar redundância e anomalias** de inserção, atualização e exclusão, com base nas **dependências funcionais** (A → B: o valor de A determina o de B).

| Forma normal | Exigência |
|---|---|
| **1FN** | Atributos **atômicos**: sem grupos repetidos nem atributos multivalorados na mesma coluna. |
| **2FN** | Estar na 1FN e **nenhum atributo não chave depender de só parte** de uma chave composta (sem dependência parcial). |
| **3FN** | Estar na 2FN e **nenhum atributo não chave depender de outro atributo não chave** (sem dependência transitiva). |
| **FNBC** (Boyce-Codd) | Todo **determinante** é chave candidata. Versão mais rigorosa da 3FN. |

**Exemplo.** A tabela `Lancamento(num_empenho, item, descricao_item, cnpj_fornecedor, nome_fornecedor)` com chave `(num_empenho, item)`:

- `nome_fornecedor` depende de `cnpj_fornecedor`, que não é chave: **dependência transitiva** → viola a 3FN. Solução: tabela `Fornecedor(cnpj, nome)`.
- Se `cnpj_fornecedor` dependesse só de `num_empenho` (parte da chave), haveria **dependência parcial** → violaria a 2FN. Solução: levar o fornecedor para a tabela `Empenho`.

Uma forma de lembrar: cada atributo não chave deve depender "da chave, da chave inteira e de nada além da chave".

### Desnormalização

**Desnormalizar** é reintroduzir redundância de propósito para ganhar desempenho em leitura, por exemplo em relatórios e em *data warehouses*, aceitando o custo de manter as cópias consistentes. É uma decisão consciente, não um descuido de modelagem.
