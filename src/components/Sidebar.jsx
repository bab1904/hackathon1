import React from 'react';
import {
  LayoutDashboard, Pill, Building2, Calendar, Syringe,
  AlertOctagon, Heart, Utensils, Apple, FileText,
  UserCheck, Users, ShieldAlert, Sparkles
} from 'lucide-react';

export default function Sidebar({
  activePage,
  onNavigatePage,
  lang = "te"
}) {
  const menuItems = [
    { id: "dashboard", labelEn: "Dashboard", labelTe: "డాష్‌బోర్డ్", icon: LayoutDashboard },
    { id: "medications", labelEn: "Daily Medicines (✅/❌)", labelTe: "రోజువారీ మందులు (✅/❌)", icon: Pill, badge: "New" },
    { id: "hospitals", labelEn: "Nearby Hospitals", labelTe: "దగ్గరి ఆసుపత్రులు", icon: Building2 },
    { id: "emergency", labelEn: "Emergency SOS (112)", labelTe: "ఎమర్జెన్సీ SOS (112)", icon: AlertOctagon, isSos: true },
    { id: "pregnancy", labelEn: "Pregnancy Care", labelTe: "గర్భధారణ సంరక్షణ", icon: Heart },
    { id: "vaccination", labelEn: "Baby Vaccines (NIS)", labelTe: "శిశువు టీకాలు (NIS)", icon: Syringe },
    { id: "appointments", labelEn: "Doctor Appointments", labelTe: "వైద్య పరీక్షలు", icon: Calendar },
    { id: "records", labelEn: "Medical Records", labelTe: "వైద్య నివేదికలు", icon: FileText },
    { id: "breastfeeding", labelEn: "Breastfeeding Care", labelTe: "తల్లిపాలు & సంరక్షణ", icon: Sparkles },
    { id: "child-nutrition", labelEn: "Child Nutrition & Growth", labelTe: "పిల్లల పోషకాహారం", icon: Utensils },
    { id: "maternal-nutrition", labelEn: "Mother's Nutrition", labelTe: "తల్లి పోషకాహారం", icon: Apple },
    { id: "profile", labelEn: "My Profile & Care Stage", labelTe: "నా ప్రొఫైల్", icon: UserCheck },
    { id: "asha", labelEn: "ASHA Worker Demo", labelTe: "ఆశా వర్కర్ డెమో", icon: Users }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-5rem)] p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {lang === "te" ? "ముఖ్య సేవలు" : "Core Modules"}
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigatePage(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? item.isSos
                    ? "bg-red-600 text-white shadow-md shadow-red-200"
                    : "bg-teal-700 text-white shadow-md shadow-teal-100"
                  : item.isSos
                  ? "text-red-600 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-100 hover:text-teal-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : item.isSos ? "text-red-600" : "text-slate-500"}`} />
                <span>{lang === "te" ? item.labelTe : item.labelEn}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold uppercase ${
                  isActive ? "bg-white/20 text-white" : "bg-teal-100 text-teal-800"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Safety Notice Footer Card */}
      <div className="mt-6 p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-[11px] leading-tight">
        <div className="flex items-center gap-1.5 font-bold mb-1">
          <ShieldAlert className="w-3.5 h-3.5 text-teal-700" />
          <span>{lang === "te" ? "సురక్షిత సహాయం" : "Safe Support"}</span>
        </div>
        <p className="text-teal-700 text-[10.5px]">
          {lang === "te"
            ? "వైద్య అత్యవసరాల కోసం ఎల్లప్పుడూ 112 లేదా స్థానిక డాక్టర్ ని సంప్రదించండి."
            : "Always consult a registered doctor or call 112 for medical emergencies."}
        </p>
      </div>
    </aside>
  );
}
