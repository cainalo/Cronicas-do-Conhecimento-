Cada gênero técnico tem um propósito e uma organização típicos. Saber onde cada informação costuma ficar torna o scanning muito mais rápido. Esta seção trata de README, notas de versão, mensagens de erro, manuais, artigos técnicos e das abreviações que aparecem em todos eles. Os trechos em inglês são autorais.

### README

Arquivo de apresentação de um projeto, geralmente na raiz do repositório. Seções frequentes:

| Seção | Conteúdo |
|---|---|
| *Overview* / *About* | o que o projeto faz |
| *Requirements* / *Prerequisites* | o que precisa estar instalado antes |
| *Installation* / *Getting started* | como instalar e dar os primeiros passos |
| *Usage* | como usar, com exemplos |
| *Configuration* | opções e variáveis de ambiente |
| *Contributing* | como colaborar |
| *License* | licença de uso |

Trecho: *"Before installing, make sure Node.js 20 or later is available. Copy `.env.example` to `.env` and fill in the required variables. Do not commit the `.env` file, since it may contain secrets."*

Glosa: antes de instalar, garanta Node.js **20 ou superior** (*or later*); copie o arquivo de exemplo e preencha as variáveis obrigatórias; **não** faça commit do `.env`, **já que** (*since*, causa) ele pode conter segredos.

### Release notes e changelog

**Release notes** (notas de versão) e o **changelog** (registro de mudanças) informam o que mudou em cada versão. Uma convenção muito usada, a *Keep a Changelog*, agrupa as mudanças em: ***Added*** (adicionado), ***Changed*** (alterado), ***Deprecated*** (tornado obsoleto), ***Removed*** (removido), ***Fixed*** (corrigido) e ***Security*** (correções de vulnerabilidades).

Trecho: *"Version 4.2.0. Added: export to PDF. Fixed: a memory leak that occurred when large files were uploaded. Known issues: the dark theme is not yet supported on tablets. A fix is planned for the next release."*

Glosa: foi **adicionada** a exportação em PDF; foi **corrigido** um vazamento de memória (*memory leak*) que ocorria no envio de arquivos grandes; **problema conhecido** (*known issue*): o tema escuro **ainda não** (*not yet*) é suportado em tablets; uma correção está **planejada** para a próxima versão.

### Mensagens de erro e avisos

| Mensagem | Sentido |
|---|---|
| *Permission denied* | permissão negada |
| *File not found* / *No such file or directory* | arquivo ou diretório inexistente |
| *Connection timed out* | tempo de conexão esgotado |
| *Connection refused* | conexão recusada pelo destino |
| *Invalid argument* | argumento inválido |
| *Unexpected token* | símbolo inesperado (erro de sintaxe) |
| *Out of memory* | memória insuficiente |
| *Disk quota exceeded* | cota de disco excedida |
| *Access token expired* | token de acesso expirado |
| *Failed to load resource* | falha ao carregar recurso |

Verbos típicos: *fail* (falhar), *throw* / *raise* (lançar uma exceção), *crash* (travar, encerrar abruptamente), *hang* (ficar parado, sem responder), *exceed* (exceder), *expire* (expirar), *occur* (ocorrer).

### Manuais e documentação de usuário

Manuais combinam **imperativo** (*Select*, *Enter*, *Press*), **voz passiva** (*the file is saved automatically*) e avisos graduados (*Note*, *Warning*, *Caution*). Também usam *step*, *prompt* (no sentido de solicitação na tela: *when prompted, enter your PIN*), *drop-down menu*, *checkbox*, *toggle* e *wizard* (assistente de configuração).

Trecho: *"To reset your password, click Forgot password on the sign-in page. A link will be sent to your registered e-mail address. The link expires after 30 minutes. If you do not receive it, check your spam folder before contacting support."*

### Artigos técnicos e científicos

Seguem a estrutura: ***Abstract*** (resumo), ***Introduction***, ***Related work*** (trabalhos relacionados), ***Method*** / ***Methodology***, ***Results***, ***Discussion***, ***Conclusion*** e, às vezes, ***Future work***. Para a ideia principal, leia o *abstract* e a conclusão.

Artigos usam linguagem de **cautela** (*hedging*): *suggest* (sugerir), *indicate*, *appear to*, *may*, *likely* (provavelmente). Uma alternativa que transforma *"the results suggest that X may reduce costs"* em "o estudo comprovou que X reduz custos" exagera o que o texto afirma. Outros termos: *findings* (resultados, achados), *sample* (amostra), *dataset* (conjunto de dados), *outperform* (superar em desempenho), *trade-off* (compromisso entre vantagens e desvantagens), *bottleneck* (gargalo), *drawback* (desvantagem), *benchmark* (teste comparativo de desempenho).

### Abreviações comuns

| Abreviação | Origem | Sentido |
|---|---|---|
| *e.g.* | *exempli gratia* (latim) | por exemplo |
| *i.e.* | *id est* (latim) | isto é, ou seja |
| *etc.* | *et cetera* | e assim por diante |
| *vs.* | *versus* | contra, em comparação com |
| *cf.* | *confer* | compare, confira |
| *FAQ* | *frequently asked questions* | perguntas frequentes |
| *TBD* | *to be determined* / *defined* | a definir |
| *N/A* | *not applicable* / *available* | não se aplica / não disponível |
| *FYI* | *for your information* | para seu conhecimento |
| *ASAP* | *as soon as possible* | o mais rápido possível |
| *aka* | *also known as* | também conhecido como |
| *TL;DR* | *too long; didn't read* | resumo curto |
| *EOL* | *end of life* | fim do ciclo de vida (sem suporte) |
| *WIP* | *work in progress* | trabalho em andamento |

A diferença entre ***e.g.*** e ***i.e.*** cai com frequência: *e.g.* introduz **exemplos** de uma lista maior; *i.e.* introduz uma **explicação** ou **reformulação** exata. Em *"Use a supported browser, e.g. Firefox"*, Firefox é um dos navegadores aceitos. Em *"Install the latest stable release of the tool, i.e. version 5.0"*, a versão 5.0 é a única que atende ao requisito.

### Pegadinhas

1. "*i.e.* introduz exemplos." Falso. Introduz explicação ou reformulação; exemplos vêm com *e.g.*.
2. "Em release notes, *Known issues* lista problemas já corrigidos." Falso. Lista problemas conhecidos que ainda existem.
3. "*TBD* indica que algo ainda será definido." Verdadeiro. *To be determined* (ou *defined*).
4. "Um artigo que diz que os resultados *suggest* uma melhora comprovou essa melhora." Falso. *Suggest* expressa cautela, sem afirmar comprovação.
5. "*EOL* indica que o produto deixou de receber suporte." Verdadeiro. *End of life* marca o fim do ciclo de vida.
