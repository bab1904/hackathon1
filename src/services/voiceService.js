// Web Speech API Voice Assistant Service (STT & TTS)
// Optimized for Telugu (te-IN) and Indian English (en-IN)

class VoiceService {
  constructor() {
    this.recognition = null;
    this.isSupported = false;
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.isSupported = true;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    } else {
      this.isSupported = false;
    }
  }

  startListening({ lang = "te", onResult, onError, onEnd }) {
    if (!this.isSupported || !this.recognition) {
      if (onError) onError({ error: "not_supported", message: "Speech recognition is not supported in this browser." });
      return;
    }

    try {
      this.recognition.lang = lang === "te" ? "te-IN" : "en-IN";

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onResult) onResult(transcript);
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
        this.recognition.stop();
      } catch {
        // ignore already stopped
      }
    }
  }

  speak(text, lang = "te", onEnd = null) {
    if (!('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "te" ? "te-IN" : "en-IN";
    utterance.rate = 0.95; // slightly slower for clear comprehension
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

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  isSpeaking() {
    return 'speechSynthesis' in window ? window.speechSynthesis.speaking : false;
  }
}

export const voiceService = new VoiceService();
