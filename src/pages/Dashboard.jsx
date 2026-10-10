import React from 'react';
import {
  Heart, Calendar, Syringe, Pill, Building2, AlertOctagon,
  Mic, Sparkles, FileText, ArrowRight, Clock, MapPin,
  Baby, Utensils, ShieldAlert, Phone, UserCheck, Users
} from 'lucide-react';
import { calculateGestationalAge, calculateChildAge, formatDate, getTodayKey } from '../services/dateUtils';
import QuickActions from '../components/QuickActions';
import DailyMedicationCard from '../components/DailyMedicationCard';
import OfflineBadge from '../components/OfflineBadge';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import AshaTriageDashboard from '../components/AshaTriageDashboard';
import SpeechButton from '../components/SpeechButton';

export default function Dashboard({
  profile,
  medications,
  dailyDoses,
  appointments,
  records,
  preferredHospitalId,
  onUpdateDose,
  onNavigatePage,
  onOpenVoice,
  onOpenEmergency,
  onSwitchStage,
  lang = "te"
}) {
  // If in ASHA Worker Mode, structurally transform into Dynamic Village Roster & Multi-Patient Triage Dashboard
  if (profile.stage === "asha") {
    return (
      <AshaTriageDashboard
        profile={profile}
        onSwitchStage={onSwitchStage}
        onNavigatePage={onNavigatePage}
        lang={lang}
      />
    );
  }

  const isPregnant = profile.stage === "pregnant";
  const isPostpartum = profile.stage === "postpartum";
  const isChildCare = profile.stage === "caregiver";

  const gest = calculateGestationalAge(profile.lmpDate);
  const childAge = calculateChildAge(profile.childDob);

  // Next upcoming appointment
  const nextAppt = appointments
    .filter(a => a.status === "scheduled")
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // Preferred Hospital info
  const prefHosp = nearbyHospitalsData.find(h => h.id === preferredHospitalId) || nearbyHospitalsData[0];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return lang === "te" ? "శుభోదయం" : "Good Morning";
    if (hour < 17) return lang === "te" ? "శుభ మధ్యాహ్నం" : "Good Afternoon";
    return lang === "te" ? "శుభ సాయంత్రం" : "Good Evening";
  };

  const getGreetingReadout = () => {
    if (isPregnant) {
      return lang === "te"
        ? `శుభోదయం లక్ష్మీ దేవి. మీరు గర్భధారణ 24వ వారంలో ఉన్నారు. మీ రోజువారీ ఐరన్ మరియు క్యాల్షియం మాత్రలు వేసుకున్నారో లేదో కింద తనిఖీ చేయండి.`
        : `Good morning Lakshmi Devi. You are in pregnancy week 24. Check off your daily Iron and Calcium tablets below.`;
    }
    return lang === "te"
      ? `నమస్కారం. గ్రామమా మాతా శిశు సంరక్షణ డాష్‌బోర్డ్‌కు స్వాగతం.`
      : `Welcome to GramaMaa Maternal and Child Care Dashboard.`;
  };

  return (
    <div className="space-y-6">
      {/* PERSPECTIVE SWITCHER QUICK PILL BAR */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold">
            {lang === "te" ? "దృక్పథం (Perspective):" : "Care Perspective:"}
          </span>
          <span className="font-extrabold text-teal-800 bg-white px-2.5 py-0.5 rounded-lg border border-teal-200">
            {isPregnant ? "🤰 Pregnancy" : isPostpartum ? "🤱 New Mother" : "👶 Child Care"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onSwitchStage("asha")}
          className="px-3 py-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black text-xs transition flex items-center gap-1.5 shadow-xs"
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>{lang === "te" ? "ఆశా వర్కర్ మోడ్‌కి మారండి" : "Switch to ASHA Worker Mode"}</span>
        </button>
      </div>

      {/* Top Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              {getGreeting()}, {lang === "te" ? profile.nameTe || profile.name : profile.name}
            </span>
            <SpeechButton text={getGreetingReadout()} lang={lang} size="xs" />
            <span className="text-slate-300">•</span>
            <OfflineBadge lang={lang} />
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isPregnant && (
              lang === "te"
                ? `గర్భధారణ: ${gest.weeks}వ వారం (${gest.trimester}వ త్రైమాసికం)`
                : `Pregnancy: Week ${gest.weeks} (${gest.trimester}nd Trimester)`
            )}
            {isPostpartum && (
              lang === "te"
                ? `బాలింత & శిశు సంరక్షణ (${childAge.labelTe})`
                : `Postpartum & Infant Care (${childAge.labelEn})`
            )}
            {isChildCare && (
              lang === "te"
                ? `శిశువు ఎదుగుదల & టీకాలు (${childAge.labelTe})`
                : `Child Care & Vaccines (${childAge.labelEn})`
            )}
          </h1>

          <p className="text-xs sm:text-sm text-slate-500">
            {profile.villageTe && lang === "te" ? profile.villageTe : profile.village}
          </p>
        </div>

        {/* Quick Voice & SOS Buttons in Banner */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenVoice}
            className="px-4 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2"
          >
            <Mic className="w-4 h-4 animate-bounce" />
            <span>{lang === "te" ? "వాయిస్ సహాయం" : "Voice AI"}</span>
          </button>

          <button
            onClick={onOpenEmergency}
            className="px-4 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30 transition flex items-center gap-2 animate-pulse"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>SOS 112</span>
          </button>
        </div>
      </div>

      {/* TODAY'S MEDICINE TRACKER CARD (User's specific requirement with Safety Box) */}
      <DailyMedicationCard
        medications={medications}
        dailyDoses={dailyDoses}
        onUpdateDose={onUpdateDose}
        onNavigateMedications={() => onNavigatePage("medications")}
        lang={lang}
      />

      {/* Pregnancy or Child Care Status Banner */}
      {isPregnant && (
        <div className="bg-gradient-to-r from-teal-800 to-teal-900 rounded-3xl p-6 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-teal-200 uppercase tracking-wide">
                {lang === "te" ? "శిశువు ఎదుగుదల అంచనా" : "Fetal Milestone Estimate"}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white">
                {lang === "te"
                  ? `శిశువు ప్రస్తుతం సుమారు పచ్చి బొప్పాయి / కొబ్బరికాయ పరిమాణంలో ఉంటుంది`
                  : `Baby is approximately the size of a papaya / tender coconut`}
              </h2>
              <p className="text-xs text-teal-200">
                {lang === "te" ? "అంచనా వేసిన డెలివరీ తేదీ:" : "Estimated Due Date (EDD):"}{" "}
                <strong className="text-white">{formatDate(profile.eddDate || gest.edd, lang)}</strong>
              </p>
            </div>

            <button
              onClick={() => onNavigatePage("pregnancy")}
              className="px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition border border-white/20 shrink-0"
            >
              {lang === "te" ? "గర్భ వివరాలు చూడండి" : "View Pregnancy Guide"}
            </button>
          </div>
        </div>
      )}

      {/* Quick Action Matrix Grid */}
      <QuickActions onNavigatePage={onNavigatePage} lang={lang} />

      {/* Two Column Grid: Upcoming Visits & Emergency Speed Dial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next Appointment Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {lang === "te" ? "తర్వాతి వైద్య పరీక్ష" : "Next Scheduled Visit"}
              </span>
              <Calendar className="w-4 h-4 text-teal-700" />
            </div>

            {nextAppt ? (
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? nextAppt.titleTe || nextAppt.title : nextAppt.title}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{formatDate(nextAppt.date, lang)} • {nextAppt.time}</span>
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{nextAppt.doctor} ({nextAppt.facility})</span>
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">
                {lang === "te" ? "రాబోయే అపాయింట్‌మెంట్లు ఏవీ లేవు" : "No upcoming appointments"}
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {lang === "te" ? "MCP కార్డు తీసుకెళ్లడం మర్చిపోవద్దు" : "Carry your physical MCP card"}
            </span>
            <button
              onClick={() => onNavigatePage("appointments")}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>{lang === "te" ? "క్యాలెండర్ చూడండి" : "Open Calendar"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hospital Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {lang === "te" ? "ముఖ్య ప్రసవ ఆసుపత్రి" : "Delivery Hospital"}
              </span>
              <Building2 className="w-4 h-4 text-teal-700" />
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">
                {lang === "te" ? prefHosp.nameTe || prefHosp.name : prefHosp.name}
              </h3>
              <p className="text-xs text-slate-600">
                {prefHosp.doctorInCharge} • {prefHosp.distanceKm}
              </p>
              <p className="text-xs text-slate-500">
                {lang === "te" ? prefHosp.addressTe || prefHosp.address : prefHosp.address}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href={`tel:${prefHosp.phone.replace(/[^0-9+]/g, '')}`}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 font-bold text-xs flex items-center gap-1.5 border border-teal-200 hover:bg-teal-100"
            >
              <Phone className="w-3 h-3 text-teal-700" />
              <span>{prefHosp.phone}</span>
            </a>

            <button
              onClick={() => onNavigatePage("hospitals")}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>{lang === "te" ? "అన్ని ఆసుపత్రులు" : "View Directory"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
