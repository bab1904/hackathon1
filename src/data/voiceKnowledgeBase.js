// Telugu and English Knowledge Base & Intent Classifier for GramaMaa AI Voice Assistant

export const voiceKnowledgeBase = [
  {
    id: "intent-emergency",
    patterns: [
      "sos", "emergency", "help", "bleeding", "severe pain", "headache", "water broke", "convulsions", "danger",
      "ఎస్ఓఎస్", "ఎమర్జెన్సీ", "సహాయం", "రక్తస్రావం", "కడుపు నొప్పి", "తీవ్రమైన నొప్పి", "నీరు కారుతోంది", "తల నొప్పి", "ముప్పు"
    ],
    actionPage: "emergency",
    speakEn: "Emergency system triggered. Please remain calm. If you have bleeding or severe pain, dial 112 immediately. Opening the emergency SOS screen now.",
    speakTe: "అత్యవసర వ్యవస్థ ప్రారంభించబడింది. దయచేసి కంగారు పడకండి. మీకు రక్తస్రావం లేదా తీవ్రమైన నొప్పి ఉంటే వెంటనే 112 కి కాల్ చేయండి. అత్యవసర స్క్రీన్ ఓపెన్ చేస్తున్నాను.",
    answerEn: "🚨 Emergency System Triggered: Severe symptoms require instant care. Opening Emergency SOS and 112 speed-dial.",
    answerTe: "🚨 అత్యవసర వ్యవస్థ ప్రారంభించబడింది: తీవ్రమైన నొప్పులు లేదా రక్తస్రావానికి తక్షణ వైద్యం అవసరం. 112 డయలర్ ఓపెన్ చేస్తున్నాము."
  },
  {
    id: "intent-medicines",
    patterns: [
      "prescription", "prescriptions", "medicines", "medicine", "meds", "tablets", "dosage", "iron tablet", "calcium", "ifa", "pills",
      "మందులు", "ప్రిస్క్రిప్షన్", "టాబ్లెట్", "బిళ్ళలు", "ఐరన్", "క్యాల్షియం", "డోసేజ్", "ఈరోజు మందులు", "మందుల చీటీ"
    ],
    actionPage: "medications",
    speakEn: "Routing to your daily medicines and doctor prescription log. Make sure to space Iron and Calcium tablets by at least 2 hours.",
    speakTe: "మీ రోజువారీ మందులు మరియు డాక్టర్ ప్రిస్క్రిప్షన్ లాగ్ తెరుస్తున్నాను. ఐరన్ మరియు క్యాల్షియం మాత్రల మధ్య 2 గంటల వ్యవధి పాటించండి.",
    answerEn: "💊 Daily Medicines Tab: View doctor-prescribed medications, log daily compliance (✅/❌), and review critical interaction warnings.",
    answerTe: "💊 రోజువారీ మందుల లాగ్: డాక్టర్ సూచించిన మందులు చూసి, వేసుకున్నట్లు (✅) నమోదు చేయండి. ఐరన్ మరియు క్యాల్షియం వేర్వేరు సమయాల్లో వేసుకోండి."
  },
  {
    id: "intent-appointments",
    patterns: [
      "appointments", "appointment", "calendar", "doctor", "checkup", "visit", "doctor visit", "anc", "scan", "antenatal",
      "అపాయింట్‌మెంట్", "అపాయింట్‌మెంట్లు", "క్యాలెండర్", "చెకప్", "వైద్య పరీక్ష", "డాక్టర్ చెకప్", "తర్వాతి చెకప్", "స్కాన్"
    ],
    actionPage: "appointments",
    speakEn: "Opening your medical calendar and appointments module. Antenatal checkups monitor vital maternal and fetal wellness.",
    speakTe: "మీ వైద్య పరీక్షల క్యాలెండర్ తెరుస్తున్నాను. క్రమం తప్పకుండా 4 ANC పరీక్షలు చేయించుకోవడం తల్లికి, బిడ్డకు ఎంతో అవసరం.",
    answerEn: "📅 Medical Calendar & Appointments: Manage ANC milestone visits, lab tests, and clinical preparation notes.",
    answerTe: "📅 మెడికల్ క్యాలెండర్ & అపాయింట్‌మెంట్లు: జాతీయ 4-విజిట్ ANC మార్గదర్శకాల ప్రకారం రాబోయే డాక్టర్ పరీక్షల వివరాలు."
  },
  {
    id: "intent-vaccination",
    patterns: [
      "vaccine", "vaccines", "vaccination", "immunization", "injection", "polio", "bcg", "pentavalent", "baby vaccine",
      "టీకా", "టీకాలు", "ఇంజక్షన్", "పోలియో", "వ్యాక్సిన్", "బిడ్డ టీకా", "ఇమ్యునైజేషన్"
    ],
    actionPage: "vaccination",
    speakEn: "Opening baby's official National Immunization Schedule breakdown by age milestones.",
    speakTe: "భారత జాతీయ ఇమ్యునైజేషన్ మార్గదర్శకాల ప్రకారం మీ బిడ్డ టీకాల కాలపట్టిక తెరుస్తున్నాను.",
    answerEn: "💉 Baby Vaccines (NIS): Track mandatory UIP vaccinations organized chronologically by milestone intervals.",
    answerTe: "💉 శిశువు టీకాలు (NIS): వయస్సుల వారీగా వర్గీకరించబడిన అధికారిక వ్యాక్సిన్ షెడ్యూల్."
  },
  {
    id: "intent-hospitals",
    patterns: [
      "hospital", "hospitals", "gynecologist", "phc", "chc", "clinic", "delivery hospital", "ambulance",
      "ఆసుపత్రి", "హాస్పిటల్", "గైనకాలజిస్ట్", "పీహెచ్‌సీ", "క్లినిక్", "దగ్గరి ఆసుపత్రి", "ప్రసవ ఆసుపత్రి"
    ],
    actionPage: "hospitals",
    speakEn: "Showing nearby 24/7 delivery hospitals, Government PHCs, and gynecologists with direct one-tap calling.",
    speakTe: "మీకు దగ్గరలోని 24/7 ప్రసవ ఆసుపత్రులు మరియు ప్రభుత్వ ప్రాథమిక ఆరోగ్య కేంద్రాల వివరాలు చూపిస్తున్నాను.",
    answerEn: "🏥 Nearby Delivery Hospitals: View 24/7 labor suites, Level-2 NICU facilities, and emergency contact numbers.",
    answerTe: "🏥 దగ్గరి ప్రసవ ఆసుపత్రులు: 24/7 ప్రసవ సౌకర్యాలు మరియు డైరెక్ట్ ఫోన్ సౌకర్యం ఉన్న ఆసుపత్రులు."
  },
  {
    id: "intent-breastfeeding",
    patterns: [
      "breastfeeding", "latch", "milk", "sore nipple", "engorgement", "feed baby",
      "పాలివ్వడం", "తల్లిపాలు", "పాలు రాలేదు", "రొమ్ము నొప్పి", "చనుమొన", "పాలు సరిపోవట్లేదు"
    ],
    actionPage: "breastfeeding",
    speakEn: "Opening breastfeeding guide. Ensure baby's mouth covers the lower areola and feed on demand.",
    speakTe: "తల్లిపాల సంరక్షణ పేజీ తెరుస్తున్నాను. బిడ్డ నోరు పూర్తిగా తెరిచి చనుమొన చుట్టూ ఉన్న భాగాన్ని పట్టేలా చూసుకోండి.",
    answerEn: "🤱 Breastfeeding Support: Step-by-step latching guidance, posture techniques, and lactation tips.",
    answerTe: "🤱 తల్లిపాల సంరక్షణ: సరైన లాచింగ్ పద్ధతులు మరియు చనుమొన నొప్పుల నివారణ సలహాలు."
  },
  {
    id: "intent-nutrition",
    patterns: [
      "food", "diet", "nutrition", "eat", "ragi", "fruits", "meal",
      "ఆహారం", "పోషకాహారం", "ఏం తినాలి", "రాగి జావ", "పండ్లు", "కూరగాయలు"
    ],
    actionPage: "maternal-nutrition",
    speakEn: "Opening maternal nutrition guide. Focus on local nutrient-dense foods like ragi, spinach, eggs, and lentils.",
    speakTe: "పోషకాహార పేజీ తెరుస్తున్నాను. రాగి, ఆకుకూరలు, పప్పు, కోడిగుడ్లు తల్లికి, కడుపులోని బిడ్డకు రక్తం మరియు బలాన్నిస్తాయి.",
    answerEn: "🥗 Maternal Nutrition: Accessible, locally sourced balanced diet plans for pregnancy.",
    answerTe: "🥗 తల్లి పోషకాహారం: ఐరన్ మరియు క్యాల్షియం నిండిన గ్రామీణ పోషకాహార మార్గదర్శి."
  }
];

export function findVoiceResponse(queryText, lang = "te") {
  const normalized = queryText.toLowerCase().trim();

  // Guardrail check: Refuse medical diagnosis or unauthorized prescriptions
  const illegalPrescriptionPatterns = [
    "prescribe medicine", "what medicine for headache", "abortion medicine", "abortion pill",
    "మందులు రాయి", "గర్భస్రావం మందులు", "ఏ టాబ్లెట్ వేసుకోవాలి"
  ];
  for (const p of illegalPrescriptionPatterns) {
    if (normalized.includes(p)) {
      return {
        actionPage: null,
        speakText: lang === "te"
          ? "క్షమించండి, గ్రామమా AI మందులు రాయదు లేదా రోగ నిర్ధారణ చేయదు. దయచేసి అర్హత గల డాక్టర్‌ని వెంటనే సంప్రదించండి."
          : "I cannot prescribe medications or provide clinical diagnoses. Please consult a qualified doctor or visit a health centre immediately.",
        displayText: lang === "te"
          ? "⚠️ భద్రతా సూచన: గ్రామమా AI మందులు సూచించదు. డాక్టర్‌ని మాత్రమే సంప్రదించాలి."
          : "⚠️ Safety Notice: GramaMaa AI does not prescribe medicines or diagnose conditions. Please consult a physician."
      };
    }
  }

  // Check defined intents
  for (const item of voiceKnowledgeBase) {
    for (const pattern of item.patterns) {
      if (normalized.includes(pattern)) {
        return {
          actionPage: item.actionPage,
          speakText: lang === "te" ? item.speakTe : item.speakEn,
          displayText: lang === "te" ? item.answerTe : item.answerEn
        };
      }
    }
  }

  // Fallback helpful response
  return {
    actionPage: null,
    speakText: lang === "te"
      ? "నేను మీ మాట విన్నాను. మీరు SOS, మందులు, లేదా అపాయింట్‌మెంట్లు అని చెబితే ఆ పేజీని తెరుస్తాను."
      : "I heard you. You can say SOS, Prescription, or Appointments to navigate directly.",
    displayText: lang === "te"
      ? "గ్రామమా AI: 'SOS', 'మందులు' (Medicines), లేదా 'అపాయింట్‌మెంట్లు' (Appointments) అని చెప్పండి."
      : "GramaMaa AI: Say 'SOS', 'Prescription / Medicines', or 'Appointments' to route instantly."
  };
}
