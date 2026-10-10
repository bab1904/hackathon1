import React, { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Volume2, VolumeX, Send, X, AlertCircle,
  Sparkles, ArrowRight, ShieldAlert, Phone, Calendar, Pill, Radio
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
  const [liveTranscript, setLiveTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [voiceError, setVoiceError] = useState(null);
  const [lastAction, setLastAction] = useState(null);

  // Sync prop language
  useEffect(() => {
    setCurrentLang(lang);
  }, [lang]);

  // When modal opens, automatically start listening for instant, natural interaction
  useEffect(() => {
    if (isOpen) {
      setLiveTranscript("");
      setVoiceError(null);
      setLastAction(null);
      startListeningSession();
    } else {
      voiceService.stopListening();
      voiceService.stopSpeaking();
      setIsListening(false);
      setIsSpeaking(false);
    }
  }, [isOpen, currentLang]);

  const startListeningSession = () => {
    setVoiceError(null);
    setIsListening(true);
    setStatusMessage(
      currentLang === "te"
        ? "వింటున్నాను... మాట్లాడండి ('SOS', 'మందులు', లేదా 'అపాయింట్‌మెంట్లు')..."
        : "Listening... Say 'SOS', 'Medicines / Prescription', or 'Appointments'..."
    );

    voiceService.startListening({
      lang: currentLang,
      onInterim: (text) => {
        setLiveTranscript(text);
      },
      onResult: (finalText) => {
        setIsListening(false);
        setLiveTranscript(finalText);
        processSpokenCommand(finalText);
      },
      onError: (err) => {
        setIsListening(false);
        if (err.error === "not-allowed" || err.error === "permission-denied") {
          setVoiceError(
            currentLang === "te"
              ? "మైక్రోఫోన్ అనుమతి నిరాకరించబడింది. దయచేసి బ్రౌజర్ లో అనుమతి ఇవ్వండి లేదా క్రింది బటన్లను వాడండి."
              : "Microphone permission denied. Allow mic access in browser, or use quick action chips below."
          );
        } else if (err.error === "no-speech") {
          setVoiceError(
            currentLang === "te"
              ? "మాట వినిపించలేదు. మైక్ బటన్ నొక్కి మళ్ళీ మాట్లాడండి."
              : "No speech heard. Tap the mic button to speak again."
          );
        } else {
          setVoiceError(
            currentLang === "te"
              ? "వాయిస్ సపోర్ట్ అందుబాటులో లేదు. క్రింద టైప్ చేయండి లేదా బటన్ నొక్కండి."
              : "Voice recognition unavailable. Type below or tap quick keywords."
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

  const processSpokenCommand = (text) => {
    if (!text || !text.trim()) return;

    const result = findVoiceResponse(text, currentLang);
    setLastAction(result);

    // Speak audio readout
    setIsSpeaking(true);
    voiceService.speak(result.speakText, currentLang, () => {
      setIsSpeaking(false);
    });

    // If an action page was matched (SOS / Medicines / Appointments)
    if (result.actionPage && onNavigatePage) {
      setTimeout(() => {
        onNavigatePage(result.actionPage);
        onClose();
      }, 1600);
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const query = inputText;
    setInputText("");
    setLiveTranscript(query);
    processSpokenCommand(query);
  };

  const handleQuickKeyword = (keyword) => {
    setLiveTranscript(keyword);
    processSpokenCommand(keyword);
  };

  const toggleLanguage = () => {
    const next = currentLang === "te" ? "en" : "te";
    setCurrentLang(next);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col transition-all">
        {/* Micro-Modal Header */}
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Radio className="w-5 h-5 text-teal-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold tracking-tight">
                  {currentLang === "te" ? "వాయిస్ అసిస్టెంట్ వింటోంది..." : "Voice Assistant Listening..."}
                </h3>
              </div>
              <p className="text-[11px] text-teal-200">
                {currentLang === "te"
                  ? "స్పష్టంగా మాట్లాడండి లేదా కీవర్డ్ చెప్పండి"
                  : "Speak naturally or say a keyword"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Telugu / English Language Switcher */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 transition border border-white/20 font-bold flex items-center gap-1"
              title="Toggle Audio Readout Language"
            >
              <span>{currentLang === "te" ? "తెలుగు 🔊" : "English 🔊"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Audio Visualizer & Real-time Transcript */}
        <div className="p-6 bg-slate-50/70 flex flex-col items-center text-center space-y-4">
          {/* Animated Wave Pulsing Circle */}
          <div className="relative">
            {isListening && (
              <span className="absolute -inset-3 rounded-full bg-teal-400/30 animate-ping"></span>
            )}
            <button
              type="button"
              onClick={isListening ? handleStopListening : startListeningSession}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform active:scale-95 ${
                isListening
                  ? "bg-red-600 hover:bg-red-700 ring-4 ring-red-200 animate-pulse"
                  : "bg-teal-700 hover:bg-teal-800 ring-4 ring-teal-100"
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 animate-bounce" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Soundwave Bar Visualizer */}
          {isListening && (
            <div className="flex items-end justify-center gap-1.5 h-6">
              <span className="w-1.5 bg-teal-600 h-2 animate-bounce rounded-full"></span>
              <span className="w-1.5 bg-teal-600 h-5 animate-bounce delay-100 rounded-full"></span>
              <span className="w-1.5 bg-teal-600 h-3 animate-bounce delay-200 rounded-full"></span>
              <span className="w-1.5 bg-teal-600 h-6 animate-bounce delay-75 rounded-full"></span>
              <span className="w-1.5 bg-teal-600 h-4 animate-bounce delay-150 rounded-full"></span>
              <span className="w-1.5 bg-teal-600 h-2 animate-bounce delay-300 rounded-full"></span>
            </div>
          )}

          {/* Status / Transcript Box */}
          <div className="w-full bg-white rounded-2xl p-4 border border-slate-200 shadow-xs min-h-[72px] flex flex-col justify-center items-center">
            {liveTranscript ? (
              <p className="text-sm font-bold text-slate-800 animate-fadeIn">
                "{liveTranscript}"
              </p>
            ) : isListening ? (
              <p className="text-xs text-teal-800 font-semibold animate-pulse">
                {currentLang === "te"
                  ? "మీ మాట వింటున్నాను... 'SOS', 'మందులు', లేదా 'అపాయింట్‌మెంట్లు' అని చెప్పండి"
                  : "Listening... Say 'SOS', 'Prescription / Medicines', or 'Appointments'"}
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                {currentLang === "te"
                  ? "మైక్ బటన్ నొక్కి మాట్లాడండి లేదా క్రింద ఎంచుకోండి"
                  : "Tap the microphone to speak, or select a keyword below"}
              </p>
            )}

            {lastAction && (
              <div className="mt-2 text-xs font-bold text-teal-800 flex items-center gap-1.5 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>{lastAction.displayText}</span>
              </div>
            )}
          </div>

          {/* Voice Error notice if any */}
          {voiceError && (
            <div className="w-full p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 text-left">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{voiceError}</span>
            </div>
          )}
        </div>

        {/* High-Priority Voice Command Chips */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-left">
            {currentLang === "te" ? "ముఖ్య ఆదేశాలు (నొక్కండి లేదా చెప్పండి):" : "High-Priority Keywords (Tap or Say):"}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {/* SOS Trigger */}
            <button
              type="button"
              onClick={() => handleQuickKeyword("SOS")}
              className="p-2.5 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-black flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>SOS (112)</span>
            </button>

            {/* Medicines Trigger */}
            <button
              type="button"
              onClick={() => handleQuickKeyword("Medicines")}
              className="p-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <Pill className="w-3.5 h-3.5" />
              <span>{currentLang === "te" ? "మందులు" : "Medicines"}</span>
            </button>

            {/* Appointments / Calendar Trigger */}
            <button
              type="button"
              onClick={() => handleQuickKeyword("Appointments")}
              className="p-2.5 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentLang === "te" ? "క్యాలెండర్" : "Calendar"}</span>
            </button>
          </div>
        </div>

        {/* Text Input Fallback Footer */}
        <div className="p-4 bg-white border-t border-slate-200/80">
          <form onSubmit={handleManualSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                currentLang === "te"
                  ? "టైప్ చేయండి: SOS, మందులు, అపాయింట్‌మెంట్లు..."
                  : "Type keyword: SOS, Medicines, Appointments..."
              }
              className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-2xl bg-teal-700 text-white disabled:opacity-40 hover:bg-teal-800 transition font-bold text-xs shrink-0 flex items-center gap-1"
            >
              <span>{currentLang === "te" ? "పంపు" : "Send"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
