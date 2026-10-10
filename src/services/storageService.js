// LocalStorage persistence service for GramaMaa AI

import {
  initialProfile,
  initialTrustedContacts,
  initialAppointments,
  initialMedicalRecords,
  initialChildGrowthData
} from "../data/demoData";
import { initialSampleMedications } from "../data/sampleMedications";
import { nearbyHospitalsData } from "../data/nearbyHospitalsData";
import { getTodayKey } from "./dateUtils";

const KEYS = {
  PROFILE: "gramamaa_profile",
  MEDICATIONS: "gramamaa_medications",
  DAILY_DOSES: "gramamaa_daily_doses",
  APPOINTMENTS: "gramamaa_appointments",
  RECORDS: "gramamaa_records",
  CONTACTS: "gramamaa_contacts",
  GROWTH: "gramamaa_growth",
  PREFERRED_HOSPITAL: "gramamaa_pref_hospital",
  LANGUAGE: "gramamaa_language",
  VACCINE_COMPLETED: "gramamaa_vaccine_completed"
};

// Generate initial sample dose history for the past 7 days
function generateSeedDailyDoses(medications) {
  const doses = {};
  const today = new Date();

  // Populate last 7 days with realistic adherence (~85%)
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    doses[dateKey] = {};

    medications.forEach((med, idx) => {
      // Simulate taking most doses, with an occasional missed afternoon dose
      if (i === 0) {
        // Today: morning taken, afternoon pending/missed, night pending
        if (med.slot === "morning") doses[dateKey][med.id] = "taken";
        else doses[dateKey][med.id] = "pending";
      } else if (i === 2 && med.slot === "afternoon") {
        doses[dateKey][med.id] = "missed";
      } else {
        doses[dateKey][med.id] = "taken";
      }
    });
  }
  return doses;
}

export const storageService = {
  // Profile
  getProfile() {
    try {
      const data = localStorage.getItem(KEYS.PROFILE);
      return data ? JSON.parse(data) : initialProfile;
    } catch {
      return initialProfile;
    }
  },
  saveProfile(profile) {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  },

  // Language
  getLanguage() {
    return localStorage.getItem(KEYS.LANGUAGE) || "te"; // Default to Telugu
  },
  saveLanguage(lang) {
    localStorage.setItem(KEYS.LANGUAGE, lang);
  },

  // Medications
  getMedications() {
    try {
      const data = localStorage.getItem(KEYS.MEDICATIONS);
      return data ? JSON.parse(data) : initialSampleMedications;
    } catch {
      return initialSampleMedications;
    }
  },
  saveMedications(medications) {
    localStorage.setItem(KEYS.MEDICATIONS, JSON.stringify(medications));
  },

  // Daily Doses Log { [dateKey]: { [medId]: "taken" | "missed" | "pending" } }
  getDailyDoses() {
    try {
      const data = localStorage.getItem(KEYS.DAILY_DOSES);
      if (data) return JSON.parse(data);
      const seed = generateSeedDailyDoses(initialSampleMedications);
      this.saveDailyDoses(seed);
      return seed;
    } catch {
      return {};
    }
  },
  saveDailyDoses(doses) {
    localStorage.setItem(KEYS.DAILY_DOSES, JSON.stringify(doses));
  },

  // Appointments
  getAppointments() {
    try {
      const data = localStorage.getItem(KEYS.APPOINTMENTS);
      return data ? JSON.parse(data) : initialAppointments;
    } catch {
      return initialAppointments;
    }
  },
  saveAppointments(apts) {
    localStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(apts));
  },

  // Medical Records
  getMedicalRecords() {
    try {
      const data = localStorage.getItem(KEYS.RECORDS);
      return data ? JSON.parse(data) : initialMedicalRecords;
    } catch {
      return initialMedicalRecords;
    }
  },
  saveMedicalRecords(records) {
    localStorage.setItem(KEYS.RECORDS, JSON.stringify(records));
  },

  // Trusted Contacts
  getContacts() {
    try {
      const data = localStorage.getItem(KEYS.CONTACTS);
      return data ? JSON.parse(data) : initialTrustedContacts;
    } catch {
      return initialTrustedContacts;
    }
  },
  saveContacts(contacts) {
    localStorage.setItem(KEYS.CONTACTS, JSON.stringify(contacts));
  },

  // Child Growth Logs
  getGrowthRecords() {
    try {
      const data = localStorage.getItem(KEYS.GROWTH);
      return data ? JSON.parse(data) : initialChildGrowthData;
    } catch {
      return initialChildGrowthData;
    }
  },
  saveGrowthRecords(growth) {
    localStorage.setItem(KEYS.GROWTH, JSON.stringify(growth));
  },

  // Preferred Hospital ID
  getPreferredHospitalId() {
    return localStorage.getItem(KEYS.PREFERRED_HOSPITAL) || "hosp-1";
  },
  savePreferredHospitalId(id) {
    localStorage.setItem(KEYS.PREFERRED_HOSPITAL, id);
  },

  // Completed Vaccine IDs { [vaccineId]: { completedDate, verifiedBy } }
  getCompletedVaccines() {
    try {
      const data = localStorage.getItem(KEYS.VACCINE_COMPLETED);
      if (data) return JSON.parse(data);
      // Pre-seed birth vaccines completed for baby demo
      const seed = {
        "v-birth-1": { completedDate: "2026-06-15", verifiedBy: "PHC Nurse Sister Nirmala" },
        "v-birth-2": { completedDate: "2026-06-15", verifiedBy: "PHC Nurse Sister Nirmala" },
        "v-birth-3": { completedDate: "2026-06-16", verifiedBy: "Govt Hospital Staff" }
      };
      this.saveCompletedVaccines(seed);
      return seed;
    } catch {
      return {};
    }
  },
  saveCompletedVaccines(map) {
    localStorage.setItem(KEYS.VACCINE_COMPLETED, JSON.stringify(map));
  },

  // Reset Everything to Initial Demo Data
  resetAllData() {
    localStorage.removeItem(KEYS.PROFILE);
    localStorage.removeItem(KEYS.MEDICATIONS);
    localStorage.removeItem(KEYS.DAILY_DOSES);
    localStorage.removeItem(KEYS.APPOINTMENTS);
    localStorage.removeItem(KEYS.RECORDS);
    localStorage.removeItem(KEYS.CONTACTS);
    localStorage.removeItem(KEYS.GROWTH);
    localStorage.removeItem(KEYS.PREFERRED_HOSPITAL);
    localStorage.removeItem(KEYS.VACCINE_COMPLETED);
    return true;
  }
};
