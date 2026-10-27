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

