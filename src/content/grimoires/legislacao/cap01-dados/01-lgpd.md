O edital cobra a **aplicação técnica** da LGPD (Lei nº 13.709/2018): como ela muda o desenho, o desenvolvimento e a operação dos sistemas.

### Conceitos de base (art. 5º)

| Termo | Significado |
|---|---|
| **Dado pessoal** | Informação relacionada a pessoa natural identificada ou identificável |
| **Dado pessoal sensível** | Origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou organização de caráter religioso, filosófico ou político, saúde, vida sexual, dado genético ou biométrico |
| **Dado anonimizado** | Dado de titular que não possa ser identificado, considerando os meios técnicos razoáveis disponíveis no momento do tratamento |
| **Controlador** | Quem toma as decisões sobre o tratamento |
| **Operador** | Quem trata os dados em nome do controlador |
| **Encarregado** | Canal de comunicação entre controlador, titulares e a ANPD |
| **Tratamento** | Toda operação com dados: coleta, armazenamento, uso, compartilhamento, eliminação etc. |

Num contrato de sistema em nuvem para o tribunal, o tribunal costuma ser o **controlador** e a empresa contratada, a **operadora**.

### Princípios que viram requisitos (art. 6º)

Além da boa-fé: **finalidade**, **adequação**, **necessidade**, livre acesso, qualidade dos dados, **transparência**, **segurança**, **prevenção**, não discriminação e **responsabilização e prestação de contas**.

O princípio da **necessidade** é a base legal da **minimização**: tratar só o mínimo necessário para a finalidade, com dados pertinentes, proporcionais e não excessivos. Na prática:

- não criar campos "para o caso de precisar";
- não registrar CPF completo em logs;
- definir prazos de retenção e eliminar o que venceu;
- mostrar a cada perfil só os dados de que precisa.

### Privacy by design e by default

- **By design** (desde a concepção): a privacidade entra no **requisito e na arquitetura**, não como remendo. A LGPD determina que as medidas de segurança sejam observadas **desde a fase de concepção do produto ou do serviço até a sua execução** (art. 46, § 2º), e que os sistemas sejam estruturados para atender aos requisitos de segurança, às boas práticas e aos princípios da lei (art. 49).
- **By default** (por padrão): a configuração inicial é a **mais protetiva**. Por exemplo, perfil não público, compartilhamento desligado e coleta opcional desmarcada. A expressão não aparece literalmente na lei; decorre dos princípios da necessidade e da finalidade.

### Anonimização × pseudonimização

| | Anonimização | Pseudonimização |
|---|---|---|
| O que é | O dado perde a possibilidade de associação, direta ou indireta, a um indivíduo | O dado só volta a ser associado ao indivíduo com uma **informação adicional mantida separadamente** pelo controlador, em ambiente controlado e seguro |
| Continua dado pessoal? | **Não** (art. 12), salvo se o processo puder ser revertido com esforços razoáveis | **Sim** |
| Técnicas | Generalização (faixa etária em vez de data de nascimento), supressão, agregação, perturbação | *Tokenização*, substituição do CPF por identificador aleatório com tabela de correspondência guardada à parte, *hash* com chave secreta |

Pegadinha clássica: um *hash* simples de CPF **não** anonimiza, porque há só cerca de um bilhão de CPFs possíveis e é fácil calcular todos.

### Outros dispositivos com impacto em sistemas

- **Bases legais** (art. 7º; sensíveis no art. 11): consentimento é apenas uma delas. O poder público trata dados principalmente para **execução de políticas públicas** e **cumprimento de obrigação legal**, no exercício de suas competências (art. 23).
- **Direitos do titular** (art. 18): confirmação e acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade, informação sobre compartilhamento, revogação do consentimento. O sistema precisa ter funções para atendê-los.
- **Decisões automatizadas** (art. 20): o titular pode pedir revisão de decisões tomadas unicamente com base em tratamento automatizado.
- **Relatório de impacto à proteção de dados** (RIPD, art. 38): documenta riscos e medidas, especialmente para dados sensíveis e alto risco.
- **Incidentes** (art. 48): o controlador comunica à ANPD e ao titular o incidente que possa acarretar **risco ou dano relevante**. O regulamento da ANPD (Resolução CD/ANPD nº 15/2024) fixa o prazo de **três dias úteis**.
- **Sanções** (art. 52): advertência, multa de até 2% do faturamento limitada a R$ 50 milhões por infração, publicização, bloqueio e eliminação de dados, entre outras. **Órgãos e entidades públicas não estão sujeitos às multas**, mas sim às demais sanções.

### Pegadinhas

1. "Dado pseudonimizado deixa de ser dado pessoal." Falso. Com a informação adicional, volta a identificar o titular.
2. "O consentimento é a única base legal para tratar dados." Falso. Há dez bases no art. 7º.
3. "Órgãos públicos podem receber multa simples da ANPD." Falso. Sofrem as outras sanções, não as multas.
4. "Privacy by design significa revisar a privacidade depois que o sistema estiver pronto." Falso. É desde a concepção.
