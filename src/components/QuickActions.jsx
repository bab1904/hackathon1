import React from 'react';
import {
  Mic, Pill, Building2, Calendar, Syringe,
  AlertOctagon, Heart, Utensils, FileText
} from 'lucide-react';

export default function QuickActions({
  onActionClick,
  onOpenVoice,
  lang = "te"
}) {
  const actions = [
    {
      id: "voice",
      title: lang === "te" ? "వాయిస్ తో మాట్లాడండి" : "Ask by Voice",
      desc: lang === "te" ? "తెలుగు లేదా ఇంగ్లీష్ లో మాట్లాడండి" : "Speak in Telugu or English",
      icon: Mic,
      color: "from-teal-600 to-teal-800 text-white",
      isSpecial: true
    },
    {
      id: "medications",
      title: lang === "te" ? "రోజువారీ మందులు" : "Daily Medicines",
      desc: lang === "te" ? "మోతాదు లాగ్ (✅ / ❌)" : "Dose Tracker (✅ / ❌)",
      icon: Pill,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200"
    },
    {
      id: "hospitals",
      title: lang === "te" ? "దగ్గరి ఆసుపత్రులు" : "Nearby Hospitals",
      desc: lang === "te" ? "24/7 డెలివరీ & గైనకాలజిస్టులు" : "24/7 Delivery & Doctors",
      icon: Building2,
      color: "bg-blue-50 text-blue-800 border-blue-200"
    },
    {
      id: "emergency",
      title: lang === "te" ? "అత్యవసర సహాయం (112)" : "Emergency SOS (112)",
      desc: lang === "te" ? "1-ట్యాప్ తో 112 & కుటుంబ సభ్యులకు కాల్" : "1-Tap 112 & Family Call",
      icon: AlertOctagon,
      color: "bg-red-50 text-red-800 border-red-200"
    },
    {
      id: "appointments",
      title: lang === "te" ? "తర్వాతి చెకప్" : "Next Checkup",
      desc: lang === "te" ? "డాక్టర్ పరీక్షల తేదీలు" : "ANC Visit & Scan Dates",
      icon: Calendar,
      color: "bg-amber-50 text-amber-800 border-amber-200"
    },
    {
      id: "vaccination",
      title: lang === "te" ? "బిడ్డ టీకాలు" : "Baby Vaccines",
      desc: lang === "te" ? "అధికారిక భారత NIS షెడ్యూల్" : "Official Indian NIS Plan",
      icon: Syringe,
      color: "bg-purple-50 text-purple-800 border-purple-200"
    },
    {
      id: "breastfeeding",
      title: lang === "te" ? "తల్లిపాల సంరక్షణ" : "Breastfeeding Help",
      desc: lang === "te" ? "లాచ్ & నొప్పి నివారణ" : "Latch Guide & Solutions",
      icon: Heart,
      color: "bg-rose-50 text-rose-800 border-rose-200"
    },
    {
      id: "child-nutrition",
      title: lang === "te" ? "పిల్లల ఆహారం & పెరుగుదల" : "Child Nutrition & Growth",
      desc: lang === "te" ? "రాగి జావ, కిచిడీ, బరువు చార్ట్" : "Soft Solids & Growth Chart",
      icon: Utensils,
      color: "bg-orange-50 text-orange-800 border-orange-200"
    },
    {
      id: "records",
      title: lang === "te" ? "వైద్య రిపోర్టులు" : "Medical Records",
      desc: lang === "te" ? "స్కాన్లు & ప్రిస్క్రిప్షన్లు దాచండి" : "Save Prescriptions & Scans",
      icon: FileText,
      color: "bg-slate-50 text-slate-800 border-slate-200"
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          {lang === "te" ? "త్వరిత సేవలు (ఒక్క ట్యాప్‌తో)" : "Quick Actions (One-Tap Access)"}
        </h2>
        <span className="text-xs text-slate-400 font-medium">
          {lang === "te" ? "సులభమైన నావిగేషన్" : "Direct Short-cuts"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          const isVoice = act.id === "voice";

          return (
            <button
              key={act.id}
              onClick={() => (isVoice ? onOpenVoice() : onActionClick(act.id))}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between ${
                isVoice
                  ? "bg-gradient-to-br from-teal-700 to-teal-900 text-white shadow-md shadow-teal-700/20 col-span-2 sm:col-span-1"
                  : `${act.color} hover:bg-white`
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${isVoice ? "bg-white/20 text-white" : "bg-white shadow-xs"}`}>
                  <Icon className={`w-5 h-5 ${isVoice ? "animate-pulse" : ""}`} />
                </div>
                {isVoice && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/25 uppercase tracking-wide">
                    Live Mic
                  </span>
                )}
              </div>

              <div>
                <h3 className={`font-bold text-sm leading-tight ${isVoice ? "text-white" : "text-slate-900"}`}>
                  {act.title}
                </h3>
                <p className={`text-xs mt-1 ${isVoice ? "text-teal-100" : "text-slate-500"}`}>
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
