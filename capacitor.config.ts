import type { CapacitorConfig } from "@capacitor/cli";
import { KeyboardResize } from "@capacitor/keyboard";

const config: CapacitorConfig = {
  appId: "io.keithlodom.klo",
  appName: "KLO",
  webDir: "out",

  server: {
    url: "https://keithlodom.io",
    cleartext: false,
  },

  ios: {
    scheme: "KLO",
    contentInset: "automatic",
  },

  android: {
    allowMixedContent: false,
  },

  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: "#0D1117",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0D1117",
    },
    Keyboard: {
      resize: KeyboardResize.Body,
      resizeOnFullScreen: true,
    },
  },
};

export default config;
