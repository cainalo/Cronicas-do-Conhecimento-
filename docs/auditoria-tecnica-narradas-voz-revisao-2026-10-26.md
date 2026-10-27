# Revisão independente — timeline narrada e adaptador TTS

**Atualizada em:** 27/10/2026, 03:05 UTC
**Branch revisada:** claude/cronicas-conhecimento-estudos-jgbofo
**Branch desta contribuição:** gpt/narrated-timeline-review-2026-10-27
**Escopo:** revisão do código real, testes e integração de alinhamento. Não altera Narrated.tsx, ReviewSlides.tsx, voice.ts nem narration-timeline.ts, para evitar conflito com as outras sessões.

## 1. Conclusões prioritárias

### Pré-condição para integração futura — unificar o texto canônico

A análise distingue a base que o revisor viu do topo posterior. No base SHA 07f6e849 (base do PR #9 durante a revisão), Narrated.tsx e buildNarrationScript usavam duas quebras de linha entre cada beat; ali, a divergência não existia e o comentário automático está correto para aquele snapshot. Depois, o commit a384e47 mudou Narrated.tsx para juntar beats da mesma cena com espaço e separar cenas com duas quebras de linha, mas o helper manteve o separador entre cada beat. Isso **não é um defeito do player atual**, pois Narrated.tsx ainda não consome os cues do helper; é uma pré-condição de integração para que offsets futuros não sejam associados às falas erradas.

**Recomendação:** antes de integrar timestamps, use buildNarrationScript(lesson) como fonte única do texto enviado ao TTS e dos offsets de cada beat. Isso permite manter a pausa intra-cena intencional sem duplicar a regra em React. Alternativamente, atualize o helper e o teste de contrato para reproduzir exatamente o script novo do player. Compare os textos completos byte a byte antes de consumir os cues.

### P1 — o relógio da faixa é real, mas a troca de cena segue estimada

O caminho Gemini atual gera uma faixa contínua e o player utiliza audio.duration/currentTime para duração total e seek. Entretanto, a mudança de beat ainda é calculada com cueDurationMs/trackDurations, depois de projetar a posição da mídia sobre a soma das durações estimadas. Esse cálculo não é alinhamento real; vírgulas, nomes, fórmulas, pronúncia, silêncios e pausas alteram o tempo de fala.

O helper temporal já existente produz cues por beat e palavra a partir de timestamps de caracteres. Ainda não é consumido por Narrated.tsx no snapshot observado. Depois de unificar o script, a integração deve consultar cueAtTime(cues, audio.currentTime * 1000) para alterar cena/beat e inserir visuais. O tempo total da barra e o seek continuam usando audio.duration; o helper calcula durationMs pelo último caractere alinhado, o que pode omitir silêncio ao final da faixa.

### P1 — formato de resposta do Forced Alignment não é o contrato interno

A documentação oficial da ElevenLabs descreve POST /v1/forced-alignment com arquivo de áudio e transcrição, retornando characters como objetos com text/start/end, uma lista de words e loss. O helper do projeto espera caracteres e timestamps em três arrays paralelos. A implementação adicionada nesta contribuição, src/lib/elevenlabs-alignment-adapter.ts, faz essa conversão sem chamar a API nem armazenar segredo; valida o texto exato, contagem de pontos de código Unicode, timestamps e monotonicidade.

O teste src/test/elevenlabs-alignment-adapter.test.ts cobre acentos/emoji, espaços/pontuação, payload inválido, mismatch, timestamps e integração entre o adaptador e buildAlignedNarrationTimeline. Fixtures sintéticas validam a transformação dos dados, mas não comprovam a precisão de uma faixa de áudio real.

### P1 — segurança e produção

Não coloque a chave do provedor em código React/Capacitor nem use uma credencial compartilhada no cliente. A preferência experimental de chave própria do usuário é uma decisão separada (BYOK) e precisa ser rotulada como tal. Para áudio de catálogo, prefira gerar e alinhar em um processo confiável, guardar assets/manifests versionados e servir os arquivos prontos ao cliente.

## 2. Decisão técnica para voz

**Primeiro teste recomendado:** ElevenLabs TTS com Forced Alignment, comparando Eleven v4 com Multilingual v2. A documentação de alinhamento lista português do Brasil/Portugal e informa que o custo segue a tarifa Speech-to-Text. O endpoint retorna timestamps por caractere e palavra, adequados para alimentar o helper do projeto. A naturalidade e a pronúncia final devem ser avaliadas ouvindo amostras em pt-BR; não foi gerado nem ouvido áudio nesta sessão.

**Alternativa incremental:** manter Gemini 3.8 Flash TTS, que já está integrado e permite orientar estilo, sotaque, ritmo e tom via speech_metadata. A documentação TTS descreve entrada textual e saída de áudio; não oferece, nesta resposta, timestamps por palavra. Portanto, combinar Gemini com alinhamento pós-geração ou manter o sincronismo visual explicitamente marcado como estimado.

**Google Cloud Chirp 3 HD:** a documentação atual lista pt-BR, mas a lista de SSML compatível não inclui a tag mark. Não tratá-lo como fonte autossuficiente de cues temporais; usar um alinhador separado se a voz for escolhida pela qualidade.

## 3. Testes e situação real

Arquivos novos nesta contribuição:
- src/lib/elevenlabs-alignment-adapter.ts — adaptador puro do payload oficial para CharacterTimeAlignment.
- src/test/elevenlabs-alignment-adapter.test.ts — validação da resposta, timings e integração com o helper temporal.
- src/test/narration-timeline-edgecases.test.ts — Unicode, timestamps inválidos, monotonicidade e pausas entre cues.
- src/test/narrated-content-quality.test.ts — estrutura básica e cobertura de conceitos dos roteiros atuais.
- src/test/review-slides-integrity.test.ts — verifica reconstrução do texto normalizado das seções e confere existência, ordem e conteúdo das lâminas geradas de seção, glossário e referências.

Não alterei a implementação temporal compartilhada, o player, a camada de voz, os roteiros nem os slides.

**Testes do PR #9 não executados nesta sessão.** O clone local falhou por erro de resolução de rede para GitHub, e não existe uma execução de CI para o head deste PR; não afirmo que os testes novos passem.

### Evidência de CI da branch-base (não inclui os arquivos ainda não mesclados deste PR)

- A execução #40440317764 no commit 09a6ef0b concluiu com sucesso: 39 arquivos / 2.425 testes, build web, Playwright de layout, compilação do APK e publicação do site. Link: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40440317764.
- A execução #40440849594 no commit dccb743f falhou em duas expectativas antigas que requeriam a fala inteira na legenda; a nova legenda mostra uma janela móvel de até oito palavras. Link: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40440849594.
- A execução #40441307848 no commit cfceb18 também falhou em duas verificações da legenda: uma contou a span de reticências (aria-hidden) como palavra, e a outra esperava uma frase que não estava na janela inicial. Link: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40441307848.
- A execução #40441617532 para o commit 2dc4607e falhou em um teste: 38 arquivos passaram, 2.426 testes passaram e 1 falhou. Em src/test/narrated.test.tsx:101, o teste toca no palco e espera opacity-100, mas os controles continuam opacity-0 / pointer-events-none. O achado foi comunicado à sessão do player. O commit 5e1016d3 acrescentou onClick explícito ao palco, mas a execução #40441926666 falhou novamente em narrated.test.tsx:101 (38 arquivos passaram, 2.426 testes passaram e 1 falhou). A causa provável era o click de teste simular pointermove, que podia revelar controles antes de o click os alternar. A outra sessão então publicou d6f5477, limitando a revelação por movimento a eventos do mouse com deslocamento real, e 4ccdc75, usando fireEvent.click no teste para representar o toque sem movimento de mouse. A execução #40442182542 para 8d346ae (transições de cena) estava em andamento e #40442220267 para 4ccdc75 estava na fila na última consulta; nenhum resultado desses testes está confirmado. Histórico: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40441617532, https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40441926666, https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40442182542 e https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40442220267. Como os runs anteriores falharam no npm test, build, E2E e Gradle foram pulados neles.

Essas execuções testam a branch-base em SHAs específicos; não validam os testes acrescentados pelo PR #9. Os resultados também não comprovam o funcionamento em aparelho Android real.

## 4. Coordenação entre sessões

Esta revisão complementa o documento mais amplo já presente na branch de trabalho: docs/ADENDO_REVISAO_TECNICA_VOZ_E_TESTES_2026-10-26.md. Esse adendo já documenta pesquisa de provedores, auditoria dos slides, fontes históricas e licenças de imagens. Este arquivo fica focado nos achados de integração da timeline e no adaptador do provedor para reduzir duplicação documental.

## 5. Fontes oficiais consultadas

- ElevenLabs Forced Alignment — formatos, idiomas, custos relativos e limites: https://elevenlabs.io/docs/pt/overview/capabilities/forced-alignment
- ElevenLabs Create Forced Alignment API — formulário de entrada e resposta characters/words/loss: https://elevenlabs.io/docs/api-reference/forced-alignment/create
- Gemini API — TTS, speech_metadata, formatos de saída e limitações: https://ai.google.dev/gemini-api/docs/speech-generation
- Google Cloud Chirp 3 HD — idiomas pt-BR e subconjunto SSML suportado: https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd
- Google Gemini API keys — orientação de segurança para clientes web/móveis: https://ai.google.dev/gemini-api/docs/api-key

Estas referências documentam capacidades de API, não qualidade auditiva percebida. Os custos devem ser confirmados no console antes de aprovar orçamento de produção.