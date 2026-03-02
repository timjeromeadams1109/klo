"use client";

import { useEffect } from "react";

const BASE = "KLO";

// Unicode characters that simulate fading opacity:
// Full → Medium → Light → Invisible
const FADE_CHARS: Record<string, string[]> = {
  K: ["K", "\u1D37", " "],
  L: ["L", "\u1D38", " "],
  O: ["O", "\u1D3C", " "],
};

// Rolling fade sequence — each letter fades out then back in, one at a time
function buildFrames(): string[] {
  const frames: string[] = [];
  const letters = BASE.split("");

  // Resting state
  frames.push("KLO");

  // Each letter fades out and back in, rolling left to right
  for (const letter of letters) {
    const idx = letters.indexOf(letter);
    const stages = FADE_CHARS[letter];

    // Fade out
    for (let s = 1; s < stages.length; s++) {
      const chars = [...letters];
      chars[idx] = stages[s];
      frames.push(chars.join(""));
    }

    // Fade back in
    for (let s = stages.length - 2; s >= 0; s--) {
      const chars = [...letters];
      chars[idx] = stages[s];
      frames.push(chars.join(""));
    }
  }

  // Hold on full title
  frames.push("KLO");
  frames.push("KLO");

  return frames;
}

const FRAMES = buildFrames();
const FRAME_MS = 200;
const PAUSE_MS = 4000;

export default function TitleFade() {
  useEffect(() => {
    let frameIndex = 0;
    let pausing = true;
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      if (pausing) {
        pausing = false;
        frameIndex = 0;
        timeout = setTimeout(tick, PAUSE_MS);
        return;
      }

      document.title = FRAMES[frameIndex];
      frameIndex++;

      if (frameIndex >= FRAMES.length) {
        pausing = true;
        timeout = setTimeout(tick, PAUSE_MS);
      } else {
        timeout = setTimeout(tick, FRAME_MS);
      }
    }

    // Set initial title and start the cycle
    document.title = "KLO";
    timeout = setTimeout(tick, PAUSE_MS);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}
