Na criptografia **assimétrica** (ou de **chave pública**), cada participante possui um **par de chaves** matematicamente relacionadas:

- **Chave pública**: pode ser divulgada a qualquer pessoa.
- **Chave privada**: fica somente com o titular e nunca é compartilhada.

O que uma chave cifra, **somente a outra chave do mesmo par** desfaz. E, conhecendo a chave pública, não é computacionalmente viável descobrir a privada.

### As duas regras de ouro

Grave estas duas linhas; metade das questões de prova se resolve com elas:

| Objetivo | Quem usa qual chave |
|---|---|
| **Confidencialidade** (só o destinatário lê) | O remetente cifra com a **chave pública do destinatário**; só a **chave privada do destinatário** decifra. |
| **Assinatura** (autenticidade, integridade, não repúdio) | O remetente assina com a **própria chave privada**; qualquer pessoa verifica com a **chave pública do remetente**. |

```
SIGILO
Ana cifra com a PÚBLICA de Bruno
   ▼
[texto cifrado]
   ▼
Bruno decifra com a PRIVADA de Bruno

ASSINATURA
Ana assina com a PRIVADA de Ana
   ▼
[mensagem + assinatura]
   ▼
Qualquer um verifica com a PÚBLICA de Ana
```

> **Erro comum:** "Para garantir sigilo, Ana cifra a mensagem com sua chave privada." **Errado.** Qualquer pessoa tem a chave pública de Ana e poderia decifrar. Cifrar com a privada do remetente serve para provar a autoria, não para esconder o conteúdo.

### Por que ela resolve a distribuição de chaves

A chave pública pode trafegar abertamente. Não é preciso um canal secreto prévio. E a escalabilidade melhora: para **n** participantes bastam **n pares**, isto é, **2n chaves** no total (contra n(n − 1)/2 chaves na simétrica).

> **Exemplo:** 100 pessoas → 100 pares (200 chaves) na assimétrica, contra 4.950 chaves na simétrica.

### Principais algoritmos

| Algoritmo | Base matemática | Uso |
|---|---|---|
| **RSA** (Rivest, Shamir, Adleman, 1977) | Dificuldade de **fatorar** o produto de dois primos grandes. | Cifragem e assinatura. Chaves de **2048 bits** ou mais são o mínimo usual hoje. |
| **Diffie-Hellman (DH)** (1976) | Dificuldade do **logaritmo discreto**. | **Acordo (troca) de chaves**: duas partes combinam um segredo por um canal público. **Não cifra** mensagens nem assina. |
| **ECC** (curvas elípticas: ECDH, ECDSA, Ed25519) | Logaritmo discreto em curvas elípticas. | Mesmo nível de segurança com **chaves bem menores** (uma chave ECC de 256 bits oferece segurança comparável à de um RSA de 3072 bits). |
| **DSA** | Logaritmo discreto. | **Apenas assinatura**. |

### Diffie-Hellman e o ataque do intermediário

O DH "puro" permite que duas partes que nunca se falaram combinem uma chave secreta, mas **não autentica** quem está do outro lado. Um atacante posicionado no meio (*man-in-the-middle*) pode fazer um acordo com cada lado separadamente e repassar as mensagens. A defesa é **autenticar** a troca, por exemplo assinando os parâmetros com uma chave vinculada a um **certificado digital**, como faz o TLS.

### Desvantagem: desempenho

Operações assimétricas são **muito mais lentas** do que as simétricas (ordens de grandeza). Por isso, na prática, ninguém cifra um arquivo grande com RSA: usa-se a assimétrica para **trocar ou proteger uma chave simétrica**, e a simétrica para cifrar os dados. Esse arranjo é a **criptografia híbrida**, tema da última seção.

### Comparativo final

| Aspecto | Simétrica | Assimétrica |
|---|---|---|
| Chaves | Uma secreta, compartilhada | Par: pública + privada |
| Velocidade | Alta | Baixa |
| Distribuição de chaves | Problema central | Resolvida pela chave pública |
| Nº de chaves (n pessoas) | n(n − 1)/2 | 2n (n pares) |
| Não repúdio | Não | Sim (via assinatura) |
| Exemplos | AES, 3DES, ChaCha20 | RSA, ECC, DH (acordo), DSA (assinatura) |
