import React, { useState } from 'react';
import {
  Utensils, Baby, TrendingUp, Plus, Calendar, Check,
  Printer, AlertCircle, Info, Heart, ShieldAlert
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { childNutritionGuidance } from '../data/sampleHealthContent';
import { calculateChildAge, formatDate, getTodayKey } from '../services/dateUtils';

export default function ChildNutrition({
  profile,
  growthRecords,
  onAddGrowthRecord,
  lang = "te"
}) {
  const [activeTab, setActiveTab] = useState("guidance"); // guidance, growth, diary
  const [showGrowthModal, setShowGrowthModal] = useState(false);
  const [newGrowth, setNewGrowth] = useState({
    month: "5 Months",
    monthTe: "5 నెలలు",
    weightKg: "",
    heightCm: "",
    whoWeightRef: 7.2
  });

  const [feedingDiary, setFeedingDiary] = useState([
    { id: "fd-1", date: "2026-10-10", time: "09:00 AM", food: "Ragi Malt with small jaggery", foodTe: "రాగి జావ", reaction: "Ate enthusiastically, no spit up" },
    { id: "fd-2", date: "2026-10-10", time: "01:30 PM", food: "Moong dal khichdi with ghee", foodTe: "పెసరపప్పు కిచిడీ", reaction: "Ate 4 spoons smoothly" },
    { id: "fd-3", date: "2026-10-09", time: "10:00 AM", food: "Mashed banana (half)", foodTe: "అరటిపండు గుజ్జు", reaction: "Well digested, active" }
  ]);

  const [newDiaryEntry, setNewDiaryEntry] = useState({
    food: "",
    time: "10:00 AM",
    reaction: "Well tolerated"
  });

  const childAge = calculateChildAge(profile.childDob);

  const handleAddGrowthSubmit = (e) => {
    e.preventDefault();
    if (!newGrowth.weightKg) return;

    onAddGrowthRecord({
      month: newGrowth.month,
      monthTe: newGrowth.monthTe,
      ageDays: growthRecords.length * 30 + 150,
      weightKg: parseFloat(newGrowth.weightKg),
      heightCm: parseFloat(newGrowth.heightCm || 65),
      whoWeightRef: newGrowth.whoWeightRef
    });

    setShowGrowthModal(false);
    setNewGrowth({ month: "6 Months", monthTe: "6 నెలలు", weightKg: "", heightCm: "", whoWeightRef: 7.5 });
  };

  const handleAddDiarySubmit = (e) => {
    e.preventDefault();
    if (!newDiaryEntry.food) return;

    setFeedingDiary([
      {
        id: `fd-${Date.now()}`,
        date: getTodayKey(),
        time: newDiaryEntry.time,
        food: newDiaryEntry.food,
        foodTe: newDiaryEntry.food,
        reaction: newDiaryEntry.reaction
      },
      ...feedingDiary
    ]);

    setNewDiaryEntry({ food: "", time: "10:00 AM", reaction: "Well tolerated" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold mb-2">
            <Utensils className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "పిల్లల పోషకాహారం & శారీరక ఎదుగుదల" : "Child Nutrition & Growth Monitoring"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te"
              ? `${profile.childNameTe || profile.childName} — ఆహారం & బరువు చార్ట్`
              : `${profile.childName}'s Feeding & Growth Journey`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {lang === "te" ? `బిడ్డ ప్రస్తుత వయస్సు: ${childAge.labelTe}` : `Child Current Age: ${childAge.labelEn}`}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          {[
            { id: "guidance", labelEn: "Food Guide", labelTe: "ఆహార సలహాలు" },
            { id: "growth", labelEn: "Growth Curve", labelTe: "బరువు గ్రాఫ్" },
            { id: "diary", labelEn: "Meal Diary", labelTe: "ఆహార డైరీ" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "te" ? tab.labelTe : tab.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Age-Appropriate Nutrition Guidance */}
      {activeTab === "guidance" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              {lang === "te"
                ? "WHO నిబంధనల ప్రకారం మొదటి 6 నెలలు తల్లిపాలు మాత్రమే ఇవ్వాలి. 6 నెలల తర్వాత తల్లిపాలతో పాటు పోషకాలతో కూడిన మెత్తని ఘనాహారాన్ని ప్రారంభించాలి."
                : "WHO recommends exclusive breastfeeding for the first 6 months. Begin nutritious complementary mashed foods after 180 days while continuing to breastfeed."}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {childNutritionGuidance.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-800">
                    {lang === "te" ? guide.ageRangeTe : guide.ageRange}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base">
                  {lang === "te" ? guide.headingTe : guide.heading}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {lang === "te" ? guide.descriptionTe : guide.description}
                </p>

                <div className="pt-3 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-800 mb-2">
                    {lang === "te" ? "సూచించిన ఆహార పదార్థాలు:" : "Recommended Indian Foods:"}
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {(lang === "te" ? guide.recommendedFoodsTe : guide.recommendedFoods).map((food, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Growth Chart (Weight & Height Line Chart) */}
      {activeTab === "growth" && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === "te" ? "శిశువు బరువు ఎదుగుదల గ్రాఫ్ (kg)" : "Weight Growth Trend vs WHO Reference"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {lang === "te" ? "ప్రతి నెలా ప్రాథమిక ఆరోగ్య కేంద్రంలో బరువు కొలిపించి నమోదు చేయండి" : "Track monthly weight gains against WHO child growth curves"}
                </p>
              </div>

              <button
                onClick={() => setShowGrowthModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === "te" ? "కొత్త బరువు నమోదు చేయండి" : "Log New Weight"}</span>
              </button>
            </div>

            {/* Recharts Line Chart */}
            <div className="w-full h-72 sm:h-80 pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthRecords} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis domain={[2, 10]} tick={{ fontSize: 11 }} unit="kg" />
                  <Tooltip
                    contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line
                    type="monotone"
                    dataKey="weightKg"
                    name={lang === "te" ? "శిశువు బరువు (kg)" : "Baby Weight (kg)"}
                    stroke="#0d9488"
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#0d9488" }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="whoWeightRef"
                    name={lang === "te" ? "WHO ప్రామాణిక బరువు (kg)" : "WHO Median (kg)"}
                    stroke="#94a3b8"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Growth Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>
                {lang === "te"
                  ? "గమనిక: ఒకే కొలతతో పోషకాహార లోపాన్ని నిర్ధారించలేము. బరువు తగ్గడం లేదా పెరుగుదల మందగిస్తే వెంటనే పీడియాట్రిషియన్ లేదా ఆశా కార్యకర్తను సంప్రదించండి."
                  : "Clinical notice: A single measurement does not diagnose malnutrition. If weight falters or plateaus, consult your paediatrician or ANM for nutritional assessment."}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Daily Feeding Diary */}
      {activeTab === "diary" && (
        <div className="space-y-6">
          {/* Add Entry Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <h3 className="font-bold text-base text-slate-900 mb-3">
              {lang === "te" ? "నేటి ఆహార లాగ్ నమోదు చేయండి" : "Log Today's Meal or Food Reaction"}
            </h3>

            <form onSubmit={handleAddDiarySubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                required
                value={newDiaryEntry.food}
                onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, food: e.target.value })}
                placeholder={lang === "te" ? "ఏమి ఆహారం ఇచ్చారు? (ఉదా: రాగి జావ, కిచిడీ)" : "Food item given (e.g. Ragi malt, Khichdi)"}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />

              <input
                type="text"
                value={newDiaryEntry.reaction}
                onChange={(e) => setNewDiaryEntry({ ...newDiaryEntry, reaction: e.target.value })}
                placeholder={lang === "te" ? "శిశువు ప్రతిస్పందన / జీర్ణమైందా?" : "Child reaction / well digested?"}
                className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />

              <button
                type="submit"
                className="px-5 py-2.5 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm shrink-0"
              >
                {lang === "te" ? "లాగ్ సేవ్" : "Save Meal"}
              </button>
            </form>
          </div>

          {/* Past Entries */}
          <div className="space-y-2.5">
            {feedingDiary.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {lang === "te" ? entry.foodTe || entry.food : entry.food}
                  </h4>
                  <p className="text-slate-500 mt-0.5">
                    {entry.reaction}
                  </p>
                </div>

                <div className="text-right text-slate-400 font-medium shrink-0">
                  <span>{entry.time}</span>
                  <p className="text-[10px]">{entry.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Growth Measurement */}
      {showGrowthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900">
              {lang === "te" ? "కొత్త బరువు కొలత నమోదు" : "Log Growth Measurement"}
            </h3>

            <form onSubmit={handleAddGrowthSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "వయస్సు / నెల" : "Age Month"}
                </label>
                <input
                  type="text"
                  required
                  value={newGrowth.month}
                  onChange={(e) => setNewGrowth({ ...newGrowth, month: e.target.value, monthTe: e.target.value })}
                  placeholder="e.g. 5 Months"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "బరువు (కిలోలలో - kg)" : "Weight in kg"} *
                </label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newGrowth.weightKg}
                  onChange={(e) => setNewGrowth({ ...newGrowth, weightKg: e.target.value })}
                  placeholder="e.g. 7.1"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === "te" ? "ఎత్తు / పొడవు (cm)" : "Length/Height in cm"}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={newGrowth.heightCm}
                  onChange={(e) => setNewGrowth({ ...newGrowth, heightCm: e.target.value })}
                  placeholder="e.g. 64.5"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowGrowthModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-bold hover:bg-slate-100"
                >
                  {lang === "te" ? "రద్దు" : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-md shadow-teal-200"
                >
                  {lang === "te" ? "సేవ్ చేయండి" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
