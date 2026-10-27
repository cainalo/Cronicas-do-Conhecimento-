# Revisão independente — timeline narrada e adaptador TTS

**Atualizada em:** 27/10/2026, 03:00 UTC
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
- src/test/elevenlabs-alignment-adapter.test.ts — validação da resposta e teste de integração com o helper temporal.
- src/test/narration-timeline-edgecases.test.ts — Unicode, timestamps negativos/não finitos/invertidos, monotonicidade e pausas entre cues.
- src/test/narrated-content-quality.test.ts — estrutura básica e cobertura de conceitos dos roteiros atuais.
- src/test/review-slides-integrity.test.ts — verifica se o texto normalizado de todas as seções, definições e referências de todos os capítulos pode ser reconstruído a partir dos chunks e das lâminas geradas; também valida existência, ordem e texto efetivo das lâminas de glossário e referências produzidas por buildReviewSlides.

Não alterei a implementação temporal compartilhada, o player, a camada de voz, os roteiros nem os slides.

**Testes do PR #9 não executados nesta sessão.** O clone local não funcionou devido a falha de resolução de rede para GitHub, e não há verificações de CI associadas ao head deste PR; portanto, não afirmo que os testes novos deste PR passem. Como evidência separada da branch-base, o CI do commit aca7985 executou 39 arquivos e 2.425 testes, mas falhou no build TypeScript em src/test/narrated-editorial.test.ts:85 por narrowing do tipo Visual. O commit ebc8947 corrigiu esse erro guardando o discriminante em const visual = scene.visual. A execução #40440317764 para o commit 09a6ef0b concluiu com sucesso: 39 arquivos/2.425 testes, build web, verificação de layout Playwright, compilação do APK e publicação do site. Link: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40440317764. Depois, a branch-base avançou para dccb743f (ajustes de tela cheia, controle de legendas e timeout); a execução #40440849594 falhou com 2 testes de legenda. O commit 4809a93 atualizou parte dessas expectativas, mas a execução #40441044010 também mostrou três falhas: a verificação de layout ainda esperava maxChars = 430 embora ReviewSlides.tsx agora use 250; uma asserção exige a fala inteira apesar da janela de até oito palavras; outra espera uma frase que não aparece na janela inicial. Essas falhas foram comunicadas à sessão do player/slides. O commit cfceb18 (base de trabalho mais recente da execução que concluímos inspecionar) ainda teve 2 falhas no `npm test`: o teste de legenda contou a span de reticências `aria-hidden=true` como se fosse uma palavra (9 nós para um máximo de 8 palavras) e outra expectativa exigiu uma frase completa que não estava na janela inicial da legenda. Depois disso, foram publicados novos commits para ajustar testes, portal de viewport e liberação dos controles; as execuções foram canceladas enquanto novos pushes chegavam. Na última consulta, a execução #40441617532 para o commit 2dc4607e estava na fila, sem resultado. Histórico: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40440849594 e https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40441307848; execução pendente: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40441617532. Os testes do PR #9 continuam não executados e não estão incluídos nesses CI da branch-base. O relatório classifica a divergência do script como pré-condição para integração futura, não como defeito do player atual. O teste de integridade foi ampliado para verificar também as lâminas geradas de glossário e referências, como solicitado na revisão.

## 4. Coordenação entre sessões

Esta revisão complementa o documento mais amplo já presente na branch de trabalho: docs/ADENDO_REVISAO_TECNICA_VOZ_E_TESTES_2026-10-26.md. Esse adendo já documenta pesquisa de provedores, auditoria dos slides, fontes históricas e licenças de imagens. Este arquivo fica focado nos achados de integração da timeline e no adaptador do provedor para reduzir duplicação documental.

## 5. Fontes oficiais consultadas

- ElevenLabs Forced Alignment — formatos, idiomas, custos relativos e limites: https://elevenlabs.io/docs/pt/overview/capabilities/forced-alignment
- ElevenLabs Create Forced Alignment API — formulário de entrada e resposta characters/words/loss: https://elevenlabs.io/docs/api-reference/forced-alignment/create
- Gemini API — TTS, speech_metadata, formatos de saída e limitações: https://ai.google.dev/gemini-api/docs/speech-generation
- Google Cloud Chirp 3 HD — idiomas pt-BR e subconjunto SSML suportado: https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd
- Google Gemini API keys — orientação de segurança para clientes web/móveis: https://ai.google.dev/gemini-api/docs/api-key

Estas referências documentam capacidades de API, não qualidade auditiva percebida. Os custos devem ser confirmados no console antes de aprovar orçamento de produção.