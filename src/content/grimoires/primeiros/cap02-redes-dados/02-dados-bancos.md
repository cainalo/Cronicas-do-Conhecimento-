Um Tribunal de Contas vive de informação: contratos, pagamentos, fornecedores, processos. Essa informação precisa ficar organizada para ser achada e conferida. É para isso que existem os **bancos de dados**.

### Dado e informação

Um **dado** é um registro solto: "1500", "Maria", "10/03/2026". A **informação** surge quando o dado ganha sentido: "Maria recebeu R$ 1.500 em 10/03/2026".

### Banco de dados: o arquivo organizado

Um **banco de dados** é um conjunto de dados guardados de forma organizada, para consultar e atualizar com facilidade. Pense em um grande arquivo de fichas, bem arrumado.

O programa que cuida do banco é o **SGBD** (sistema gerenciador de banco de dados). Exemplos: PostgreSQL, MySQL, Oracle e SQL Server. Ele guarda, procura, controla quem acessa e evita que duas pessoas estraguem o mesmo dado ao mesmo tempo.

### Tabela, linha e coluna

No tipo mais comum, o **banco relacional**, os dados ficam em **tabelas**, parecidas com uma planilha.

- A **tabela** reúne um assunto. Exemplo: a tabela Fornecedores.
- Cada **coluna** é uma característica: CNPJ, nome, cidade.
- Cada **linha** é um registro, um item completo: um fornecedor específico, com seu CNPJ, nome e cidade.

Exemplo: na tabela Contratos, uma linha pode ser o contrato 045/2026, com as colunas número, objeto, valor e fornecedor.

### Chave: a identidade do registro

Uma **chave primária** é a coluna (ou grupo de colunas) que identifica cada linha sem repetir. É como o CPF de uma pessoa: dois registros não podem ter a mesma chave. Na tabela Fornecedores, o CNPJ é um bom candidato.

Uma **chave estrangeira** é uma coluna que aponta para a chave de outra tabela. Na tabela Contratos, a coluna "CNPJ do fornecedor" liga cada contrato ao fornecedor certo. É assim que as tabelas se relacionam, e daí vem o nome "relacional".

### SQL em uma frase

**SQL** é a linguagem usada para conversar com bancos relacionais: pedir dados, incluir, alterar e apagar registros.

### Pegadinhas

1. "Em uma tabela, cada linha representa um registro, como um fornecedor." Verdadeiro. As colunas são as características; a linha é o item completo.
2. "Dois registros da mesma tabela podem ter a mesma chave primária." Falso. A chave primária existe justamente para não se repetir.
3. "A chave estrangeira serve para ligar uma tabela a outra." Verdadeiro. Ela aponta para a chave primária da outra tabela.
