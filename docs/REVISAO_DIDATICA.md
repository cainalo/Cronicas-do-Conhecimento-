# Revisão didática (pacote v4, etapa 1)

Data: 26/10/2026. A revisão foi feita pelo Claude, lendo como professor e como alguém que nunca viu o assunto. **Não é revisão humana**: o estado editorial de todo o material continua `nao-revisado`.

## O que mudou na estrutura

- **Série de aulas por trecho.** Um trecho grande pode virar várias aulas pequenas, em ordem (`MicroLesson.series`). Os detalhes:
  - Cada aula é uma etapa da trilha: `aprender:cap:trecho#aula`, rota `/aprender/:cap/:trecho/:aula`.
  - Cada aula tem a sua retomada exata, e o "Próxima aula" leva à seguinte.
  - O trecho só conta como lido no fim da última aula.
  - Quem já tinha concluído o trecho continua com tudo concluído.
- **Vocabulário controlado** (`MicroLesson.vocab`). Cada aula declara os termos que apresenta e a etapa em que isso acontece.
  - O teste `src/test/micro.test.ts` lê explicação, exemplo, checagem, alternativas, feedback, recuperação e prática, e acusa qualquer uso de um termo antes da etapa ou da aula que o ensina.
  - Um caso de controle confirma que o validador acusa a violação.
  - O diagnóstico de abertura fica fora da verificação, porque não conta como ensino nem como domínio.
- Aula sem questão de prova agora termina depois da prática; antes, nunca terminava.

## Amostra de Matemática: `cap.mat.01 › inteiros`

A seção de referência (`01-inteiros-fracoes.md`) trazia, numa página só, conjuntos numéricos, sinais, ordem das operações, potências, frações, dízimas e fração do restante. Ela virou uma série de **9 aulas** (`src/content/micro/mat-inteiros-{a,b,c}.ts`):

| Aula | Ensina | Prova no fim |
|---|---|---|
| 1 | Números na reta: contar (ℕ), reta, negativos (ℤ), comparar, oposto e módulo | — |
| 2 | Somar como andar na reta; atalho dos sinais; subtrair é somar o oposto; tirar um negativo | — |
| 3 | Multiplicar como grupos; vezes negativo; por que negativo × negativo = positivo; dividir; zero | — |
| 4 | Expressões: prioridade, empate da esquerda para a direita, ( ) [ ] { }, expressões com negativos | — |
| 5 | Potências: base e expoente, base negativa, −2² × (−2)², expoentes 0 e 1, propriedades, ordem | q.mat.01.001 |
| 6 | Fração: partes iguais, numerador e denominador, divisão, equivalentes, simplificar, comparar | — |
| 7 | Somar e subtrair frações: mesmo denominador, denominador comum, múltiplos e MMC, o inteiro | — |
| 8 | Fração de uma quantidade, multiplicar, dividir (quantas cabem), por que inverter | — |
| 9 | Racionais e decimais, dízimas, expoente negativo, fração do restante, do que sobrou ao total | q.mat.01.002 e q.mat.01.003 |

- **Cobertura:** todo subtópico da seção de referência está em alguma aula. Nada foi cortado; o texto completo continua no livro.
- **MMC:** é ensinado aqui só como "o primeiro múltiplo nas duas listas". O método rápido fica para o trecho seguinte (`divisores`), que já é o próximo da trilha.

## Amostra de TI: `cap.infra.03 › processos`

- **Etapa nova no início:** "O computador por dentro: processador, memória e disco", com o conceito `c.so.hardware` no mapa da unidade (versão 2). Antes, CPU e RAM eram usadas sem explicação.
- **Termos explicados onde aparecem:** terminal e comando (na etapa de ps e top), SSH, boot e systemd.
- **Termo antes da hora retirado:** "segundo plano" saiu do exemplo de threads.
- **Defeito encontrado pelo validador:** a checagem de ps e top oferecia `kill` como alternativa, antes de `kill` ser ensinado. A alternativa foi trocada.
- **Vocabulário controlado** da aula: CPU, RAM, PID, thread, escalonador, zumbi, kill/SIGTERM/SIGKILL, nice, segundo plano, memória virtual, swap/thrashing e systemd.
- **Retomada:** o ponto salvo no formato antigo continua abrindo a aula, uma etapa antes (por causa da etapa nova). Nada se perde.

## Checklist (13_CHECKLIST_REVISAO_DIDATICA.csv)

| Item | Matemática (série) | TI (Processos) | Observação |
|---|---|---|---|
| D01 objetivo claro | ok | ok | Cada etapa tem "Objetivo". |
| D02 parte do familiar | ok | ok | Saldo, elevador, pizza; o escritório para CPU, RAM e disco. |
| D03 divisão natural | ok | parcial | Processos continua uma aula longa (16 etapas). Dividir em série é o próximo passo. |
| D04 termo antes do uso | ok (teste) | ok (teste) | Validador automático. |
| D05 explica o porquê | ok | ok | Regra de sinais pelo padrão; inversão da divisão; a⁰ pela escada. |
| D06 exemplo passo a passo | ok | ok | |
| D07 checagem do que foi ensinado | ok | ok | |
| D08 alternativas sem conceito futuro | ok (teste) | ok (teste) | |
| D09 feedback com causa do erro | ok | ok | Cada alternativa tem "por quê". |
| D10 recuperação com outro exemplo | ok | ok | Teste exige item diferente. |
| D11 limites da analogia | parcial | parcial | As analogias são curtas, mas nem todas dizem onde deixam de valer. |
| D12 linguagem adulta e precisa | ok | ok | |
| D13 sabe o que vem depois | ok | ok | A síntese mostra a próxima aula ou a prática. |
| D14 tabelas explicadas | ok | parcial | A tabela de systemctl ainda é densa. |
| D15 pré-requisitos cobertos | ok | ok | |
| D16 cobre o tópico do edital | ok | ok | |
| D17 dificuldade gradual | ok | ok | Prova só na aula em que tudo já foi ensinado. |
| D18 tempo plausível | ok | ok | |
| D19 funciona sem voz nem internet | ok | ok | Conteúdo embutido no app. |
| D20 estado editorial honesto | ok | ok | `nao-revisado`. |

## Próximos lotes

- Dividir Processos numa série: computador e processos; estados e escalonador; observar e encerrar; memória; serviços.
- Aplicar o modelo aos trechos seguintes de Matemática (`divisores`, `razoes`, `porcentagem`).
- Aplicar às demais microaulas de Infraestrutura, com vocabulário controlado.
