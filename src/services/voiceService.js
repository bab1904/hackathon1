// Web Speech API Voice Assistant Service (STT & TTS)
// Optimized for Telugu (te-IN) and Indian English (en-IN)

class VoiceService {
  constructor() {
    this.recognition = null;
    this.isSupported = false;
    this.currentUtterance = null;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.isSupported = true;
      try {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;
      } catch (e) {
        console.warn("Speech recognition initialization error:", e);
        this.isSupported = false;
      }
    } else {
      this.isSupported = false;
    }
  }

  startListening({ lang = "te", onResult, onInterim, onError, onEnd }) {
    if (!this.isSupported || !this.recognition) {
      if (onError) onError({ error: "not_supported", message: "Speech recognition is not supported in this browser." });
      return;
    }

    try {
      this.stopListening();
      this.recognition.lang = lang === "te" ? "te-IN" : "en-IN";

      this.recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (interimTranscript && onInterim) {
          onInterim(interimTranscript);
        }

        if (finalTranscript && onResult) {
          onResult(finalTranscript.trim());
        }
      };

      this.recognition.onerror = (event) => {
        if (onError) onError(event);
      };

      this.recognition.onend = () => {
        if (onEnd) onEnd();
      };

      this.recognition.start();
    } catch (err) {
      if (onError) onError({ error: "failed_to_start", message: err.message });
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {
        // ignore already stopped
      }
    }
  }

  speak(text, lang = "te", onEnd = null) {
    if (typeof window === "undefined" || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      // Clean HTML tags or symbols
      const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[✅❌⚠️🚨💉💊📅]/g, '').trim();
      if (!cleanText) {
        if (onEnd) onEnd();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === "te" ? "te-IN" : "en-IN";
      utterance.rate = 0.92; // Slightly paced for high comprehension in medical context
      utterance.pitch = 1.0;

      // Pick best available voice
      const voices = window.speechSynthesis.getVoices();
      if (lang === "te") {
        const teluguVoice = voices.find(v => v.lang.includes("te") || v.name.toLowerCase().includes("telugu"));
        if (teluguVoice) {
          utterance.voice = teluguVoice;
        }
      } else {
        const inVoice = voices.find(v => v.lang.includes("en-IN") || v.name.toLowerCase().includes("india"));
        if (inVoice) {
          utterance.voice = inVoice;
        }
      }

      utterance.onend = () => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (onEnd) onEnd();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("SpeechSynthesis error:", err);
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (typeof window !== "undefined" && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
      this.currentUtterance = null;
    }
  }

  isSpeaking() {
    return typeof window !== "undefined" && 'speechSynthesis' in window ? window.speechSynthesis.speaking : false;
  }
}

export const voiceService = new VoiceService();
