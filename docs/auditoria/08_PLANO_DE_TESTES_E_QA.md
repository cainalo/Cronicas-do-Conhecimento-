# Plano de testes, QA e critérios de aceite

## O que a documentação atual já relata

`docs/TESTING.md` registra 715/715 testes Vitest em 23/10/2026, build concluído e capturas Playwright em 390×844 e 1280×800. Também diz que login/cadastro/recuperação, sincronização HTTP com Supabase e teste offline em aparelho não foram verificados ponta a ponta. Esses dados devem ser reproduzidos na branch atual antes de qualquer mudança.

## Lacunas do conjunto de testes

- O teste de conteúdo valida forma e quantidade de páginas, não se há uma checagem logo depois de cada novo conceito.
- As regras de diversidade disponíveis no motor de missão não garantem diversidade na prática comum.
- Não há evidência mostrada de teste que saia da missão ou de uma sessão em Lição, Prática, Revisão, Flashcards ou Rodada relâmpago e retome exatamente o mesmo passo.
- Não há teste que compare o destino de todos os botões de continuação.
- A presença de `overflow-y-auto` contradiz o requisito do livro sem rolagem; é necessário testar o comportamento real, não só a ausência da barra visual.
- Capturas em duas resoluções ajudam, mas não garantem tablet, viewport baixo, zoom, teclado ou leitor de tela.

## Pirâmide de validação

### A. Testes unitários (rápidos)

- transição de etapa e cálculo do checkpoint;
- migração/versionamento do checkpoint;
- escolha do destino único de Continuar;
- pontuação e feedback por atividade;
- regras de diversidade da prática normal e do motor de missão;
- validação do schema das microetapas e links de mídia;
- paginação de texto, tabelas, listas, código e imagens em várias alturas;
- merge local/remoto, idempotência de conclusão e XP.

### B. Testes de conteúdo

- toda etapa tem objetivo e checagem, salvo exceção explícita;
- checagem pertence ao conceito acabado de ensinar;
- alternativa correta existe e distratores não são duplicados;
- feedback faz sentido para certo/errado;
- conceitos necessários são apresentados antes de cobrar, ou a atividade é marcada como diagnóstico;
- conteúdo oficial/adaptado/autoral tem origem correta;
- cada seção possui status editorial e fonte quando necessário;
- detectores de comprimento atípico, termos não definidos, perguntas iguais e prática repetitiva.

### C. Testes de fluxo/integrados

1. Começar como visitante → microetapa → responder → fechar aba → reabrir → retomar mesma microetapa.
2. Responder errado → abrir pista → resolver equivalente → seguir para próximo conceito.
3. Atualizar a página durante a animação de virada; não perder o checkpoint nem ficar em estado impossível.
4. Sair de cada etapa da missão SQL; reabrir e continuar no mesmo passo. Repetir em Lição, Prática, Revisão, Flashcards e Rodada relâmpago.
5. Completar microaula; header, Dashboard, Estudos e plano devem apontar ao mesmo próximo passo.
6. Entrar em conta após estudar como visitante e confirmar fusão sem duplicar conclusão/XP.
7. Começar offline, registrar progresso, ficar online e confirmar sincronização e preservação local.
8. Abrir vídeo indisponível ou sem conexão: fallback funciona e a lição continua utilizável.

### D. Testes visuais e interação

- Playwright com screenshots em 360×740, 390×844, 768×1024, 1024×768 e 1280×800.
- Testar tema noite/dia, duas páginas/uma página, fonte normal/ampliada e reduzir movimento.
- Verificar overflow horizontal, conteúdo cortado, rodapé sobre botão, layout desalinhado, tabela minúscula, botões fora da grade e rolagem aninhada.
- Validar foco visível, ordem do Tab, Escape em diálogo, labels, `aria-live` em feedback e botões com nomes acessíveis.
- Comparar capturas antes/depois; documentar qualquer mudança intencional.

### E. Integração externa e release

- `npm ci`, `npm test`, `npm run build` devem passar.
- Realizar smoke test do Supabase Auth/sync em ambiente habilitado.
- Testar APK em aparelho Android real, pelo menos uma vez no início e no release final.
- Testar deep link/refresh nas rotas de produção e fallback SPA.
- Medir tamanho raw/gzip de cada chunk. Definir orçamento, por exemplo, evitar crescimento não justificado do chunk inicial; usar a baseline real como referência.
- Conferir que a pipeline não publica artefato com testes falhos.

## Critérios objetivos de aceite

- Todos os botões primários “Continuar” resolvem o mesmo checkpoint.
- Em 100% dos fluxos de retomada testados, volta para a etapa e atividade exatas após recarregar.
- Cada microetapa do piloto tem explicação, exemplo ou demonstração pertinente, checagem e feedback específico.
- Errar ativa uma estratégia de reforço; não apenas reenfileira indefinidamente a pergunta sem contexto.
- Nenhuma página do livro exige rolagem vertical dentro do fólio para ver seu conteúdo normal.
- Nenhuma tela aprovada tem overflow horizontal inesperado, botão inacessível ou texto essencial cortado nas resoluções da matriz.
- Testes e build passam; resultados e limitações estão atualizados na documentação.
