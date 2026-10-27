### Contexto histórico

Em março de 1997, a RFC 2119 da Internet Engineering Task Force (IETF) definiu como palavras em maiúsculas — como *MUST*, *MUST NOT*, *SHOULD* e *MAY* — devem ser interpretadas em especificações técnicas que adotam aquela convenção. A RFC 8174, publicada em 2017, atualizou a orientação. Esses documentos não criaram os modais da língua inglesa; padronizaram sua força normativa em determinados textos técnicos. Por isso, antes de interpretar *must* ou *should*, confira se a especificação declara seguir a convenção. Fontes primárias: [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119) e [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174).

Manuais e documentação técnica repetem poucas estruturas gramaticais. Reconhecê-las rapidamente ajuda a saber **quem faz o quê**, **o que é obrigatório** e **o que é apenas recomendado**. Esta seção reúne quatro delas: imperativo, voz passiva, verbos modais e afixos.

### Imperativo: o tom dos manuais

Instruções passo a passo usam o **imperativo**, que é o verbo na forma básica, sem sujeito:

- *Open the configuration file.* (Abra o arquivo de configuração.)
- *Do not share your API key.* (Não compartilhe sua chave de API.)
- *Make sure that the service is running.* (Certifique-se de que o serviço está em execução.)
- *Click Save and restart the application.* (Clique em Salvar e reinicie a aplicação.)

A negativa do imperativo é *do not* / *don't* + verbo. *Never* + verbo reforça a proibição: *Never store passwords in plain text*.

### Voz passiva: foco no que acontece

Na voz passiva, o foco sai de quem age e vai para o objeto da ação. Estrutura: **verbo *be* (no tempo adequado) + particípio passado**.

| Tempo | Exemplo | Tradução |
|---|---|---|
| Presente | *Data **is encrypted** at rest.* | Os dados são criptografados em repouso. |
| Passado | *The bug **was fixed** in version 2.1.* | O defeito foi corrigido na versão 2.1. |
| Futuro | *The endpoint **will be removed**.* | O endpoint será removido. |
| Presente perfeito | *Your account **has been locked**.* | Sua conta foi bloqueada. |
| Com modal | *The file **must be signed**.* | O arquivo deve ser assinado. |
| Contínuo | *The request **is being processed**.* | A requisição está sendo processada. |

Quem pratica a ação, quando aparece, vem depois de ***by***: *"Access requests are approved by the system administrator"* (são aprovadas pelo administrador). Em questões de ideia principal e de informação específica, verifique se a alternativa troca o agente: dizer que "o administrador solicita o acesso" é erro, pois ele **aprova**.

### Modais: a força de cada verbo

| Modal | Sentido principal | Força | Exemplo |
|---|---|---|---|
| *must* | obrigação | forte | *Passwords must contain at least 12 characters.* |
| *must not* / *mustn't* | proibição | forte | *You must not disable logging.* |
| *have to* | obrigação (externa) | forte | *Users have to sign in again.* |
| *don't have to* / *need not* | ausência de obrigação | nenhuma | *You don't have to restart.* (não é preciso reiniciar) |
| *should* | recomendação, conselho | média | *You should back up your data first.* |
| *should not* | desaconselhamento | média | *You should not use this in production.* |
| *can* | capacidade ou permissão | possibilidade | *The tool can export to CSV.* |
| *may* | permissão formal ou possibilidade | possibilidade | *This operation may take several minutes.* |
| *might* | possibilidade mais remota | fraca | *Older browsers might not display the page correctly.* |
| *will* | futuro, certeza | alta | *The token will expire in one hour.* |

Duas distinções frequentes em prova:

- ***must not*** proíbe (é proibido), enquanto ***don't have to*** dispensa (não é necessário). Confundir as duas inverte a regra.
- ***may*** em documentação pode significar permissão (*you may use this code*: você pode usar este código) ou possibilidade (*this may cause data loss*: isto pode causar perda de dados). O contexto decide.

Em especificações técnicas, especialmente nas RFCs da IETF, as palavras **MUST, MUST NOT, SHOULD, SHOULD NOT e MAY** em maiúsculas têm sentido normativo definido pela **RFC 2119**: *MUST* é requisito absoluto; *SHOULD* é recomendação que pode ser descumprida com razões válidas e consciência das consequências; *MAY* indica algo realmente opcional. A RFC 8174 esclareceu que esse sentido especial vale quando as palavras aparecem em maiúsculas.

### Afixos: decifrar palavras novas

Prefixos e sufixos permitem deduzir o sentido de muitos termos de TI.

| Afixo | Sentido | Exemplos |
|---|---|---|
| *un-* | negação, reversão | *unavailable* (indisponível), *unauthorized* (não autorizado), *uninstall* (desinstalar) |
| *in-* / *im-* / *ir-* / *il-* | negação | *invalid*, *immutable* (imutável), *irreversible*, *illegal* |
| *dis-* | negação, oposto | *disable* (desativar), *disconnect* |
| *non-* | não | *non-blocking*, *non-functional* |
| *re-* | repetição, de novo | *retry* (tentar de novo), *reboot*, *rebuild*, *reconnect* |
| *de-* | reverter | *decrypt*, *deserialize*, *deprecate* |
| *mis-* | errado | *misconfigured* (mal configurado), *misuse* |
| *over-* | excesso, por cima | *overwrite* (sobrescrever), *overflow*, *overload* |
| *pre-* / *post-* | antes / depois | *preinstalled*, *post-deployment* |
| *multi-* | muitos | *multi-factor*, *multithreaded* |
| *-able* / *-ible* | que pode ser | *scalable* (escalável), *readable*, *accessible* |
| *-less* | sem | *serverless* (sem servidor a gerenciar), *stateless* (sem estado), *passwordless* (sem senha) |
| *-er* / *-or* | agente, ferramenta | *server*, *handler*, *compiler*, *validator* |
| *-ize* / *-ise* | tornar | *normalize*, *authorize*, *optimize* |
| *-ly* | advérbio de modo | *securely*, *automatically* |
| *-ment*, *-tion*, *-ness* | substantivo | *deployment*, *configuration*, *readiness* |

Combinações aparecem juntas: *un-read-able* (ilegível), *re-usable* (reutilizável), *in-compat-ible* (incompatível). Atenção: *-less* indica ausência e não diminuição. *Stateless* é "sem estado", e não "com menos estado".

### Pegadinhas

1. "*You don't have to restart the service* significa que é proibido reiniciar." Falso. Significa que não é necessário; proibição seria *must not*.
2. "*Should* expressa obrigação absoluta." Falso. Expressa recomendação; obrigação forte é *must*.
3. "Em *The report was approved by the auditor*, o auditor é quem aprovou." Verdadeiro. O agente da passiva vem depois de *by*.
4. "*Serverless* indica que não existe nenhum servidor físico envolvido." Falso. Indica que o usuário não gerencia servidores; eles existem no provedor.
5. "*Might* indica possibilidade, em geral menor que *may*." Verdadeiro. É o modal de possibilidade mais fraca.
