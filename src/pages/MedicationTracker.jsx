import React, { useState } from 'react';
import {
  Pill, CheckCircle2, XCircle, Plus, Calendar, Clock,
  ShieldAlert, AlertCircle, Sun, Moon, Sunset, Trash2,
  Check, X, FileText, ChevronRight, AlertTriangle, Info, Volume2
} from 'lucide-react';
import { medicationService } from '../services/medicationService';
import { getTodayKey, formatDate } from '../services/dateUtils';
import SpeechButton from '../components/SpeechButton';

export default function MedicationTracker({
  medications = [],
  dailyDoses = {},
  onUpdateDose,
  onAddPrescription,
  onDeletePrescription,
  lang = "te"
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayKey());
  const [safetyConflictModal, setSafetyConflictModal] = useState(null); // { triggeringMed, otherMed }
  const [showInlineSafetyBanner, setShowInlineSafetyBanner] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    nameTe: "",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    hospital: "Community Health Centre (CHC)",
    dosage: "1 Tablet",
    slot: "night",
    timeLabel: "Night (After Dinner)",
    timeLabelTe: "రాత్రి (భోజనం తర్వాత)",
    instructions: "Take with plain water after food.",
    instructionsTe: "భోజనం తర్వాత మంచి నీళ్లతో వేసుకోండి.",
    purpose: "Antenatal nutritional support",
    purposeTe: "గర్భధారణ పోషకాహార మద్దతు"
  });

  const adherence = medicationService.calculateAdherence(medications, dailyDoses, 7);
  const activeMeds = medications.filter(m => m.active);
  const todayLogs = (dailyDoses && dailyDoses[getTodayKey()]) || {};

  // Check if both IFA and Calcium are marked taken
  const isIfaTaken = activeMeds.some(m => m.name.toLowerCase().includes("ifa") || m.name.toLowerCase().includes("iron")) &&
    activeMeds.some(m => (m.name.toLowerCase().includes("ifa") || m.name.toLowerCase().includes("iron")) && todayLogs[m.id] === "taken");

  const isCalciumTaken = activeMeds.some(m => m.name.toLowerCase().includes("calcium")) &&
    activeMeds.some(m => m.name.toLowerCase().includes("calcium") && todayLogs[m.id] === "taken");

  const getSlotDetails = (slot) => {
    switch (slot) {
      case "morning":
        return {
          icon: Sun,
          color: "text-amber-500",
          label: lang === "te" ? "ఉదయం (టిఫిన్ తర్వాత)" : "Morning (Breakfast)"
        };
      case "afternoon":
        return {
          icon: Sun,
          color: "text-orange-500",
          label: lang === "te" ? "మధ్యాహ్నం (భోజనం తర్వాత)" : "Afternoon (Lunch)"
        };
      case "evening":
        return {
          icon: Sunset,
          color: "text-rose-500",
          label: lang === "te" ? "సాయంత్రం (స్నాక్స్)" : "Evening (Snack)"
        };
      case "night":
        return {
          icon: Moon,
          color: "text-indigo-500",
          label: lang === "te" ? "రాత్రి (డిన్నర్ తర్వాత)" : "Night (Dinner)"
        };
      default:
        return {
          icon: Clock,
          color: "text-slate-500",
          label: lang === "te" ? "సమయం" : "Scheduled Time"
        };
    }
  };

  // Hardcoded validation rules: If a user clicks "Taken" on both IFA and Calcium
  const handleDoseClick = (med, targetStatus) => {
    if (targetStatus === "taken") {
      const isIron = med.name.toLowerCase().includes("ifa") || med.name.toLowerCase().includes("iron");
      const isCalcium = med.name.toLowerCase().includes("calcium");

      if (isIron && isCalciumTaken) {
        // Intercept with Safety Alert Modal and show inline banner
        setSafetyConflictModal({
          triggeringMed: med.name,
          triggeringMedTe: med.nameTe,
          conflictingMed: "Calcium & Vitamin D3 Tablet",
          pendingMedId: med.id
        });
        setShowInlineSafetyBanner(true);
        return;
      } else if (isCalcium && isIfaTaken) {
        setSafetyConflictModal({
          triggeringMed: med.name,
          triggeringMedTe: med.nameTe,
          conflictingMed: "IFA (Iron & Folic Acid) Tablet",
          pendingMedId: med.id
        });
        setShowInlineSafetyBanner(true);
        return;
      }
    }

    onUpdateDose(med.id, targetStatus);
  };

  const confirmConflictDose = () => {
    if (safetyConflictModal && safetyConflictModal.pendingMedId) {
      onUpdateDose(safetyConflictModal.pendingMedId, "taken");
    }
    setSafetyConflictModal(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const newMed = {
      id: `med-${Date.now()}`,
      ...formData,
      active: true,
      startDate: getTodayKey(),
      totalDays: 180
    };

    onAddPrescription(newMed);
    setShowAddModal(false);
  };

  // Specific drug-interaction rules for dedicated Safety Alert Boxes
  const getDrugSafetyRule = (medName) => {
    const lower = medName.toLowerCase();
    if (lower.includes("ifa") || lower.includes("iron")) {
      return {
        ruleEn: "CRITICAL SAFETY RULE: Never take with milk, tea, coffee, or calcium tablets. Calcium blocks iron absorption. Space tablets by at least 2 hours. Take at night with water or lemon juice.",
        ruleTe: "ముఖ్య భద్రతా నియమం: పాలు, టీ, కాఫీ లేదా క్యాల్షియం మాత్రలతో కలిపి ఎప్పుడూ వేసుకోవద్దు. క్యాల్షియం ఐరన్‌ను శరీరం గ్రహించకుండా అడ్డుకుంటుంది. కనీసం 2 గంటల వ్యవధి పాటించండి."
      };
    }
    if (lower.includes("calcium")) {
      return {
        ruleEn: "CRITICAL SAFETY RULE: Take after lunch. Never take simultaneously with Iron (IFA). Keep a mandatory 2-hour gap between Calcium and Iron to prevent severe absorption blockage.",
        ruleTe: "ముఖ్య భద్రతా నియమం: మధ్యాహ్న భోజనం తర్వాత వేసుకోండి. ఐరన్ (IFA) తో కలిపి అస్సలు వేసుకోవద్దు. రక్తహీనత నివారణకు ఈ రెండు మాత్రల మధ్య 2 గంటల వ్యవధి తప్పనిసరి."
      };
    }
    if (lower.includes("folic acid")) {
      return {
        ruleEn: "CRITICAL SAFETY RULE: Take in the morning with plain water. Essential during the first trimester to prevent baby's spinal and brain neural tube anomalies.",
        ruleTe: "ముఖ్య భద్రతా నియమం: ప్రతి ఉదయం అల్పాహారం తర్వాత నీటితో వేసుకోండి. శిశువు వెన్నుపాము మరియు మెదడు లోపాలను నివారించడానికి ఇది అత్యంత కీలకం."
      };
    }
    return {
      ruleEn: "SAFETY NOTICE: Take exactly as prescribed by your doctor with plain water. Do not skip or alter dosage.",
      ruleTe: "భద్రతా సూచన: డాక్టర్ సూచించిన మోతాదులోనే క్రమం తప్పకుండా నీటితో వేసుకోండి. డాక్టర్‌ని సంప్రదించకుండా ఆపవద్దు."
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <Pill className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "ప్రిస్క్రిప్షన్ ఆధారిత మోతాదు ట్రాకర్" : "Doctor-Prescribed Dosage Tracker"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === "te" ? "డాక్టర్ సూచించిన మందులు & రోజువారీ లాగ్" : "Doctor Prescribed Medicines & Daily Log"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {lang === "te"
              ? "డాక్టర్ రాసిన ప్రిస్క్రిప్షన్ ప్రకారమే మందులు వేసుకోవాలి. నేటి డోస్ తీసుకున్నారా (✅) లేదా మిస్ అయ్యారా (❌) నమోదు చేయండి."
              : "Track maternal medications strictly as prescribed. Review hardcoded clinical interaction rules and mark daily adherence."}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "te" ? "కొత్త మందును చేర్చండి" : "Add Prescription"}</span>
        </button>
      </div>

      {/* GENTLE ORANGE INLINE SAFETY ALERT BANNER IF BOTH IRON & CALCIUM ACTIVE */}
      {(showInlineSafetyBanner || (isIfaTaken && isCalciumTaken)) && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/15 border-2 border-amber-500 text-amber-950 shadow-md flex items-start justify-between gap-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  {lang === "te" ? "ఔషధ పరస్పర చర్య హెచ్చరిక" : "Drug Interaction Alert"}
                </span>
                <span className="text-[11px] font-bold text-amber-800">
                  {lang === "te" ? "ఐరన్ ↔ క్యాల్షియం" : "Iron ↔ Calcium"}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-black text-amber-950">
                {lang === "te"
                  ? "భద్రతా హెచ్చరిక: ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి."
                  : "Safety Alert: Space Iron and Calcium tablets by at least 2 hours to ensure maximum absorption."}
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed font-medium">
                {lang === "te"
                  ? "క్యాల్షియం మీ శరీరం రక్తహీనతను నివారించే ఐరన్‌ను పీల్చుకోకుండా నిరోధిస్తుంది. ఐరన్ రాత్రికి, క్యాల్షియం మధ్యాహ్నం వేసుకోవాలి."
                  : "Calcium binds with iron in the gut and prevents maternal hemoglobin absorption. Take Calcium after lunch, and Iron after dinner."}
              </p>
            </div>
          </div>

          <SpeechButton
            text={
              lang === "te"
                ? "భద్రతా హెచ్చరిక: ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి. క్యాల్షియం మీ శరీరం ఐరన్ పీల్చుకోకుండా అడ్డుకుంటుంది."
                : "Safety Alert: Please space Iron and Calcium tablets by at least 2 hours. Calcium prevents your body from absorbing the critical Iron it needs."
            }
            lang={lang}
            size="sm"
          />
        </div>
      )}

      {/* Compliance / 7-Day Streak Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-3xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-teal-200">
              {lang === "te" ? "గత 7 రోజుల మందుల క్రమశిక్షణ రికార్డు" : "7-Day Medication Adherence Record"}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-black text-white">{adherence.percentage}%</span>
              <span className="text-xs text-teal-200">
                ({adherence.takenCount} / {adherence.totalCount} {lang === "te" ? "డోసులు తీసుకున్నారు" : "Doses Taken"})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
              🔥 {adherence.streak} {lang === "te" ? "రోజుల స్ట్రీక్" : "Days Streak"}
            </span>
          </div>
        </div>

        {/* 7-Day Day-by-Day Icons */}
        <div className="mt-5 grid grid-cols-7 gap-2">
          {adherence.days.map((day, i) => {
            const isCompleted = day.status === "completed";
            const isMissed = day.status === "missed";
            const isToday = i === 6;

            return (
              <div
                key={day.dateKey}
                className={`p-2 sm:p-2.5 rounded-2xl text-center border transition ${
                  isToday
                    ? "bg-white/20 border-white/40 ring-2 ring-teal-400"
                    : "bg-white/10 border-white/15"
                }`}
              >
                <p className="text-[10px] text-teal-200 uppercase font-semibold">{day.dayName}</p>
                <p className="text-xs font-bold my-1">{day.dateNumber}</p>
                <div className="flex justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isMissed ? (
                    <XCircle className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-amber-300" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ACTIVE PRESCRIPTIONS - TODAY'S STATUS & DEDICATED HIGH-CONTRAST SAFETY ALERT BOX */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === "te" ? "నేటి మందుల మోతాదుల రికార్డు (ఈరోజు)" : "Today's Dosage Status & Prescriptions"}
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            {formatDate(getTodayKey(), lang)}
          </span>
        </div>

        <div className="space-y-4">
          {activeMeds.map((med) => {
            const currentStatus = todayLogs[med.id] || "pending";
            const isTaken = currentStatus === "taken";
            const isMissed = currentStatus === "missed";
            const slotInfo = getSlotDetails(med.slot);
            const SlotIcon = slotInfo.icon;
            const safetyRule = getDrugSafetyRule(med.name);

            return (
              <div
                key={med.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-xs ${
                  isTaken
                    ? "border-emerald-400 ring-2 ring-emerald-50 bg-emerald-50/15"
                    : isMissed
                    ? "border-rose-300 ring-2 ring-rose-50 bg-rose-50/15"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                  {/* Medicine Details */}
                  <div className="space-y-3 flex-1">
                    {/* Top Name Bar */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-lg font-black text-slate-900">
                        {lang === "te" ? med.nameTe || med.name : med.name}
                      </h3>

                      <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold">
                        <SlotIcon className={`w-3.5 h-3.5 ${slotInfo.color}`} />
                        <span>{lang === "te" ? med.timeLabelTe || med.timeLabel : med.timeLabel}</span>
                      </span>

                      {/* Status Badge */}
                      <span className={`text-xs px-3 py-1 rounded-full font-black inline-flex items-center gap-1.5 ${
                        isTaken
                          ? "bg-emerald-100 text-emerald-800"
                          : isMissed
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {isTaken && <Check className="w-3.5 h-3.5 stroke-3" />}
                        {isMissed && <X className="w-3.5 h-3.5 stroke-3" />}
                        {isTaken
                          ? (lang === "te" ? "వేసుకున్నారు (✅ Taken)" : "Taken (✅)")
                          : isMissed
                          ? (lang === "te" ? "మిస్ అయ్యారు (❌ Missed)" : "Missed (❌)")
                          : (lang === "te" ? "పెండింగ్‌లో ఉంది (⏳ Pending)" : "Pending (⏳)")}
                      </span>
                    </div>

                    {/* DEDICATED HIGH-CONTRAST SAFETY ALERT BOX (Immediately beneath drug name) */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start justify-between gap-3 shadow-xs">
                      <div className="flex items-start gap-2.5">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md inline-block mb-1">
                            {lang === "te" ? "ఔషధ భద్రతా బాక్స్ (Safety Box)" : "High-Contrast Safety Box"}
                          </span>
                          <p className="text-xs font-bold text-amber-950 leading-relaxed">
                            {lang === "te" ? safetyRule.ruleTe : safetyRule.ruleEn}
                          </p>
                        </div>
                      </div>

                      <SpeechButton
                        text={lang === "te" ? safetyRule.ruleTe : safetyRule.ruleEn}
                        lang={lang}
                        size="xs"
                      />
                    </div>

                    {/* Clinical Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <strong className="text-slate-700">{lang === "te" ? "మోతాదు (Dosage):" : "Dosage:"}</strong>{" "}
                        <span className="font-bold text-teal-800">{med.dosage}</span>
                      </div>
                      <div>
                        <strong className="text-slate-700">{lang === "te" ? "సూచించిన డాక్టర్:" : "Prescribed By:"}</strong>{" "}
                        <span>{med.doctor} ({med.hospital})</span>
                      </div>
                    </div>

                    {/* Prescription Instructions with Audio snippet */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <strong className="text-slate-900 block font-bold">
                          {lang === "te" ? "ప్రిస్క్రిప్షన్ సూచనలు:" : "Prescription Instructions:"}
                        </strong>
                        <p>{lang === "te" ? med.instructionsTe || med.instructions : med.instructions}</p>
                        {med.purpose && (
                          <p className="text-slate-500 text-[11px] mt-1">
                            <strong>{lang === "te" ? "ఉద్దేశ్యం:" : "Clinical Purpose:"}</strong> {lang === "te" ? med.purposeTe || med.purpose : med.purpose}
                          </p>
                        )}
                      </div>

                      <SpeechButton
                        text={lang === "te" ? med.instructionsTe || med.instructions : med.instructions}
                        lang={lang}
                        size="xs"
                      />
                    </div>
                  </div>

                  {/* Tick / Cross Action Area */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                    {/* Mark Taken Button (Tick) */}
                    <button
                      type="button"
                      onClick={() => handleDoseClick(med, isTaken ? "pending" : "taken")}
                      className={`px-5 py-3.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-sm active:scale-95 ${
                        isTaken
                          ? "bg-emerald-600 text-white shadow-emerald-200 ring-2 ring-emerald-300"
                          : "bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-300"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{lang === "te" ? "తీసుకున్నాను (✅)" : "Taken (✅)"}</span>
                    </button>

                    {/* Mark Missed Button (Cross) */}
                    <button
                      type="button"
                      onClick={() => handleDoseClick(med, isMissed ? "pending" : "missed")}
                      className={`px-5 py-3.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shadow-sm active:scale-95 ${
                        isMissed
                          ? "bg-rose-600 text-white shadow-rose-200 ring-2 ring-rose-300"
                          : "bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-300"
                      }`}
                    >
                      <XCircle className="w-5 h-5" />
                      <span>{lang === "te" ? "మిస్ అయింది (❌)" : "Missed (❌)"}</span>
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => onDeletePrescription(med.id)}
                      className="p-3 rounded-2xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                      title="Delete Prescription"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clinical Guidance on Maternal Medicines with Audio Readout */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-3xl p-6 text-teal-950 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-bold text-sm text-teal-900 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-teal-700" />
            <span>{lang === "te" ? "గర్భధారణ మందుల ప్రాముఖ్యత & మార్గదర్శకాలు" : "Maternal Medication Safety Guidelines"}</span>
          </h3>
          <SpeechButton
            text={
              lang === "te"
                ? "గర్భధారణ మందుల మార్గదర్శకాలు: ఐరన్ టాబ్లెట్ రాత్రి భోజనం తర్వాత నీటితో వేసుకోవాలి. క్యాల్షియం టాబ్లెట్ మధ్యాహ్నం వేసుకోవాలి. ఈ రెండు మాత్రల మధ్య కనీసం రెండు గంటల వ్యవధి ఉండాలి."
                : "Maternal medication guidelines: Take Iron tablet after dinner with plain water. Take Calcium after lunch. Maintain at least a 2-hour gap between them."
            }
            lang={lang}
            size="sm"
          />
        </div>

        <ul className="text-xs text-teal-900/90 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong>{lang === "te" ? "ఐరన్ మాత్ర (IFA):" : "Iron (IFA) Tablets:"}</strong>{" "}
            {lang === "te"
              ? "రాత్రి భోజనం తర్వాత మంచి నీటితో లేదా నిమ్మరసంతో వేసుకోవాలి. పాలు, టీ లేదా కాఫీతో కలిపి అస్సలు వేసుకోవద్దు."
              : "Take after dinner with plain water or lemon water (Vitamin C improves iron absorption). Never take with milk or tea."}
          </li>
          <li>
            <strong>{lang === "te" ? "క్యాల్షియం మాత్ర:" : "Calcium Tablets:"}</strong>{" "}
            {lang === "te"
              ? "మధ్యాహ్న భోజనం తర్వాత వేసుకోవాలి. ఐరన్ మాత్ర మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి ఉండాలి."
              : "Take after lunch. Keep at least a 2-hour gap between Calcium and Iron tablets as they inhibit each other's absorption."}
          </li>
          <li>
            <strong>{lang === "te" ? "డాక్టర్ సూచన లేకుండా ఆపవద్దు:" : "Never stop without doctor consultation:"}</strong>{" "}
            {lang === "te"
              ? "కొద్దిగా మలబద్ధకం లేదా నల్లటి మలం రావడం ఐరన్ వల్ల సహజం. డాక్టర్ ని సంప్రదించకుండా మాత్రలు ఆపకండి."
              : "Mild constipation or dark stools can occur normally with iron. Do not stop without consulting your doctor."}
          </li>
        </ul>
      </div>

      {/* SAFETY RESTRICTION MODAL INTERCEPTING SAME-TIMEFRAME IFA & CALCIUM */}
      {safetyConflictModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border-4 border-amber-500">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-7 h-7 text-amber-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    {lang === "te" ? "భద్రతా హెచ్చరిక: ఔషధ పరస్పర చర్య" : "Safety Alert: Drug Interaction"}
                  </h3>
                  <p className="text-xs text-amber-700 font-bold uppercase tracking-wider">
                    {lang === "te" ? "ఐరన్ & క్యాల్షియం నిరోధకత" : "Iron & Calcium Absorption Conflict"}
                  </p>
                </div>
              </div>

              <SpeechButton
                text={
                  lang === "te"
                    ? "భద్రతా హెచ్చరిక: దయచేసి ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి. క్యాల్షియం మీ శరీరం ఐరన్ పీల్చుకోకుండా అడ్డుకుంటుంది."
                    : "Safety Alert: Please space Iron and Calcium tablets by at least 2 hours. Calcium prevents your body from absorbing the critical Iron it needs."
                }
                lang={lang}
                size="sm"
              />
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-2 leading-relaxed">
              <p className="font-bold text-sm">
                {lang === "te"
                  ? "దయచేసి ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య కనీసం 2 గంటల వ్యవధి పాటించండి."
                  : "Please space Iron and Calcium tablets by at least 2 hours."}
              </p>
              <p className="text-amber-900">
                {lang === "te"
                  ? "క్యాల్షియం మీ శరీరం రక్తహీనతను నివారించే ఐరన్‌ను గ్రహించకుండా అడ్డుకుంటుంది. వీటిని వేర్వేరు సమయాల్లో (ఉదాహరణకు క్యాల్షియం మధ్యాహ్నం, ఐరన్ రాత్రి) వేసుకోవడం క్లినికల్ నిబంధన."
                  : "Calcium prevents your body from absorbing the critical Iron it needs. Take Calcium after lunch and Iron after dinner."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSafetyConflictModal(null)}
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-black transition shadow-md shadow-teal-700/20"
              >
                {lang === "te" ? "సరే, 2 గంటల వ్యవధి పాటిస్తాను" : "Acknowledge & Space Doses"}
              </button>

              <button
                type="button"
                onClick={confirmConflictDose}
                className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                {lang === "te" ? "ఇప్పటికే వ్యవధి ఉంది (మార్క్ చేయి)" : "Proceed Anyway"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Prescription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త ప్రిస్క్రిప్షన్ చేర్చండి" : "Add Prescribed Medicine"}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "మందు పేరు (Drug Name)" : "Medicine Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Iron & Folic Acid"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "మోతాదు (Dosage)" : "Dosage"}
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="1 Tablet"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "సమయం (Slot)" : "Slot"}
                  </label>
                  <select
                    value={formData.slot}
                    onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                  >
                    <option value="morning">Morning (Breakfast)</option>
                    <option value="afternoon">Afternoon (Lunch)</option>
                    <option value="evening">Evening (Snack)</option>
                    <option value="night">Night (Dinner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "సూచించిన డాక్టర్" : "Prescribed By Doctor"}
                </label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "డాక్టర్ సూచనలు" : "Instructions"}
                </label>
                <textarea
                  rows="2"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  placeholder="Take with water after food"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  {lang === "te" ? "రద్దు" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-200"
                >
                  {lang === "te" ? "సేవ్" : "Save Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
