import React, { useState } from 'react';
import {
  Building2, Search, Filter, Phone, MapPin, Star,
  ShieldCheck, AlertCircle, HeartHandshake, Ambulance
} from 'lucide-react';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import HospitalCard from '../components/HospitalCard';
import ConfirmationModal from '../components/ConfirmationModal';

export default function NearbyCare({
  preferredHospitalId,
  onSetPreferredHospital,
  lang = "te"
}) {
  const [filterType, setFilterType] = useState("all"); // all, govt, maternity, gynecologist
  const [searchQuery, setSearchQuery] = useState("");
  const [callModal, setCallModal] = useState({
    isOpen: false,
    name: "",
    phone: ""
  });

  const filteredHospitals = nearbyHospitalsData.filter((hosp) => {
    const matchesFilter = filterType === "all" || hosp.type === filterType;
    const matchesSearch =
      hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hosp.nameTe && hosp.nameTe.includes(searchQuery)) ||
      hosp.doctorInCharge.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hosp.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCallClick = (name, phone) => {
    setCallModal({
      isOpen: true,
      name,
      phone
    });
  };

  const handleConfirmCall = () => {
    if (callModal.phone) {
      window.location.href = `tel:${callModal.phone.replace(/[^0-9+]/g, '')}`;
    }
    setCallModal({ isOpen: false, name: "", phone: "" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "24/7 అత్యవసర ప్రసవ & గైనకాలజీ సేవలు" : "24/7 Delivery & Antenatal Directory"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "దగ్గరి ప్రసూతి ఆసుపత్రులు & గైనకాలజిస్టులు" : "Nearby Maternity Hospitals & Gynecologists"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {lang === "te"
              ? "మీ ప్రాంతంలో అందుబాటులో ఉన్న ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాలు (PHC), 24/7 డెలివరీ ఆసుపత్రులు మరియు నిపుణులైన గైనకాలజిస్టుల వివరాలు."
              : "Locate trusted 24/7 labor facilities, Government Primary Health Centres (PHCs) supporting free maternal schemes, and specialist obstetricians."}
          </p>
        </div>

        {/* Quick 108 Emergency Dial Badge */}
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-950 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
            <Ambulance className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-red-800 uppercase">
              {lang === "te" ? "అత్యవసర అంబులెన్స్" : "Emergency Ambulance"}
            </p>
            <a
              href="tel:108"
              className="text-base font-extrabold text-red-600 hover:underline flex items-center gap-1"
            >
              <span>108 / 102 Janani</span>
            </a>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "te"
                  ? "ఆసుపత్రి పేరు, డాక్టర్ పేరు, లేదా ఊరు వెతకండి..."
                  : "Search hospital name, doctor, or location..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 focus:bg-white transition"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none shrink-0">
            {[
              { id: "all", labelEn: "All Facilities", labelTe: "అన్నీ" },
              { id: "govt", labelEn: "Govt PHC / CHC", labelTe: "ప్రభుత్వ PHC" },
              { id: "maternity", labelEn: "Maternity Hospitals", labelTe: "ప్రసూతి ఆసుపత్రులు" },
              { id: "gynecologist", labelEn: "Gynecologists", labelTe: "గైనకాలజిస్టులు" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
                  filterType === tab.id
                    ? "bg-teal-700 text-white border-teal-700 shadow-sm"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {lang === "te" ? tab.labelTe : tab.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hospital Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
            isPreferred={preferredHospitalId === hospital.id}
            onSetPreferred={onSetPreferredHospital}
            onCallClick={handleCallClick}
            lang={lang}
          />
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">
            {lang === "te" ? "ఆసుపత్రులు కనుగొనబడలేదు" : "No Healthcare Facilities Found"}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {lang === "te" ? "దయచేసి వేరే కీవర్డ్ తో వెతకండి" : "Try clearing your search query or filters."}
          </p>
        </div>
      )}

      {/* Confirmation Modal for Phone Calls */}
      <ConfirmationModal
        isOpen={callModal.isOpen}
        title={lang === "te" ? "ఆసుపత్రికి ఫోన్ చేయాలా?" : "Call Healthcare Facility?"}
        message={
          lang === "te"
            ? `మీరు ${callModal.name} కు ఫోన్ చేయబోతున్నారు. కాల్ చేయడానికి ధృవీకరించండి.`
            : `You are about to initiate a call to ${callModal.name}. Please confirm to proceed.`
        }
        confirmText={lang === "te" ? "కాల్ చేయండి" : "Place Call"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        isPhoneCall={true}
        phoneNumber={callModal.phone}
        onConfirm={handleConfirmCall}
        onCancel={() => setCallModal({ isOpen: false, name: "", phone: "" })}
      />
    </div>
  );
}
