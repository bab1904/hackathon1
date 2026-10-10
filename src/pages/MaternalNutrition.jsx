import React, { useState } from 'react';
import {
  Apple, RefreshCw, Droplets, Check, Info, ShieldAlert,
  Sparkles, Coffee, Heart
} from 'lucide-react';
import { maternalNutritionPlans } from '../data/sampleHealthContent';

export default function MaternalNutrition({
  profile,
  lang = "te"
}) {
  const [selectedStage, setSelectedStage] = useState(
    profile.stage === "postpartum" ? 1 : 0
  );
  const [waterGlasses, setWaterGlasses] = useState(6);
  const [swappedMeals, setSwappedMeals] = useState({
    breakfast: 0,
    lunch: 0,
    dinner: 0,
    snacks: 0
  });

  const plan = maternalNutritionPlans[selectedStage] || maternalNutritionPlans[0];

  const handleSwap = (mealKey) => {
    const list = plan.meals[mealKey] || [];
    if (list.length > 1) {
      setSwappedMeals({
        ...swappedMeals,
        [mealKey]: (swappedMeals[mealKey] + 1) % list.length
      });
    }
  };

  const currentMeal = (mealKey) => {
    const list = plan.meals[mealKey] || [];
    const idx = (swappedMeals[mealKey] || 0) % (list.length || 1);
    return list[idx] || list[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <Apple className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "తల్లి పౌష్టికాహార ప్రణాళిక" : "Maternal Nutrition & Diet Planner"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "తల్లి & గర్భిణీ పోషకాహార మార్గదర్శి" : "Maternal Nutrition & Balanced Meal Ideas"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
            {lang === "te"
              ? "తక్కువ ఖర్చుతో కూడిన స్థానిక పోషకాహారం — రాగి, ఆకుకూరలు, పప్పు, కోడిగుడ్లు మరియు బెల్లం వంటి ఆరోగ్యకరమైన వంటకాలు."
              : "Affordable, culturally rooted nutrient-rich meal ideas for pregnancy energy and postpartum lactation."}
          </p>
        </div>

        {/* Stage Toggle */}
        <div className="flex gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto">
          {maternalNutritionPlans.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStage(idx)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                selectedStage === idx
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {lang === "te" ? p.stageTe : p.stage}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Water & Hydration Tracker */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-900 rounded-3xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-blue-200 uppercase">
            {lang === "te" ? "నీటి సమతుల్యత (హైడ్రేషన్)" : "Daily Hydration Tracker"}
          </span>
          <h3 className="text-lg font-bold text-white mt-1">
            {waterGlasses} / 10 {lang === "te" ? "గ్లాసుల నీరు తాగారు" : "Glasses Consumed"}
          </h3>
          <p className="text-xs text-blue-200 mt-0.5">
            {lang === "te"
              ? "తల్లి పాలు పుష్కలంగా ఊరడానికి మరియు ఉమ్మనీరు ఆరోగ్యంగా ఉండటానికి రోజుకు కనీసం 8-10 గ్లాసుల నీరు తాగాలి."
              : "Adequate hydration supports amniotic fluid, prevents urinary infections, and boosts breast milk volume."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWaterGlasses(Math.max(0, waterGlasses - 1))}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base flex items-center justify-center border border-white/20"
          >
            -
          </button>
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => (
              <Droplets
                key={i}
                className={`w-5 h-5 ${i < waterGlasses ? "text-cyan-300 fill-cyan-300" : "text-white/30"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setWaterGlasses(Math.min(15, waterGlasses + 1))}
            className="w-10 h-10 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-bold text-base flex items-center justify-center border border-white/20"
          >
            +
          </button>
        </div>
      </div>

      {/* Suggested 4-Meal Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "breakfast", labelEn: "Breakfast (ఉదయం అల్పాహారం)", labelTe: "ఉదయం టిఫిన్", icon: Apple },
          { key: "lunch", labelEn: "Lunch (మధ్యాహ్న భోజనం)", labelTe: "మధ్యాహ్న భోజనం", icon: Apple },
          { key: "snacks", labelEn: "Evening Snacks (సాయంత్రం స్నాక్స్)", labelTe: "సాయంత్రం స్నాక్స్", icon: Apple },
          { key: "dinner", labelEn: "Dinner (రాత్రి భోజనం)", labelTe: "రాత్రి డిన్నర్", icon: Apple }
        ].map((meal) => {
          const item = currentMeal(meal.key);

          return (
            <div
              key={meal.key}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {lang === "te" ? meal.labelTe : meal.labelEn}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold">
                    <span>{item.calories}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-emerald-700">{item.cost}</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {lang === "te" ? item.nameTe || item.name : item.name}
                </h3>
              </div>

              {/* 1-Tap Swap Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {lang === "te" ? "స్థానిక ప్రత్యామ్నాయం" : "Local Alternative"}
                </span>

                <button
                  type="button"
                  onClick={() => handleSwap(meal.key)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-teal-700" />
                  <span>{lang === "te" ? "వేరే వంటకం చూడండి" : "Swap Meal"}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Safety Notice for Prescriptions */}
      <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-amber-950 text-xs flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-900">
            {lang === "te" ? "ముఖ్యమైన వైద్య గమనిక:" : "Clinical Supplementation Notice:"}
          </p>
          <p className="text-[11px] leading-relaxed">
            {lang === "te"
              ? "పౌష్టికాహారం మంచిదే అయినప్పటికీ, రక్తహీనత నివారణకు డాక్టర్ సూచించిన ఐరన్ (IFA) మరియు క్యాల్షియం మాత్రలను రోజూ తప్పకుండా వేసుకోవాలి. ఆహారం వల్ల మాత్రలను మానేయకూడదు."
              : "While nutrient-dense foods are vital, they do not replace prescribed Iron & Folic Acid or Calcium tablets. Severe anemia requires full medical adherence."}
          </p>
        </div>
      </div>
    </div>
  );
}
