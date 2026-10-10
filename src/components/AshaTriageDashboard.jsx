import React, { useState } from 'react';
import {
  Users, AlertTriangle, ShieldAlert, Phone, CheckCircle2,
  Calendar, Syringe, Pill, Search, Filter, Clock, MapPin,
  Check, ArrowRight, UserCheck, Heart, Baby, AlertOctagon,
  RefreshCw, ChevronRight, Activity, BellRing
} from 'lucide-react';
import SpeechButton from './SpeechButton';

const initialHighRiskMothers = [
  {
    id: "hr-1",
    name: "M. Lakshmi Devi",
    nameTe: "ఎం. లక్ష్మీ దేవి",
    age: 24,
    phone: "9848054321",
    village: "Ward 3, Pedamainavanilanka",
    gestation: "Week 24 (2nd Trimester)",
    severity: "critical", // critical (red), high (amber)
    clinicalCondition: "Severe Anemia (Hb 8.4 g/dL) — Overdue for ANC 3 Checkup",
    clinicalConditionTe: "తీవ్రమైన రక్తహీనత (Hb 8.4) — 3వ ANC చెకప్ 5 రోజులు ఆలస్యం",
    clinicalAction: "Immediate CHC referral required for parenteral Iron Sucrose infusion. Review diet and daily IFA compliance.",
    clinicalActionTe: "ఐరన్ సుక్రోజ్ ఇంజెక్షన్ల కోసం సి.హెచ్.సి కి రిఫర్ చేయాలి. రోజువారీ ఐరన్ మాత్రల వాడకం పరిశీలించాలి.",
    overdueDays: 5
  },
  {
    id: "hr-2",
    name: "K. Bhavani",
    nameTe: "కె. భవాని",
    age: 22,
    phone: "9440188990",
    village: "Ramalayam Veedhi, Pedamainavanilanka",
    gestation: "Week 34 (3rd Trimester)",
    severity: "critical",
    clinicalCondition: "Gestational Hypertension (BP 150/95 mmHg) — Pre-eclampsia Alert",
    clinicalConditionTe: "గర్భధారణ అధిక రక్తపోటు (బీపీ 150/95) — ప్రీ-ఎక్లాంప్సియా ముప్పు",
    clinicalAction: "Complaining of persistent frontal headache and pedal edema. Transfer to 24/7 Area Hospital Maternity Suite.",
    clinicalActionTe: "తీవ్రమైన తలనొప్పి మరియు కాళ్ల వాపులు ఉన్నాయి. ఏరియా ఆసుపత్రి ప్రసూతి విభాగానికి వెంటనే తరలించాలి.",
    overdueDays: 2
  },
  {
    id: "hr-3",
    name: "T. Renuka",
    nameTe: "టి. రేణుక",
    age: 29,
    phone: "9848123456",
    village: "Kotha Peta, Ward 2",
    gestation: "Week 32 (Twin Gestation)",
    severity: "high",
    clinicalCondition: "Previous Caesarean Section + Twin Gestation (High Risk Delivery)",
    clinicalConditionTe: "గతంలో సిజేరియన్ కాన్పు + కవలల గర్భం (హై-రిస్క్ ప్రసవం)",
    clinicalAction: "Ensure blood grouping verified (O Negative). Mobilize 108 ambulance transport plan for scheduled admission.",
    clinicalActionTe: "రక్త గ్రూప్ O నెగటివ్ సిద్ధం చేయాలి. 108 అంబులెన్స్ ప్రయాణ ప్రణాళికను కుటుంబంతో నిర్ధారించండి.",
    overdueDays: 0
  },
  {
    id: "hr-4",
    name: "G. Anitha",
    nameTe: "జి. అనిత",
    age: 28,
    phone: "9988223344",
    village: "Market Road, Narasapur",
    gestation: "Postpartum (Infant 9.5 Months)",
    severity: "high",
    clinicalCondition: "Measles-Rubella (MR-1) & Vitamin A Defaulter — Overdue by 15 Days",
    clinicalConditionTe: "తట్టు (MR-1) మరియు విటమిన్-ఎ టీకా బకాయి — 15 రోజులు ఆలస్యం",
    clinicalAction: "Missed village sub-center immunization day. Home visit needed to counsel parents on measles vulnerability.",
    clinicalActionTe: "సబ్-సెంటర్ టీకా రోజుకు హాజరు కాలేదు. గృహ సందర్శన చేసి తల్లిదండ్రులకు అవగాహన కల్పించాలి.",
    overdueDays: 15
  }
];

const initialPendingRequests = [
  {
    id: "req-1",
    patientName: "M. Lakshmi Devi",
    village: "Ward 3, Pedamainavanilanka",
    phone: "9848054321",
    moduleSource: "Daily Medicines & Nutrition",
    requestTime: "1 hour ago",
    urgency: "high",
    reason: "Severe nausea and gastric burning when taking IFA tablets; skipped last 3 doses. Requests counseling on food pairing.",
    reasonTe: "ఐరన్ మాత్రలు వేసుకుంటే తీవ్రమైన వాంతులు వస్తున్నాయి; 3 రోజులుగా వేసుకోలేదు. ఆహార సలహా కోరారు.",
    status: "pending"
  },
  {
    id: "req-2",
    patientName: "P. Swapna",
    village: "Harijanawada, Ward 1",
    phone: "9849200112",
    moduleSource: "Breastfeeding Support Module",
    requestTime: "3 hours ago",
    urgency: "high",
    reason: "Painful latch and breast engorgement on day 6 postpartum. Baby crying persistently, suspecting poor milk transfer.",
    reasonTe: "రొమ్ము నొప్పి, గడ్డకట్టడం మరియు చనుమొన పగుళ్లు. బిడ్డ పాలు తాగలేక ఏడుస్తున్నాడు. సహాయం కోరారు.",
    status: "pending"
  },
  {
    id: "req-3",
    patientName: "S. Sujatha",
    village: "Narasapur Rural Hamlet",
    phone: "9440876543",
    moduleSource: "Emergency SOS Screen",
    requestTime: "5 hours ago",
    urgency: "critical",
    reason: "Mild watery vaginal discharge at 37 weeks gestation. Inquiring whether amniotic sac is leaking or false labour.",
    reasonTe: "37వ వారంలో స్వల్పంగా ఉమ్మనీరు కారుతోంది. కాన్పు నొప్పులా కాదా అని తెలుసుకోవడానికి సంప్రదించారు.",
    status: "pending"
  },
  {
    id: "req-4",
    patientName: "R. Durga",
    village: "Main Bazar Veedhi",
    phone: "9848991122",
    moduleSource: "Child Nutrition & Postpartum",
    requestTime: "Today (Morning)",
    urgency: "normal",
    reason: "Routine Postpartum Day 14 Home Visit request: Infant umbilical cord healing check and newborn weight measurement.",
    reasonTe: "ప్రసవానంతరం 14వ రోజు రొటీన్ చెకప్: శిశువు బొడ్డు పరిశీలన మరియు బరువు కొలవడం కోసం అభ్యర్థించారు.",
    status: "pending"
  }
];

export default function AshaTriageDashboard({
  profile,
  onSwitchStage,
  onNavigatePage,
  lang = "te"
}) {
  const [highRiskList, setHighRiskList] = useState(initialHighRiskMothers);
  const [requestsQueue, setRequestsQueue] = useState(initialPendingRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRiskFilter, setSelectedRiskFilter] = useState("all"); // all, critical, high

  const handleResolveRequest = (id) => {
    setRequestsQueue(prev => prev.map(r => r.id === id ? { ...r, status: "resolved" } : r));
  };

  const handleAcceptVisit = (id) => {
    setRequestsQueue(prev => prev.map(r => r.id === id ? { ...r, status: "scheduled" } : r));
  };

  const filteredHighRisk = highRiskList.filter(m => {
    if (selectedRiskFilter === "critical" && m.severity !== "critical") return false;
    if (selectedRiskFilter === "high" && m.severity !== "high") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) ||
        (m.nameTe && m.nameTe.includes(q)) ||
        m.clinicalCondition.toLowerCase().includes(q) ||
        m.village.toLowerCase().includes(q);
    }
    return true;
  });

  const pendingCount = requestsQueue.filter(r => r.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* PERSPECTIVE SWITCHER BANNER */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-teal-700/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-wider text-teal-300">
              {lang === "te" ? "గ్లోబల్ దృక్పథం: ఆశా కార్యకర్త ట్రియాజ్ మోడ్" : "Active Perspective: ASHA Worker Triage Mode"}
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black">
            {lang === "te" ? "గ్రామీణ మాతా శిశు రోస్టర్ & మల్టీ-పేషెంట్ ట్రియాజ్" : "Village Multi-Patient Triage Dashboard"}
          </h2>
          <p className="text-xs text-teal-200">
            {lang === "te"
              ? "మీరు ఆశా వర్కర్ దృక్పథంలో ఉన్నారు. వ్యక్తిగత తల్లి డాష్‌బోర్డ్ కోసం క్రింది బటన్లను వాడండి:"
              : "Showing high-risk pregnancies and patient triage. Switch below to view an individual mother's dashboard:"}
          </p>
        </div>

        {/* 1-Click Perspective Switcher Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => onSwitchStage("pregnant")}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-1.5"
          >
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>{lang === "te" ? "గర్భవతి మోడ్" : "Pregnancy"}</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchStage("postpartum")}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-1.5"
          >
            <Baby className="w-3.5 h-3.5 text-purple-300" />
            <span>{lang === "te" ? "బాలింత మోడ్" : "New Mother"}</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchStage("caregiver")}
            className="px-3.5 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span>{lang === "te" ? "శిశు సంరక్షణ" : "Child Care"}</span>
          </button>

          <span className="px-3 py-2 rounded-2xl bg-teal-600 text-white text-xs font-black ring-2 ring-teal-400">
            👩‍⚕️ ASHA Mode
          </span>
        </div>
      </div>

      {/* TOP METRIC INDICATORS (Total Pregnancies, High-Risk Count, Pending Requests, Defaulters) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Indicator 1: Total Active Pregnancies in Zone */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {lang === "te" ? "యాక్టివ్ గర్భిణీలు" : "Zone Pregnancies"}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5 text-teal-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">28</span>
            <p className="text-[11px] text-teal-700 font-semibold mt-0.5">
              Ward 1-4 Pedamainavanilanka
            </p>
          </div>
        </div>

        {/* Indicator 2: High-Risk Mothers Count */}
        <div className="bg-white rounded-3xl p-5 border-2 border-rose-300 shadow-xs flex flex-col justify-between ring-1 ring-rose-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              {lang === "te" ? "హై-రిస్క్ తల్లులు" : "High-Risk Mothers"}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold animate-pulse">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-rose-700">6</span>
            <p className="text-[11px] text-rose-600 font-bold mt-0.5">
              {lang === "te" ? "తక్షణ వైద్య పర్యవేక్షణ అవసరం" : "Immediate Triage Care"}
            </p>
          </div>
        </div>

        {/* Indicator 3: Pending Home-Visit Requests */}
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-300 shadow-xs flex flex-col justify-between ring-1 ring-amber-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              {lang === "te" ? "పెండింగ్ విజిట్ అభ్యర్థనలు" : "Pending Visits"}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <BellRing className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-amber-800">{pendingCount}</span>
            <p className="text-[11px] text-amber-700 font-bold mt-0.5">
              {lang === "te" ? "రోగులు పంపిన SOS / తల్లిపాల కోరికలు" : "Auto-Generated by Patients"}
            </p>
          </div>
        </div>

        {/* Indicator 4: Immunization Defaulters */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              {lang === "te" ? "టీకా బకాయిదారులు" : "Vaccine Defaulters"}
            </span>
            <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Syringe className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-black text-purple-900">3</span>
            <p className="text-[11px] text-purple-700 font-semibold mt-0.5">
              MR-1 & Pentavalent-3 Doses
            </p>
          </div>
        </div>
      </div>

      {/* PENDING HOME-VISIT REQUESTS QUEUE (Auto-generated by patients via SOS or Breastfeeding) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {lang === "te" ? "రోగుల గృహ సందర్శన అభ్యర్థనల క్యూ (Pending Queue)" : "Active Home-Visit Requests Queue"}
              </h3>
              <p className="text-xs text-slate-500">
                {lang === "te"
                  ? "రోగులు ఎమర్జెన్సీ లేదా తల్లిపాల మాడ్యూల్ నుండి నేరుగా పంపిన సహాయ కోరికలు"
                  : "Auto-generated by mothers triggering SOS or reporting critical feeding & medication issues"}
              </p>
            </div>
          </div>

          <SpeechButton
            text={
              lang === "te"
                ? "రోగుల గృహ సందర్శన అభ్యర్థనలు. లక్ష్మీ దేవి మందుల సమస్య, మరియు స్వప్న తల్లిపాల సమస్య కోసం తక్షణ గృహ సందర్శన కోరారు."
                : "Active home visit requests queue. Lakshmi Devi and Swapna requested urgent home visits for medication nausea and breastfeeding support."
            }
            lang={lang}
            size="sm"
          />
        </div>

        <div className="space-y-3">
          {requestsQueue.map((req) => {
            const isResolved = req.status === "resolved";
            const isScheduled = req.status === "scheduled";

            return (
              <div
                key={req.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isResolved
                    ? "bg-emerald-50/50 border-emerald-200 opacity-60"
                    : isScheduled
                    ? "bg-blue-50/60 border-blue-200"
                    : req.urgency === "critical"
                    ? "bg-rose-50/70 border-rose-300 ring-1 ring-rose-200"
                    : "bg-amber-50/40 border-amber-200"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-slate-900 text-sm">
                      {req.patientName}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600 font-semibold">
                      📍 {req.village}
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-100/70 text-teal-800 font-bold">
                      Source: {req.moduleSource}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ⏱ {req.requestTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                    <strong>{lang === "te" ? "సమస్య:" : "Issue:"}</strong> {lang === "te" ? req.reasonTe || req.reason : req.reason}
                  </p>
                </div>

                {/* Actions: Direct Call & Visit workflow */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {/* NATIVE TELEPHONE ANCHOR LINK */}
                  <a
                    href={`tel:${req.phone.replace(/[^0-9+]/g, '')}`}
                    className="px-3.5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{lang === "te" ? "కాల్ చేయండి" : "Call Mother"}</span>
                  </a>

                  {!isResolved && !isScheduled && (
                    <button
                      type="button"
                      onClick={() => handleAcceptVisit(req.id)}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{lang === "te" ? "విజిట్ ఖరారు" : "Accept Visit"}</span>
                    </button>
                  )}

                  {!isResolved ? (
                    <button
                      type="button"
                      onClick={() => handleResolveRequest(req.id)}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 font-bold text-xs border border-slate-200 transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === "te" ? "పరిష్కారం" : "Resolve"}</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {lang === "te" ? "పరిష్కరించబడింది" : "Resolved"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HIGH-RISK ALERT PANEL (SORTED BY EMERGENCY SEVERITY) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === "te" ? "హై-రిస్క్ గర్భిణీల హెచ్చరిక ప్యానెల్" : "High-Risk Alert Panel (Emergency Triage)"}
              </h3>
              <SpeechButton
                text={
                  lang === "te"
                    ? "హై-రిస్క్ గర్భిణీల ప్యానెల్. అత్యవసర తీవ్రత ప్రకారం క్రమబద్ధీకరించబడింది. లక్ష్మీ దేవికి తీవ్ర రక్తహీనత ఉంది మరియు భవానికి అధిక రక్తపోటు ఉంది."
                    : "High risk alert panel sorted by clinical emergency severity. M. Lakshmi Devi has severe anemia and K. Bhavani has gestational hypertension."
                }
                lang={lang}
                size="sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te"
                ? "వైద్య అత్యవసర తీవ్రత (Severe Anemia, BP 150/95, Preterm Twins) ఆధారంగా రోగులను అమర్చడం జరిగింది"
                : "Prioritized strictly by emergency risk: Severe Anemia (Hb < 9), Pre-eclampsia, Multiple Gestation, Vaccine Default"}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "te" ? "తల్లి పేరు లేదా వ్యాధి..." : "Search mother or risk..."}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="flex items-center gap-1">
              {["all", "critical", "high"].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedRiskFilter(f)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition capitalize ${
                    selectedRiskFilter === f
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* High Risk Cards Grid */}
        <div className="space-y-3.5">
          {filteredHighRisk.map((mother) => {
            const isCritical = mother.severity === "critical";

            return (
              <div
                key={mother.id}
                className={`p-5 sm:p-6 rounded-3xl border-2 transition-all shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isCritical
                    ? "border-rose-400 bg-rose-50/20 ring-1 ring-rose-100"
                    : "border-amber-300 bg-amber-50/15"
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isCritical
                        ? "bg-rose-600 text-white animate-pulse"
                        : "bg-amber-500 text-white"
                    }`}>
                      {isCritical ? "CRITICAL SEVERITY 1" : "HIGH RISK SEVERITY 2"}
                    </span>

                    <h4 className="font-black text-slate-900 text-base sm:text-lg">
                      {lang === "te" ? mother.nameTe || mother.name : mother.name}
                    </h4>

                    <span className="text-xs text-slate-600 font-bold px-2.5 py-0.5 rounded-full bg-slate-100">
                      Age {mother.age} • {mother.gestation}
                    </span>

                    {mother.overdueDays > 0 && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                        ⚠️ Overdue {mother.overdueDays} Days
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-black text-rose-900">
                    {lang === "te" ? mother.clinicalConditionTe || mother.clinicalCondition : mother.clinicalCondition}
                  </p>

                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start justify-between gap-2">
                    <div>
                      <strong className="text-slate-900 block font-bold">
                        {lang === "te" ? "ఆశా తక్షణ చర్య (Action Required):" : "Mandated Clinical Action:"}
                      </strong>
                      <span>{lang === "te" ? mother.clinicalActionTe || mother.clinicalAction : mother.clinicalAction}</span>
                      <p className="text-slate-500 text-[11px] mt-1 font-semibold">
                        📍 {mother.village}
                      </p>
                    </div>

                    <SpeechButton
                      text={`${mother.name}. ${mother.clinicalCondition}. ${mother.clinicalAction}`}
                      lang={lang}
                      size="xs"
                    />
                  </div>
                </div>

                {/* Direct Calling & Action Links */}
                <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                  <a
                    href={`tel:${mother.phone}`}
                    className="px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-rose-200 transition"
                  >
                    <Phone className="w-4 h-4 animate-bounce" />
                    <span>{lang === "te" ? "తల్లికి కాల్ చేయండి" : "Call Mother Now"}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      alert(
                        lang === "te"
                          ? `${mother.name} కోసం సి.హెచ్.సి నరసాపురం రిఫరల్ మరియు గృహ సందర్శన షెడ్యూల్ చేయబడింది.`
                          : `Emergency CHC referral voucher generated for ${mother.name}. Transport mobilized.`
                      );
                    }}
                    className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
                  >
                    {lang === "te" ? "రిఫరల్ రికార్డు" : "Refer to CHC"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
