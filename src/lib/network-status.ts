import { Capacitor } from "@capacitor/core";

export interface NetworkState {
  connected: boolean;
  connectionType: string;
}

export async function getNetworkStatus(): Promise<NetworkState> {
  if (!Capacitor.isNativePlatform()) {
    return { connected: navigator.onLine, connectionType: "unknown" };
  }
  try {
    const { Network } = await import("@capacitor/network");
    const status = await Network.getStatus();
    return { connected: status.connected, connectionType: status.connectionType };
  } catch {
    return { connected: true, connectionType: "unknown" };
  }
}

export async function addNetworkListener(
  callback: (connected: boolean) => void
): Promise<(() => void) | null> {
  if (!Capacitor.isNativePlatform()) {
    const onlineHandler = () => callback(true);
    const offlineHandler = () => callback(false);
    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);
    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }
  try {
    const { Network } = await import("@capacitor/network");
    const handle = await Network.addListener("networkStatusChange", (status) => {
      callback(status.connected);
    });
    return () => handle.remove();
  } catch {
    return null;
  }
}
