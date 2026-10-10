import React, { useState, useEffect } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, Send, X, AlertCircle,
  HelpCircle, Sparkles, ArrowRight
} from 'lucide-react';
import { voiceService } from '../services/voiceService';
import { findVoiceResponse } from '../data/voiceKnowledgeBase';

export default function VoiceAssistantModal({
  isOpen,
  onClose,
  lang = "te",
  onNavigatePage
}) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentLang, setCurrentLang] = useState(lang);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "assistant",
      text: lang === "te"
        ? "నమస్కారం! నేను గ్రామమా AI వాయిస్ సహచరిని. మీ రోజువారీ మందులు, టీకాలు, గర్భ పరీక్షలు, లేదా దగ్గరి ఆసుపత్రుల గురించి నన్ను అడగండి."
        : "Hello! I am your GramaMaa AI Voice Companion. Ask me about your daily medicines, baby vaccines, checkups, or nearby hospitals.",
      actionPage: null
    }
  ]);
  const [voiceError, setVoiceError] = useState(null);

  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setVoiceError(null);
    setIsListening(true);
    setTranscript("");

    voiceService.startListening({
      lang: currentLang,
      onResult: (text) => {
        setIsListening(false);
        setTranscript(text);
        processUserQuery(text);
      },
      onError: (err) => {
        setIsListening(false);
        if (err.error === "not-allowed" || err.error === "permission-denied") {
          setVoiceError(
            currentLang === "te"
              ? "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో మైక్ ఆన్ చేయండి లేదా క్రింద టైప్ చేయండి."
              : "Microphone permission denied. Please allow microphone access in browser or type your question below."
          );
        } else if (err.error === "no-speech") {
          setVoiceError(
            currentLang === "te"
              ? "శబ్దం వినిపించలేదు. దయచేసి మైక్ బటన్ నొక్కి మళ్లీ మాట్లాడండి."
              : "No speech detected. Please tap the mic and speak clearly."
          );
        } else if (err.error === "not_supported") {
          setVoiceError(
            currentLang === "te"
              ? "మీ బ్రౌజర్ లో వాయిస్ రికగ్నిషన్ సపోర్ట్ లేదు. మీరు క్రింద టైప్ చేసి సమాధానం పొందవచ్చు."
              : "Speech recognition not supported on this browser. You can type below to ask questions."
          );
        } else {
          setVoiceError(
            currentLang === "te"
              ? "వాయిస్ రికగ్నిషన్ లో సమస్య వచ్చింది. దయచేసి మళ్లీ ప్రయత్నించండి."
              : "Voice error occurred. Please try speaking again or use text."
          );
        }
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  };

  const handleStopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const processUserQuery = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { sender: "user", text: queryText }
    ];

    const result = findVoiceResponse(queryText, currentLang);

    // Speak response
    setIsSpeaking(true);
    voiceService.speak(result.speakText, currentLang, () => {
      setIsSpeaking(false);
    });

    // Add assistant response
    setMessages([
      ...newMessages,
      {
        sender: "assistant",
        text: result.displayText,
        actionPage: result.actionPage
      }
    ]);

    // If an action page was requested (e.g., emergency, medicines, hospitals)
    if (result.actionPage && onNavigatePage) {
      setTimeout(() => {
        onNavigatePage(result.actionPage);
        onClose();
      }, 2400);
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    processUserQuery(text);
  };

  const handlePromptChipClick = (prompt) => {
    processUserQuery(prompt);
  };

  const handleToggleSpeak = (text) => {
    if (isSpeaking) {
      voiceService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      voiceService.speak(text, currentLang, () => {
        setIsSpeaking(false);
      });
    }
  };

  if (!isOpen) return null;

  const promptChipsTe = [
    "నా ఈరోజు మందులు ఏవి?",
    "దగ్గర్లోని ఆసుపత్రి ఎక్కడ?",
    "నా తర్వాతి చెకప్ ఎప్పుడు?",
    "బిడ్డ టీకాల షెడ్యూల్",
    "పాలివ్వడంలో సమస్య ఉంది",
    "గర్భధారణ ఆహార సలహాలు",
    "అత్యవసర సహాయం (112)"
  ];

  const promptChipsEn = [
    "What are my medicines today?",
    "Show nearby hospitals",
    "When is my next checkup?",
    "Baby vaccination schedule",
    "Breastfeeding help",
    "Pregnancy food ideas",
    "Emergency SOS help"
  ];

  const currentChips = currentLang === "te" ? promptChipsTe : promptChipsEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 via-teal-800 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                {currentLang === "te" ? "గ్రామమా AI వాయిస్ సహచరి" : "GramaMaa AI Voice Companion"}
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/30 font-semibold border border-teal-400/30">
                  {currentLang === "te" ? "తెలుగు" : "English"}
                </span>
              </h2>
              <p className="text-xs text-teal-200">
                {currentLang === "te" ? "మాట్లాడండి లేదా ప్రశ్నను ఎంచుకోండి" : "Speak naturally or tap a question"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switch */}
            <button
              onClick={() => setCurrentLang(currentLang === "te" ? "en" : "te")}
              className="text-xs px-2.5 py-1 rounded-xl bg-white/15 hover:bg-white/25 transition border border-white/20 font-bold"
            >
              {currentLang === "te" ? "English" : "తెలుగు"}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat History Container */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50/70">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed shadow-xs ${
                  msg.sender === "user"
                    ? "bg-teal-700 text-white rounded-br-xs"
                    : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p>{msg.text}</p>
                  {msg.sender === "assistant" && (
                    <button
                      onClick={() => handleToggleSpeak(msg.text)}
                      className="text-slate-400 hover:text-teal-700 p-1 shrink-0"
                      title="Read aloud"
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4 text-teal-600" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {msg.actionPage && (
                  <button
                    onClick={() => {
                      if (onNavigatePage) {
                        onNavigatePage(msg.actionPage);
                        onClose();
                      }
                    }}
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition border border-teal-200"
                  >
                    <span>
                      {currentLang === "te" ? "పేజీని తెరవండి" : "Open Page"}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Active Listening Wave Animation */}
          {isListening && (
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1 items-end h-5">
                  <span className="w-1.5 bg-teal-600 h-3 animate-pulse rounded-full"></span>
                  <span className="w-1.5 bg-teal-600 h-5 animate-pulse delay-75 rounded-full"></span>
                  <span className="w-1.5 bg-teal-600 h-2 animate-pulse delay-150 rounded-full"></span>
                  <span className="w-1.5 bg-teal-600 h-4 animate-pulse delay-100 rounded-full"></span>
                </div>
                <span className="text-sm font-bold text-teal-900">
                  {currentLang === "te" ? "వింటున్నాను... మాట్లాడండి" : "Listening... please speak"}
                </span>
              </div>
              <button
                onClick={handleStopListening}
                className="text-xs px-2.5 py-1 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200"
              >
                {currentLang === "te" ? "ఆపండి" : "Stop"}
              </button>
            </div>
          )}

          {/* Error Message */}
          {voiceError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{voiceError}</span>
            </div>
          )}
        </div>

        {/* Suggestion Chips */}
        <div className="px-4 py-2.5 bg-white border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 mb-1.5">
            {currentLang === "te" ? "తరచూ అడిగే ప్రశ్నలు (నొక్కండి):" : "Suggested questions (Tap to ask):"}
          </p>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {currentChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handlePromptChipClick(chip)}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 hover:border-teal-300 text-slate-700 font-medium whitespace-nowrap transition border border-slate-200 shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Footer */}
        <div className="p-4 bg-white border-t border-slate-200/80">
          <div className="flex items-center gap-3">
            {/* Microphone Big Button */}
            <button
              onClick={isListening ? handleStopListening : handleStartListening}
              className={`p-4 rounded-full text-white shadow-lg transition-all transform active:scale-95 shrink-0 ${
                isListening
                  ? "bg-red-600 hover:bg-red-700 animate-mic shadow-red-200"
                  : "bg-teal-700 hover:bg-teal-800 shadow-teal-200"
              }`}
              title={isListening ? "Stop listening" : "Start speaking"}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>

            {/* Text Input Fallback */}
            <form onSubmit={handleTextSubmit} className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  currentLang === "te"
                    ? "లేదా ఇక్కడ ప్రశ్న టైప్ చేయండి..."
                    : "Or type your question here..."
                }
                className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl bg-teal-700 text-white disabled:opacity-40 hover:bg-teal-800 transition shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
