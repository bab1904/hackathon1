// Nearby Hospitals, Primary Health Centres (PHCs), and Gynecologists Directory

export const nearbyHospitalsData = [
  {
    id: "hosp-1",
    name: "Government Area Hospital & Maternity Wing",
    nameTe: "ప్రభుత్వ ప్రాంతీయ ఆసుపత్రి & ప్రసూతి విభాగం",
    type: "govt", // govt, maternity, gynecologist
    categoryLabel: "Government Hospital",
    categoryLabelTe: "ప్రభుత్వ ఆసుపత్రి",
    doctorInCharge: "Dr. K. Anuradha, MD (OBG) - Chief Obstetrician",
    doctorInChargeTe: "డాక్టర్ కె. అనూరాధ, MD (OBG)",
    phone: "08814-224500",
    emergencyPhone: "108",
    distanceKm: "3.2 km",
    address: "Near Main Bus Station, Ward 4, Narasapur",
    addressTe: "మెయిన్ బస్ స్టాండ్ దగ్గర, వార్డ్ 4, నర్సాపురం",
    openHours: "24 Hours (Emergency Delivery & Labor Room)",
    openHoursTe: "24 గంటలు (అత్యవసర ప్రసవ సేవలు)",
    isPreferredDefault: true,
    facilities: [
      { key: "laborRoom", name: "24/7 Labor Room", nameTe: "24/7 ప్రసవ గది", available: true },
      { key: "nicu", name: "Level-2 NICU Care", nameTe: "నవజాత శిశు ఐసియు (NICU)", available: true },
      { key: "bloodBank", name: "Blood Storage Unit", nameTe: "రక్త నిల్వ విభాగం", available: true },
      { key: "ambulance", name: "108 Ambulance Hub", nameTe: "108 అంబులెన్స్", available: true },
      { key: "schemes", name: "Free Delivery / KCR Kit / Aarogyasri", nameTe: "ఉచిత డెలివరీ / ఆరోగ్యశ్రీ", available: true }
    ],
    googleMapsQuery: "Government+Area+Hospital+Maternity"
  },
  {
    id: "hosp-2",
    name: "Primary Health Centre (PHC) Rustumbada",
    nameTe: "ప్రాథమిక ఆరోగ్య కేంద్రం (PHC) రుస్తుంబాడ",
    type: "govt",
    categoryLabel: "Primary Health Centre (PHC)",
    categoryLabelTe: "ప్రభుత్వ పి.హెచ్.సి",
    doctorInCharge: "Dr. M. Swetha, MBBS, DGO",
    doctorInChargeTe: "డాక్టర్ ఎం. శ్వేత, MBBS, DGO",
    phone: "08814-221234",
    emergencyPhone: "104",
    distanceKm: "1.8 km",
    address: "Village Panchayat Road, Rustumbada",
    addressTe: "గ్రామ పంచాయతీ రోడ్డు, రుస్తుంబాడ",
    openHours: "8:00 AM - 4:00 PM (Emergency Delivery on-call)",
    openHoursTe: "ఉదయం 8:00 నుండి సాయంత్రం 4:00 వరకు",
    isPreferredDefault: false,
    facilities: [
      { key: "laborRoom", name: "24/7 Normal Delivery Facility", nameTe: "సాధారణ ప్రసవ గది", available: true },
      { key: "nicu", name: "Newborn Stabilization Unit", nameTe: "శిశు ప్రాథమిక సంరక్షణ", available: true },
      { key: "bloodBank", name: "Blood Storage", nameTe: "రక్త నిల్వ", available: false },
      { key: "ambulance", name: "102 Vehicle on Call", nameTe: "102 జనని ఎక్స్‌ప్రెస్", available: true },
      { key: "schemes", name: "Free Antenatal Care & Immunization", nameTe: "ఉచిత టీకాలు & గర్భ పరీక్షలు", available: true }
    ],
    googleMapsQuery: "Primary+Health+Centre+PHC"
  },
  {
    id: "hosp-3",
    name: "Sri Vani Mother & Child Care Hospital",
    nameTe: "శ్రీ వాణి మాతా శిశు సంరక్షణ ఆసుపత్రి",
    type: "maternity",
    categoryLabel: "Private Maternity Hospital",
    categoryLabelTe: "ప్రైవేట్ ప్రసూతి ఆసుపత్రి",
    doctorInCharge: "Dr. V. Lakshmi Devi, MBBS, MS (OBG), Laparoscopy Surgeon",
    doctorInChargeTe: "డాక్టర్ వి. లక్ష్మీదేవి, MS (OBG)",
    phone: "08814-275999",
    emergencyPhone: "+91-9848022334",
    distanceKm: "4.5 km",
    address: "Opposite High School Ground, Bypass Road",
    addressTe: "హైస్కూల్ గ్రౌండ్ ఎదురుగా, బైపాస్ రోడ్డు",
    openHours: "24 Hours Open (Emergency C-Section & Deliveries)",
    openHoursTe: "24 గంటలు తెరిచి ఉంటుంది (అత్యవసర సిజేరియన్ & డెలివరీలు)",
    isPreferredDefault: false,
    facilities: [
      { key: "laborRoom", name: "24/7 Modular Labor & Delivery Suite", nameTe: "24/7 ఆధునిక ప్రసవ గది", available: true },
      { key: "nicu", name: "Advanced Level-3 NICU with Incubators", nameTe: "అత్యాధునిక NICU ఇంక్యుబేటర్లు", available: true },
      { key: "bloodBank", name: "Emergency Blood Tie-up", nameTe: "రక్తనిధి సదుపాయం", available: true },
      { key: "ambulance", name: "Hospital Emergency Van", nameTe: "హాస్పిటల్ అంబులెన్స్", available: true },
      { key: "schemes", name: "Aarogyasri & Cashless Insurance Accepted", nameTe: "ఆరోగ్యశ్రీ & ఇన్సూరెన్స్ వర్తిస్తుంది", available: true }
    ],
    googleMapsQuery: "Mother+and+Child+Hospital"
  },
  {
    id: "hosp-4",
    name: "Dr. Sunitha Reddy Antenatal & Women's Clinic",
    nameTe: "డాక్టర్ సునీతా రెడ్డి మహిళా & గర్భధారణ క్లినిక్",
    type: "gynecologist",
    categoryLabel: "Specialist Gynecologist",
    categoryLabelTe: "స్పెషలిస్ట్ గైనకాలజిస్ట్",
    doctorInCharge: "Dr. Sunitha Reddy, MBBS, MS (OBG) (Ex-Prof Govt Medical College)",
    doctorInChargeTe: "డాక్టర్ సునీతా రెడ్డి, MS (OBG)",
    phone: "08814-234888",
    emergencyPhone: "+91-9440198765",
    distanceKm: "2.5 km",
    address: "Beside Old Bus Stand, Market Street",
    addressTe: "పాత బస్టాండ్ ప్రక్కన, మార్కెట్ వీధి",
    openHours: "9:00 AM - 1:30 PM & 5:00 PM - 8:30 PM",
    openHoursTe: "ఉదయం 9:00 - 1:30 & సాయంత్రం 5:00 - 8:30",
    isPreferredDefault: false,
    facilities: [
      { key: "laborRoom", name: "Antenatal Consultation & USG Scan", nameTe: "గర్భ పరీక్షలు & స్కానింగ్", available: true },
      { key: "nicu", name: "High-Risk Pregnancy Evaluation", nameTe: "హై-రిస్క్ ప్రెగ్నెన్సీ కౌన్సిలింగ్", available: true },
      { key: "bloodBank", name: "Routine Lab Testing", nameTe: "ల్యాబ్ పరీక్షలు", available: true },
      { key: "ambulance", name: "Hospital Referral Network", nameTe: "ఆసుపత్రి రిఫరల్ నెట్‌వర్క్", available: true },
      { key: "schemes", name: "Affordable Rural Consultation", nameTe: "తక్కువ ఫీజుతో నాణ్యమైన వైద్యం", available: true }
    ],
    googleMapsQuery: "Gynecologist+Clinic"
  }
];
