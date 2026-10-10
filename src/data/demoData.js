// Fictional Demo Datasets for Rural/Semi-Urban Maternal & Child Care in India

export const initialProfile = {
  name: "Lakshmi Devi",
  nameTe: "లక్ష్మీ దేవి",
  age: 24,
  language: "te", // default to Telugu, switchable to en
  stage: "pregnant", // pregnant, postpartum, caregiver, asha
  village: "Pedamainavanilanka, Narasapur Mandal",
  villageTe: "పెదమైనవానిలంక, నరసాపురం మండలం",
  phone: "+91 98480 54321",
  lmpDate: "2026-04-18", // roughly 24-25 weeks pregnant
  eddDate: "2027-01-23", // calculated standard 280 days
  childName: "Baby Karthik",
  childNameTe: "బాబు కార్తీక్",
  childDob: "2026-06-15",
  childGender: "boy",
  preferredHospitalId: "hosp-1", // Government Area Hospital
  preferredHospitalName: "Government Area Hospital & Maternity Wing",
  preferredHospitalNameTe: "ప్రభుత్వ ప్రాంతీయ ఆసుపత్రి & ప్రసూతి విభాగం",
  ashaWorkerName: "M. Bhavani (ASHA)",
  ashaWorkerPhone: "+91 98491 88776"
};

export const initialTrustedContacts = [
  {
    id: "c-1",
    name: "Srinivas (Husband)",
    nameTe: "శ్రీనివాస్ (భర్త)",
    relation: "Husband / స్పౌస్",
    phone: "9848011223",
    isPrimary: true
  },
  {
    id: "c-2",
    name: "Parvathi (Mother)",
    nameTe: "పార్వతి (తల్లి)",
    relation: "Mother / తల్లి",
    phone: "9440122334",
    isPrimary: false
  },
  {
    id: "c-3",
    name: "Bhavani (ASHA Worker)",
    nameTe: "భవాని (ఆశా కార్యకర్త)",
    relation: "ASHA Health Worker",
    phone: "9849188776",
    isPrimary: false
  }
];

export const initialAppointments = [
  {
    id: "apt-1",
    title: "3rd Antenatal Care (ANC) Checkup & USG Scan Review",
    titleTe: "3వ గర్భధారణ పరీక్ష (ANC-3) & స్కానింగ్ రివ్యూ",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    facility: "Community Health Centre (CHC)",
    facilityTe: "కమ్యూనిటీ హెల్త్ సెంటర్",
    date: "2026-10-18",
    time: "10:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష",
    status: "scheduled", // scheduled, completed, missed
    notes: "Review hemoglobin test results and blood pressure.",
    notesTe: "రక్తహీనత మరియు రక్తపోటు (బీపీ) పరీక్ష వివరాలు చూడాలి."
  },
  {
    id: "apt-2",
    title: "Td (Tetanus-Diphtheria) Injection 2nd Dose",
    titleTe: "ధనుర్వాతం (Td) 2వ ఇంజెక్షన్",
    doctor: "ANM Sister Nirmala",
    facility: "Village Sub-Centre / Anganwadi",
    facilityTe: "గ్రామ సబ్-సెంటర్ / అంగన్‌వాడీ",
    date: "2026-11-04",
    time: "11:00 AM",
    type: "Vaccination",
    typeTe: "టీకా",
    status: "scheduled",
    notes: "Bring MCP Mother card to record TT dose.",
    notesTe: "తల్లి కార్డు (MCP) వెంట తీసుకురావాలి."
  },
  {
    id: "apt-3",
    title: "1st Antenatal Registration & Blood Profiling",
    titleTe: "1వ గర్భధారణ రిజిస్ట్రేషన్ & ల్యాబ్ టెస్టులు",
    doctor: "Dr. M. Swetha, PHC",
    facility: "PHC Rustumbada",
    facilityTe: "పి.హెచ్.సి రుస్తుంబాడ",
    date: "2026-06-02",
    time: "09:30 AM",
    type: "Antenatal",
    typeTe: "గర్భ పరీక్ష",
    status: "completed",
    notes: "Registered in RCH portal. Blood grouping (B Positive), Hb 10.8 g/dL.",
    notesTe: "ఆర్.సి.హెచ్ పోర్టల్ లో నమోదు చేయబడింది. రక్తం గ్రూప్ B పాజిటివ్."
  }
];

export const initialMedicalRecords = [
  {
    id: "rec-1",
    title: "Second Trimester Anomaly Ultrasound Scan",
    titleTe: "2వ త్రైమాసిక అనామలీ అల్ట్రాసౌండ్ స్కాన్",
    category: "Ultrasound",
    categoryTe: "అల్ట్రాసౌండ్ స్కాన్",
    date: "2026-09-12",
    facility: "Govt Area Hospital Radiology Wing",
    doctor: "Dr. K. Anuradha, Radiologist",
    notes: "Single live intrauterine gestation. Normal fetal anatomy and amniotic fluid index (AFI 14 cm). Placenta anterior.",
    notesTe: "శిశువు అవయవాల పెరుగుదల మరియు ఉమ్మనీరు సాధారణంగా ఉంది.",
    fileName: "Anomaly_Scan_Report_LakshmiDevi.pdf",
    ocrSimulatedText: "PATIENT: LAKSHMI DEVI | GESTATIONAL AGE: 20 WEEKS 4 DAYS | AFI: 14 CM | SINGLE LIVE FETUS | PLACENTA: ANTERIOR GRADE I | EFW: 380 GM"
  },
  {
    id: "rec-2",
    title: "Complete Blood Picture & Hemoglobin Report",
    titleTe: "రక్త పరీక్ష & హిమోగ్లోబిన్ నివేదిక",
    category: "Blood Tests",
    categoryTe: "రక్త పరీక్షలు",
    date: "2026-08-20",
    facility: "PHC Diagnostic Lab",
    doctor: "Pathology In-Charge",
    notes: "Hemoglobin 10.4 g/dL (Mild anemia). Prescribed 1 IFA tablet daily after dinner.",
    notesTe: "హిమోగ్లోబిన్ 10.4 గ్రా/డిఎల్. డాక్టర్ రోజువారీ ఐరన్ మాత్ర రాశారు.",
    fileName: "CBC_Hemoglobin_Report.pdf",
    ocrSimulatedText: "TEST: COMPLETE BLOOD COUNT | HB: 10.4 GM/DL | RBC: 3.8 MIL | WBC: 7400 | PLATELETS: 2.4 LAKHS | BLOOD GROUP: B POSITIVE"
  },
  {
    id: "rec-3",
    title: "Dr. Sunitha Antenatal Prescription",
    titleTe: "డాక్టర్ సునీత గారి మందుల చీటీ",
    category: "Prescriptions",
    categoryTe: "మందుల చీటీ (ప్రిస్క్రిప్షన్)",
    date: "2026-08-20",
    facility: "CHC Narasapur",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    notes: "Tab IFA 1 OD night x 180 days. Tab Calcium 500mg 1 OD noon x 180 days.",
    notesTe: "ఐరన్ టాబ్లెట్ రాత్రికి, క్యాల్షియం టాబ్లెట్ మధ్యాహ్నం 180 రోజులు వేసుకోవాలి.",
    fileName: "Doctor_Prescription_IFA_Calcium.jpg",
    ocrSimulatedText: "Rx: 1. TAB IFA (100mg Fe + 500mcg FA) - 1 TAB NIGHT AFTER FOOD. 2. TAB CALCIUM + VIT D3 - 1 TAB AFTERNOON AFTER LUNCH."
  }
];

export const initialChildGrowthData = [
  { month: "Birth", monthTe: "పుట్టినప్పుడు", ageDays: 0, weightKg: 3.1, heightCm: 49.5, whoWeightRef: 3.3 },
  { month: "6 Weeks", monthTe: "6 వారాలు", ageDays: 42, weightKg: 4.4, heightCm: 54.0, whoWeightRef: 4.5 },
  { month: "10 Weeks", monthTe: "10 వారాలు", ageDays: 70, weightKg: 5.3, heightCm: 57.5, whoWeightRef: 5.4 },
  { month: "14 Weeks", monthTe: "14 వారాలు", ageDays: 98, weightKg: 6.1, heightCm: 60.5, whoWeightRef: 6.2 },
  { month: "4 Months", monthTe: "4 నెలలు", ageDays: 120, weightKg: 6.8, heightCm: 63.0, whoWeightRef: 6.7 }
];

export const initialAshaRoster = [
  {
    id: "asha-1",
    motherName: "Lakshmi Devi",
    motherNameTe: "లక్ష్మీ దేవి",
    age: 24,
    phone: "9848054321",
    village: "Ward 3, Pedamainavanilanka",
    stage: "Pregnant (24 Weeks)",
    riskStatus: "Mild Anemia (Hb 10.4)",
    riskColor: "amber",
    nextAncDate: "2026-10-18",
    vaccineCompliance: "Td-1 Taken, Td-2 Due",
    medicineAdherence: "92% (Regular on IFA)"
  },
  {
    id: "asha-2",
    motherName: "K. Bhavani",
    motherNameTe: "కె. భవాని",
    age: 22,
    phone: "9440188990",
    village: "Ramalayam Veedhi",
    stage: "Pregnant (34 Weeks)",
    riskStatus: "High Risk (High BP / Pre-eclampsia)",
    riskColor: "red",
    nextAncDate: "2026-10-12",
    vaccineCompliance: "Completed",
    medicineAdherence: "75% (Needs home visit)"
  },
  {
    id: "asha-3",
    motherName: "P. Swapna",
    motherNameTe: "పి. స్వప్న",
    age: 26,
    phone: "9849200112",
    village: "Harijanawada",
    stage: "New Mother (Baby 2 Months)",
    riskStatus: "Normal Recovery",
    riskColor: "green",
    nextAncDate: "Postpartum check done",
    vaccineCompliance: "Pentavalent-1 Done, Pentavalent-2 Due",
    medicineAdherence: "Exclusive Breastfeeding on track"
  },
  {
    id: "asha-4",
    motherName: "G. Anitha",
    motherNameTe: "జి. అనిత",
    age: 28,
    phone: "9988223344",
    village: "Market Road",
    stage: "Infant Care (Baby 9 Months)",
    riskStatus: "Measles Vaccine Due Defaulter",
    riskColor: "red",
    nextAncDate: "N/A",
    vaccineCompliance: "MR-1 Overdue by 10 days",
    medicineAdherence: "Needs immunization reminder"
  }
];
