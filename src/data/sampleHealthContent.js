// Educational Health Content, Guidelines, Checklists and Nutrition Data

export const pregnancyMilestones = [
  {
    weekRange: "1-12",
    trimester: 1,
    title: "First Trimester (Weeks 1 to 12)",
    titleTe: "మొదటి త్రైమాసికం (1 నుండి 12 వారాలు)",
    babySize: "Poppy seed to Lemon",
    babySizeTe: "ఆవగింజ నుండి నిమ్మకాయ పరిమాణం",
    highlights: "Baby's vital organs, heart, neural tube, and limbs start forming. Mother may experience nausea (morning sickness), tiredness, and frequent urination.",
    highlightsTe: "బిడ్డ గుండె, మెదడు మరియు ముఖ్య అవయవాలు రూపుదిద్దుకుంటాయి. తల్లికి వికారం, నీరసం మరియు అలసట రావడం సహజం.",
    keyActions: [
      "Confirm pregnancy at Primary Health Centre (PHC) or clinic",
      "Take daily Folic Acid tablet (prevents neural tube defects)",
      "Schedule ANC Checkup 1 before 12 weeks",
      "Drink plenty of water and eat small, frequent meals"
    ],
    keyActionsTe: [
      "ప్రాథమిక ఆరోగ్య కేంద్రంలో లేదా ఆసుపత్రిలో గర్భాన్ని నిర్ధారించుకోండి",
      "రోజూ ఫోలిక్ యాసిడ్ మాత్ర వేసుకోండి (వెన్నుపాము లోపాలను నివారిస్తుంది)",
      "12 వారాల లోపు మొదటి వైద్య పరీక్ష (ANC-1) చేయించుకోండి",
      "మంచి నీళ్లు బాగా తాగండి, కొద్దికొద్దిగా ఎక్కువసార్లు తినండి"
    ]
  },
  {
    weekRange: "13-27",
    trimester: 2,
    title: "Second Trimester (Weeks 13 to 27)",
    titleTe: "రెండవ త్రైమాసికం (13 నుండి 27 వారాలు)",
    babySize: "Lemon to Papaya / Coconut",
    babySizeTe: "నిమ్మకాయ నుండి బొప్పాయి / కొబ్బరికాయ పరిమాణం",
    highlights: "Often called the 'honeymoon period' of pregnancy. Energy improves. You will begin to feel baby's gentle flutter kicks (Quickening) between weeks 18-22.",
    highlightsTe: "ఈ సమయంలో వికారం తగ్గుతుంది. 18-22 వారాల మధ్యలో బిడ్డ కదలికలు (తన్నడం) స్పష్టంగా తెలుస్తాయి.",
    keyActions: [
      "Start daily Iron & Folic Acid (IFA) and Calcium tablets as prescribed",
      "Get Tetanus Toxoid (TT / Td) injection doses",
      "Undergo Ultrasound Anomaly Scan around week 18-20",
      "Include ragi, greens (palak/methi), dal, and milk in daily meals"
    ],
    keyActionsTe: [
      "డాక్టర్ చెప్పిన ప్రకారం ఐరన్ మరియు క్యాల్షియం మాత్రలు రోజూ వేసుకోండి",
      "ధనుర్వాతం (TT/Td) ఇంజెక్షన్ వేయించుకోండి",
      "18-20 వారాల మధ్యలో అల్ట్రాసౌండ్ అనామలీ స్కాన్ చేయించుకోండి",
      "రాగి జావ, ఆకుకూరలు (పాలకూర, మెంతికూర), పప్పు మరియు పాలు ఆహారంలో తీసుకోండి"
    ]
  },
  {
    weekRange: "28-40",
    trimester: 3,
    title: "Third Trimester (Weeks 28 to 40)",
    titleTe: "మూడవ త్రైమాసికం (28 నుండి 40 వారాలు)",
    babySize: "Eggplant to Watermelon / Pumpkin",
    babySizeTe: "వంకాయ నుండి గుమ్మడికాయ పరిమాణం",
    highlights: "Baby gains rapid weight and turns head-down. Lungs mature. Track daily fetal kick counts (aim for at least 10 movements over 2 hours during active periods).",
    highlightsTe: "బిడ్డ వేగంగా బరువు పెరుగుతుంది మరియు తల క్రింది వైపుకు తిరుగుతుంది. బిడ్డ కదలికలను ప్రతిరోజూ గమనించండి.",
    keyActions: [
      "Count baby kicks daily after food",
      "Prepare Hospital Bag and arrange emergency transport (108 / 102)",
      "Finalize preferred delivery hospital / PHC",
      "Watch for labor warning signs: water break, regular contractions, bleeding"
    ],
    keyActionsTe: [
      "భోజనం తర్వాత బిడ్డ కదలికలను లెక్కించండి",
      "హాస్పిటల్ బ్యాగ్ మరియు అత్యవసర రవాణా (108/102) సిద్ధం చేసుకోండి",
      "డెలివరీ కోసం ఆసుపత్రిని ముందే నిర్ణయించుకోండి",
      "ప్రసవ నొప్పుల లక్షణాలను గమనించండి: నీటి సంచి పగలడం, రక్తస్రావం"
    ]
  }
];

export const emergencyDangerSigns = [
  {
    sign: "Vaginal Bleeding (రక్తస్రావం)",
    desc: "Any spotting or bleeding at any stage of pregnancy requires immediate emergency attention.",
    descTe: "గర్భధారణ సమయంలో ఎలాంటి రక్తస్రావం కనిపించినా తక్షణం ఆసుపత్రికి వెళ్ళాలి.",
    urgency: "CRITICAL"
  },
  {
    sign: "Severe Headache & Blurred Vision (తీవ్రమైన తలనొప్పి, కళ్లు తిరగడం)",
    desc: "May indicate high blood pressure / pre-eclampsia. Can lead to convulsions if untreated.",
    descTe: "ఇది అధిక రక్తపోటు (బీపీ) సంకేతం కావచ్చు. వెంటనే వైద్య సహాయం అవసరం.",
    urgency: "CRITICAL"
  },
  {
    sign: "Continuous Severe Abdominal Pain (కడుపులో ఆగని తీవ్రమైన నొప్పి)",
    desc: "Severe persistent pain that doesn't subside.",
    descTe: "సాధారణ నొప్పుల కన్నా భిన్నంగా విపరీతమైన కడుపు నొప్పి రావడం.",
    urgency: "CRITICAL"
  },
  {
    sign: "Water Breaking / Fluid Leaking (నీటి సంచి పగలడం / ఉమ్మనీరు కారడం)",
    desc: "Fluid leakage before labor or foul-smelling discharge needs prompt hospitalization.",
    descTe: "నొప్పులు రాకముందే ఉమ్మనీరు కారితే ఇన్ఫెక్షన్ రాకుండా ఆసుపత్రికి చేరాలి.",
    urgency: "URGENT"
  },
  {
    sign: "Absence or Sudden Drop in Baby Kicks (బిడ్డ కదలికలు తగ్గడం లేదా ఆగిపోవడం)",
    desc: "Fewer than 10 kicks within 2 hours of quiet observation after meals requires evaluation.",
    descTe: "ఆహారం తిన్న తర్వాత కూడా 2 గంటల్లో బిడ్డ 10 సార్లు కదలకపోతే వెంటనే చూపించాలి.",
    urgency: "URGENT"
  },
  {
    sign: "High Fever with Chills (వణుకుతో కూడిన తీవ్ర జ్వరం)",
    desc: "Infection must be evaluated to protect both mother and baby.",
    descTe: "తీవ్రమైన జ్వరం తల్లికి మరియు బిడ్డకు హానికరం. డాక్టర్‌ని సంప్రదించండి.",
    urgency: "URGENT"
  }
];

export const hospitalBagChecklist = [
  { id: "b1", text: "Mother and Child Protection (MCP) / Thayi Card & Aadhaar ID", textTe: "మాతా శిశు సంరక్షణ (MCP) కార్డు, ఆధార్ కార్డు", category: "Documents" },
  { id: "b2", text: "All Antenatal Medical Reports, Ultrasound scans & Doctor Prescriptions", textTe: "గర్భధారణ పరీక్షల రిపోర్టులు, స్కానింగ్ కాపీలు, మందుల చీటీలు", category: "Documents" },
  { id: "b3", text: "Clean cotton nighties with front buttons for breastfeeding (3-4 pairs)", textTe: "పాలివ్వడానికి వీలైన కాటన్ నైటీలు (3-4 జతలు)", category: "Clothing" },
  { id: "b4", text: "Maternity sanitary pads (extra large / night absorbent pads)", textTe: "మెటర్నిటీ శానిటరీ ప్యాడ్లు", category: "Hygiene" },
  { id: "b5", text: "Soft washed cotton baby clothes, caps, mittens, and swaddle cloths (4 sets)", textTe: "శిశువు కోసం మృదువైన కాటన్ బట్టలు, టోపీలు, కప్పే వస్త్రాలు", category: "Baby" },
  { id: "b6", text: "Warm blanket and soft towel for newborn", textTe: "వెచ్చని దుప్పటి మరియు బేబీ టవల్", category: "Baby" },
  { id: "b7", text: "Clean water bottle, flask, and light snacks (roasted nuts, dry fruits)", textTe: "మంచినీళ్ల బాటిల్, ఫ్లాస్క్ మరియు ఆరోగ్యకరమైన స్నాక్స్", category: "Essentials" },
  { id: "b8", text: "Emergency cash and phone charger with emergency numbers written", textTe: "కొంత నగదు, ఫోన్ ఛార్జర్ మరియు ముఖ్యమైన ఫోన్ నంబర్లు రాసిన కాగితం", category: "Essentials" }
];

export const breastfeedingGuides = [
  {
    id: "bf-1",
    topic: "Correct Latch (సరైన విధానంలో పాలివ్వడం)",
    topicTe: "సరైన విధానంలో పాలివ్వడం (లాచ్)",
    summary: "Baby's mouth should be wide open like a yawn, covering the entire dark area (areola), not just the nipple.",
    summaryTe: "శిశువు నోరు పూర్తిగా తెరిచి, కేవలం చనుమొన మాత్రమే కాకుండా చుట్టూ ఉండే నల్లటి భాగాన్ని (అరియోలా) మొత్తం నోట్లోకి తీసుకోవాలి.",
    tips: [
      "Tummy to tummy: Baby's stomach should touch mother's body",
      "Nipple points toward baby's nose, wait for wide mouth, then bring baby swiftly to breast",
      "Chin should rest firmly against the breast, nose is clear for breathing",
      "Cheeks should be round and full; you should hear gentle swallowing sounds without pain"
    ],
    tipsTe: [
      "తల్లి పొట్టకు బిడ్డ పొట్ట ఆనుకుని ఉండాలి",
      "బిడ్డ నోరు పెద్దగా తెరిచే వరకు వేచి ఉండి, బిడ్డను రొమ్ము వద్దకు తీసుకురావాలి",
      "గడ్డం రొమ్మును తాకుతూ ఉండాలి, ముక్కుకు గాలి ఆడేలా ఉండాలి",
      "చనుమొన నొప్పి లేకుండా పాలు మింగే శబ్దం వినిపించాలి"
    ]
  },
  {
    id: "bf-2",
    topic: "Engorgement & Breast Fullness (రొమ్ము బిగదీయడం / వాపు)",
    topicTe: "రొమ్ము బిగదీయడం / పాలు పేరుకుపోవడం",
    summary: "Breasts become swollen, hard, and painful when milk is not drained frequently.",
    summaryTe: "సకాలంలో పాలు ఇవ్వకపోతే రొమ్ములు గట్టిపడి, వాచి నొప్పిగా అనిపిస్తాయి.",
    tips: [
      "Feed baby frequently on demand (every 2 to 3 hours, at least 8-12 times in 24 hours)",
      "Apply warm compress or take a warm shower before feeding to help milk flow",
      "Gently massage breast toward nipple while feeding",
      "Apply cool cabbage leaf or cold compress after feeding to reduce swelling"
    ],
    tipsTe: [
      "బిడ్డ అడిగినప్పుడల్లా (ప్రతి 2-3 గంటలకు) పాలు ఇవ్వండి",
      "పాలివ్వడానికి ముందు గోరువెచ్చని గుడ్డతో కాపడం పెట్టండి",
      "పాలు తాగుతున్నప్పుడు రొమ్మును చనుమొన వైపు మెల్లగా మర్దన చేయండి",
      "పాలిచ్చిన తర్వాత చల్లని కాపడం పెడితే వాపు తగ్గుతుంది"
    ]
  },
  {
    id: "bf-3",
    topic: "Nipple Soreness & Cracks (చనుమొనల నొప్పి & పగుళ్లు)",
    topicTe: "చనుమొనల నొప్పి & పగుళ్లు",
    summary: "Usually caused by shallow latch where baby pinches only the tip of the nipple.",
    summaryTe: "బిడ్డ సరైన విధానంలో కాకుండా కేవలం చనుమొన కొసను మాత్రమే పీల్చినప్పుడు నొప్పి వస్తుంది.",
    tips: [
      "Adjust latch immediately; unlatch gently by inserting a clean finger into baby's corner of mouth",
      "Express a few drops of colostrum or breast milk and rub gently on nipples after feeding (natural healing)",
      "Avoid harsh soaps or drying washes on the breast; wash only with plain water",
      "Expose nipples to air for quick drying"
    ],
    tipsTe: [
      "లాచ్ విధానాన్ని సరిచేయండి; నోటి కొసలో వేలు పెట్టి సున్నితంగా వేరుచేయండి",
      "పాలిచ్చిన తర్వాత రెండు చుక్కల పాలను చనుమొనలపై రాయండి (ఇది సహజంగా నయం చేస్తుంది)",
      "సబ్బులు ఉపయోగించవద్దు; కేవలం మంచి నీటితో మాత్రమే కడగండి",
      "గాలి తగిలేలా ఉంచితే త్వరగా తగ్గుతుంది"
    ]
  }
];

export const childNutritionGuidance = [
  {
    ageRange: "0 - 6 Months",
    ageRangeTe: "0 నుండి 6 నెలలు",
    heading: "Exclusive Breastfeeding (తల్లిపాలు మాత్రమే)",
    headingTe: "తల్లిపాలు మాత్రమే ఇవ్వాలి",
    description: "Mother's milk provides complete nutrition and immune antibodies. No water, no honey, no animal milk, and no teas are needed.",
    descriptionTe: "మొదటి 6 నెలలు తల్లిపాలు మాత్రమే ఇవ్వాలి. నీళ్లు, తేనె, ఆవు పాలు వంటివి అస్సలు ఇవ్వకూడదు. తల్లిపాలే బిడ్డకు అమృతం.",
    recommendedFoods: ["Breast milk on demand (8-12 times a day)"],
    recommendedFoodsTe: ["తల్లిపాలు మాత్రమే (రోజుకు 8-12 సార్లు)"]
  },
  {
    ageRange: "6 - 8 Months",
    ageRangeTe: "6 నుండి 8 నెలలు",
    heading: "Introduction of Soft Mashed Solids (మృదువైన ఆహారం ప్రారంభం)",
    headingTe: "మృదువైన ఆహారం ప్రారంభం (అన్నప్రాశన)",
    description: "Start complementary feeding around 180 days while continuing frequent breastfeeding. Foods should be well cooked, soft, and mashed with a spoon.",
    descriptionTe: "6 నెలలు నిండిన తర్వాత తల్లిపాలతో పాటు మెత్తగా ఉడికించిన ఆహారాన్ని కొద్దికొద్దిగా అలవాటు చేయాలి.",
    recommendedFoods: [
      "Ragi malt cooked with water/milk and small jaggery",
      "Mashed moong dal khichdi with a drop of ghee",
      "Mashed ripe banana or boiled stewed apple",
      "Mashed boiled yellow pumpkin, carrot, or sweet potato"
    ],
    recommendedFoodsTe: [
      "రాగి జావ (కొద్దిగా బెల్లంతో)",
      "నెయ్యి వేసిన పెసరపప్పు మెత్తని కిచిడీ",
      "మెత్తగా పిసికిన అరటిపండు గుజ్జు",
      "మెత్తగా ఉడికించిన క్యారెట్ లేదా తీపి దుంప"
    ]
  },
  {
    ageRange: "9 - 11 Months",
    ageRangeTe: "9 నుండి 11 నెలలు",
    heading: "Minced and Finger Foods (చిన్న ముక్కలు & మెత్తని ఆహారం)",
    headingTe: "మెత్తని ఘనాహారం & చిన్న ముక్కలు",
    description: "Food can be finely chopped and mashed. Encourage self-feeding with clean hands. Feed 3 small meals plus healthy snacks between feeds.",
    descriptionTe: "ఆహారాన్ని చేత్తో పట్టుకుని తినేలా అలవాటు చేయండి. రోజుకు 3 సార్లు ఆహారం మరియు ఆరోగ్యకరమైన స్నాక్స్ ఇవ్వండి.",
    recommendedFoods: [
      "Thick dal-rice with boiled green leafy vegetables (palak)",
      "Boiled egg yolk (softly mashed)",
      "Curd with soft cooked rice",
      "Soft idli or dosa soaked in light sambar / dal"
    ],
    recommendedFoodsTe: [
      "పాలకూర పప్పు అన్నం (మెత్తగా పిసికినది)",
      "బాగా ఉడికించిన కోడిగుడ్డు పచ్చసొన",
      "మెత్తని పెరుగన్నం",
      "మెత్తని ఇడ్లీ లేదా దోశ పప్పుతో"
    ]
  },
  {
    ageRange: "12 - 24 Months",
    ageRangeTe: "12 నుండి 24 నెలలు (1 నుండి 2 సంవత్సరాలు)",
    heading: "Nutritious Family Diet (ఇంటి భోజనం)",
    headingTe: "ఇంటి పోషకాహారం",
    description: "Child can eat regular nutritious family food with less spice and salt. Continue breastfeeding up to 2 years or beyond.",
    descriptionTe: "తక్కువ కారం, ఉప్పుతో ఇంట్లో వండే అన్ని రకాల పోషకాహారాన్ని ఇవ్వవచ్చు. 2 సంవత్సరాల వరకు తల్లిపాలు కొనసాగించవచ్చు.",
    recommendedFoods: [
      "Full boiled egg (white and yolk)",
      "Cooked dal, seasonal vegetables, and rotis / rice",
      "Fresh seasonal fruits: papaya, mango, guava, banana",
      "Sprouted grains, groundnut chikki, and dairy"
    ],
    recommendedFoodsTe: [
      "పూర్తి ఉడికించిన కోడిగుడ్డు",
      "పప్పు, కూరగాయలు, అన్నం లేదా మెత్తని రొట్టె",
      "సీజనల్ పండ్లు: బొప్పాయి, మామిడి, జామ, అరటి",
      "మొలకెత్తిన గింజలు, పల్లీ పట్టీ, పాలు"
    ]
  }
];

export const maternalNutritionPlans = [
  {
    stage: "Pregnancy (Trimester 2 & 3)",
    stageTe: "గర్భధారణ (2 & 3 వ త్రైమాసికం)",
    dailyCalorieNeeds: "+350 kcal / day",
    meals: {
      breakfast: [
        { name: "Ragi Dosa or Idli with Groundnut / Chana Chutney", nameTe: "రాగి దోశ లేదా ఇడ్లీ పల్లీ చట్నీతో", cost: "Affordable", calories: "320 kcal" },
        { name: "Vegetable Upma with boiled sprouts and milk", nameTe: "కూరగాయల ఉప్మా మరియు మొలకలు", cost: "Affordable", calories: "340 kcal" }
      ],
      lunch: [
        { name: "Brown / White Rice, Palak / Methi Dal, Curd, Boiled Egg / Paneer", nameTe: "అన్నం, పాలకూర పప్పు, పెరుగు, ఉడికించిన గుడ్డు", cost: "Affordable", calories: "550 kcal" },
        { name: "Jowar / Wheat Roti, Mixed Vegetable curry, Rajma / Chana dal", nameTe: "జొన్న రొట్టె, కూరగాయల కూర, శనగలు", cost: "Affordable", calories: "520 kcal" }
      ],
      snacks: [
        { name: "Groundnut Chikki (Palli Patti) or Roasted Gram + Jaggery", nameTe: "పల్లీ పట్టీ లేదా వేపిన శనగలు మరియు బెల్లం (ఐరన్ సమృద్ధిగా)", cost: "Low-Cost", calories: "180 kcal" },
        { name: "Seasonal fresh fruit (Banana / Guava) and buttermilk", nameTe: "అరటిపండు / జామకాయ మరియు మజ్జిగ", cost: "Low-Cost", calories: "140 kcal" }
      ],
      dinner: [
        { name: "Soft Phulkas / Rice with Moong Dal and Bottle Gourd / Ridge Gourd curry", nameTe: "పుల్కాలు / అన్నం, పెసరపప్పు మరియు సొరకాయ కూర", cost: "Affordable", calories: "420 kcal" },
        { name: "Khichdi with mixed vegetables, ghee, and roasted papad", nameTe: "వెజిటబుల్ కిచిడీ కొద్దిగా నెయ్యితో", cost: "Affordable", calories: "450 kcal" }
      ]
    }
  },
  {
    stage: "Postpartum & Lactating Mother",
    stageTe: "బాలింత (పాలిచ్చే తల్లులు)",
    dailyCalorieNeeds: "+500 kcal / day (Extra fluids)",
    meals: {
      breakfast: [
        { name: "Ragi Malt with milk & jaggery + 2 Boiled Eggs", nameTe: "రాగి జావ (పాలు, బెల్లంతో) మరియు 2 కోడిగుడ్లు", cost: "Affordable", calories: "380 kcal" },
        { name: "Methi paratha / Dosa with garlic-tomato chutney", nameTe: "మెంతి దోశ వెల్లుల్లి చట్నీతో", cost: "Affordable", calories: "360 kcal" }
      ],
      lunch: [
        { name: "Rice, Drumstick & Tomato Dal, Garlic rasam, Green leafy vegetable", nameTe: "మునక్కాయ పప్పు, వెల్లుల్లి చారు, ఆకుకూర వేపుడు, అన్నం", cost: "Affordable", calories: "580 kcal" },
        { name: "Mutton bone soup / Fish curry or Soya bean chunks with rice", nameTe: "చేపల కూర లేదా సోయాబీన్ కూర అన్నంతో", cost: "Moderate", calories: "600 kcal" }
      ],
      snacks: [
        { name: "Sesame (Nuvvula) Ladoo / Gond Ladoo with warm milk", nameTe: "నువ్వుల లడ్డు లేదా వేడి పాలు (క్యాల్షియం అధికం)", cost: "Affordable", calories: "220 kcal" },
        { name: "Coconut water or warm cumin-fennel herbal water", nameTe: "కొబ్బరి నీళ్లు లేదా జీలకర్ర-సోంపు కాచిన నీళ్లు", cost: "Low-Cost", calories: "60 kcal" }
      ],
      dinner: [
        { name: "Easily digestible Moong dal khichdi with ghee and curd", nameTe: "సులువుగా జీర్ణమయ్యే పెసరపప్పు కిచిడీ", cost: "Affordable", calories: "460 kcal" }
      ]
    }
  }
];
