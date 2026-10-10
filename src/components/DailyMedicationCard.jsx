import React from 'react';
import {
  Pill, CheckCircle2, XCircle, Clock, AlertCircle,
  ArrowRight, ShieldCheck, Sun, Moon, Sunset
} from 'lucide-react';
import { medicationService } from '../services/medicationService';

export default function DailyMedicationCard({
  medications,
  dailyDoses,
  onUpdateDose,
  onNavigateMedications,
  lang = "te"
}) {
  const todayMeds = medicationService.getTodayStatus(medications, dailyDoses);
  const takenCount = todayMeds.filter(m => m.status === "taken").length;
  const missedCount = todayMeds.filter(m => m.status === "missed").length;
  const totalCount = todayMeds.length;
  const percent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  const getSlotIcon = (slot) => {
    switch (slot) {
      case "morning": return <Sun className="w-4 h-4 text-amber-500" />;
      case "afternoon": return <Sun className="w-4 h-4 text-orange-500" />;
      case "evening": return <Sunset className="w-4 h-4 text-rose-500" />;
      case "night": return <Moon className="w-4 h-4 text-indigo-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-200/80 transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
            <Pill className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === "te" ? "డాక్టర్ సూచించిన నేటి మందులు" : "Today's Prescribed Medicines"}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te"
                ? "రోజువారీ మోతాదు: తీసుకుంటే (✅), మిస్ అయితే (❌) నొక్కండి"
                : "Daily Dosage: Mark Taken (✅) or Missed (❌)"}
            </p>
          </div>
        </div>

        {/* Adherence % badge */}
        <div className="text-right">
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
      <div className="mt-4 bg-slate-100 rounded-full h-2 overflow-hidden flex">
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

      {/* Medicines List */}
      <div className="mt-4 space-y-3">
        {todayMeds.length === 0 ? (
          <div className="p-4 rounded-2xl bg-slate-50 text-center text-xs text-slate-500">
            {lang === "te" ? "ప్రస్తుతం సూచించిన మందులు లేవు" : "No active prescriptions"}
          </div>
        ) : (
          todayMeds.map((med) => {
            const isTaken = med.status === "taken";
            const isMissed = med.status === "missed";
            const isPending = med.status === "pending";

            return (
              <div
                key={med.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
                  isTaken
                    ? "bg-emerald-50/70 border-emerald-300"
                    : isMissed
                    ? "bg-red-50/60 border-red-300"
                    : "bg-slate-50/70 border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Medicine details */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">
                        {lang === "te" ? med.nameTe || med.name : med.name}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold">
                        {getSlotIcon(med.slot)}
                        {lang === "te" ? med.timeLabelTe || med.timeLabel : med.timeLabel}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-teal-800">
                        {lang === "te" ? "మోతాదు:" : "Dosage:"} {med.dosage}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">
                        {lang === "te" ? "డాక్టర్:" : "Dr:"} {med.doctor}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-tight">
                      <strong>{lang === "te" ? "సూచన:" : "Instruction:"}</strong> {lang === "te" ? med.instructionsTe || med.instructions : med.instructions}
                    </p>
                  </div>

                  {/* Tick / Cross Action Buttons */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {/* Mark Taken Button (Tick) */}
                    <button
                      type="button"
                      onClick={() => onUpdateDose(med.id, isTaken ? "pending" : "taken")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isTaken
                          ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400"
                          : "bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300"
                      }`}
                      title={lang === "te" ? "తీసుకున్నాను అని మార్క్ చేయండి" : "Mark as Taken"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{lang === "te" ? "వేసుకున్నాను (✅)" : "Taken (✅)"}</span>
                    </button>

                    {/* Mark Missed Button (Cross) */}
                    <button
                      type="button"
                      onClick={() => onUpdateDose(med.id, isMissed ? "pending" : "missed")}
                      className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                        isMissed
                          ? "bg-red-600 text-white shadow-sm ring-2 ring-red-400"
                          : "bg-white hover:bg-red-50 text-red-600 border border-red-300"
                      }`}
                      title={lang === "te" ? "మిస్ అయ్యారు అని మార్క్ చేయండి" : "Mark as Missed"}
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

      {/* Footer link to full tracker */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
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
