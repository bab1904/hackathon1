import React, { useState } from 'react';
import {
  AlertOctagon, Phone, MapPin, Ambulance, Heart,
  Share2, Plus, Trash2, CheckCircle2, AlertTriangle,
  Download, Printer, FileText, Check, Copy, Volume2, ShieldAlert,
  ArrowRight, X, PhoneCall
} from 'lucide-react';
import { hospitalBagChecklist, emergencyDangerSigns } from '../data/sampleHealthContent';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import SpeechButton from '../components/SpeechButton';

export default function EmergencyHelp({
  contacts,
  onAddContact,
  onDeleteContact,
  preferredHospitalId,
  lang = "te"
}) {
  const [showSosVerifyModal, setShowSosVerifyModal] = useState(false);
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
      phone: newContact.phone.replace(/[^0-9+]/g, ''),
      isPrimary: false
    });
    setNewContact({ name: "", phone: "", relation: "Family" });
    setShowAddContact(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Mistake-Proof High-Contrast Emergency Header */}
      <div className="bg-gradient-to-br from-red-600 via-rose-700 to-red-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-red-500/40">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-white animate-pulse" />
              <span>{lang === "te" ? "తక్షణ అత్యవసర ప్రతిస్పందన (24/7)" : "24/7 Immediate Emergency Triage"}</span>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                {lang === "te" ? "ప్రసవ & అత్యవసర సహాయం (SOS)" : "Labour & Emergency SOS"}
              </h1>
              {/* Multilingual Voice Guidance Readout */}
              <SpeechButton
                text={
                  lang === "te"
                    ? "అత్యవసర హెచ్చరిక: తీవ్రమైన కడుపు నొప్పి, రక్తస్రావం, లేదా ఉమ్మనీరు కారితే వెంటనే ఎరుపు రంగు 112 బటన్ నొక్కి కాల్ చేయండి."
                    : "Emergency warning: In case of severe contractions, bleeding, or water breaking, immediately tap the red Call 112 button."
                }
                lang={lang}
                size="md"
              />
            </div>

            <p className="text-xs sm:text-sm text-red-100 font-medium leading-relaxed">
              {lang === "te"
                ? "కడుపు నొప్పి, రక్తస్రావం, లేదా ఉమ్మనీరు కారినప్పుడు ఆలస్యం చేయవద్దు. క్రింది భారీ బటన్లను ఒక్కసారి నొక్కడం ద్వారా నేరుగా ఫోన్ కాల్ ప్రారంభమవుతుంది."
                : "Designed for high-stress panic situations. Single-tap native hardware calling connects you immediately with ambulance dispatch and emergency teams."}
            </p>
          </div>

          {/* MASSIVE TACTILE CALL 112 NOW BUTTON */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowSosVerifyModal(true)}
              className="w-full sm:w-auto px-10 py-6 rounded-3xl bg-white hover:bg-red-50 text-red-600 font-black text-xl sm:text-2xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-4 ring-8 ring-white/30 group animate-pulse"
            >
              <PhoneCall className="w-8 h-8 text-red-600 group-hover:rotate-12 transition-transform" />
              <div className="text-left">
                <span className="block leading-none text-2xl sm:text-3xl font-black">
                  {lang === "te" ? "112 కి కాల్ చేయండి" : "CALL 112 NOW"}
                </span>
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">
                  {lang === "te" ? "జాతీయ అత్యవసర హెల్ప్‌లైన్" : "National Emergency Hotline"}
                </span>
              </div>
            </button>
            <span className="text-[11px] text-red-200 font-semibold">
              {lang === "te" ? "ట్యాప్ చేయగానే ధృవీకరణ పాప్-అప్ కనిపిస్తుంది" : "Tapping prompts rapid safety verification"}
            </span>
          </div>
        </div>
      </div>

      {/* OVERSIZED TACTICAL CALL ACTION BARS: 112, 108 Ambulance, 102 Janani */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 112 National */}
        <div className="bg-white rounded-3xl p-5 border-2 border-red-200 shadow-md flex flex-col justify-between hover:border-red-400 transition">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-red-100 text-red-700 font-black text-base">
                  112
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {lang === "te" ? "అత్యవసరం" : "Emergency"}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === "te" ? "జాతీయ అత్యవసర నంబర్ (112)" : "National Emergency (112)"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {lang === "te" ? "పోలీస్, ఫైర్, అంబులెన్స్ ఉమ్మడి సేవ" : "Unified ambulance & disaster response"}
              </p>
            </div>
            <SpeechButton
              text={
                lang === "te"
                  ? "జాతీయ అత్యవసర హెల్ప్‌లైన్ 112. ప్రసవ లేదా వైద్య అత్యవసర సమయంలో 112 కి కాల్ చేయండి."
                  : "National emergency helpline 112. Call for immediate maternal and clinical assistance."
              }
              lang={lang}
              size="sm"
            />
          </div>

          <a
            href="tel:112"
            className="mt-5 w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2.5 transition shadow-lg shadow-red-200 select-none"
          >
            <Phone className="w-4 h-4 animate-bounce" />
            <span>{lang === "te" ? "112 కి కాల్ చేయండి" : "CALL 112 NOW"}</span>
          </a>
        </div>

        {/* 108 Ambulance */}
        <div className="bg-white rounded-3xl p-5 border-2 border-amber-200 shadow-md flex flex-col justify-between hover:border-amber-400 transition">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-amber-100 text-amber-800 font-black text-base">
                  108
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {lang === "te" ? "అంబులెన్స్" : "Ambulance"}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === "te" ? "ఉచిత అంబులెన్స్ (108)" : "Medical Ambulance (108)"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {lang === "te" ? "గ్రామీణ అత్యవసర ప్రసవ రవాణా సర్వీస్" : "Free government emergency transit"}
              </p>
            </div>
            <SpeechButton
              text={
                lang === "te"
                  ? "108 అంబులెన్స్ సర్వీస్. గర్భిణీ స్త్రీలను ఆసుపత్రికి చేర్చడానికి ఉచిత వాహనం."
                  : "Dial 108 for free maternal ambulance transit to the nearest hospital."
              }
              lang={lang}
              size="sm"
            />
          </div>

          <a
            href="tel:108"
            className="mt-5 w-full py-4 rounded-2xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2.5 transition shadow-lg shadow-amber-200 select-none"
          >
            <Ambulance className="w-4 h-4 animate-pulse" />
            <span>{lang === "te" ? "108 కి కాల్ చేయండి" : "CALL 108 AMBULANCE"}</span>
          </a>
        </div>

        {/* 102 Janani Shishu */}
        <div className="bg-white rounded-3xl p-5 border-2 border-teal-200 shadow-md flex flex-col justify-between hover:border-teal-400 transition">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-xl bg-teal-100 text-teal-800 font-black text-base">
                  102
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {lang === "te" ? "జనని శిశు" : "Maternal Van"}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {lang === "te" ? "జనని శిశు ఎక్స్‌ప్రెస్ (102)" : "Janani Shishu Express (102)"}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {lang === "te" ? "తల్లీబిడ్డల క్లినికల్ రవాణా వాహనం" : "Maternal & newborn health transit"}
              </p>
            </div>
            <SpeechButton
              text={
                lang === "te"
                  ? "102 జనని శిశు ఎక్స్‌ప్రెస్. సురక్షిత ప్రసవాల కోసం ఉచిత రవాణా సేవ."
                  : "Dial 102 for Janani Shishu Express dedicated mother and newborn transport."
              }
              lang={lang}
              size="sm"
            />
          </div>

          <a
            href="tel:102"
            className="mt-5 w-full py-4 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2.5 transition shadow-lg shadow-teal-200 select-none"
          >
            <Phone className="w-4 h-4" />
            <span>{lang === "te" ? "102 కి కాల్ చేయండి" : "CALL 102 JANANI"}</span>
          </a>
        </div>
      </div>

      {/* TWO TACTILE COLUMNS: PREFERRED HOSPITAL DIRECT CALL & GPS LOCATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Preferred Hospital Massive Action Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-teal-600/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                {lang === "te" ? "మీ ముఖ్య ప్రసవ ఆసుపత్రి" : "Designated Delivery Hospital"}
              </span>
              <SpeechButton
                text={
                  lang === "te"
                    ? `మీ ముఖ్య ఆసుపత్రి ${prefHosp.nameTe || prefHosp.name}. డాక్టర్: ${prefHosp.doctorInCharge}. ఫోన్: ${prefHosp.phone}.`
                    : `Your primary delivery hospital is ${prefHosp.name}. In-charge: ${prefHosp.doctorInCharge}. Phone: ${prefHosp.phone}.`
                }
                lang={lang}
                size="sm"
              />
            </div>

            <h3 className="text-lg font-black text-slate-900">
              {lang === "te" ? prefHosp.nameTe || prefHosp.name : prefHosp.name}
            </h3>
            <p className="text-xs text-teal-800 font-bold mt-1">
              👨‍⚕️ {prefHosp.doctorInCharge} • 📍 {prefHosp.distanceKm}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {lang === "te" ? prefHosp.addressTe || prefHosp.address : prefHosp.address}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100">
            <a
              href={`tel:${prefHosp.phone.replace(/[^0-9+]/g, '')}`}
              className="w-full py-4 rounded-2xl bg-teal-800 hover:bg-teal-900 active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2.5 transition shadow-md shadow-teal-900/20"
            >
              <Phone className="w-5 h-5 animate-pulse" />
              <span>
                {lang === "te"
                  ? `హాస్పిటల్ కి కాల్ చేయండి (${prefHosp.phone})`
                  : `CALL HOSPITAL (${prefHosp.phone})`}
              </span>
            </a>
          </div>
        </div>

        {/* Live GPS Emergency Location Sharing */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                {lang === "te" ? "లైవ్ లొకేషన్ షేరింగ్" : "Live GPS Location Sharing"}
              </span>
              <SpeechButton
                text={
                  lang === "te"
                    ? "అంబులెన్స్ మిమ్మల్ని సులభంగా చేరుకోవడానికి మీ జీపీఎస్ లొకేషన్ ని వాట్సాప్ ద్వారా పంపండి."
                    : "Share your live GPS coordinates via WhatsApp so the ambulance team reaches you without delay."
                }
                lang={lang}
                size="sm"
              />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {lang === "te" ? "అంబులెన్స్ కోసం GPS లొకేషన్ పంపండి" : "Send GPS Location to Ambulance"}
            </h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {lang === "te"
                ? "గ్రామీణ ప్రాంతాల్లో చిరునామా వెతకడం కష్టమైనప్పుడు, మీ ప్రస్తుత GPS పాయింట్ అత్యవసర వాహనానికి మార్గం చూపుతుంది."
                : "Provides exact turn-by-turn navigation link so responders reach your exact rural home."}
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

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            {!locationState.lat ? (
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={locationState.loading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>
                  {locationState.loading
                    ? (lang === "te" ? "లొకేషన్ కనుగొంటోంది..." : "Acquiring GPS...")
                    : (lang === "te" ? "నా GPS లొకేషన్ తీసుకోండి" : "Detect My Live GPS")}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <button
                  type="button"
                  onClick={handleShareWhatsApp}
                  className="flex-1 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{lang === "te" ? "WhatsApp లో పంపండి" : "Share via WhatsApp"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyLocation}
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>{locationState.copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRUSTED FAMILY CONTACTS - OVERSIZED DIRECT CALL ACTION BARS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900">
                {lang === "te" ? "నమ్మకమైన కుటుంబ సభ్యుల అత్యవసర నంబర్లు" : "Trusted Family & Caregiver Contacts"}
              </h2>
              <SpeechButton
                text={
                  lang === "te"
                    ? "కుటుంబ సభ్యుల నంబర్లు. శ్రీనివాస్, పార్వతి, మరియు ఆశా వర్కర్ భవాని లకు నేరుగా కాల్ చేయవచ్చు."
                    : "Trusted emergency contacts. Tap the call buttons to instantly ring Srinivas, Parvathi, or ASHA worker Bhavani."
                }
                lang={lang}
                size="sm"
              />
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te"
                ? "శ్రీనివాస్, పార్వతి, మరియు భవాని లకు ఒక్క ట్యాప్ తో నేరుగా కాల్ చేయండి"
                : "Active hardware dialing connects instantly to your designated emergency circle"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddContact(true)}
            className="px-4 py-2.5 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === "te" ? "కొత్త నంబర్ జోడించండి" : "Add Contact"}</span>
          </button>
        </div>

        {/* Contacts Grid with Massive Direct Call Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map((contact) => {
            const rawPhone = (contact.phone || "").replace(/[^0-9+]/g, '');

            return (
              <div
                key={contact.id}
                className="p-5 rounded-3xl border-2 border-slate-200 bg-slate-50/60 hover:border-teal-500 transition-all flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {lang === "te" ? contact.nameTe || contact.name : contact.name}
                      </h4>
                      <span className="text-xs text-teal-800 font-bold px-2 py-0.5 rounded-full bg-teal-100/70 inline-block mt-1">
                        {contact.relation}
                      </span>
                      <p className="text-xs font-mono font-bold text-slate-700 mt-2">
                        📞 {contact.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <SpeechButton
                        text={
                          lang === "te"
                            ? `${contact.nameTe || contact.name} గారికి కాల్ చేయండి. ఫోన్ నంబర్ ${contact.phone}.`
                            : `Call ${contact.name}. Phone number ${contact.phone}.`
                        }
                        lang={lang}
                        size="xs"
                      />
                      {contacts.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onDeleteContact(contact.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove contact"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* ACTIVE HTML ANCHOR TELEPHONE CALL BUTTON */}
                <a
                  href={`tel:${rawPhone}`}
                  className="mt-4 w-full py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shadow-md shadow-teal-700/20"
                >
                  <Phone className="w-4 h-4 animate-pulse" />
                  <span>
                    {lang === "te"
                      ? `${(contact.nameTe || contact.name).split(' ')[0]} కి కాల్`
                      : `Call ${contact.name.split(' ')[0]}`}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>

      {/* CRITICAL PREGNANCY DANGER SIGNS WITH NATIVE AUDIO BUTTONS */}
      <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 text-rose-950 space-y-4 shadow-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-rose-600 shrink-0" />
            <div>
              <h2 className="text-base sm:text-lg font-black text-rose-950">
                {lang === "te" ? "వెంటనే ఆసుపత్రికి వెళ్లాల్సిన ప్రమాద సంకేతాలు" : "Critical Danger Signs — Seek Immediate Hospital Care"}
              </h2>
              <p className="text-xs text-rose-800">
                {lang === "te" ? "ఈ సంకేతాలు కనిపిస్తే ఒక్క క్షణం కూడా ఆలస్యం చేయవద్దు" : "If any of these occur, initiate emergency transport without delay"}
              </p>
            </div>
          </div>

          <SpeechButton
            text={
              lang === "te"
                ? "గర్భిణీ ప్రమాద సంకేతాలు: యోని నుండి రక్తస్రావం, తీవ్రమైన తలనొప్పి మరియు కంటిచూపు మందగించడం, ఉమ్మనీరు కారడం, తీవ్రమైన కడుపు నొప్పి, లేదా ఫిట్స్ రావడం."
                : "Critical danger signs include vaginal bleeding, severe continuous abdominal pain, convulsions, water breaking before labor, or high fever."
            }
            lang={lang}
            size="md"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {emergencyDangerSigns.map((ds, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white border border-rose-200 flex items-start justify-between gap-3 shadow-xs">
              <div className="space-y-1">
                <span className="text-xs font-black text-rose-700 block">
                  🚨 {ds.sign}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {ds.action}
                </p>
              </div>
              <SpeechButton
                text={`${ds.sign}. ${ds.action}`}
                lang={lang}
                size="xs"
              />
            </div>
          ))}
        </div>
      </div>

      {/* HOSPITAL BAG CHECKLIST */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {lang === "te" ? "ప్రసవ ఆసుపత్రి కిట్ చెక్‌లిస్ట్ (Hospital Bag)" : "Maternity Hospital Bag Checklist"}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {lang === "te"
                ? "36వ వారం నాటికి ఈ వస్తువులను బ్యాగ్‌లో సిద్ధం చేసి ఉంచుకోండి"
                : "Pack essentials by week 36 so you are ready whenever labor begins"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <SpeechButton
              text={
                lang === "te"
                  ? "ఆసుపత్రి కిట్: MCP తల్లి కార్డు, ఆధార్ కార్డు, శిశువు కోసం శుభ్రమైన నూలు బట్టలు, శానిటరీ ప్యాడ్లు, మరియు అత్యవసర నగదు."
                  : "Hospital bag checklist: MCP Mother Card, Aadhaar ID, baby swaddle clothes, maternity pads, and emergency cash."
              }
              lang={lang}
              size="sm"
            />
            <button
              type="button"
              onClick={handlePrintBag}
              className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "ప్రింట్" : "Print"}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {hospitalBagChecklist.map((item) => {
            const isDone = !!bagChecked[item.id];
            return (
              <div
                key={item.id}
                onClick={() => handleToggleBag(item.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  isDone
                    ? "bg-teal-50/70 border-teal-300 text-teal-950"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                    isDone ? "bg-teal-700 border-teal-700 text-white" : "border-slate-300 bg-white"
                  }`}>
                    {isDone && <Check className="w-3.5 h-3.5 stroke-3" />}
                  </div>
                  <span className={`text-xs font-semibold ${isDone ? "line-through text-slate-400" : ""}`}>
                    {item.item}
                  </span>
                </div>
                {item.mandatory && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                    Mandatory
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* EMERGENCY ALERT VERIFICATION MODAL WHEN "CALL 112" IS TAPPED */}
      {showSosVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border-4 border-red-500">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <AlertOctagon className="w-7 h-7 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900">
                    {lang === "te" ? "అత్యవసర 112 కాల్ నిర్ధారణ" : "Emergency SOS 112 Verification"}
                  </h3>
                  <p className="text-xs text-red-600 font-bold uppercase tracking-wider">
                    {lang === "te" ? "జాతీయ అత్యవసర సేవల డయలర్" : "National Emergency Dispatch"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSosVerifyModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-2 leading-relaxed">
              <p className="font-bold">
                {lang === "te"
                  ? "మీరు లేదా గర్భిణీ స్త్రీ తీవ్రమైన ప్రసవ నొప్పులు, రక్తస్రావం, లేదా అపస్మారక స్థితిని ఎదుర్కొంటున్నారా?"
                  : "Are you or the mother experiencing severe contractions, heavy bleeding, convulsions, or fainting?"}
              </p>
              <p className="text-red-800">
                {lang === "te"
                  ? "క్రింది నిర్ధారణ బటన్ నొక్కగానే మీ ఫోన్ వెంటనే 112 హెల్ప్‌లైన్‌కి కనెక్ట్ అవుతుంది."
                  : "Confirming will trigger a hardware phone call directly to 112 Emergency Dispatch."}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                onClick={() => setShowSosVerifyModal(false)}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-base flex items-center justify-center gap-3 transition shadow-xl shadow-red-300"
              >
                <PhoneCall className="w-6 h-6 animate-bounce" />
                <span>{lang === "te" ? "🚨 నిర్ధారించండి & 112 కి కాల్ చేయండి" : "🚨 CONFIRM & CALL 112 NOW"}</span>
              </a>

              <button
                type="button"
                onClick={() => setShowSosVerifyModal(false)}
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
              >
                {lang === "te" ? "రద్దు చేయండి (Cancel)" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త అత్యవసర నంబర్ జోడించండి" : "Add Emergency Contact"}
            </h3>

            <form onSubmit={handleSaveContact} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "పేరు" : "Contact Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="e.g. Srinivas (Husband)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "సంబంధం (Relation)" : "Relation"}
                </label>
                <input
                  type="text"
                  value={newContact.relation}
                  onChange={(e) => setNewContact({ ...newContact, relation: e.target.value })}
                  placeholder="e.g. Husband, Mother, Neighbor"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "ఫోన్ నంబర్" : "Phone Number"} *
                </label>
                <input
                  type="tel"
                  required
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="e.g. 9848011223"
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
                  {lang === "te" ? "సేవ్" : "Save Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
