# Auditoria técnica: voz, aulas narradas e slides de revisão

**Data da pesquisa inicial:** 26/10/2026  
**Atualização da auditoria:** 27/10/2026 (revisada após os commits paralelos até 02:28 UTC)  
**Branch examinada:** claude/cronicas-conhecimento-estudos-jgbofo  
**Branch desta entrega:** gpt/narrated-timeline-review-2026-10-27  
**Limite de responsabilidade:** não alterei src/pages/Narrated.tsx nem src/pages/ReviewSlides.tsx. A outra sessão continua responsável pela interface dessas páginas.

## 1. Resumo executivo

O repositório real foi consultado via integração do GitHub. A aplicação tem player de viewport inteira, faixa Gemini contínua e inserções visuais durante a fala. A duração total e o seek podem usar o relógio real do áudio, mas a seleção do beat/cena ainda é mapeada por projeção proporcional de readingMs; os timestamps de caractere/palavra fornecidos por um alinhador ainda não estão integrados ao player.

A branch-base avançou durante a auditoria. O commit mais recente observado ao atualizar este relatório é aca798569ba6d99ec3ec20fd90a39e33778303fa (02:38 UTC). Os commits mais recentes melhoram o peso temporal estimado dos beats, suavizam inserções cinematográficas e adicionam testes de guarda de layout; ainda não conectam o player a buildAlignedNarrationTimeline/cueAtTime. Os roteiros, a camada de voz, o player cinematográfico e o helper src/lib/narration-timeline.ts são trabalho já presente na branch compartilhada e foram preservados. Esta entrega acrescenta somente testes de casos-limite e documentação de revisão; não duplica nem modifica o helper, o player ou os slides. O PR #7 anterior foi fechado como supersedido; o PR #8 recebeu uma revisão automática sobre um snapshot anterior e está sendo substituído por esta entrega limpa.

**Prioridades sugeridas:**
1. **P0 — segurança:** não expor uma chave de API compartilhada no app React/Capacitor. A implementação atual salva a chave Gemini digitada em localStorage e chama a API diretamente do cliente. Isso é aceitável apenas como opção experimental de chave própria do usuário, claramente identificada (BYOK), não como credencial global de produção.
2. **P0 — sincronização:** gerar/armazenar áudio com duração real e associar os visuais a eventos temporais; não declarar sincronização exata baseada em palavras por segundo ou proporção de caracteres.
3. **P1 — conteúdo:** ouvir as amostras em português brasileiro e fazer revisão humana dos roteiros. O status dos dois conteúdos continua nao-revisado.
4. **P1 — slides:** preservar a origem do conteúdo, mas dividir cada lâmina conforme a área útil real após renderização; 430 caracteres não garantem encaixe em um celular.
5. **P2 — escolha de voz:** comparar às cegas os mesmos 45–60 segundos em dois ou três provedores, incluindo nomes, siglas, datas e matemática.



## 2.1. Atualização de integração independente — commit aa60603 (27/10/2026)

A branch-base recebeu uma tentativa de abstração para uma faixa de áudio contínua em src/app/voice.ts. A ideia é boa, mas a implementação observada ainda não cumpre o objetivo sozinha:

1. **Erro histórico de sintaxe no commit aa60603, confirmado com Node 22.16.0 — corrigido no snapshot mais recente consultado.** No blob antigo de src/app/voice.ts (SHA 2b6e1894af2c1f4042874a764db896f898664492), a expressão regular de decodificação tinha barras invertidas duplicadas: isso fazia o arquivo falhar ao ser analisado e a expressão de remoção de espaços também não funcionar. Reproduzi a falha com Node. No snapshot atual da branch-base (blob SHA 2c2ae083d6e1ea2e65f4598041f65b481523cd89), a expressão está correta: `value.replace(/^data:audio\/[a-z0-9.+-]+;base64,/i, '').replace(/\s/g, '')`. Portanto, o bloqueador de sintaxe parece ter sido corrigido pelo trabalho paralelo. Ainda é necessário confirmar a correção com typecheck/build completos; esta sessão não os executou.
2. **A faixa contínua já foi integrada ao player, mas a sincronização visual ainda é aproximada.** Na versão mais recente de src/pages/Narrated.tsx, o player chama voice.createAudioTrack(script, rate), usa durationMs para a duração total e altera audio.currentTime no seek. Porém, updatePosition transforma o progresso real em um tempo fictício pela fórmula (mediaMs / realDuration) * estimatedTotalMs e escolhe a fala usando readingMs por beat. Isso acerta o relógio de áudio e a busca, mas não garante que a cena mude no instante em que a narração chega ao conceito. Para sincronismo real, o pipeline ainda precisa de Forced Alignment/metadados de frase e de um manifesto temporal.
3. **Duração real não equivale a alinhamento de cada frase.** O player agora tem duração total e seek reais no fluxo Gemini. Os commits de 27/10 adicionaram inserções visuais semânticas e testes para elas, mas a posição do beat ainda é projetada proporcionalmente a partir de readingMs; o player ainda não consome os cues do manifesto novo. A narração textual completa precisa ser alinhada à transcrição e produzir um manifesto de eventos visuais.
4. **Velocidade dupla — problema observado e corrigido no commit 0743725.** A versão anterior pedia a velocidade na instrução ao Gemini e aplicava também playbackRate. No snapshot atual, createGeminiAudioTrack ignora o parâmetro de velocidade no texto de estilo e deixa a velocidade final sob controle do player; o áudio contínuo aplica playbackRate uma vez. Confirmar por teste auditivo e automatizado a 0,8×, 1,0× e 1,2×.
5. **Próximas verificações para o mantenedor de voz/player:** executar typecheck/build depois da correção de escaping; testar o carregamento do Blob WAV no Android WebView; confirmar cancelamento e dispose() ao trocar/parar a aula; e integrar os cues do manifesto temporal às transições e inserções visuais. O uso de uma chave Gemini compartilhada no cliente continua inseguro para produção.




## 2.2. Revisão da timeline por alinhamento de caracteres já adicionada à branch-base

A branch compartilhada já contém src/lib/narration-timeline.ts (commit c58bee0c1ade3781ea329928295dff2ce3cda4fe) e src/test/narration-timeline.test.ts. Não dupliquei nem alterei esses arquivos.

O helper define:
- buildNarrationScript(lesson): concatena as falas na ordem em que serão sintetizadas, preserva cada faixa de texto por cena/beat e usa offsets por ponto de código Unicode.
- CharacterTimeAlignment: exige um caractere Unicode por posição e arrays de início/fim em segundos da mesma transcrição exata.
- buildAlignedNarrationTimeline: produz cue por beat e cue por palavra a partir dos timestamps de caractere; rejeita divergência de texto, contagem de caracteres incompatível, timestamps inválidos e inícios fora de ordem.
- cueAtTime: pesquisa binária para devolver o último cue cujo início real já ocorreu; mantém o visual anterior durante pausas.

O helper é apropriado como contrato de integração, com três pontos que a sessão do player deve observar:
1. **Ainda não é consumido por Narrated.tsx.** No snapshot atual, o player importa readingMs e usa essa estimativa para decidir quando trocar o beat, apesar de já ter a faixa real de áudio. A integração deve passar currentTime * 1000 para cueAtTime e usar a cue retornada para atualizar cena, beat e inserção visual.
2. **durationMs é derivado do fim do último caractere alinhado, não de audio.duration.** Isso pode omitir silêncio residual no fim da faixa. A duração total/seek deve continuar usando a duração real do elemento de áudio; os cues só definem os instantes de troca visual.
3. **O alinhador deve receber exatamente o texto retornado por buildNarrationScript.** Qualquer alteração posterior em espaços, pontuação, normalização Unicode ou separadores invalida offsets. O Gemini TTS atual devolve áudio, mas não fornece por si mesmo estes timestamps; é necessária uma API de Forced Alignment ou um provider que devolva alinhamento. O adaptador precisa mapear a resposta do provedor para CharacterTimeAlignment sem interpolar tempos.

Esta entrega acrescenta src/test/narration-timeline-edgecases.test.ts para verificar offsets com acentos e emoji fora do plano básico, rejeição de timestamps negativos/não finitos/invertidos e não monotônicos, e seleção de cue antes/durante/depois de uma pausa. O teste usa alinhamento sintético apenas como fixture determinística; não comprova a precisão de um áudio real nem que o player já esteja integrado.

### Adaptador puro para o formato atual da ElevenLabs

A API oficial de Forced Alignment documenta POST /v1/forced-alignment com um arquivo de áudio e a transcrição exata, retornando uma lista characters: [{ text, start, end }], uma lista de palavras e o valor loss. O helper já existente espera as mesmas informações em três arrays paralelos: characters, character_start_times_seconds e character_end_times_seconds.

Para evitar código duplicado dentro do player, esta entrega acrescenta:
- src/lib/elevenlabs-alignment-adapter.ts: converte o payload da resposta da ElevenLabs ao contrato CharacterTimeAlignment, comparando cada ponto de código Unicode com o texto enviado. Rejeita quantidade diferente de caracteres, normalização/alteração de texto, valores inválidos e tempos fora de ordem.
- src/test/elevenlabs-alignment-adapter.test.ts: testa caracteres com acentos, emoji, espaços, pontuação, texto divergente, arrays incompletos, timestamps negativos/não monotônicos e payload incompleto.

O adaptador não chama a API e não contém chave de serviço. A requisição multipart e o segredo devem ficar num servidor/ambiente de build protegido. O fluxo de integração é: gerar o WAV/MP3 aprovado → enviar arquivo e texto canônico para Forced Alignment → adaptar a resposta com esse módulo → chamar buildAlignedNarrationTimeline(lesson, result.alignment) → salvar os cues num manifesto versionado junto ao áudio. Como a resposta da API inclui loss, a implementação expõe o valor para que o pipeline possa registrar e revisar alinhamentos de baixa confiança; não cria um limiar universal sem validação empírica.

Fonte oficial do endpoint: https://elevenlabs.io/docs/api-reference/forced-alignment/create
## 2. Arquivos reais examinados

- package.json: React 18, TypeScript, Vite, Tailwind 3, Capacitor 7 e @capacitor-community/text-to-speech. Scripts declarados: npm test, npm run typecheck, npm run build e npm run test:e2e.
- src/content/narrated/types.ts: modelo NarratedLesson, Scene, Beat e Visual; o beat tem texto e campo show, mas não timestamps de áudio.
- src/content/narrated/prim-computador.ts e src/content/narrated/mat-somar-inteiros.ts: roteiros autorais.
- src/content/index.ts: registro das aulas autorais e das geradas a partir de MicroLesson.
- src/lib/narrate.ts: conversor que transforma microaulas em falas e elementos visuais.
- src/lib/narration.ts: navegação de cenas/falas e validateNarrated para falas vazias, referências de estado e limites de número na reta.
- src/app/voice.ts e src/pages/Narrated.tsx: o caminho Gemini gera uma faixa de áudio contínua e usa a duração real para a barra/seek. A mudança de cena e o destaque da fala ainda são aproximados por projeção proporcional sobre readingMs; a duração real do arquivo não fornece, sozinha, os pontos temporais de cada frase.
- src/pages/ReviewSlides.tsx, src/content/types.ts, src/content/grimoires/primeiros/index.ts e Markdown do capítulo introdutório: origem dos textos e montagem das lâminas.

### Arquivos desta entrega

- src/lib/elevenlabs-alignment-adapter.ts — adapta a resposta oficial de Forced Alignment ao contrato de alinhamento existente.
- src/test/elevenlabs-alignment-adapter.test.ts — testes do adaptador com respostas válidas/malformadas.
- src/test/narration-timeline-edgecases.test.ts — testes adicionais de Unicode, timestamps inválidos, monotonicidade e estabilidade visual em pausas.
- src/test/narrated-content-quality.test.ts — verifica estrutura básica e cobertura de conceitos dos roteiros atuais.
- Este documento — auditoria do TTS, da sincronização real, da origem dos slides e das recomendações de integração.

Os roteiros, src/lib/narration-timeline.ts, src/app/voice.ts, src/pages/Narrated.tsx e src/pages/ReviewSlides.tsx não são alterados nesta entrega. Isso evita competir com os commits recentes dos outros colaboradores.

## 3. Opções atuais de voz em português brasileiro

As páginas oficiais consultadas confirmam APIs e capacidades de produto. A qualidade natural real, a pronúncia de nomes e siglas e a estabilidade em narração longa ainda precisam ser comparadas por áudio; o texto de marketing do fornecedor não comprova desempenho no caso de uso.

| Provedor | Naturalidade e controle documentados | pt-BR | Áudio e sincronização | Preço público consultado | Avaliação |
|---|---|---|---|---|---|
| **ElevenLabs — Eleven v4 / Multilingual v2** | v4 prioriza expressividade e tags de áudio; TTS oferece parâmetros de voz. | Multilingual v2 declara explicitamente português brasileiro e português europeu. v4 lista português genericamente; o sotaque brasileiro deve ser testado com uma voz específica. | TTS por API; Forced Alignment pode alinhar o áudio gerado à transcrição e devolver timestamps por palavra. A documentação do alinhador inclui português do Brasil/Portugal para o caminho compatível. | v4: **US$ 0,08/1.000 caracteres**; v4 Turbo: **US$ 0,04/1.000 caracteres**. Para 5.000 caracteres, cerca de US$ 0,40 e US$ 0,20 por geração, sem alinhamento, impostos ou conversão cambial. | Principal candidata para teste de expressividade e sincronismo. Compare v4 com Multilingual v2: a segunda tem garantia documental mais explícita de pt-BR; confirme se a qualidade da voz selecionada é adequada. |
| **Google Gemini 3.8 Flash TTS** | API permite orientar estilo, prosódia, ritmo, tom e sotaque por speech_metadata e tags. Foi projetada para recitação de texto e narração longa. | O estilo pode orientar o modelo a falar em português brasileiro, mas nomes, siglas e matemática precisam ser ouvidos e verificados. | A API documenta saída WAV e streaming PCM. A documentação consultada não descreve timestamps de palavra na saída TTS. Para alinhar com precisão, use alinhamento pós-geração ou clipes com duração real. | Standard: até 31/12/2026, US$ 0,50 por milhão de tokens de texto e US$ 9 por milhão de tokens de áudio (valor publicado equivalente a cerca de US$ 0,00225 por 10 segundos de áudio). A partir de 01/01/2027, US$ 1 e US$ 18 (aprox. US$ 0,0045/10 s), além da parcela de texto. Flash-Lite tem preço publicado menor para o áudio. Tier gratuito tem limites/termos; não pressupor uso irrestrito. | Melhor alternativa incremental: já está integrado. Corrija a arquitetura da chave e prepare o áudio antecipadamente, sem assumir que o TTS nativo fornece timestamps. |
| **Google Cloud Text-to-Speech — Chirp 3 HD** | Síntese HD; SSML documenta pausas, prosódia e fonemas em pedidos síncronos. | Vozes pt-BR precisam ser selecionadas pelo locale listado no catálogo. | A lista de elementos SSML publicada para Chirp 3 HD não inclui `<mark>`; não contar com marcas temporais por cue nesse modelo. É necessário outro alinhador ou outra engine compatível. | 1 milhão de caracteres sem custo financeiro e **US$ 30 por milhão de caracteres** após o limite mensal. Acima do limite, 5.000 caracteres custariam cerca de US$ 0,15. | Alternativa de voz; não a recomendação principal para sincronização temporal sem alinhador adicional. |
| **Azure Speech — Neural HD / Neural HD Flash** | Catálogo inclui styles/emoções como excited, hopeful, sad e whispering para vozes compatíveis. SSML permite controle de prosódia conforme o modelo. | Locales pt-BR explicitamente listados, inclusive vozes como Thalita, Macerio, Caio e Luana conforme a família/versão. | API de síntese e SSML; validar recursos de marca temporal e streaming para a voz e o formato escolhidos. | Varia por região, tier e modelo; consultar o preço da região de hospedagem, em vez de supor um valor universal. | Boa alternativa empresarial se a infraestrutura Azure já existir. Comparar em áudio antes de decidir. |
| **OpenAI Speech API — gpt-4o-mini-tts / tts-1 / tts-1-hd** | API documenta instruções para sotaque, emoção, entonação, velocidade e tom; também permite streaming. A documentação diz que as vozes são otimizadas para inglês. | Português está na lista de idiomas compatíveis, mas isso não significa que a voz esteja otimizada para pt-BR. | API de voz com streaming e formatos MP3, Opus, AAC, WAV e PCM. | Ver tabela de preços atualizada da API. | Não escolher como fundação nova agora: documentação atual informa encerramento desses modelos em **06/01/2027** e recomenda migração para Realtime API, que exige outra arquitetura. |
| **Voz nativa Android / Web Speech** | Resultado varia conforme aparelho, pacote de voz, navegador e mecanismo do sistema. O nome da voz não garante naturalidade. | Depende das vozes instaladas/baixadas no aparelho. | Pode funcionar localmente/offline. O plugin nativo atual não dá uma sequência universal e precisa de eventos por palavra. | Sem cobrança por chamada da aplicação na maioria dos cenários, mas depende do aparelho/serviço do sistema. | Fallback e acessibilidade. Não deve ser a voz padrão pretendida para as aulas premium sem teste de qualidade. |

### Recomendação objetiva

**Primeiro teste: ElevenLabs v4 + Forced Alignment**, e comparar com Multilingual v2 para narração longa. A página atual de TTS apresenta v4 como o modelo mais expressivo, com suporte a mais de 90 idiomas, enquanto o Multilingual v2 lista explicitamente português do Brasil/Portugal e estabilidade para geração longa. A API de Forced Alignment aceita uma gravação e a transcrição e devolve timestamps de palavra/frase; sua lista de idiomas inclui pt-BR no conjunto Multilingual v2. O preço da API de alinhamento é publicado como o mesmo da API Speech-to-Text (consultar a tarifa por hora antes de estimar o custo total). A escolha final depende de ouvir as amostras, não do rótulo do modelo.

**Alternativa para aproveitar a integração atual: Gemini 3.8 Flash TTS.** O projeto já usa esse modelo, direciona estilo pelo campo speech_metadata e permite selecionar voz. A solução mais segura é gerá-lo na etapa editorial, armazenar o arquivo e alinhá-lo depois. Flash-Lite deve entrar no teste se reduzir custo/latência sem piorar a naturalidade.

**Nota sobre o Cloud TTS:** Chirp 3 HD documenta elementos SSML como `break`, `phoneme` e `prosody`, mas a lista atual não inclui `<mark>`. Não o recomendar como mecanismo autossuficiente de timestamps; planejar alinhamento separado ou escolher uma engine cuja documentação confirme marcações.

### Avaliação comparável

Criar um texto de 45–60 segundos com Ada Lovelace, Charles Babbage, Herman Hollerith, CPU, RAM, ENIAC, IBM, TI, anos 1843/1946/1971/1981, “menos quatro mais nove”, “seis menos menos dois” e “módulo do maior valor”. Pedir uma pausa curta numa vírgula e uma pausa maior entre explicações. Gerar em volume normalizado e sem música; ouvir em 1× e 1,2×; pontuar de 1 a 5 naturalidade, articulação, prosódia, pronúncia e fadiga auditiva. Registrar modelo, voz, configurações, data e custo. Isso é um teste exploratório, não um estudo estatístico.

### Privacidade, chaves e licenciamento

- A documentação oficial do Google orienta a não expor chaves de API em aplicações web/mobile de produção. Em src/app/voice.ts, a chave digitada é salva em localStorage e enviada diretamente do cliente; qualquer chave compartilhada colocada ali pode ser extraída. Permitir chave própria do usuário apenas como modo experimental explícito; para a credencial do serviço, chamar um backend/serverless que a mantém em secret manager/ambiente seguro.
- Para primeira versão, prefira geração antecipada: a chave fica apenas no ambiente de produção do áudio, a interface estática não precisa chamar TTS e o custo é pago uma única vez por versão aprovada. Usar storage/CDN separado se o volume de áudios crescer; GitHub Pages pode servir interface e manifesto.
- Não reutilizar diretamente as vozes internas dos produtos ChatGPT ou Gemini nem fazer scraping. API pública com modelo/voz listados é uma oferta distinta do recurso interno do produto. Usar apenas vozes licenciadas pela API; voz personalizada/clonada exige direitos e consentimento apropriados.
- Antes do lançamento, confirmar termos de uso comercial, retenção dos dados, região de processamento, uso para melhoria do modelo e políticas para áudio gerado. Sinalizar claramente ao estudante que a voz é gerada por IA, atendendo aos requisitos do provedor escolhido.

## 4. Sincronização audiovisual

### Problemas reais observados

- readingMs calcula duração pela quantidade de palavras e velocidade nominal; datas, siglas, fórmulas e pausas tornam essa estimativa imprecisa.
- O commit mais recente da branch-base já integra uma faixa Gemini com duração real para reprodução e seek. Porém, a seleção do beat visual ainda projeta o tempo real proporcionalmente sobre estimatedTotalMs e distribui o progresso estimado entre os beats; a duração real do áudio, por si só, não fornece as marcas de cada frase.
- O player atualizado ainda não usa o manifesto de alinhamento por palavra. O destaque da legenda e a mudança de beat continuam derivados de beatElapsed/readingMs e de proporção de caracteres no método speak; essas estimativas não representam pausas nem duração desigual das palavras. O módulo src/lib/narration-timeline.ts desta entrega oferece um contrato para substituir essa inferência quando o adaptador de Forced Alignment estiver disponível.
- A voz nativa no plugin Capacitor não dá eventos de palavra com precisão consistente em todas as versões Android.
- Gerar um arquivo por beat pode produzir demora e pausas de fronteira e exige tratamento complexo para seek dentro de uma fala.

### Arquitetura recomendada: áudio pré-gerado e manifesto

1. Aprovar o roteiro e versioná-lo por ID + versão/hash do texto.
2. Gerar um arquivo por aula (MP3/AAC ou Opus depois de verificar a compatibilidade no Android e web). Registrar duração/codec real.
3. Produzir uma transcrição alinhada usando Forced Alignment ou marcadores temporais suportados pela voz. Confirmar que a transcrição e o áudio correspondem à mesma versão do conteúdo.
4. Salvar um manifesto JSON com eventos por frase/bloco: startMs, endMs, sceneId, beatId e visualState. Opcionalmente incluir palavras com startMs/endMs para karaoke de legenda.
5. Controlar a reprodução por um único elemento de áudio. Pausa e continuação obedecem ao playback real. Seek muda currentTime e recalcula o evento visual usando o manifesto. Usar timeupdate/requestAnimationFrame para consultar currentTime, sem timers que imitam a fala.
6. Alterar a velocidade com playbackRate no elemento de áudio, sem refazer estimativas por palavra. Se o provedor devolver um arquivo inteiro, o seek passa a ter um relógio único.
7. Hospedar os arquivos de áudio fora do bundle de JavaScript, em storage/CDN versionado. Implementar cache/download offline no Capacitor apenas se a prioridade offline for confirmada.

### Alternativa incremental: clipe por beat

Pré-gerar um arquivo por beat e guardar sua duração real. Avançar no evento ended; somar durações reais na régua; seek para o início de um beat é preciso. Essa solução não fornece seek preciso dentro de um beat e pode deixar emendas audíveis; não declarar alinhamento de palavra. A experiência final mais contínua usa um arquivo por aula.

### O que sincronizar

Priorizar marcas por frase/unidade didática, não por cada palavra a todo custo. Uma visualização deve mudar quando a explicação efetivamente chega ao conceito. Para o Google Cloud TTS, confirmar que a voz/engine aceita SSML mark. Para Gemini 3.8 TTS, a documentação consultada descreve saída de áudio/streaming, mas não timestamps por palavra; planejar alinhamento pós-geração ou clips de duração real.

A interface do player continua fora deste PR: controles flutuantes devem permanecer independentes e não redimensionar o palco, como a outra sessão está implementando.

## 5. Auditoria da origem do texto e da montagem dos slides de revisão

### Pipeline verificado

O capítulo introdutório é montado em src/content/grimoires/primeiros/index.ts por Markdown importado via ?raw, além de glossário e referências. Em ReviewSlides.tsx:
1. plainReviewText() tira ou converte partes da marcação;
2. splitReviewChunks(text, 430) divide parágrafos e frases, e divide frases longas por espaços/palavras;
3. buildReviewSlides() acrescenta os segmentos de todas as seções, cada item de glossário e cada referência, mais capa/fecho;
4. SlideCard usa composição de altura fixa, com overflow-hidden em cartões internos e bloco de texto flexível.

### Conclusões confirmáveis

- Não encontrei truncamento arbitrário do corpo de texto em splitReviewChunks por substring. O limite 430 divide o texto em partes e a frase longa é quebrada por palavra.
- buildReviewSlides não tem limite geral pequeno de quantidade de slides: percorre todas as seções, glossário e referências, gerando lâminas extras.
- Isso **não garante que todo o texto fique visível**. A divisão não mede a altura final do título, fonte, área ilustrada ou viewport; 430 caracteres podem caber num telefone e exceder outro. overflow-hidden pode cortar a renderização sem remover o restante de slide.body.
- Os cartões usam h-full, min-h-0 e overflow-hidden; o corpo tem flex-1, white-space preservada e fonte baseada em clamp, mas não encontrei medição de overflow seguida de redivisão automática baseada no layout. O problema relatado pode estar na apresentação e não na truncagem do texto-fonte.
- A paleta tem cores saturadas atuais (vermelho, azul, ameixa, magenta, ocre); a correção principal é assegurar legibilidade, hierarquia e composição, não simplesmente mudar as cores.
- plainReviewText altera significado/formatação: transforma links em rótulos sem manter a URL de destino; transforma linhas de tabela em listas com separadores; transforma texto alternativo de imagens em texto e remove separadores; blocos de código cercados por crases não parecem ter tratamento próprio, então os delimitadores podem aparecer no texto final.
- O código de ilustração histórica rotula o retrato de Ada Lovelace como domínio público e uma imagem do ENIAC como CC BY-SA 4.0. Confirmar a licença da página exata do arquivo e incluir atribuição como requerido antes de distribuir.

### Recomendações para a sessão que altera a interface

1. Manter conteúdo completo e metadados de origem separados da apresentação: IDs de seção/referência/glossário e faixa de origem devem acompanhar os chunks.
2. Substituir apenas o limite fixo de caracteres por divisão semântica com medição real. Fazer uma divisão inicial por parágrafo/frase/lista; renderizar com a tipografia do slide; medir a altura disponível; dividir novamente se exceder. Recalcular em mudança de viewport/orientação com ResizeObserver; não introduzir rolagem vertical dentro da lâmina.
3. Não reduzir indefinidamente a fonte; se não couber de forma legível, criar uma lâmina adicional, preservando ordem e conteúdo.
4. Preservar tabelas em formato de tabela quando o alinhamento entre colunas tiver significado; caso contrário, converter linhas em itens rotulados sem perder cabeçalho ou valores. Reter destino de links e atribuições de imagens quando úteis.
5. Capa com composição editorial própria: título, subtítulo, nome da coleção/tema, número do capítulo e uma imagem contextual, sem deixar uma descrição longa esmagar o espaço da ilustração.
6. Manter cores chapadas fortes, mas associá-las a funções editoriais consistentes. Imagens históricas devem estar relacionadas à fala do momento e trazer fonte/licença.

### Casos de teste de slides

- Texto curto, em torno de 430 caracteres, frase única maior do que 430, muitos parágrafos curtos, links longos, lista ordenada, tabela, blockquote, código cercado e imagem com alt text.
- Capítulo real com seção longa, glossário grande e referências extensas; comparar a origem e todos os segmentos para confirmar que a transformação não descartou texto/linhas.
- Viewports 360×640, 360×800, 390×844, 412×915 e 1280×800; mudanças de orientação e fonte de sistema ampliada.
- Capa, página interna, primeiro e último slides, com e sem controles visíveis.
- Playwright: medir o elemento do corpo. O teste precisa garantir que scrollHeight não exceda clientHeight além de 1–2 px e que rodapé/controles não se sobreponham ao texto. Repetir por todos os slides, não só pela capa.
- Teste de sequência: reconstituir os chunks na ordem e comparar com a versão normalizada esperada, verificando tabelas, URLs, títulos e referências.

## 6. Risco adicional no gerador automático de aulas

src/lib/narrate.ts gera aulas para MicroLesson. plainSpeech ignora linhas iniciadas por | e citações iniciadas por >; conteúdos exclusivos de uma tabela/citação podem ficar ausentes da fala. listCards usa items.slice(0, 6), logo se a explicação tem mais de seis itens de lista, itens posteriores deixam de aparecer nos cartões. As falas ainda podem mencioná-los, então a representação visual pode não cobrir tudo. A cena de linha do tempo é inferida por um padrão no título da etapa, uma heurística, não uma decisão editorial. A abertura pode ficar longa em uma aula com muitos passos.

Recomendação: adicionar teste de cobertura por ID de etapa e item de lista, criar cenas adicionais em vez de truncar silenciosamente a coleção e manter revisão editorial separada da validação estrutural. Uma aula pode passar em índices e ainda estar didaticamente fraca.

## 7. Revisão editorial dos roteiros que já estão na branch-base

### História dos computadores

A sequência agora contextualiza cálculo manual, Pascalina, cartões de Jacquard, projeto da Máquina Analítica, notas de Ada em 1843, tabulação do censo por Hollerith, história empresarial até a IBM, ENIAC, trabalho de programadoras, transistor, circuito integrado, Intel 4004, computadores pessoais e smartphones modernos. As formulações evitam dizer que a máquina de Babbage foi construída ou que os smartphones começaram em 2007.

Ideias visuais para a sessão do player:
- Pascalina: engrenagens e transporte entre casas decimais.
- Jacquard: furos no cartão ligados aos fios e ao padrão do tecido.
- Máquina Analítica: cartões → moinho (cálculo) → armazém (números) → resultado; retrato de Ada enquanto suas notas são explicadas.
- Hollerith: cartões de censo → contatos elétricos → contador/tabela.
- ENIAC: fotografia histórica correta dos painéis com legenda e licença; depois, diagrama de cabos e interruptores.
- Miniaturização: válvula → transistor → circuito integrado → Intel 4004, sem distorcer as proporções.

Fontes históricas:
- U.S. Census Bureau, tabulação de Hollerith: https://www.census.gov/about/history/bureau-history/census-innovations/technology/tabulation-and-processing.html
- Smithsonian, máquina tabuladora de Hollerith: https://www.si.edu/object/nmah_694410
- Smithsonian, de Hollerith a IBM: https://www.si.edu/spotlight/tabulating-equipment/from-herman-hollerith-to-ibm
- Intel, anúncio do 4004 em 15/11/1971: https://timeline.intel.com/1971/the-first-programmable-microprocessor%3A-the-4004
- Smithsonian, Intel 4004 (verificar direitos da imagem): https://www.si.edu/object/intel-4004-microprocessor%3Anmah_713495
- Wikimedia Commons, retrato de Ada Lovelace indicado como domínio público: https://commons.wikimedia.org/wiki/File:Ada_Lovelace_portrait.jpg

### Soma e subtração de inteiros

A versão atual na branch-base diferencia direção na reta, soma com positivo, soma com negativo, sinais iguais, sinais diferentes, subtração como soma do oposto, subtração de número negativo e resumo. Os estados mostram saltos sucessivos na reta; o teste de qualidade verifica a progressão dos estados de exibição. A nova utilidade de timeline não muda esses roteiros: apenas transforma timestamps reais de alinhamento em eventos que o player pode consumir. Os exemplos incluem estados intermediários, passagem pelo zero em 3 + (−5), uso de módulos, sinal do maior módulo e resultado zero quando os módulos são iguais.

A interface deve revelar saltos sem remontar toda a cena a cada fala. O campo show expressa o estado didático; não deveria provocar reinício de todas as animações. Validar essa parte na interface sob responsabilidade da outra sessão.

## 8. Plano de testes e situação real

### Testes automatizados recomendados

- npm test — o novo src/test/narrated-content-quality.test.ts verifica estrutura, ausência de falas vazias, índices e presença de conceitos-chave nas três aulas autorais.
- npm run typecheck — tipagem TypeScript e imports do teste.
- npm run build — produção compilável.
- npm run test:e2e — incluir overflow dos slides e estabilidade do player.
- Criar testes específicos para plainReviewText/splitReviewChunks cobrindo links, tabelas, código, imagens e igualdade da sequência de texto.
- Para voz: estados offline, HTTP 401/403/429/5xx, cancelamento, pausa/continuação, seek ao início/meio/fim, troca de aula durante geração e invalidação de áudio quando o texto muda.

### Validação manual obrigatória

Em um Galaxy A14 5G ou Android equivalente: viewport inteira; ausência de scroll; controles que não ficam atrás da navegação do sistema; revelar controles sem reiniciar a fala; pausa/continuação sem duplicação; seek alinhado ao áudio real; transições sem piscar; pronúncia de nomes/datas/siglas/símbolos matemáticos. Repetir no browser móvel e desktop, incluindo alteração de velocidade.

### Situação desta entrega

- Arquivos de origem lidos: sim, via GitHub connector na branch informada.
- Branch isolada criada: sim.
- Roteiros completos, helper temporal, camada de voz e player: preservados como estavam na branch-base atual. Esta entrega acrescenta testes de casos-limite, cobertura estrutural e documentação; não modifica os arquivos em desenvolvimento paralelo.
- Testes executados nesta sessão: **nenhum**. Os testes foram escritos, mas não executados aqui. O clone local falhou por indisponibilidade de resolução de rede para GitHub, portanto não consegui instalar dependências nem executar Vitest, TypeScript, build ou Playwright.
- CI: a consulta de status/execuções não retornou verificações para o commit observado. Isso não significa aprovação nem falha; conferir Actions no GitHub antes de mesclar.
- Áudio gerado e ouvido: não. Não afirmo que alguma voz soa natural até ouvir/comparar as amostras.
- Interface do player/slides alterada: não.

## 9. Fontes oficiais de TTS

- Gemini TTS (estilos, modelos e streaming): https://ai.google.dev/gemini-api/docs/speech-generation
- Gemini API pricing e alteração em 01/01/2027: https://ai.google.dev/gemini-api/docs/pricing
- Google — segurança de API keys: https://ai.google.dev/gemini-api/docs/api-key
- Google Cloud TTS pricing: https://cloud.google.com/text-to-speech/pricing?hl=pt-BR
- Google Cloud SSML e timepoints: https://docs.cloud.google.com/text-to-speech/docs/ssml?hl=pt-br
- ElevenLabs TTS e idiomas: https://elevenlabs.io/docs/overview/capabilities/text-to-speech
- ElevenLabs modelos: https://elevenlabs.io/docs/pt/overview/models
- ElevenLabs Forced Alignment — idiomas, custo relativo e limites: https://elevenlabs.io/docs/pt/overview/capabilities/forced-alignment
- ElevenLabs Forced Alignment API — estrutura da resposta characters[].text/start/end, arquivo/transcrição de entrada e campo loss: https://elevenlabs.io/docs/api-reference/forced-alignment/create
- ElevenLabs preço da API: https://elevenlabs.io/pricing/api
- Microsoft Azure Speech — línguas e vozes: https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/language-support
- OpenAI Speech API: https://developers.openai.com/api/docs/guides/text-to-speech
- OpenAI API deprecation notices: https://developers.openai.com/api/docs/deprecations

Preços e termos podem mudar e dependem de modelo, região, tier, câmbio, tributos, volume e condições contratuais. Reconfirmar no console do fornecedor antes de aprovar orçamento de produção.
