# Conteúdo, rigor técnico e aderência ao concurso

## 1. Contexto atual

A aplicação está orientada ao TCE-GO 2026, Técnico de Controle Externo — Tecnologia da Informação (B02, FCC). O repositório inclui um PDF consolidado do edital em `docs/fontes/` e dados estruturados em `src/content/contests/tce-go-2026/contest.ts`. A auditoria anterior do próprio projeto informa 68/68 tópicos com algum material, mas deixa claro que “com material” não significa profundidade integral ou validação por especialista.

O material de concurso é de alto risco editorial: a pessoa pode memorizar uma regra ou comando incorreto. A regra é rastreabilidade, linguagem clara e revisão honesta.

## 2. Rótulos de origem e revisão

Manter separados, sem confusão:

- **Autoral:** produzido para ensinar ou simular o estilo da prova, sem alegar que foi aplicado.
- **Oficial:** questão ou trecho cuja origem foi conferida num caderno oficial identificável.
- **Adaptada:** baseada em uma questão oficial, com alterações transparentes; não é transcrição oficial intacta.
- **Não revisada:** ainda sem conferência editorial/técnica.
- **Revisada editorialmente:** linguagem/estrutura revisadas.
- **Validada tecnicamente:** conferência de conteúdo por pessoa qualificada ou fonte primária registrada.
- **Pendente de atualização:** material sujeito a mudança normativa, tecnológica ou de edital.

O tipo atual `QuestionOrigin` lista `autoral`, `oficial` e `gerada-nao-revisada`. Recomenda-se definir uma representação clara para conteúdo adaptado e metadados de fonte. Antes de alterar o tipo, inspecionar todas as dependências e preservar ids/tentativas existentes.

## 3. Auditoria por seção

Gerar um relatório por seção com, pelo menos:

- id, disciplina, capítulo e objetivo do edital;
- tamanho total e quantidade de conceitos técnicos;
- quantidade de siglas introduzidas antes de serem definidas;
- número e tipo de exemplos trabalhados;
- quantidade de tabelas, código, comandos e notas de exceção;
- objetivo de aprendizagem e pré-requisitos;
- ligação de cada atividade com o conceito explicado;
- distribuição de dificuldade (introdução, aplicação, discriminação/questão de prova);
- qualidade do feedback de cada alternativa;
- referências/fontes e estado de revisão;
- resultado da revisão editorial/técnica.

Essas métricas servem para achar extremos, não para obrigar todos os temas a ter comprimento idêntico. Uma seção sobre `kill` pode ser menor do que uma sobre Active Directory; ambas precisam obedecer a um padrão consistente de aprendizagem.

## 4. Exemplo concreto: processos e memória

`src/content/grimoires/infra/cap03-so/01-processos-memoria.md` introduz, numa única seção, programa/processo/thread, estados, escalonador, troca de contexto, processo zumbi, comandos Linux, ferramentas Windows, memória virtual, paginação, page fault, swap, thrashing, MMU, diagnóstico e serviços. É uma quantidade grande de conceitos e comandos para alguém que acabou de dizer que não entendeu a matéria.

**Não apagar o conteúdo técnico útil.** Reorganizar em microetapas, por dependência:

1. programa versus processo;
2. PID e múltiplas instâncias;
3. thread versus processo;
4. estados e escalonamento;
5. como observar processos no Windows e Linux;
6. encerramento normal versus forçado (`SIGTERM`/`SIGKILL` e equivalentes);
7. memória RAM e memória virtual;
8. página, falta de página, swap e thrashing;
9. serviços e distinção entre `start` e `enable`;
10. caso integrado com diagnóstico e pergunta de concurso.

Cada unidade só exige vocabulário introduzido nela ou previamente. Não trazer `nice`, `nohup`, `SIGKILL`, `MMU`, `thrashing` e `systemctl enable` em um único pacote explicativo antes da compreensão básica de processo.

## 5. Auditoria de questões

Para todas as questões:

- verificar enunciado, resposta, unicidade de alternativa, plausibilidade dos distratores e comentário específico;
- conferir se o conteúdo necessário foi explicado antes da pergunta, ou marcar como teste diagnóstico;
- verificar que a questão não seja duplicata de outra com nomes trocados;
- conferir que o grau de dificuldade corresponde ao objetivo e ao nível esperado;
- identificar comandos e afirmações dependentes da versão do sistema;
- adicionar fonte, versão/data e notas de atualização quando aplicável;
- registrar quais questões precisam de revisão humana.

As checagens atuais de integridade (cinco alternativas, ids únicos, explicação com tamanho mínimo etc.) são úteis, mas não provam precisão técnica nem qualidade pedagógica.

## 6. Referências e materiais externos

Sempre que matéria exigir informação visual, prática ou sujeita a atualização, referenciar documentação primária: documentação oficial de Linux/man-pages, Microsoft Learn, normas oficiais e edital consolidado. Não inserir link sem descrição. Registrar título, autor/instituição, URL, data verificada e quais conceitos aquele recurso apoia.

Para YouTube, manter o recurso como referência audiovisual, não como substituto do texto: identificação do canal/autor, título real, duração, assunto, data conferida, legendas/transcrição e fallback. Não prometer disponibilidade eterna do vídeo; sinalizar se for removido ou indisponível.

## 7. Qualidade editorial

O texto deve soar como professor que conhece o assunto e acompanha a dúvida do estudante. Explicar o termo antes de usar a sigla repetidamente, definir cada comando com ação, efeito e risco, mostrar um exemplo antes de listar exceções e explicar por que uma alternativa de questão está errada. Variar os formatos de explicação. Não colocar a mesma narrativa medieval em todas as matérias; use-a quando ajudar a lembrar o caso, não para ornamentar cada parágrafo.
