# Auditoria pedagógica: do texto acumulado ao ensino em microetapas

## Princípio central

Não criar duas versões da mesma matéria — “texto curto” e “texto completo”. Criar **um currículo canônico completo** e revelar esse currículo em pequenas etapas de aprendizagem. Cada etapa tem começo, explicação, demonstração, checagem e feedback. A pessoa não precisa ler um resumo simplificado e depois encontrar outra página com a mesma matéria reescrita.

O livro de referência continua útil, mas deve ser gerado a partir dos mesmos blocos canônicos da lição. Ele pode oferecer sumário, busca, glossário e leitura contínua; não deve ser outra fonte divergente do conteúdo interativo.

## O ciclo pedagógico obrigatório

1. **Orientação curta:** diga o objetivo da próxima etapa e por que é útil, sem despejar os objetivos de todo o capítulo.
2. **Ativação:** use uma pergunta simples, um exemplo cotidiano ou uma situação visual para revelar o que o aluno já sabe. Não transforme cada abertura em cena medieval.
3. **Explicação de um conceito:** defina em linguagem direta; apresente o termo técnico e explique-o imediatamente; introduza no máximo uma nova abstração central por etapa.
4. **Exemplo trabalhado:** mostre como alguém raciocina, com passos explicitados. Em tecnologia, mostre um processo, comando, saída de terminal, tabela, diagrama ou escolha de configuração.
5. **Checagem imediata:** uma pergunta que exige compreensão daquele conceito, antes de introduzir o próximo.
6. **Feedback por alternativa:** explique por que a resposta correta é correta e qual confusão provável levou a cada erro relevante.
7. **Recuperação adaptativa:** se errar, dê uma pista graduada, revele um exemplo menor ou use outra analogia. Em seguida, apresente uma questão equivalente com cenário/dados diferentes.
8. **Avanço controlado:** só então mostre a próxima etapa. Um erro não deve causar vergonha, perda de vida ou punição de XP.
9. **Prática cumulativa:** depois de 2–4 conceitos, misture uma atividade de recuperação para conectar ideias já aprendidas.
10. **Fechamento:** síntese compacta, 1–3 perguntas de recuperação e indicação do que será revisado e por quê.

## O que o código atual incentiva (e deve mudar)

- `SimpleSection` em `src/content/types.ts` requer 4–7 páginas e `src/test/content.test.ts` exige até 70 palavras por página. Isso torna o limite de tamanho o objetivo principal, em vez de avaliar se uma ideia ficou bem ensinada.
- `LearnPage` mostra as páginas da seção, depois vocabulário e só depois três checagens de verdadeiro/falso.
- O texto completo está separado da explicação inicial. A própria interface chama-o de “mais difícil”.
- `buildPractice()` depois monta uma fila de atividades de cinco famílias, com verdadeiro/falso e vocabulário em uma rodada posterior.
- O motor de missões tem atividades melhores para raciocínio (ordenação, classificação, comparação e depuração), mas elas não são aplicadas de forma sistemática à prática ordinária.

## Regra de tamanho: não truncar, não despejar

Não usar uma contagem de palavras como meta fixa. A extensão de uma etapa deve obedecer a uma unidade cognitiva. Uma etapa pode precisar de 60 palavras ou de 180; o importante é que trabalhe um objetivo, use uma representação compreensível e seja checada. Se uma explicação precisa de mais espaço, dividir pelo raciocínio natural — definição, exemplo, contraste, aplicação — sem cortar ressalvas essenciais.

Sugestões editoriais iniciais, como padrões a validar no piloto:

- Uma ideia central por etapa.
- Em geral, 1–3 termos novos explicitamente definidos.
- 1 exemplo concreto antes de exigir aplicação abstrata.
- 1 checagem após cada etapa; 2 quando uma só não distingue os erros prováveis.
- Mistura de questões com demanda crescente; não cobrar comando ou exceção que ainda não foi ensinada.
- A estimativa de tempo deve vir de um teste piloto, não de um número padrão por tipo de tela.

## Variedade de atividades

O sistema padrão deveria permitir, conforme o assunto:

- escolha única e múltipla com feedback por opção;
- preencher lacuna com significado, não só memória de palavra;
- ligar conceitos a definições;
- ordenar etapas de um processo;
- classificar recursos em categorias;
- encontrar e corrigir um erro em código/comando/configuração;
- prever a saída de um comando;
- interpretar tabela, gráfico, tela ou trecho de log;
- comparar cenários e escolher a solução justificada;
- simular processo com estados visuais;
- questão de concurso ao final de um conjunto de conceitos, sempre identificada honestamente como autoral ou oficial.

A regra não é usar todos os formatos em toda seção; é não fazer da mesma forma de pergunta a experiência inteira. Não fixar a diversidade apenas na missão 3D.

## Diagnóstico do erro

Para cada pergunta, registrar internamente (quando possível) o conceito-alvo e tipos comuns de confusão. O texto mostrado ao aluno deve evitar diagnósticos definitivos sobre sua capacidade; dizer “esta resposta costuma confundir processo com programa” em vez de “você não sabe processos”.

Fluxo sugerido:

- **Erro de leitura:** destacar a frase-chave do enunciado.
- **Erro conceitual:** mostrar a definição em uma frase, depois o exemplo.
- **Confusão entre pares:** pôr os dois conceitos lado a lado e explicar a diferença decisiva.
- **Erro de procedimento:** voltar ao passo imediatamente anterior e executar em câmera lenta.
- **Acerto por tentativa:** seguir com reforço leve posterior; não tratar a primeira resposta como domínio sólido.

## Critérios editoriais contra texto artificial

- Escrever a partir do objetivo e do programa oficial, não a partir do desejo de preencher páginas.
- Parágrafos com uma função clara: definir, contrastar, demonstrar, alertar ou aplicar.
- Evitar inícios repetidos (“Imagine que…”, “No reino…”, “É importante destacar…”), listas com a mesma cadência e concluições genéricas em todas as seções.
- Usar exemplos específicos da matéria, mas não forçar o universo de fantasia em Linux, lei, matemática e toda questão.
- História é uma ferramenta opcional: uma cena pode abrir uma missão ou contextualizar um problema; muitas lições podem começar como uma aula curta de professor, demonstração ou pergunta prática.
- Não chamar paráfrase gerada automaticamente de questão oficial nem de conteúdo validado por especialista.
- Usar revisão humana para precisão técnica e didática; exibir status editorial de forma visível na administração/documentação.

## Métricas de qualidade a acrescentar aos testes

Cada microetapa deve conter um `objectiveId`, explicação, pelo menos um exemplo ou demonstração quando o tipo de conceito exige, uma checagem e feedback. Validações automatizadas precisam verificar integridade do schema, ordem das etapas, ID de conceito ensinado, links válidos e feedback não vazio. A automação não consegue julgar sozinha se um professor explica bem; fazer revisão humana cega em uma amostra por disciplina e registrar nota/observações.

Não usar “todas as seções têm 4–7 páginas” como definição de qualidade. Transformar os testes para validarem o novo modelo e eliminar as restrições antigas depois que os dados forem migrados.
