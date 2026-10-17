// Integração com o app nativo (Capacitor). No navegador, nada acontece.
import { Capacitor } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();

/** Endereço público do site, usado nos links de e-mail (confirmação, recuperação de senha). */
export const PUBLIC_SITE = 'https://cainalo.github.io/Cronicas-do-Conhecimento-/';

export async function setupNative() {
  if (!isNative()) return;
  const { StatusBar, Style } = await import('@capacitor/status-bar');
  const { App } = await import('@capacitor/app');
  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#15110d' });
  } catch {
    /* indisponível em algumas versões do Android */
  }
  // Botão "voltar" do Android navega no histórico; na tela inicial, fecha o app.
  App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) window.history.back();
    else void App.exitApp();
  });
}
