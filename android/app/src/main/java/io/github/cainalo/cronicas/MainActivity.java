package io.github.cainalo.cronicas;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

/**
 * Modo imersivo (pacote v4, etapa 8): barra de status e barra de navegação ocultas por padrão.
 * Um deslize a partir da borda mostra as barras por alguns instantes; o próprio Android as esconde
 * de novo (BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE). A escolha fica nas preferências nativas, para
 * valer já na abertura, antes do carregamento da página; o ajuste "Tela" do app a altera.
 */
public class MainActivity extends BridgeActivity {
    static final String PREFS = "cronicas";
    static final String KEY_IMMERSIVE = "immersive";

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ImmersivePlugin.class);
        super.onCreate(savedInstanceState);
        // Faz o WebView desenhar de borda a borda; com o modo imersivo ativo,
        // o conteúdo ocupa o espaço das barras do sistema, que reaparecem só por gesto.
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        applyImmersive();
    }

    @Override
    public void onResume() {
        super.onResume();
        applyImmersive();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        // Volta de diálogos do sistema, da cortina de notificações ou de outro app.
        if (hasFocus) applyImmersive();
    }

    boolean immersiveEnabled() {
        return getSharedPreferences(PREFS, MODE_PRIVATE).getBoolean(KEY_IMMERSIVE, true);
    }

    void applyImmersive() {
        WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        if (immersiveEnabled()) {
            controller.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            controller.hide(WindowInsetsCompat.Type.systemBars());
        } else {
            controller.show(WindowInsetsCompat.Type.systemBars());
        }
    }
}
