import React, { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon, Clock, Plus, Trash2, CheckCircle2, Building2,
  Bell, AlertCircle, Check, Filter, ChevronLeft, ChevronRight, X,
  User, FileText, Phone, RotateCcw, Sparkles, MapPin, Syringe
} from 'lucide-react';
import { formatDate, getTodayKey } from '../services/dateUtils';
import SpeechButton from '../components/SpeechButton';

// National 4-Visit Antenatal Care (ANC) & Immunization Milestones
const defaultProtocolMilestones = [
  {
    id: "apt-1",
    title: "3rd Antenatal Care (ANC) Checkup & USG Review",
    titleTe: "3వ గర్భధారణ పరీక్ష (ANC-3) & స్కానింగ్ రివ్యూ",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Community Health Centre (CHC) Narasapur",
    facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్ నరసాపురం",
    phone: "08814223456",
    date: "2026-10-18",
    time: "10:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష (ANC)",
    eventClass: "anc", // anc, completed, vaccine
    status: "scheduled",
    prepInstructions: "Bring MCP Mother card. Carry previous anomaly scan report. Review hemoglobin and blood pressure numbers.",
    prepInstructionsTe: "తల్లి MCP కార్డు తప్పనిసరిగా తీసుకురండి. పాత అనామలీ స్కాన్ కాపీని చూపించండి. రక్తపోటు మరియు హిమోగ్లోబిన్ పరిశీలిస్తారు."
  },
  {
    id: "apt-2",
    title: "Td (Tetanus-Diphtheria) Injection 2nd Dose",
    titleTe: "ధనుర్వాతం (Td) 2వ ఇంజెక్షన్ బూస్టర్",
    doctor: "ANM Sister Nirmala",
    facility: "Village Sub-Centre / Anganwadi Pedamainavanilanka",
    facilityTe: "గ్రామ సబ్-సెంటర్ / అంగన్‌వాడీ",
    phone: "9849188776",
    date: "2026-11-04",
    time: "11:00 AM",
    type: "Vaccination",
    typeTe: "టీకా",
    eventClass: "anc",
    status: "scheduled",
    prepInstructions: "Carry MCP card to record the second maternal Td dose. Essential protection against maternal and neonatal tetanus.",
    prepInstructionsTe: "MCP కార్డులో 2వ Td డోస్ నమోదు చేయించుకోండి. తల్లికి మరియు పుట్టబోయే బిడ్డకు ధనుర్వాత రక్షణకు ఇది ఎంతో ముఖ్యం."
  },
  {
    id: "apt-3",
    title: "1st Antenatal Registration & Baseline Blood Profiling",
    titleTe: "1వ గర్భధారణ నమోదు & ప్రాథమిక ల్యాబ్ టెస్టులు",
    doctor: "Dr. M. Swetha, MBBS",
    facility: "PHC Rustumbada",
    facilityTe: "పి.హెచ్.సి రుస్తుంబాడ",
    phone: "08814221199",
    date: "2026-06-02",
    time: "09:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష (ANC)",
    eventClass: "completed",
    status: "completed",
    prepInstructions: "RCH portal ID registered. Blood grouping (B+), Baseline Hb recorded at 10.8 g/dL.",
    prepInstructionsTe: "ఆర్.సి.హెచ్ పోర్టల్ లో నమోదు పూర్తి. రక్త గ్రూప్ B పాజిటివ్, బేస్‌లైన్ హిమోగ్లోబిన్ 10.8 గ్రా/డిఎల్."
  },
  {
    id: "apt-4",
    title: "2nd Antenatal Care (ANC) & Anomaly Scan Review",
    titleTe: "2వ గర్భధారణ చెకప్ & అనామలీ స్కాన్",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Community Health Centre (CHC) Narasapur",
    facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్ నరసాపురం",
    phone: "08814223456",
    date: "2026-08-20",
    time: "10:00 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష (ANC)",
    eventClass: "completed",
    status: "completed",
    prepInstructions: "Gestational age 20 weeks. Normal fetal anatomy verified. Prescribed IFA and Calcium tablets.",
    prepInstructionsTe: "20 వారాల అల్ట్రాసౌండ్ స్కాన్ పరిశీలన. శిశువు ఎదుగుదల బాగుంది. డాక్టర్ ఐరన్ మరియు క్యాల్షియం సూచించారు."
  },
  {
    id: "apt-5",
    title: "4th Antenatal Assessment & Birth Preparedness",
    titleTe: "4వ గర్భధారణ ముగింపు పరీక్ష & ప్రసవ సన్నద్ధత",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Govt Area Hospital Maternity Wing",
    facilityTe: "ప్రభుత్వ ప్రాంతీయ ఆసుపత్రి ప్రసూతి విభాగం",
    phone: "08814228800",
    date: "2026-12-22",
    time: "10:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష (ANC)",
    eventClass: "anc",
    status: "scheduled",
    prepInstructions: "Pre-delivery pelvic assessment, check baby's head engagement, review hospital bag checklist and transport plan.",
    prepInstructionsTe: "ప్రసవానికి ముందు బేబీ తల స్థానం మరియు కటి పరిమాణం పరిశీలన. ఆసుపత్రి కిట్ మరియు వాహన ప్రణాళిక సిద్ధం చేసుకోవాలి."
  },
  {
    id: "apt-6",
    title: "Infant Immunization Clinic — Birth Doses & Weight",
    titleTe: "శిశువు ప్రారంభ టీకాలు (BCG, OPV-0) & బరువు",
    doctor: "Paediatric Duty MO",
    facility: "Maternity Ward Immunization Cell",
    facilityTe: "ప్రసూతి వార్డు టీకా కేంద్రం",
    phone: "08814228800",
    date: "2026-10-28",
    time: "09:00 AM",
    type: "Vaccination",
    typeTe: "శిశువు టీకా",
    eventClass: "vaccine",
    status: "scheduled",
    prepInstructions: "Administer BCG, OPV-0, and Hepatitis B birth dose within 24 hours of delivery. Issue Mother-Child Protection (MCP) booklet.",
    prepInstructionsTe: "పుట్టిన 24 గంటల్లోపు బిసిజి, పోలియో చుక్కలు, హెపటైటిస్ బి ఇవ్వాలి. మాతా శిశు సంరక్షణ కార్డు జారీ."
  }
];

export default function Appointments({
  appointments = [],
  onAddAppointment,
  onToggleComplete,
  onDeleteAppointment,
  lang = "te"
}) {
  const [viewMode, setViewMode] = useState("calendar"); // calendar, list
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [selectedEvent, setSelectedEvent] = useState(null); // For Side-Drawer
  const [showAddModal, setShowAddModal] = useState(false);
  const [filterClass, setFilterClass] = useState("all"); // all, completed, anc, vaccine
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Combine user-added appointments with default protocol milestones ensuring no ID conflicts
  const allEvents = useMemo(() => {
    const defaultIds = new Set(defaultProtocolMilestones.map(m => m.id));
    const custom = appointments.filter(a => !defaultIds.has(a.id)).map(a => ({
      ...a,
      eventClass: a.status === "completed" ? "completed" : a.type === "Vaccination" ? "vaccine" : "anc",
      prepInstructions: a.notes || (lang === "te" ? "తల్లి కార్డు తీసుకురండి." : "Bring MCP Mother Card and scan reports."),
      prepInstructionsTe: a.notesTe || a.notes || "తల్లి కార్డు మరియు రిపోర్టులు తీసుకురండి."
    }));

    // Merge default protocols updating any toggled completion from appointments
    const mergedDefaults = defaultProtocolMilestones.map(def => {
      const match = appointments.find(a => a.id === def.id);
      if (match) {
        return {
          ...def,
          status: match.status,
          date: match.date || def.date,
          time: match.time || def.time,
          eventClass: match.status === "completed" ? "completed" : def.eventClass
        };
      }
      return def;
    });

    return [...mergedDefaults, ...custom];
  }, [appointments, lang]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    titleTe: "",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Community Health Centre (CHC) Narasapur",
    facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్",
    phone: "08814223456",
    date: "2026-10-18",
    time: "10:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష",
    notes: "Review hemoglobin test results and blood pressure.",
    notesTe: "రక్తహీనత మరియు రక్తపోటు పరీక్ష."
  });

  // Calendar matrix calculations
  const monthNamesEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthNamesTe = [
    "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
    "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"
  ];

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Find events for a given calendar day (YYYY-MM-DD)
  const getEventsForDay = (dayNumber) => {
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(dayNumber).padStart(2, '0');
    const dateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

    return allEvents.filter(ev => {
      if (filterClass !== "all") {
        if (filterClass === "completed" && ev.status !== "completed") return false;
        if (filterClass === "anc" && (ev.status === "completed" || ev.eventClass !== "anc")) return false;
        if (filterClass === "vaccine" && (ev.status === "completed" || ev.eventClass !== "vaccine")) return false;
      }
      return ev.date === dateStr;
    });
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    const newApt = {
      id: `apt-${Date.now()}`,
      ...formData,
      titleTe: formData.title,
      status: "scheduled",
      eventClass: formData.type === "Vaccination" ? "vaccine" : "anc"
    };

    onAddAppointment(newApt);
    setShowAddModal(false);
  };

  const handleToggleEventStatus = (eventItem) => {
    onToggleComplete(eventItem.id);
    if (selectedEvent && selectedEvent.id === eventItem.id) {
      setSelectedEvent(prev => ({
        ...prev,
        status: prev.status === "completed" ? "scheduled" : "completed",
        eventClass: prev.status === "completed" ? (prev.type === "Vaccination" ? "vaccine" : "anc") : "completed"
      }));
    }
  };

  const handleSaveReschedule = (eventId) => {
    if (!rescheduleDate) return;
    // update appointment date
    const updated = allEvents.find(e => e.id === eventId);
    if (updated) {
      onAddAppointment({
        ...updated,
        date: rescheduleDate
      });
      if (selectedEvent) {
        setSelectedEvent(prev => ({ ...prev, date: rescheduleDate }));
      }
    }
    setIsRescheduling(false);
    setRescheduleDate("");
  };

  return (
    <div className="space-y-6 relative">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "జాతీయ 4-విజిట్ ANC మార్గదర్శకాలు" : "National 4-Visit ANC & Vaccine Protocol"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === "te" ? "మెడికల్ క్యాలెండర్ & డాక్టర్ అపాయింట్‌మెంట్లు" : "Medical Calendar & Doctor Appointments"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            {lang === "te"
              ? "భారత జాతీయ 4-విజిట్ గర్భ పరీక్షల ప్రణాళిక మరియు టీకాల తేదీలు. క్యాలెండర్ తేదీని నొక్కి వివరాల డ్రాయర్ తెరవండి."
              : "Integrated maternal calendar mapping mandatory ANC milestones and infant vaccinations. Tap any date to view clinical notes."}
          </p>
        </div>

        {/* View Switcher & Add Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          {/* Toggle Calendar vs List */}
          <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === "calendar"
                  ? "bg-white text-teal-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "te" ? "క్యాలెండర్ గ్రిడ్" : "Calendar Grid"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                viewMode === "list"
                  ? "bg-white text-teal-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "te" ? "జాబితా (List)" : "List View"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === "te" ? "కొత్త విజిట్" : "Add Visit"}</span>
          </button>
        </div>
      </div>

      {/* Protocol Legend & Filter Tabs */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Color-Coded Dot Legend */}
        <div className="flex items-center gap-4 text-xs font-bold flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
            <span className="text-slate-700">{lang === "te" ? "పూర్తయింది (Green)" : "Completed (Green)"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500 ring-2 ring-amber-200 animate-pulse"></span>
            <span className="text-slate-700">{lang === "te" ? "రాబోయే ANC (Amber)" : "Upcoming ANC (Amber)"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-purple-500 ring-2 ring-purple-200"></span>
            <span className="text-slate-700">{lang === "te" ? "శిశువు టీకాలు (Purple)" : "Infant Vaccines (Purple)"}</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: "all", labelEn: "All Events", labelTe: "అన్నీ" },
            { id: "anc", labelEn: "ANC Visits", labelTe: "ANC పరీక్షలు" },
            { id: "vaccine", labelEn: "Vaccines", labelTe: "టీకాలు" },
            { id: "completed", labelEn: "Completed", labelTe: "పూర్తయినవి" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterClass(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition border ${
                filterClass === tab.id
                  ? "bg-teal-700 text-white border-teal-700 shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
              }`}
            >
              {lang === "te" ? tab.labelTe : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* CALENDAR VIEW GRID */}
      {viewMode === "calendar" ? (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/80 shadow-md space-y-4">
          {/* Month & Year Navigation Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === "te" ? monthNamesTe[currentMonth] : monthNamesEn[currentMonth]} {currentYear}
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-bold border border-teal-200">
                {lang === "te" ? "గర్భధారణ టైమ్‌లైన్" : "Antenatal Timeline"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentMonth(9); // October 2026
                  setCurrentYear(2026);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                {lang === "te" ? "నేడు (Oct 2026)" : "Today (Oct 2026)"}
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName, idx) => (
              <div key={idx} className={idx === 0 ? "text-rose-400" : ""}>
                {dayName}
              </div>
            ))}
          </div>

          {/* 7-Column Calendar Grid Matrix */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Blank padding cells before month starts */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="min-h-[80px] sm:min-h-[105px] bg-slate-50/40 rounded-2xl border border-slate-100 opacity-40"></div>
            ))}

            {/* Calendar Day Cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const events = getEventsForDay(dayNum);
              const isToday = currentYear === 2026 && currentMonth === 9 && dayNum === 10;
              const hasEvents = events.length > 0;

              return (
                <div
                  key={`day-${dayNum}`}
                  onClick={() => {
                    if (hasEvents) {
                      setSelectedEvent(events[0]);
                    }
                  }}
                  className={`min-h-[80px] sm:min-h-[105px] p-2 rounded-2xl border transition-all flex flex-col justify-between select-none ${
                    hasEvents
                      ? "bg-white hover:border-teal-500 cursor-pointer shadow-xs hover:shadow-md"
                      : "bg-slate-50/50 hover:bg-slate-50 border-slate-100"
                  } ${isToday ? "ring-2 ring-teal-600 bg-teal-50/30" : "border-slate-200/80"}`}
                >
                  {/* Day Number Header */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      isToday
                        ? "w-6 h-6 rounded-full bg-teal-700 text-white flex items-center justify-center font-black"
                        : hasEvents
                        ? "text-slate-900 font-extrabold"
                        : "text-slate-500"
                    }`}>
                      {dayNum}
                    </span>

                    {/* Distinct Color-Coded Indicator Pins */}
                    {hasEvents && (
                      <div className="flex items-center gap-1">
                        {events.map((ev, eIdx) => {
                          const dotColor =
                            ev.status === "completed"
                              ? "bg-emerald-500 shadow-emerald-200"
                              : ev.eventClass === "vaccine"
                              ? "bg-purple-500 shadow-purple-200"
                              : "bg-amber-500 shadow-amber-200 animate-pulse";

                          return (
                            <span
                              key={eIdx}
                              className={`w-2.5 h-2.5 rounded-full ${dotColor} ring-2 ring-white shadow-xs`}
                              title={ev.title}
                            ></span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Event Chips for larger screens */}
                  <div className="space-y-1 mt-1">
                    {events.slice(0, 2).map((ev, eIdx) => {
                      const chipStyles =
                        ev.status === "completed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : ev.eventClass === "vaccine"
                          ? "bg-purple-100 text-purple-800 border-purple-200"
                          : "bg-amber-100 text-amber-900 border-amber-300 font-bold";

                      return (
                        <div
                          key={eIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEvent(ev);
                          }}
                          className={`hidden sm:block text-[10px] p-1 rounded-lg border truncate font-medium transition hover:scale-102 ${chipStyles}`}
                          title={ev.title}
                        >
                          {ev.time ? `${ev.time} ` : ""}{lang === "te" ? ev.titleTe || ev.title : ev.title}
                        </div>
                      );
                    })}

                    {events.length > 2 && (
                      <span className="hidden sm:inline-block text-[9px] text-slate-400 font-bold">
                        +{events.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {allEvents.map((apt) => {
            const isDone = apt.status === "completed";
            const isVaccine = apt.eventClass === "vaccine";

            return (
              <div
                key={apt.id}
                onClick={() => setSelectedEvent(apt)}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:border-teal-500 ${
                  isDone
                    ? "border-emerald-300 bg-emerald-50/20"
                    : isVaccine
                    ? "border-purple-300 bg-purple-50/15"
                    : "border-amber-300 bg-amber-50/15"
                }`}
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isDone
                        ? "bg-emerald-100 text-emerald-800"
                        : isVaccine
                        ? "bg-purple-100 text-purple-800"
                        : "bg-amber-100 text-amber-900"
                    }`}>
                      {lang === "te" ? apt.typeTe || apt.type : apt.type}
                    </span>

                    <h3 className="font-extrabold text-slate-900 text-base">
                      {lang === "te" ? apt.titleTe || apt.title : apt.title}
                    </h3>

                    {isDone && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {lang === "te" ? "పూర్తయింది" : "Completed"}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1 font-bold text-teal-800">
                      <CalendarIcon className="w-3.5 h-3.5 text-teal-600" />
                      {formatDate(apt.date, lang)}
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {apt.time}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {apt.doctor} • {apt.facility}
                    </span>
                  </div>

                  {apt.prepInstructions && (
                    <p className="text-xs text-slate-600 bg-white/80 p-2.5 rounded-xl border border-slate-200">
                      <strong>{lang === "te" ? "ముందస్తు సూచనలు:" : "Preparation:"}</strong>{" "}
                      {lang === "te" ? apt.prepInstructionsTe || apt.prepInstructions : apt.prepInstructions}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => handleToggleEventStatus(apt)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isDone
                        ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? (lang === "te" ? "మార్కింగ్ తీసివేయి" : "Undo") : (lang === "te" ? "పూర్తయింది" : "Mark Done")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedEvent(apt)}
                    className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold border border-teal-200 transition"
                  >
                    {lang === "te" ? "వివరాలు" : "Details"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CONTEXTUAL SIDE-DRAWER / MODAL FOR SELECTED EVENT */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg h-full shadow-2xl overflow-y-auto flex flex-col justify-between border-l border-slate-200 animate-slideInRight">
            <div>
              {/* Drawer Header */}
              <div className="bg-gradient-to-r from-teal-800 to-teal-900 text-white p-6 flex items-start justify-between">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                      selectedEvent.status === "completed"
                        ? "bg-emerald-400 text-emerald-950"
                        : selectedEvent.eventClass === "vaccine"
                        ? "bg-purple-300 text-purple-950"
                        : "bg-amber-300 text-amber-950"
                    }`}>
                      {selectedEvent.status === "completed"
                        ? "Completed Milestone"
                        : selectedEvent.eventClass === "vaccine"
                        ? "Infant Vaccination"
                        : "Upcoming ANC Visit"}
                    </span>
                  </div>

                  <h3 className="text-lg font-black leading-snug">
                    {lang === "te" ? selectedEvent.titleTe || selectedEvent.title : selectedEvent.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedEvent(null);
                    setIsRescheduling(false);
                  }}
                  className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-6 space-y-6">
                {/* Clinical Date, Time & Status */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                      {lang === "te" ? "తేదీ" : "Date"}
                    </span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1 mt-0.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-teal-700" />
                      {formatDate(selectedEvent.date, lang)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase text-[10px] block">
                      {lang === "te" ? "సమయం" : "Scheduled Time"}
                    </span>
                    <span className="font-bold text-slate-900 text-sm flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {selectedEvent.time}
                    </span>
                  </div>
                </div>

                {/* Facility & Doctor Details with Native Call Link */}
                <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {lang === "te" ? "వైద్యుడు & ఆసుపత్రి వివరాలు" : "Healthcare Provider & Facility"}
                  </h4>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 border border-teal-200">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{selectedEvent.doctor}</p>
                      <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-slate-400" />
                        {selectedEvent.facility}
                      </p>
                    </div>
                  </div>

                  {selectedEvent.phone && (
                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={`tel:${selectedEvent.phone.replace(/[^0-9+]/g, '')}`}
                        className="w-full py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs flex items-center justify-center gap-2 border border-teal-200 transition"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{lang === "te" ? "ఆసుపత్రికి నేరుగా కాల్ చేయండి" : "Call Facility Directly"}</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Preparation Instructions with Audio Playback */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
                      <span>{lang === "te" ? "ముందస్తు సన్నాహక సూచనలు" : "Clinical Preparation Instructions"}</span>
                    </h4>
                    <SpeechButton
                      text={lang === "te" ? selectedEvent.prepInstructionsTe || selectedEvent.prepInstructions : selectedEvent.prepInstructions}
                      lang={lang}
                      size="xs"
                    />
                  </div>

                  <p className="text-xs text-amber-950 font-medium leading-relaxed">
                    {lang === "te" ? selectedEvent.prepInstructionsTe || selectedEvent.prepInstructions : selectedEvent.prepInstructions}
                  </p>
                </div>

                {/* Reschedule Drawer Section */}
                {isRescheduling && (
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-3 animate-fadeIn">
                    <h4 className="text-xs font-bold text-blue-900">
                      {lang === "te" ? "కొత్త తేదీని ఎంచుకోండి (Reschedule)" : "Select New Appointment Date"}
                    </h4>
                    <input
                      type="date"
                      value={rescheduleDate}
                      onChange={(e) => setRescheduleDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-blue-300 text-sm bg-white"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleSaveReschedule(selectedEvent.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                      >
                        {lang === "te" ? "తేదీ మార్చండి" : "Confirm Reschedule"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsRescheduling(false)}
                        className="px-3 py-2 rounded-xl text-slate-600 text-xs font-bold"
                      >
                        {lang === "te" ? "రద్దు" : "Cancel"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Actions Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleToggleEventStatus(selectedEvent)}
                className={`w-full py-3.5 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition shadow-md ${
                  selectedEvent.status === "completed"
                    ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {selectedEvent.status === "completed"
                    ? (lang === "te" ? "పూర్తయింది మార్కింగ్ తొలగించు (Undo)" : "Undo Completed State")
                    : (lang === "te" ? "పూర్తయింది అని మార్క్ చేయండి (Mark Done)" : "Mark Visit as Completed")}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIsRescheduling(!isRescheduling)}
                className="w-full py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>{lang === "te" ? "తేదీ మార్పు కోరండి (Reschedule)" : "Request Reschedule"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Add Appointment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త చెకప్ లేదా టీకా అపాయింట్‌మెంట్" : "Add Scheduled Visit"}
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "పరీక్ష పేరు (Title)" : "Visit Title"} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 4th ANC Visit & BP check"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "తేదీ" : "Date"}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "సమయం" : "Time"}
                  </label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="10:30 AM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "వైద్యుడు లేదా ఆసుపత్రి" : "Doctor / Clinic"}
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
                  {lang === "te" ? "ముందస్తు సూచనలు (Preparation Notes)" : "Preparation Notes"}
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Carry ultrasound scan copy and MCP card"
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
                  {lang === "te" ? "సేవ్" : "Save Appointment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
