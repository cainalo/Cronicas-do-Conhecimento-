# Auditoria técnica: voz, aulas narradas e slides de revisão

**Data da pesquisa inicial:** 26/10/2026  
**Atualização da auditoria:** 27/10/2026  
**Branch examinada:** claude/cronicas-conhecimento-estudos-jgbofo  
**Branch desta entrega:** gpt/auditoria-narradas-sync-2026-10-27  
**Limite de responsabilidade:** não alterei src/pages/Narrated.tsx nem src/pages/ReviewSlides.tsx. A outra sessão continua responsável pela interface dessas páginas.

## 1. Resumo executivo

O repositório real foi consultado via integração do GitHub. A aplicação já tem player em viewport inteira e suporte opcional a Gemini TTS, mas o progresso audiovisual não tem precisão real: usa duração estimada pela contagem de palavras; o callback de “palavra” da voz Gemini interpola linearmente entre o tempo do áudio e o comprimento do texto. Essa estimativa não acompanha a duração real das palavras, pausas ou pronúncias.

A branch-base avançou enquanto o trabalho estava em curso. O commit atual da branch de trabalho, aa60603d6d73a34f20cc4c2c1ed40329af3d8bce, já contém roteiros de história dos computadores e soma/subtração mais extensos, feitos por outro colaborador; por isso esta branch de auditoria não os sobrescreve. Ela acrescenta um teste Vitest adaptado ao conteúdo atualmente na base e este relatório independente. A tentativa anterior de PR (nº 7) ficou em conflito e deve ser considerada supersedida por esta entrega limpa.

**Prioridades sugeridas:**
1. **P0 — segurança:** não expor uma chave de API compartilhada no app React/Capacitor. A implementação atual salva a chave Gemini digitada em localStorage e chama a API diretamente do cliente. Isso é aceitável apenas como opção experimental de chave própria do usuário, claramente identificada (BYOK), não como credencial global de produção.
2. **P0 — sincronização:** gerar/armazenar áudio com duração real e associar os visuais a eventos temporais; não declarar sincronização exata baseada em palavras por segundo ou proporção de caracteres.
3. **P1 — conteúdo:** ouvir as amostras em português brasileiro e fazer revisão humana dos roteiros. O status dos dois conteúdos continua nao-revisado.
4. **P1 — slides:** preservar a origem do conteúdo, mas dividir cada lâmina conforme a área útil real após renderização; 430 caracteres não garantem encaixe em um celular.
5. **P2 — escolha de voz:** comparar às cegas os mesmos 45–60 segundos em dois ou três provedores, incluindo nomes, siglas, datas e matemática.



## 2.1. Atualização de integração independente — commit aa60603 (27/10/2026)

A branch-base recebeu uma tentativa de abstração para uma faixa de áudio contínua em src/app/voice.ts. A ideia é boa, mas a implementação observada ainda não cumpre o objetivo sozinha:

1. **Erro histórico de sintaxe no commit aa60603, confirmado com Node 22.16.0 — corrigido no snapshot mais recente consultado.** No blob antigo de src/app/voice.ts (SHA 2b6e1894af2c1f4042874a764db896f898664492), a expressão regular de decodificação tinha barras invertidas duplicadas: isso fazia o arquivo falhar ao ser analisado e a expressão de remoção de espaços também não funcionar. Reproduzi a falha com Node. Após o alerta, a versão mais recente da branch-base consultada (blob SHA 81bd15d35343bac47a0d95da000878c007c414d4) já usa a expressão correta: \`value.replace(/^data:audio\/[a-z0-9.+-]+;base64,/i, '').replace(/\s/g, '')\`. Portanto, o bloqueador de sintaxe parece ter sido corrigido pelo trabalho paralelo. Ainda é necessário confirmar a correção com typecheck/build completos; esta sessão não os executou.
2. **A faixa contínua já foi integrada ao player, mas a sincronização visual ainda é aproximada.** Na versão mais recente de src/pages/Narrated.tsx, o player chama voice.createAudioTrack(script, rate), usa durationMs para a duração total e altera audio.currentTime no seek. Porém, updatePosition transforma o progresso real em um tempo fictício pela fórmula (mediaMs / realDuration) * estimatedTotalMs e escolhe a fala usando readingMs por beat. Isso acerta o relógio de áudio e a busca, mas não garante que a cena mude no instante em que a narração chega ao conceito. Para sincronismo real, o pipeline ainda precisa de Forced Alignment/metadados de frase e de um manifesto temporal.
3. **Duração real não equivale a alinhamento de cada frase.** O player agora tem duração total e seek reais no fluxo Gemini, mas, sem Forced Alignment ou metadados de frase/beat, não sabe quando trocar a cena. A narração textual completa precisa ser alinhada à transcrição e produzir um manifesto de eventos visuais.
4. **Risco de velocidade aplicada duas vezes:** a instrução de geração Gemini já inclui “Velocidade solicitada: ${rate}x” no estilo de voz e o player também define audio.playbackRate = rate. Em valores diferentes de 1, confirmar se o ritmo está sendo alterado duas vezes; escolher entre gerar numa velocidade-base e aplicar playbackRate ou pedir a velocidade ao modelo sem multiplicar de novo, e documentar a decisão.
5. **Próximas verificações para o mantenedor de voz/player:** confirmar via typecheck/build a correção de escaping; testar o carregamento do Blob WAV no Android WebView; confirmar cancelamento e dispose() ao trocar/parar a aula; medir o áudio gerado; validar a velocidade em 0,8×/1,0×/1,2×; e integrar eventos temporais reais à linha do tempo. O uso de uma chave Gemini compartilhada no cliente continua inseguro para produção.


## 2. Arquivos reais examinados

- package.json: React 18, TypeScript, Vite, Tailwind 3, Capacitor 7 e @capacitor-community/text-to-speech. Scripts declarados: npm test, npm run typecheck, npm run build e npm run test:e2e.
- src/content/narrated/types.ts: modelo NarratedLesson, Scene, Beat e Visual; o beat tem texto e campo show, mas não timestamps de áudio.
- src/content/narrated/prim-computador.ts e src/content/narrated/mat-somar-inteiros.ts: roteiros autorais.
- src/content/index.ts: registro das aulas autorais e das geradas a partir de MicroLesson.
- src/lib/narrate.ts: conversor que transforma microaulas em falas e elementos visuais.
- src/lib/narration.ts: navegação de cenas/falas e validateNarrated para falas vazias, referências de estado e limites de número na reta.
- src/app/voice.ts e src/pages/Narrated.tsx: seleção de voz, chamada TTS, progresso e seek estimados.
- src/pages/ReviewSlides.tsx, src/content/types.ts, src/content/grimoires/primeiros/index.ts e Markdown do capítulo introdutório: origem dos textos e montagem das lâminas.

### Arquivos desta entrega limpa

- src/test/narrated-content-quality.test.ts — verificação estrutural e cobertura mínima dos conceitos, alinhada aos roteiros que já existem na branch-base.
- Este documento — auditoria independente e recomendações de integração.

Os roteiros da história e de matemática já estão mais extensos no commit-base atual e são mantidos como estão. Não foram alterados src/pages/Narrated.tsx, src/pages/ReviewSlides.tsx, src/app/voice.ts, estilos globais ou os textos-base Markdown, porque estão sendo trabalhados em paralelo.
## 3. Opções atuais de voz em português brasileiro

As páginas oficiais consultadas confirmam APIs e capacidades de produto. A qualidade natural real, a pronúncia de nomes e siglas e a estabilidade em narração longa ainda precisam ser comparadas por áudio; o texto de marketing do fornecedor não comprova desempenho no caso de uso.

| Provedor | Naturalidade e controle documentados | pt-BR | Áudio e sincronização | Preço público consultado | Avaliação |
|---|---|---|---|---|---|
| **ElevenLabs — Eleven v4 / Multilingual v2** | v4 prioriza expressividade e tags de áudio; TTS oferece parâmetros de voz. | Multilingual v2 declara explicitamente português brasileiro e português europeu. v4 lista português genericamente; o sotaque brasileiro deve ser testado com uma voz específica. | TTS por API; Forced Alignment pode alinhar o áudio gerado à transcrição e devolver timestamps por palavra. A documentação do alinhador inclui português do Brasil/Portugal para o caminho compatível. | v4: **US$ 0,08/1.000 caracteres**; v4 Turbo: **US$ 0,04/1.000 caracteres**. Para 5.000 caracteres, cerca de US$ 0,40 e US$ 0,20 por geração, sem alinhamento, impostos ou conversão cambial. | Principal candidata para teste de expressividade e sincronismo. Compare v4 com Multilingual v2: a segunda tem garantia documental mais explícita de pt-BR; confirme se a qualidade da voz selecionada é adequada. |
| **Google Gemini 3.8 Flash TTS** | API permite orientar estilo, prosódia, ritmo, tom e sotaque por speech_metadata e tags. Foi projetada para recitação de texto e narração longa. | O estilo pode orientar o modelo a falar em português brasileiro, mas nomes, siglas e matemática precisam ser ouvidos e verificados. | A API documenta saída WAV e streaming PCM. A documentação consultada não descreve timestamps de palavra na saída TTS. Para alinhar com precisão, use alinhamento pós-geração ou clipes com duração real. | Standard: até 31/12/2026, US$ 0,50 por milhão de tokens de texto e US$ 9 por milhão de tokens de áudio (valor publicado equivalente a cerca de US$ 0,00225 por 10 segundos de áudio). A partir de 01/01/2027, US$ 1 e US$ 18 (aprox. US$ 0,0045/10 s), além da parcela de texto. Flash-Lite tem preço publicado menor para o áudio. Tier gratuito tem limites/termos; não pressupor uso irrestrito. | Melhor alternativa incremental: já está integrado. Corrija a arquitetura da chave e prepare o áudio antecipadamente, sem assumir que o TTS nativo fornece timestamps. |
| **Google Cloud Text-to-Speech — Chirp 3 HD** | Síntese HD e API comercial; SSML controla pausas em engines compatíveis. | Vozes pt-BR explicitamente listadas. | Gera áudio; a API Cloud possui timepoints com marca SSML nas modalidades compatíveis. A compatibilidade de tags precisa ser confirmada para a voz/engine específica escolhida. | 1 milhão de caracteres sem custo financeiro e **US$ 30 por milhão de caracteres** após o limite mensal. Acima do limite, 5.000 caracteres custariam cerca de US$ 0,15. | Boa alternativa de produção se o locale brasileiro explícito e uma API Cloud convencional forem prioritários; qualidade deve ser julgada por amostra. |
| **Azure Speech — Neural HD / Neural HD Flash** | Catálogo inclui styles/emoções como excited, hopeful, sad e whispering para vozes compatíveis. SSML permite controle de prosódia conforme o modelo. | Locales pt-BR explicitamente listados, inclusive vozes como Thalita, Macerio, Caio e Luana conforme a família/versão. | API de síntese e SSML; validar recursos de marca temporal e streaming para a voz e o formato escolhidos. | Varia por região, tier e modelo; consultar o preço da região de hospedagem, em vez de supor um valor universal. | Boa alternativa empresarial se a infraestrutura Azure já existir. Comparar em áudio antes de decidir. |
| **OpenAI Speech API — gpt-4o-mini-tts / tts-1 / tts-1-hd** | API documenta instruções para sotaque, emoção, entonação, velocidade e tom; também permite streaming. A documentação diz que as vozes são otimizadas para inglês. | Português está na lista de idiomas compatíveis, mas isso não significa que a voz esteja otimizada para pt-BR. | API de voz com streaming e formatos MP3, Opus, AAC, WAV e PCM. | Ver tabela de preços atualizada da API. | Não escolher como fundação nova agora: documentação atual informa encerramento desses modelos em **06/01/2027** e recomenda migração para Realtime API, que exige outra arquitetura. |
| **Voz nativa Android / Web Speech** | Resultado varia conforme aparelho, pacote de voz, navegador e mecanismo do sistema. O nome da voz não garante naturalidade. | Depende das vozes instaladas/baixadas no aparelho. | Pode funcionar localmente/offline. O plugin nativo atual não dá uma sequência universal e precisa de eventos por palavra. | Sem cobrança por chamada da aplicação na maioria dos cenários, mas depende do aparelho/serviço do sistema. | Fallback e acessibilidade. Não deve ser a voz padrão pretendida para as aulas premium sem teste de qualidade. |

### Recomendação objetiva

**Primeiro teste: ElevenLabs.** Comparar Eleven v4 (mais expressivo segundo o fornecedor) com Multilingual v2 (suporte pt-BR explicitamente documentado). Usar o áudio final em Forced Alignment para produzir marcas temporais. O alinhamento é uma chamada adicional paga, então confirmar sua tarifa antes de escalar. A escolha final depende do áudio real, não do rótulo de modelo.

**Alternativa para aproveitar a integração atual: Gemini 3.8 Flash TTS.** O projeto já usa esse modelo, direciona estilo pelo campo speech_metadata e permite selecionar voz. A solução mais segura é gerá-lo na etapa editorial, armazenar o arquivo e alinhá-lo depois. Flash-Lite deve entrar no teste se reduzir custo/latência sem piorar a naturalidade.

**Candidato adicional para marcadores no roteiro:** Google Cloud TTS com voz pt-BR e timepoints SSML. A API documenta SSML mark/SSML_MARK, mas precisa-se validar os recursos na combinação exata de voz/engine; a existência de timepoints no produto Cloud não garante suporte por todos os modelos.

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
- O player atualizado não usa alinhamento temporal por palavra. O destaque de palavra deriva de beatElapsed sobre a duração estimada do beat; na camada voice.ts, o callback onBoundary do método speak também usa proporção de caracteres pelo tempo total do clipe. Esses dois recursos continuam estimativas e não representam pausas nem duração desigual das palavras.
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

A versão atual na branch-base diferencia direção na reta, soma com positivo, soma com negativo, sinais iguais, sinais diferentes, subtração como soma do oposto, subtração de número negativo e resumo. Os estados mostram saltos sucessivos de reta; o teste novo verifica que as falas avançam de um estado para o seguinte. Os exemplos incluem estados intermediários, passagem pelo zero em 3 + (−5), uso de módulos, sinal do maior módulo e resultado zero quando os módulos são iguais.

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
- Roteiros completos: já presentes na branch-base atual por commits de outro colaborador; não foram sobrescritos nesta entrega. Teste acrescentado: sim.
- Testes executados nesta sessão: **nenhum**. O clone local falhou por indisponibilidade de resolução de rede para GitHub, portanto não consegui instalar dependências nem executar Vitest, TypeScript, build ou Playwright.
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
- ElevenLabs Forced Alignment: https://elevenlabs.io/docs/pt/overview/capabilities/forced-alignment
- ElevenLabs preço da API: https://elevenlabs.io/pricing/api
- Microsoft Azure Speech — línguas e vozes: https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/language-support
- OpenAI Speech API: https://developers.openai.com/api/docs/guides/text-to-speech
- OpenAI API deprecation notices: https://developers.openai.com/api/docs/deprecations

Preços e termos podem mudar e dependem de modelo, região, tier, câmbio, tributos, volume e condições contratuais. Reconfirmar no console do fornecedor antes de aprovar orçamento de produção.
