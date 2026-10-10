// Telugu and English Knowledge Base & Intent Classifier for GramaMaa AI Voice Assistant

export const voiceKnowledgeBase = [
  {
    id: "intent-emergency",
    patterns: [
      "emergency", "sos", "help", "bleeding", "severe pain", "headache", "water broke",
      "ఎమర్జెన్సీ", "సహాయం", "రక్తస్రావం", "కడుపు నొప్పి", "తీవ్రమైన నొప్పి", "నీరు కారుతోంది", "తల నొప్పి"
    ],
    actionPage: "emergency",
    speakEn: "Please remain calm. If you have bleeding or severe pain, contact emergency services immediately or go to the nearest hospital. I am opening the emergency screen for you now.",
    speakTe: "దయచేసి కంగారు పడకండి. మీకు రక్తస్రావం లేదా తీవ్రమైన నొప్పి ఉంటే వెంటనే 112 కి కాల్ చేయండి లేదా ఆసుపత్రికి వెళ్ళండి. నేను అత్యవసర స్క్రీన్ ఓపెన్ చేస్తున్నాను.",
    answerEn: "🚨 Emergency Alert: Severe pain or bleeding requires immediate hospital care. Calling 112 or your preferred hospital right away.",
    answerTe: "🚨 అత్యవసర హెచ్చరిక: తీవ్రమైన నొప్పి లేదా రక్తస్రావం ఉంటే వెంటనే ఆసుపత్రికి వెళ్ళాలి. 112 లేదా మీ ముఖ్య ఆసుపత్రికి కాల్ చేయండి."
  },
  {
    id: "intent-medicines",
    patterns: [
      "medicines", "medicine", "tablets", "dosage", "iron tablet", "calcium", "ifa", "pills",
      "మందులు", "టాబ్లెట్", "బిళ్ళలు", "ఐరన్", "క్యాల్షియం", "డోసేజ్", "ఈరోజు మందులు"
    ],
    actionPage: "medications",
    speakEn: "Showing your daily prescribed medicines. Make sure to take your Iron and Calcium tablets with a gap, as advised by your doctor.",
    speakTe: "డాక్టర్ సూచించిన మీ రోజువారీ మందుల వివరాలు చూపిస్తున్నాను. ఐరన్ మరియు క్యాల్షియం మాత్రలను కలిపి వేసుకోకండి.",
    answerEn: "💊 Daily Medications: Review your doctor's prescriptions and tick off doses taken today. Remember: Take Iron with water, never with milk or calcium.",
    answerTe: "💊 రోజువారీ మందులు: డాక్టర్ రాసిన మందులు చూసి, వేసుకున్నట్లు (✅) మార్క్ చేసుకోండి. ఐరన్ మాత్రను పాలతో వేసుకోవద్దు."
  },
  {
    id: "intent-hospitals",
    patterns: [
      "hospital", "hospitals", "gynecologist", "doctor", "phc", "clinic", "delivery hospital",
      "ఆసుపత్రి", "హాస్పిటల్", "గైనకాలజిస్ట్", "డాక్టర్", "పీహెచ్‌సీ", "క్లినిక్", "దగ్గరి ఆసుపత్రి"
    ],
    actionPage: "hospitals",
    speakEn: "Showing nearby 24/7 delivery hospitals, Government PHCs, and gynecologists. You can call directly with one tap.",
    speakTe: "మీకు దగ్గరలోని 24/7 ప్రసవ ఆసుపత్రులు, ప్రభుత్వ పి.హెచ్.సి మరియు గైనకాలజిస్టుల వివరాలు చూపిస్తున్నాను.",
    answerEn: "🏥 Nearby Hospitals: Showing Government PHCs, CHCs, and maternity hospitals with 24/7 labor room facilities.",
    answerTe: "🏥 దగ్గరి ఆసుపత్రులు: 24/7 ప్రసవ సౌకర్యం ఉన్న ప్రభుత్వ మరియు ప్రైవేట్ ఆసుపత్రుల వివరాలు సిద్ధంగా ఉన్నాయి."
  },
  {
    id: "intent-vaccination",
    patterns: [
      "vaccine", "vaccines", "vaccination", "immunization", "injection", "polio", "bcg",
      "టీకా", "టీకాలు", "ఇంజక్షన్", "పోలియో", "వ్యాక్సిన్", "బిడ్డ టీకా"
    ],
    actionPage: "vaccination",
    speakEn: "Opening your baby's vaccination schedule based on the official Indian National Immunization guidance.",
    speakTe: "భారత జాతీయ ఇమ్యునైజేషన్ మార్గదర్శకాల ప్రకారం మీ బిడ్డ టీకాల షెడ్యూల్ తెరుస్తున్నాను.",
    answerEn: "💉 Vaccination Schedule: Check upcoming and overdue doses based on official Indian National Immunization Guidelines.",
    answerTe: "💉 టీకాల షెడ్యూల్: మీ బిడ్డ వయస్సుకు సరిపడే అధికారిక టీకాల వివరాలు మరియు తర్వాతి తేదీలను ఇక్కడ చూడండి."
  },
  {
    id: "intent-checkup",
    patterns: [
      "checkup", "appointment", "visit", "doctor visit", "anc", "scan",
      "చెకప్", "అపాయింట్‌మెంట్", "వైద్య పరీక్ష", "డాక్టర్ చెకప్", "తర్వాతి చెకప్"
    ],
    actionPage: "appointments",
    speakEn: "Opening your appointments calendar. Regular antenatal visits are important for monitoring maternal and fetal wellness.",
    speakTe: "మీ అపాయింట్‌మెంట్ల క్యాలెండర్ తెరుస్తున్నాను. క్రమం తప్పకుండా వైద్య పరీక్షలు చేయించుకోవడం తల్లికి, బిడ్డకు ఎంతో మంచిది.",
    answerEn: "📅 Doctor Appointments: Review your scheduled antenatal visits, blood tests, and scans.",
    answerTe: "📅 వైద్య పరీక్షలు: రాబోయే డాక్టర్ చెకప్‌లు మరియు రక్త పరీక్షల వివరాలను ఇక్కడ నిర్వహించండి."
  },
  {
    id: "intent-breastfeeding",
    patterns: [
      "breastfeeding", "latch", "milk", "sore nipple", "engorgement", "feed baby",
      "పాలివ్వడం", "తల్లిపాలు", "పాలు రాలేదు", "రొమ్ము నొప్పి", "చనుమొన", "పాలు సరిపోవట్లేదు"
    ],
    actionPage: "breastfeeding",
    speakEn: "Opening breastfeeding support. Make sure baby's mouth is wide open and covers the areola. Feed frequently every two to three hours.",
    speakTe: "తల్లిపాల సంరక్షణ పేజీ తెరుస్తున్నాను. బిడ్డ నోరు పూర్తిగా తెరిచి చనుమొన చుట్టూ ఉన్న భాగాన్ని పట్టేలా చూసుకోండి. ప్రతి 2-3 గంటలకు పాలివ్వండి.",
    answerEn: "🤱 Breastfeeding Support: View correct latch techniques, common challenges, and contact support.",
    answerTe: "🤱 తల్లిపాల సంరక్షణ: సరైన లాచ్ విధానం మరియు రొమ్ము నొప్పుల నివారణ సూచనలను ఇక్కడ చూడండి."
  },
  {
    id: "intent-nutrition",
    patterns: [
      "food", "diet", "nutrition", "eat", "ragi", "fruits", "meal",
      "ఆహారం", "పోషకాహారం", "ఏం తినాలి", "రాగి జావ", "పండ్లు", "కూరగాయలు"
    ],
    actionPage: "maternal-nutrition",
    speakEn: "Opening maternal nutrition guide. Affordable local foods like ragi, green leafy vegetables, dal, eggs, and milk provide balanced nutrients.",
    speakTe: "పోషకాహార పేజీ తెరుస్తున్నాను. రాగి, ఆకుకూరలు, పప్పు, కోడిగుడ్లు మరియు పాలు తల్లికి, బిడ్డకు ఎంతో శక్తినిస్తాయి.",
    answerEn: "🥗 Nutrition Guide: Explore affordable, nutrient-rich meal ideas for pregnancy and postpartum recovery.",
    answerTe: "🥗 పోషకాహార మార్గదర్శి: గర్భధారణ సమయంలో శరీరానికి అవసరమైన ఐరన్, క్యాల్షియం నిండిన ఆహార సలహాలు."
  },
  {
    id: "intent-child-nutrition",
    patterns: [
      "baby food", "child nutrition", "solid food", "complementary food", "6 months",
      "పిల్లల ఆహారం", "ఘనాహారం", "శిశువు ఆహారం", "ఆరు నెలలు"
    ],
    actionPage: "child-nutrition",
    speakEn: "Opening child nutrition and growth tracker. After 6 months of exclusive breastfeeding, introduce mashed soft foods like khichdi and ragi.",
    speakTe: "పిల్లల పోషకాహారం మరియు పెరుగుదల పేజీ తెరుస్తున్నాను. 6 నెలల తర్వాత మెత్తని రాగి జావ, కిచిడీ వంటివి ప్రారంభించవచ్చు.",
    answerEn: "👶 Child Nutrition & Growth: Age-appropriate Indian food suggestions and weight tracking.",
    answerTe: "👶 పిల్లల ఆహారం & పెరుగుదల: వయస్సుకు తగిన ఆరోగ్యకరమైన ఆహార పదార్థాలు మరియు ఎదుగుదల రికార్డు."
  },
  {
    id: "intent-reports",
    patterns: [
      "reports", "records", "scan report", "blood test", "upload",
      "రిపోర్టులు", "నివేదికలు", "స్కాన్ రిపోర్ట్", "రక్త పరీక్ష", "కాగితాలు"
    ],
    actionPage: "records",
    speakEn: "Opening medical records organizer. You can securely store and view your prescriptions and scan reports.",
    speakTe: "వైద్య నివేదికల పేజీ తెరుస్తున్నాను. మీ ల్యాబ్ రిపోర్టులు మరియు డాక్టర్ చీటీలను ఇక్కడ దాచుకోవచ్చు.",
    answerEn: "📑 Medical Records: Safely organize and view your ultrasounds, blood tests, and doctor notes.",
    answerTe: "📑 వైద్య నివేదికలు: మీ స్కాన్ మరియు రక్త పరీక్షల రిపోర్టులను ఇక్కడ ఒకేచోట భద్రపరుచుకోండి."
  }
];

export function findVoiceResponse(queryText, lang = "te") {
  const normalized = queryText.toLowerCase().trim();

  // Guardrail check: Refuse medical diagnosis or medicine prescribing
  const illegalPrescriptionPatterns = ["prescribe medicine", "what medicine for headache", "abortion medicine", "మందులు రాయి", "గర్భస్రావం మందులు"];
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
      ? "మీరు అడిగిన విషయాన్ని నేను విన్నాను. మీరు రోజువారీ మందులు, టీకాలు, డాక్టర్ చెకప్‌లు లేదా దగ్గరి ఆసుపత్రుల గురించి అడగవచ్చు."
      : "I heard your question. You can ask me about daily medicines, baby vaccines, next checkups, or nearby hospitals.",
    displayText: lang === "te"
      ? "గ్రామమా AI: రోజువారీ మందులు, శిశువు టీకాలు, అపాయింట్‌మెంట్లు లేదా అత్యవసర ఆసుపత్రుల గురించి నన్ను అడగండి."
      : "GramaMaa AI: You can ask about your daily medicines, baby vaccination dates, appointments, or nearby hospitals."
  };
}
