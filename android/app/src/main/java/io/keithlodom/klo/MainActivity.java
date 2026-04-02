package io.keithlodom.klo;

import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Safety net: force-hide splash after 8s even if the remote site
        // hasn't loaded CapacitorInit yet. Prevents Android ANR kills
        // on slow/offline networks.
        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            try {
                WebView wv = getBridge().getWebView();
                if (wv != null) {
                    wv.post(() -> wv.evaluateJavascript(
                        "try{Capacitor.Plugins.SplashScreen.hide()}catch(e){}",
                        null
                    ));
                }
            } catch (Exception ignored) {}
        }, 8000);
    }
}
