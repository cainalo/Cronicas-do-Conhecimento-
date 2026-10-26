Criptografia é o estudo e a aplicação de técnicas que transformam informação para protegê-la de quem não deve lê-la ou alterá-la sem ser percebido. Em provas de TI, ela aparece menos como matemática e mais como **escolha de mecanismo**: qual técnica garante qual propriedade, com qual chave, a que custo.

### Vocabulário essencial

| Termo | Significado |
|---|---|
| **Texto claro** (*plaintext*) | A mensagem original, legível. |
| **Texto cifrado** (*ciphertext*) | A mensagem após a cifragem; ininteligível sem a chave. |
| **Algoritmo** (cifra) | O procedimento matemático de cifrar/decifrar. |
| **Chave** | O parâmetro secreto (ou par de parâmetros) que controla o algoritmo. |
| **Cifrar / decifrar** | Transformar claro → cifrado / cifrado → claro, usando a chave. |
| **Criptoanálise** | Estudo de como quebrar cifras sem conhecer a chave. |
| **Criptologia** | Criptografia + criptoanálise. |

> **Cuidado com o termo "criptografar com hash".** Função *hash* não cifra: ela não tem chave nem operação inversa de "decifrar". Veremos isso na seção própria.

### Princípio de Kerckhoffs

Formulado no século XIX por Auguste Kerckhoffs, diz que **um sistema criptográfico deve continuar seguro mesmo que tudo sobre ele seja público, exceto a chave**. Consequência prática: algoritmos modernos (AES, RSA, SHA-256) são públicos e amplamente analisados; o segredo está somente na chave. Esconder o algoritmo ("segurança por obscuridade") não substitui uma chave forte.

### O que a criptografia pode garantir

Os objetivos clássicos de segurança relacionados à criptografia são:

1. **Confidencialidade**: só quem tem autorização consegue ler. Mecanismo típico: **cifragem** (simétrica ou assimétrica).
2. **Integridade**: qualquer alteração é detectável. Mecanismos: **hash**, **MAC/HMAC**, **assinatura digital**.
3. **Autenticidade**: confirma-se a origem (quem enviou). Mecanismos: **MAC/HMAC** (entre quem compartilha a chave) e **assinatura digital**.
4. **Não repúdio** (irretratabilidade): o autor não consegue negar a autoria perante terceiros. Mecanismo: **assinatura digital** (porque só o autor possui a chave privada).

E a **disponibilidade**? Ela integra a tríade CID (Confidencialidade, Integridade, Disponibilidade) da segurança da informação, mas **não é garantida pela criptografia**: é obtida com redundância, *backup*, proteção contra negação de serviço etc. Essa distinção é uma pegadinha frequente.

### Tabela-mestra: mecanismo × propriedade

| Mecanismo | Confidencialidade | Integridade | Autenticidade | Não repúdio |
|---|---|---|---|---|
| Cifragem simétrica (ex.: AES-CBC) | sim | não | não | não |
| Cifragem autenticada (ex.: AES-GCM) | sim | sim | sim, entre as partes | não |
| Cifragem com a chave pública do destinatário | sim | não | não | não |
| Hash isolado (ex.: SHA-256) | não | só contra erros acidentais (ver ressalva) | não | não |
| MAC / HMAC | não | sim | sim, entre as partes | não |
| Assinatura digital | não | sim | sim | sim |

**Ressalva sobre o hash isolado:** se um atacante pode trocar a mensagem, pode também recalcular e trocar o hash. Por isso, hash sozinho protege contra corrupção acidental; contra adversários, ele precisa estar protegido por uma chave (HMAC) ou por uma assinatura.

**Por que o MAC não dá não repúdio?** Porque remetente e destinatário conhecem a mesma chave: o destinatário também poderia ter gerado aquele MAC, então um terceiro não tem como saber quem o produziu.

### As três famílias que você precisa dominar

- **Criptografia simétrica**: uma única chave secreta compartilhada cifra e decifra. Rápida.
- **Criptografia assimétrica** (de chave pública): par de chaves matematicamente relacionadas: pública e privada. Mais lenta, mas resolve a distribuição de chaves e permite assinaturas.
- **Funções hash**: resumo de tamanho fixo, sem chave, de mão única.

Na prática, os sistemas reais (HTTPS, VPNs, e-mail seguro) **combinam as três**, como veremos na última seção.
