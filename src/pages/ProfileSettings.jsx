import React, { useState } from 'react';
import {
  UserCheck, Heart, Baby, Users, ShieldAlert,
  RotateCcw, Save, Trash2, Check, Globe, Building2,
  AlertTriangle, ArrowRight
} from 'lucide-react';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import ConfirmationModal from '../components/ConfirmationModal';
import SpeechButton from '../components/SpeechButton';

export default function ProfileSettings({
  profile,
  onSaveProfile,
  onResetData,
  preferredHospitalId,
  onSetPreferredHospital,
  lang = "te",
  onToggleLang
}) {
  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [resetModal, setResetModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetConfirm = () => {
    onResetData();
    setResetModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-2">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{lang === "te" ? "వ్యక్తిగత ప్రొఫైల్ & సంరక్షణ దశ" : "Profile & Care Stage Settings"}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            {lang === "te" ? "మీ ప్రొఫైల్ & సంరక్షణ ప్రాధాన్యతలు" : "My Profile & Healthcare Perspective"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {lang === "te"
              ? "మీ ప్రస్తుత సంరక్షణ దశను (గర్భవతి, బాలింత, శిశు సంరక్షణ, లేదా ఆశా కార్యకర్త మోడ్) మార్చుకోండి."
              : "Customize your healthcare stage, switch between individual maternal care and ASHA Community Worker Mode."}
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          type="button"
          onClick={() => setResetModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold text-xs border border-slate-200 transition flex items-center gap-1.5 shrink-0 self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{lang === "te" ? "డెమో డేటా రీసెట్" : "Reset Demo Data"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-900 text-xs font-black flex items-center gap-2 animate-fadeIn shadow-xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{lang === "te" ? "వివరాలు మరియు సంరక్షణ దశ విజయవంతంగా సేవ్ అయ్యాయి!" : "Profile & Healthcare Perspective updated successfully!"}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Care Stage Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                {lang === "te" ? "మీ ప్రస్తుత సంరక్షణ దశ (Care Stage & Perspective)" : "Your Current Healthcare Stage & Perspective"} *
              </label>
              <SpeechButton
                text={
                  lang === "te"
                    ? "సంరక్షణ దశ అమరిక. గర్భవతి, బాలింత, శిశు సంరక్షణ లేదా ఆశా కార్యకర్త మోడ్‌ను ఎంచుకోవచ్చు. ఆశా మోడ్‌ను ఎంచుకుంటే మల్టీ-పేషెంట్ ట్రియాజ్ డాష్‌బోర్డ్ కనిపిస్తుంది."
                    : "Select your care stage: Pregnancy, New Mother, Infant Care, or ASHA Worker mode. ASHA Worker mode unlocks the Village Multi-Patient Triage Dashboard."
                }
                lang={lang}
                size="xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { id: "pregnant", titleEn: "Pregnancy", titleTe: "గర్భవతి (గర్భధారణ)", descEn: "Week 24 Gestation", descTe: "24వ వారం గర్భం", icon: Heart },
                { id: "postpartum", titleEn: "New Mother", titleTe: "బాలింత (ప్రసవానంతర)", descEn: "Baby 4 Months", descTe: "శిశువు 4 నెలలు", icon: Baby },
                { id: "caregiver", titleEn: "Infant Care", titleTe: "శిశు సంరక్షణ", descEn: "Vaccines & Growth", descTe: "టీకాలు & ఎదుగుదల", icon: Users },
                { id: "asha", titleEn: "ASHA Worker", titleTe: "ఆశా కార్యకర్త మోడ్", descEn: "Village Triage Roster", descTe: "గ్రామ ట్రియాజ్ రోస్టర్", icon: UserCheck }
              ].map((stage) => {
                const Icon = stage.icon;
                const isSelected = formData.stage === stage.id;
                return (
                  <button
                    type="button"
                    key={stage.id}
                    onClick={() => setFormData({ ...formData, stage: stage.id })}
                    className={`p-4 rounded-2xl border-2 text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "bg-teal-50 border-teal-600 ring-4 ring-teal-600/10 text-teal-950 font-bold shadow-xs"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-teal-700" : "text-slate-400"}`} />
                      {isSelected && <Check className="w-4 h-4 text-teal-700 stroke-3" />}
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-black block">
                        {lang === "te" ? stage.titleTe : stage.titleEn}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">
                        {lang === "te" ? stage.descTe : stage.descEn}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ASHA Mode Notice if Selected */}
            {formData.stage === "asha" && (
              <div className="mt-3 p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 text-xs flex items-center gap-2 animate-fadeIn">
                <UserCheck className="w-4 h-4 text-teal-700 shrink-0" />
                <span>
                  {lang === "te"
                    ? "ఆశా కార్యకర్త మోడ్ ఎంచుకున్నారు: సేవ్ చేయగానే మీ ప్రధాన స్క్రీన్ గ్రామీణ మల్టీ-పేషెంట్ ట్రియాజ్ డాష్‌బోర్డ్ గా మారుతుంది."
                    : "ASHA Worker Mode selected: Saving transforms the primary screen into the Village Multi-Patient Triage Dashboard."}
                </span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "te" ? "తల్లి పేరు (Display Name)" : "Mother's Name"} *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value, nameTe: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {lang === "te" ? "గ్రామం / మండలం (Village & Location)" : "Village & Location"}
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value, villageTe: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Conditional Stage Fields */}
          {formData.stage === "pregnant" && (
            <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-4">
              <h4 className="font-bold text-xs text-teal-900 uppercase tracking-wide">
                {lang === "te" ? "గర్భధారణ వివరాలు" : "Pregnancy Specific Details"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "చివరి ఋతుక్రమం తేదీ (LMP Date)" : "Last Menstrual Period (LMP)"}
                  </label>
                  <input
                    type="date"
                    value={formData.lmpDate}
                    onChange={(e) => setFormData({ ...formData, lmpDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "అంచనా వేసిన డెలివరీ తేదీ (EDD)" : "Estimated Due Date (EDD)"}
                  </label>
                  <input
                    type="date"
                    value={formData.eddDate}
                    onChange={(e) => setFormData({ ...formData, eddDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Child details if postpartum/caregiver */}
          {(formData.stage === "postpartum" || formData.stage === "caregiver") && (
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-4">
              <h4 className="font-bold text-xs text-purple-900 uppercase tracking-wide">
                {lang === "te" ? "శిశువు వివరాలు" : "Infant Profile Details"}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "బిడ్డ పేరు" : "Child Name"}
                  </label>
                  <input
                    type="text"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value, childNameTe: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === "te" ? "పుట్టిన తేదీ (Date of Birth)" : "Date of Birth"}
                  </label>
                  <input
                    type="date"
                    value={formData.childDob}
                    onChange={(e) => setFormData({ ...formData, childDob: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="pt-2 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 active:scale-95 text-white font-black text-xs shadow-md shadow-teal-700/20 transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === "te" ? "వివరాలను సేవ్ చేయండి" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal for Demo Reset */}
      <ConfirmationModal
        isOpen={resetModal}
        onClose={() => setResetModal(false)}
        onConfirm={handleResetConfirm}
        title={lang === "te" ? "డెమో డేటా రీసెట్ చేయాలా?" : "Reset Demo Data?"}
        message={
          lang === "te"
            ? "ఇది అన్ని నమూనా మందులు, లక్ష్మీ దేవి వివరాలు మరియు టీకాల రికార్డులను అసలు స్థితికి పునరుద్ధరిస్తుంది."
            : "This will restore all default clinical prescriptions, ANC dates, and Lakshmi Devi's profile."
        }
        confirmText={lang === "te" ? "అవును, రీసెట్ చేయి" : "Yes, Reset"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        lang={lang}
      />
    </div>
  );
}
