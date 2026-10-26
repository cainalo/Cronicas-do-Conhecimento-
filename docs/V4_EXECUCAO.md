# Pacote complementar v4: execução

Pacote em `Cronicas_Pacote_Complementar_Claude_v4` (ordem em `14_ORDEM_DE_EXECUCAO.txt`). Registro do que foi feito, como foi testado e o que falta, etapa por etapa. Atualizado em 25/10/2026.

## Resumo por etapa

| Etapa | Situação | Onde |
|---|---|---|
| 1. Didática (Matemática e TI) | Feita | 9 aulas `mat.inteiros.1..9` (`content/micro/mat-inteiros-*.ts`), Processos com etapa "computador"; validador de vocabulário em `micro.test.ts`; `docs/REVISAO_DIDATICA.md` |
| 2. Ambiente 2D caminhável | Feita | `/escritorio` (`lib/world.ts`, `content/world/escritorio.ts`, `pages/World.tsx`) |
| 3. Aula narrada e videoaulas | Feita | `/aula-narrada/:id`, `VideoLibrary`; vídeos marcados "a conferir" (YouTube bloqueado na rede desta sessão) |
| 4. Feed curricular | Feita | `/sala` (`lib/feed.ts`, `pages/TeachersRoom.tsx`) |
| 5. Limpeza de identidade | Feita | Sem Reino, Personagem, Diário, prólogo, cena 3D, mascote falante, música medieval e lareira; Hoje reescrita; rotas antigas redirecionam para `/progresso` |
| 6. Sons e Conta | Feita | `/conta` como página de entrada; áreas `/conta/acesso`, `/conta/sincronizacao`, `/conta/aparencia`, `/conta/sons`, `/conta/dados`, `/conta/sobre`, `/conta/tela` (só no app) |
| 7. Reiniciar o progresso | Feita (remoto testado com servidor simulado) | `lib/reset.ts`, `StudyProvider.resetAll`, `pages/settings/Data.tsx`; migrações `20261026000100` e `20261026000200` |
| 8. Modo imersivo Android | Código feito; **sem teste em aparelho** | `MainActivity.java`, `ImmersivePlugin.java`, `app/native.ts` |
| 9. QA visual página a página | Varredura automática feita (ver abaixo) | `scratchpad/pw/qa.cjs` |
| 10. Reauditoria final | Este documento | |

## Etapa 6: sons e Conta

- Ambientes gerados no aparelho (`app/soundscape.ts`): chuva suave, riacho, floresta, ruído marrom, ruído rosa e piano ambiente gerado nota a nota. Nenhuma gravação de música: o pacote exige licença conferida para isso, e não há uma. Todos funcionam sem internet.
- Tudo começa desligado; nada toca ao abrir o app. Ligar um ambiente é um toque e já toca. Volume por ambiente com teto por canal, fade de 1,2 s e limitador. Predefinições reais: Leitura, Foco profundo, Pausa.
- A aula narrada abaixa o ambiente (duck a 25%) enquanto a voz fala.
- A Conta não expõe senha nem "Sair" na entrada. Trocar a senha fica em tela própria, com o campo limpo após cada envio.

## Etapa 7: reinício do progresso

**Como funciona.** A marca `progressResetAt` fica no StudyData e em `profiles.progress_reset_at`. A fusão (`mergeData`) sempre aplica a marca mais recente e descarta os registros anteriores a ela. Isso vale para tudo:
- a sincronização;
- a migração do visitante (cuja marca vale só para os dados do visitante);
- a recuperação pelo IndexedDB, que grava o estado reiniciado na hora e conta a marca como dado.

**O que fica no servidor.** Nada é apagado; o histórico antigo deixa de contar. As migrações são só aditivas: uma coluna nova e a permissão de update nessa coluna. A política RLS continua limitando cada pessoa à própria linha. Advisors de segurança sem alerta novo.

**Chaves locais.** Só são tocadas as chaves de andamento: `cronicas:mundo:*`, `cronicas:cenario:*`, `cronicas:plano:v2:<dono>:*` e `cronicas:plan-snapshots`. No feed (`cronicas:feed:v1`), apenas a posição, as respostas e as marcas de entendi e rever. Nunca há `localStorage.clear()`. Antes do reinício, guarda-se uma cópia em `cronicas:backup:<dono>`.

### Checklist 20 (reinício)

| id | status | evidência |
|---|---|---|
| R01 | ok | Conta → Dados e progresso, botão separado de sair/excluir (`reset.test.tsx`, captura `conta/dados`) |
| R02 | ok | diálogo lista "Volta ao zero" e "Continua como está" (teste e captura 390 px) |
| R03 | ok | teste "cancelar não muda nada" compara o armazenamento byte a byte |
| R04 | ok | teste confirma zerar tentativas, XP, leitura, lições, simulados, cartões, unitLog, progress, story, escritório, caso prático e feed |
| R05 | ok | teste: Continuar volta a `trailUnits()[0]` |
| R06 | ok | ordem e bloqueios vêm do conteúdo, que não é tocado; a trilha recalcula a partir do progresso vazio |
| R07 | ok | feed: posição e respostas zeradas; notas, dúvidas e guardados mantidos (teste) |
| R08 | ok | chaves do escritório e do caso prático removidas (teste) |
| R09 | ok | tema, tamanho, sons e modo imersivo ficam em preferências que o reinício não toca (teste) |
| R10 | ok | sessão e perfil não são tocados (só a coluna da marca) |
| R11 | ok | conteúdo é código; nada é recriado |
| R12 | ok (simulado) | teste com Supabase simulado: snapshot antigo depois do reinício não volta; marca sobe ao perfil; sem linha de perfil, segue pendente. **Não testado contra o servidor real nesta sessão** (sem login de teste) |
| R13 | ok | sem conexão: vale no aparelho, a marca fica pendente e a tela diz que o servidor ainda não confirmou |
| R14 | ok | teste recarrega do armazenamento |
| R15 | ok | caixa de confirmação obrigatória, botão final desabilitado sem ela, Cancelar focado de início, Esc fecha |

## Etapa 8: modo imersivo

O Capacitor instalado é o 7, que não tem a API System Bars (ela é do 8), e não houve migração de versão. A solução é nativa e pequena:
- **Escondendo as barras:** `WindowInsetsControllerCompat.hide(systemBars())` com `BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE`.
- **Quando reaplica:** ao criar a tela, ao retomar o app e ao recuperar o foco.
- **Onde fica a escolha:** em SharedPreferences, e por isso vale já na abertura.
- **Ajuste:** "Tela", na Conta, aparece só no app.

Recorte de câmera fica no modo padrão do Android: o conteúdo não vai para baixo da câmera.

### Checklist 23 (modo imersivo)

Não há aparelho físico nem emulador nesta sessão. **Nenhum item de comportamento foi verificado em Android.** O CI compila o APK com o código novo; a validação no Galaxy A14 5G fica pendente com o usuário: abertura a frio, deslize de cima e de baixo, CTA com barras visíveis, três botões e gestos, teclado, rotação, voltar do segundo plano e desligar/ligar o ajuste. No navegador, a tela Tela explica que o navegador controla as barras.

## Etapa 9: QA visual

Varredura automática (Playwright, build de produção):
- **Cobertura:** 36 rotas, em 360×760, 390×844 e 1280×900, nos temas claro e escuro. São 216 combinações: 162 na primeira rodada e 54 na segunda, com os endereços corrigidos.
- **O que mede:** largura da página maior que a tela, elemento saindo pela direita e erro de JavaScript.
- **Resultado:** 216 de 216 sem problema.

Revisão humana das capturas (por mim, não pelo usuário):
- **Vistas:** Hoje, Trilha, Conta (todas as áreas), diálogo de reinício e a aula 1 de Matemática.
- **Corrigido:** o diálogo de reinício ficava atrás do cabeçalho; passou a abrir por portal.
- **Corrigido:** na aula, o ícone ficava solto ao lado da fala; virou nota com filete.

Ainda não houve QA página a página com o usuário nem em aparelho físico. A matriz 18 e o relatório 21 do pacote não foram preenchidos linha a linha; esta seção os substitui de forma resumida.

CI: a execução 72 (commit `5dbd6be`) compilou o site e o APK com o `MainActivity` novo, e terminou com sucesso.
