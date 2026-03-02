"use client";

import { useState, useEffect } from "react";

export type Platform = "ios" | "android" | "web";

interface PlatformInfo {
  platform: Platform;
  isNative: boolean;
  isIOS: boolean;
  isAndroid: boolean;
  isWeb: boolean;
}

export function usePlatform(): PlatformInfo {
  const [platform, setPlatform] = useState<Platform>("web");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isCapacitor = typeof window !== "undefined" && !!(window as unknown as Record<string, unknown>).Capacitor;

    if (isCapacitor) {
      if (/iphone|ipad|ipod/.test(ua)) {
        setPlatform("ios");
      } else if (/android/.test(ua)) {
        setPlatform("android");
      }
    }
  }, []);

  return {
    platform,
    isNative: platform !== "web",
    isIOS: platform === "ios",
    isAndroid: platform === "android",
    isWeb: platform === "web",
  };
}
