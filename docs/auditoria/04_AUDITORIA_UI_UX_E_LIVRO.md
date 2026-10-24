# Auditoria de interface, navegação e leitor do livro

## 1. O livro está violando seu contrato visual

O código de `Leaf` em `src/components/LeatherBook.tsx` faz o conteúdo ocupar uma área com `overflow-y-auto`. `src/lib/book.ts` também prevê que blocos maiores que a página ocupem uma folha com rolagem interna. Isso conflita com os comentários e decisões de produto de livro sem rolagem.

**Não basta ocultar a barra.** `scrollbar-width:none` pode esconder a barra visual e deixar o gesto de rolagem ativo, piorando a descoberta do problema. É necessário garantir que todo conteúdo caiba em uma folha ou seja dividido corretamente.

### Regras de paginação

- Medir altura útil real após cabeçalho, margens, rodapé e número da folha.
- Não cortar palavras, linhas de código ou conteúdo de tabela de forma inválida.
- Manter título junto do início do conteúdo que apresenta.
- Dividir listas longas entre páginas e repetir o contexto necessário.
- Tabelas: repetir cabeçalho, permitir continuação na próxima página, alinhar números e não inserir rolagem horizontal/vertical dentro do livro.
- Código: manter blocos curtos por folha; para exemplos longos, usar páginas consecutivas com numeração de linha e opção de abrir o exemplo em modo de leitura acessível.
- Imagens/diagramas: preservar proporção e legenda; não comprimir até ficar ilegível.
- Aumentar a fonte sem estourar a folha: recalcular a paginação e, se necessário, aumentar o número de páginas.
- Se um único bloco for impossível de paginar sem quebrar sua semântica, mostrar uma ação explícita “Abrir conteúdo ampliado” que leva a uma tela acessível; não rolar silenciosamente dentro do fólio.
- Garantir que virada, seta, arrasto e botões tenham comportamento coerente com página simples e dupla.

## 2. Navegação e ação principal

A Dashboard atual mistura countdown, botão “Começar”, cartão de meta com “Próxima”, missão, várias métricas, atalhos e domínio por disciplina. O layout também tem “Continuar”. Isso precisa ser reorganizado em uma hierarquia visual fixa:

1. **Continuar** no exato ponto salvo.
2. Resumo pequeno de progresso de hoje.
3. Plano de hoje, se houver, sem competir com a ação principal.
4. Atalho para Estudos e biblioteca.
5. Missões, gamificação e estatísticas em segundo plano.

Não remover acesso a recursos; mudar prioridade e agrupamento. Todos os CTAs que prometem continuar o mesmo percurso devem apontar para o mesmo destino.

## 3. Design system: alinhamento e previsibilidade

Criar/tomar como fonte os tokens de spacing, raio, sombra, tipografia, largura e estados dos componentes. A interface precisa parecer cuidadosamente composta, não uma coleção de cartões com pequenos estilos locais.

- Grade de 8 px (ou escala única equivalente); todos os espaçamentos vêm dos tokens.
- Mesmo alinhamento de título, subtítulo, cartões e CTAs em todas as páginas irmãs.
- Reutilizar componentes para botões primários, secundários, ícones e cartões de função.
- Definir alturas mínimas e alinhamento de cards para títulos com 1–2 linhas, sem vazios enormes por conteúdo curto.
- Botões com tamanho de toque confortável, foco de teclado claro e estados hover/pressed/disabled/loading/success/error consistentes.
- Não usar cor como único indicador; sempre incluir texto ou ícone acessível.
- Não deixar menus, chips ou controles saltarem quando mudam de estado.
- Garantir foco não perdido após responder e avançar.
- Controlar overflow de título, texto longo, código, tabela e viewport baixo.

## 4. Matriz responsiva

Validar a interface, no mínimo, em:

- **390×844:** celular comum, vertical; sem overflow horizontal e botões essenciais sem sobreposição.
- **360×740:** celular estreito/viewport baixo, para descobrir modais e rodapés cortados.
- **768×1024:** tablet vertical; grid não deve parecer desktop espremido.
- **1024×768:** desktop/tela larga curta; a área útil do livro não deve criar rolagem interna.
- **1280×800:** desktop com livro de duas páginas, conteúdo balanceado e navegação estável.
- **Zoom 125% e fonte ampliada:** todos os controles continuam acessíveis.

## 5. Tabelas sem rolagem desnecessária

- No livro, dividir a tabela em páginas com repetição de cabeçalho, preservando a associação entre coluna e valor.
- Em tela móvel convencional, se houver muitas colunas, substituir tabela densa por linhas/cartões rotulados ou uma tabela com colunas essenciais e detalhe por linha. Evitar fazer o aluno rolar horizontalmente para entender comparação simples.
- Nunca cortar texto silenciosamente ou reduzir a fonte abaixo de leitura confortável.
- Comandos, saída esperada e explicação ficam próximos; não exigir rolagem para comparar lado a lado.
- Para tabelas enormes de referência, criar visualização dedicada, com indicação explícita de que não faz parte do livro paginado.

## 6. Estados vazios e erros

Cada tela funcional deve ter estados de carregamento, dados disponíveis, vazio, erro e offline. Os textos explicam o próximo passo; botões desativados dão motivo; erros de rede não apagam progresso. Uma página “não encontrado” deve oferecer voltar à trilha central, não apenas um texto sem ação.

## 7. Sons e imersão

Há áudio procedural com lareira/música medieval e um botão Ambiente. Preservar isso, mas conferir:

- nenhum áudio começa sem gesto explícito do usuário;
- controles separados para música e lareira, volume e estado salvo nas preferências;
- respeitar reduzir movimento e modo silencioso;
- nunca tornar áudio requisito para entender a aula;
- a cena 3D e o resto do app têm uma preferência consistente;
- se WebAudio falhar ou o navegador suspender áudio, UI não congela nem insiste em alertas.
