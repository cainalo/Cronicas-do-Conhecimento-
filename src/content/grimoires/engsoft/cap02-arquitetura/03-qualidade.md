### Atributos de qualidade

O edital cita **desempenho, escalabilidade, disponibilidade, confiabilidade e manutenibilidade**.

| Atributo | Pergunta | Como medir |
|---|---|---|
| **Desempenho** | Quão rápido e com que uso de recursos? | Tempo de resposta (percentil 95), vazão, CPU e memória |
| **Escalabilidade** | Aguenta mais carga acrescentando recursos? | Vazão conforme se adicionam instâncias |
| **Disponibilidade** | Está acessível quando necessário? | Percentual de tempo no ar (99,9%) |
| **Confiabilidade** | Funciona sem falhas por um período? | Tempo médio entre falhas (MTBF), taxa de erros |
| **Manutenibilidade** | É fácil de corrigir e evoluir? | Tempo médio de reparo (MTTR), complexidade, cobertura de testes |

O modelo de referência é a **ISO/IEC 25010**. A edição de 2011 tinha oito características: adequação funcional, eficiência de desempenho, compatibilidade, usabilidade, confiabilidade, segurança, manutenibilidade e portabilidade. A revisão de 2023 acrescentou a **proteção** (*safety*) e renomeou algumas, como usabilidade para capacidade de interação e portabilidade para flexibilidade.

### Tipos de teste

| Teste | Verifica | Exemplo |
|---|---|---|
| **Unitário** | A menor unidade isolada (função, classe), com dependências simuladas (*mocks*) | Cálculo de juros de mora |
| **Integração** | A comunicação entre componentes | Serviço gravando de fato no banco |
| **Funcional** | Se o sistema faz o que os requisitos pedem, do ponto de vista do usuário (caixa-preta) | Enviar uma prestação de contas pela tela |
| **Regressão** | Se o que funcionava **continua funcionando** após mudanças | Rodar toda a suíte a cada *commit* |
| **Carga** | O comportamento sob a carga **esperada** | 2.000 usuários simultâneos no último dia de prazo |
| **Estresse** | O comportamento **além do limite**, até quebrar, e a recuperação | Dobrar a carga até a falha |
| **Aceitação** | Se o usuário aceita a entrega | Validar os critérios de aceite |

Outras distinções:

- **Caixa-branca** (conhece o código: cobertura de comandos e de desvios) × **caixa-preta** (só entradas e saídas: partição de equivalência, valor-limite).
- **Pirâmide de testes**: muitos testes unitários (rápidos e baratos), menos de integração, poucos de ponta a ponta (lentos e frágeis).
- **Testes automatizados** são a base da integração contínua: sem eles, cada entrega exige retestar tudo à mão.

### Revisão de código e refatoração

- **Revisão de código** (*code review*): outra pessoa examina a mudança antes de integrá-la, por exemplo num *pull request*. Encontra defeitos cedo, espalha conhecimento e mantém padrões. Ferramentas de análise estática complementam, mas não substituem.
- **Refatoração**: melhorar a **estrutura interna** do código **sem alterar o comportamento externo**. Depende de testes para garantir que nada mudou. Exemplos: extrair método, renomear, remover duplicação.
- ***Code smells*** (maus cheiros): sinais de que é hora de refatorar. Exemplos: método longo, classe gigante, código duplicado, muitos parâmetros.

### Dívida técnica

**Dívida técnica** é o custo futuro de atalhos tomados hoje: código apressado, falta de testes, arquitetura que não acompanhou o crescimento. Como dívida financeira, gera **juros**: cada mudança fica mais lenta e arriscada.

- Pode ser **deliberada** (atalho consciente para cumprir um prazo, com plano de pagamento) ou **inadvertida** (por desconhecimento).
- Deve ser **visível**: registrada no *backlog*, medida e paga aos poucos (refatoração contínua, regra do escoteiro: deixe o código melhor do que encontrou).

### Pegadinhas

1. "Teste de estresse avalia o sistema sob a carga normal esperada." Falso. Esse é o de carga; o de estresse vai além do limite.
2. "Refatorar é acrescentar funcionalidades." Falso. O comportamento externo não muda.
3. "Teste de regressão só é feito na primeira versão." Falso. É feito a cada mudança.
4. "A pirâmide de testes recomenda mais testes de ponta a ponta que unitários." Falso. É o inverso.
