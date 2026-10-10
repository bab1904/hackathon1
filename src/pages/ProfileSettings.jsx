import React, { useState } from 'react';
import {
  UserCheck, Heart, Baby, Users, ShieldAlert,
  RotateCcw, Save, Trash2, Check, Globe, Building2
} from 'lucide-react';
import { nearbyHospitalsData } from '../data/nearbyHospitalsData';
import ConfirmationModal from '../components/ConfirmationModal';

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
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === "te" ? "మీ ప్రొఫైల్ & వివరాల అమరిక" : "My Profile & Healthcare Preferences"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            {lang === "te"
              ? "మీ ప్రస్తుత సంరక్షణ దశను (గర్భవతి, బాలింత, లేదా శిశు సంరక్షణ) మార్చుకోండి మరియు వ్యక్తిగత వివరాలను సవరించండి."
              : "Customize your care journey, switch between pregnancy and child care, and manage local storage."}
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={() => setResetModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 font-bold text-xs border border-slate-200 transition flex items-center gap-1.5 shrink-0 self-start md:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{lang === "te" ? "డెమో డేటా రీసెట్" : "Reset Demo Data"}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{lang === "te" ? "వివరాలు విజయవంతంగా సేవ్ అయ్యాయి!" : "Profile updated successfully!"}</span>
        </div>
      )}

      {/* Main Profile Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Care Stage Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              {lang === "te" ? "మీ ప్రస్తుత సంరక్షణ దశ (Care Stage)" : "Your Current Healthcare Stage"} *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { id: "pregnant", titleEn: "Pregnancy", titleTe: "గర్భవతి (గర్భధారణ)", icon: Heart },
                { id: "postpartum", titleEn: "New Mother", titleTe: "బాలింత (ప్రసవానంతర)", icon: Baby },
                { id: "caregiver", titleEn: "Infant Care", titleTe: "శిశు సంరక్షణ", icon: Users },
                { id: "asha", titleEn: "ASHA Worker", titleTe: "ఆశా కార్యకర్త", icon: UserCheck }
              ].map((stage) => {
                const Icon = stage.icon;
                const isSelected = formData.stage === stage.id;
                return (
                  <button
                    type="button"
                    key={stage.id}
                    onClick={() => setFormData({ ...formData, stage: stage.id })}
                    className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? "bg-teal-50 border-teal-600 ring-2 ring-teal-600/20 text-teal-950 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${isSelected ? "text-teal-700" : "text-slate-400"}`} />
                      {isSelected && <Check className="w-4 h-4 text-teal-700" />}
                    </div>
                    <span className="text-xs sm:text-sm">
                      {lang === "te" ? stage.titleTe : stage.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>
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
                {lang === "te" ? "గ్రామం / మండలం (Village & Mandal)" : "Village & Location"}
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

          {(formData.stage === "postpartum" || formData.stage === "caregiver") && (
            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-4">
              <h4 className="font-bold text-xs text-purple-900 uppercase tracking-wide">
                {lang === "te" ? "శిశువు వివరాలు (Child Details)" : "Child Details"}
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

          {/* Preferred Hospital Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === "te" ? "మీ ముఖ్య అత్యవసర ఆసుపత్రి" : "My Preferred Emergency Hospital"}
            </label>
            <select
              value={preferredHospitalId}
              onChange={(e) => onSetPreferredHospital(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              {nearbyHospitalsData.map((hosp) => (
                <option key={hosp.id} value={hosp.id}>
                  {hosp.name} ({hosp.distanceKm})
                </option>
              ))}
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-md shadow-teal-200 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{lang === "te" ? "ప్రొఫైల్ సేవ్ చేయండి" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Local Storage Privacy Card */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
        <h4 className="font-bold text-slate-800 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-slate-600" />
          <span>{lang === "te" ? "వ్యక్తిగత సమాచార భద్రత (Privacy Policy)" : "Privacy & On-Device Storage"}</span>
        </h4>
        <p className="leading-relaxed">
          {lang === "te"
            ? "మీ వైద్య సమాచారం మరియు మందుల లాగ్‌లు ఏవీ బయటి సర్వర్‌లకు పంపబడవు. ఇవి పూర్తిగా మీ ఫోన్ మెమరీలోనే భద్రంగా దాచబడతాయి. మీరు ఎప్పుడైనా డెమో డేటాను తొలగించవచ్చు లేదా రీసెట్ చేయవచ్చు."
            : "All medical records, dosages, and profiles are persisted purely within local device storage. No clinical data is sent to external cloud servers without explicit configuration."}
        </p>
      </div>

      {/* Confirmation Modal for Reset */}
      <ConfirmationModal
        isOpen={resetModal}
        title={lang === "te" ? "డేటాను రీసెట్ చేయాలా?" : "Reset Demo Data?"}
        message={
          lang === "te"
            ? "ఇది మీ మందుల లాగ్‌లు, రికార్డులు మరియు అపాయింట్‌మెంట్లను తిరిగి ప్రారంభ డెమో స్థితికి రీసెట్ చేస్తుంది."
            : "This will restore initial sample records and reset all modified daily doses."
        }
        confirmText={lang === "te" ? "అవును, రీసెట్ చేయండి" : "Reset Data"}
        cancelText={lang === "te" ? "రద్దు" : "Cancel"}
        isDanger={true}
        onConfirm={handleResetConfirm}
        onCancel={() => setResetModal(false)}
      />
    </div>
  );
}
