import React, { useState } from 'react';
import {
  LayoutDashboard, Pill, Building2, Syringe,
  Menu, X, Heart, AlertOctagon, FileText, Calendar,
  Utensils, Sparkles, UserCheck, Users
} from 'lucide-react';

export default function MobileNav({
  activePage,
  onNavigatePage,
  lang = "te"
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainTabs = [
    { id: "dashboard", labelEn: "Home", labelTe: "హోమ్", icon: LayoutDashboard },
    { id: "medications", labelEn: "Meds", labelTe: "మందులు", icon: Pill },
    { id: "hospitals", labelEn: "Hospitals", labelTe: "ఆసుపత్రులు", icon: Building2 },
    { id: "vaccination", labelEn: "Vaccines", labelTe: "టీకాలు", icon: Syringe },
    { id: "emergency", labelEn: "SOS", labelTe: "SOS", icon: AlertOctagon, isSos: true }
  ];

  const drawerItems = [
    { id: "pregnancy", labelEn: "Pregnancy Care", labelTe: "గర్భధారణ సంరక్షణ", icon: Heart },
    { id: "appointments", labelEn: "Doctor Appointments", labelTe: "వైద్య పరీక్షలు", icon: Calendar },
    { id: "records", labelEn: "Medical Records", labelTe: "వైద్య నివేదికలు", icon: FileText },
    { id: "breastfeeding", labelEn: "Breastfeeding Support", labelTe: "తల్లిపాలు & సంరక్షణ", icon: Sparkles },
    { id: "child-nutrition", labelEn: "Child Nutrition & Growth", labelTe: "పిల్లల పోషకాహారం", icon: Utensils },
    { id: "maternal-nutrition", labelEn: "Mother's Nutrition", labelTe: "తల్లి పోషకాహారం", icon: Utensils },
    { id: "profile", labelEn: "My Profile & Care Stage", labelTe: "నా ప్రొఫైల్", icon: UserCheck },
    { id: "asha", labelEn: "ASHA Worker Demo", labelTe: "ఆశా వర్కర్ డెమో", icon: Users }
  ];

  const handleSelect = (id) => {
    onNavigatePage(id);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 md:hidden shadow-lg px-2 py-1 flex items-center justify-around">
        {mainTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelect(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition ${
                isActive
                  ? tab.isSos
                    ? "text-red-600 font-extrabold"
                    : "text-teal-700 font-extrabold"
                  : tab.isSos
                  ? "text-red-500 font-bold"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? (tab.isSos ? "bg-red-50" : "bg-teal-50") : ""}`}>
                <Icon className={`w-5 h-5 ${tab.isSos ? "animate-pulse" : ""}`} />
              </div>
              <span className="text-[10px] mt-0.5 leading-none">
                {lang === "te" ? tab.labelTe : tab.labelEn}
              </span>
            </button>
          );
        })}

        {/* More Drawer Button */}
        <button
          onClick={() => setDrawerOpen(true)}
          className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition ${
            drawerOpen ? "text-teal-700 font-bold" : "text-slate-500"
          }`}
        >
          <div className="p-1 rounded-lg">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 leading-none">
            {lang === "te" ? "మరిన్ని" : "More"}
          </span>
        </button>
      </nav>

      {/* Slide-over Drawer for all pages */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-4/5 max-w-sm h-full p-5 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="font-extrabold text-slate-900 text-sm">
                  {lang === "te" ? "అన్ని సేవలు" : "All Health Services"}
                </span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {drawerItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                        isActive
                          ? "bg-teal-700 text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{lang === "te" ? item.labelTe : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                GramaMaa AI • {lang === "te" ? "మీ మాతా శిశు సంరక్షణ సహచరి" : "Maternal & Child Care"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
