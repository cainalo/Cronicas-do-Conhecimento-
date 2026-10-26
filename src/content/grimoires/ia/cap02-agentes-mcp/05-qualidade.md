O último item do bloco agentivo no edital é "avaliação da qualidade do código produzido por IA; alucinações e validação de resultados; segurança, privacidade, propriedade intelectual e ética no desenvolvimento assistido por IA".

### Usos no ciclo de desenvolvimento

O edital lista: geração, revisão, documentação e depuração de código, além da geração de testes. Em todos, a IA produz um rascunho que precisa ser verificado. Uma regra prática: quanto mais difícil verificar a saída, mais cuidado com a confiança depositada nela.

### Alucinações em código

| Tipo | Exemplo | Como detectar |
|---|---|---|
| API inexistente | Chamar um método que a biblioteca não tem. | Compilação, verificação de tipos, testes. |
| Pacote inexistente | Sugerir instalar uma biblioteca que não existe. | Conferir no repositório oficial antes de instalar. |
| Comportamento errado | Código que compila, mas não faz o que foi pedido. | Testes que expressem o requisito. |
| Teste que não testa | Teste que sempre passa, ou que foi ajustado para aceitar o erro. | Revisão humana do teste; fazer o teste falhar de propósito. |

O caso dos pacotes é um risco de segurança: atacantes registram nomes de pacotes que os modelos costumam inventar, para que alguém os instale. A prática ganhou o apelido de *slopsquatting*.

### Validação de resultados

- Testes automatizados (unitários, de integração, de regressão) executados a cada mudança.
- Análise estática e linters.
- Revisão de código por pessoa que entenda a mudança.
- Ferramentas de segurança: análise de dependências, busca de segredos expostos, testes de segurança (DevSecOps).
- Comparação com a especificação: o código atende aos critérios de aceite?

### Segurança

- Código gerado pode conter falhas clássicas, como injeção de SQL e validação ausente de entradas. Ele passa pelos mesmos controles do código humano.
- O agente não deve ter acesso a segredos de produção sem necessidade.
- Conteúdo lido pelo agente (issues, páginas web, arquivos) pode conter injeção de prompt.

### Privacidade

Enviar código ou dados a um serviço de IA é transferir informação a terceiros. Antes de usar, verifique a política da organização, os termos do fornecedor sobre retenção e uso para treinamento e a presença de **dados pessoais** (LGPD). Dados pessoais e sigilosos não devem ir para ferramentas não autorizadas. No TCE-GO, o uso de ferramentas de IA é disciplinado pela Resolução Administrativa nº 24/2024, que consta do edital em Legislação Institucional.

### Propriedade intelectual e ética

- Código gerado pode reproduzir trechos protegidos por licenças incompatíveis; organizações usam verificadores de licença e políticas de uso.
- A responsabilidade pelo código continua de quem o aprova e publica, não da ferramenta.
- Transparência: registrar quando e como a IA foi usada ajuda auditoria e manutenção.

### Pegadinhas

1. "O agente executa diretamente os comandos que decide." Falso. Ele pede; a aplicação executa, podendo negar ou pedir confirmação.
2. "No MCP, cada cliente atende vários servidores." Falso. Cada cliente mantém conexão com um servidor; o host pode ter vários clientes.
3. "*Resources* são funções executadas pelo modelo." Falso. Funções são *tools*; *resources* são dados de contexto.
4. "Se os testes passaram, o código gerado está correto." Falso. Só está correto naquilo que os testes cobrem.
5. "Instruções no `CLAUDE.md` garantem que o agente nunca fará algo." Falso. Instruções orientam; garantias vêm de permissões e hooks.
6. "Skills carregam todo o conteúdo no contexto desde o início." Falso. Primeiro só o nome e a descrição (divulgação progressiva).
