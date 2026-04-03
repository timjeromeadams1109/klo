"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, KeyRound } from "lucide-react";
import { haptics } from "@/lib/haptics";

export default function MfaVerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-klo-muted">Loading...</div>
        </div>
      }
    >
      <MfaVerifyContent />
    </Suspense>
  );
}

function MfaVerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const { update: updateSession } = useSession();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [useBackup, setUseBackup] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/mfa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Invalid code. Please try again.");
        haptics.error();
        setIsLoading(false);
        return;
      }

      // Clear the mfaPending flag in the JWT so middleware stops intercepting
      await updateSession({ mfaPending: false });
      haptics.success();
      router.push(callbackUrl);
    } catch {
      setError("Something went wrong. Please try again.");
      haptics.error();
      setIsLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-[#0D1117] border border-[#30363D] text-klo-text py-3 px-4 rounded-xl focus:outline-none focus:border-[#C8A84E] transition-colors placeholder:text-klo-muted/50 text-center text-lg tracking-[0.25em] font-mono";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="font-display text-5xl font-bold text-[#C8A84E] tracking-wide"
            >
              KLO
            </motion.h1>
          </Link>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            <ShieldCheck size={20} className="text-[#C8A84E]" />
            <p className="text-klo-text text-lg font-medium">
              Two-Factor Authentication
            </p>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-2 text-klo-muted text-sm"
          >
            {useBackup
              ? "Enter one of your 8-character backup codes"
              : "Enter the 6-digit code from your authenticator app"}
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#161B22] border border-[#21262D] rounded-2xl p-8"
        >
          {error && (
            <div
              className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              role="alert"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="mfa-code" className="sr-only">
                {useBackup ? "Backup code" : "Authenticator code"}
              </label>
              <input
                id="mfa-code"
                type={useBackup ? "text" : "text"}
                inputMode={useBackup ? "text" : "numeric"}
                pattern={useBackup ? undefined : "[0-9]*"}
                autoComplete={useBackup ? "off" : "one-time-code"}
                placeholder={useBackup ? "XXXXXXXX" : "000000"}
                value={code}
                onChange={(e) => {
                  const v = e.target.value;
                  if (useBackup) {
                    setCode(v.toUpperCase().slice(0, 8));
                  } else {
                    setCode(v.replace(/\D/g, "").slice(0, 6));
                  }
                }}
                required
                aria-required="true"
                className={inputClasses}
              />
            </div>
            <button
              type="submit"
              disabled={
                isLoading ||
                (!useBackup && code.length !== 6) ||
                (useBackup && code.length !== 8)
              }
              className="w-full flex items-center justify-center gap-2 bg-[#C8A84E] text-[#0D1117] py-3 rounded-xl hover:bg-[#d4b85e] transition-all duration-200 cursor-pointer font-semibold disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </form>

          {/* Toggle backup code mode */}
          <div className="mt-6 pt-4 border-t border-[#21262D] text-center">
            <button
              type="button"
              onClick={() => {
                setUseBackup((prev) => !prev);
                setCode("");
                setError("");
              }}
              className="inline-flex items-center gap-1.5 text-sm text-klo-muted hover:text-klo-text transition-colors cursor-pointer"
            >
              <KeyRound size={14} />
              {useBackup
                ? "Use authenticator app instead"
                : "Use a backup code instead"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
