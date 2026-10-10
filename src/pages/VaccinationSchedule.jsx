import React, { useState } from 'react';
import {
  Syringe, CheckCircle2, AlertCircle, Clock, Printer,
  Filter, ShieldCheck, Check, Calendar, Baby, Info
} from 'lucide-react';
import { officialVaccineSchedule, NIS_METADATA } from '../data/vaccinationSchedule';
import { calculateChildAge, formatDate, getTodayKey } from '../services/dateUtils';
import ConfirmationModal from '../components/ConfirmationModal';

export default function VaccinationSchedule({
  profile,
  completedVaccines,
  onToggleVaccine,
  lang = "te"
}) {
  const [filter, setFilter] = useState("all"); // all, upcoming, completed, overdue
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    vaccine: null,
    isMarkingComplete: true
  });
  const [verifiedByInput, setVerifiedByInput] = useState("Mother / Caregiver");

  const childAge = calculateChildAge(profile.childDob);
  const childAgeDays = childAge.totalDays;

  // Enhance each vaccine with calculated status based on child age in days
  const enhancedSchedule = officialVaccineSchedule.map(v => {
    const isCompleted = !!completedVaccines[v.id];
    let status = "scheduled"; // scheduled, completed, overdue

    if (isCompleted) {
      status = "completed";
    } else if (childAgeDays > v.dueAgeDays + 30) {
      // Overdue if more than 30 days past due age
      status = "overdue";
    } else {
      status = "scheduled";
    }

    return {
      ...v,
      status,
      completedInfo: completedVaccines[v.id] || null
    };
  });

  const filteredSchedule = enhancedSchedule.filter(v => {
    if (filter === "completed") return v.status === "completed";
    if (filter === "overdue") return v.status === "overdue";
    if (filter === "upcoming") return v.status === "scheduled";
    return true;
  });

  const completedCount = enhancedSchedule.filter(v => v.status === "completed").length;
  const overdueCount = enhancedSchedule.filter(v => v.status === "overdue").length;
  const totalCount = enhancedSchedule.length;

  const handleOpenConfirm = (vaccine, isMarkingComplete) => {
    setConfirmModal({
      isOpen: true,
      vaccine,
      isMarkingComplete
    });
  };

  const handleConfirmToggle = () => {
    if (confirmModal.vaccine) {
      if (confirmModal.isMarkingComplete) {
        onToggleVaccine(confirmModal.vaccine.id, {
          completedDate: getTodayKey(),
          verifiedBy: verifiedByInput
        });
      } else {
        onToggleVaccine(confirmModal.vaccine.id, null);
      }
    }
    setConfirmModal({ isOpen: false, vaccine: null, isMarkingComplete: true });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
            <Syringe className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "భారత జాతీయ ఇమ్యునైజేషన్ షెడ్యూల్ (NIS)" : "National Immunization Schedule (NIS India)"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te"
              ? `${profile.childNameTe || profile.childName} — టీకాల కాలపట్టిక`
              : `${profile.childName}'s Vaccination Schedule`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-teal-800 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5" />
              {lang === "te" ? `వయస్సు: ${childAge.labelTe}` : `Age: ${childAge.labelEn}`}
            </span>
            <span className="text-slate-300">•</span>
            <span>DOB: {formatDate(profile.childDob, lang)}</span>
          </p>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>{lang === "te" ? "టీకా కార్డు ప్రింట్" : "Print Vaccine Card"}</span>
        </button>
      </div>

      {/* Immunization Progress Bar */}
      <div className="bg-gradient-to-r from-purple-900 to-teal-900 rounded-3xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-purple-200 uppercase">
              {lang === "te" ? "టీకాల పురోగతి" : "Immunization Coverage"}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
              <span className="text-xs text-purple-200">
                ({completedCount} of {totalCount} {lang === "te" ? "టీకాలు వేయించారు" : "Doses Completed"})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {overdueCount > 0 && (
              <span className="px-3 py-1 rounded-xl bg-rose-500/30 text-rose-200 border border-rose-400/40 text-xs font-bold animate-pulse">
                ⚠️ {overdueCount} {lang === "te" ? "టీకాలు ఆలస్యమయ్యాయి" : "Overdue"}
              </span>
            )}
            <span className="px-3 py-1 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-semibold">
              UIP MoHFW Guidelines
            </span>
          </div>
        </div>

        <div className="mt-4 bg-white/20 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-emerald-400 h-full transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
        <div className="flex gap-1.5 shrink-0">
          {[
            { id: "all", labelEn: "All Doses", labelTe: "అన్ని టీకాలు", count: totalCount },
            { id: "upcoming", labelEn: "Scheduled", labelTe: "రాబోయేవి", count: totalCount - completedCount - overdueCount },
            { id: "completed", labelEn: "Completed", labelTe: "పూర్తయినవి", count: completedCount },
            { id: "overdue", labelEn: "Overdue", labelTe: "ఆలస్యమైనవి", count: overdueCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center gap-1.5 ${
                filter === tab.id
                  ? "bg-purple-700 text-white shadow-sm"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
              }`}
            >
              <span>{lang === "te" ? tab.labelTe : tab.labelEn}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                filter === tab.id ? "bg-white/25 text-white" : "bg-slate-200 text-slate-700"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Vaccines Timeline Cards */}
      <div className="space-y-3">
        {filteredSchedule.map((v) => {
          const isCompleted = v.status === "completed";
          const isOverdue = v.status === "overdue";

          return (
            <div
              key={v.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isCompleted
                  ? "border-emerald-300 bg-emerald-50/20"
                  : isOverdue
                  ? "border-rose-300 bg-rose-50/20 ring-1 ring-rose-100"
                  : "border-slate-200"
              }`}
            >
              {/* Left Details */}
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {lang === "te" ? v.ageGroupTe : v.ageGroup}
                  </span>

                  <h3 className="font-bold text-slate-900 text-base">
                    {v.vaccineName}
                  </h3>

                  {/* Status Badge */}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${
                    isCompleted
                      ? "bg-emerald-100 text-emerald-800"
                      : isOverdue
                      ? "bg-rose-100 text-rose-800"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3" /> : isOverdue ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {isCompleted
                      ? (lang === "te" ? "పూర్తయింది (✅)" : "Completed")
                      : isOverdue
                      ? (lang === "te" ? "ఆలస్యమైంది (ఆశా తో మాట్లాడండి)" : "Overdue")
                      : (lang === "te" ? "రాబోయే తేదీ" : "Scheduled")}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p>
                    <strong className="text-slate-800">{lang === "te" ? "వ్యాధి నివారణ:" : "Prevents:"}</strong>{" "}
                    <span className="text-teal-900 font-medium">{lang === "te" ? v.preventsTe : v.prevents}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    <strong>{lang === "te" ? "మోతాదు & మార్గం:" : "Dose & Route:"}</strong> {v.dose} • {v.route}
                  </p>
                </div>

                {isCompleted && v.completedInfo && (
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {lang === "te"
                        ? `పూర్తయిన తేదీ: ${v.completedInfo.completedDate} • ధృవీకరించినవారు: ${v.completedInfo.verifiedBy}`
                        : `Given on: ${v.completedInfo.completedDate} • Verified by: ${v.completedInfo.verifiedBy}`}
                    </span>
                  </p>
                )}
              </div>

              {/* Action Button */}
              <div className="shrink-0 self-end md:self-center">
                {isCompleted ? (
                  <button
                    onClick={() => handleOpenConfirm(v, false)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
                  >
                    {lang === "te" ? "మార్కింగ్ తొలగించు" : "Undo Mark"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenConfirm(v, true)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
                      isOverdue
                        ? "bg-rose-600 hover:bg-rose-700 text-white"
                        : "bg-teal-700 hover:bg-teal-800 text-white"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{lang === "te" ? "టీకా వేయించాను అని నమోదు చేయండి" : "Mark Dose Given"}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MoHFW Attribution Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 text-slate-600 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-slate-800">
            {lang === "te" ? NIS_METADATA.source : NIS_METADATA.source} ({NIS_METADATA.program})
          </p>
          <p className="text-[11px] leading-relaxed">
            {lang === "te" ? NIS_METADATA.disclaimerTe : NIS_METADATA.disclaimer}
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={
          confirmModal.isMarkingComplete
            ? (lang === "te" ? "టీకా పూర్తయినట్లు ధృవీకరించండి" : "Confirm Vaccine Completion")
            : (lang === "te" ? "రికార్డును రీసెట్ చేయాలా?" : "Reset Vaccine Record?")
        }
        message={
          confirmModal.isMarkingComplete
            ? (lang === "te"
              ? `మీరు ${confirmModal.vaccine?.vaccineName} టీకా వేయించినట్లు నిర్ధారిస్తున్నారు. ఆశా కార్యకర్త లేదా డాక్టర్ సమక్షంలో మాత్రమే మార్క్ చేయండి.`
              : `Confirm that ${confirmModal.vaccine?.vaccineName} was administered to ${profile.childName}.`)
            : (lang === "te"
              ? `ఈ టీకా పూర్తయిన స్టేటస్‌ని తీసివేయాలనుకుంటున్నారా?`
              : `Remove completion mark for this vaccine?`)
        }
        confirmText={lang === "te" ? "నిర్ధారించండి" : "Confirm"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        onConfirm={handleConfirmToggle}
        onCancel={() => setConfirmModal({ isOpen: false, vaccine: null, isMarkingComplete: true })}
      />
    </div>
  );
}
