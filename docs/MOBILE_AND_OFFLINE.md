# Mobile, app nativo e offline

## Decisão (17/10/2026)
O usuário pediu **app nativo (Capacitor), não PWA**, com opção de download. O PWA foi removido; o site descarta service workers e caches antigos ao abrir (`src/main.tsx`).

## App Android (Capacitor 7)
- Configuração: `capacitor.config.ts` (appId `io.github.cainalo.cronicas`, webDir `dist`). Projeto nativo em `android/` (versionado).
- Ícone adaptativo e tela de abertura gerados por `@capacitor/assets` a partir de `assets/` (imagens produzidas do `public/icon.svg`).
- Integração nativa em `src/app/native.ts`: barra de status, botão voltar do Android; links de e-mail de autenticação apontam para o site público quando no app.
- **Offline**: o app carrega o site empacotado no próprio APK (todo o conteúdo dos grimórios está no bundle), então abre e funciona sem internet. Os dados de estudo são local-first e sincronizam quando há conexão.

## Compilação e download
- O workflow `.github/workflows/pages.yml`, a cada push, roda os testes, gera o build web, `npx cap sync android`, compila `assembleRelease` com JDK 21 e publica `download/cronicas-do-conhecimento.apk` e `download/version.json` junto do site no GitHub Pages.
- `versionCode` = número da execução do workflow; `versionName` = `0.1.<execução>`. Atualizações instalam por cima.
- **Assinatura**: se existirem os segredos `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`, usa essa chave. Senão, usa uma chave mantida no cache do GitHub Actions (`android-signing-v1`), gerada na primeira execução. A chave nunca fica no repositório. Risco: se o cache expirar (7 dias sem uso), uma nova chave é gerada e o Android exigirá desinstalar a versão antiga antes de instalar a nova (progresso de quem tem conta é recuperado pelo servidor). Para publicar na Play Store ou evitar esse risco, cadastrar os segredos.
- Verificado em 17/10/2026: execução 11 compilou o APK (6,4 MB, assinado v1+v2, certificado "CN=Cronicas do Conhecimento"), publicado no site.
- **Não testado em aparelho físico** pelo assistente (sem dispositivo no ambiente).

## Download no site
`components/AppDownload.tsx` lê `download/version.json` e mostra versão, tamanho, botão "Baixar" e instruções (permitir instalação de fonte desconhecida). Aparece no painel e na tela Conta; nunca dentro do app.

## Próximos passos
- iOS: `npx cap add ios` exige macOS/Xcode (fora do alcance do CI atual sem runner macOS).
- Notificações locais de lembrete (`@capacitor/local-notifications`), mediante aprovação do usuário.
