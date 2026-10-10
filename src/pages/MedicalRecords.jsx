import React, { useState } from 'react';
import {
  FileText, Upload, Plus, Trash2, Search, Filter,
  Printer, Eye, Check, AlertCircle, FileCheck, ShieldCheck
} from 'lucide-react';
import { formatDate, getTodayKey } from '../services/dateUtils';

export default function MedicalRecords({
  records,
  onAddRecord,
  onDeleteRecord,
  lang = "te"
}) {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewRecord, setPreviewRecord] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Ultrasound",
    date: getTodayKey(),
    facility: "Govt Area Hospital / CHC",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    notes: "",
    fileName: "",
    ocrSimulatedText: ""
  });

  const categories = [
    { id: "all", labelEn: "All Reports", labelTe: "అన్ని నివేదికలు" },
    { id: "Ultrasound", labelEn: "Ultrasound Scans", labelTe: "అల్ట్రాసౌండ్ స్కాన్లు" },
    { id: "Blood Tests", labelEn: "Blood Tests & Lab", labelTe: "రక్త పరీక్షలు & ల్యాబ్" },
    { id: "Prescriptions", labelEn: "Prescriptions", labelTe: "మందుల చీటీలు" },
    { id: "Antenatal", labelEn: "Antenatal Cards", labelTe: "గర్భధారణ కార్డులు" }
  ];

  const filtered = records.filter((rec) => {
    const matchesCat = selectedCategory === "all" || rec.category === selectedCategory;
    const matchesQuery =
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.titleTe && rec.titleTe.includes(searchQuery)) ||
      rec.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload and browser OCR extraction
      const isScan = file.name.toLowerCase().includes("scan") || file.name.toLowerCase().includes("ultra");
      setFormData({
        ...formData,
        fileName: file.name,
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        ocrSimulatedText: isScan
          ? `EXTRACTED OCR: GESTATIONAL AGE: 22 WEEKS | AFI: NORMAL 13.5 CM | SINGLE LIVE FETUS | PLACENTA: ANTERIOR`
          : `EXTRACTED OCR: HB: 10.6 GM/DL | BLOOD GROUP: B+ | BLOOD PRESSURE: 118/76 MMHG | GLUCOSE: NORMAL`
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    onAddRecord({
      id: `rec-${Date.now()}`,
      ...formData,
      titleTe: formData.title
    });

    setShowUploadModal(false);
    setFormData({
      title: "",
      category: "Ultrasound",
      date: getTodayKey(),
      facility: "Govt Area Hospital / CHC",
      doctor: "Dr. Sunitha Reddy, MS (OBG)",
      notes: "",
      fileName: "",
      ocrSimulatedText: ""
    });
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5 text-teal-700" />
            <span>{lang === "te" ? "డిజిటల్ వైద్య నివేదికల నిర్వహణ" : "Digital Health Records Organizer"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "వైద్య నివేదికలు & స్కాన్ కాపీలు" : "Medical Records & Prescriptions"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {lang === "te"
              ? "మీ అల్ట్రాసౌండ్ స్కాన్లు, రక్త పరీక్షల నివేదికలు మరియు డాక్టర్ ప్రిస్క్రిప్షన్లను మీ ఫోన్ లోనే సురక్షితంగా భద్రపరుచుకోండి."
              : "Safely store your ultrasounds, lab results, and hospital slips offline on your personal device."}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">
          <button
            onClick={handlePrintSummary}
            className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>{lang === "te" ? "ప్రింట్ సారాంశం" : "Print Records"}</span>
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>{lang === "te" ? "రిపోర్టును అప్‌లోడ్ చేయండి" : "Upload Report"}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "te" ? "రిపోర్ట్ పేరు లేదా డాక్టర్ పేరు వెతకండి..." : "Search medical records..."}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {lang === "te" ? cat.labelTe : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records Cards List */}
      <div className="space-y-3">
        {filtered.map((rec) => (
          <div
            key={rec.id}
            className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  {rec.category}
                </span>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? rec.titleTe || rec.title : rec.title}
                </h3>
              </div>

              <p className="text-xs text-slate-600">
                <strong>{formatDate(rec.date, lang)}</strong> • {rec.facility} • {rec.doctor}
              </p>

              <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                {lang === "te" ? rec.notesTe || rec.notes : rec.notes}
              </p>

              {rec.fileName && (
                <p className="text-[11px] text-teal-700 font-semibold flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5" />
                  <span>{rec.fileName}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              {rec.ocrSimulatedText && (
                <button
                  onClick={() => setPreviewRecord(rec)}
                  className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{lang === "te" ? "వివరాలు చూడండి" : "View Details"}</span>
                </button>
              )}

              <button
                onClick={() => onDeleteRecord(rec.id)}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 text-xs">
            {lang === "te" ? "రిపోర్టులు ఏవీ లేవు" : "No medical records found"}
          </div>
        )}
      </div>

      {/* Modal: Upload Report */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "వైద్య నివేదికను అప్‌లోడ్ చేయండి" : "Upload Medical Record"}
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-3">
              {/* File input */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 text-center hover:bg-slate-50 transition">
                <input
                  type="file"
                  id="reportFile"
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="reportFile" className="cursor-pointer block">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-teal-700 block">
                    {formData.fileName || (lang === "te" ? "ఫోటో లేదా PDF ఫైల్ ఎంచుకోండి" : "Select Image or PDF")}
                  </span>
                  <span className="text-[10px] text-slate-400">PDF, JPG, PNG up to 10MB</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "నివేదిక శీర్షిక (Title)" : "Report Title"} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 2nd Trimester Anomaly Scan"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "వర్గం (Category)" : "Category"}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  >
                    <option value="Ultrasound">Ultrasound</option>
                    <option value="Blood Tests">Blood Tests</option>
                    <option value="Prescriptions">Prescriptions</option>
                    <option value="Antenatal">Antenatal Cards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "తేదీ" : "Date"}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "డాక్టర్ లేదా ల్యాబ్ పేరు" : "Doctor or Lab Name"}
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
                  {lang === "te" ? "ముఖ్య గమనికలు (Notes)" : "Notes"}
                </label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Normal fetal development, AFI 14cm"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                ></textarea>
              </div>

              {formData.ocrSimulatedText && (
                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-[11px] text-teal-900">
                  <p className="font-bold text-teal-800">Browser OCR Scan Extraction:</p>
                  <p className="font-mono mt-0.5">{formData.ocrSimulatedText}</p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    * Extracted data is unverified — please review before saving.
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  {lang === "te" ? "రద్దు" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-200"
                >
                  {lang === "te" ? "రిపోర్టు సేవ్ చేయండి" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details View Modal */}
      {previewRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {previewRecord.category}
                </span>
                <h3 className="font-bold text-lg text-slate-900 mt-1">
                  {lang === "te" ? previewRecord.titleTe || previewRecord.title : previewRecord.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewRecord(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Date:</strong> {formatDate(previewRecord.date, lang)}</p>
              <p><strong>Facility:</strong> {previewRecord.facility}</p>
              <p><strong>Doctor:</strong> {previewRecord.doctor}</p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong>Doctor Notes:</strong> {previewRecord.notes}
              </div>

              {previewRecord.ocrSimulatedText && (
                <div className="p-3 bg-teal-50 rounded-xl border border-teal-200 font-mono text-[11px] text-teal-900">
                  <strong>Digital OCR Text:</strong>
                  <p className="mt-1">{previewRecord.ocrSimulatedText}</p>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setPreviewRecord(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
