### Assinatura digital: como funciona

A assinatura digital combina **hash** e **criptografia assimétrica**:

**Para assinar (remetente):**
1. Calcula o **hash** do documento.
2. Cifra esse hash com a sua **chave privada**. O resultado é a **assinatura**.
3. Envia o documento junto com a assinatura.

**Para verificar (qualquer destinatário):**
1. Calcula, por conta própria, o hash do documento recebido.
2. Usa a **chave pública do remetente** para verificar a assinatura e obter o hash original.
3. Se os dois hashes coincidem, a assinatura é **válida**.

> A descrição "cifrar o hash com a chave privada" é a forma didática usual (e corresponde ao RSA). Esquemas como ECDSA e Ed25519 não "cifram" literalmente, mas o raciocínio de prova é o mesmo: **assina-se com a privada do signatário e verifica-se com a pública do signatário**.

**Por que assinar o hash e não o documento inteiro?** Porque a operação assimétrica é lenta; o hash tem tamanho fixo e pequeno, e qualquer alteração no documento altera o hash.

### O que a assinatura garante e o que não garante

| Garante | Não garante |
|---|---|
| **Integridade**: qualquer alteração invalida a assinatura. | **Confidencialidade**: o documento assinado continua legível. |
| **Autenticidade**: só o titular da chave privada poderia tê-la produzido. | **Disponibilidade**. |
| **Não repúdio**: o signatário não pode negar a autoria. | |

Se for preciso **sigilo e assinatura**, faz-se as duas coisas: assina-se com a privada do remetente **e** cifra-se para o destinatário (na prática, com uma chave simétrica protegida pela chave pública do destinatário).

### O problema da confiança na chave pública

Se Ana recebe "a chave pública de Bruno", como sabe que ela é mesmo de Bruno, e não de um impostor? Essa é a função do **certificado digital**.

### Certificado digital

Um **certificado digital** é um documento eletrônico que **vincula uma chave pública a uma identidade** (pessoa, empresa, servidor), **assinado digitalmente por uma Autoridade Certificadora (AC)**. O formato padrão é o **X.509**, que inclui, entre outros campos:

- Titular (*subject*) e emissor (*issuer*);
- **Chave pública do titular**;
- Período de validade;
- Número de série;
- **Assinatura da AC emissora**.

> **O certificado não contém a chave privada do titular.** Afirmação contrária é erro típico de prova.

### Infraestrutura de Chaves Públicas (ICP / PKI)

A **ICP** é o conjunto de entidades, normas e tecnologias que emite e gerencia certificados:

- **AC Raiz**: topo da hierarquia; seu certificado é autoassinado e confiado previamente (vem instalado em sistemas e navegadores).
- **ACs intermediárias / subordinadas**: emitem certificados aos usuários finais.
- **Autoridades de Registro (AR)**: fazem a identificação do solicitante e encaminham o pedido à AC.

A confiança forma uma **cadeia de certificação**: o navegador valida o certificado do site, depois o da AC que o assinou, e assim por diante, até chegar a uma raiz confiável.

**Revogação:** um certificado pode ser revogado antes do vencimento (por exemplo, se a chave privada vazou). Consulta-se a situação pela **LCR** (Lista de Certificados Revogados, *CRL*) ou pelo protocolo **OCSP**, que responde o estado de um certificado específico.

### ICP-Brasil

No Brasil, a **ICP-Brasil** foi instituída pela **Medida Provisória nº 2.200-2, de 24 de agosto de 2001**. A **AC Raiz** da ICP-Brasil é o **Instituto Nacional de Tecnologia da Informação (ITI)**. Documentos eletrônicos assinados com certificados ICP-Brasil gozam de presunção de veracidade em relação aos signatários, nos termos da própria MP 2.200-2/2001 (art. 10, § 1º).

### Assinatura digital × assinatura digitalizada

- **Assinatura digital**: mecanismo criptográfico descrito acima.
- **Assinatura digitalizada**: imagem escaneada de uma assinatura manuscrita. **Não oferece** integridade nem não repúdio criptográficos.
