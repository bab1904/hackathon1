import React, { useState, useEffect } from 'react';
import {
  Heart, Mic, AlertOctagon, Globe, Sparkles, User,
  Calendar, Building2, Pill, Smartphone, Download
} from 'lucide-react';

export default function Navbar({
  profile,
  lang = "te",
  onToggleLang,
  onOpenVoice,
  onOpenEmergency,
  onNavigatePage,
  activePage
}) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setCanInstall(false);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        lang === "te"
          ? "మీ బ్రౌజర్ మెనూ (⋮ లేదా Share) నుండి 'Add to Home screen' లేదా 'Install App' ఎంచుకోండి."
          : "Tap your browser menu (⋮ or Share) and select 'Add to Home screen' or 'Install app'."
      );
    }
  };

  const getStageLabel = () => {
    switch (profile.stage) {
      case "pregnant":
        return lang === "te" ? "గర్భవతి (24వ వారం)" : "Pregnant (Wk 24)";
      case "postpartum":
        return lang === "te" ? "బాలింత (శిశువు 4 నెలలు)" : "Postpartum (Baby 4m)";
      case "caregiver":
        return lang === "te" ? "శిశు సంరక్షణ" : "Child Care";
      case "asha":
        return lang === "te" ? "ఆశా కార్యకర్త మోడ్" : "ASHA Worker Mode";
      default:
        return lang === "te" ? "గర్భధారణ సంరక్షణ" : "Maternal Care";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo & Tagline */}
        <div
          onClick={() => onNavigatePage("dashboard")}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                GramaMaa <span className="text-teal-700">AI</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                గ్రామమా
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-slate-500 font-medium">
              {lang === "te"
                ? "మీ మాతా శిశు సంరక్షణ సహచరి"
                : "Care for Every Mother. Support for Every Child."}
            </p>
          </div>
        </div>

        {/* Center: Stage Pill (clickable to Profile) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={() => onNavigatePage("profile")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-slate-200 transition text-xs font-semibold"
            title="Switch stage or edit profile"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{profile.name}</span>
            <span className="text-slate-400">|</span>
            <span className="text-teal-700 font-bold">{getStageLabel()}</span>
          </button>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Install App Button */}
          <button
            onClick={handleInstallClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition"
            title="Install Mobile App"
          >
            <Smartphone className="w-3.5 h-3.5 text-teal-700" />
            <span>{lang === "te" ? "యాప్ ఇన్‌స్టాల్" : "Install App"}</span>
          </button>

          {/* Language Switch Button */}
          <button
            onClick={onToggleLang}
            className="px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-bold transition flex items-center gap-1.5"
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-teal-700" />
            <span>{lang === "te" ? "English" : "తెలుగు"}</span>
          </button>

          {/* Voice Assistant Pill Button */}
          <button
            onClick={onOpenVoice}
            className="px-3 sm:px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-700/20 transition flex items-center gap-1.5 transform hover:scale-102"
            title="Ask GramaMaa by Voice"
          >
            <Mic className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">
              {lang === "te" ? "వాయిస్ సహాయం" : "Voice AI"}
            </span>
          </button>

          {/* Emergency SOS Red Button */}
          <button
            onClick={onOpenEmergency}
            className="px-3 sm:px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md shadow-red-600/30 transition flex items-center gap-1.5 animate-pulse"
            title="Emergency SOS 112"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>SOS 112</span>
          </button>
        </div>
      </div>
    </header>
  );
}
