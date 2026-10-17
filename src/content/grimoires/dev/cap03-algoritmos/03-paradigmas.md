Um **paradigma** é um estilo de organizar programas. O edital cobra dois: a **programação orientada a objetos** (POO), dominante em Java, C# e boa parte do Python e do TypeScript, e a **programação funcional**, presente em JavaScript, Python, Java (desde as expressões lambda do Java 8) e em linguagens como Haskell e Scala. As linguagens modernas misturam os dois.

### Classes e objetos

- **Classe**: o molde. Define **atributos** (estado) e **métodos** (comportamento).
- **Objeto**: uma **instância** da classe, criada em tempo de execução (em Java, com `new`).
- **Construtor**: método especial chamado na criação do objeto para inicializar o estado.

```java
public class Processo {
    private String numero;          // atributo encapsulado
    private double valor;

    public Processo(String numero, double valor) {   // construtor
        this.numero = numero;
        this.valor = valor;
    }
    public double getValor() { return valor; }
}

Processo p = new Processo("123/2026", 50000.0);  // objeto
```

### Os quatro pilares

| Pilar | Ideia | Exemplo |
|---|---|---|
| **Abstração** | Representar só o que é relevante para o problema | `Processo` tem número e valor, não a cor da capa |
| **Encapsulamento** | Esconder o estado interno e expor operações controladas | atributos `private`, acesso por métodos que validam |
| **Herança** | Uma subclasse reaproveita e especializa a superclasse ("é um") | `ProcessoLicitatorio extends Processo` |
| **Polimorfismo** | O mesmo comando produz comportamentos diferentes conforme o objeto | `doc.calcularPrazo()` age de um jeito para cada tipo de documento |

**Classe abstrata** não pode ser instanciada e pode ter métodos abstratos (sem corpo) e concretos. **Interface** define um contrato que as classes implementam; em Java uma classe estende **uma** superclasse, mas pode implementar **várias** interfaces. Desde o Java 8, interfaces podem ter métodos `default` com corpo.

### Sobrecarga e sobrescrita

| | Sobrecarga (*overloading*) | Sobrescrita (*overriding*) |
|---|---|---|
| Onde | Na mesma classe (ou herdada) | Em uma subclasse |
| Assinatura | Mesmo nome, **parâmetros diferentes** | Mesmo nome e **mesmos parâmetros** |
| Resolução | Em tempo de **compilação** (polimorfismo estático) | Em tempo de **execução** (ligação dinâmica) |
| Exemplo | `calcular(int)` e `calcular(int, double)` | `Conta.taxa()` redefinido em `ContaEspecial.taxa()` |

Mudar apenas o tipo de retorno não caracteriza sobrecarga em Java: o compilador rejeita dois métodos com os mesmos parâmetros.

```java
class Documento { double prazo() { return 30; } }
class Recurso extends Documento {
    @Override double prazo() { return 15; }   // sobrescrita
}
Documento d = new Recurso();
d.prazo();   // 15: o método escolhido depende do objeto real
```

### Composição e herança

Herança expressa "**é um**" e cria acoplamento forte: mudanças na superclasse afetam todas as subclasses. **Composição** expressa "**tem um**": o objeto guarda referências a outros e delega trabalho a eles. O livro *Design Patterns* (Gamma, Helm, Johnson e Vlissides, a "Gangue dos Quatro") recomenda **preferir composição a herança**. Um `Relatorio` que **tem um** `Exportador` (PDF, CSV) troca o formato sem criar uma subclasse para cada combinação.

Dois critérios de qualidade acompanham a POO: **alta coesão** (cada classe com uma responsabilidade clara) e **baixo acoplamento** (dependências mínimas entre classes).

### Programação funcional

A programação funcional trata a computação como avaliação de funções e evita estado mutável.

- **Função pura**: para a mesma entrada, devolve sempre a mesma saída e não produz **efeitos colaterais**. Isso dá **transparência referencial**: a chamada pode ser substituída pelo seu resultado.
- **Efeito colateral**: qualquer mudança observável fora da função, como alterar variável global, gravar em arquivo ou banco, escrever no console, fazer requisição de rede.
- **Imutabilidade**: em vez de alterar um dado, cria-se uma nova versão. Evita surpresas quando o mesmo objeto é compartilhado.
- **Funções de primeira classe**: funções são valores; podem ser guardadas em variáveis, passadas como argumento e retornadas.
- **Funções de alta ordem**: recebem ou retornam funções. Os exemplos clássicos são `map`, `filter` e `reduce`.

```javascript
const contratos = [
  { orgao: 'SEDUC', valor: 120000 },
  { orgao: 'SAUDE', valor: 80000 },
  { orgao: 'SEDUC', valor: 45000 },
];

const totalSeduc = contratos
  .filter(c => c.orgao === 'SEDUC')        // mantém os que passam no teste
  .map(c => c.valor)                       // transforma cada elemento
  .reduce((soma, v) => soma + v, 0);       // acumula em um único valor
// 165000; o vetor original não foi alterado
```

`map` devolve um novo vetor do **mesmo tamanho**; `filter` devolve um vetor com **zero ou mais** elementos do original; `reduce` combina tudo em **um** valor a partir de um acumulador inicial.

**Closure** (fechamento) é uma função que "lembra" as variáveis do escopo onde foi criada, mesmo depois que esse escopo terminou:

```javascript
function criaContador() {
  let n = 0;
  return () => ++n;     // a função interna captura n
}
const prox = criaContador();
prox(); // 1
prox(); // 2
```

Closures permitem esconder estado (um tipo de encapsulamento) e criar funções configuradas, como `const multiplicaPor = k => x => x * k`.

Em linguagens funcionais, laços costumam ser substituídos por **recursão** e por funções de alta ordem, e funções são combinadas por **composição** (`f(g(x))`).

### Pegadinhas

1. "Sobrecarga é resolvida em tempo de execução, conforme o tipo real do objeto." Falso. Isso descreve a sobrescrita; a sobrecarga é resolvida na compilação.
2. "Em Java, uma classe pode estender várias classes e implementar uma única interface." Falso. É o contrário: uma superclasse e várias interfaces.
3. "Uma função que grava um registro de log a cada chamada continua sendo pura." Falso. Gravar log é efeito colateral.
4. "O método `filter` sempre devolve um vetor do mesmo tamanho do original." Falso. Esse é o `map`; o `filter` pode devolver menos elementos.
5. "Composição representa uma relação do tipo tem um." Verdadeiro. Herança representa é um.
