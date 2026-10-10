import React from 'react';
import {
  Heart, Mic, Pill, Building2, AlertOctagon, Syringe,
  Sparkles, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight,
  Utensils, Phone, Users
} from 'lucide-react';

export default function LandingPage({
  onGetStarted,
  onNavigatePage,
  onOpenVoice,
  lang = "te"
}) {
  const features = [
    {
      titleEn: "Telugu Voice Assistant",
      titleTe: "తెలుగు వాయిస్ సహచరి",
      descEn: "Speak naturally in Telugu or English. Ask about checkups, medicines, and vaccines.",
      descTe: "మాట్లాడి మీ సందేహాలు తీర్చుకోండి. చెకప్‌లు, మందులు మరియు టీకాల సమాచారం తెలుసుకోండి.",
      icon: Mic,
      color: "bg-teal-50 text-teal-700 border-teal-200"
    },
    {
      titleEn: "Daily Doctor Prescribed Medicines",
      titleTe: "డాక్టర్ సూచించిన రోజువారీ మందులు",
      descEn: "Track daily dosages with tick (✅) and cross (❌) marks so no dose is missed.",
      descTe: "డాక్టర్ రాసిన మోతాదు ప్రకారమే వేసుకున్నారా (✅) లేదా మిస్ అయ్యారా (❌) నమోదు చేయండి.",
      icon: Pill,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      titleEn: "Nearby Hospitals & Gynecologists",
      titleTe: "దగ్గరి ఆసుపత్రులు & గైనకాలజిస్టులు",
      descEn: "Find 24/7 delivery hospitals, Government PHCs, and call doctors with one tap.",
      descTe: "24/7 ప్రసవ ఆసుపత్రులు, ప్రభుత్వ PHCల వివరాలు మరియు ఒక్క ట్యాప్‌తో కాల్ సదుపాయం.",
      icon: Building2,
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      titleEn: "Labour & Emergency SOS (112)",
      titleTe: "అత్యవసర సహాయం (112)",
      descEn: "Direct emergency calling to 112, 108 ambulance, and saved trusted family members.",
      descTe: "112, 108 అంబులెన్స్ మరియు కుటుంబ సభ్యులకు తక్షణ ఎమర్జెన్సీ కాల్ సౌకర్యం.",
      icon: AlertOctagon,
      color: "bg-red-50 text-red-700 border-red-200"
    },
    {
      titleEn: "Official Indian Baby Vaccines (NIS)",
      titleTe: "భారత జాతీయ శిశు టీకాలు (NIS)",
      descEn: "Complete immunization timeline from birth to 5 years based on official guidelines.",
      descTe: "పుట్టినప్పటి నుండి 5 సంవత్సరాల వరకు అధికారిక ప్రభుత్వ మార్గదర్శకాల ప్రకారం టీకాల షెడ్యూల్.",
      icon: Syringe,
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      titleEn: "Child Nutrition & Growth Tracking",
      titleTe: "పిల్లల ఆహారం & పెరుగుదల",
      descEn: "Age-appropriate traditional Indian complementary foods and weight growth charts.",
      descTe: "రాగి జావ, కిచిడీ వంటి పౌష్టికాహార సలహాలు మరియు బరువు పెరుగుదల గ్రాఫ్.",
      icon: Utensils,
      color: "bg-orange-50 text-orange-700 border-orange-200"
    }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 text-white p-8 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-teal-100 text-xs font-bold mb-6">
            <Sparkles className="w-4 h-4 text-teal-200" />
            <span>
              {lang === "te"
                ? "గ్రామీణ మరియు సెమీ-అర్బన్ కుటుంబాల కోసం AI సహచరి"
                : "AI-Assisted Maternal & Child Healthcare Platform"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {lang === "te" ? (
              <>
                గ్రామమా AI — <br />
                <span className="text-teal-200">ప్రతి తల్లికి సంరక్షణ. ప్రతి బిడ్డకు ఆసరా.</span>
              </>
            ) : (
              <>
                GramaMaa AI — <br />
                <span className="text-teal-200">Care for Every Mother. Support for Every Child.</span>
              </>
            )}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-teal-100/90 leading-relaxed max-w-2xl font-normal">
            {lang === "te"
              ? "గర్భధారణ నుండి ప్రసవం, శిశువు టీకాలు, రోజువారీ మందుల మోతాదు మరియు పోషకాహారం వరకు — సమగ్ర మాతా శిశు సంరక్షణను మీ సొంత తెలుగు భాషలో మరియు ఒకే వేదికపై పొందండి."
              : "From pregnancy planning and antenatal care to labor, breastfeeding, doctor-prescribed medications, and infant vaccination — all simplified in one trustworthy, voice-enabled companion."}
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-6 py-3.5 rounded-2xl bg-white text-teal-900 hover:bg-teal-50 font-extrabold text-sm shadow-lg shadow-black/10 transition-all transform hover:scale-102 flex items-center gap-2"
            >
              <span>{lang === "te" ? "ప్రారంభించండి" : "Get Started Now"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenVoice}
              className="px-6 py-3.5 rounded-2xl bg-teal-600/60 hover:bg-teal-600 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition flex items-center gap-2"
            >
              <Mic className="w-4 h-4 text-teal-200 animate-pulse" />
              <span>{lang === "te" ? "వాయిస్ తో మాట్లాడండి" : "Try Voice Assistant"}</span>
            </button>
          </div>

          {/* Highlights checklist */}
          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-teal-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{lang === "te" ? "తెలుగు వాయిస్ సపోర్ట్" : "Telugu Voice Interaction"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{lang === "te" ? "రోజువారీ మందుల ట్రాకర్ (✅/❌)" : "Doctor Dosage Tracker (✅/❌)"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>{lang === "te" ? "1-ట్యాప్ ఎమర్జెన్సీ & హాస్పిటల్స్" : "1-Tap SOS 112 & Nearby Care"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {lang === "te" ? "ముఖ్య ఫీచర్లు & సేవలు" : "Essential Companion Features"}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {lang === "te"
              ? "గ్రామీణ కుటుంబాలు మరియు తల్లుల కోసం ప్రత్యేకంగా రూపొందించబడిన సులభమైన సాంకేతికత"
              : "Thoughtfully crafted for simplicity, accessibility, and high reliability"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${feat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? feat.titleTe : feat.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "te" ? feat.descTe : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Medical Safety & Doctor Coordination Notice */}
      <section className="rounded-3xl bg-amber-50/80 border border-amber-200 p-6 sm:p-8 text-amber-950 space-y-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-amber-700 shrink-0" />
          <h3 className="font-bold text-lg text-amber-900">
            {lang === "te" ? "వైద్యుల సూచనలు & భద్రతా నియమావళి" : "Medical Safety & Clinical Coordination"}
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
          {lang === "te"
            ? "గ్రామమా AI ఆరోగ్య సమాచారాన్ని సులభతరం చేసే సహాయక అప్లికేషన్ మాత్రమే. ఇది రోగ నిర్ధారణ చేయదు, మందులు సొంతంగా సూచించదు మరియు మీ డాక్టర్ లేదా ఆశా కార్యకర్తను భర్తీ చేయదు. డాక్టర్ రాసిన ప్రిస్క్రిప్షన్ ప్రకారమే మందులు వేసుకోండి. ఏదైనా అత్యవసర పరిస్థితిలో వెంటనే 112 లేదా ఆసుపత్రికి వెళ్ళండి."
            : "GramaMaa AI is an assistive healthcare support and coordination companion. It does not provide clinical diagnoses, promise fetal outcomes, or prescribe medications. Always take medicines strictly in accordance with your registered doctor's prescription. In emergencies, please utilize 112 or visit your nearest health facility immediately."}
        </p>
      </section>

      {/* Footer */}
      <footer className="pt-8 pb-12 border-t border-slate-200 text-slate-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-teal-600" />
          <span className="font-semibold text-slate-700">GramaMaa AI</span>
          <span>•</span>
          <span>{lang === "te" ? "గ్రామీణ మాతా శిశు సంరక్షణ సహచరి" : "Rural Maternal & Child Care"}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Privacy: Stored locally</span>
          <span>•</span>
          <span>Open UIP/NIS Data</span>
          <span>•</span>
          <span>Offline Ready</span>
        </div>
      </footer>
    </div>
  );
}
