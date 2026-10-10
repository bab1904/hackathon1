import React, { useState } from 'react';
import {
  Calendar, Clock, Plus, Trash2, CheckCircle2, Building2,
  Bell, AlertCircle, Check, Filter
} from 'lucide-react';
import { formatDate, getTodayKey } from '../services/dateUtils';

export default function Appointments({
  appointments,
  onAddAppointment,
  onToggleComplete,
  onDeleteAppointment,
  lang = "te"
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [filter, setFilter] = useState("all"); // all, scheduled, completed
  const [formData, setFormData] = useState({
    title: "",
    titleTe: "",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Community Health Centre (CHC)",
    facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్",
    date: getTodayKey(),
    time: "10:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష",
    notes: ""
  });

  const filtered = appointments.filter(a => {
    if (filter === "scheduled") return a.status === "scheduled";
    if (filter === "completed") return a.status === "completed";
    return true;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    onAddAppointment({
      id: `apt-${Date.now()}`,
      ...formData,
      titleTe: formData.title,
      status: "scheduled"
    });

    setShowAddModal(false);
    setFormData({
      title: "",
      titleTe: "",
      doctor: "Dr. Sunitha Reddy, MS (OBG)",
      facility: "Community Health Centre (CHC)",
      facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్",
      date: getTodayKey(),
      time: "10:30 AM",
      type: "Antenatal",
      typeTe: "గర్భ పరీక్ష",
      notes: ""
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "కేంద్రీకృత వైద్య పరీక్షల క్యాలెండర్" : "Centralized Antenatal & Child Visits"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "వైద్య పరీక్షల అపాయింట్‌మెంట్లు" : "Doctor Visits & Appointments"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {lang === "te"
              ? "గర్భధారణ చెకప్‌లు, స్కానింగ్ తేదీలు మరియు టీకాల అపాయింట్‌మెంట్లను ఇక్కడ సులభంగా నిర్వహించండి."
              : "Manage ANC checkups, ultrasound scans, and postpartum reviews in one unified calendar."}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === "te" ? "కొత్త అపాయింట్‌మెంట్" : "Book / Add Visit"}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {[
          { id: "all", labelEn: "All Appointments", labelTe: "అన్నీ" },
          { id: "scheduled", labelEn: "Upcoming", labelTe: "రాబోయేవి" },
          { id: "completed", labelEn: "Completed", labelTe: "పూర్తయినవి" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition border ${
              filter === tab.id
                ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"
            }`}
          >
            {lang === "te" ? tab.labelTe : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filtered.map((apt) => {
          const isDone = apt.status === "completed";

          return (
            <div
              key={apt.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isDone ? "border-emerald-300 bg-emerald-50/20" : "border-slate-200"
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {lang === "te" ? apt.typeTe || apt.type : apt.type}
                  </span>

                  <h3 className="font-bold text-slate-900 text-base">
                    {lang === "te" ? apt.titleTe || apt.title : apt.title}
                  </h3>

                  {isDone && (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      {lang === "te" ? "పూర్తయింది" : "Completed"}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                  <span className="flex items-center gap-1 font-semibold text-teal-800">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" />
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

                {apt.notes && (
                  <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <strong>{lang === "te" ? "గమనిక:" : "Notes:"}</strong> {lang === "te" ? apt.notesTe || apt.notes : apt.notes}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => onToggleComplete(apt.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isDone
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isDone ? (lang === "te" ? "మార్కింగ్ తీసివేయి" : "Undo") : (lang === "te" ? "పూర్తయింది అని మార్క్ చేయండి" : "Mark Done")}</span>
                </button>

                <button
                  onClick={() => onDeleteAppointment(apt.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
            {lang === "te" ? "అపాయింట్‌మెంట్లు ఏవీ లేవు" : "No appointments found"}
          </div>
        )}
      </div>

      {/* Modal: Add Appointment */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త చెకప్ లేదా టీకా అపాయింట్‌మెంట్" : "Add Scheduled Visit"}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-3">
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
                  {lang === "te" ? "గమనికలు (Notes)" : "Notes"}
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
