"use client";

import { useCallback, useEffect, useState } from "react";
import { speak, cancelSpeak, isSpeechSynthesisAvailable } from "@/lib/tts";

export function useTTS() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setSupported(isSpeechSynthesisAvailable());
    return () => cancelSpeak();
  }, []);

  const play = useCallback(async (text: string) => {
    if (!isSpeechSynthesisAvailable()) return;
    setSpeaking(true);
    try {
      await speak(text);
    } catch {
      /* noop */
    } finally {
      setSpeaking(false);
    }
  }, []);

  const stop = useCallback(() => {
    cancelSpeak();
    setSpeaking(false);
  }, []);

  return { supported, speaking, play, stop };
}
