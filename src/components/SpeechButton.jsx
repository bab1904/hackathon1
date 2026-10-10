import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { voiceService } from '../services/voiceService';

export default function SpeechButton({
  text,
  lang = "te",
  size = "sm",
  className = "",
  label = null
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      // cancel speech on unmount if playing
      if (isPlaying) {
        voiceService.stopSpeaking();
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isPlaying) {
      voiceService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      voiceService.speak(text, lang, () => {
        setIsPlaying(false);
      });
    }
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  return (
    <button
      type="button"
      onClick={handleTogglePlay}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 select-none ${
        isPlaying
          ? "bg-teal-700 text-white ring-2 ring-teal-400/40 shadow-xs scale-105"
          : "bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-800 border border-slate-200/80 hover:border-teal-300"
      } ${size === "xs" ? "p-1 text-[10px]" : size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-xs"} ${className}`}
      title={
        isPlaying
          ? (lang === "te" ? "ఆపండి" : "Stop speaking")
          : (lang === "te" ? "వినండి (చదవబడుతుంది)" : "Listen out loud")
      }
      aria-label="Read instruction aloud"
    >
      {isPlaying ? (
        <>
          <VolumeX className={`${iconSizes[size] || "w-3.5 h-3.5"} text-teal-200 animate-pulse`} />
          <span className="flex items-center gap-0.5">
            <span className="w-1 h-2.5 bg-teal-200 rounded-full animate-bounce"></span>
            <span className="w-1 h-3.5 bg-white rounded-full animate-bounce delay-75"></span>
            <span className="w-1 h-2 bg-teal-200 rounded-full animate-bounce delay-150"></span>
          </span>
          <span className="font-bold text-[10.5px]">
            {lang === "te" ? "వింటున్నారు..." : "Speaking..."}
          </span>
        </>
      ) : (
        <>
          <Volume2 className={`${iconSizes[size] || "w-3.5 h-3.5"} text-teal-700`} />
          {label && <span className="font-semibold">{label}</span>}
        </>
      )}
    </button>
  );
}
