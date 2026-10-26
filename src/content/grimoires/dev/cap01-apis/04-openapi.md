Uma API só é útil se quem a consome souber usá-la. O edital pede **documentação de APIs (OpenAPI/Swagger)**.

### Como a documentação de APIs surgiu

- **2001: o WSDL.** Para os serviços SOAP, o **WSDL** descrevia em XML as operações de um serviço. Era completo, mas difícil de ler.
- **2010 e 2011: o Swagger.** **Tony Tam**, na empresa **Wordnik**, criou o **Swagger** para descrever APIs REST de forma simples e gerar uma documentação interativa.
- **2015 e 2016: OpenAPI.** O Swagger foi doado à **OpenAPI Initiative**, sob a Linux Foundation (2015), e a especificação foi renomeada **OpenAPI** (2016).
- **2017: OpenAPI 3.0.** Saiu a primeira versão lançada já com o novo nome.

### OpenAPI e Swagger

A **Especificação OpenAPI** é um formato padronizado, em YAML ou JSON, para descrever APIs HTTP: caminhos, operações, parâmetros, corpos de requisição e resposta, códigos de status e esquemas de segurança. Ela nasceu como **Swagger** e foi doada à OpenAPI Initiative, sob a Linux Foundation, em 2015; no ano seguinte foi renomeada para OpenAPI. A versão 2.0 ainda é conhecida como "Swagger 2.0", e a 3.0 foi a primeira lançada com o novo nome. Hoje, "Swagger" designa principalmente o conjunto de ferramentas em torno da especificação, como o **Swagger UI** (documentação interativa) e o **Swagger Editor**.

### O que o documento descreve

```yaml
openapi: 3.0.3
info:
  title: API de Processos
  version: 1.0.0
paths:
  /processos/{numero}:
    get:
      summary: Consulta um processo
      parameters:
        - name: numero
          in: path
          required: true
          schema: { type: string }
      responses:
        '200':
          description: Processo encontrado
          content:
            application/json:
              schema: { $ref: '#/components/schemas/Processo' }
        '404':
          description: Processo inexistente
      security:
        - bearerAuth: []
components:
  schemas:
    Processo:
      type: object
      properties:
        numero: { type: string }
        sigiloso: { type: boolean }
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

### Para que serve

- **Documentação interativa**: o Swagger UI permite testar as chamadas no navegador.
- **Contrato entre equipes**: front-end e back-end combinam a interface antes de implementar (abordagem *design-first* ou *contract-first*).
- **Geração de código**: clientes e esqueletos de servidor gerados a partir do documento.
- **Validação e testes**: verificar se requisições e respostas obedecem ao contrato.

### Abordagens

| Abordagem | Como funciona |
|---|---|
| *Design-first* | Escreve-se o documento OpenAPI primeiro; o código segue o contrato. |
| *Code-first* | Anotações no código geram o documento automaticamente. |

### Relação com outros padrões

O OpenAPI descreve APIs HTTP no estilo REST. Para GraphQL, a descrição é o próprio **esquema** do GraphQL; para serviços SOAP, o equivalente histórico é o **WSDL**; para APIs orientadas a eventos e mensagens existe o **AsyncAPI**.
