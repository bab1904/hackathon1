// Sample Doctor-Prescribed Medications for Maternal & Child Health
// Follows standard antenatal clinical care protocols in India

export const initialSampleMedications = [
  {
    id: "med-1",
    name: "IFA (Iron & Folic Acid) Tablet",
    nameTe: "ఐరన్ & ఫోలిక్ యాసిడ్ టాబ్లెట్ (ఎరుపు రంగు బిళ్ళ)",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    hospital: "Community Health Centre (CHC)",
    dosage: "1 Tablet (100mg Iron + 500mcg Folic Acid)",
    slot: "night", // morning, afternoon, evening, night
    timeLabel: "Night (After Dinner)",
    timeLabelTe: "రాత్రి (భోజనం తర్వాత)",
    instructions: "Take 1 tablet after dinner with plain water or lemon water. Do NOT take with milk, tea, or calcium.",
    instructionsTe: "రాత్రి భోజనం తర్వాత మంచి నీళ్లతో లేదా నిమ్మరసంతో వేసుకోండి. పాలు, టీ లేదా క్యాల్షియం మాత్రలతో కలిపి వేసుకోవద్దు.",
    active: true,
    startDate: "2026-06-01",
    totalDays: 180,
    purpose: "Prevents pregnancy anemia and supports baby's healthy brain & blood development.",
    purposeTe: "రక్తహీనతను నివారిస్తుంది మరియు బిడ్డ రక్త కణాల పెరుగుదలకు సహాయపడుతుంది."
  },
  {
    id: "med-2",
    name: "Calcium & Vitamin D3 Tablet",
    nameTe: "క్యాల్షియం & విటమిన్ డి3 మాత్ర",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    hospital: "Community Health Centre (CHC)",
    dosage: "1 Tablet (500mg Calcium + 250 IU D3)",
    slot: "afternoon",
    timeLabel: "Afternoon (After Lunch)",
    timeLabelTe: "మధ్యాహ్నం (భోజనం తర్వాత)",
    instructions: "Take after lunch with water. Keep a minimum 2-hour gap between Calcium and Iron tablets.",
    instructionsTe: "మధ్యాహ్న భోజనం తర్వాత వేసుకోండి. ఐరన్ మాత్రకు, క్యాల్షియం మాత్రకు కనీసం 2 గంటల వ్యవధి ఉండాలి.",
    active: true,
    startDate: "2026-07-01",
    totalDays: 180,
    purpose: "Strengthens mother's bones and develops baby's skeleton and teeth.",
    purposeTe: "తల్లి ఎముకలను బలోపేతం చేస్తుంది మరియు బిడ్డ ఎముకల నిర్మాణానికి అవసరం."
  },
  {
    id: "med-3",
    name: "Folic Acid 5mg",
    nameTe: "ఫోలిక్ యాసిడ్ 5mg",
    doctor: "Dr. Sunitha Reddy, MS (OBG)",
    hospital: "Community Health Centre (CHC)",
    dosage: "1 Tablet",
    slot: "morning",
    timeLabel: "Morning (After Breakfast)",
    timeLabelTe: "ఉదయం (టిఫిన్ తర్వాత)",
    instructions: "Take every morning after light breakfast.",
    instructionsTe: "ప్రతి ఉదయం అల్పాహారం తర్వాత ఒక మాత్ర వేసుకోండి.",
    active: true,
    startDate: "2026-05-15",
    totalDays: 90,
    purpose: "Prevents neural tube defects and spinal birth anomalies in developing fetus.",
    purposeTe: "శిశువు వెన్నుపాము మరియు మెదడు లోపాలను నివారిస్తుంది."
  }
];
