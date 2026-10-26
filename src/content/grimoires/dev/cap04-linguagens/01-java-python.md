O edital pede **Java (conceitos básicos)** e **Python para automação e desenvolvimento back-end**. As duas linguagens são orientadas a objetos e muito usadas em órgãos públicos, mas diferem na tipagem, na forma de execução e na sintaxe.

### Como nasceram as duas linguagens

- **1991: o Python.** Guido van Rossum começou o Python no fim de 1989 e publicou a primeira versão em 1991; o nome vem do grupo humorístico Monty Python.
- **1995: o Java.** Na Sun Microsystems, a equipe de James Gosling começou em 1991 o projeto que deu origem ao Java, lançado em 1995 com a promessa "escreva uma vez, execute em qualquer lugar". Em 2010, a Oracle comprou a Sun.

### Java: compilação, bytecode e JVM

O código-fonte `.java` é compilado pelo `javac` para **bytecode** (arquivos `.class`), um código intermediário independente de sistema operacional. Quem executa o bytecode é a **JVM** (*Java Virtual Machine*), que interpreta e, com o compilador **JIT** (*just-in-time*), traduz trechos frequentes para código de máquina. Daí o lema "escreva uma vez, execute em qualquer lugar": o mesmo `.class` roda em qualquer sistema com JVM.

| Sigla | O que é |
|---|---|
| JVM | Máquina virtual que executa bytecode |
| JRE | Ambiente de execução: JVM e bibliotecas padrão |
| JDK | Kit de desenvolvimento: JRE, compilador `javac` e ferramentas |

A memória de objetos é liberada automaticamente pelo **coletor de lixo** (*garbage collector*), que remove objetos sem referências.

### Tipos primitivos e tipos por referência

Java tem **oito tipos primitivos**, que guardam o valor diretamente:

| Tipo | Tamanho | Uso |
|---|---|---|
| `byte` | 8 bits | inteiro pequeno |
| `short` | 16 bits | inteiro |
| `int` | 32 bits | inteiro padrão |
| `long` | 64 bits | inteiro grande (`10L`) |
| `float` | 32 bits | ponto flutuante simples (`1.5f`) |
| `double` | 64 bits | ponto flutuante padrão |
| `char` | 16 bits | um caractere UTF-16 |
| `boolean` | – | `true` ou `false` |

Todo o resto (objetos, vetores, `String`) é **tipo por referência**: a variável guarda uma referência ao objeto. Por isso, para objetos, `==` compara **referências** (se é o mesmo objeto) e `equals()` compara **conteúdo**. Cada primitivo tem uma classe *wrapper* (`Integer`, `Double`...), e a conversão automática entre eles chama-se *autoboxing*/*unboxing*. `String` é **imutável**. Java passa argumentos sempre **por valor**; no caso de objetos, o valor copiado é a referência.

### Modificadores de acesso

| Modificador | Mesma classe | Mesmo pacote | Subclasse em outro pacote | Qualquer lugar |
|---|---|---|---|---|
| `private` | Sim | Não | Não | Não |
| (padrão, sem palavra) | Sim | Sim | Não | Não |
| `protected` | Sim | Sim | Sim | Não |
| `public` | Sim | Sim | Sim | Sim |

Outros modificadores: `static` (pertence à classe, não ao objeto), `final` (variável não reatribuível, método não sobrescrevível, classe não estendível), `abstract`.

### Exceções checked e unchecked

Todas as exceções descendem de `Throwable`, que se divide em `Error` (falhas graves da JVM, como `OutOfMemoryError`) e `Exception`.

- **Checked** (verificadas): subclasses de `Exception` que **não** são `RuntimeException`, como `IOException` e `SQLException`. O compilador **obriga** a tratá-las com `try/catch` ou declará-las com `throws`.
- **Unchecked** (não verificadas): `RuntimeException` e suas subclasses (`NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException`, `IllegalArgumentException`), além de `Error`. O tratamento é opcional.

```java
try (BufferedReader r = new BufferedReader(new FileReader("contratos.csv"))) {
    System.out.println(r.readLine());
} catch (IOException e) {          // checked: tratamento obrigatório
    System.err.println("Falha na leitura: " + e.getMessage());
} finally {
    System.out.println("executa sempre");
}
```

O *try-with-resources* (desde o Java 7) fecha automaticamente recursos que implementam `AutoCloseable`.

### Python: tipagem dinâmica e indentação

Python é interpretado (o CPython compila o fonte para bytecode e o executa em sua máquina virtual) e tem **tipagem dinâmica e forte**: o tipo pertence ao valor, a variável pode receber valores de tipos diferentes, mas `"1" + 1` gera `TypeError`, sem conversão implícita. Os blocos são definidos pela **indentação**, sem chaves; o guia PEP 8 recomenda 4 espaços.

| Coleção | Sintaxe | Mutável? | Observação |
|---|---|---|---|
| Lista | `[1, 2, 3]` | Sim | ordenada, aceita repetidos |
| Tupla | `(1, 2, 3)` | **Não** | pode ser chave de dicionário |
| Dicionário | `{"cpf": "123", "nome": "Ana"}` | Sim | chave-valor; mantém a ordem de inserção (garantido desde o 3.7) |
| Conjunto | `{1, 2, 3}` | Sim | sem repetidos, sem ordem |

**Compreensões** criam coleções em uma linha:

```python
valores = [120000, 80000, 45000]
acima = [v for v in valores if v > 50000]          # [120000, 80000]
por_orgao = {c["orgao"]: c["valor"] for c in contratos}
```

Funções são definidas com `def`, aceitam valores padrão, `*args` (posicionais extras) e `**kwargs` (nomeados extras). Uma armadilha conhecida: o valor padrão é avaliado **uma vez**, na definição. `def f(x, lista=[])` compartilha a mesma lista entre chamadas; o idioma correto é `lista=None`.

### Ambiente virtual, pip e automação

```bash
python -m venv .venv              # cria ambiente isolado
source .venv/bin/activate         # Linux/macOS (Windows: .venv\Scripts\activate)
pip install requests              # instala pacote do PyPI
pip freeze > requirements.txt     # registra versões instaladas
pip install -r requirements.txt   # reproduz o ambiente
```

O **venv** isola as dependências de cada projeto, evitando conflito de versões entre sistemas. Para automação, a biblioteca padrão oferece `pathlib` e `os` (arquivos), `csv` e `json` (formatos), `datetime`, `re` (expressões regulares) e `subprocess`. Um script típico de auditoria:

```python
import csv
from pathlib import Path

total = 0.0
for arquivo in Path("empenhos").glob("*.csv"):
    with open(arquivo, newline="", encoding="utf-8") as f:
        for linha in csv.DictReader(f):
            total += float(linha["valor"])
print(f"Total empenhado: {total:.2f}")
```

No back-end, os frameworks mais citados são **Django** (completo, com ORM e painel administrativo), **Flask** (micro-framework) e **FastAPI** (APIs com tipagem e documentação OpenAPI geradas a partir das anotações de tipo).

### Pegadinhas

1. "A JVM executa diretamente o código-fonte .java." Falso. Ela executa o bytecode gerado pelo javac.
2. "NullPointerException é uma exceção checked." Falso. É subclasse de RuntimeException, portanto unchecked.
3. "O modificador protected permite acesso por classes do mesmo pacote." Verdadeiro. Além delas, subclasses de outros pacotes.
4. "Em Python, tuplas são mutáveis e listas são imutáveis." Falso. É o inverso.
5. "Por ter tipagem dinâmica, Python converte automaticamente `"1" + 1` em 2." Falso. A tipagem é forte e a operação gera TypeError.
