import React, { useState } from 'react';
import {
  Pill, CheckCircle2, XCircle, Plus, Calendar, Clock,
  ShieldAlert, AlertCircle, Sun, Moon, Sunset, Trash2,
  Check, X, FileText, ChevronRight
} from 'lucide-react';
import { medicationService } from '../services/medicationService';
import { getTodayKey, formatDate } from '../services/dateUtils';

export default function MedicationTracker({
  medications,
  dailyDoses,
  onUpdateDose,
  onAddPrescription,
  onDeletePrescription,
  lang = "te"
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayKey());

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
    setFormData({
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
      purpose: "Antenatal support",
      purposeTe: "గర్భధారణ మద్దతు"
    });
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
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "డాక్టర్ సూచించిన మందులు & రోజువారీ లాగ్" : "Doctor Prescribed Medicines & Daily Log"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {lang === "te"
              ? "గర్భిణీ స్త్రీలు తమ డాక్టర్ రాసిన ప్రిస్క్రిప్షన్ ప్రకారమే మందులు వేసుకోవాలి. ప్రతి రోజూ మందులు వేసుకున్నారా (✅) లేదా మిస్ అయ్యారా (❌) అనేది ఇక్కడ నమోదు చేయండి."
              : "Track medications strictly as written on your doctor's prescription. Mark whether today's dose was taken (✅) or missed (❌) to ensure safe maternal health."}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "te" ? "కొత్త మందును చేర్చండి" : "Add Prescription"}</span>
        </button>
      </div>

      {/* Compliance / 7-Day Streak Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-3xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-teal-200">
              {lang === "te" ? "గత 7 రోజుల మందుల క్రమశిక్షణ రికార్డు" : "7-Day Medication Adherence Record"}
            </h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">{adherence.percentage}%</span>
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

      {/* Active Prescriptions - Today's Status & Action */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === "te" ? "నేటి మందుల మోతాదుల రికార్డు (ఈరోజు)" : "Today's Dosage Status"}
          </h2>
          <span className="text-xs text-slate-400">
            {formatDate(getTodayKey(), lang)}
          </span>
        </div>

        <div className="space-y-3">
          {activeMeds.map((med) => {
            const todayLogs = (dailyDoses && dailyDoses[getTodayKey()]) || {};
            const currentStatus = todayLogs[med.id] || "pending";
            const isTaken = currentStatus === "taken";
            const isMissed = currentStatus === "missed";
            const slotInfo = getSlotDetails(med.slot);
            const SlotIcon = slotInfo.icon;

            return (
              <div
                key={med.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-xs ${
                  isTaken
                    ? "border-emerald-300 ring-2 ring-emerald-50 bg-emerald-50/20"
                    : isMissed
                    ? "border-rose-300 ring-2 ring-rose-50 bg-rose-50/20"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Medicine Information */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {lang === "te" ? med.nameTe || med.name : med.name}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-semibold">
                        <SlotIcon className={`w-3.5 h-3.5 ${slotInfo.color}`} />
                        <span>{lang === "te" ? med.timeLabelTe || med.timeLabel : med.timeLabel}</span>
                      </span>

                      {/* Status Badge */}
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1 ${
                        isTaken
                          ? "bg-emerald-100 text-emerald-800"
                          : isMissed
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {isTaken && <Check className="w-3 h-3" />}
                        {isMissed && <X className="w-3 h-3" />}
                        {isTaken
                          ? (lang === "te" ? "వేసుకున్నారు (✅)" : "Taken (✅)")
                          : isMissed
                          ? (lang === "te" ? "మిస్ అయ్యారు (❌)" : "Missed (❌)")
                          : (lang === "te" ? "పెండింగ్‌లో ఉంది (⏳)" : "Pending (⏳)")}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <div>
                        <strong className="text-slate-700">{lang === "te" ? "మోతాదు (డోసేజ్):" : "Dosage:"}</strong>{" "}
                        <span className="font-semibold text-teal-800">{med.dosage}</span>
                      </div>
                      <div>
                        <strong className="text-slate-700">{lang === "te" ? "డాక్టర్:" : "Prescribed By:"}</strong>{" "}
                        <span>{med.doctor} ({med.hospital})</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      <strong className="text-slate-800">{lang === "te" ? "డాక్టర్ సూచనలు:" : "Instructions:"}</strong>{" "}
                      <span>{lang === "te" ? med.instructionsTe || med.instructions : med.instructions}</span>
                      {med.purpose && (
                        <p className="mt-1 text-slate-500 text-[11px]">
                          <strong>{lang === "te" ? "ఉద్దేశ్యం:" : "Purpose:"}</strong> {lang === "te" ? med.purposeTe || med.purpose : med.purpose}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Tick / Cross Action Area */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
                    {/* Mark Taken Button (Tick) */}
                    <button
                      type="button"
                      onClick={() => onUpdateDose(med.id, isTaken ? "pending" : "taken")}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                        isTaken
                          ? "bg-emerald-600 text-white shadow-emerald-200 ring-2 ring-emerald-300"
                          : "bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-300"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>{lang === "te" ? "తీసుకున్నాను (✅)" : "Taken (✅)"}</span>
                    </button>

                    {/* Mark Missed Button (Cross) */}
                    <button
                      type="button"
                      onClick={() => onUpdateDose(med.id, isMissed ? "pending" : "missed")}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 shadow-sm ${
                        isMissed
                          ? "bg-rose-600 text-white shadow-rose-200 ring-2 ring-rose-300"
                          : "bg-white hover:bg-rose-50 text-rose-700 border border-rose-300"
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
                      title={lang === "te" ? "తొలగించండి" : "Delete Prescription"}
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

      {/* Clinical Guidance on Maternal Medicines */}
      <div className="bg-teal-50/70 border border-teal-200 rounded-3xl p-6 text-teal-950 space-y-3">
        <h3 className="font-bold text-sm text-teal-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-teal-700" />
          <span>{lang === "te" ? "గర్భధారణ మందుల ప్రాముఖ్యత & నియమాలు" : "Important Maternal Medication Guidelines"}</span>
        </h3>
        <ul className="text-xs text-teal-900/90 space-y-1.5 list-disc list-inside leading-relaxed">
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
              : "Dark stools or mild nausea can be normal side-effects of iron. Do not stop prescribed doses without clinical advice."}
          </li>
        </ul>
      </div>

      {/* Modal: Add New Prescription */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100">
            <div className="p-6 bg-teal-800 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {lang === "te" ? "కొత్త డాక్టర్ ప్రిస్క్రిప్షన్ చేర్చండి" : "Add Doctor Prescription"}
                </h3>
                <p className="text-xs text-teal-200">
                  {lang === "te" ? "డాక్టర్ రాసిన చీటీ ఆధారంగా నమోదు చేయండి" : "Enter details from your doctor's prescription slip"}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-xl hover:bg-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "మందు పేరు (Medicine Name)" : "Medicine Name"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Iron & Folic Acid, Calcium, Thyroxine"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value, nameTe: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "మోతాదు (Dosage)" : "Dosage Amount"}
                  </label>
                  <input
                    type="text"
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    placeholder="e.g. 1 Tablet / 5ml"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "సమయం (Time Slot)" : "Time Slot"}
                  </label>
                  <select
                    value={formData.slot}
                    onChange={(e) => {
                      const slot = e.target.value;
                      const timeLabel = slot === "morning" ? "Morning (Breakfast)"
                        : slot === "afternoon" ? "Afternoon (Lunch)"
                        : slot === "evening" ? "Evening (Snack)" : "Night (Dinner)";
                      const timeLabelTe = slot === "morning" ? "ఉదయం (టిఫిన్ తర్వాత)"
                        : slot === "afternoon" ? "మధ్యాహ్నం (భోజనం తర్వాత)"
                        : slot === "evening" ? "సాయంత్రం (స్నాక్స్)" : "రాత్రి (డిన్నర్ తర్వాత)";
                      setFormData({ ...formData, slot, timeLabel, timeLabelTe });
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="morning">Morning (ఉదయం)</option>
                    <option value="afternoon">Afternoon (మధ్యాహ్నం)</option>
                    <option value="evening">Evening (సాయంత్రం)</option>
                    <option value="night">Night (రాత్రి)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "డాక్టర్ లేదా ఆసుపత్రి పేరు" : "Prescribing Doctor / Hospital"}
                </label>
                <input
                  type="text"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  placeholder="e.g. Dr. Sunitha Reddy, CHC"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "డాక్టర్ సూచనలు (Instructions)" : "Special Instructions"}
                </label>
                <textarea
                  rows="2"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value, instructionsTe: e.target.value })}
                  placeholder="e.g. Take with water after dinner, avoid taking with milk"
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold"
                >
                  {lang === "te" ? "రద్దు" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md shadow-teal-200"
                >
                  {lang === "te" ? "సేవ్ చేయండి" : "Save Prescription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
