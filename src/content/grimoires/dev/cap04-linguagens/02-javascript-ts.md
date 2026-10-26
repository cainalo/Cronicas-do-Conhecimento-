JavaScript nasceu para dar comportamento às páginas web e hoje roda também no servidor, com **Node.js**. **TypeScript** acrescenta tipos estáticos ao JavaScript e é compilado para ele. As três coisas aparecem juntas no edital e na prática: um sistema de protocolo eletrônico pode ter front-end em React com TypeScript e uma API em Node.js.

### Do navegador ao servidor

- **1995: o JavaScript.** Brendan Eich criou a linguagem na Netscape para dar comportamento às páginas; em 1997 ela foi padronizada pela Ecma International como ECMAScript. Apesar do nome, não é o Java.
- **2009: o Node.js.** Ryan Dahl levou o JavaScript para fora do navegador, sobre o motor V8 do Google Chrome.
- **2012: o TypeScript.** A Microsoft, com a equipe de Anders Hejlsberg, lançou o TypeScript, que acrescenta tipos estáticos ao JavaScript.

### Tipos, variáveis e comparação

JavaScript tem tipagem **dinâmica e fraca** (faz coerção implícita). Os tipos **primitivos** são sete: `string`, `number`, `bigint`, `boolean`, `undefined`, `null` e `symbol`. Todo o resto é `object` (incluindo vetores e funções). Duas curiosidades históricas: `typeof null` retorna `"object"`, e `NaN === NaN` é `false` (use `Number.isNaN`).

| Declaração | Escopo | Reatribuição | Hoisting |
|---|---|---|---|
| `var` | de **função** | Sim | içada e inicializada com `undefined` |
| `let` | de **bloco** | Sim | içada, mas inacessível antes da declaração (zona morta temporal) |
| `const` | de **bloco** | **Não** | como `let` |

`const` impede **reatribuir** a variável, mas não impede alterar o conteúdo de um objeto: `const lista = []; lista.push(1)` é válido.

O operador `==` compara **após coerção de tipos**; `===` (igualdade estrita) compara **valor e tipo**, sem coerção.

```javascript
0 == '0'          // true  (coerção)
0 === '0'         // false (tipos diferentes)
null == undefined // true
null === undefined// false
```

Funções em JavaScript são de primeira classe e formam **closures**: uma função interna continua acessando as variáveis do escopo externo depois que ele terminou. As **arrow functions** (`x => x * 2`) não têm `this` próprio; herdam o `this` do escopo onde foram definidas.

### Event loop, Promises e async/await

O JavaScript executa o código em **uma única thread** com uma **pilha de chamadas**. Operações demoradas (rede, disco, temporizadores) são entregues ao ambiente (navegador ou Node.js), e seus *callbacks* entram em filas. O **event loop** só tira uma tarefa da fila quando a pilha está vazia. As **microtarefas** (callbacks de Promises, `queueMicrotask`) são executadas **antes** da próxima **macrotarefa** (`setTimeout`, eventos de E/S).

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// Saída: 1, 4, 3, 2
```

Uma **Promise** representa um valor futuro e está em um de três estados: **pendente** (*pending*), **cumprida** (*fulfilled*) ou **rejeitada** (*rejected*). Depois de resolvida, não muda mais de estado. Métodos úteis:

| Método | Comportamento |
|---|---|
| `then` / `catch` / `finally` | tratam sucesso, erro e encerramento |
| `Promise.all` | cumpre quando **todas** cumprem; rejeita na **primeira** rejeição |
| `Promise.allSettled` | espera todas e informa o resultado de cada uma |
| `Promise.race` | assume o resultado da **primeira** que se resolver |
| `Promise.any` | cumpre com a primeira que **cumprir**; rejeita só se todas rejeitarem |

`async` e `await` são uma sintaxe sobre Promises. Uma função `async` **sempre retorna uma Promise**. `await` suspende **a função** até a Promise se resolver, sem bloquear a thread; erros são capturados com `try/catch`.

```javascript
async function buscarProcesso(id) {
  try {
    const resp = await fetch(`/api/processos/${id}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch (e) {
    console.error('Falha ao buscar', e);
    return null;
  }
}
```

### Node.js e módulos

**Node.js** é um ambiente de execução de JavaScript fora do navegador, construído sobre o motor **V8**, com E/S **não bloqueante** orientada a eventos. É adequado para APIs e serviços com muitas conexões simultâneas e pouco processamento pesado por requisição; tarefas intensivas de CPU bloqueiam o event loop e pedem *worker threads* ou outro serviço.

| | CommonJS | ES Modules (ESM) |
|---|---|---|
| Importar | `const fs = require('fs')` | `import fs from 'fs'` |
| Exportar | `module.exports = ...` | `export` / `export default` |
| Carregamento | síncrono, em tempo de execução | estático, analisado antes da execução |
| No Node.js | padrão histórico (`.js`, `.cjs`) | `.mjs` ou `"type": "module"` no `package.json` |

O ESM é o padrão da linguagem (ECMAScript 2015) e o usado nos navegadores. O **npm** é o gerenciador de pacotes que acompanha o Node.js (detalhes na seção de dependências).

### TypeScript

TypeScript é um **superconjunto** do JavaScript: todo JavaScript válido é TypeScript válido, e o TypeScript acrescenta **tipagem estática** verificada em tempo de compilação. O compilador `tsc` (ou ferramentas como Vite e esbuild) gera JavaScript comum; os tipos são **apagados** e não existem em tempo de execução. As opções ficam em `tsconfig.json`; `"strict": true` liga as verificações mais rigorosas.

```typescript
type Situacao = 'aberto' | 'arquivado';          // união de literais

interface Processo {
  numero: string;
  valor: number;
  relator?: string;                              // opcional
  situacao: Situacao;
}

function primeiro<T>(itens: T[]): T | undefined { // generic
  return itens[0];
}

const p = primeiro<Processo>([]);                // Processo | undefined
```

| | `interface` | `type` |
|---|---|---|
| Descreve formato de objeto | Sim | Sim |
| Uniões, tuplas, apelido de primitivo | Não | Sim (`type Id = string \| number`) |
| Extensão | `extends` | interseção `&` |
| Pode ser reaberta (*declaration merging*) | Sim | Não |

Outros pontos: **generics** permitem funções e tipos reutilizáveis que preservam o tipo do argumento; **tipos união** (`A | B`) aceitam um ou outro, e o compilador exige verificar qual é antes de usar membros específicos (*narrowing*); `any` desliga a verificação, enquanto `unknown` obriga a verificar antes de usar. A tipagem do TypeScript é **estrutural**: dois tipos com a mesma forma são compatíveis, mesmo com nomes diferentes.

### Pegadinhas

1. "`const` torna o objeto atribuído imutável." Falso. Impede só a reatribuição da variável; o conteúdo do objeto pode mudar.
2. "Em JavaScript, `0 === '0'` é verdadeiro." Falso. O operador estrito compara também o tipo.
3. "`await` bloqueia a thread principal até a Promise terminar." Falso. Suspende apenas a função `async`; o event loop segue atendendo outras tarefas.
4. "`Promise.all` rejeita assim que qualquer Promise do conjunto rejeitar." Verdadeiro. Para esperar todas, use `allSettled`.
5. "Os tipos do TypeScript são verificados pelo navegador durante a execução." Falso. São verificados na compilação e apagados no JavaScript gerado.
