// Integração com o app nativo (Capacitor). No navegador, nada acontece.
import { Capacitor, registerPlugin } from '@capacitor/core';

export const isNative = () => Capacitor.isNativePlatform();

/** Endereço público do site, usado nos links de e-mail (confirmação, recuperação de senha). */
export const PUBLIC_SITE = 'https://cainalo.github.io/Cronicas-do-Conhecimento-/';

/** Barra de status do Android acompanhando o tema (texto escuro no claro, claro no escuro). */
export async function applyStatusBar(theme: 'light' | 'dark') {
  if (!isNative()) return;
  const { StatusBar, Style } = await import('@capacitor/status-bar');
  try {
    // Style.Light = texto escuro (fundo claro); Style.Dark = texto claro (fundo escuro).
    await StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
    await StatusBar.setBackgroundColor({ color: theme === 'dark' ? '#151412' : '#f4f0e8' });
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
  // O app Android deve abrir em modo imersivo: barras do sistema só reaparecem
  // temporariamente quando a pessoa faz o gesto a partir da borda.
  await setImmersive(true);
}

/** Plugin nativo do próprio app (MainActivity/ImmersivePlugin): barras do sistema ocultas por padrão. */
const Immersive = registerPlugin<{ get(): Promise<{ enabled: boolean }>; set(o: { enabled: boolean }): Promise<{ enabled: boolean }> }>('Immersive');

/** Liga ou desliga o modo imersivo no Android. No navegador não há controle das barras: devolve false. */
export async function setImmersive(enabled: boolean): Promise<boolean> {
  if (!isNative()) return false;
  try {
    await Immersive.set({ enabled });
    return true;
  } catch {
    return false;
  }
}
