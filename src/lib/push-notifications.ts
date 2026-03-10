import { Capacitor } from "@capacitor/core";

export async function initPushNotifications(): Promise<string | null> {
  if (!Capacitor.isNativePlatform()) return null;

  try {
    const { PushNotifications } = await import("@capacitor/push-notifications");

    // Request permission
    const permResult = await PushNotifications.requestPermissions();
    if (permResult.receive !== "granted") return null;

    // Register with APNs/FCM
    await PushNotifications.register();

    // Return the device token via a promise
    return new Promise((resolve) => {
      PushNotifications.addListener("registration", (token) => {
        console.log("[Push] Registered with token:", token.value);
        resolve(token.value);
      });

      PushNotifications.addListener("registrationError", (error) => {
        console.error("[Push] Registration error:", error);
        resolve(null);
      });

      // Handle received notifications (foreground)
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notification) => {
          console.log("[Push] Received:", notification.title);
        }
      );

      // Handle notification tap (opens app)
      PushNotifications.addListener(
        "pushNotificationActionPerformed",
        (action) => {
          console.log("[Push] Action:", action.notification.title);
          // Could navigate to specific page based on action.notification.data
        }
      );
    });
  } catch (err) {
    console.error("[Push] Init error:", err);
    return null;
  }
}

export async function checkPushPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;
  try {
    const { PushNotifications } = await import("@capacitor/push-notifications");
    const result = await PushNotifications.checkPermissions();
    return result.receive === "granted";
  } catch {
    return false;
  }
}
