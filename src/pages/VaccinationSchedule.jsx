import React, { useState, useMemo } from 'react';
import {
  Syringe, CheckCircle2, AlertCircle, Clock, Printer,
  Filter, ShieldCheck, Check, Calendar, Baby, Info,
  ChevronDown, ChevronUp, ChevronRight, Layers, Volume2
} from 'lucide-react';
import { officialVaccineSchedule, NIS_METADATA } from '../data/vaccinationSchedule';
import { calculateChildAge, formatDate, getTodayKey } from '../services/dateUtils';
import ConfirmationModal from '../components/ConfirmationModal';
import SpeechButton from '../components/SpeechButton';

// Milestone definitions strictly ordered chronologically
const chronologicalMilestones = [
  { id: "birth", key: "At Birth", titleEn: "At Birth", titleTe: "పుట్టిన వెంటనే", maxDays: 15 },
  { id: "6w", key: "6 Weeks", titleEn: "6 Weeks (1.5 Months)", titleTe: "6 వారాలు (ఒకటిన్నర నెలలు)", maxDays: 50 },
  { id: "10w", key: "10 Weeks", titleEn: "10 Weeks (2.5 Months)", titleTe: "10 వారాలు (రెండున్నర నెలలు)", maxDays: 80 },
  { id: "14w", key: "14 Weeks", titleEn: "14 Weeks (3.5 Months)", titleTe: "14 వారాలు (మూడున్నర నెలలు)", maxDays: 110 },
  { id: "9m", key: "9-12 Months", titleEn: "9-12 Months", titleTe: "9-12 నెలలు", maxDays: 390 },
  { id: "16m", key: "16-24 Months", titleEn: "16-24 Months (Booster)", titleTe: "16-24 నెలలు (బూస్టర్)", maxDays: 760 },
  { id: "5y", key: "5-6 Years", titleEn: "5-6 Years", titleTe: "5-6 సంవత్సరాలు", maxDays: 2200 }
];

export default function VaccinationSchedule({
  profile,
  completedVaccines = {},
  onToggleVaccine,
  lang = "te"
}) {
  const [filter, setFilter] = useState("all"); // all, upcoming, completed, overdue
  const [openAccordions, setOpenAccordions] = useState({
    "birth": true,
    "6w": true,
    "10w": false,
    "14w": false,
    "9m": false,
    "16m": false,
    "5y": false
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    vaccine: null,
    isMarkingComplete: true
  });
  const [verifiedByInput, setVerifiedByInput] = useState("Mother / ASHA Worker");

  const childAge = calculateChildAge(profile.childDob);
  const childAgeDays = childAge.totalDays;

  // Enhance each vaccine with status
  const enhancedSchedule = useMemo(() => {
    return officialVaccineSchedule.map(v => {
      const isCompleted = !!completedVaccines[v.id];
      let status = "scheduled";

      if (isCompleted) {
        status = "completed";
      } else if (childAgeDays > v.dueAgeDays + 30) {
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
  }, [completedVaccines, childAgeDays]);

  // Group into chronological accordion categories
  const groupedMilestones = useMemo(() => {
    return chronologicalMilestones.map(milestone => {
      const vaccines = enhancedSchedule.filter(v => {
        const matchesGroup = v.ageGroup.toLowerCase().includes(milestone.key.toLowerCase()) ||
          (milestone.id === "9m" && (v.ageGroup.includes("9") || v.ageGroup.includes("12"))) ||
          (milestone.id === "16m" && (v.ageGroup.includes("16") || v.ageGroup.includes("24"))) ||
          (milestone.id === "5y" && (v.ageGroup.includes("5") || v.ageGroup.includes("6")));

        if (!matchesGroup) return false;

        if (filter === "completed") return v.status === "completed";
        if (filter === "overdue") return v.status === "overdue";
        if (filter === "upcoming") return v.status === "scheduled";
        return true;
      });

      const allInMilestone = enhancedSchedule.filter(v => {
        return v.ageGroup.toLowerCase().includes(milestone.key.toLowerCase()) ||
          (milestone.id === "9m" && (v.ageGroup.includes("9") || v.ageGroup.includes("12"))) ||
          (milestone.id === "16m" && (v.ageGroup.includes("16") || v.ageGroup.includes("24"))) ||
          (milestone.id === "5y" && (v.ageGroup.includes("5") || v.ageGroup.includes("6")));
      });

      const totalInMilestone = allInMilestone.length;
      const completedInMilestone = allInMilestone.filter(v => v.status === "completed").length;
      const overdueInMilestone = allInMilestone.filter(v => v.status === "overdue").length;

      return {
        ...milestone,
        vaccines,
        totalCount: totalInMilestone,
        completedCount: completedInMilestone,
        overdueCount: overdueInMilestone,
        percentage: totalInMilestone > 0 ? Math.round((completedInMilestone / totalInMilestone) * 100) : 0
      };
    });
  }, [enhancedSchedule, filter]);

  const completedCount = enhancedSchedule.filter(v => v.status === "completed").length;
  const overdueCount = enhancedSchedule.filter(v => v.status === "overdue").length;
  const totalCount = enhancedSchedule.length;

  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen = {};
    chronologicalMilestones.forEach(m => { allOpen[m.id] = true; });
    setOpenAccordions(allOpen);
  };

  const collapseAll = () => {
    const allClosed = {};
    chronologicalMilestones.forEach(m => { allClosed[m.id] = false; });
    setOpenAccordions(allClosed);
  };

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
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === "te"
              ? `${profile.childNameTe || profile.childName} — టీకాల కాలపట్టిక`
              : `${profile.childName}'s Vaccination Schedule`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 flex items-center gap-2 flex-wrap">
            <span className="font-bold text-teal-800 flex items-center gap-1">
              <Baby className="w-3.5 h-3.5" />
              {lang === "te" ? `వయస్సు: ${childAge.labelTe}` : `Age: ${childAge.labelEn}`}
            </span>
            <span className="text-slate-300">•</span>
            <span>DOB: {formatDate(profile.childDob, lang)}</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
          <SpeechButton
            text={
              lang === "te"
                ? "జాతీయ టీకాల కాలపట్టిక. పుట్టినప్పటి నుండి ఐదేళ్ల వరకు అన్ని టీకాలు ఉచితంగా ప్రభుత్వ ఆసుపత్రిలో వేయబడతాయి."
                : "National immunization schedule. Essential childhood vaccines from birth up to 5 years under the Universal Immunization Programme."
            }
            lang={lang}
            size="sm"
          />

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === "te" ? "టీకా కార్డు ప్రింట్" : "Print Vaccine Card"}</span>
          </button>
        </div>
      </div>

      {/* Immunization Coverage Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-teal-900 rounded-3xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-purple-200 uppercase tracking-wider">
              {lang === "te" ? "మొత్తం టీకాల పురోగతి" : "Universal Immunization Coverage"}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-white">
                {Math.round((completedCount / totalCount) * 100)}%
              </span>
              <span className="text-xs text-purple-200 font-bold">
                ({completedCount} of {totalCount} {lang === "te" ? "డోసులు పూర్తయ్యాయి" : "Doses Completed"})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {overdueCount > 0 && (
              <span className="px-3.5 py-1.5 rounded-xl bg-rose-500/30 text-rose-200 border border-rose-400/40 text-xs font-black animate-pulse">
                ⚠️ {overdueCount} {lang === "te" ? "టీకాలు ఆలస్యమయ్యాయి" : "Overdue Doses"}
              </span>
            )}
            <span className="px-3 py-1.5 rounded-xl bg-white/10 text-white border border-white/20 text-xs font-semibold">
              MoHFW Guidelines
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

      {/* Filter Tabs & Accordion Controls */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", labelEn: "All Doses", labelTe: "అన్నీ", count: totalCount },
            { id: "upcoming", labelEn: "Scheduled", labelTe: "రాబోయేవి", count: totalCount - completedCount - overdueCount },
            { id: "completed", labelEn: "Completed", labelTe: "పూర్తయినవి", count: completedCount },
            { id: "overdue", labelEn: "Overdue", labelTe: "ఆలస్యమైనవి", count: overdueCount }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                filter === tab.id
                  ? "bg-purple-700 text-white shadow-xs"
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

        {/* Expand / Collapse All Buttons */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={expandAll}
            className="text-[11px] font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200 transition"
          >
            {lang === "te" ? "అన్నీ తెరవండి" : "Expand All"}
          </button>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[11px] font-bold text-slate-600 hover:text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg transition"
          >
            {lang === "te" ? "అన్నీ మూసివేయండి" : "Collapse All"}
          </button>
        </div>
      </div>

      {/* CHRONOLOGICAL ACCORDION PANELS */}
      <div className="space-y-4">
        {groupedMilestones.map((milestone) => {
          const isOpen = !!openAccordions[milestone.id];
          const hasVaccines = milestone.vaccines.length > 0;
          const isAllCompleted = milestone.totalCount > 0 && milestone.completedCount === milestone.totalCount;
          const hasOverdue = milestone.overdueCount > 0;

          return (
            <div
              key={milestone.id}
              className={`rounded-3xl border transition-all overflow-hidden shadow-xs bg-white ${
                hasOverdue
                  ? "border-rose-300 ring-1 ring-rose-100"
                  : isAllCompleted
                  ? "border-emerald-300"
                  : "border-slate-200"
              }`}
            >
              {/* Accordion Layer Header */}
              <button
                type="button"
                onClick={() => toggleAccordion(milestone.id)}
                className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition select-none ${
                  isOpen
                    ? "bg-slate-50/90 border-b border-slate-200/80"
                    : "hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-3.5 flex-wrap">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 ${
                    isAllCompleted
                      ? "bg-emerald-100 text-emerald-800"
                      : hasOverdue
                      ? "bg-rose-100 text-rose-700 animate-pulse"
                      : "bg-purple-100 text-purple-800"
                  }`}>
                    {isAllCompleted ? <Check className="w-5 h-5 stroke-3" /> : <Syringe className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {lang === "te" ? milestone.titleTe : milestone.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {lang === "te" ? "భారత ప్రభుత్వ NIS షెడ్యూల్ మైలురాయి" : "Mandatory UIP Childhood Milestone"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* PROGRESS BREAKDOWN BADGE DIRECTLY ON ACCORDION TAB */}
                  <div className="flex flex-col items-end">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border shadow-xs ${
                      isAllCompleted
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : hasOverdue
                        ? "bg-rose-100 text-rose-800 border-rose-300"
                        : "bg-purple-50 text-purple-800 border-purple-200"
                    }`}>
                      {milestone.completedCount} of {milestone.totalCount} {lang === "te" ? "టీకాలు తీసుకున్నారు" : "Taken"} ({milestone.percentage}%)
                    </span>
                    {hasOverdue && (
                      <span className="text-[10px] text-rose-600 font-bold mt-0.5">
                        ⚠️ {milestone.overdueCount} {lang === "te" ? "ఆలస్యమైంది" : "Overdue"}
                      </span>
                    )}
                  </div>

                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Accordion Content Body */}
              {isOpen && (
                <div className="p-4 sm:p-6 space-y-3 bg-slate-50/40">
                  {!hasVaccines ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      {lang === "te" ? "ఈ ఫిల్టర్‌లో టీకాలు ఏవీ లేవు" : "No vaccines matching current filter in this interval"}
                    </div>
                  ) : (
                    milestone.vaccines.map((v) => {
                      const isCompleted = v.status === "completed";
                      const isOverdue = v.status === "overdue";

                      return (
                        <div
                          key={v.id}
                          className={`bg-white rounded-2xl p-4 sm:p-5 border-2 transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            isCompleted
                              ? "border-emerald-300 bg-emerald-50/15"
                              : isOverdue
                              ? "border-rose-300 bg-rose-50/15 ring-1 ring-rose-100"
                              : "border-slate-200"
                          }`}
                        >
                          {/* Left Details */}
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h4 className="font-black text-slate-900 text-base">
                                {v.vaccineName}
                              </h4>
                              <span className="text-xs text-slate-500 font-medium">
                                ({v.vaccineFullName})
                              </span>

                              {/* Status Badge */}
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black inline-flex items-center gap-1 ${
                                isCompleted
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isOverdue
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}>
                                {isCompleted ? <Check className="w-3 h-3 stroke-3" /> : isOverdue ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                {isCompleted
                                  ? (lang === "te" ? "పూర్తయింది (✅)" : "Completed")
                                  : isOverdue
                                  ? (lang === "te" ? "ఆలస్యమైంది (ఆశా ను కలవండి)" : "Overdue")
                                  : (lang === "te" ? "షెడ్యూల్ అయింది" : "Scheduled")}
                              </span>

                              {/* Multilingual Voice Guidance Readout for Vaccine */}
                              <SpeechButton
                                text={
                                  lang === "te"
                                    ? `${v.vaccineName} టీకా. నివారించే వ్యాధి: ${v.preventsTe || v.prevents}. మోతాదు: ${v.dose}. ${v.importance}`
                                    : `${v.vaccineName} vaccine. Prevents ${v.prevents}. Dose: ${v.dose}. ${v.importance}`
                                }
                                lang={lang}
                                size="xs"
                              />
                            </div>

                            <div className="text-xs text-slate-600 space-y-1">
                              <p>
                                <strong className="text-slate-800">{lang === "te" ? "వ్యాధి నివారణ:" : "Prevents:"}</strong>{" "}
                                <span className="text-purple-900 font-bold">{lang === "te" ? v.preventsTe || v.prevents : v.prevents}</span>
                              </p>
                              <p className="text-[11px] text-slate-500">
                                <strong>{lang === "te" ? "మోతాదు & మార్గం:" : "Dose & Route:"}</strong> {v.dose} • {v.route}
                              </p>
                              <p className="text-[11px] text-slate-600 italic">
                                {v.importance}
                              </p>
                            </div>

                            {isCompleted && v.completedInfo && (
                              <p className="text-[11px] text-emerald-800 font-bold flex items-center gap-1.5 pt-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                <span>
                                  {lang === "te"
                                    ? `ఇచ్చిన తేదీ: ${v.completedInfo.completedDate} • ధృవీకరణ: ${v.completedInfo.verifiedBy}`
                                    : `Given on: ${v.completedInfo.completedDate} • Verified by: ${v.completedInfo.verifiedBy}`}
                                </span>
                              </p>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 self-end md:self-center">
                            {isCompleted ? (
                              <button
                                type="button"
                                onClick={() => handleOpenConfirm(v, false)}
                                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-slate-200 transition"
                              >
                                {lang === "te" ? "మార్కింగ్ తీసివేయి" : "Undo Mark"}
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleOpenConfirm(v, true)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 shadow-xs active:scale-95 ${
                                  isOverdue
                                    ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200"
                                    : "bg-teal-700 hover:bg-teal-800 text-white shadow-teal-200"
                                }`}
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>{lang === "te" ? "టీకా వేయించాను (Mark Given)" : "Mark Dose Given"}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-black text-slate-900">
              {confirmModal.isMarkingComplete
                ? (lang === "te" ? "టీకా నమోదు ధృవీకరణ" : "Confirm Vaccination Dose")
                : (lang === "te" ? "మార్కింగ్ తొలగింపు" : "Undo Vaccine Record")}
            </h3>

            <p className="text-xs text-slate-600">
              {confirmModal.isMarkingComplete
                ? (lang === "te"
                  ? `${confirmModal.vaccine.vaccineName} టీకా వేయించారని ధృవీకరిస్తున్నారా?`
                  : `Record that ${confirmModal.vaccine.vaccineName} was given to the child?`)
                : (lang === "te"
                  ? `${confirmModal.vaccine.vaccineName} మార్కింగ్‌ను తీసివేయాలనుకుంటున్నారా?`
                  : `Are you sure you want to reset this dose to scheduled?`)}
            </p>

            {confirmModal.isMarkingComplete && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "ధృవీకరించినవారు (Verified By)" : "Verified By (Health Worker / Caregiver)"}
                </label>
                <input
                  type="text"
                  value={verifiedByInput}
                  onChange={(e) => setVerifiedByInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setConfirmModal({ isOpen: false, vaccine: null, isMarkingComplete: true })}
                className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100"
              >
                {lang === "te" ? "రద్దు" : "Cancel"}
              </button>

              <button
                type="button"
                onClick={handleConfirmToggle}
                className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-black shadow-md shadow-teal-200"
              >
                {lang === "te" ? "ఖరారు చేయండి" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
