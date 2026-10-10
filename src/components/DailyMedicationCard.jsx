import React, { useState } from 'react';
import {
  Pill, CheckCircle2, XCircle, Clock, AlertCircle,
  ArrowRight, ShieldCheck, Sun, Moon, Sunset, AlertTriangle, ShieldAlert
} from 'lucide-react';
import { medicationService } from '../services/medicationService';
import SpeechButton from './SpeechButton';

export default function DailyMedicationCard({
  medications,
  dailyDoses,
  onUpdateDose,
  onNavigateMedications,
  lang = "te"
}) {
  const [safetyConflictModal, setSafetyConflictModal] = useState(null);
  const todayMeds = medicationService.getTodayStatus(medications, dailyDoses);
  const takenCount = todayMeds.filter(m => m.status === "taken").length;
  const missedCount = todayMeds.filter(m => m.status === "missed").length;
  const totalCount = todayMeds.length;
  const percent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  const isIfaTaken = todayMeds.some(m => (m.name.toLowerCase().includes("ifa") || m.name.toLowerCase().includes("iron")) && m.status === "taken");
  const isCalciumTaken = todayMeds.some(m => m.name.toLowerCase().includes("calcium") && m.status === "taken");

  const getSlotIcon = (slot) => {
    switch (slot) {
      case "morning": return <Sun className="w-4 h-4 text-amber-500" />;
      case "afternoon": return <Sun className="w-4 h-4 text-orange-500" />;
      case "evening": return <Sunset className="w-4 h-4 text-rose-500" />;
      case "night": return <Moon className="w-4 h-4 text-indigo-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const handleDoseClick = (med, targetStatus) => {
    if (targetStatus === "taken") {
      const isIron = med.name.toLowerCase().includes("ifa") || med.name.toLowerCase().includes("iron");
      const isCalcium = med.name.toLowerCase().includes("calcium");

      if (isIron && isCalciumTaken) {
        setSafetyConflictModal({
          medId: med.id,
          name: med.name,
          nameTe: med.nameTe,
          conflicting: "Calcium & Vitamin D3 Tablet"
        });
        return;
      } else if (isCalcium && isIfaTaken) {
        setSafetyConflictModal({
          medId: med.id,
          name: med.name,
          nameTe: med.nameTe,
          conflicting: "IFA (Iron) Tablet"
        });
        return;
      }
    }

    onUpdateDose(med.id, targetStatus);
  };

  const confirmDoseDespiteWarning = () => {
    if (safetyConflictModal && safetyConflictModal.medId) {
      onUpdateDose(safetyConflictModal.medId, "taken");
    }
    setSafetyConflictModal(null);
  };

  const getSafetyNote = (name) => {
    const l = name.toLowerCase();
    if (l.includes("ifa") || l.includes("iron")) {
      return {
        en: "Do NOT take with milk or calcium. Keep 2-hr gap. Take at night.",
        te: "పాల లేదా క్యాల్షియంతో వేసుకోవద్దు. కనీసం 2 గంటల వ్యవధి పాటించండి."
      };
    }
    if (l.includes("calcium")) {
      return {
        en: "Take after lunch. Keep 2-hr gap with Iron.",
        te: "మధ్యాహ్న భోజనం తర్వాత వేసుకోండి. ఐరన్‌తో 2 గంటల గ్యాప్ ఉంచండి."
      };
    }
    return {
      en: "Take with plain water after food.",
      te: "భోజనం తర్వాత మంచి నీటితో వేసుకోండి."
    };
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 transition hover:shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shrink-0">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {lang === "te" ? "డాక్టర్ సూచించిన నేటి మందులు" : "Today's Prescribed Medicines"}
              </h3>
              <SpeechButton
                text={
                  lang === "te"
                    ? "డాక్టర్ సూచించిన నేటి మందులు. వేసుకున్నట్లు లేదా మిస్ అయినట్లు నమోదు చేయండి."
                    : "Today's prescribed medicines. Mark doses taken or missed."
                }
                lang={lang}
                size="xs"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te"
                ? "రోజువారీ మోతాదు: తీసుకుంటే (✅), మిస్ అయితే (❌) నొక్కండి"
                : "Daily Dosage: Mark Taken (✅) or Missed (❌)"}
            </p>
          </div>
        </div>

        {/* Adherence % badge */}
        <div className="text-right shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{percent}% {lang === "te" ? "పూర్తయింది" : "Completed"}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {takenCount} / {totalCount} {lang === "te" ? "డోసులు" : "Doses"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-100 rounded-full h-2 overflow-hidden flex">
        <div
          className="bg-teal-600 h-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
        {missedCount > 0 && (
          <div
            className="bg-red-400 h-full transition-all duration-300"
            style={{ width: `${(missedCount / totalCount) * 100}%` }}
          ></div>
        )}
      </div>

      {/* Inline gentle orange safety alert banner if both Iron & Calcium marked */}
      {isIfaTaken && isCalciumTaken && (
        <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs flex items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="font-bold">
              {lang === "te"
                ? "భద్రతా హెచ్చరిక: ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి."
                : "Safety Alert: Space Iron and Calcium tablets by at least 2 hours to ensure maximum absorption."}
            </span>
          </div>
          <SpeechButton
            text={
              lang === "te"
                ? "భద్రతా హెచ్చరిక: ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి."
                : "Safety Alert: Space Iron and Calcium tablets by at least 2 hours to ensure maximum absorption."
            }
            lang={lang}
            size="xs"
          />
        </div>
      )}

      {/* Medicines List */}
      <div className="space-y-3">
        {todayMeds.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
            {lang === "te" ? "ప్రస్తుతం సూచించిన మందులు లేవు" : "No active prescriptions"}
          </div>
        ) : (
          todayMeds.map((med) => {
            const isTaken = med.status === "taken";
            const isMissed = med.status === "missed";
            const note = getSafetyNote(med.name);

            return (
              <div
                key={med.id}
                className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all ${
                  isTaken
                    ? "bg-emerald-50/70 border-emerald-300"
                    : isMissed
                    ? "bg-red-50/60 border-red-300"
                    : "bg-slate-50/70 border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Medicine details */}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-slate-900 text-sm">
                        {lang === "te" ? med.nameTe || med.name : med.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-bold">
                        {getSlotIcon(med.slot)}
                        {lang === "te" ? med.timeLabelTe || med.timeLabel : med.timeLabel}
                      </span>
                    </div>

                    {/* Dedicated Micro Safety Box */}
                    <div className="p-2 rounded-xl bg-amber-50/80 border border-amber-300 text-[11px] text-amber-950 font-semibold flex items-center justify-between gap-2">
                      <span className="flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        {lang === "te" ? note.te : note.en}
                      </span>
                      <SpeechButton
                        text={lang === "te" ? note.te : note.en}
                        lang={lang}
                        size="xs"
                      />
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-teal-800">
                        {lang === "te" ? "మోతాదు:" : "Dosage:"} {med.dosage}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">
                        {lang === "te" ? "డాక్టర్:" : "Dr:"} {med.doctor}
                      </span>
                    </div>
                  </div>

                  {/* Tick / Cross Action Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {/* Mark Taken Button (Tick) */}
                    <button
                      type="button"
                      onClick={() => handleDoseClick(med, isTaken ? "pending" : "taken")}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 ${
                        isTaken
                          ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400"
                          : "bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-300"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === "te" ? "వేసుకున్నాను (✅)" : "Taken (✅)"}</span>
                    </button>

                    {/* Mark Missed Button (Cross) */}
                    <button
                      type="button"
                      onClick={() => handleDoseClick(med, isMissed ? "pending" : "missed")}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition active:scale-95 ${
                        isMissed
                          ? "bg-red-600 text-white shadow-sm ring-2 ring-red-400"
                          : "bg-white hover:bg-red-50 text-red-600 border-2 border-red-300"
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      <span>{lang === "te" ? "మిస్ అయింది (❌)" : "Missed (❌)"}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Safety Intercept Modal */}
      {safetyConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border-4 border-amber-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-600 animate-pulse" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                {lang === "te" ? "భద్రతా హెచ్చరిక: ఔషధ పరస్పర చర్య" : "Safety Alert: Drug Interaction"}
              </h3>
            </div>

            <p className="text-xs text-amber-950 font-semibold leading-relaxed">
              {lang === "te"
                ? "దయచేసి ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి. క్యాల్షియం మీ శరీరం ఐరన్ పీల్చుకోకుండా అడ్డుకుంటుంది."
                : "Safety Alert: Please space Iron and Calcium tablets by at least 2 hours. Calcium prevents your body from absorbing the critical Iron it needs."}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSafetyConflictModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-black"
              >
                {lang === "te" ? "సరే, వ్యవధి పాటిస్తాను" : "Acknowledge"}
              </button>
              <button
                type="button"
                onClick={confirmDoseDespiteWarning}
                className="px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
              >
                {lang === "te" ? "మార్క్ చేయి" : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer link to full tracker */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
          {lang === "te" ? "డాక్టర్ సూచించిన మోతాదునే పాటించండి" : "Take exact prescribed dosage"}
        </span>

        <button
          onClick={onNavigateMedications}
          className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 group"
        >
          <span>{lang === "te" ? "మొత్తం ప్రిస్క్రిప్షన్లు & రికార్డు" : "View Full Adherence Log"}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
