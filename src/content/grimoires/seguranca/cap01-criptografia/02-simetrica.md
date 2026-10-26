Na criptografia **simétrica** (ou de chave secreta), **a mesma chave** cifra e decifra. Remetente e destinatário precisam possuí-la antes de se comunicar.

```
Texto claro
   │  cifrar com a chave K
   ▼
Texto cifrado
   │  decifrar com a MESMA chave K
   ▼
Texto claro
```

### Vantagens e limitações

- **Vantagem:** é muito **rápida** e eficiente, adequada para grandes volumes de dados (discos, arquivos, tráfego de rede).
- **Limitação 1, a distribuição de chaves:** como fazer a chave chegar ao outro lado sem que alguém a intercepte? Esse é o problema que a criptografia assimétrica veio resolver.
- **Limitação 2, a escalabilidade:** cada par de pessoas que deseja sigilo entre si precisa de uma chave própria. Para **n** participantes, são necessárias **n(n − 1) / 2** chaves.

> **Exemplo de cálculo:** 10 pessoas → 10 × 9 / 2 = **45 chaves**. 100 pessoas → 100 × 99 / 2 = **4.950 chaves**.

- **Limitação 3, o não repúdio:** como as partes compartilham a chave, a simétrica não oferece não repúdio.

### Cifras de bloco e cifras de fluxo

- **Cifra de bloco:** processa a mensagem em blocos de tamanho fixo (por exemplo, 128 bits no AES). Exemplos: **DES, 3DES, AES, Blowfish, Twofish**.
- **Cifra de fluxo:** gera uma sequência pseudoaleatória (*keystream*) combinada, normalmente por XOR, com cada bit/byte do texto. Exemplos: **RC4** (hoje considerado inseguro e proibido no TLS) e **ChaCha20** (moderno, usado no TLS 1.3).

### Algoritmos que caem em prova

| Algoritmo | Tipo | Bloco | Chave | Situação |
|---|---|---|---|---|
| **DES** | Bloco | 64 bits | 56 bits efetivos | Inseguro: chave curta, quebrável por força bruta. |
| **3DES** (Triple DES) | Bloco | 64 bits | 112 ou 168 bits (nominais) | Legado; descontinuado pelo NIST. |
| **AES** (Rijndael) | Bloco | **128 bits** | **128, 192 ou 256 bits** | **Padrão atual** (NIST FIPS 197, 2001). |
| **ChaCha20** | Fluxo | não se aplica | 256 bits | Moderno; comum em dispositivos móveis. |
| **RC4** | Fluxo | não se aplica | variável | **Inseguro**. |

Pontos de atenção:

- O **AES** foi escolhido pelo NIST em concurso público; o vencedor foi o algoritmo **Rijndael**. O AES tem bloco fixo de 128 bits; o que varia é o **tamanho da chave** (e, com ele, o número de rodadas: 10, 12 ou 14).
- O **3DES** aplica o DES três vezes (cifrar–decifrar–cifrar, "EDE"). Com três chaves distintas, a chave nominal é de 168 bits, mas a segurança efetiva é menor por causa do ataque *meet-in-the-middle*.

### Modos de operação das cifras de bloco

Uma cifra de bloco sozinha só cifra **um** bloco. Para mensagens maiores, usa-se um **modo de operação**:

| Modo | Ideia | Observação de prova |
|---|---|---|
| **ECB** (*Electronic Codebook*) | Cada bloco é cifrado isoladamente com a mesma chave. | **Blocos iguais geram cifrados iguais** → revela padrões. Não deve ser usado para dados reais. |
| **CBC** (*Cipher Block Chaining*) | Cada bloco é combinado (XOR) com o cifrado anterior; o primeiro usa um **IV**. | O IV deve ser **imprevisível**. Cifragem sequencial (não paralelizável). |
| **CTR** (*Counter*) | Cifra um contador e faz XOR com o texto; na prática, transforma a cifra de bloco em cifra de fluxo. | Paralelizável; **nunca repetir** o par chave + contador (*nonce*). |
| **GCM** (*Galois/Counter Mode*) | CTR + autenticação. | **Cifragem autenticada (AEAD)**: confidencialidade **e** integridade/autenticidade. Padrão no TLS. |

> **Pegadinha clássica:** "O modo ECB é recomendado por permitir paralelismo e ser simples." **Errado.** ECB vaza padrões do texto claro (o exemplo famoso é a imagem de um pinguim que continua reconhecível após cifrada em ECB).

### Onde a simétrica é usada

- Criptografia de disco e arquivos (por exemplo, BitLocker e LUKS usam AES).
- A **sessão** de um canal TLS/HTTPS, depois que as chaves são combinadas.
- VPNs (IPsec, WireGuard) para cifrar o tráfego.

### Força bruta e tamanho de chave

Uma chave de *k* bits tem **2^k** possibilidades. Cada bit a mais **dobra** o esforço de força bruta. Por isso a diferença entre os 56 bits do DES (≈ 7,2 × 10^16 chaves, viáveis de testar com hardware dedicado) e os 128 bits do AES (≈ 3,4 × 10^38) é gigantesca, e não apenas "duas vezes e pouco".
