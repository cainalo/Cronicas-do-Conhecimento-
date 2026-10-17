Uma **função hash criptográfica** recebe uma entrada de qualquer tamanho e produz um **resumo** (*digest*) de **tamanho fixo**. Não usa chave e **não pode ser revertida**: não existe "decifrar um hash".

```
"Tribunal de Contas"
   ▼ SHA-256
256 bits (64 dígitos hexadecimais)

"Tribunal de contas"   (só o "c" mudou)
   ▼ SHA-256
outros 256 bits, completamente diferentes
```

### Propriedades exigidas

| Propriedade | O que significa |
|---|---|
| **Determinismo** | A mesma entrada sempre gera o mesmo resumo. |
| **Tamanho fixo** | O resumo tem sempre o mesmo comprimento, seja a entrada uma letra ou um disco inteiro. |
| **Resistência à pré-imagem** (mão única) | Dado um resumo *h*, é inviável encontrar uma entrada *m* tal que hash(*m*) = *h*. |
| **Resistência à segunda pré-imagem** | Dada uma entrada *m1*, é inviável encontrar outra *m2* com o mesmo resumo. |
| **Resistência a colisões** | É inviável encontrar **quaisquer** duas entradas diferentes com o mesmo resumo. |
| **Efeito avalanche** | Uma alteração mínima na entrada muda drasticamente o resumo. |

> **Colisões existem sempre**, porque há infinitas entradas possíveis e um número finito de resumos. O que se exige é que seja **computacionalmente inviável encontrá-las**.

### Algoritmos

| Algoritmo | Tamanho do resumo | Situação |
|---|---|---|
| **MD5** | 128 bits | **Quebrado** para colisões. Não usar para segurança. |
| **SHA-1** | 160 bits | **Quebrado** para colisões (colisão prática demonstrada em 2017). Descontinuado. |
| **SHA-2** (SHA-224, **SHA-256**, SHA-384, SHA-512) | 224 a 512 bits | Seguro e amplamente usado (NIST FIPS 180-4). |
| **SHA-3** (Keccak) | 224 a 512 bits | Seguro; construção diferente (esponja), padronizado no NIST FIPS 202. |

### Para que serve o hash

1. **Verificação de integridade** de arquivos baixados (comparar o resumo publicado com o calculado).
2. **Assinatura digital**: assina-se o **hash** da mensagem, não a mensagem inteira (ver próxima seção).
3. **Armazenamento de senhas** (com cuidados especiais, abaixo).
4. **Estruturas de dados e blockchain**, deduplicação, identificação de conteúdo.

### Hash não é criptografia

Questões de prova adoram afirmar que "o hash garante confidencialidade" ou que "é possível decifrar o hash com a chave adequada". Ambas são **falsas**: hash não tem chave, não esconde a mensagem de forma recuperável e não é reversível.

### MAC e HMAC: hash com chave

Um **MAC** (*Message Authentication Code*) é um valor calculado a partir da mensagem **e de uma chave secreta compartilhada**. O **HMAC** (RFC 2104) é a construção de MAC baseada em uma função hash, como **HMAC-SHA256**.

- Garante **integridade** e **autenticidade** entre quem compartilha a chave.
- **Não garante confidencialidade** (a mensagem segue em claro, a não ser que também seja cifrada).
- **Não garante não repúdio** (as duas partes conhecem a chave).

### Armazenamento seguro de senhas

Guardar senhas em texto claro é inaceitável; guardar apenas `SHA-256(senha)` também é insuficiente, porque hashes de propósito geral são **rápidos** — o que favorece ataques de dicionário e força bruta — e porque senhas iguais gerariam resumos iguais.

Boas práticas (conforme a OWASP *Password Storage Cheat Sheet*):

- **Sal (*salt*)**: valor aleatório e único por usuário, armazenado junto ao hash. Faz senhas iguais produzirem resumos diferentes e inutiliza tabelas pré-computadas (*rainbow tables*).
- **Funções lentas e adaptativas**, próprias para senhas: **Argon2id** (preferencial), **scrypt**, **bcrypt** ou **PBKDF2**, com fator de trabalho configurável.
- **Pimenta (*pepper*)** opcional: segredo adicional guardado fora do banco de dados.

### Exemplo prático: calculando SHA-256 no navegador

A Web Crypto API, disponível nos navegadores modernos, calcula resumos de forma nativa:

```js
async function sha256Hex(texto) {
  const bytes = new TextEncoder().encode(texto);
  const resumo = await crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(resumo)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// sha256Hex('abc') → 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
```

O valor do comentário é o vetor de teste oficial de SHA-256 para a entrada "abc". Experimente trocar uma única letra e observe o efeito avalanche.
