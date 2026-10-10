import React, { useState, useEffect } from 'react';
import { HardDrive, Wifi, WifiOff } from 'lucide-react';

export default function OfflineBadge({ lang = "te" }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-medium shadow-xs">
      <HardDrive className="w-3.5 h-3.5 text-teal-600 shrink-0" />
      <span>
        {lang === "te"
          ? "ఫోన్ లో భద్రంగా సేవ్ చేయబడింది (ఆఫ్‌లైన్ లో పనిచేస్తుంది)"
          : "Saved locally on device (Offline ready)"}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
      {isOnline ? (
        <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
          <Wifi className="w-3 h-3" /> {lang === "te" ? "ఆన్‌లైన్" : "Online"}
        </span>
      ) : (
        <span className="flex items-center gap-1 text-[11px] text-amber-700 font-semibold">
          <WifiOff className="w-3 h-3" /> {lang === "te" ? "ఆఫ్‌లైన్ మోడ్" : "Offline Mode"}
        </span>
      )}
    </div>
  );
}
