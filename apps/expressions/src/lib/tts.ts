export type TTSOptions = {
  lang?: string;
  rate?: number;
  pitch?: number;
  voiceName?: string;
};

export function isSpeechSynthesisAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function speak(text: string, opts: TTSOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!isSpeechSynthesisAvailable()) {
      reject(new Error("SpeechSynthesis unsupported"));
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = opts.lang ?? "en-US";
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1;
    if (opts.voiceName) {
      const v = window.speechSynthesis.getVoices().find((x) => x.name === opts.voiceName);
      if (v) u.voice = v;
    }
    u.onend = () => resolve();
    u.onerror = (e) => reject(e.error);
    window.speechSynthesis.speak(u);
  });
}

export function cancelSpeak(): void {
  if (isSpeechSynthesisAvailable()) window.speechSynthesis.cancel();
}
