# Adendo à revisão técnica — estado atualizado da voz e regressão de conteúdo

**Data:** 26 de outubro de 2026  
**Branch:** claude/cronicas-conhecimento-estudos-jgbofo

Este adendo complementa `docs/REVISAO_TECNICA_NARRADAS_E_VOZ_2026-10-26.md`. Após a primeira revisão, os arquivos do player e da camada de voz mudaram no branch paralelo. Eles foram relidos, mas não alterados por esta contribuição.

## 1. Mudanças mais recentes encontradas no player

A versão mais recente de `src/pages/Narrated.tsx` possui uma estrutura de faixa única para a aula inteira quando a voz Gemini oferece `createAudioTrack`. Esse é um avanço de arquitetura: reduz emendas entre sínteses curtas, mantém maior continuidade de entonação e oferece uma fonte única para pausa, retomada e busca real pelo elemento de áudio.

O código usa a duração real da faixa e consulta `audio.currentTime`, mas a posição de cada fala ainda é derivada de uma proporção entre duração real da mídia e a soma das durações estimadas por `readingMs`. Consequentemente:

- a barra de busca usa o tempo da faixa de áudio;
- a posição de fala/cena é projetada sobre estimativas por texto;
- uma pausa natural mais longa, uma frase acelerada ou uma diferença de prosódia pode deslocar a mudança visual;
- o realce de palavras do modo Gemini continua sendo estimado proporcionalmente ao tempo e ao comprimento do texto, pois a camada de voz não consome timestamps de alinhamento entregues pelo provedor.

**Conclusão:** é correto chamar isso de faixa única com busca por tempo real de áudio, mas não de sincronização exata entre palavra e imagem.

A recomendação de implementação não é substituir a faixa única por vários áudios curtos indiscriminadamente. Primeiro, manter a faixa contínua e incorporar um manifesto de cues baseado no alinhamento real do texto com a faixa. A API ElevenLabs oferece alinhamento em nível de caractere por meio de `/with-timestamps`; a aplicação pode converter esses limites em intervalos de palavras e associar offsets ao `sceneId` e ao `beatIndex`. Confirmar os limites de entrada, normalização e qualidade em português brasileiro antes de gerar todas as aulas.

## 2. Estado atual da chave Gemini

Na versão mais recente lida de `src/app/voice.ts`, a chave Gemini continua sendo obtida de `localStorage`, e a solicitação de geração da faixa é feita pelo cliente para o endpoint da API. Não há evidência, neste arquivo, de uma chave fixa de serviço colocada no código-fonte. A distinção é importante, mas não elimina o risco: uma chave que o próprio app guarda no armazenamento do dispositivo e transmite pela aplicação pode ser extraída do cliente.

Antes de produção, a chamada deve passar por uma Edge Function/backend autenticado com o segredo fora do bundle, além de quotas, limites de tamanho, tratamento de erros, cache e proteção contra consumo abusivo. Se a modalidade experimental “usar minha própria chave” for mantida, isso precisa ser explicado ao utilizador e separado do modo de produção.

## 3. Testes de regressão de conteúdo adicionados

Foi criado `src/test/narrated-editorial.test.ts` para proteger as duas aulas prioritárias. Os testes verificam:

- quantidade mínima de cenas, falas e palavras da história do computador;
- presença de conceitos essenciais, incluindo Ada Lovelace, números de Bernoulli, ENIAC, transistor, circuito integrado e microprocessador;
- presença dos fundamentos e exemplos de soma/subtração de inteiros;
- ligação entre os marcos da linha do tempo e os índices de revelação;
- existência de estados de reta explícitos para cada fala de cenas matemáticas;
- resultado vazio de `validateNarrated` para os dois roteiros.

O teste foi gravado na branch no commit [c31bca7](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/c31bca734e9d02e7f6a164d1d62b19897c557809) e relido pela API do GitHub. **Ele ainda não foi executado localmente.** A consulta aos checks/status deste commit não retornou execuções ou status; não há base para dizer que o teste passou.

## 4. Atualização das referências de voz

### ElevenLabs

A documentação atual confirma endpoint de timestamps por caractere, útil para alinhamento de áudio e texto: https://elevenlabs.io/docs/pt/api-reference/text-to-speech/convert-with-timestamps

A página pública de preços é baseada em planos/créditos, e o consumo depende do modelo. No momento da consulta, ela lista Free com 10.000 créditos/mês, Starter a US$ 6/mês com 30.000 créditos, Creator a US$ 22/mês com 121.000 créditos e planos superiores. A página também esclarece que a cobrança de caracteres por crédito depende do modelo e do uso. Não orçar a aplicação com um valor universal por mil caracteres sem escolher modelo, plano e descontos de API: https://elevenlabs.io/pricing

### Gemini TTS

A tabela oficial atual distingue o plano gratuito e o pago. A página informa que, no plano gratuito, o conteúdo pode ser utilizado para melhorar produtos, enquanto no pago informa que o conteúdo não é utilizado dessa maneira. Isso é relevante ao decidir enviar roteiros ou textos dos alunos para geração sob demanda. Para aulas autorais estáticas, pré-gerar o áudio aprovado e guardar apenas os artefatos necessários pode reduzir a quantidade de conteúdo transferida em tempo de uso.

A página de preço consultada indica Gemini 3.8 Flash TTS a US$ 9 por milhão de tokens de saída de áudio até 31/12/2026 e US$ 18 a partir de 01/01/2027, além do custo de entrada de texto; a variante Flash-Lite tem preço separado. Verificar novamente antes de contratar: https://ai.google.dev/gemini-api/docs/pricing

### Amazon Polly

A documentação oficial lista vozes pt-BR e identifica engines por voz. As Speech Marks podem retornar marcas de palavra e frase com tempo e offsets no texto, em solicitações de metadados associadas à fala. Isso continua sendo uma alternativa tecnicamente válida se os testes auditivos indicarem que a qualidade da voz é suficiente para as aulas: https://docs.aws.amazon.com/pt_br/polly/latest/dg/available-voices.html e https://docs.aws.amazon.com/polly/latest/dg/speechmarks.html

### OpenAI API

A documentação de TTS atualizada deve ser lida como documentação da API pública, não como autorização para reutilizar a voz conversacional interna do ChatGPT. A página consultada descreve vozes de API otimizadas para inglês e informa que os modelos `tts-1`, `tts-1-hd` e `gpt-4o-mini-tts` estão em processo de descontinuação com desligamento previsto para 6 de janeiro de 2027, indicando migração para um fluxo Realtime. Isso torna a API antiga uma base pouco adequada para começar uma integração de longa duração sem planejar migração: https://developers.openai.com/api/docs/guides/text-to-speech

## 5. Estado da auditoria de slides

A auditoria de `src/pages/ReviewSlides.tsx` não muda neste adendo. Na versão consultada, `splitReviewChunks` ainda divide por pontuação e caracteres; `plainReviewText` ainda não preserva uma árvore sintática completa de Markdown; a página não mede `scrollHeight` nem confirma que cada corpo cabe no espaço disponível. O componente continua intocado pela colaboração.

## 6. Próximos passos priorizados

1. Executar `npm run typecheck`, `npm test` e `npm run build` no branch depois de sincronizar as mudanças da sessão paralela.
2. Corrigir qualquer regressão apontada por `src/test/narrated-editorial.test.ts` antes de declarar o conteúdo aprovado.
3. Implementar, sob responsabilidade da sessão do player, um manifesto de cues com intervalos de áudio reais e alinhamento de texto; separar “tempo real da faixa” de “tempo estimado da fala”.
4. Mover a geração compartilhada de voz para o servidor e documentar o modo experimental de chave própria, caso permaneça disponível.
5. Validar as vozes com a mesma amostra em pt-BR e medir custo a partir da duração e do número real de caracteres do catálogo.
6. A outra sessão deve continuar com a reconstrução de `Narrated.tsx` e `ReviewSlides.tsx`; esta contribuição não os altera.



## 7. Implementação auxiliar adicionada depois da primeira versão deste adendo

Foi criado `src/lib/narration-timeline.ts` como módulo puro, sem dependência de React e sem alterar o player. Ele:

- cria a faixa textual canônica, unindo as falas com o mesmo separador de duas quebras de linha usado na faixa Gemini atual;
- guarda os offsets de caracteres de cada cena/fala;
- transforma um alinhamento de caracteres com timestamps em cues de fala e de palavra;
- converte tempos em milissegundos e oferece `cueAtTime`, que escolhe a fala ativa pelo início temporal real e mantém a composição estável durante pausas;
- rejeita explicitamente vetores de alinhamento incompletos, timestamps inválidos ou texto normalizado incompatível, em vez de fingir precisão.

Arquivo: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/lib/narration-timeline.ts

Foi também criado `src/test/narration-timeline.test.ts` com testes para preservação do texto e offsets, conversão de timestamps por caractere em cues, seleção temporal da fala e rejeição de alinhamentos incompatíveis ou incompletos.

Arquivo: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/test/narration-timeline.test.ts

**Limite atual:** esse utilitário ainda não está conectado ao contrato de `VoiceAudioTrack` nem ao componente do player. É uma peça isolada para a sessão responsável pela interface integrar sem copiar lógica de alinhamento para dentro de React. O provedor precisa devolver os timestamps de caracteres correspondentes ao texto exato submetido; se usar `normalized_alignment`, o adaptador deve mapear a normalização para o texto original antes de produzir os cues.

A consulta ao GitHub não retornou execuções de workflow nem status de commit para os testes anteriores. Logo, esses novos testes estão **escritos e gravados, mas não executados**; typecheck e build continuam pendentes.


## 8. Checagem factual da história dos computadores e licenças de imagens

A conferência em fontes históricas acrescentou uma nuance que vale preservar: não é ideal apresentar “1804” como a única data para o tear de Jacquard sem contexto. O Computer History Museum registra uma demonstração do tear em 1801 e, em outro artigo, descreve o aperfeiçoamento do controle por cartões em 1804. Para não reduzir essa sequência a uma única data, os três conteúdos relacionados agora usam “1801–1804” e explicam a diferença entre demonstração e aperfeiçoamento:

- `src/content/narrated/prim-computador.ts`: linha do tempo e fala atualizadas.
- `src/content/grimoires/primeiros/cap01-computador/01-o-que-e.md`: fonte Markdown do capítulo, também consumida pelos slides de revisão.
- `src/content/micro/prim-computador-a.ts`: aula introdutória e linha do tempo de consolidação atualizadas.

Fontes históricas verificadas:
- Jacquard, cartões perfurados e demonstração de 1801: https://www.computerhistory.org/storageengine/punched-cards-control-jacquard-loom/
- Aperfeiçoamento do mecanismo por Jacquard em 1804: https://computerhistory.org/blog/artifact-adopted-preserving-the-legend-of-j-m-jacquard/
- Pascalina de Pascal, criada em 1642: https://www.computerhistory.org/revolution/calculators/1/47/195
- Máquina Analítica e as notas de Ada Lovelace de 1843: https://www.computerhistory.org/babbage/history/
- ENIAC, apresentado em 1946, aproximadamente 18 mil válvulas e programação por painéis: https://www.computerhistory.org/timeline/1946/
- Hollerith, censo de 1890 e trajetória empresarial até a IBM: https://www.computerhistory.org/tdih/august/16/
- Transistor de ponto de contato em 1947: https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/
- Circuito integrado de Kilby em 1958 e contribuições subsequentes de Noyce: https://www.computerhistory.org/siliconengine/all-semiconductor-solid-circuit-is-demonstrated/
- Intel 4004, comercializado em 1971: https://www.computerhistory.org/siliconengine/microprocessor-integrates-cpu-function-onto-a-single-chip/

### Licença e atribuição de imagens atualmente referenciadas em ReviewSlides

A função `reviewHistoricalVisual` de `src/pages/ReviewSlides.tsx` usa:

- **Ada Lovelace portrait.jpg** — pintura de Alfred Edward Chalon, aproximadamente 1840, obra da coleção Science Museum Group; a página Wikimedia Commons indica domínio público/PD-Mark. Fonte: https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg
- **ENIAC.jpg** — fotografia de Laanderman, feita em 6 de novembro de 2015, mostrando uma parte/exemplar do ENIAC em exposição no Bradbury Science Museum; licença **CC BY-SA 4.0**. Fonte: https://commons.wikimedia.org/wiki/File:ENIAC.jpg

Observações para a sessão que está reconstruindo os slides: a legenda atual do ENIAC diz apenas “CC BY-SA 4.0 · Wikimedia Commons”, mas a licença requer atribuição apropriada ao autor e link para a licença; recomenda-se exibir “Foto: Laanderman, CC BY-SA 4.0” com links para a página de origem e para https://creativecommons.org/licenses/by-sa/4.0/. Além disso, convém legendar a imagem como fotografia de um exemplar em exposição, e não como uma fotografia feita na época do ENIAC. A imagem de Ada está indicada como domínio público na página do arquivo, mas a equipe ainda deve guardar a URL da página de origem no registo de ativos.


## 9. Alterações factuais mais recentes e atribuição visual no player

A distinção de datas do tear foi gravada nos três arquivos de conteúdo:
- Narrada: [src/content/narrated/prim-computador.ts](https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/content/narrated/prim-computador.ts) — commit d04f294.
- Texto-base do capítulo, usado também na geração das lâminas: [01-o-que-e.md](https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/content/grimoires/primeiros/cap01-computador/01-o-que-e.md) — commit 4d7e2a8.
- Trilha para iniciantes: [src/content/micro/prim-computador-a.ts](https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/content/micro/prim-computador-a.ts) — commit 07f6e84.

Foi examinada também a versão mais recente de `src/pages/Narrated.tsx` (não alterada por esta sessão). Ela utiliza as mesmas duas imagens históricas. Sua legenda do ENIAC também indica apenas “Imagem CC BY-SA 4.0 · Wikimedia Commons”, sem o nome de autor; recomenda-se aplicar a mesma correção indicada para a tela de revisão, mantendo atribuição apropriada e link da licença. A foto mostra um exemplar em exposição no Bradbury Science Museum, não uma fotografia feita em 1946.


## 10. Correções do player narrado após feedback do usuário (26/10/2026)

### Instruções de contexto consultadas

Foi lido `docs/PRODUCT_DECISIONS.md`. As decisões de 25/10 reforçam a aparência editorial chapada, sem páginas brancas, manchas desfocadas ou bolhas decorativas; as telas imersivas devem aproveitar a viewport. Também foram pesquisadas referências a instruções de sessão ou passagem do player nos arquivos indexados do repositório; não foi encontrada uma nota específica deixada por outra sessão sobre estes quatro pedidos. Para evitar conflito, as mudanças desta rodada foram feitas na versão mais recente disponível do player, consultada imediatamente antes da alteração, e os testes do próprio player foram atualizados.

### Arquivos alterados

- `src/pages/Narrated.tsx` — commit [dccb743](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/dccb743f49e011ad19503eedfecbdc9a55e879e1)
- `src/test/narrated.test.tsx` — commit [4809a93](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/4809a937a58c3e747f4a32ad69dec332cb467c6f)
- `docs/PRODUCT_DECISIONS.md` — commit [2f1be44](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/2f1be44e8242f9d10a1673957c7dd700a6cfddcf)

### Alterações no player

1. **Tela de borda a borda:** o shell fixo usa largura automática combinada com `inset-0`, evitando a largura rígida `100vw` de `w-screen`; o contêiner visual não adiciona mais padding horizontal de `px-3 sm:px-6`. Também removi duas manchas decorativas desfocadas que não combinavam com a decisão editorial atual.
2. **Legenda opcional:** botão CC alterna legendas (ativadas por padrão). A legenda passa a ficar na composição normal da cena, abaixo do cabeçalho interno e antes do conteúdo visual, reservando sua própria faixa. Usa linha única, sem quebra, com janela de até oito palavras em torno da posição atual e reticências nas extremidades quando o texto é maior. Assim, a legenda não é uma camada absoluta sobre a ilustração/fórmula.
3. **Prazo de ocultação correto:** o timer não reinicia por cada mudança de cena. A interação com ponteiro em controles, busca, marcadores e painéis cancela o prazo; ele só é reiniciado no fim da interação. Enquanto existe interação ativa, o timer não oculta os controles. Movimentos também renovam o prazo.
4. **Fim da aula:** removi o painel `Checagem` que abria por cima da última cena. A pessoa pode usar o botão para assistir novamente ou sair, sem atividade automática por cima do vídeo.
5. **Testes:** acrescentei checagens de uma linha, ausência das margens/padding laterais, alternância de legenda, interação longa com os controles e conclusão sem abrir a atividade. Também mantive a navegação/transcrição.

### Validação e limitação

Os arquivos foram relidos na branch depois das alterações. Tentei clonar a branch para executar os testes, mas o ambiente de execução não conseguiu resolver o host `github.com` (erro DNS). O wrapper de status/workflows também não retornou status nem execuções correspondentes. Portanto, **os testes foram atualizados, mas não foram executados**. A falta de screenshot e de execução em Android físico impede confirmar visualmente a eliminação de todas as faixas laterais; isso ainda precisa ser verificado no Galaxy A14 ou emulador, principalmente na proporção retrato e com safe area inferior.


## 11. Proteção adicional contra bordas laterais e interação interrompida

Após verificar o layout guard mais recente adicionado em paralelo, o player foi ajustado mais uma vez:

- `src/pages/Narrated.tsx` — commits [20df144](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/20df144ac44fc137ab754a3996ca8621160716ea) e [23136e4](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/23136e449bffc4042add55361af2862f7bb503bd). O player agora é devolvido por `createPortal(..., document.body)`, para que a caixa fixa não seja limitada por ancestry/transform do layout de Aprender. O timer global também escuta `pointerup` e `pointercancel`, inclusive quando o dedo ou mouse é solto fora dos controles.
- `src/test/layout-guard.test.ts` — commit [27a76ce](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/27a76ce7aba80e03d4c3c39852f914b3353fe767). Acrescentei proteções estáticas para portal, legenda em linha única, botão CC e ausência da atividade final.
- `src/test/narrated.test.tsx` — commit [e306ee9](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/e306ee968de2f5bc1f29235c2a8fce37f3f3340a). O teste do timeout libera o ponteiro no objeto `window`, não apenas no controle, para cobrir o término fora do painel.

A verificação pela API do GitHub confirma que os arquivos atualizados contêm o portal, o listener global de ponteiro e os testes. Nenhum build, Vitest ou teste de browser executou nesta sessão; a validação final deve ser feita quando a branch estiver disponível num ambiente Node com dependências e num Android físico/emulador.

## Decisão de arquitetura — 27/10/2026
- O protótipo `src/lib/narration-timeline.ts` não era consumido por `src/pages/Narrated.tsx`, `src/app/voice.ts` nem por outro módulo de produção. Ele existia ao lado de testes unitários, sem integrar os timestamps à interface.
- Para evitar manter um módulo órfão e não alterar a sincronização percebida pelo usuário sem validação audiovisual, o protótipo e seu teste principal foram removidos da branch de manutenção central. Os commits/branches anteriores preservam o histórico da proposta; a ideia não é considerada implementada.
- Reintroduzir o alinhamento só quando o player tiver uma fonte real de timestamps, texto canônico compartilhado entre síntese e cues e testes ponta a ponta com faixas representativas. Enquanto isso, a sincronização por estimativa permanece explicitamente como comportamento atual.
- Essa remoção não altera o site: a implementação retirada não era importada pelo caminho de execução da aplicação. O gate de testes da branch precisa confirmar a ausência de dependências indiretas.

