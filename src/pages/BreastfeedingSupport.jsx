import React, { useState } from 'react';
import {
  Heart, Sparkles, AlertCircle, HelpCircle, Check,
  Send, ShieldAlert, Phone, Baby, MessageSquare
} from 'lucide-react';
import { breastfeedingGuides } from '../data/sampleHealthContent';

export default function BreastfeedingSupport({
  profile,
  lang = "te"
}) {
  const [concernSubmitted, setConcernSubmitted] = useState(false);
  const [concernForm, setConcernForm] = useState({
    category: "latch",
    duration: "1-2 days",
    severity: "mild",
    notes: "",
    requestAshaVisit: true
  });

  const handleSubmitConcern = (e) => {
    e.preventDefault();
    setConcernSubmitted(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>{lang === "te" ? "తల్లిపాల సంరక్షణ & సలహాలు" : "Breastfeeding & Postpartum Recovery"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "తల్లిపాల సంరక్షణ & సరైన లాచ్ విధానం" : "Breastfeeding Support & Latch Care"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            {lang === "te"
              ? "తల్లిపాలే బిడ్డకు అమృతం. సరైన విధానంలో పాలివ్వడం, రొమ్ము నొప్పుల నివారణ మరియు ఆశా కార్యకర్త సహాయం ఇక్కడ పొందండి."
              : "Supportive latch guidance, troubleshooting common feeding soreness, and direct coordination with your community health worker."}
          </p>
        </div>

        {/* Emergency Call Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 shrink-0 space-y-1">
          <p className="font-bold text-slate-900">
            {lang === "te" ? "ఆశా కార్యకర్త సహాయం:" : "Your ASHA Contact:"}
          </p>
          <p className="text-teal-800 font-semibold">{profile.ashaWorkerName}</p>
          <a
            href={`tel:${profile.ashaWorkerPhone}`}
            className="inline-flex items-center gap-1.5 font-bold text-teal-700 hover:underline mt-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{profile.ashaWorkerPhone}</span>
          </a>
        </div>
      </div>

      {/* Latch and Position Guides */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          {lang === "te" ? "పాలివ్వడంలో మెళకువలు & నివారణ పద్ధతులు" : "Latch Technique & Relief Methods"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {breastfeedingGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? guide.topicTe : guide.topic}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {lang === "te" ? guide.summaryTe : guide.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-700 mb-1.5">
                  {lang === "te" ? "ముఖ్యమైన జాగ్రత్తలు:" : "Practical Steps:"}
                </p>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  {(lang === "te" ? guide.tipsTe : guide.tips).map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guided Concern Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            {lang === "te" ? "పాలివ్వడంలో సమస్య ఉందా? మార్గదర్శనం పొందండి" : "Guided Feeding Concern Form"}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {lang === "te" ? "మీ సమస్యను ఎంచుకోండి — సాధారణ సలహాలు మరియు ఆశా కార్యకర్త సహాయం అందుతాయి" : "Describe any difficulty for non-diagnostic guidance and ASHA support"}
          </p>
        </div>

        {concernSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
            <h4 className="font-bold text-base text-emerald-900 flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>{lang === "te" ? "సమస్య నమోదు చేయబడింది!" : "Concern Recorded Successfully!"}</span>
            </h4>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {lang === "te"
                ? "మీ ఆశా కార్యకర్త (M. భవాని) కు సమాచారం పంపబడింది. ఆమె మిమ్మల్ని త్వరలో సందర్శిస్తారు. ఈలోగా బిడ్డను ప్రతి 2 గంటలకు పాలు పట్టించడానికి ప్రయత్నించండి."
                : "Your concern has been noted. If symptoms worsen or baby refuses feeds, contact your Primary Health Centre or lactation specialist."}
            </p>
            <button
              onClick={() => setConcernSubmitted(false)}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
            >
              {lang === "te" ? "మరొక సమస్యను నమోదు చేయండి" : "Submit Another Concern"}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitConcern} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "te" ? "సమస్య రకం (Concern Category)" : "Concern Type"}
              </label>
              <select
                value={concernForm.category}
                onChange={(e) => setConcernForm({ ...concernForm, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              >
                <option value="latch">{lang === "te" ? "బిడ్డ సరిగ్గా రొమ్ము పట్టుకోలేకపోవడం (Latch difficulty)" : "Difficulty Latching"}</option>
                <option value="soreness">{lang === "te" ? "చనుమొనల తీవ్రమైన నొప్పి లేదా పగుళ్లు (Nipple soreness)" : "Severe Nipple Soreness / Cracks"}</option>
                <option value="engorgement">{lang === "te" ? "రొమ్ము గట్టిపడటం / వాపు (Engorgement)" : "Breast Fullness / Engorgement"}</option>
                <option value="low_supply">{lang === "te" ? "తల్లిపాలు సరిపోవడం లేదనే అనుమానం (Low milk perception)" : "Perceived Low Milk Supply"}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "ఎప్పటి నుండి ప్రారంభమైంది?" : "Started When?"}
                </label>
                <select
                  value={concernForm.duration}
                  onChange={(e) => setConcernForm({ ...concernForm, duration: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                >
                  <option value="today">{lang === "te" ? "ఈరోజే" : "Today"}</option>
                  <option value="1-2 days">{lang === "te" ? "1-2 రోజులు" : "1-2 Days"}</option>
                  <option value="more than 3 days">{lang === "te" ? "3 రోజుల కంటే ఎక్కువ" : "3+ Days"}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "తీవ్రత స్థాయి" : "Severity"}
                </label>
                <select
                  value={concernForm.severity}
                  onChange={(e) => setConcernForm({ ...concernForm, severity: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                >
                  <option value="mild">{lang === "te" ? "తేలికపాటి" : "Mild"}</option>
                  <option value="moderate">{lang === "te" ? "మధ్యస్థం" : "Moderate"}</option>
                  <option value="severe">{lang === "te" ? "తీవ్రమైన నొప్పి" : "Severe Pain"}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "te" ? "ఇతర వివరాలు (Optional Notes)" : "Optional Notes"}
              </label>
              <textarea
                rows="2"
                value={concernForm.notes}
                onChange={(e) => setConcernForm({ ...concernForm, notes: e.target.value })}
                placeholder={lang === "te" ? "ఉదా: పాలిచ్చేటప్పుడు మంటగా అనిపిస్తోంది..." : "Describe any specific symptoms..."}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ashaVisit"
                checked={concernForm.requestAshaVisit}
                onChange={(e) => setConcernForm({ ...concernForm, requestAshaVisit: e.target.checked })}
                className="w-4 h-4 text-teal-600 rounded"
              />
              <label htmlFor="ashaVisit" className="text-xs text-slate-700 font-semibold cursor-pointer">
                {lang === "te" ? "ఆశా కార్యకర్త ఇంటికి వచ్చి పరిశీలించాలని కోరుకుంటున్నాను" : "Request an ASHA health worker home visit"}
              </label>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-200 flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === "te" ? "సలహా పొందండి" : "Get Support Guidance"}</span>
            </button>
          </form>
        )}
      </div>

      {/* Critical Escalation Warning */}
      <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6 text-rose-950 space-y-2">
        <h3 className="font-bold text-sm text-rose-900 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-rose-700" />
          <span>{lang === "te" ? "వైద్యుడిని వెంటనే సంప్రదించాల్సిన అత్యవసర పరిస్థితులు" : "Urgent Red Flags Requiring Immediate Clinical Care"}</span>
        </h3>
        <p className="text-xs text-rose-900/90 leading-relaxed">
          {lang === "te"
            ? "బిడ్డ పాలు తాగడం పూర్తిగా మానేసినా, నిద్ర నుండి లేవడం కష్టంగా ఉన్నా, లేదా తల్లికి అధిక జ్వరం, రొమ్ములో ఎర్రటి వేడి గడ్డలు (మాస్టైటిస్) కనిపిస్తే వెంటనే ప్రాథమిక ఆరోగ్య కేంద్రం లేదా ఆసుపత్రికి వెళ్ళండి."
            : "If your infant refuses feeds, appears unusually lethargic / difficult to awaken, or if the mother develops high fever with hot red breast swelling (mastitis), seek immediate medical evaluation."}
        </p>
      </div>
    </div>
  );
}
