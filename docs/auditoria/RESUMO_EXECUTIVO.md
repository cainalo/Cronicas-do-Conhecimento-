# Resumo executivo — Crônicas do Conhecimento

## Diagnóstico

O aplicativo tem uma base robusta, mas está faltando coerência entre quatro camadas: sequência do curso, ensino em microetapas, persistência da retomada e apresentação do livro. Esses pontos explicam boa parte da confusão descrita pelo usuário. O problema principal não é falta de quantidade de conteúdo, e sim a ordem em que o conteúdo é ensinado e a falta de uma fonte única sobre o que vem a seguir.

## Achados prioritários

1. Home, plano do dia, recomendação e ritmo usam lógicas diferentes para decidir o próximo passo.
2. A arquitetura “texto curto + texto completo em outra rota” está explicitamente codificada; as verificações aparecem agrupadas ao fim da explicação.
3. `Leaf` usa `overflow-y-auto` e o paginador prevê scroll interno para blocos maiores, contrariando a metáfora do livro.
4. O estado interno da missão é mantido em estados locais do componente e não representa um checkpoint durável de cada etapa.
5. A prática comum tem variedade menor que o motor das missões; testes atuais validam mais estrutura do que qualidade pedagógica.
6. É recomendada uma página “Estudos” para organizar biblioteca, atividades rápidas, videoaulas, revisão e referências.

## Recomendação de execução

Primeiro, estabelecer uma única trilha e guardar o ponto exato de retomada. Segundo, reformular como piloto a seção “Processos, memória e serviços” com uma explicação por vez, exemplo trabalhado e checagem imediata. Terceiro, aplicar o modelo pedagógico e só então corrigir o livro, a página Estudos, o design medieval e os recursos de vídeo/áudio. Por fim, migrar o conteúdo em lotes e validar o release no navegador e no Android.

## Critério de sucesso

Ao tocar em **Continuar**, o aluno retorna exatamente ao mesmo conceito e atividade. Cada ideia é explicada e testada antes da próxima; se errar, recebe uma nova explicação e uma questão equivalente. O livro não exige rolagem vertical dentro da folha. As telas estão alinhadas e responsivas, e os testes registram claramente o que foi ou não validado.

## Nota de método

Branch observada: `claude/cronicas-conhecimento-estudos-jgbofo`; commit base `be2ece0059622aeb00bdd3fa638b60cb13eb7fdd`. Os testes/build não puderam ser executados independentemente neste ambiente; as contagens citadas provêm da documentação existente do repositório e precisam ser reproduzidas no início da implementação.
