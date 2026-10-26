package io.github.cainalo.cronicas;

import android.content.Context;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Liga e desliga o modo imersivo a partir do ajuste "Tela" (persistido nas preferências nativas). */
@CapacitorPlugin(name = "Immersive")
public class ImmersivePlugin extends Plugin {

    @PluginMethod
    public void get(PluginCall call) {
        boolean on = getActivity().getSharedPreferences(MainActivity.PREFS, Context.MODE_PRIVATE).getBoolean(MainActivity.KEY_IMMERSIVE, true);
        JSObject ret = new JSObject();
        ret.put("enabled", on);
        call.resolve(ret);
    }

    @PluginMethod
    public void set(PluginCall call) {
        boolean on = Boolean.TRUE.equals(call.getBoolean("enabled", true));
        getActivity().getSharedPreferences(MainActivity.PREFS, Context.MODE_PRIVATE).edit().putBoolean(MainActivity.KEY_IMMERSIVE, on).apply();
        getActivity().runOnUiThread(() -> {
            if (getActivity() instanceof MainActivity) ((MainActivity) getActivity()).applyImmersive();
        });
        JSObject ret = new JSObject();
        ret.put("enabled", on);
        call.resolve(ret);
    }
}
