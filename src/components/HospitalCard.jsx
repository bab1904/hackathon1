import React from 'react';
import {
  Phone, MapPin, Navigation, Clock, ShieldCheck, HeartPulse,
  Baby, Check, Star, AlertCircle
} from 'lucide-react';

export default function HospitalCard({
  hospital,
  isPreferred = false,
  onSetPreferred,
  onCallClick,
  lang = "te"
}) {
  const handleDirections = () => {
    const query = encodeURIComponent(`${hospital.name} ${hospital.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className={`bg-white rounded-3xl p-5 sm:p-6 shadow-sm border transition-all hover:shadow-md ${
      isPreferred ? "border-teal-500 ring-2 ring-teal-100" : "border-slate-200/80"
    }`}>
      {/* Header and badges */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
              hospital.type === "govt"
                ? "bg-emerald-100 text-emerald-800"
                : hospital.type === "maternity"
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            }`}>
              {lang === "te" ? hospital.categoryLabelTe || hospital.categoryLabel : hospital.categoryLabel}
            </span>

            {isPreferred && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300">
                <Star className="w-3 h-3 fill-teal-600 text-teal-600" />
                {lang === "te" ? "మీ అత్యవసర ఆసుపత్రి" : "My Emergency Choice"}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {lang === "te" ? hospital.nameTe || hospital.name : hospital.name}
          </h3>

          <p className="text-xs font-semibold text-teal-800 mt-1 flex items-center gap-1.5">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === "te" ? hospital.doctorInChargeTe || hospital.doctorInCharge : hospital.doctorInCharge}</span>
          </p>
        </div>

        {/* Distance indicator */}
        <div className="sm:text-right shrink-0">
          <div className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-2xl bg-slate-100 text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>{hospital.distanceKm}</span>
          </div>
        </div>
      </div>

      {/* Address & Hours */}
      <div className="mt-3.5 space-y-1.5 text-xs text-slate-600">
        <p className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>{lang === "te" ? hospital.addressTe || hospital.address : hospital.address}</span>
        </p>
        <p className="flex items-center gap-1.5 text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>{lang === "te" ? hospital.openHoursTe || hospital.openHours : hospital.openHours}</span>
        </p>
      </div>

      {/* Facilities Pills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {hospital.facilities.map((fac, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-xl font-medium ${
              fac.available
                ? "bg-slate-100 text-slate-700"
                : "bg-slate-50 text-slate-400 line-through"
            }`}
          >
            {fac.available && <Check className="w-3 h-3 text-emerald-600" />}
            {lang === "te" ? fac.nameTe || fac.name : fac.name}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
        {/* Set Preferred Button */}
        <div>
          {!isPreferred ? (
            <button
              onClick={() => onSetPreferred(hospital.id)}
              className="text-xs text-slate-600 hover:text-teal-700 font-bold px-3 py-2 rounded-xl hover:bg-slate-100 transition border border-dashed border-slate-300"
            >
              {lang === "te" ? "⭐ ముఖ్య ఆసుపత్రిగా మార్చు" : "⭐ Set as Preferred"}
            </button>
          ) : (
            <span className="text-xs text-teal-700 font-bold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {lang === "te" ? "ఎంపిక చేయబడింది" : "Default Hospital"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Directions */}
          <button
            onClick={handleDirections}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Navigation className="w-3.5 h-3.5 text-teal-600" />
            <span>{lang === "te" ? "మ్యాప్ / దారి" : "Directions"}</span>
          </button>

          {/* Call Hospital */}
          <a
            href={`tel:${hospital.phone.replace(/[^0-9+]/g, '')}`}
            className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-100 transition flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "ఫోన్ చేయండి" : "Call Now"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
