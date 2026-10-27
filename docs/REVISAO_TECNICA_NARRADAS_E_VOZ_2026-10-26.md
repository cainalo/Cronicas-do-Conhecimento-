# Revisão técnica independente — Crônicas do Conhecimento

**Data:** 26 de outubro de 2026  
**Branch examinada:** claude/cronicas-conhecimento-estudos-jgbofo  
**Escopo:** voz neural, roteiros narrados, origem e truncamento dos slides e sincronização audiovisual.

## 1. Resumo executivo

A branch e os arquivos indicados foram acessados pela API do GitHub. Os dois roteiros de responsabilidade editorial deste trabalho foram ampliados diretamente na branch, em dois commits separados. Não alterei src/pages/Narrated.tsx nem src/pages/ReviewSlides.tsx.

Conclusões principais:

1. A voz deve ser gerada antecipadamente e servida por uma camada de servidor. O projeto já integra Gemini TTS, mas a chave inserida pelo usuário fica em localStorage e a chamada parte do cliente. Não encontrei uma chave fixa hardcoded no arquivo lido; o risco é expor uma chave fornecida pelo usuário no JavaScript distribuído com o app.
2. O player ainda não tem alinhamento real de palavras. A duração estimada por quantidade de palavras é útil como fallback visual, mas não representa o tempo real da fala. A implementação calcula a posição destacada proporcionalmente à duração do áudio e ao comprimento do texto. Isso não deve ser apresentado como sincronização exata.
3. As lâminas recebem o texto das seções de capítulo importadas de Markdown via ?raw. Nos arquivos examinados, não há evidência de um corte global de capítulo antes da construção dos slides. Os riscos mais evidentes estão na transformação do Markdown, na divisão por caracteres e na renderização em uma região de altura limitada sem detecção de overflow.
4. Os roteiros manuais foram enriquecidos com contexto histórico, progressão matemática mais detalhada, estados visuais graduais e encerramentos pedagógicos. Continuam marcados como não revisados editorialmente. Não executei npm test, npm run typecheck ou build: esta sessão teve acesso à API do GitHub, mas não a um checkout local executável.

## 2. Arquivos examinados e mudanças

### Alterados nesta entrega

| Arquivo | Alteração | Commit |
|---|---|---|
| src/content/narrated/prim-computador.ts | Reescrita editorial da história do computador; ampliação contextual das quatro tarefas | [03f68c8](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/03f68c8dd57bf261242ec3e6a21c9741f3ca0c52) |
| src/content/narrated/mat-somar-inteiros.ts | Aula de soma/subtração ampliada, com demonstrações graduais e justificativa das regras | [c0db116](https://github.com/cainalo/Cronicas-do-Conhecimento-/commit/c0db11698b7fd6196f5a3a9eb796abb08d218c84) |

### Lidos, sem alteração

- src/content/narrated/types.ts: tipos de cena, representação visual e falas.
- src/lib/narration.ts: navegação, seleção de estado visual e validação estrutural.
- src/content/index.ts: registro das aulas manuais e geração de narrações a partir de microaulas.
- src/app/voice.ts: provedores de voz, armazenamento da chave, síntese e progresso.
- src/pages/Narrated.tsx: lido apenas para compreender o contrato de conteúdo, a linha do tempo e a reprodução.
- src/pages/ReviewSlides.tsx: lido apenas para auditoria independente.
- src/test/narrated.test.tsx e src/test/review-slides.test.ts: testes atuais consultados.
- src/content/grimoires/primeiros/index.ts, src/content/grimoires/primeiros/cap01-computador/01-o-que-e.md e 04-programacao.md: origem Markdown do capítulo introdutório.
- src/content/grimoires/matematica/index.ts e src/content/micro/mat-inteiros-a.ts e mat-inteiros-b.ts: contexto da série de matemática.

O package.json declara React 18, TypeScript, Vite, Capacitor 7 e @capacitor-community/text-to-speech. Os scripts disponíveis incluem test, typecheck, build e test:e2e.

## 3. Revisão editorial dos roteiros narrados

### 3.1 História do computador

O roteiro atualizado trata a história como uma cadeia de problemas e soluções, não como uma lista de datas isoladas:

- Ábaco: instrumento de representação e apoio ao cálculo, ainda operado por uma pessoa.
- Pascalina: automação mecânica de operações aritméticas.
- Tear de Jacquard: instruções externas por cartões perfurados.
- Máquina Analítica e Ada Lovelace: arquitetura proposta para cálculo programável, contexto do trabalho de Ada e método para números de Bernoulli.
- Hollerith: tabulação de grandes volumes de dados e trajetória empresarial que mais tarde levou à IBM.
- ENIAC e suas programadoras: escala física, válvulas e trabalho técnico de programação.
- Transistor e circuito integrado: miniaturização e evolução eletrônica.
- Intel 4004, computadores pessoais e smartphones: maior integração e popularização.
- Retomada das tarefas de entrada, processamento, memória/armazenamento e saída.

Foram evitadas formulações excessivamente categóricas: a IBM não é tratada como empresa já existente com esse nome em 1890; a Máquina Analítica não é descrita como máquina concluída que executou o programa de Ada; e 2007 não é apresentado como o início absoluto dos celulares computacionais. Recomenda-se revisão histórica humana antes de alterar o estado editorial para revisado.

### 3.2 Soma e subtração de números inteiros

A aula parte de uma situação de saldo, apresenta a reta e explica o movimento para a direita/esquerda. Em seguida percorre:

- Soma de positivo iniciando em −1 e avançando quatro passos.
- Soma de negativo iniciando em 3 e cruzando o zero até −2.
- Módulo como distância até zero.
- Regras de sinais iguais, diferentes e módulos iguais com sinais opostos.
- Subtração como adição do oposto.
- Interpretação de subtrair um número negativo.
- Erro comum de somar módulos quando os sinais são diferentes.
- Resumo e questão final.

Os estados da reta foram definidos passo a passo para que o movimento narrado tenha correspondência visual. A validade estrutural deve ser confirmada pelos testes do repositório.

### 3.3 Arquitetura do conteúdo

O tipo Beat contém texto falado (say) e, opcionalmente, show. O campo show seleciona quantos cartões, marcos ou linhas aparecem; na reta numérica seleciona o estado. O atual validateNarrated verifica falas vazias, índices visuais e números fora da reta, mas não verifica duração, fatos históricos, transições semânticas, pronúncia ou alinhamento temporal. As narrações automáticas criadas por narratedFromMicro precisam de revisão editorial própria; melhorar duas aulas manuais não atualiza automaticamente todas as aulas geradas.

## 4. Pesquisa de voz neural em português brasileiro

Naturalidade é parcialmente subjetiva e depende do modelo, da voz, do texto e da pronúncia de nomes próprios. A documentação confirma capacidades e idiomas, não prova que uma voz será superior para todos os alunos. Antes de escolher em produção, façam um teste cego com o mesmo texto em cada serviço, incluindo nomes, números, siglas, fórmulas e pausas.

### Comparação objetiva

| Serviço | PT-BR e expressividade | Ritmo/pronúncia | Sincronização | Custo e observações |
|---|---|---|---|---|
| **ElevenLabs TTS** | Modelos multilíngues documentam português brasileiro e europeu; vozes diferentes podem produzir resultados muito distintos. | Controles de voz/estabilidade e velocidade variam conforme o modelo. Pronúncia de siglas e matemática deve ser testada. | A API com timestamps devolve alinhamento texto-tempo por caracteres; existe variante de streaming com timestamps. É o caminho mais direto para destacar palavras e coordenar cenas. | Preço público indicativo: cerca de US$ 0,05 por 1.000 caracteres em modelos Flash/Turbo e US$ 0,10 por 1.000 em modelos multilíngues/v3, sujeito ao modelo e plano. O plano gratuito não inclui licença comercial; planos pagos normalmente incluem, sujeitos aos termos aplicáveis. |
| **Gemini 3.8 Flash TTS** | Modelo atual documenta fala expressiva com direção de estilo, fidelidade e estabilidade em conteúdo longo. Já está integrado no app. | As instruções de fala aceitam orientação de estilo, ritmo e pausas; a voz é selecionada por identificador. Testar pronúncia pt-BR. | A API usada no projeto não retorna alinhamento palavra a palavra. Para sincronização precisa, incluir alinhador adicional ou gerar segmentos com suas durações reais. | Até 31/12/2026, preço oficial de áudio é US$ 9 por milhão de tokens de áudio, equivalente a cerca de US$ 0,00225 por 10 segundos; a partir de 01/01/2027, US$ 18/milhão, ou cerca de US$ 0,0045 por 10 segundos. Texto tem custo adicional. Uso gratuito pode ter limites e termos de tratamento de dados diferentes. |
| **Google Cloud Text-to-Speech — Chirp 3 HD** | Há vozes de alta definição; confirmar a voz pt-BR concreta na lista/console e ouvi-la antes da escolha. | Controles variam entre famílias de voz. SSML e parâmetros suportados dependem do engine. | Existem marcas temporais em endpoints e cenários compatíveis; confirmar o suporte para a voz e o endpoint selecionados antes de prometer sincronização por palavra. | Preço público indicativo: US$ 30 por milhão de caracteres para Chirp 3 HD, com até um milhão de caracteres gratuitos conforme a tabela oficial atual. Outras famílias custam menos, mas sua qualidade pode variar. |
| **Amazon Polly** | Documenta vozes pt-BR, incluindo opções neurais; selecionar a voz por teste de áudio. | SSML pode ajudar com pausas e pronúncia; a expressividade depende da voz e do engine. | Speech Marks retornam timestamps em milissegundos e offsets de palavras/frases. O áudio e os metadados são solicitações relacionadas, mas distintas. | Fora do nível gratuito, os preços públicos indicam US$ 16 por milhão de caracteres para voz neural e US$ 30 por milhão para voz generativa. Áudio armazenado pode ser reproduzido sem nova cobrança de síntese. |
| **Azure AI Speech** | Tem vozes neurais pt-BR; escolha depende da lista atual e região. | SSML e opções de SDK fornecem controles estruturados, conforme voz/endpoint. | O SDK oferece eventos de fronteira em cenários compatíveis; para áudio pré-gerado, confirmar persistência dos metadados no endpoint escolhido. | O preço varia por região, voz e nível; usar a calculadora oficial para o volume projetado. Adiciona dependência de Azure, credenciais de serviço e configuração regional. |
| **API de áudio da OpenAI** | Existem APIs públicas de texto-para-fala e instruções de estilo, mas a documentação alerta que as vozes são otimizadas para inglês. Isso não garante qualidade equivalente às vozes conversacionais internas do ChatGPT em português. | Controles dependem do endpoint e do modelo selecionado. | Não presumir timestamps alinhados sem suporte explícito no endpoint/modelo. | É uma API separada da voz conversacional dentro do produto ChatGPT. Verificar modelo, preço, limites e termos atuais na integração. |

### Recomendação

**Principal: ElevenLabs com áudio pré-gerado e alinhamento temporal.** A sincronização é requisito central, não detalhe cosmético. A API de timestamps reduz a necessidade de inferir em que palavra a narração está e permite associar palavras e frases aos estados visuais. A escolha final depende de teste auditivo pt-BR e de custos observados no uso real.

**Alternativa: Gemini 3.8 Flash TTS.** A integração existente, as instruções expressivas e o custo por tempo de áudio são vantagens. Se o projeto mantiver Gemini, a primeira versão deve sincronizar cenas/falas com durações medidas do áudio. Não usar o destaque proporcional de caracteres como se fosse marca temporal verdadeira. Para sincronização palavra a palavra, incluir uma etapa adicional de alinhamento ou validar outro método.

**Não escolher apenas pelo demo do fornecedor.** Gerar uma amostra de 60–90 segundos com: Ada Lovelace; ENIAC; CPU; RAM; pt-BR; ano 1843; “menos quatro mais nove”; “seis menos menos dois”; vírgulas, dois-pontos e frases longas. Avaliar naturalidade, sotaque brasileiro, pronúncia, pausas, leitura de símbolos e consistência entre parágrafos.

## 5. Arquitetura recomendada para voz

### Produção: geração antecipada, segredo no servidor e cache

1. Um script administrativo gera o áudio do roteiro aprovado, durante a publicação/construção do conteúdo, em vez de gerar a cada reprodução do aluno.
2. Armazenar áudio num bucket (por exemplo, Supabase Storage) e um JSON de metadados com versão de texto, modelo, voz, duração real e marcas temporais.
3. A aplicação React/Capacitor recebe URLs de áudio e metadados. Se houver geração sob demanda, uma Edge Function ou backend autenticado chama o fornecedor com o segredo em variável de ambiente/secret manager.
4. Aplicar autenticação, limites por usuário, limite de caracteres, alertas de orçamento, logs cuidadosos e cache por hash do texto + versão do conteúdo + modelo + voz + estilo.
5. Separar chaves de desenvolvimento e produção; revogar e rotacionar credenciais que possam ter sido expostas.

O projeto atual guarda a chave inserida pelo usuário em localStorage e chama Gemini diretamente do cliente. Isso não significa que exista uma chave fixa commitada no repositório, mas não é um desenho apropriado para uma chave compartilhada do produto: qualquer segredo disponível ao JavaScript do app pode ser extraído. Se o modo “traga sua própria chave” for mantido para teste, explicar esse risco e considerar mantê-la apenas em memória durante a sessão. Para o produto, preferir proxy do servidor.

### Contrato de metadados sugerido

- lessonId: identificador da aula.
- contentVersion: hash/versão do roteiro.
- provider, model e voice: fornecedor e configuração.
- audioUrl e durationMs: arquivo e duração real.
- cues: lista de sceneId, beatIndex, startMs e endMs.
- wordCues opcional: início/fim em milissegundos e offsets de texto para realce palavra a palavra.

A linha do tempo deve derivar de audio.currentTime × 1000, não de uma estimativa da velocidade de leitura. Em cada evento de tempo, encontrar a fala ativa pelo intervalo startMs ≤ currentMs < endMs, definir o estado visual e destacar palavras somente quando houver wordCues. Na pausa, manter o instante; ao retomar, continuar o mesmo áudio; ao buscar uma posição, mover currentTime e reconstruir a cena a partir dos metadados.

Para provedores com alinhamento por caracteres, converter os limites de cada fala em timestamps, mantendo o alinhamento em cache junto do áudio. Se o provedor normalizar texto, usar offsets normalizados quando disponíveis e testar acentos, pontuação e símbolos. Para Gemini sem alinhamento, gerar segmentos por fala e usar a duração efetivamente carregada de cada áudio como intervalo real; isso permite sincronização por fala, mas não por palavra, e pode deixar a edição sonora mais segmentada.

### Web e Android

- Preferir arquivos prontos em formato suportado por navegador e Android WebView; validar duração, seeking, carregamento lento, interrupção e retorno ao app.
- Carregar áudio e metadados antes de iniciar, com estado de carregamento que não pisque o palco.
- Evitar pedido TTS por frase durante o estudo: aumenta latência, custo, variação vocal e risco de falha de rede.
- Manter um palco persistente e alterar apenas os elementos cujo estado mudou.
- Derivar estado visual do relógio do áudio, não de timers independentes.
- Preservar transcrição integral e acessível sem áudio.

## 6. Auditoria independente dos slides de revisão

### Origem e fluxo

O capítulo cap.prim.01 é construído em src/content/grimoires/primeiros/index.ts, importando Markdown por ?raw. buildReviewSlides(chapter) percorre chapter.sections, cria lâminas por splitReviewChunks(section.body) e adiciona glossário, referências e encerramento. Nos arquivos examinados, não encontrei sinal de um corte global do capítulo antes da construção dos slides.

### Riscos concretos

1. **Texto escondido na renderização (alto):** SlideCard e o texto são renderizados dentro de uma área de altura limitada pela viewport. A lâmina usa overflow-hidden e não há medição de scrollHeight > clientHeight. Título, corpo ou controles podem consumir mais espaço do que o disponível, deixando texto invisível embora slide.body esteja completo.
2. **Divisão por expressão regular (alto):** splitReviewChunks identifica frases pela pontuação final. Abreviações, decimais, URLs, versões de software e iniciais podem gerar fronteiras ruins. Quando uma frase excede o limite de 430 caracteres, o algoritmo a divide por espaços; preserva palavras, mas pode separar exemplo, justificativa e conclusão.
3. **Conversão do Markdown (médio):** plainReviewText transforma listas e algumas tabelas e remove sintaxe inline, mas não usa uma árvore sintática completa. GFM menos comum, código, blockquotes, HTML e formatos de tabela podem perder relações. O texto visível de links permanece, mas o destino do link pode desaparecer.
4. **Caracteres não equivalem à altura (alto):** 430 caracteres não têm a mesma altura em toda fonte, largura e viewport. Fórmulas, palavras longas, fonte aumentada e celulares baixos podem fazer a lâmina exceder o espaço mesmo com o fragmento dentro do limite.
5. **Capa e ilustrações (visual):** existe composição de capa separada e paleta chapada por tipo de lâmina. A distribuição da ilustração deve ser validada visualmente. A seleção automática de imagens para Ada e ENIAC não substitui a revisão da licença, autoria, atribuição e correspondência semântica.
6. **Controles sobrepostos:** cabeçalho e rodapé usam posicionamento absoluto. O conteúdo precisa respeitar as áreas ocupadas pelos controles e safe areas; ocultar rolagem do documento não garante que a lâmina caiba.

### Recomendações para a outra sessão (não aplicadas por mim)

- Preservar o Markdown original até parsing por AST (por exemplo, remark/unified) e converter em blocos didáticos: parágrafo, lista, tabela, código e exemplo. Não achatar tudo para uma string antes de dividir.
- Dividir por bloco/sentença usando tokenização ou regras testadas com abreviações. Fragmentar uma sentença longa apenas como último recurso; quando necessário, criar novas lâminas e manter a sequência lógica.
- Dimensionar por estimativa de linhas/altura e medir após a renderização. Se o conteúdo exceder o espaço, criar outra lâmina. Nunca esconder texto com line-clamp, max-height ou overflow-hidden sem detecção explícita.
- Acrescentar integridade por seção: reconstruir o texto normalizado das lâminas e comparar com a fonte em ordem, sem omissões ou duplicações; se houver conversão de Markdown, usar contagem de palavras/hash como controle adicional.
- Não reduzir a tipografia a ponto de prejudicar leitura. A ilustração pode encolher ou mudar de posição dentro de limites, mas não deve consumir a área necessária ao corpo.
- Definir tokens editoriais consistentes para cores saturadas, contraste, tipografia e margens.
- Para fotos, registrar URL da página do arquivo, autor, licença e atribuição completa. Não depender só de um URL redirecionador da Wikimedia.

### Testes que faltam

O teste atual src/test/review-slides.test.ts verifica presença de capa/seções/glossário/fecho, um caso artificial de frase longa e navegação por gesto. Não comprova que todos os capítulos foram preservados nem que existe overflow real no DOM.

- Integridade fonte → lâminas → texto reconstruído para todos os capítulos e para parágrafos, listas, tabelas e código.
- Casos com “Sr.”, “por ex.”, “1.5”, “v1.2.3”, URLs, siglas, fórmulas, textos sem pontuação, Markdown GFM e frases longas.
- Medição real: scrollHeight ≤ clientHeight para corpo e título, em fonte normal e ampliada; excedeu, gerar outra lâmina.
- Viewports 360×640, 360×800, Galaxy A14 com resolução/barras reais, tablet e desktop.
- Screenshot automático por lâmina e revisão manual de capa, hierarquia, contraste e pertinência visual.
- Controles: troca de capítulo, gesto horizontal, foco/teclado, rotação, retorno do background e safe areas.

## 7. Sincronização: critérios verificáveis

| Nível | Implementação | Precisão |
|---|---|---|
| Fallback nativo | readingMs(text) estima transição com base no texto | Aproximação de leitura, não tempo de fala |
| Sincronização por fala | Áudio pré-gerado por fala/cena, duração do arquivo e metadados cumulativos | Sincroniza limites de falas, não palavras |
| Sincronização por palavra | Provedor retorna alinhamento tempo/texto, ou aplicação usa forced alignment | Permite realce de palavra/eventos, com validação no áudio final |
| Marcas editoriais | Timepoints ou marcas explícitas de pausa/eventos | Adequadas a transições de cena, conforme suporte do endpoint |

Não converter uma estimativa proporcional de caracteres em alegação de sincronização de palavra. Eventos de fronteira nativos podem variar entre dispositivos; quando não são consistentes, rotular o modo como aproximado.

## 8. Matriz de aceitação e situação dos testes

| Caso | Como verificar | Situação nesta entrega |
|---|---|---|
| Compilação TypeScript e Vite | npm run typecheck; npm run build | **Não executado** nesta sessão |
| Validade estrutural das narrações | npm test -- src/test/narrated.test.tsx ou suíte completa | **Não executado**; revisão por inspeção, testes pendentes |
| Integridade dos slides | Teste de reconstrução de todos os capítulos | Cobertura proposta; não executada |
| Overflow em viewport | Playwright com métricas DOM e screenshots | **Não executado** |
| Android/Galaxy A14 | APK real, tela cheia, pausa/retomada/busca, barras do sistema e áudio | **Não executado**; exige emulador ou aparelho |
| Naturalidade pt-BR | Teste cego com a mesma amostra em todos os provedores | **Não executado**; comparação baseada em recursos documentados |
| Sincronização | Comparar cues com tempo real do arquivo de áudio | Arquitetura proposta; **não implementada** |

## 9. Referências oficiais

### Voz e preços
- ElevenLabs — modelos e idiomas: https://elevenlabs.io/docs/overview/capabilities/text-to-speech
- ElevenLabs — API com timestamps/alinhamento: https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps
- ElevenLabs — streaming com timestamps: https://elevenlabs.io/docs/api-reference/text-to-speech/stream-with-timestamps
- ElevenLabs — preços: https://elevenlabs.io/pricing
- ElevenLabs — licença comercial e limites do plano gratuito: https://elevenlabs.io/docs/pt/help-center/legal/can-i-publish-the-content-i-generate-on-the-platform
- Google AI — síntese de fala Gemini: https://ai.google.dev/gemini-api/docs/speech-generation
- Google AI — preços da Gemini API: https://ai.google.dev/gemini-api/docs/pricing
- Google Cloud Text-to-Speech — preços: https://cloud.google.com/text-to-speech/pricing
- Google Cloud Text-to-Speech — timepoints SSML: https://cloud.google.com/text-to-speech/docs/ssml#timepoints
- Amazon Polly — lista de vozes: https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
- Amazon Polly — Speech Marks: https://docs.aws.amazon.com/polly/latest/dg/speechmarks.html
- Amazon Polly — saída de Speech Marks: https://docs.aws.amazon.com/en_en/polly/latest/dg/output.html
- Amazon Polly — preços: https://aws.amazon.com/pt/polly/pricing/
- Azure AI Speech — texto para fala: https://learn.microsoft.com/azure/ai-services/speech-service/text-to-speech
- Azure AI Speech — preços: https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/
- OpenAI — guia de texto para fala por API: https://developers.openai.com/api/docs/guides/text-to-speech

### Segurança
- Google AI — como proteger chaves da Gemini API: https://ai.google.dev/gemini-api/docs/api-key

### Código
- Branch examinada: https://github.com/cainalo/Cronicas-do-Conhecimento-/tree/claude/cronicas-conhecimento-estudos-jgbofo
- História do computador atualizada: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/content/narrated/prim-computador.ts
- Soma e subtração atualizada: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/content/narrated/mat-somar-inteiros.ts
- Slides lidos, não alterados: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/pages/ReviewSlides.tsx
- Voz lida, não alterada: https://github.com/cainalo/Cronicas-do-Conhecimento-/blob/claude/cronicas-conhecimento-estudos-jgbofo/src/app/voice.ts

---

**Encaminhamento à sessão paralela:** os dois arquivos de conteúdo foram alterados e precisam de typecheck/testes na branch atual. A implementação do player e a página de slides devem continuar sob responsabilidade da outra sessão; este relatório documenta causas prováveis, decisões de voz e critérios de integração sem sobrescrever o trabalho paralelo.
