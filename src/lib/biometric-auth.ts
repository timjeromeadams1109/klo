import { Capacitor } from "@capacitor/core";

export async function isBiometricAvailable(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const { NativeBiometric } = await import("@capgo/capacitor-native-biometric");
    const result = await NativeBiometric.isAvailable();
    return result.isAvailable;
  } catch {
    return false;
  }
}

export async function biometricVerify(reason?: string): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return true;
  try {
    const { NativeBiometric } = await import("@capgo/capacitor-native-biometric");
    await NativeBiometric.verifyIdentity({
      reason: reason || "Verify your identity",
      title: "KLO Authentication",
      subtitle: "Use biometrics to continue",
      useFallback: true,
      fallbackTitle: "Use Passcode",
    });
    return true;
  } catch {
    return false;
  }
}
