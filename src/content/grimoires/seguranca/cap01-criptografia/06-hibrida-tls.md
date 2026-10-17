### Criptografia híbrida

Os sistemas reais aproveitam o melhor de cada família:

1. Gera-se uma **chave de sessão simétrica** aleatória.
2. Os **dados** são cifrados com essa chave simétrica (rápido).
3. A **chave de sessão** é protegida pela criptografia assimétrica: ela é cifrada com a chave pública do destinatário ou combinada por um acordo de chaves (Diffie-Hellman).

Exemplos: **TLS/HTTPS**, **PGP/GPG** e **S/MIME** (e-mail seguro).

> **Formulação típica de prova:** "A criptografia assimétrica é usada para a troca da chave de sessão, e a simétrica para a cifragem dos dados, por ser mais eficiente." **Correto.**

### TLS: o protocolo do cadeado

O **TLS** (*Transport Layer Security*) protege a comunicação entre cliente e servidor; o **HTTPS** é o HTTP sobre TLS (porta padrão **443**). O antigo **SSL** e as versões TLS 1.0 e 1.1 estão obsoletos; as versões aceitas hoje são **TLS 1.2** e **TLS 1.3** (RFC 8446).

Visão simplificada do *handshake* no TLS 1.3:

1. O **cliente** envia as cifras que suporta e sua parte do acordo de chaves (ECDHE).
2. O **servidor** responde com sua parte do acordo, envia seu **certificado** e **assina** o *handshake* com sua chave privada, provando que possui a chave correspondente ao certificado.
3. O cliente **valida o certificado** (cadeia até uma AC raiz confiável, validade, nome do servidor, revogação).
4. Ambos derivam as mesmas **chaves de sessão simétricas** a partir do segredo combinado.
5. Os dados passam a trafegar cifrados com **cifragem autenticada** (por exemplo, AES-GCM ou ChaCha20-Poly1305).

### Sigilo futuro (*forward secrecy*)

No **TLS 1.3**, o acordo de chaves é sempre **efêmero** (DHE/ECDHE): as chaves de sessão não podem ser recalculadas depois, mesmo que, no futuro, a chave privada do servidor vaze. Por isso o TLS 1.3 **removeu a troca de chaves por RSA estático**, que não oferecia essa propriedade.

### O que o HTTPS protege e o que não protege

| Protege | Não protege |
|---|---|
| Confidencialidade dos dados em trânsito | Dados armazenados no servidor ou no computador do usuário |
| Integridade dos dados em trânsito | Um site legítimo mas malicioso (o cadeado não atesta boa-fé) |
| Autenticidade do servidor (via certificado) | Falhas na própria aplicação (injeção de SQL, XSS etc.) |

### Quadro-resumo do capítulo

| Preciso de… | Use… |
|---|---|
| Cifrar grande volume de dados | Simétrica (AES, preferencialmente em modo GCM) |
| Enviar algo que só o destinatário leia | Chave **pública do destinatário** (na prática, híbrida) |
| Provar autoria e impedir negação | **Assinatura digital** (chave **privada do remetente**) |
| Detectar alteração com chave compartilhada | **HMAC** |
| Verificar integridade de um download | Hash (SHA-256) publicado por fonte confiável |
| Guardar senhas | Argon2id, scrypt, bcrypt ou PBKDF2, com sal |
| Confiar que a chave pública é de quem diz ser | **Certificado digital** emitido por AC |

### Pegadinhas frequentes

1. "Hash garante confidencialidade." **Falso.**
2. "Cifrar com a chave privada do remetente garante sigilo." **Falso**: garante autoria.
3. "Assinatura digital garante confidencialidade." **Falso.**
4. "Diffie-Hellman é um algoritmo de cifragem de mensagens." **Falso**: é de acordo de chaves.
5. "O AES admite blocos de 128, 192 e 256 bits." **Falso**: o bloco é sempre 128; as **chaves** é que variam.
6. "MAC garante não repúdio." **Falso**: a chave é compartilhada.
7. "O certificado digital contém a chave privada do titular." **Falso.**
8. "Criptografia garante disponibilidade." **Falso.**
9. "ECB é o modo mais seguro por ser o mais simples." **Falso**: revela padrões.
10. "Na simétrica, 20 usuários precisam de 20 chaves." **Falso**: 20 × 19 / 2 = **190**.
