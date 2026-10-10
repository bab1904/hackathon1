import React, { useState, useEffect } from 'react';
import { storageService } from './services/storageService';
import { medicationService } from './services/medicationService';

// Reusable Components
import SafetyNotice from './components/SafetyNotice';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import VoiceAssistantModal from './components/VoiceAssistantModal';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import MedicationTracker from './pages/MedicationTracker';
import NearbyCare from './pages/NearbyCare';
import EmergencyHelp from './pages/EmergencyHelp';
import PregnancyCare from './pages/PregnancyCare';
import VaccinationSchedule from './pages/VaccinationSchedule';
import ChildNutrition from './pages/ChildNutrition';
import BreastfeedingSupport from './pages/BreastfeedingSupport';
import MaternalNutrition from './pages/MaternalNutrition';
import Appointments from './pages/Appointments';
import MedicalRecords from './pages/MedicalRecords';
import ProfileSettings from './pages/ProfileSettings';
import HealthWorkerDemo from './pages/HealthWorkerDemo';

export default function App() {
  const [lang, setLang] = useState(() => storageService.getLanguage());
  const [profile, setProfile] = useState(() => storageService.getProfile());
  const [medications, setMedications] = useState(() => storageService.getMedications());
  const [dailyDoses, setDailyDoses] = useState(() => storageService.getDailyDoses());
  const [appointments, setAppointments] = useState(() => storageService.getAppointments());
  const [records, setRecords] = useState(() => storageService.getMedicalRecords());
  const [contacts, setContacts] = useState(() => storageService.getContacts());
  const [growthRecords, setGrowthRecords] = useState(() => storageService.getGrowthRecords());
  const [preferredHospitalId, setPreferredHospitalId] = useState(() => storageService.getPreferredHospitalId());
  const [completedVaccines, setCompletedVaccines] = useState(() => storageService.getCompletedVaccines());

  const [activePage, setActivePage] = useState("dashboard"); // landing, dashboard, medications, hospitals, etc.
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Sync language changes
  const handleToggleLang = () => {
    const nextLang = lang === "te" ? "en" : "te";
    setLang(nextLang);
    storageService.saveLanguage(nextLang);
  };

  // Medication handlers
  const handleUpdateDose = (medId, status) => {
    const updatedDoses = medicationService.updateDoseStatus(medId, status);
    setDailyDoses({ ...updatedDoses });
  };

  const handleAddPrescription = (newMed) => {
    const updated = [newMed, ...medications];
    setMedications(updated);
    storageService.saveMedications(updated);
  };

  const handleDeletePrescription = (medId) => {
    const updated = medications.filter(m => m.id !== medId);
    setMedications(updated);
    storageService.saveMedications(updated);
  };

  // Hospital handlers
  const handleSetPreferredHospital = (id) => {
    setPreferredHospitalId(id);
    storageService.savePreferredHospitalId(id);
  };

  // Profile handler
  const handleSaveProfile = (newProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
  };

  const handleUpdateLmp = (newLmp) => {
    const updated = { ...profile, lmpDate: newLmp };
    setProfile(updated);
    storageService.saveProfile(updated);
  };

  // Vaccine handler
  const handleToggleVaccine = (vaccineId, completionData) => {
    const current = { ...completedVaccines };
    if (completionData) {
      current[vaccineId] = completionData;
    } else {
      delete current[vaccineId];
    }
    setCompletedVaccines(current);
    storageService.saveCompletedVaccines(current);
  };

  // Appointments handlers
  const handleAddAppointment = (newApt) => {
    const updated = [newApt, ...appointments];
    setAppointments(updated);
    storageService.saveAppointments(updated);
  };

  const handleToggleCompleteAppointment = (aptId) => {
    const updated = appointments.map(a => {
      if (a.id === aptId) {
        return {
          ...a,
          status: a.status === "completed" ? "scheduled" : "completed"
        };
      }
      return a;
    });
    setAppointments(updated);
    storageService.saveAppointments(updated);
  };

  const handleDeleteAppointment = (aptId) => {
    const updated = appointments.filter(a => a.id !== aptId);
    setAppointments(updated);
    storageService.saveAppointments(updated);
  };

  // Medical Record handlers
  const handleAddRecord = (newRec) => {
    const updated = [newRec, ...records];
    setRecords(updated);
    storageService.saveMedicalRecords(updated);
  };

  const handleDeleteRecord = (recId) => {
    const updated = records.filter(r => r.id !== recId);
    setRecords(updated);
    storageService.saveMedicalRecords(updated);
  };

  // Contacts handlers
  const handleAddContact = (newContact) => {
    const updated = [...contacts, newContact];
    setContacts(updated);
    storageService.saveContacts(updated);
  };

  const handleDeleteContact = (contactId) => {
    const updated = contacts.filter(c => c.id !== contactId);
    setContacts(updated);
    storageService.saveContacts(updated);
  };

  // Growth handler
  const handleAddGrowthRecord = (newGrowth) => {
    const updated = [...growthRecords, newGrowth];
    setGrowthRecords(updated);
    storageService.saveGrowthRecords(updated);
  };

  // Reset demo data handler
  const handleResetData = () => {
    storageService.resetAllData();
    setProfile(storageService.getProfile());
    setMedications(storageService.getMedications());
    setDailyDoses(storageService.getDailyDoses());
    setAppointments(storageService.getAppointments());
    setRecords(storageService.getMedicalRecords());
    setContacts(storageService.getContacts());
    setGrowthRecords(storageService.getGrowthRecords());
    setPreferredHospitalId(storageService.getPreferredHospitalId());
    setCompletedVaccines(storageService.getCompletedVaccines());
  };

  const handleSwitchStage = (newStage) => {
    const updated = { ...profile, stage: newStage };
    setProfile(updated);
    storageService.saveProfile(updated);
    if (activePage === "asha" && newStage !== "asha") {
      setActivePage("dashboard");
    }
  };

  const handleNavigatePage = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Persistent Medical Safety Banner */}
      <SafetyNotice lang={lang} />

      {/* Main Top Header */}
      <Navbar
        profile={profile}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenVoice={() => setIsVoiceOpen(true)}
        onOpenEmergency={() => handleNavigatePage("emergency")}
        onNavigatePage={handleNavigatePage}
        activePage={activePage}
      />

      {/* Application Layout: Desktop Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-20 md:pb-8">
        {/* Desktop Sidebar (hidden on mobile, and hidden if on dedicated landing page view if desired) */}
        <Sidebar
          activePage={activePage}
          onNavigatePage={handleNavigatePage}
          lang={lang}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl overflow-hidden">
          {activePage === "landing" && (
            <LandingPage
              onGetStarted={() => handleNavigatePage("dashboard")}
              onNavigatePage={handleNavigatePage}
              onOpenVoice={() => setIsVoiceOpen(true)}
              lang={lang}
            />
          )}

          {activePage === "dashboard" && (
            <Dashboard
              profile={profile}
              medications={medications}
              dailyDoses={dailyDoses}
              appointments={appointments}
              records={records}
              preferredHospitalId={preferredHospitalId}
              onUpdateDose={handleUpdateDose}
              onNavigatePage={handleNavigatePage}
              onOpenVoice={() => setIsVoiceOpen(true)}
              onOpenEmergency={() => handleNavigatePage("emergency")}
              onSwitchStage={handleSwitchStage}
              lang={lang}
            />
          )}

          {activePage === "medications" && (
            <MedicationTracker
              medications={medications}
              dailyDoses={dailyDoses}
              onUpdateDose={handleUpdateDose}
              onAddPrescription={handleAddPrescription}
              onDeletePrescription={handleDeletePrescription}
              lang={lang}
            />
          )}

          {activePage === "hospitals" && (
            <NearbyCare
              preferredHospitalId={preferredHospitalId}
              onSetPreferredHospital={handleSetPreferredHospital}
              lang={lang}
            />
          )}

          {activePage === "emergency" && (
            <EmergencyHelp
              contacts={contacts}
              onAddContact={handleAddContact}
              onDeleteContact={handleDeleteContact}
              preferredHospitalId={preferredHospitalId}
              lang={lang}
            />
          )}

          {activePage === "pregnancy" && (
            <PregnancyCare
              profile={profile}
              onUpdateLmp={handleUpdateLmp}
              onNavigatePage={handleNavigatePage}
              lang={lang}
            />
          )}

          {activePage === "vaccination" && (
            <VaccinationSchedule
              profile={profile}
              completedVaccines={completedVaccines}
              onToggleVaccine={handleToggleVaccine}
              lang={lang}
            />
          )}

          {activePage === "child-nutrition" && (
            <ChildNutrition
              profile={profile}
              growthRecords={growthRecords}
              onAddGrowthRecord={handleAddGrowthRecord}
              lang={lang}
            />
          )}

          {activePage === "breastfeeding" && (
            <BreastfeedingSupport
              profile={profile}
              lang={lang}
            />
          )}

          {activePage === "maternal-nutrition" && (
            <MaternalNutrition
              profile={profile}
              lang={lang}
            />
          )}

          {activePage === "appointments" && (
            <Appointments
              appointments={appointments}
              onAddAppointment={handleAddAppointment}
              onToggleComplete={handleToggleCompleteAppointment}
              onDeleteAppointment={handleDeleteAppointment}
              lang={lang}
            />
          )}

          {activePage === "records" && (
            <MedicalRecords
              records={records}
              onAddRecord={handleAddRecord}
              onDeleteRecord={handleDeleteRecord}
              lang={lang}
            />
          )}

          {activePage === "profile" && (
            <ProfileSettings
              profile={profile}
              onSaveProfile={handleSaveProfile}
              onResetData={handleResetData}
              preferredHospitalId={preferredHospitalId}
              onSetPreferredHospital={handleSetPreferredHospital}
              lang={lang}
              onToggleLang={handleToggleLang}
            />
          )}

          {activePage === "asha" && (
            <HealthWorkerDemo
              lang={lang}
              onSwitchStage={handleSwitchStage}
              onNavigatePage={handleNavigatePage}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        lang={lang}
      />

      {/* Telugu & English Interactive Voice Assistant Dialog */}
      <VoiceAssistantModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        lang={lang}
        onNavigatePage={handleNavigatePage}
      />
    </div>
  );
}
