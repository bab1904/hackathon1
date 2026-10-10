import React, { useState } from 'react';
import {
  AlertOctagon, Phone, MapPin, Ambulance, Heart,
  Share2, Plus, Trash2, CheckCircle2, AlertTriangle,
  Download, Printer, FileText, Check, Copy
} from 'lucide-react';
import { hospitalBagChecklist, emergencyDangerSigns } from '../data/sampleHealthContent';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import ConfirmationModal from '../components/ConfirmationModal';

export default function EmergencyHelp({
  contacts,
  onAddContact,
  onDeleteContact,
  preferredHospitalId,
  lang = "te"
}) {
  const [callModal, setCallModal] = useState({
    isOpen: false,
    name: "",
    phone: ""
  });

  const [locationState, setLocationState] = useState({
    loading: false,
    lat: null,
    lng: null,
    error: null,
    copied: false
  });

  const [bagChecked, setBagChecked] = useState({
    b1: true,
    b2: true,
    b3: false,
    b4: false,
    b5: false
  });

  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", phone: "", relation: "Family" });

  const prefHosp = nearbyHospitalsData.find(h => h.id === preferredHospitalId) || nearbyHospitalsData[0];

  const handleCall = (name, phone) => {
    setCallModal({
      isOpen: true,
      name,
      phone
    });
  };

  const confirmCall = () => {
    if (callModal.phone) {
      window.location.href = `tel:${callModal.phone.replace(/[^0-9+]/g, '')}`;
    }
    setCallModal({ isOpen: false, name: "", phone: "" });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationState({ ...locationState, error: "Geolocation is not supported by your browser." });
      return;
    }

    setLocationState({ ...locationState, loading: true, error: null });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationState({
          loading: false,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          error: null,
          copied: false
        });
      },
      (err) => {
        setLocationState({
          loading: false,
          lat: null,
          lng: null,
          error: "Location permission denied. Please enable GPS in device settings.",
          copied: false
        });
      },
      { timeout: 10000 }
    );
  };

  const handleShareWhatsApp = () => {
    if (!locationState.lat) return;
    const mapsUrl = `https://maps.google.com/?q=${locationState.lat},${locationState.lng}`;
    const text = encodeURIComponent(
      lang === "te"
        ? `అత్యవసరం! నాకు ప్రసవ సహాయం / వైద్య సహాయం అవసరం. నా ప్రస్తుత లొకేషన్: ${mapsUrl}`
        : `Emergency! I need maternal/labor assistance. My current location is: ${mapsUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleCopyLocation = () => {
    if (!locationState.lat) return;
    const mapsUrl = `https://maps.google.com/?q=${locationState.lat},${locationState.lng}`;
    navigator.clipboard.writeText(mapsUrl);
    setLocationState({ ...locationState, copied: true });
    setTimeout(() => setLocationState(prev => ({ ...prev, copied: false })), 2000);
  };

  const handlePrintBag = () => {
    window.print();
  };

  const handleToggleBag = (id) => {
    setBagChecked({ ...bagChecked, [id]: !bagChecked[id] });
  };

  const handleSaveContact = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    onAddContact({
      id: `c-${Date.now()}`,
      name: newContact.name,
      nameTe: newContact.name,
      relation: newContact.relation,
      phone: newContact.phone,
      isPrimary: false
    });
    setNewContact({ name: "", phone: "", relation: "Family" });
    setShowAddContact(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Warning Banner */}
      <div className="bg-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
            <AlertOctagon className="w-4 h-4 animate-pulse" />
            <span>{lang === "te" ? "24/7 అత్యవసర సహాయం" : "24/7 Emergency Response"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            {lang === "te" ? "అత్యవసర సహాయం & ప్రసవ రక్షణ" : "Labour & Emergency SOS"}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed font-medium">
            {lang === "te"
              ? "తీవ్రమైన కడుపు నొప్పి, రక్తస్రావం, లేదా ఉమ్మనీరు కారితే ఏమాత్రం ఆలస్యం చేయకుండా వెంటనే 112 లేదా 108 కి కాల్ చేయండి."
              : "In case of severe contractions, bleeding, water breaking, or fainting, dial national emergency helplines immediately."}
          </p>
        </div>

        {/* Big SOS Call Button */}
        <button
          onClick={() => handleCall("National Emergency 112", "112")}
          className="px-8 py-5 rounded-3xl bg-white text-red-600 hover:bg-red-50 font-black text-lg shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3 shrink-0 ring-4 ring-white/30 animate-pulse"
        >
          <Phone className="w-6 h-6 animate-bounce" />
          <span>{lang === "te" ? "112 కి కాల్ చేయండి" : "CALL 112 NOW"}</span>
        </button>
      </div>

      {/* Quick Emergency Helplines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* 112 National */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-sm mb-3">
              112
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {lang === "te" ? "జాతీయ అత్యవసర నంబర్ (112)" : "National Emergency (112)"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "te" ? "పోలీస్, ఫైర్, అంబులెన్స్ ఉమ్మడి సేవ" : "All-in-one emergency response"}
            </p>
          </div>
          <button
            onClick={() => handleCall("National Helpline 112", "112")}
            className="mt-4 w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 112</span>
          </button>
        </div>

        {/* 108 Ambulance */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm mb-3">
              108
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {lang === "te" ? "వైద్య అంబులెన్స్ (108)" : "Medical Ambulance (108)"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "te" ? "ఉచిత అత్యవసర అంబులెన్స్ సర్వీస్" : "Free government emergency transit"}
            </p>
          </div>
          <button
            onClick={() => handleCall("Medical Ambulance 108", "108")}
            className="mt-4 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 108</span>
          </button>
        </div>

        {/* 102 Janani Shishu */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-black text-sm mb-3">
              102
            </div>
            <h3 className="font-bold text-slate-900 text-sm">
              {lang === "te" ? "జనని శిశు వాహనం (102)" : "Janani Shishu Express (102)"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "te" ? "గర్భిణీలకు ఉచిత ప్రసవ రవాణా" : "Maternal & infant transit service"}
            </p>
          </div>
          <button
            onClick={() => handleCall("Janani Shishu Express 102", "102")}
            className="mt-4 w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 102</span>
          </button>
        </div>
      </div>

      {/* Two Columns: Preferred Hospital Speed-Dial & Live GPS Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Preferred Hospital Dial */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {lang === "te" ? "మీ ముఖ్య ప్రసవ ఆసుపత్రి" : "My Delivery Hospital"}
              </span>
              <Heart className="w-4 h-4 text-teal-600" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {lang === "te" ? prefHosp.nameTe || prefHosp.name : prefHosp.name}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              {prefHosp.doctorInCharge} • {prefHosp.distanceKm}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "te" ? prefHosp.addressTe || prefHosp.address : prefHosp.address}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-teal-900">{prefHosp.phone}</span>
            <button
              onClick={() => handleCall(prefHosp.name, prefHosp.phone)}
              className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "హాస్పిటల్ కి కాల్" : "Call Hospital"}</span>
            </button>
          </div>
        </div>

        {/* Live GPS Location Sharing */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {lang === "te" ? "లైవ్ లొకేషన్ షేరింగ్" : "Live GPS Location"}
              </span>
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {lang === "te" ? "మీ ప్రస్తుత లొకేషన్ ని కుటుంబానికి పంపండి" : "Share GPS Location with Family"}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {lang === "te"
                ? "అంబులెన్స్ లేదా కుటుంబ సభ్యులు మిమ్మల్ని త్వరగా చేరుకోవడానికి లైవ్ GPS లొకేషన్ తీసుకోండి."
                : "Allows ambulance and family to navigate directly to your location."}
            </p>

            {locationState.lat && (
              <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700">
                Lat: {locationState.lat.toFixed(5)}, Lng: {locationState.lng.toFixed(5)}
              </div>
            )}

            {locationState.error && (
              <p className="mt-2 text-xs text-rose-600 font-semibold">{locationState.error}</p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
            {!locationState.lat ? (
              <button
                onClick={handleGetLocation}
                disabled={locationState.loading}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{locationState.loading ? (lang === "te" ? "లొకేషన్ కనుగొంటోంది..." : "Detecting...") : (lang === "te" ? "GPS లొకేషన్ పొందండి" : "Get My GPS")}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleShareWhatsApp}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{lang === "te" ? "WhatsApp లో పంపండి" : "Share via WhatsApp"}</span>
                </button>
                <button
                  onClick={handleCopyLocation}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locationState.copied ? (lang === "te" ? "కాపీ అయింది!" : "Copied!") : (lang === "te" ? "లింక్ కాపీ" : "Copy Link")}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Trusted Family Contacts Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === "te" ? "నమ్మకమైన కుటుంబ సభ్యుల ఫోన్ నంబర్లు" : "Trusted Emergency Contacts"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te" ? "అత్యవసర సమయంలో ఒక్క క్లిక్ తో కాల్ చేయవచ్చు" : "One-tap direct calling in moments of need"}
            </p>
          </div>

          <button
            onClick={() => setShowAddContact(true)}
            className="px-3.5 py-2 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === "te" ? "కొత్త నంబర్" : "Add Contact"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {lang === "te" ? contact.nameTe || contact.name : contact.name}
                  </h4>
                  <span className="text-[11px] text-teal-800 font-semibold">{contact.relation}</span>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">{contact.phone}</p>
                </div>
                {contacts.length > 1 && (
                  <button
                    onClick={() => onDeleteContact(contact.id)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => handleCall(contact.name, contact.phone)}
                className="mt-3 w-full py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{lang === "te" ? "కాల్ చేయండి" : "Call Contact"}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Pregnancy Danger Signs */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 sm:p-8 text-rose-950 space-y-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
          <h2 className="text-base sm:text-lg font-bold text-rose-900">
            {lang === "te" ? "వెంటనే ఆసుపత్రికి వెళ్లాల్సిన ప్రమాద సంకేతాలు" : "Critical Warning Signs — Seek Immediate Care"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyDangerSigns.map((ds, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-white border border-rose-200 space-y-1">
              <span className="text-xs font-bold text-rose-700 block">
                {ds.sign}
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                {lang === "te" ? ds.descTe : ds.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Birth Hospital Bag Checklist */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === "te" ? "హాస్పిటల్ బ్యాగ్ & ప్రసవ సన్నద్ధత చెక్‌లిస్ట్" : "Birth Preparation & Hospital Bag Checklist"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te" ? "36 వారాలు రాకముందే ఈ వస్తువులను సిద్ధం చేసుకోండి" : "Prepare these items before 36 weeks of pregnancy"}
            </p>
          </div>

          <button
            onClick={handlePrintBag}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "ప్రింట్ చేయండి" : "Print Checklist"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {hospitalBagChecklist.map((item) => {
            const isDone = !!bagChecked[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleToggleBag(item.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start gap-3 ${
                  isDone
                    ? "bg-emerald-50/60 border-emerald-300 text-slate-900"
                    : "bg-slate-50/70 border-slate-200 text-slate-600"
                }`}
              >
                <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isDone ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                }`}>
                  {isDone && <Check className="w-3.5 h-3.5" />}
                </div>
                <div className="text-xs">
                  <span className="font-semibold block">
                    {lang === "te" ? item.textTe : item.text}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-medium">{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={callModal.isOpen}
        title={lang === "te" ? "కాల్ చేయాలా?" : "Place Emergency Call?"}
        message={
          lang === "te"
            ? `మీరు ${callModal.name} (${callModal.phone}) కు కాల్ చేయబోతున్నారు.`
            : `You are about to dial ${callModal.name} at ${callModal.phone}. Confirm to continue.`
        }
        confirmText={lang === "te" ? "కాల్ చేయండి" : "Call"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        isPhoneCall={true}
        phoneNumber={callModal.phone}
        onConfirm={confirmCall}
        onCancel={() => setCallModal({ isOpen: false, name: "", phone: "" })}
      />

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త అత్యవసర నంబర్ జోడించండి" : "Add Emergency Contact"}
            </h3>
            <form onSubmit={handleSaveContact} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "పేరు" : "Name"}
                </label>
                <input
                  type="text"
                  required
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="e.g. Ramesh (Brother)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "సంబంధం (Relation)" : "Relationship"}
                </label>
                <input
                  type="text"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  placeholder="e.g. Brother / Sister / Neighbor"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "ఫోన్ నంబర్" : "Phone Number"}
                </label>
                <input
                  type="tel"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="e.g. 9848012345"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  {lang === "te" ? "రద్దు" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-200"
                >
                  {lang === "te" ? "సేవ్" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
