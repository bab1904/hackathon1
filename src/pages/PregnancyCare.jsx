import React, { useState } from 'react';
import {
  Heart, Calendar, AlertTriangle, CheckCircle2, ChevronRight,
  ShieldCheck, HelpCircle, Phone, ArrowRight, Baby
} from 'lucide-react';
import { calculateGestationalAge, formatDate } from '../services/dateUtils';
import { pregnancyMilestones, emergencyDangerSigns } from '../data/sampleHealthContent';

export default function PregnancyCare({
  profile,
  onUpdateLmp,
  onNavigatePage,
  lang = "te"
}) {
  const [lmpInput, setLmpInput] = useState(profile.lmpDate || "2026-04-18");
  const gest = calculateGestationalAge(lmpInput);

  const [doctorQuestions, setDoctorQuestions] = useState([
    { id: "q1", textEn: "Is my baby's growth and weight normal for this week?", textTe: "ఈ వారానికి బిడ్డ పెరుగుదల, బరువు సరిగ్గా ఉన్నాయా?", checked: false },
    { id: "q2", textEn: "Is my hemoglobin (Hb) level adequate to prevent anemia?", textTe: "నా రక్తంలో హిమోగ్లోబిన్ శాతం సరిపడా ఉందా?", checked: false },
    { id: "q3", textEn: "When should I take my next Td / Tetanus injection?", textTe: "తర్వాతి ధనుర్వాతం (Td) ఇంజెక్షన్ ఎప్పుడు తీసుకోవాలి?", checked: false },
    { id: "q4", textEn: "Are my daily Iron and Calcium tablets sufficient?", textTe: "నేను రోజూ వేసుకునే ఐరన్, క్యాల్షియం మాత్రలు సరిపోతాయా?", checked: false },
    { id: "q5", textEn: "What are the earliest signs of labor that I should watch for?", textTe: "ప్రసవ నొప్పుల తొలి సంకేతాలు ఏమిటి?", checked: false }
  ]);

  const toggleQuestion = (id) => {
    setDoctorQuestions(doctorQuestions.map(q => q.id === id ? { ...q, checked: !q.checked } : q));
  };

  const handleLmpChange = (e) => {
    const newLmp = e.target.value;
    setLmpInput(newLmp);
    onUpdateLmp(newLmp);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>{lang === "te" ? "గర్భధారణ సంరక్షణ & వైద్య మార్గదర్శి" : "Antenatal Journey & Medical Guide"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te"
              ? `గర్భధారణ వారం ${gest.weeks} (${gest.trimester}వ త్రైమాసికం)`
              : `Pregnancy Week ${gest.weeks} (${gest.trimester}nd Trimester)`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            {lang === "te"
              ? "చివరి ఋతుక్రమం (LMP) తేదీ ఆధారంగా మీ గర్భధారణ పురోగతిని ట్రాక్ చేయండి."
              : "Track your week-by-week maternal milestones and antenatal checkups."}
          </p>
        </div>

        {/* LMP Date Input Form */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-xs space-y-2 shrink-0">
          <label className="block font-bold text-slate-700">
            {lang === "te" ? "చివరి ఋతుక్రమం (LMP) తేదీ:" : "Last Menstrual Period (LMP):"}
          </label>
          <input
            type="date"
            value={lmpInput}
            onChange={handleLmpChange}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
          />
          <p className="text-[11px] text-slate-500">
            {lang === "te" ? "అంచనా EDD:" : "Estimated EDD:"} <strong>{formatDate(gest.edd, lang)}</strong>
          </p>
        </div>
      </div>

      {/* Week Progress Card */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-wide">
              {lang === "te" ? "గర్భధారణ సమయ పరిమితి (40 వారాలు)" : "Gestational Progress (40 Weeks)"}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-black text-white">{gest.weeks}</span>
              <span className="text-sm text-teal-200">
                / 40 {lang === "te" ? "వారాలు" : "Weeks"}
              </span>
            </div>
            <p className="text-xs text-teal-100 mt-2 font-medium">
              {lang === "te"
                ? `బిడ్డ ప్రస్తుతం సుమారు పచ్చి బొప్పాయి / కొబ్బరికాయ పరిమాణంలో ఉంటుంది`
                : `Baby is approximately the size of a papaya / coconut`}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs text-teal-100 max-w-xs">
            <strong className="block text-white mb-1">
              {lang === "te" ? "వైద్యుల సూచన (EDD):" : "Clinical Uncertainty Notice:"}
            </strong>
            {lang === "te"
              ? "అంచనా వేసిన డెలివరీ తేదీ సుమారు అంచనా మాత్రమే. సాధారణంగా 37 నుండి 42 వారాల మధ్యలో ఎప్పుడైనా ప్రసవం జరగవచ్చు."
              : "Due date is an approximation. Normal deliveries safely happen anytime between 37 and 42 completed weeks."}
          </div>
        </div>

        {/* 40-Week Progress Bar */}
        <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-emerald-300 h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, (gest.weeks / 40) * 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Trimester Roadmaps */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          {lang === "te" ? "త్రైమాసిక ప్రయాణం & ముఖ్య సూచనలు" : "Trimester Milestones & Guidance"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pregnancyMilestones.map((milestone) => {
            const isCurrent = gest.trimester === milestone.trimester;
            return (
              <div
                key={milestone.trimester}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition flex flex-col justify-between ${
                  isCurrent
                    ? "border-teal-500 ring-2 ring-teal-100 shadow-md"
                    : "border-slate-200/80"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isCurrent ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-700"
                    }`}>
                      {milestone.weekRange} {lang === "te" ? "వారాలు" : "Weeks"}
                    </span>
                    {isCurrent && (
                      <span className="text-[11px] font-bold text-teal-700">
                        {lang === "te" ? "ప్రస్తుతం" : "Current"}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">
                    {lang === "te" ? milestone.titleTe : milestone.title}
                  </h3>

                  <p className="text-xs text-teal-800 font-semibold">
                    {lang === "te" ? "పరిమాణం:" : "Baby size:"} {lang === "te" ? milestone.babySizeTe : milestone.babySize}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === "te" ? milestone.highlightsTe : milestone.highlights}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-700 mb-1.5">
                    {lang === "te" ? "ముఖ్య చర్యలు:" : "Key Actions:"}
                  </p>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                    {(lang === "te" ? milestone.keyActionsTe : milestone.keyActions).slice(0, 3).map((act, i) => (
                      <li key={i}>{act}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4-Visit Antenatal Care (ANC) Standard Tracker */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === "te" ? "ప్రభుత్వ 4 తప్పనిసరి గర్భ పరీక్షలు (ANC Visits)" : "National 4-Visit Antenatal Care Protocol (MoHFW)"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === "te" ? "సురక్షిత ప్రసవం కోసం ప్రతి గర్భిణీ తప్పక చేయించుకోవాల్సిన 4 వైద్య పరీక్షలు" : "Mandatory checkups to screen for high risk, anemia, and hypertension"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { num: "ANC 1", timing: "Within 12 Weeks (1వ త్రైమాసికం)", tests: "Registration, Blood Group, Hb, Urine, Folic Acid", done: true },
            { num: "ANC 2", timing: "14 - 26 Weeks (2వ త్రైమాసికం)", tests: "USG Anomaly Scan, Td Injection, BP, Weight, IFA tablets", done: true },
            { num: "ANC 3", timing: "28 - 34 Weeks (3వ త్రైమాసికం)", tests: "Hb recheck, Blood pressure, Baby position, Td-2", done: false },
            { num: "ANC 4", timing: "36 Weeks to Delivery", tests: "Delivery planning, Birth preparedness, Hospital identification", done: false }
          ].map((anc, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition ${
                anc.done
                  ? "bg-emerald-50/50 border-emerald-300"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-slate-900">{anc.num}</span>
                {anc.done ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {lang === "te" ? "పూర్తయింది ✓" : "Completed ✓"}
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                    {lang === "te" ? "రాబోయేది" : "Due Soon"}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-teal-800">{anc.timing}</p>
              <p className="text-[11px] text-slate-600 mt-2 leading-tight">{anc.tests}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Questions to Ask Doctor at Next Visit */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === "te" ? "తర్వాతి డాక్టర్ చెకప్‌లో అడగాల్సిన ప్రశ్నలు" : "Questions to Ask at Your Next Doctor Visit"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === "te" ? "డాక్టర్ వద్దకు వెళ్ళినప్పుడు సందేహాలు నివృత్తి చేసుకోవడానికి వీటిని ఉపయోగించండి" : "Check off items as you discuss them with your obstetrician"}
          </p>
        </div>

        <div className="space-y-2">
          {doctorQuestions.map((q) => (
            <div
              key={q.id}
              onClick={() => toggleQuestion(q.id)}
              className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                q.checked
                  ? "bg-teal-50/70 border-teal-300 text-slate-900"
                  : "bg-slate-50/70 border-slate-200 text-slate-700"
              }`}
            >
              <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ${
                q.checked ? "bg-teal-700 text-white" : "border border-slate-300 bg-white"
              }`}>
                {q.checked && <CheckCircle2 className="w-4 h-4" />}
              </div>
              <span className="text-xs sm:text-sm font-medium">
                {lang === "te" ? q.textTe : q.textEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
