# Revisão independente — timeline narrada e adaptador TTS

**Atualizada em:** 27/10/2026, 02:44 UTC
**Branch revisada:** claude/cronicas-conhecimento-estudos-jgbofo
**Branch desta contribuição:** gpt/narrated-timeline-review-2026-10-27
**Escopo:** revisão do código real, testes e integração de alinhamento. Não altera Narrated.tsx, ReviewSlides.tsx, voice.ts nem narration-timeline.ts, para evitar conflito com as outras sessões.

## 1. Conclusões prioritárias

### P0 — unificar o texto canônico antes de integrar os timestamps

No snapshot mais recente, src/pages/Narrated.tsx monta a faixa Gemini unindo falas por espaço dentro da mesma cena e separando cenas com duas quebras de linha. Já src/lib/narration-timeline.ts (buildNarrationScript) coloca duas quebras de linha entre todos os beats. O helper rejeita texto divergente de propósito; portanto, a integração falhará ou os offsets não corresponderão às falas posteriores se os dois caminhos continuarem diferentes.

**Recomendação:** buildNarrationScript deve ser a única fonte do texto enviado ao TTS e do mapeamento de offsets; o player não deve reconstruir nem normalizar o texto separadamente. Alternativamente, ajuste o helper para reproduzir exatamente o formato que o player realmente envia e atualize o teste do contrato do script. Não consumir cues até este contrato ser unificado.

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

Não alterei a implementação temporal compartilhada, o player, a camada de voz, os roteiros nem os slides.

**Testes do PR #9 não executados nesta sessão.** O clone local não funcionou devido a falha de resolução de rede para GitHub, e não há verificações de CI associadas ao head deste PR; portanto, não afirmo que os testes adicionais passem. Como evidência separada da branch-base, o CI do commit aca7985 executou 39 arquivos e 2.425 testes com sucesso, mas o build falhou em src/test/narrated-editorial.test.ts:85 por narrowing do tipo Visual. O commit ebc8947 corrigiu esse erro guardando o discriminante em const visual = scene.visual. A nova execução de publicação #40440159102, no commit a384e47, está em andamento neste momento: https://github.com/cainalo/Cronicas-do-Conhecimento-/actions/runs/40440159102. Ainda não há resultado final dessa execução; isso não valida o build nem os testes adicionais deste PR.

## 4. Coordenação entre sessões

Esta revisão complementa o documento mais amplo já presente na branch de trabalho: docs/ADENDO_REVISAO_TECNICA_VOZ_E_TESTES_2026-10-26.md. Esse adendo já documenta pesquisa de provedores, auditoria dos slides, fontes históricas e licenças de imagens. Este arquivo fica focado nos achados de integração da timeline e no adaptador do provedor para reduzir duplicação documental.

## 5. Fontes oficiais consultadas

- ElevenLabs Forced Alignment — formatos, idiomas, custos relativos e limites: https://elevenlabs.io/docs/pt/overview/capabilities/forced-alignment
- ElevenLabs Create Forced Alignment API — formulário de entrada e resposta characters/words/loss: https://elevenlabs.io/docs/api-reference/forced-alignment/create
- Gemini API — TTS, speech_metadata, formatos de saída e limitações: https://ai.google.dev/gemini-api/docs/speech-generation
- Google Cloud Chirp 3 HD — idiomas pt-BR e subconjunto SSML suportado: https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd
- Google Gemini API keys — orientação de segurança para clientes web/móveis: https://ai.google.dev/gemini-api/docs/api-key

Estas referências documentam capacidades de API, não qualidade auditiva percebida. Os custos devem ser confirmados no console antes de aprovar orçamento de produção.