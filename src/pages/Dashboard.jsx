import React from 'react';
import {
  Heart, Calendar, Syringe, Pill, Building2, AlertOctagon,
  Mic, Sparkles, FileText, ArrowRight, Clock, MapPin,
  Baby, Utensils, ShieldAlert, Phone
} from 'lucide-react';
import { calculateGestationalAge, calculateChildAge, formatDate, getTodayKey } from '../services/dateUtils';
import QuickActions from '../components/QuickActions';
import DailyMedicationCard from '../components/DailyMedicationCard';
import OfflineBadge from '../components/OfflineBadge';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';

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
  lang = "te"
}) {
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

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              {getGreeting()}, {lang === "te" ? profile.nameTe || profile.name : profile.name}
            </span>
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
            {profile.stage === "asha" && (
              lang === "te" ? "ఆశా కార్యకర్త - గ్రామీణ సంరక్షణ డాష్‌బోర్డ్" : "ASHA Community Worker Dashboard"
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

      {/* TODAY'S MEDICINE TRACKER CARD (User's specific requirement) */}
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

      {/* Two Column Layout: Upcoming Checkup & Preferred Hospital */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next Appointment Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {lang === "te" ? "తర్వాతి డాక్టర్ పరీక్ష" : "Next Scheduled Visit"}
              </span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>

            {nextAppt ? (
              <div className="space-y-1.5">
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? nextAppt.titleTe || nextAppt.title : nextAppt.title}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>{formatDate(nextAppt.date, lang)} at {nextAppt.time}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {nextAppt.doctor} • {lang === "te" ? nextAppt.facilityTe || nextAppt.facility : nextAppt.facility}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3">
                {lang === "te" ? "రాబోయే అపాయింట్‌మెంట్లు ఏవీ లేవు" : "No upcoming appointments"}
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              {lang === "te" ? "MCP కార్డు వెంట ఉంచుకోండి" : "Bring MCP card with you"}
            </span>
            <button
              onClick={() => onNavigatePage("appointments")}
              className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1"
            >
              <span>{lang === "te" ? "అపాయింట్‌మెంట్లు" : "Manage Visits"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Preferred Emergency Hospital Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {lang === "te" ? "మీ అత్యవసర డెలివరీ ఆసుపత్రి" : "Your Emergency Hospital"}
              </span>
              <Building2 className="w-4 h-4 text-slate-400" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-bold text-slate-900 text-base">
                {lang === "te" ? prefHosp.nameTe || prefHosp.name : prefHosp.name}
              </h3>
              <p className="text-xs text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span>{prefHosp.distanceKm} • {lang === "te" ? prefHosp.addressTe || prefHosp.address : prefHosp.address}</span>
              </p>
              <p className="text-xs text-emerald-700 font-semibold">
                ✓ 24/7 Labor Room • Free Delivery Schemes
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <a
              href={`tel:${prefHosp.phone}`}
              className="px-3 py-1.5 rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 font-bold text-xs flex items-center gap-1.5 transition"
            >
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>{lang === "te" ? "కాల్ చేయండి" : "Call Hospital"}</span>
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

      {/* Quick Actions Grid */}
      <QuickActions
        onActionClick={onNavigatePage}
        onOpenVoice={onOpenVoice}
        lang={lang}
      />

      {/* Nutrition Tip of the Day */}
      <div className="bg-sage-50 border border-sage-200 rounded-3xl p-5 sm:p-6 text-sage-900 flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-white shadow-xs text-sage-700 shrink-0">
          <Utensils className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-sm text-sage-950">
            {lang === "te" ? "ఈనాటి పౌష్టికాహార సలహా (తల్లి & బిడ్డ ఆరోగ్యం)" : "Today's Nutrition Advice"}
          </h3>
          <p className="text-xs text-sage-800 leading-relaxed">
            {lang === "te"
              ? "రాగి జావలో మరియు ఆకుకూరల్లో ఐరన్, క్యాల్షియం సమృద్ధిగా ఉంటాయి. భోజనం తర్వాత ఒక గ్లాసు నిమ్మరసం నీళ్లు తాగడం వల్ల ఐరన్ శరీరానికి బాగా అందుతుంది. పాలు, టీ తాగేటప్పుడు ఐరన్ మాత్రలు వేసుకోవద్దు."
              : "Ragi malt and green leafy vegetables (Palak, Methi) are rich in iron and calcium. Taking lemon water enhances iron absorption. Avoid tea or coffee immediately after taking iron supplements."}
          </p>
        </div>
      </div>
    </div>
  );
}
