As APIs trocam dados em formatos de texto estruturado. O edital cita **JSON** e **XML**.

### JSON

O JSON (*JavaScript Object Notation*, RFC 8259) representa dados com seis tipos:

| Tipo | Exemplo |
|---|---|
| Objeto | `{ "nome": "Ana", "idade": 30 }` |
| Array | `[1, 2, 3]` |
| String | `"texto entre aspas duplas"` |
| Número | `42`, `3.14`, `-1e3` |
| Booleano | `true`, `false` |
| Nulo | `null` |

Regras que caem em prova:

- Chaves de objeto são **sempre strings entre aspas duplas**. Aspas simples não são válidas.
- **Não há comentários** em JSON.
- Não há tipo de data: datas viajam como string, geralmente no formato ISO 8601 (`"2027-01-17T08:00:00-03:00"`).
- Vírgula depois do último item (*trailing comma*) é inválida.

```json
{
  "processo": "12345/2026",
  "relator": { "nome": "Conselheiro A", "gabinete": 3 },
  "anexos": ["parecer.pdf", "voto.pdf"],
  "sigiloso": false,
  "julgado_em": null
}
```

### XML

O XML (*eXtensible Markup Language*) organiza os dados em elementos aninhados com marcações de abertura e fechamento, e pode ter atributos.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<processo numero="12345/2026" sigiloso="false">
  <relator gabinete="3">Conselheiro A</relator>
  <anexos>
    <anexo>parecer.pdf</anexo>
    <anexo>voto.pdf</anexo>
  </anexos>
</processo>
```

Dois conceitos distintos:

- **Bem formado**: segue a sintaxe do XML (um único elemento raiz, todas as marcações fechadas e corretamente aninhadas, atributos entre aspas, diferenciação entre maiúsculas e minúsculas).
- **Válido**: além de bem formado, obedece a um esquema declarado (DTD ou XSD), que define quais elementos e tipos são permitidos.

Todo documento válido é bem formado; nem todo bem formado é válido.

Outros pontos: **namespaces** evitam conflito de nomes entre vocabulários; **XPath** localiza partes do documento; o XML é a base de padrões mais antigos de serviços web, como o SOAP.

### Comparação

| Aspecto | JSON | XML |
|---|---|---|
| Verbosidade | Menor | Maior (marcações de fechamento) |
| Tipos nativos | Número, booleano, nulo, array | Tudo é texto; tipos vêm do esquema |
| Validação | JSON Schema (opcional) | DTD ou XSD |
| Comentários | Não | Sim (`<!-- -->`) |
| Atributos | Não | Sim |
| Uso típico hoje | APIs REST, configuração | Documentos, integrações legadas, SOAP, notas fiscais eletrônicas |
