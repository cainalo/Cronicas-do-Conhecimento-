Uma página web combina três camadas: **HTML** para a estrutura e o significado, **CSS** para a apresentação e **JavaScript** para o comportamento. O **React** organiza a camada de comportamento e interface em componentes reutilizáveis.

### HTML5: semântica e formulários

O HTML5 começa com a declaração `<!DOCTYPE html>` e introduziu **elementos semânticos**, que descrevem o papel do conteúdo em vez da aparência:

| Elemento | Papel |
|---|---|
| `<header>` | cabeçalho da página ou de uma seção |
| `<nav>` | bloco de navegação principal |
| `<main>` | conteúdo principal (um por página) |
| `<article>` | conteúdo independente, que faz sentido sozinho (uma notícia, um acórdão) |
| `<section>` | agrupamento temático com título |
| `<aside>` | conteúdo relacionado, lateral |
| `<footer>` | rodapé |
| `<figure>` e `<figcaption>` | ilustração com legenda |

Também trouxe `<audio>`, `<video>` e `<canvas>` nativos e novos tipos de campo em formulários: `email`, `number`, `date`, `tel`, `url`, `range`, além de atributos de validação como `required`, `pattern`, `min`, `max` e `maxlength`.

```html
<form action="/denuncias" method="post">
  <label for="email">E-mail para retorno</label>
  <input id="email" name="email" type="email" required>

  <fieldset>
    <legend>Tipo de irregularidade</legend>
    <label><input type="radio" name="tipo" value="licitacao"> Licitação</label>
    <label><input type="radio" name="tipo" value="pessoal"> Pessoal</label>
  </fieldset>

  <button type="submit">Enviar</button>
</form>
```

A validação no navegador melhora a experiência, mas **não substitui** a validação no servidor, porque o usuário pode contornar o HTML.

### Acessibilidade

Acessibilidade permite que pessoas com deficiência usem o sistema, inclusive com leitores de tela e só com teclado. As recomendações internacionais estão nas **WCAG** (W3C); no governo federal brasileiro há também o **eMAG**. Boas práticas básicas:

- Texto alternativo em imagens informativas (`alt`); `alt=""` para imagens decorativas.
- Todo campo com `<label>` associado (`for` igual ao `id` do campo).
- Hierarquia de títulos coerente (`<h1>` a `<h6>` sem saltos sem sentido).
- Idioma declarado (`<html lang="pt-BR">`).
- Contraste suficiente entre texto e fundo e foco visível ao navegar com teclado.
- Preferir elementos nativos (`<button>`, `<a>`) a `<div>` clicável; usar atributos **ARIA** só quando não houver elemento nativo adequado.

### CSS3: seletores e especificidade

| Seletor | Exemplo | Seleciona |
|---|---|---|
| Tipo | `p` | todos os parágrafos |
| Classe | `.alerta` | elementos com `class="alerta"` |
| ID | `#topo` | o elemento com `id="topo"` |
| Atributo | `input[type="email"]` | campos de e-mail |
| Descendente | `nav a` | links em qualquer nível dentro de `nav` |
| Filho direto | `ul > li` | itens filhos imediatos |
| Irmão adjacente / geral | `h2 + p` / `h2 ~ p` | o parágrafo logo após / todos os seguintes |
| Pseudo-classe | `a:hover`, `li:nth-child(2)` | estado ou posição |
| Pseudo-elemento | `p::first-line`, `::before` | parte do elemento |

Quando duas regras conflitam, vence a de maior **especificidade**, contada em três níveis: (IDs, classes/atributos/pseudo-classes, elementos/pseudo-elementos). Estilo *inline* (`style="..."`) supera qualquer seletor, e `!important` supera tudo o mais. Em empate de especificidade, vence a regra **declarada por último**.

| Seletor | Especificidade |
|---|---|
| `p` | (0, 0, 1) |
| `.alerta` | (0, 1, 0) |
| `p.alerta` | (0, 1, 1) |
| `#topo .menu a` | (1, 1, 1) |

### Box model, flexbox, grid e media queries

Todo elemento é uma caixa com **conteúdo**, **padding** (espaço interno), **border** e **margin** (espaço externo). Com `box-sizing: content-box` (padrão), `width` vale só para o conteúdo: `width: 200px; padding: 20px; border: 5px` ocupa 250 px de largura. Com `box-sizing: border-box`, padding e borda ficam **dentro** dos 200 px.

- **Flexbox** (`display: flex`) organiza itens em **uma dimensão** (linha ou coluna). `justify-content` alinha no **eixo principal**, `align-items` no **eixo transversal**; `flex-direction`, `flex-wrap`, `gap` e `flex: 1` completam o básico.
- **Grid** (`display: grid`) organiza em **duas dimensões** (linhas e colunas): `grid-template-columns: repeat(3, 1fr)` cria três colunas iguais; a unidade `fr` divide o espaço livre.
- **Media queries** aplicam regras conforme características da tela. No **mobile first**, escreve-se o estilo para telas pequenas e amplia-se com `min-width`:

```css
.painel { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 768px) {
  .painel { grid-template-columns: repeat(3, 1fr); }
}
```

### React: componentes, props e estado

React é uma biblioteca JavaScript para construir interfaces a partir de **componentes**, que hoje são escritos como funções que retornam **JSX**. JSX parece HTML, mas é convertido em chamadas JavaScript; por isso usa `className` em vez de `class` e expressões entre chaves `{}`.

- **Props**: dados que o componente pai passa ao filho. São **somente leitura** para o filho.
- **Estado**: dados internos que mudam com o tempo. Alterar o estado com a função de atualização faz o React **renderizar de novo** o componente.
- O fluxo de dados é **unidirecional**: desce por props; o filho avisa o pai chamando funções recebidas por props.

```jsx
import { useEffect, useState } from 'react';

function ListaProcessos({ orgao }) {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    let ativo = true;
    fetch(`/api/processos?orgao=${orgao}`)
      .then(r => r.json())
      .then(dados => { if (ativo) setItens(dados); });
    return () => { ativo = false; };      // limpeza
  }, [orgao]);                           // roda de novo quando orgao muda

  return (
    <ul>
      {itens.map(p => <li key={p.id}>{p.numero}</li>)}
    </ul>
  );
}
```

| `useEffect(fn, deps)` | Quando `fn` executa |
|---|---|
| sem segundo argumento | após **toda** renderização |
| `[]` | só após a **primeira** renderização (montagem) |
| `[a, b]` | após a montagem e sempre que `a` ou `b` mudarem |
| função retornada | **limpeza**, antes de reexecutar o efeito e ao desmontar |

Regras dos hooks: chamar só no **nível superior** do componente (nunca dentro de `if`, laços ou funções aninhadas) e só em componentes ou hooks personalizados. O estado deve ser tratado como **imutável**: `setItens([...itens, novo])` em vez de `itens.push(novo)`. Quando o novo valor depende do anterior, use a forma funcional `setContador(c => c + 1)`.

Em listas, cada elemento precisa de uma **`key`** estável e única entre irmãos, que o React usa na **reconciliação** para saber qual item mudou. Usar o índice do vetor como chave causa erros quando a lista é reordenada ou tem itens inseridos no meio; prefira um identificador do dado.

### Pegadinhas

1. "A validação com `required` no HTML dispensa validar os dados no servidor." Falso. O cliente pode ser contornado.
2. "Um seletor de classe tem especificidade maior que um seletor de ID." Falso. ID pesa mais que qualquer quantidade de classes.
3. "Flexbox é unidimensional e grid é bidimensional." Verdadeiro.
4. "Um componente React pode alterar diretamente as props que recebeu." Falso. Props são somente leitura.
5. "`useEffect` com vetor de dependências vazio executa após cada renderização." Falso. Executa só após a montagem.
