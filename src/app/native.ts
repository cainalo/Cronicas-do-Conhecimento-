// Integração com o app nativo (Capacitor). No navegador, nada acontece.
import { Capacitor } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();

/** Endereço público do site, usado nos links de e-mail (confirmação, recuperação de senha). */
export const PUBLIC_SITE = 'https://cainalo.github.io/Cronicas-do-Conhecimento-/';

/** Barra de status do Android acompanhando o tema (texto escuro no claro, claro no escuro). */
export async function applyStatusBar(theme: 'light' | 'dark') {
  if (!isNative()) return;
  const { StatusBar, Style } = await import('@capacitor/status-bar');
  try {
    await StatusBar.setStyle({ style: Style.Dark }); // barra de madeira escura nos dois temas
    void theme;
    await StatusBar.setBackgroundColor({ color: '#2b1d12' });
  } catch {
    /* indisponível em algumas versões do Android */
  }
}

export async function setupNative() {
  if (!isNative()) return;
  const { App } = await import('@capacitor/app');
  // Botão "voltar" do Android navega no histórico; na tela inicial, fecha o app.
  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) window.history.back();
    else void App.exitApp();
  });
}
