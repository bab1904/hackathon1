import React, { useState } from 'react';
import {
  Users, AlertTriangle, ShieldCheck, Phone, CheckCircle2,
  Calendar, Syringe, Pill, Search, Filter
} from 'lucide-react';
import { initialAshaRoster } from '../data/demoData';
import ConfirmationModal from '../components/ConfirmationModal';

export default function HealthWorkerDemo({
  lang = "te"
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [callModal, setCallModal] = useState({
    isOpen: false,
    name: "",
    phone: ""
  });

  const filtered = initialAshaRoster.filter(p =>
    p.motherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.motherNameTe && p.motherNameTe.includes(searchQuery)) ||
    p.riskStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCallClick = (name, phone) => {
    setCallModal({ isOpen: true, name, phone });
  };

  const handleConfirmCall = () => {
    if (callModal.phone) {
      window.location.href = `tel:${callModal.phone}`;
    }
    setCallModal({ isOpen: false, name: "", phone: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "ఆశా / ANM కమ్యూనిటీ వర్కర్ ఇంటర్‌ఫేస్" : "ASHA / ANM Village Health Roster"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "గ్రామీణ మాతా శిశు సంరక్షణ రోస్టర్ (డెమో)" : "Village Beneficiary Roster (ASHA Demo)"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {lang === "te"
              ? "గ్రామంలోని గర్భిణీలు, బాలింతల ఆరోగ్య పరిస్థితి, హై-రిస్క్ హెచ్చరికలు, మరియు మందులు/టీకాల క్రమశిక్షణను పర్యవేక్షించండి."
              : "Demonstration tool for accredited social health activists (ASHA) to track high-risk pregnancies, missed vaccines, and daily medication compliance."}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shrink-0">
          <p className="font-bold text-slate-900">ASHA Center: Pedamainavanilanka</p>
          <p className="text-teal-700 font-semibold">Active Beneficiaries: 4 Fictional Profiles</p>
        </div>
      </div>

      {/* Safety Notice for Health Worker Portal */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <span>
          {lang === "te"
            ? "గమనిక: ఈ పేజీ ఆశా కార్యకర్తల పనితీరును ప్రదర్శించడానికి ఉద్దేశించిన డెమో మాత్రమే. వాస్తవ రోగుల డేటా నిర్వహణకు ప్రభుత్వం అనుమతించిన బయోమెట్రిక్ / RCH పోర్టల్ మాత్రమే ఉపయోగించాలి."
            : "Demonstration Note: This is a prototype mockup for community health workers using fictional data. Real beneficiary management requires authorized RCH portal authentication."}
        </span>
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "te" ? "తల్లి పేరు లేదా రిస్క్ స్టేటస్ వెతకండి..." : "Search beneficiary or risk status..."}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
          />
        </div>
      </div>

      {/* Roster Cards */}
      <div className="space-y-3">
        {filtered.map((person) => {
          const isHighRisk = person.riskColor === "red";
          const isAmber = person.riskColor === "amber";

          return (
            <div
              key={person.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isHighRisk
                  ? "border-rose-300 ring-1 ring-rose-100 bg-rose-50/15"
                  : isAmber
                  ? "border-amber-300 bg-amber-50/15"
                  : "border-slate-200"
              }`}
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-base">
                    {lang === "te" ? person.motherNameTe || person.motherName : person.motherName}
                  </h3>

                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                    {person.stage}
                  </span>

                  {/* Risk Badge */}
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                    isHighRisk
                      ? "bg-rose-100 text-rose-800"
                      : isAmber
                      ? "bg-amber-100 text-amber-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {isHighRisk && <AlertTriangle className="w-3 h-3" />}
                    <span>{person.riskStatus}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <p>
                    <strong className="text-slate-800">{lang === "te" ? "ప్రాంతం:" : "Area:"}</strong> {person.village}
                  </p>
                  <p>
                    <strong className="text-slate-800">{lang === "te" ? "టీకాల పరిస్థితి:" : "Vaccine:"}</strong> {person.vaccineCompliance}
                  </p>
                  <p>
                    <strong className="text-slate-800">{lang === "te" ? "మందుల క్రమశిక్షణ:" : "Med Adherence:"}</strong> {person.medicineAdherence}
                  </p>
                </div>
              </div>

              {/* Call beneficiary */}
              <div className="shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleCallClick(person.motherName, person.phone)}
                  className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === "te" ? "కాల్ చేయండి" : "Contact Mother"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={callModal.isOpen}
        title={lang === "te" ? "ఆరోగ్య కార్యకర్త కాల్" : "Call Beneficiary?"}
        message={
          lang === "te"
            ? `${callModal.name} (${callModal.phone}) కు కాల్ చేయబోతున్నారు.`
            : `Call ${callModal.name} at ${callModal.phone} for follow-up?`
        }
        confirmText={lang === "te" ? "కాల్ చేయండి" : "Call"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        isPhoneCall={true}
        phoneNumber={callModal.phone}
        onConfirm={handleConfirmCall}
        onCancel={() => setCallModal({ isOpen: false, name: "", phone: "" })}
      />
    </div>
  );
}
