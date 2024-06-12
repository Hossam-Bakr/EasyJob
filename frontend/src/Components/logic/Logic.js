//handle countries & cities & areas

export const countryOptions = [
  { value: "Egypt", label: "Egypt" },
  { value: "UAE", label: "UAE" },
  { value: "KSA", label: "KSA" },
  { value: "Kuwait", label: "Kuwait" },
];

export const Cities = {
  EgyptCities: [
    "Alexandria",
    "Aswan",
    "Banha",
    "Beni Suef",
    "Cairo",
    "Dakahlia",
    "Fayyum",
    "Gharbia",
    "Giza",
    "Ismailia",
    "Kafr el-Sheikh",
    "Luxor",
    "Mansoura",
    "Marsa Matruh",
    "Minya",
    "Mit Ghamr",
    "Monufia",
    "New Valley",
    "North Sinai",
    "Port Said",
    "Qalyubia",
    "Qena",
    "Sharqia",
    "Suez",
    "Sohag",
    "South Sinai",
    "Tanta",
  ],

  UAECities: [
    "Dubai",
    "Abu Dhabi",
    "Sharjah",
    "Al Ain",
    "Ajman",
    "Ras Al Khaimah",
    "Fujairah",
    "Umm Al Quwain",
  ],

  SaudiArabiaCities: [
    "Riyadh",
    "Jeddah",
    "Mecca",
    "Medina",
    "Dammam",
    "Tabuk",
    "Buraidah",
    "Khobar",
    "Abha",
    "Taif",
    "Khamis Mushait",
    "Hail",
    "Najran",
    "Yanbu",
    "Al Qatif",
    "Jubail",
    "Al-Kharj",
    "Qurayyat",
    "Ahsa",
    "Dhahran",
  ],

  KuwaitCities: [
    "Kuwait City",
    "Al Ahmadi",
    "Hawalli",
    "Salmiya",
    "Al Farwaniyah",
    "Fahaheel",
    "Jahra",
    "Al Shuwaikh",
    "Sabah as Salim",
    "Salwa",
    "Al Jahra",
  ],
};


export const cityOptions = Object.entries(Cities).flatMap(([country, cities]) =>
  cities.map(city => ({ value: city, label: city }))
);

export const Areas = {
  CairoAreas: [
    "Nasr City",
    "Maadi",
    "Dokki",
    "Heliopolis",
    "Zamalek",
    "Mohandessin",
    "New Cairo",
    "Roud El Farag"
  ],
  AlexandriaAreas: [
    "Montaza",
    "Smouha",
    "Stanley",
    "Roshdy",
    "Sidi Gaber",
    "Miami",
    "Kafr Abdo",
  ],
  GizaAreas: [
    "Mohandessin",
    "Dokki",
    "Agouza",
    "Haram",
    "Faisal",
    "Imbaba",
    "Warraq",
    "6th of October City",
  ],
  PortSaidAreas: [
    "Port Fouad",
    "Port Tawfik",
    "Al-Manakh",
    "Al-Arab",
    "Al-Ganayen",
    "Al-Zohour",
    "Al-Dawahy",
  ],
  SuezAreas: [
    "Arbaeen",
    "El-Arbaaen",
    "El-Ganayen",
    "El-Horria",
    "El-Mahata",
    "El-Montaza",
    "El-Raml",
  ],

  LuxorAreas: [
    "East Bank",
    "West Bank",
    "Karnak",
    "Al-Uqsur",
    "Al-Qarna",
    "Al-Bayadeya",
    "Al-Sahaby Island",
  ],

  AswanAreas: [
    "Aswan City",
    "New Aswan",
    "Kom Ombo",
    "Daraw",
    "Edfu",
    "Abu Simbel",
    "Gharb Soheil",
  ],

  TantaAreas: [
    "El-Gharbia",
    "El-Geish Street",
    "El-Riad Street",
    "El-Sayeda Zeinab",
    "El-Gezira",
    "El-Manakh",
    "El-Shaheed",
  ],

  MansouraAreas: [
    "Mansoura City Center",
    "El-Gomhoria",
    "El-Nahda",
    "El-Mahalla",
    "El-Dawar",
    "El-Matariya",
    "El-Senbellawein",
  ],

  FayyumAreas: [
    "Fayyum City",
    "Ihnasia",
    "Tamiya",
    "Sinnuris",
    "El-Wasta",
    "Sanhour",
    "Kom Oshim",
  ],

  IsmailiaAreas: [
    "Ismailia City Center",
    "El-Qantara",
    "Fayed",
    "El-Tal El-Kabir",
    "El-Kasasin",
    "El-Saraya",
    "El-Temsah",
  ],

  MinyaAreas: [
    "Minya City Center",
    "El-Minya El-Jadida",
    "El-Adwa",
    "El-Baghla",
    "El-Maghagha",
    "Samalut",
    "Beni Mazar",
  ],

  MersaMatruhAreas: [
    "Agiba",
    "Marina",
    "Romel",
    "Dabaa",
    "El Alamein",
    "El Negila",
    "Sidi Abdel Rahman",
  ],

  NewValleyAreas: [
    "Al Kharga Oasis",
    "Dakhla Oasis",
    "Farafra Oasis",
    "Baris Oasis",
    "Bashandi Oasis",
    "Mut Oasis",
    "Balat Oasis",
  ],

  MitGhamrAreas: [
    "Mit Ghamr Center",
    "Al Hamool",
    "Al-Masara",
    "Al-Majd",
    "Al-Mahalat",
    "Al-Waqad",
    "Al-Manshiya",
  ],

  NorthSinaiAreas: [
    "Arish City Center",
    "Sheikh Zuweid",
    "Rafah",
    "Al-Arish Port",
    "Al-Midan",
    "Al-Masoura",
    "Al-Mokata'a",
  ],

  SouthSinaiAreas: [
    "Sharm El Sheikh City Center",
    "Naama Bay",
    "Ras Um Sid",
    "Nabq Bay",
    "Hadaba",
    "Old Market Area",
    "Montazah",
  ],

  QenaAreas: [
    "Qena City Center",
    "Nag Hammadi",
    "Luxor Street",
    "Al-Waqf",
    "Al-Ba'irat",
    "Al-Mayyah",
    "Al-Ja'fara",
  ],

  MonufiaAreas: [
    "Shibin El Kom City Center",
    "Quisna",
    "Ashmoun",
    "Sers El-Lyan",
    "Al-Shohadaa",
    "Tala",
    "Menouf",
  ],

  SohagAreas: [
    "Sohag City Center",
    "Akhmim",
    "Girga",
    "Tima",
    "Tahta",
    "Dar El Salam",
    "Gerga",
  ],

  BanhaAreas: [
    "Banha City Center",
    "Shebin El Qanater",
    "Qalyub",
    "Qaha",
    "Kafr Shukr",
    "Shobra",
    "Kom Hamada",
  ],

  KafrElSheikhAreas: [
    "Kafr El-Sheikh City Center",
    "Desouk",
    "Baltim",
    "Metoubes",
    "Fuwwah",
    "Sidi Salem",
    "Qellin",
  ],

  QalyubiaAreas: [
    "Banha City Center",
    "Shebin El Qanater",
    "Qalyub",
    "Qaha",
    "Kafr Shukr",
    "Shobra",
    "Kom Hamada",
  ],

  DakahliaAreas: [
    "Mansoura City Center",
    "Talkha",
    "Mit Ghamr",
    "Aga",
    "Mit Salsil",
    "Sherbin",
    "Belqas",
  ],

  BeniSuefAreas: [
    "Beni Suef City Center",
    "El Fashn",
    "Biba",
    "Nasser",
    "El Wasty",
    "Biba",
    "Beni Mazar",
  ],
  SharqiaAreas: [
    "Zagazig City Center",
    "Abu Hammad",
    "Zakazik El Gedida",
    "Al-Ibrahimiyah",
    "Bilbeis",
    "Hehia",
    "Husseiniya",
  ],
  // Dubai Areas
  DubaiAreas: [
    "Downtown Dubai",
    "Jumeirah",
    "Dubai Marina",
    "Business Bay",
    "Palm Jumeirah",
    "Deira",
    "Al Barsha",
  ],

  // Abu Dhabi Areas
  AbuDhabiAreas: [
    "Downtown Abu Dhabi",
    "Al Reem Island",
    "Khalifa City",
    "Corniche",
    "Yas Island",
    "Mussafah",
    "Saadiyat Island",
  ],

  // Sharjah Areas
  SharjahAreas: [
    "Al Majaz",
    "Al Nahda",
    "Al Qasimia",
    "Al Khan",
    "Al Taawun",
    "Maysaloon",
    "Muwaileh",
  ],

  // Al Ain Areas
  AlAinAreas: [
    "Al Jimi",
    "Al Muwaiji",
    "Al Towayya",
    "Al Maqam",
    "Zakher",
    "Asharej",
    "Hili",
  ],

  // Ajman Areas
  AjmanAreas: [
    "Ajman Downtown",
    "Al Jurf",
    "Al Nuaimia",
    "Al Rawda",
    "Al Mowaihat",
    "Al Zahra",
    "Al Rashidiya",
  ],

  // Ras Al Khaimah Areas
  RasAlKhaimahAreas: [
    "Al Nakheel",
    "Al Hamra",
    "Mina Al Arab",
    "Rams",
    "Dafan Al Nakheel",
    "Corniche",
    "Al Jazeera Al Hamra",
  ],

  // Fujairah Areas
  FujairahAreas: [
    "Fujairah City Center",
    "Al Faseel",
    "Al Qalaa",
    "Al Fahlain",
    "Al Gurf",
    "Sakamkam",
    "Dibba",
  ],

  // Umm Al Quwain Areas
  UmmAlQuwainAreas: [
    "Umm Al Quwain City Center",
    "Al Salama",
    "Al Haditha",
    "Al Riqqah",
    "Bassinah",
    "Falaj Al Mualla",
    "Mistal",
  ],

  // Riyadh Areas
  RiyadhAreas: [
    "Al Olaya",
    "King Abdullah Financial District",
    "Al Malaz",
    "Al Sulimaniah",
    "Al Murabba",
    "Al Wadi",
    "Al Yarmouk",
  ],

  // Jeddah Areas
  JeddahAreas: [
    "Al Balad",
    "Al Rawdah",
    "Al Hamraa",
    "Al Khalidiyyah",
    "Ash Shati",
    "Al Aziziyah",
    "Al Nahda",
  ],

  // Mecca Areas
  MeccaAreas: [
    "Al Haram",
    "Ajyad",
    "Aziziyah",
    "Al Kakiyah",
    "Al Naseem",
    "Al Misfalah",
    "Al Aziziyah",
  ],

  // Medina Areas
  MedinaAreas: [
    "Al Haram",
    "Al Qiblatain",
    "Al Ansar",
    "Al Noor",
    "Al Faisaliyah",
    "Bani Quraiza",
    "Al Arid",
  ],

  // Dammam Areas
  DammamAreas: [
    "Al Faisaliyah",
    "Al Shati",
    "An Nuzhah",
    "Al Olaya",
    "Al Khobar Corniche",
    "King Fahd Park",
    "Al Rakah",
  ],

  // Tabuk Areas
  TabukAreas: [
    "Al Qadsiyah",
    "Al Hadidah",
    "Al Andalus",
    "Al Madina",
    "Al Khaleej",
    "Al Waha",
    "King Fahd District",
  ],

  // Buraidah Areas
  BuraidahAreas: [
    "Al Baladiyah",
    "Al Khaleej",
    "King Abdullah Sport City",
    "Al Nakheel",
    "Al Olaya",
    "King Abdulaziz Historical Center",
    "Al Malaz",
  ],

  // Khobar Areas
  KhobarAreas: [
    "Al Khobar Corniche",
    "Thuqbah",
    "Aziziyah",
    "Al Ulaya",
    "Rakah",
    "Al Bandariyah",
    "Half Moon Bay",
  ],

  // Abha Areas
  AbhaAreas: [
    "Al Soodah Park",
    "Al Salam",
    "Al Mansak",
    "Asir National Park",
    "Khamis Mushait",
    "Majardah",
    "Abha Dam",
  ],

  // Taif Areas
  TaifAreas: [
    "Al Shifa",
    "Al Hada",
    "Shubra Palace",
    "King Fahd Garden",
    "Ar Ruddaf Park",
    "Al Kar Tourist Village",
    "Al Muhandiseen",
  ],

  // Khamis Mushait Areas
  KhamisMushaitAreas: [
    "Asir University",
    "Al Gahwa",
    "Al Thagher",
    "King Fahd Park",
    "Asir Mall",
    "Al Jawazat",
    "Abha Road",
  ],

  // Hail Areas
  HailAreas: [
    "Al Barzan Palace",
    "Al Qishlah Park",
    "Hail Park",
    "Aja Mountain",
    "Aja Palace",
    "King Fahd Garden",
    "Al Ekresh",
  ],

  // Najran Areas
  NajranAreas: [
    "Al Ukhdood Archaeological Site",
    "Al Malaf Park",
    "Al Qara Mountain",
    "Al Fawar Park",
    "Al Uyun Park",
    "Najran Dam",
    "Al Hudud",
  ],

  // Yanbu Areas
  YanbuAreas: [
    "Yanbu Corniche",
    "Royal Commission",
    "Yanbu Industrial City",
    "Al Majdoul",
    "Al Sharm",
    "Yanbu Commercial Port",
    "Al Barr Garden",
  ],

  // Al Qatif Areas
  AlQatifAreas: [
    "Al Rashid Mall",
    "Al Qatif Corniche",
    "Al Safwa Park",
    "Al Khobar Corniche",
    "Al Jisr Park",
    "Al Zahran",
    "Al Ahsa Street",
  ],

  // Jubail Areas
  JubailAreas: [
    "Jubail Industrial City",
    "Jubail Corniche",
    "Royal Commission",
    "Jubail Commercial Port",
    "King Fahd Industrial Port",
    "Al Fanateer Corniche",
    "Al Huwailat",
  ],

  // Al-Kharj Areas
  AlKharjAreas: [
    "Al Kharj City Center",
    "Al Kharj Corniche",
    "Prince Sultan Air Base",
    "King Abdulaziz Road",
    "Al Zulfi Road",
    "Al Wasl",
    "Al Faris",
  ],

  // Qurayyat Areas
  QurayyatAreas: [
    "Qurayyat City Center",
    "Al Sari",
    "Al Qasr",
    "Al Iskan",
    "Al Wahba",
    "Al Ahsa Road",
    "Al Majmaah",
  ],

  // Ahsa Areas
  AhsaAreas: [
    "Al Hofuf",
    "Al Mubarraz",
    "Al Hada",
    "Al Jawazat",
    "Al Ulaya",
    "Al Sarar",
    "Al Moudif",
  ],

  // Dhahran Areas
  DhahranAreas: [
    "Dhahran City Center",
    "King Fahd University",
    "Aramco Residential Camp",
    "Prince Saud Bin Naif Park",
    "Al Shatea Mall",
    "Al Rashid Mall",
    "King Fahd Park",
  ],

  // Kuwait City Areas
  KuwaitCityAreas: [
    "Sharq",
    "Mirqab",
    "Kuwait Towers",
    "Dasman",
    "Shamiya",
    "Qibla",
    "Jaber Al-Ahmad Cultural Centre",
  ],

  // Al Ahmadi Areas
  AlAhmadiAreas: [
    "Ahmadi City Center",
    "Riqqah",
    "Fahaheel",
    "Mangaf",
    "Ahmadi Industrial Area",
    "Abu Halifa",
    "Sabah Al Salem",
  ],

  // Hawalli Areas
  HawalliAreas: [
    "Hawalli City Center",
    "Mishref",
    "Jabriya",
    "Mubarak Al Kabeer",
    "Salwa",
    "Bayan",
    "Salmiya",
  ],

  // Salmiya Areas
  SalmiyaAreas: [
    "Salmiya City Center",
    "Salmiya Corniche",
    "Marina Mall",
    "Salmiya Park",
    "Salem Al Mubarak Street",
    "Olympia Mall",
    "Marina Crescent",
  ],

  // Al Farwaniyah Areas
  AlFarwaniyahAreas: [
    "Farwaniya City Center",
    "Abbasiya",
    "Al-Rai",
    "Khaitan",
    "Ishbiliya",
    "Jleeb Al-Shuyoukh",
    "Riggae",
  ],

  // Fahaheel Areas
  FahaheelAreas: [
    "Fahaheel City Center",
    "Mangaf",
    "Abu Halifa",
    "Fintas",
    "Mahboula",
    "Mubarak Al Kabeer",
    "Ahmadi",
  ],

  // Jahra Areas
  JahraAreas: [
    "Jahra City Center",
    "Naeem",
    "Qasr",
    "Sulaibikhat",
    "Amghara",
    "Jahra Industrial Area",
    "Abdali",
  ],

  // Al Shuwaikh Areas
  AlShuwaikhAreas: [
    "Shuwaikh City Center",
    "Shuwaikh Industrial Area",
    "Al-Rai",
    "Shuwaikh Port",
    "Shuwaikh Free Trade Zone",
    "Dajeej",
    "Al-Rai Exhibition & Convention Center",
  ],

  // Sabah as Salim Areas
  SabahAsSalimAreas: [
    "Sabah as Salim City Center",
    "Sabah as Salim Industrial Area",
    "South Sabah as Salim",
    "North Sabah as Salim",
    "East Sabah as Salim",
    "West Sabah as Salim",
    "Julaiaa",
  ],

  // Salwa Areas
  SalwaAreas: [
    "Salwa City Center",
    "Mubarak Al Kabeer",
    "Jaber Al Ahmad",
    "South Salwa",
    "North Salwa",
    "East Salwa",
    "West Salwa",
  ],

  // Al Jahra Areas
  AlJahraAreas: [
    "Al Jahra City Center",
    "Naseem",
    "Taima",
    "Qasr",
    "Mutlaa",
    "Waha",
    "Sulaibiya",
  ],
};

export const countryChange = (val, setState) => {
  switch (val) {
    case "Egypt":
      setState(Cities.EgyptCities);
      break;
    case "UAE":
      setState(Cities.UAECities);
      break;
    case "KSA":
      setState(Cities.SaudiArabiaCities);
      break;
    case "Kuwait":
      setState(Cities.KuwaitCities);
      break;
    default:
      setState([]);
      break;
  }
};

export const cityChange = (val, setState) => {
  switch (val) {
    //case Egypt
    case "Cairo":
      setState(Areas.CairoAreas);
      break;
    case "Alexandria":
      setState(Areas.AlexandriaAreas);
      break;
    case "Giza":
      setState(Areas.GizaAreas);
      break;
    case "Port Said":
      setState(Areas.PortSaidAreas);
      break;
    case "Suez":
      setState(Areas.SuezAreas);
      break;
    case "Luxor":
      setState(Areas.LuxorAreas);
      break;
    case "Aswan":
      setState(Areas.AswanAreas);
      break;
    case "Tanta":
      setState(Areas.TantaAreas);
      break;
    case "Mansoura":
      setState(Areas.MansouraAreas);
      break;
    case "Fayyum":
      setState(Areas.FayyumAreas);
      break;
    case "Ismailia":
      setState(Areas.IsmailiaAreas);
      break;
    case "Minya":
      setState(Areas.MinyaAreas);
      break;
    case "Mersa Matruh":
      setState(Areas.MersaMatruhAreas);
      break;
    case "New Valley":
      setState(Areas.NewValleyAreas);
      break;
    case "Mit Ghamr":
      setState(Areas.MitGhamrAreas);
      break;
    case "North Sinai":
      setState(Areas.NorthSinaiAreas);
      break;
    case "South Sinai":
      setState(Areas.SouthSinaiAreas);
      break;
    case "Qena":
      setState(Areas.QenaAreas);
      break;
    case "Monufia":
      setState(Areas.MonufiaAreas);
      break;
    case "Sohag":
      setState(Areas.SohagAreas);
      break;
    case "Banha":
      setState(Areas.BanhaAreas);
      break;
    case "Kafr el-Sheikh":
      setState(Areas.KafrElSheikhAreas);
      break;
    case "Qalyubia":
      setState(Areas.QalyubiaAreas);
      break;
    case "Dakahlia":
      setState(Areas.DakahliaAreas);
      break;
    case "Beni Suef":
      setState(Areas.BeniSuefAreas);
      break;
    case "Sharqia":
      setState([Areas.SharqiaAreas]);
      break;

    // case UAE
    case "Dubai":
      setState(Areas.DubaiAreas);
      break;
    case "Abu Dhabi":
      setState(Areas.AbuDhabiAreas);
      break;
    case "Sharjah":
      setState(Areas.SharjahAreas);
      break;
    case "Al Ain":
      setState(Areas.AlAinAreas);
      break;
    case "Ajman":
      setState(Areas.AjmanAreas);
      break;
    case "Ras Al Khaimah":
      setState(Areas.RasAlKhaimahAreas);
      break;
    case "Fujairah":
      setState(Areas.FujairahAreas);
      break;
    case "Umm Al Quwain":
      setState(Areas.UmmAlQuwainAreas);
      break;
    case "Riyadh":
      setState(Areas.RiyadhAreas);
      break;
    case "Jeddah":
      setState(Areas.JeddahAreas);
      break;
    case "Mecca":
      setState(Areas.MeccaAreas);
      break;
    case "Medina":
      setState(Areas.MedinaAreas);
      break;
    case "Dammam":
      setState(Areas.DammamAreas);
      break;
    case "Tabuk":
      setState(Areas.TabukAreas);
      break;
    case "Buraidah":
      setState(Areas.BuraidahAreas);
      break;
    case "Khobar":
      setState(Areas.KhobarAreas);
      break;
    case "Abha":
      setState(Areas.AbhaAreas);
      break;
    case "Taif":
      setState(Areas.TaifAreas);
      break;
    case "Khamis Mushait":
      setState(Areas.KhamisMushaitAreas);
      break;
    case "Hail":
      setState(Areas.HailAreas);
      break;
    case "Najran":
      setState(Areas.NajranAreas);
      break;
    case "Yanbu":
      setState(Areas.YanbuAreas);
      break;
    case "Al Qatif":
      setState(Areas.AlQatifAreas);
      break;
    case "Jubail":
      setState(Areas.JubailAreas);
      break;
    case "Al-Kharj":
      setState(Areas.AlKharjAreas);
      break;
    case "Qurayyat":
      setState(Areas.QurayyatAreas);
      break;
    case "Ahsa":
      setState(Areas.AhsaAreas);
      break;
    case "Dhahran":
      setState(Areas.DhahranAreas);
      break;
    case "Kuwait City":
      setState(Areas.KuwaitCityAreas);
      break;
    case "Al Ahmadi":
      setState(Areas.AlAhmadiAreas);
      break;
    case "Hawalli":
      setState(Areas.HawalliAreas);
      break;
    case "Salmiya":
      setState(Areas.SalmiyaAreas);
      break;
    case "Al Farwaniyah":
      setState(Areas.AlFarwaniyahAreas);
      break;
    case "Fahaheel":
      setState(Areas.FahaheelAreas);
      break;
    case "Jahra":
      setState(Areas.JahraAreas);
      break;
    case "Al Shuwaikh":
      setState(Areas.AlShuwaikhAreas);
      break;
    case "Sabah as Salim":
      setState(Areas.SabahAsSalimAreas);
      break;
    case "Salwa":
      setState(Areas.SalwaAreas);
      break;
    case "Al Jahra":
      setState(Areas.AlJahraAreas);
      break;
    default:
      setState([]);
      break;
  }
};

export const yearsOptions = [
  { value: 0, label: "No Experience" },
  { value: 0.5, label: "less than year" },
  { value: 1, label: "1 year" },
  { value: 2, label: "2 years" },
  { value: 3, label: "3 years" },
  { value: 4, label: "4 years" },
  { value: 5, label: "5 years" },
  { value: 6, label: "6 years" },
  { value: 7, label: "7 years" },
  { value: 8, label: "8 years" },
  { value: 9, label: "9 years" },
  { value: 10, label: "10 years" },
  { value: 11, label: "11 years" },
  { value: 12, label: "12 years" },
  { value: 13, label: "13 years" },
  { value: 14, label: "14 years" },
  { value: 15, label: "15 years" },
  { value: 16, label: "+15 years" },
];

export const totalYearsConversion = (num, setState) => {
  switch (num) {
    case 0:
      setState("No Experience");
      break;
    case 1:
      setState("1 year");
      break;
    case 0.5:
      setState("less than year");
      break;
    case 2:
      setState("2 years");
      break;
    case 3:
      setState("3 years");
      break;
    case 4:
      setState("4 years");
      break;
    case 5:
      setState("5 years");
      break;
    case 6:
      setState("6 years");
      break;
    case 7:
      setState("7 years");
      break;
    case 8:
      setState("8 years");
      break;
    case 9:
      setState("9 years");
      break;
    case 10:
      setState("10 years");
      break;
    case 11:
      setState("11 years");
      break;
    case 12:
      setState("12 years");
      break;
    case 13:
      setState("13 years");
      break;
    case 14:
      setState("14 years");
      break;
    case 15:
      setState("15 years");
      break;
    case 16:
      setState("+15 years");
      break;

    default:
      break;
  }
};

export const experianceOptions = [
  { value: "full-time", label: "full-time" },
  { value: "part-time", label: "part-time" },
  { value: "freelance/project", label: "freelance/project" },
  { value: "internship", label: "internship" },
  { value: "volunteering", label: "volunteering" },
  { value: "student-activity", label: "student-activity" },
];

export const titleOptions = [
  { value: "Software Engineer", label: "Software Engineer" },
  { value: "Data Scientist", label: "Data Scientist" },
  { value: "UX Designer", label: "UX Designer" },
  { value: "UI Designer", label: "UI Designer" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Marketing Manager", label: "Marketing Manager" },
  { value: "Sales Representative", label: "Sales Representative" },
  { value: "Customer Support Specialist", label: "Customer Support Specialist" },
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "HR Manager", label: "HR Manager" },
  { value: "Financial Analyst", label: "Financial Analyst" },
  { value: "Operations Manager", label: "Operations Manager" },
  { value: "Project Manager", label: "Project Manager" },
  { value: "Business Analyst", label: "Business Analyst" },
  { value: "Content Writer", label: "Content Writer" },
  { value: "Legal Counsel", label: "Legal Counsel" },
  { value: "Network Engineer", label: "Network Engineer" },
  { value: "Systems Administrator", label: "Systems Administrator" },
  { value: "Database Administrator", label: "Database Administrator" },
  { value: "Web Developer", label: "Web Developer" },
  { value: "Mobile App Developer", label: "Mobile App Developer" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "QA Engineer", label: "QA Engineer" },
  { value: "UI/UX Developer", label: "UI/UX Developer" },
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Fullstack Developer", label: "Fullstack Developer" },
  { value: "Game Developer", label: "Game Developer" },
  { value: "Embedded Systems Engineer", label: "Embedded Systems Engineer" },
  { value: "AI Engineer", label: "AI Engineer" },
  { value: "Machine Learning Engineer", label: "Machine Learning Engineer" },
  { value: "Robotics Engineer", label: "Robotics Engineer" },
  { value: "Industrial Designer", label: "Industrial Designer" },
  { value: "Architect", label: "Architect" },
  { value: "Civil Engineer", label: "Civil Engineer" },
  { value: "Electrical Engineer", label: "Electrical Engineer" },
  { value: "Mechanical Engineer", label: "Mechanical Engineer" },
  { value: "Chemical Engineer", label: "Chemical Engineer" },
  { value: "Aerospace Engineer", label: "Aerospace Engineer" },
  { value: "Biomedical Engineer", label: "Biomedical Engineer" },
  { value: "Environmental Engineer", label: "Environmental Engineer" },
  { value: "Petroleum Engineer", label: "Petroleum Engineer" },
  { value: "Forensic Scientist", label: "Forensic Scientist" },
  { value: "Medical Doctor", label: "Medical Doctor" },
  { value: "Nurse Practitioner", label: "Nurse Practitioner" },
  { value: "Physician Assistant", label: "Physician Assistant" },
  { value: "Pharmacist", label: "Pharmacist" },
  { value: "Dentist", label: "Dentist" },
  { value: "Veterinarian", label: "Veterinarian" },
  { value: "Psychologist", label: "Psychologist" },
  { value: "Social Worker", label: "Social Worker" },
  { value: "Teacher", label: "Teacher" },
  { value: "Professor", label: "Professor" },
  { value: "Librarian", label: "Librarian" },
  { value: "Curator", label: "Curator" },
  { value: "Translator", label: "Translator" },
  { value: "Interpreter", label: "Interpreter" },
  { value: "Flight Attendant", label: "Flight Attendant" },
  { value: "Pilot", label: "Pilot" },
  { value: "Air Traffic Controller", label: "Air Traffic Controller" },
  { value: "Marine Biologist", label: "Marine Biologist" },
  { value: "Wildlife Biologist", label: "Wildlife Biologist" },
  { value: "Zoologist", label: "Zoologist" },
  { value: "Botanist", label: "Botanist" },
  { value: "Ecologist", label: "Ecologist" },
  { value: "Conservation Scientist", label: "Conservation Scientist" },
  { value: "Geologist", label: "Geologist" },
  { value: "Meteorologist", label: "Meteorologist" },
  { value: "Astronomer", label: "Astronomer" },
  { value: "Astrophysicist", label: "Astrophysicist" },
  { value: "Cosmologist", label: "Cosmologist" },
  { value: "Mathematician", label: "Mathematician" },
  { value: "Statistician", label: "Statistician" },
  { value: "Economist", label: "Economist" },
  { value: "Political Scientist", label: "Political Scientist" },
  { value: "Historian", label: "Historian" },
  { value: "Archaeologist", label: "Archaeologist" },
  { value: "Anthropologist", label: "Anthropologist" },
  { value: "Sociologist", label: "Sociologist" },
  { value: "Criminologist", label: "Criminologist" },
  { value: "Detective", label: "Detective" },
  { value: "Private Investigator", label: "Private Investigator" },
  { value: "Security Officer", label: "Security Officer" },
  { value: "Firefighter", label: "Firefighter" },
  { value: "Paramedic", label: "Paramedic" },
  { value: "Emergency Medical Technician", label: "Emergency Medical Technician" },
  { value: "Registered Nurse", label: "Registered Nurse" },
  { value: "Medical Technologist", label: "Medical Technologist" },
  { value: "Phlebotomist", label: "Phlebotomist" },
  { value: "Radiologic Technologist", label: "Radiologic Technologist" },
  { value: "Physical Therapist", label: "Physical Therapist" },
  { value: "Occupational Therapist", label: "Occupational Therapist" },
  { value: "Speech Therapist", label: "Speech Therapist" },
  { value: "Nutritionist", label: "Nutritionist" },
  { value: "Fitness Trainer", label: "Fitness Trainer" },
  { value: "Yoga Instructor", label: "Yoga Instructor" },
  { value: "Personal Chef", label: "Personal Chef" },
  { value: "Interior Designer", label: "Interior Designer" },
  { value: "Event Planner", label: "Event Planner" },
  { value: "Wedding Planner", label: "Wedding Planner" },
  { value: "Travel Agent", label: "Travel Agent" },
  { value: "Tour Guide", label: "Tour Guide" },
  { value: "Financial Advisor", label: "Financial Advisor" },
  { value: "Insurance Agent", label: "Insurance Agent" },
  { value: "Real Estate Agent", label: "Real Estate Agent" },
  { value: "Property Manager", label: "Property Manager" },
  { value: "Loan Officer", label: "Loan Officer" },
  { value: "Mortgage Broker", label: "Mortgage Broker" },
  { value: "Tax Consultant", label: "Tax Consultant" },
  { value: "Credit Analyst", label: "Credit Analyst" },
  { value: "Investment Banker", label: "Investment Banker" },
  { value: "Wealth Manager", label: "Wealth Manager" },
  { value: "Human Resources Coordinator", label: "Human Resources Coordinator" },
  { value: "Talent Acquisition Specialist", label: "Talent Acquisition Specialist" },
  { value: "Training Manager", label: "Training Manager" },
  { value: "Employee Relations Manager", label: "Employee Relations Manager" },
  { value: "Compensation Analyst", label: "Compensation Analyst" },
  { value: "Benefits Administrator", label: "Benefits Administrator" },
  { value: "Recruitment Consultant", label: "Recruitment Consultant" },
  { value: "Executive Assistant", label: "Executive Assistant" },
  { value: "Administrative Assistant", label: "Administrative Assistant" },
  { value: "Office Manager", label: "Office Manager" },
  { value: "Virtual Assistant", label: "Virtual Assistant" },
  { value: "Data Entry Clerk", label: "Data Entry Clerk" },
  { value: "Receptionist", label: "Receptionist" },
  { value: "Customer Service Representative", label: "Customer Service Representative" },
  { value: "Call Center Agent", label: "Call Center Agent" },
  { value: "Technical Support Specialist", label: "Technical Support Specialist" },
  { value: "Help Desk Technician", label: "Help Desk Technician" },
  { value: "IT Support Specialist", label: "IT Support Specialist" },
  { value: "Network Administrator", label: "Network Administrator" },
  { value: "Cyber Security Analyst", label: "Cyber Security Analyst" },
  { value: "Forensic Computer Analyst", label: "Forensic Computer Analyst" },
  { value: "Ethical Hacker", label: "Ethical Hacker" },
  { value: "Penetration Tester", label: "Penetration Tester" },
  { value: "Systems Analyst", label: "Systems Analyst" },
  { value: "IT Consultant", label: "IT Consultant" },
  { value: "ERP Consultant", label: "ERP Consultant" },
  { value: "SAP Consultant", label: "SAP Consultant" },
  { value: "Quality Assurance Analyst", label: "Quality Assurance Analyst" },
  { value: "Regulatory Affairs Specialist", label: "Regulatory Affairs Specialist" },
  { value: "Compliance Officer", label: "Compliance Officer" },
  { value: "Risk Manager", label: "Risk Manager" },
  { value: "Internal Auditor", label: "Internal Auditor" },
  { value: "External Auditor", label: "External Auditor" },
  { value: "Financial Controller", label: "Financial Controller" },
  { value: "Chief Financial Officer", label: "Chief Financial Officer" },
  { value: "Chief Executive Officer", label: "Chief Executive Officer" },
  { value: "Chief Operating Officer", label: "Chief Operating Officer" },
  { value: "Chief Technology Officer", label: "Chief Technology Officer" },
  { value: "Chief Marketing Officer", label: "Chief Marketing Officer" },
  { value: "Chief Information Officer", label: "Chief Information Officer" },
  { value: "Chief Human Resources Officer", label: "Chief Human Resources Officer" },
  { value: "Chief Legal Officer", label: "Chief Legal Officer" },
  { value: "Chief Strategy Officer", label: "Chief Strategy Officer" },
  { value: "Art Director", label: "Art Director" },
  { value: "Creative Director", label: "Creative Director" },
  { value: "Video Editor", label: "Video Editor" },
  { value: "Sound Engineer", label: "Sound Engineer" },
  { value: "Music Composer", label: "Music Composer" },
  { value: "Game Designer", label: "Game Designer" },
  { value: "Level Designer", label: "Level Designer" },
  { value: "Storyboard Artist", label: "Storyboard Artist" },
  { value: "Animator", label: "Animator" },
  { value: "VFX Artist", label: "VFX Artist" },
  { value: "3D Modeler", label: "3D Modeler" },
  { value: "Fashion Designer", label: "Fashion Designer" },
  { value: "Stylist", label: "Stylist" },
  { value: "Fashion Buyer", label: "Fashion Buyer" },
  { value: "Textile Designer", label: "Textile Designer" },
  { value: "Jewelry Designer", label: "Jewelry Designer" },
  { value: "Interior Decorator", label: "Interior Decorator" },
  { value: "Event Coordinator", label: "Event Coordinator" },
  { value: "Meeting Planner", label: "Meeting Planner" },
  { value: "Conference Organizer", label: "Conference Organizer" },
  { value: "Trade Show Coordinator", label: "Trade Show Coordinator" },
  { value: "Tourism Officer", label: "Tourism Officer" },
  { value: "Museum Curator", label: "Museum Curator" },
  { value: "Art Conservator", label: "Art Conservator" },
  { value: "Gallery Manager", label: "Gallery Manager" },
  { value: "Art Dealer", label: "Art Dealer" },
];

export const degreeLevelOptions = [
  { value: "high school", label: "High School" },
  { value: "bachelor's degree", label: "Bachelor's Degree" },
  { value: "master's degree", label: "Master's Degree" },
  { value: "MBA", label: "MBA" },
  { value: "doctorate", label: "Doctorate Degree" },
  { value: "vocational", label: "Vocational" },
  { value: "diploma", label: "College Diploma" },
];

export const educationLevelOptions = [
  { value: "high school", label: "High School" },
  { value: "bachelor's degree", label: "Bachelor's Degree" },
  { value: "master's degree", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate Degree" },
  { value: "vocational", label: "Vocational" },
  { value: "diploma", label: "College Diploma" },
];

export const gradeOptions = [
  { value: "A / 100-85", label: "A / 85-100" },
  { value: "B / 84-75", label: "B / 75-84" },
  { value: "C / 74-65", label: "C / 65-74" },
  { value: "D / 64-50", label: "D / 50-64" },
];

export const universities = [
  //Egypt
  { value: "al-Azhar University", label: "Al-Azhar University" },
  { value: "alexandria University", label: "Alexandria University" },
  { value: "cairo University", label: "Cairo University" },
  { value: "ain shams University", label: "Ain Shams University" },
  {
    value: "american University in cairo",
    label: "American University in Cairo",
  },
  { value: "assuit University", label: "Assiut University" },
  {
    value: "cairo University of technology",
    label: "Cairo University of Technology",
  },
  { value: "mansoura University", label: "Mansoura University" },
  { value: "helwan University", label: "Helwan University" },
  { value: "suez canal University", label: "Suez Canal University" },
  { value: "zagazig University", label: "Zagazig University" },
  { value: "luxor University", label: "Luxor University" },
  { value: "sohag University", label: "Sohag University" },
  { value: "minia University", label: "Minia University" },
  {
    value: "cairo University of architecture",
    label: "Cairo University of Architecture",
  },
  { value: "benha University", label: "Benha University" },
  { value: "port said University", label: "Port Said University" },
  { value: "banha University", label: "Banha University" },
  { value: "kafr el sheikh University", label: "Kafr El Sheikh University" },
  {
    value: "assuit University of technology",
    label: "Assiut University of Technology",
  },
  { value: "fayoum University", label: "Fayoum University" },
  { value: "south valley University", label: "South Valley University" },
  { value: "aswan University", label: "Aswan University" },
  { value: "tanta University", label: "Tanta University" },
  {
    value: "port said University of technology",
    label: "Port Said University of Technology",
  },
  { value: "damietta University", label: "Damietta University" },
  { value: "menoufia University", label: "Menoufia University" },
  { value: "qena University", label: "Qena University" },
  { value: "damanhur University", label: "Damanhur University" },
  { value: "matrouh University", label: "Matrouh University" },
  { value: "red sea University", label: "Red Sea University" },
  {
    value: "aswan University of technology",
    label: "Aswan University of Technology",
  },
  {
    value: "luxor University of science",
    label: "Luxor University of Science",
  },
  { value: "new valley University", label: "New Valley University" },
  { value: "monofia University", label: "Monofia University" },
  {
    value: "cairo University of medicine",
    label: "Cairo University of Medicine",
  },
  { value: "sinai University", label: "Sinai University" },
  {
    value: "sohag University of technology",
    label: "Sohag University of Technology",
  },
  { value: "eastern desert University", label: "Eastern Desert University" },
  {
    value: "kafr el sheikh University of science",
    label: "Kafr El Sheikh University of Science",
  },
  { value: "beni suef University", label: "Beni Suef University" },

  //UAE
  {
    value: "united arab emirates University",
    label: "United Arab Emirates University",
  },
  { value: "zayed University", label: "Zayed University" },
  { value: "abu dhabi University", label: "Abu Dhabi University" },
  {
    value: "american University of sharjah",
    label: "American University of Sharjah",
  },
  { value: "University of dubai", label: "University of Dubai" },
  {
    value: "hult international business school",
    label: "Hult International Business School",
  },
  {
    value: "heriot watt University dubai",
    label: "Heriot-Watt University Dubai",
  },
  { value: "middlesex University dubai", label: "Middlesex University Dubai" },
  {
    value: "bits pilani dubai",
    label: "Birla Institute of Technology and Science, Pilani - Dubai",
  },
  { value: "University of sharjah", label: "University of Sharjah" },
  { value: "ajman University", label: "Ajman University" },
  {
    value: "american University in dubai",
    label: "American University in Dubai",
  },
  {
    value: "manipal academy of higher education dubai",
    label: "Manipal Academy of Higher Education, Dubai",
  },
  { value: "canadian University dubai", label: "Canadian University Dubai" },
  { value: "synergy University dubai", label: "Synergy University Dubai" },
  { value: "murdoch University dubai", label: "Murdoch University Dubai" },
  { value: "uae University al ain", label: "UAE University, Al Ain" },
  {
    value: "rak medical and health sciences University",
    label: "RAK Medical and Health Sciences University",
  },
  {
    value: "sharjah University of science and technology",
    label: "Sharjah University of Science and Technology",
  },
  {
    value: "al ain University of science and technology",
    label: "Al Ain University of Science and Technology",
  },
  { value: "khalifa University", label: "Khalifa University" },
  {
    value: "american University of ras al khaimah",
    label: "American University of Ras Al Khaimah",
  },
  { value: "al falah University", label: "Al Falah University" },
  { value: "alhosn University", label: "Alhosn University" },
  { value: "University of fujairah", label: "University of Fujairah" },
  {
    value: "ras al khaimah medical and health sciences University",
    label: "Ras Al Khaimah Medical and Health Sciences University",
  },
  {
    value: "city University college of ajman",
    label: "City University College of Ajman",
  },
  {
    value: "emirates college of technology",
    label: "Emirates College of Technology",
  },
  {
    value: "gulf medical University ajman",
    label: "Gulf Medical University, Ajman",
  },
  {
    value: "australian University of wollongong in dubai",
    label: "Australian University of Wollongong in Dubai",
  },
  {
    value: "new york University abu dhabi",
    label: "New York University Abu Dhabi",
  },
  { value: "ritz carlton University", label: "Ritz-Carlton University" },
  {
    value: "syrian private University in uae",
    label: "Syrian Private University in UAE",
  },
  { value: "isra University in uae", label: "Isra University in UAE" },
  {
    value: "british University in dubai",
    label: "British University in Dubai",
  },
  { value: "gulf college uae", label: "Gulf College UAE" },
  {
    value: "modern University for business and science uae",
    label: "Modern University for Business and Science UAE",
  },
  {
    value: "University of westminster dubai",
    label: "University of Westminster Dubai",
  },
  {
    value: "sorbonne University abu dhabi",
    label: "Sorbonne University Abu Dhabi",
  },

  //KSA
  { value: "king saud University", label: "King Saud University" },
  { value: "king abdulaziz University", label: "King Abdulaziz University" },
  { value: "king faisal University", label: "King Faisal University" },
  { value: "king khalid University", label: "King Khalid University" },
  {
    value: "king abdullah University of science and technology",
    label: "King Abdullah University of Science and Technology (KAUST)",
  },
  {
    value: "princess nourah bint abdulrahman University",
    label: "Princess Nourah bint Abdulrahman University",
  },
  {
    value: "imam abdulrahman bin faisal University",
    label: "Imam Abdulrahman bin Faisal University",
  },
  { value: "um al-qura University", label: "Umm Al-Qura University" },
  { value: "najran University", label: "Najran University" },
  { value: "tabuk University", label: "Tabuk University" },
  { value: "jazan University", label: "Jazan University" },
  {
    value: "king saud bin abdulaziz University for health sciences",
    label: "King Saud bin Abdulaziz University for Health Sciences",
  },
  { value: "taif University", label: "Taif University" },
  { value: "jeddah University", label: "Jeddah University" },
  { value: "al-baha University", label: "Al-Baha University" },
  {
    value: "king fahd University of petroleum and minerals",
    label: "King Fahd University of Petroleum and Minerals",
  },
  { value: "shaqra University", label: "Shaqra University" },
  { value: "almajmaah University", label: "Almajmaah University" },
  {
    value: "saudi electronic University",
    label: "Saudi Electronic University",
  },
  { value: "majmaah University", label: "Majmaah University" },
  {
    value: "king saud bin abdulaziz University for islamic studies",
    label: "King Saud bin Abdulaziz University for Islamic Studies",
  },
  {
    value: "al-imam muhammad ibn saud islamic University",
    label: "Al-Imam Muhammad Ibn Saud Islamic University",
  },
  {
    value: "king abdulaziz airbase University",
    label: "King Abdulaziz Airbase University",
  },
  {
    value: "psu prince sultan University",
    label: "PSU - Prince Sultan University",
  },
  { value: "alfaisal University", label: "Alfaisal University" },
  {
    value: "saudi arabian mining company University",
    label: "Saudi Arabian Mining Company University (Ma'aden)",
  },
  {
    value: "ibn sina national college for medical studies",
    label: "Ibn Sina National College for Medical Studies",
  },
  { value: "dammam community college", label: "Dammam Community College" },
  {
    value: "prince sultan college for tourism and hotel sciences",
    label: "Prince Sultan College for Tourism and Hotel Sciences",
  },
  { value: "jubail University college", label: "Jubail University College" },
  {
    value: "al-ahsa college of technology",
    label: "Al-Ahsa College of Technology",
  },
  {
    value: "king saud University for health sciences",
    label: "King Saud University for Health Sciences",
  },
  { value: "king faisal air University", label: "King Faisal Air University" },
  {
    value: "naif arab University for security sciences",
    label: "Naif Arab University for Security Sciences",
  },
  { value: "dar al uloom University", label: "Dar Al Uloom University" },
  { value: "taibah University", label: "Taibah University" },
  {
    value: "king abdulaziz city for science and technology",
    label: "King Abdulaziz City for Science and Technology",
  },
  {
    value: "college of telecommunications and information",
    label: "College of Telecommunications and Information",
  },

  //Kuwait
  { value: "kuwait University", label: "Kuwait University" },
  {
    value: "american University of kuwait",
    label: "American University of Kuwait",
  },
  {
    value: "gulf University for science and technology",
    label: "Gulf University for Science and Technology",
  },
  {
    value: "kuwait international law school",
    label: "Kuwait International Law School",
  },
  {
    value: "australian college of kuwait",
    label: "Australian College of Kuwait",
  },
  { value: "ack kuwait", label: "ACK - Australian College of Kuwait" },
  {
    value: "arab open University kuwait",
    label: "Arab Open University - Kuwait",
  },
  { value: "kipco tower University", label: "KIPCO Tower University" },
  { value: "kazma University", label: "Kazma University" },
  {
    value: "gulf medical University kuwait",
    label: "Gulf Medical University Kuwait",
  },
  { value: "american german University", label: "American-German University" },
  { value: "algonquin college kuwait", label: "Algonquin College Kuwait" },
  {
    value: "kuwait college of science and technology",
    label: "Kuwait College of Science and Technology",
  },
  {
    value: "universal college of learning kuwait",
    label: "Universal College of Learning Kuwait",
  },
  {
    value: "kuwait University of science and technology",
    label: "Kuwait University of Science and Technology",
  },
  {
    value: "alrai media training institute",
    label: "Alrai Media Training Institute",
  },
  { value: "arabian gulf University", label: "Arabian Gulf University" },
  {
    value: "international educational institute kuwait",
    label: "International Educational Institute Kuwait",
  },
  {
    value: "kuwait college of management and science",
    label: "Kuwait College of Management and Science",
  },
  { value: "ahlia University kuwait", label: "Ahlia University Kuwait" },
];

export const fieldsOfStudy = [
  { value: "artificial intelligence", label: "Artificial Intelligence" },
  { value: "blockchain technology", label: "Blockchain Technology" },
  { value: "cloud computing", label: "Cloud Computing" },
  { value: "cybersecurity analysis", label: "Cybersecurity Analysis" },
  { value: "data analytics", label: "Data Analytics" },
  { value: "devops", label: "DevOps (Development and Operations)" },
  { value: "digital forensics", label: "Digital Forensics" },
  {
    value: "human computer interaction",
    label: "Human Computer Interaction (HCI)",
  },
  {
    value: "information systems management",
    label: "Information Systems Management",
  },
  { value: "internet of things", label: "Internet of Things (IoT)" },
  { value: "machine learning", label: "Machine Learning" },
  { value: "mobile app development", label: "Mobile App Development" },
  { value: "network engineering", label: "Network Engineering" },
  { value: "penetration testing", label: "Penetration Testing" },
  { value: "quantum computing", label: "Quantum Computing" },
  { value: "responsive web design", label: "Responsive Web Design" },
  { value: "robotics programming", label: "Robotics Programming" },
  { value: "server administration", label: "Server Administration" },
  { value: "software architecture", label: "Software Architecture" },
  { value: "systems analysis", label: "Systems Analysis" },
  { value: "user experience design", label: "User Experience (UX) Design" },
  {
    value: "virtual reality development",
    label: "Virtual Reality (VR) Development",
  },
  { value: "web development", label: "Web Development" },
  {
    value: "wireless communication technology",
    label: "Wireless Communication Technology",
  },
  { value: "3d printing technology", label: "3D Printing Technology" },
  {
    value: "augmented reality development",
    label: "Augmented Reality (AR) Development",
  },
  { value: "bioinformatics programming", label: "Bioinformatics Programming" },
  { value: "compiler design", label: "Compiler Design" },
  { value: "game ai", label: "Game Artificial Intelligence (Game AI)" },
  {
    value: "natural language processing",
    label: "Natural Language Processing (NLP)",
  },

  { value: "architecture", label: "Architecture" },
  { value: "biology", label: "Biology" },
  { value: "chemistry", label: "Chemistry" },
  { value: "computer science", label: "Computer Science" },
  { value: "economics", label: "Economics" },
  { value: "education", label: "Education" },
  { value: "engineering", label: "Engineering" },
  { value: "environmental science", label: "Environmental Science" },
  { value: "geography", label: "Geography" },
  { value: "history", label: "History" },
  { value: "languages", label: "Languages" },
  { value: "law", label: "Law" },
  { value: "literature", label: "Literature" },
  { value: "mathematics", label: "Mathematics" },
  { value: "medicine", label: "Medicine" },
  { value: "music", label: "Music" },
  { value: "philosophy", label: "Philosophy" },
  { value: "physics", label: "Physics" },
  { value: "political science", label: "Political Science" },
  { value: "psychology", label: "Psychology" },
  { value: "sociology", label: "Sociology" },
  { value: "anthropology", label: "Anthropology" },
  { value: "art history", label: "Art History" },
  { value: "astronomy", label: "Astronomy" },
  { value: "business", label: "Business" },
  { value: "communication", label: "Communication" },
  { value: "criminal justice", label: "Criminal Justice" },
  { value: "earth science", label: "Earth Science" },
  { value: "film studies", label: "Film Studies" },
  { value: "finance", label: "Finance" },
  { value: "gender studies", label: "Gender Studies" },
  { value: "graphic design", label: "Graphic Design" },
  { value: "health science", label: "Health Science" },
  { value: "international relations", label: "International Relations" },
  { value: "journalism", label: "Journalism" },
  { value: "linguistics", label: "Linguistics" },
  { value: "marketing", label: "Marketing" },
  { value: "nutrition", label: "Nutrition" },
  { value: "performing arts", label: "Performing Arts" },
  { value: "public administration", label: "Public Administration" },
  { value: "religious studies", label: "Religious Studies" },
  { value: "social work", label: "Social Work" },
  { value: "statistics", label: "Statistics" },
  { value: "urban planning", label: "Urban Planning" },
  { value: "veterinary medicine", label: "Veterinary Medicine" },
  { value: "web design", label: "Web Design" },
  { value: "zoology", label: "Zoology" },
  { value: "agriculture", label: "Agriculture" },
  { value: "biochemistry", label: "Biochemistry" },
  { value: "business administration", label: "Business Administration" },
  { value: "cognitive science", label: "Cognitive Science" },
  { value: "data science", label: "Data Science" },
  { value: "dentistry", label: "Dentistry" },
  { value: "earthquake engineering", label: "Earthquake Engineering" },
  { value: "ecology", label: "Ecology" },
  { value: "fashion design", label: "Fashion Design" },
  { value: "game design", label: "Game Design" },
  { value: "geology", label: "Geology" },
  { value: "hospitality management", label: "Hospitality Management" },
  { value: "industrial engineering", label: "Industrial Engineering" },
  { value: "marine biology", label: "Marine Biology" },
  { value: "neuroscience", label: "Neuroscience" },
  { value: "nursing", label: "Nursing" },
  { value: "agronomy", label: "Agronomy" },
  { value: "animation", label: "Animation" },
  { value: "astrophysics", label: "Astrophysics" },
  { value: "biomedical engineering", label: "Biomedical Engineering" },
  { value: "child development", label: "Child Development" },
  { value: "civil engineering", label: "Civil Engineering" },
  { value: "climate science", label: "Climate Science" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "dance", label: "Dance" },
  { value: "digital marketing", label: "Digital Marketing" },
  { value: "ecological economics", label: "Ecological Economics" },
  { value: "energy engineering", label: "Energy Engineering" },
  { value: "epidemiology", label: "Epidemiology" },
  { value: "forensic science", label: "Forensic Science" },
  { value: "game development", label: "Game Development" },
  { value: "genetics", label: "Genetics" },
  { value: "human resource management", label: "Human Resource Management" },
  { value: "information technology", label: "Information Technology" },
  { value: "interior design", label: "Interior Design" },
  { value: "kinesiology", label: "Kinesiology" },
  { value: "landscape architecture", label: "Landscape Architecture" },
  { value: "medical imaging", label: "Medical Imaging" },
  { value: "nanotechnology", label: "Nanotechnology" },
  { value: "occupational therapy", label: "Occupational Therapy" },
  { value: "organic chemistry", label: "Organic Chemistry" },
  { value: "petroleum engineering", label: "Petroleum Engineering" },
  { value: "photography", label: "Photography" },
  { value: "public relations", label: "Public Relations" },
  { value: "renewable energy", label: "Renewable Energy" },
  { value: "robotics", label: "Robotics" },
  { value: "sports management", label: "Sports Management" },
  { value: "sustainable design", label: "Sustainable Design" },
  {
    value: "telecommunication engineering",
    label: "Telecommunication Engineering",
  },
  { value: "theater", label: "Theater" },
  { value: "tourism management", label: "Tourism Management" },
  { value: "urban design", label: "Urban Design" },
  { value: "virology", label: "Virology" },
  { value: "wildlife conservation", label: "Wildlife Conservation" },
  { value: "youth development", label: "Youth Development" },
  { value: "aerospace engineering", label: "Aerospace Engineering" },
  { value: "bioinformatics", label: "Bioinformatics" },
  { value: "chemical engineering", label: "Chemical Engineering" },
  { value: "community health", label: "Community Health" },
  { value: "counseling psychology", label: "Counseling Psychology" },
  { value: "cryptocurrency", label: "Cryptocurrency" },
  { value: "emergency management", label: "Emergency Management" },
  { value: "environmental engineering", label: "Environmental Engineering" },
  { value: "game art", label: "Game Art" },
  { value: "human rights", label: "Human Rights" },
  { value: "information security", label: "Information Security" },
  { value: "landscape design", label: "Landscape Design" },
  { value: "medical sonography", label: "Medical Sonography" },
  { value: "nanoengineering", label: "Nanoengineering" },
  { value: "organizational psychology", label: "Organizational Psychology" },
  { value: "petrochemical engineering", label: "Petrochemical Engineering" },
  { value: "political philosophy", label: "Political Philosophy" },
  { value: "sports science", label: "Sports Science" },
  { value: "sustainability studies", label: "Sustainability Studies" },
  { value: "transportation engineering", label: "Transportation Engineering" },
  { value: "veterinary technology", label: "Veterinary Technology" },
  {
    value: "water resources engineering",
    label: "Water Resources Engineering",
  },
  { value: "zoological medicine", label: "Zoological Medicine" },
  { value: "aeronautical engineering", label: "Aeronautical Engineering" },
  { value: "agricultural engineering", label: "Agricultural Engineering" },
  { value: "agricultural science", label: "Agricultural Science" },
  { value: "air traffic management", label: "Air Traffic Management" },
  { value: "animation design", label: "Animation Design" },
  { value: "applied physics", label: "Applied Physics" },
  { value: "aquaculture", label: "Aquaculture" },
  { value: "archaeology", label: "Archaeology" },
  { value: "architectural engineering", label: "Architectural Engineering" },
  { value: "astrobiology", label: "Astrobiology" },
  { value: "behavioral economics", label: "Behavioral Economics" },
  { value: "biochemical engineering", label: "Biochemical Engineering" },
  { value: "biomechanics", label: "Biomechanics" },
  { value: "biophysics", label: "Biophysics" },
  { value: "business economics", label: "Business Economics" },
  { value: "cartography", label: "Cartography" },
  { value: "cell biology", label: "Cell Biology" },
  { value: "chemical physics", label: "Chemical Physics" },
  { value: "child psychology", label: "Child Psychology" },
  { value: "cognitive neuroscience", label: "Cognitive Neuroscience" },
  { value: "computational mathematics", label: "Computational Mathematics" },
  { value: "computational physics", label: "Computational Physics" },
  { value: "construction management", label: "Construction Management" },
  { value: "corporate finance", label: "Corporate Finance" },
  { value: "cultural anthropology", label: "Cultural Anthropology" },
  { value: "dance therapy", label: "Dance Therapy" },
  { value: "developmental psychology", label: "Developmental Psychology" },
  { value: "ecological design", label: "Ecological Design" },
  { value: "economic geography", label: "Economic Geography" },
  { value: "educational psychology", label: "Educational Psychology" },
  { value: "electrical engineering", label: "Electrical Engineering" },
  { value: "electronic engineering", label: "Electronic Engineering" },
  { value: "energy management", label: "Energy Management" },
  { value: "engineering physics", label: "Engineering Physics" },
  { value: "entomology", label: "Entomology" },
  { value: "environmental economics", label: "Environmental Economics" },
  { value: "ethnography", label: "Ethnography" },
  { value: "experimental psychology", label: "Experimental Psychology" },
  { value: "finance management", label: "Finance Management" },
  { value: "fluid mechanics", label: "Fluid Mechanics" },
  { value: "food science", label: "Food Science" },
  { value: "forestry", label: "Forestry" },
  { value: "game programming", label: "Game Programming" },
  { value: "geochemistry", label: "Geochemistry" },
  { value: "geomorphology", label: "Geomorphology" },
  { value: "healthcare management", label: "Healthcare Management" },
  { value: "human development", label: "Human Development" },
  { value: "human geography", label: "Human Geography" },
  { value: "humanities", label: "Humanities" },
  { value: "hydraulic engineering", label: "Hydraulic Engineering" },
  { value: "industrial design", label: "Industrial Design" },
  {
    value: "industrial organizational psychology",
    label: "Industrial-Organizational Psychology",
  },
  { value: "information systems", label: "Information Systems" },
  { value: "intelligence studies", label: "Intelligence Studies" },
  { value: "interior architecture", label: "Interior Architecture" },
  { value: "international business", label: "International Business" },
  { value: "international development", label: "International Development" },
  { value: "investment management", label: "Investment Management" },
  { value: "landscape ecology", label: "Landscape Ecology" },
  { value: "linguistic anthropology", label: "Linguistic Anthropology" },
  { value: "management consulting", label: "Management Consulting" },
  { value: "manufacturing engineering", label: "Manufacturing Engineering" },
  { value: "maritime engineering", label: "Maritime Engineering" },
  { value: "marketing communications", label: "Marketing Communications" },
  { value: "materials science", label: "Materials Science" },
  { value: "mechanical engineering", label: "Mechanical Engineering" },
  { value: "medical ethics", label: "Medical Ethics" },
  { value: "metallurgical engineering", label: "Metallurgical Engineering" },
  { value: "microbiology", label: "Microbiology" },
  { value: "mineralogy", label: "Mineralogy" },
  { value: "molecular biology", label: "Molecular Biology" },
  { value: "molecular genetics", label: "Molecular Genetics" },
  { value: "nanomedicine", label: "Nanomedicine" },
  {
    value: "natural resource management",
    label: "Natural Resource Management",
  },
  { value: "neurological sciences", label: "Neurological Sciences" },
  { value: "nonprofit management", label: "Nonprofit Management" },
  { value: "nuclear engineering", label: "Nuclear Engineering" },
  { value: "numerical analysis", label: "Numerical Analysis" },
  { value: "oceanography", label: "Oceanography" },
  { value: "operations management", label: "Operations Management" },
  { value: "optical engineering", label: "Optical Engineering" },
  { value: "organizational behavior", label: "Organizational Behavior" },
  { value: "paleontology", label: "Paleontology" },
  { value: "peace studies", label: "Peace Studies" },
  { value: "petroleum geology", label: "Petroleum Geology" },
  { value: "pharmacology", label: "Pharmacology" },
  { value: "physical chemistry", label: "Physical Chemistry" },
  { value: "physiological psychology", label: "Physiological Psychology" },
  { value: "plant biology", label: "Plant Biology" },
  { value: "plasma physics", label: "Plasma Physics" },
  { value: "political economy", label: "Political Economy" },
  { value: "polymer engineering", label: "Polymer Engineering" },
  { value: "process engineering", label: "Process Engineering" },
  {
    value: "public health administration",
    label: "Public Health Administration",
  },
  { value: "quantum physics", label: "Quantum Physics" },
  { value: "radiation therapy", label: "Radiation Therapy" },
  { value: "railway engineering", label: "Railway Engineering" },
  { value: "real estate management", label: "Real Estate Management" },
  { value: "rehabilitation engineering", label: "Rehabilitation Engineering" },
  { value: "resource economics", label: "Resource Economics" },
  { value: "risk management", label: "Risk Management" },
  { value: "satellite engineering", label: "Satellite Engineering" },
  { value: "science communication", label: "Science Communication" },
  { value: "semiconductor physics", label: "Semiconductor Physics" },
  { value: "social entrepreneurship", label: "Social Entrepreneurship" },
  { value: "social psychology", label: "Social Psychology" },
  { value: "software engineering", label: "Software Engineering" },
  { value: "space science", label: "Space Science" },
  { value: "speech therapy", label: "Speech Therapy" },
  { value: "sports psychology", label: "Sports Psychology" },
  { value: "structural engineering", label: "Structural Engineering" },
  { value: "supply chain management", label: "Supply Chain Management" },
  { value: "surveying engineering", label: "Surveying Engineering" },
  { value: "systems engineering", label: "Systems Engineering" },
  { value: "taxation", label: "Taxation" },
  {
    value: "telecommunications management",
    label: "Telecommunications Management",
  },
  { value: "theoretical physics", label: "Theoretical Physics" },
  { value: "thermal engineering", label: "Thermal Engineering" },
  { value: "tissue engineering", label: "Tissue Engineering" },
  { value: "toxicology", label: "Toxicology" },
  { value: "translational medicine", label: "Translational Medicine" },
  { value: "transportation planning", label: "Transportation Planning" },
  { value: "tropical ecology", label: "Tropical Ecology" },
  { value: "urban ecology", label: "Urban Ecology" },
  { value: "veterinary nursing", label: "Veterinary Nursing" },
  { value: "visual arts", label: "Visual Arts" },
  { value: "wildlife management", label: "Wildlife Management" },
];

export const jobQuestionType = [
  { value: "yes/no", label: "yes/no Answer " },
  { value: "text", label: "Text Answer" },
  { value: "voice", label: "Voice Record Answer" },
];

export const languageLevel = [
  { value: "beginner", label: "beginner" },
  { value: "intermediate", label: "intermediate" },
  { value: "fluent", label: "fluent" },
  { value: "native", label: "native" },
];

export const sizeOptions = [
  { value: "1-10", label: "1-10" },
  { value: "11-50", label: "11-50" },
  { value: "51-200", label: "51-200" },
  { value: "201-500", label: "201-500" },
  { value: "500+", label: "500+" },
];

export const careerLevel=[
  { value: "student", label: "student" },
  { value: "entry level", label: "entry level" },
  { value: "experienced/senior", label: "experienced/senior" },
  { value: "manager/lead", label: "manager/lead" },
  { value: "executive", label: "executive" },
  { value: "not specified", label: "not specified" },
]

export const convertCategoriesIntoList = (currentCategories, setState,type) => {
  if (currentCategories?.length !== 0) {
  if(type==="return__Id"){
      let categoryOptions = currentCategories?.map((cat) => ({
        value: cat.id,
        label: cat.name,
      }));
      setState(categoryOptions);

  }else{
      let categoryOptions = currentCategories?.map((cat) => ({
        value: cat.name,
        label: cat.name,
      }));
      setState(categoryOptions);
  }
  }
};

export const convertSkillsIntoList=(currentSkills,setState)=>{
  if(currentSkills?.length>0){
    let skillsOption = currentSkills?.map((skill) => ({
      value: skill.id,
      label: skill.name,
    }));
    setState(skillsOption);
  }
}

export const formatedTimeHandler = (time, setState) => {
  const currentTimestamp = new Date();
  const givenTimestamp = new Date(time);
  const timeDifference = currentTimestamp.getTime() - givenTimestamp.getTime();

  let seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(months / 12);

  if (years > 0) {
    while (months > 12) {
      months = months - 12;
      years++;
    }
    setState(years + "y ago");
  } else if (months > 0) {
    while (days > 30) {
      days = days - 30;
      months++;
    }
    setState(months + " month" + (months > 1 ? "s" : "") + " ago");
  } else if (days > 0) {
    while (hours > 24) {
      hours = hours - 24;
      days++;
    }
    setState(days + "d ago");
  } else if (hours > 0) {
    while (minutes > 60) {
      minutes = minutes - 60;
      hours++;
    }
    while (hours > 24) {
      hours = hours - 24;
      days++;
    }
    if (days > 0) {
      setState(days + "d ago");
    } else {
      setState(hours + "h ago");
    }
  } else if (minutes > 1) {
    setState(minutes + "m ago");
  } else {
    setState("Just Now");
  }
};

export const getIndustryName = (
  currentIndustries,
  industryId,
  setCompanyIndustryName
) => {
  let myIndustry = {};
  myIndustry = currentIndustries.find((industry) => industry.id === industryId);
  setCompanyIndustryName(myIndustry?.name);
};


export function calculateAge(birthdate,setState) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  setState(age);
}

export const getUserLocation = (setCurrentLocation) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};