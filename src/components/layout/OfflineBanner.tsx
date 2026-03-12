"use client";

import { useState, useEffect } from "react";
import { WifiOff } from "lucide-react";
import { addNetworkListener, getNetworkStatus } from "@/lib/network-status";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    getNetworkStatus().then((s) => setOffline(!s.connected));
    addNetworkListener((connected) => setOffline(!connected)).then((fn) => {
      cleanup = fn;
    });

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  if (!offline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-center text-xs font-medium py-1.5 flex items-center justify-center gap-2"
      style={{ paddingTop: "calc(0.375rem + var(--safe-area-top, 0px))" }}
    >
      <WifiOff size={12} />
      No internet connection
    </div>
  );
}
