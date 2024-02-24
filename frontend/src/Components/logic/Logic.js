export const countryChange = (e, setCountryCities) => {
  switch (e.target.value) {
    case "Egypt":
      setCountryCities([
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
      ]);
      break;
    case "UAE":
      setCountryCities([
        "Dubai",
        "Abu Dhabi",
        "Sharjah",
        "Al Ain",
        "Ajman",
        "Ras Al Khaimah",
        "Fujairah",
        "Umm Al Quwain",
      ]);
      break;
    case "SaudiArabia":
      setCountryCities([
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
      ]);
      break;
    case "Kuwait":
      setCountryCities([
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
      ]);
      break;
    default:
      setCountryCities([]);
      break;
  }
};

export const cityChange = (e, setCityAreas) => {
  switch (e.target.value) {
    //case Egypt
    case "Cairo":
      setCityAreas([
        "Nasr City",
        "Maadi",
        "Dokki",
        "Heliopolis",
        "Zamalek",
        "Mohandessin",
        "New Cairo",
      ]);
      break;
    case "Alexandria":
      setCityAreas([
        "Montaza",
        "Smouha",
        "Stanley",
        "Roshdy",
        "Sidi Gaber",
        "Miami",
        "Kafr Abdo",
      ]);
      break;
    case "Giza":
      setCityAreas([
        "Mohandessin",
        "Dokki",
        "Agouza",
        "Haram",
        "Faisal",
        "Imbaba",
        "6th of October City",
      ]);
      break;
    case "Port Said":
      setCityAreas([
        "Port Fouad",
        "Port Tawfik",
        "Al-Manakh",
        "Al-Arab",
        "Al-Ganayen",
        "Al-Zohour",
        "Al-Dawahy",
      ]);
      break;
    case "Suez":
      setCityAreas([
        "Arbaeen",
        "El-Arbaaen",
        "El-Ganayen",
        "El-Horria",
        "El-Mahata",
        "El-Montaza",
        "El-Raml",
      ]);
      break;
    case "Luxor":
      setCityAreas([
        "East Bank",
        "West Bank",
        "Karnak",
        "Al-Uqsur",
        "Al-Qarna",
        "Al-Bayadeya",
        "Al-Sahaby Island",
      ]);
      break;
    case "Aswan":
      setCityAreas([
        "Aswan City",
        "New Aswan",
        "Kom Ombo",
        "Daraw",
        "Edfu",
        "Abu Simbel",
        "Gharb Soheil",
      ]);
      break;
    case "Tanta":
      setCityAreas([
        "El-Gharbia",
        "El-Geish Street",
        "El-Riad Street",
        "El-Sayeda Zeinab",
        "El-Gezira",
        "El-Manakh",
        "El-Shaheed",
      ]);
      break;
    case "Mansoura":
      setCityAreas([
        "Mansoura City Center",
        "El-Gomhoria",
        "El-Nahda",
        "El-Mahalla",
        "El-Dawar",
        "El-Matariya",
        "El-Senbellawein",
      ]);
      break;
    case "Fayyum":
      setCityAreas([
        "Fayyum City",
        "Ihnasia",
        "Tamiya",
        "Sinnuris",
        "El-Wasta",
        "Sanhour",
        "Kom Oshim",
      ]);
      break;
    case "Ismailia":
      setCityAreas([
        "Ismailia City Center",
        "El-Qantara",
        "Fayed",
        "El-Tal El-Kabir",
        "El-Kasasin",
        "El-Saraya",
        "El-Temsah",
      ]);
      break;
    case "Minya":
      setCityAreas([
        "Minya City Center",
        "El-Minya El-Jadida",
        "El-Adwa",
        "El-Baghla",
        "El-Maghagha",
        "Samalut",
        "Beni Mazar",
      ]);
      break;
    case "Mersa Matruh":
      setCityAreas([
        "Agiba",
        "Marina",
        "Romel",
        "Dabaa",
        "El Alamein",
        "El Negila",
        "Sidi Abdel Rahman",
      ]);
      break;
    case "New Valley":
      setCityAreas([
        "Al Kharga Oasis",
        "Dakhla Oasis",
        "Farafra Oasis",
        "Baris Oasis",
        "Bashandi Oasis",
        "Mut Oasis",
        "Balat Oasis",
      ]);
      break;
    case "Mit Ghamr":
      setCityAreas([
        "Mit Ghamr Center",
        "Al Hamool",
        "Al-Masara",
        "Al-Majd",
        "Al-Mahalat",
        "Al-Waqad",
        "Al-Manshiya",
      ]);
      break;
    case "North Sinai":
      setCityAreas([
        "Arish City Center",
        "Sheikh Zuweid",
        "Rafah",
        "Al-Arish Port",
        "Al-Midan",
        "Al-Masoura",
        "Al-Mokata'a",
      ]);
      break;
    case "South Sinai":
      setCityAreas([
        "Sharm El Sheikh City Center",
        "Naama Bay",
        "Ras Um Sid",
        "Nabq Bay",
        "Hadaba",
        "Old Market Area",
        "Montazah",
      ]);
      break;
    case "Qena":
      setCityAreas([
        "Qena City Center",
        "Nag Hammadi",
        "Luxor Street",
        "Al-Waqf",
        "Al-Ba'irat",
        "Al-Mayyah",
        "Al-Ja'fara",
      ]);
      break;
    case "Monufia":
      setCityAreas([
        "Shibin El Kom City Center",
        "Quisna",
        "Ashmoun",
        "Sers El-Lyan",
        "Al-Shohadaa",
        "Tala",
        "Menouf",
      ]);
      break;
    case "Sohag":
      setCityAreas([
        "Sohag City Center",
        "Akhmim",
        "Girga",
        "Tima",
        "Tahta",
        "Dar El Salam",
        "Gerga",
      ]);
      break;
    case "Banha":
      setCityAreas([
        "Banha City Center",
        "Shebin El Qanater",
        "Qalyub",
        "Qaha",
        "Kafr Shukr",
        "Shobra",
        "Kom Hamada",
      ]);
      break;
    case "Kafr el-Sheikh":
      setCityAreas([
        "Kafr El-Sheikh City Center",
        "Desouk",
        "Baltim",
        "Metoubes",
        "Fuwwah",
        "Sidi Salem",
        "Qellin",
      ]);
      break;
    case "Qalyubia":
      setCityAreas([
        "Banha City Center",
        "Shebin El Qanater",
        "Qalyub",
        "Qaha",
        "Kafr Shukr",
        "Shobra",
        "Kom Hamada",
      ]);
      break;
    case "Dakahlia":
      setCityAreas([
        "Mansoura City Center",
        "Talkha",
        "Mit Ghamr",
        "Aga",
        "Mit Salsil",
        "Sherbin",
        "Belqas",
      ]);
      break;
    case "Beni Suef":
      setCityAreas([
        "Beni Suef City Center",
        "El Fashn",
        "Biba",
        "Nasser",
        "El Wasty",
        "Biba",
        "Beni Mazar",
      ]);
      break;
    case "Sharqia":
      setCityAreas([
        "Zagazig City Center",
        "Abu Hammad",
        "Zakazik El Gedida",
        "Al-Ibrahimiyah",
        "Bilbeis",
        "Hehia",
        "Husseiniya",
      ]);
      break;

    // case UAE
    case "Dubai":
      setCityAreas([
        "Downtown Dubai",
        "Jumeirah",
        "Dubai Marina",
        "Business Bay",
        "Palm Jumeirah",
        "Deira",
        "Al Barsha",
      ]);
      break;

    case "Abu Dhabi":
      setCityAreas([
        "Downtown Abu Dhabi",
        "Al Reem Island",
        "Khalifa City",
        "Corniche",
        "Yas Island",
        "Mussafah",
        "Saadiyat Island",
      ]);
      break;

    case "Sharjah":
      setCityAreas([
        "Al Majaz",
        "Al Nahda",
        "Al Qasimia",
        "Al Khan",
        "Al Taawun",
        "Maysaloon",
        "Muwaileh",
      ]);
      break;

    case "Al Ain":
      setCityAreas([
        "Al Jimi",
        "Al Muwaiji",
        "Al Towayya",
        "Al Maqam",
        "Zakher",
        "Asharej",
        "Hili",
      ]);
      break;

    case "Ajman":
      setCityAreas([
        "Ajman Downtown",
        "Al Jurf",
        "Al Nuaimia",
        "Al Rawda",
        "Al Mowaihat",
        "Al Zahra",
        "Al Rashidiya",
      ]);
      break;

    case "Ras Al Khaimah":
      setCityAreas([
        "Al Nakheel",
        "Al Hamra",
        "Mina Al Arab",
        "Rams",
        "Dafan Al Nakheel",
        "Corniche",
        "Al Jazeera Al Hamra",
      ]);
      break;

    case "Fujairah":
      setCityAreas([
        "Fujairah City Center",
        "Al Faseel",
        "Al Qalaa",
        "Al Fahlain",
        "Al Gurf",
        "Sakamkam",
        "Dibba",
      ]);
      break;

    case "Umm Al Quwain":
      setCityAreas([
        "Umm Al Quwain City Center",
        "Al Salama",
        "Al Haditha",
        "Al Riqqah",
        "Bassinah",
        "Falaj Al Mualla",
        "Mistal",
      ]);
      break;

    //case Saudi Arabia
    case "Riyadh":
      setCityAreas([
        "Al Olaya",
        "King Abdullah Financial District",
        "Al Malaz",
        "Al Sulimaniah",
        "Al Murabba",
        "Al Wadi",
        "Al Yarmouk",
      ]);
      break;

    case "Jeddah":
      setCityAreas([
        "Al Balad",
        "Al Rawdah",
        "Al Hamraa",
        "Al Khalidiyyah",
        "Ash Shati",
        "Al Aziziyah",
        "Al Nahda",
      ]);
      break;

    case "Mecca":
      setCityAreas([
        "Al Haram",
        "Ajyad",
        "Aziziyah",
        "Al Kakiyah",
        "Al Naseem",
        "Al Misfalah",
        "Al Aziziyah",
      ]);
      break;

    case "Medina":
      setCityAreas([
        "Al Haram",
        "Al Qiblatain",
        "Al Ansar",
        "Al Noor",
        "Al Faisaliyah",
        "Bani Quraiza",
        "Al Arid",
      ]);
      break;

    case "Dammam":
      setCityAreas([
        "Al Faisaliyah",
        "Al Shati",
        "An Nuzhah",
        "Al Olaya",
        "Al Khobar Corniche",
        "King Fahd Park",
        "Al Rakah",
      ]);
      break;

    case "Tabuk":
      setCityAreas([
        "Al Qadsiyah",
        "Al Hadidah",
        "Al Andalus",
        "Al Madina",
        "Al Khaleej",
        "Al Waha",
        "King Fahd District",
      ]);
      break;

    case "Buraidah":
      setCityAreas([
        "Al Baladiyah",
        "Al Khaleej",
        "King Abdullah Sport City",
        "Al Nakheel",
        "Al Olaya",
        "King Abdulaziz Historical Center",
        "Al Malaz",
      ]);
      break;

    case "Khobar":
      setCityAreas([
        "Al Khobar Corniche",
        "Thuqbah",
        "Aziziyah",
        "Al Ulaya",
        "Rakah",
        "Al Bandariyah",
        "Half Moon Bay",
      ]);
      break;

    case "Abha":
      setCityAreas([
        "Al Soodah Park",
        "Al Salam",
        "Al Mansak",
        "Asir National Park",
        "Khamis Mushait",
        "Majardah",
        "Abha Dam",
      ]);
      break;

    case "Taif":
      setCityAreas([
        "Al Shifa",
        "Al Hada",
        "Shubra Palace",
        "King Fahd Garden",
        "Ar Ruddaf Park",
        "Al Kar Tourist Village",
        "Al Muhandiseen",
      ]);
      break;

    case "Khamis Mushait":
      setCityAreas([
        "Asir University",
        "Al Gahwa",
        "Al Thagher",
        "King Fahd Park",
        "Asir Mall",
        "Al Jawazat",
        "Abha Road",
      ]);
      break;

    case "Hail":
      setCityAreas([
        "Al Barzan Palace",
        "Al Qishlah Park",
        "Hail Park",
        "Aja Mountain",
        "Aja Palace",
        "King Fahd Garden",
        "Al Ekresh",
      ]);
      break;

    case "Najran":
      setCityAreas([
        "Al Ukhdood Archaeological Site",
        "Al Malaf Park",
        "Al Qara Mountain",
        "Al Fawar Park",
        "Al Uyun Park",
        "Najran Dam",
        "Al Hudud",
      ]);
      break;

    case "Yanbu":
      setCityAreas([
        "Yanbu Corniche",
        "Royal Commission",
        "Yanbu Industrial City",
        "Al Majdoul",
        "Al Sharm",
        "Yanbu Commercial Port",
        "Al Barr Garden",
      ]);
      break;

    case "Al Qatif":
      setCityAreas([
        "Al Rashid Mall",
        "Al Qatif Corniche",
        "Al Safwa Park",
        "Al Khobar Corniche",
        "Al Jisr Park",
        "Al Zahran",
        "Al Ahsa Street",
      ]);
      break;

    case "Jubail":
      setCityAreas([
        "Jubail Industrial City",
        "Jubail Corniche",
        "Royal Commission",
        "Jubail Commercial Port",
        "King Fahd Industrial Port",
        "Al Fanateer Corniche",
        "Al Huwailat",
      ]);
      break;

    case "Al-Kharj":
      setCityAreas([
        "Al Kharj City Center",
        "Al Kharj Corniche",
        "Prince Sultan Air Base",
        "King Abdulaziz Road",
        "Al Zulfi Road",
        "Al Wasl",
        "Al Faris",
      ]);
      break;

    case "Qurayyat":
      setCityAreas([
        "Qurayyat City Center",
        "Al Sari",
        "Al Qasr",
        "Al Iskan",
        "Al Wahba",
        "Al Ahsa Road",
        "Al Majmaah",
      ]);
      break;

    case "Ahsa":
      setCityAreas([
        "Al Hofuf",
        "Al Mubarraz",
        "Al Hada",
        "Al Jawazat",
        "Al Ulaya",
        "Al Sarar",
        "Al Moudif",
      ]);
      break;

    case "Dhahran":
      setCityAreas([
        "Dhahran City Center",
        "King Fahd University",
        "Aramco Residential Camp",
        "Prince Saud Bin Naif Park",
        "Al Shatea Mall",
        "Al Rashid Mall",
        "King Fahd Park",
      ]);
      break;

    //case Kuwait
    case "Kuwait City":
      setCityAreas([
        "Sharq",
        "Mirqab",
        "Kuwait Towers",
        "Dasman",
        "Shamiya",
        "Qibla",
        "Jaber Al-Ahmad Cultural Centre",
      ]);
      break;

    case "Al Ahmadi":
      setCityAreas([
        "Ahmadi City Center",
        "Riqqah",
        "Fahaheel",
        "Mangaf",
        "Ahmadi Industrial Area",
        "Abu Halifa",
        "Sabah Al Salem",
      ]);
      break;

    case "Hawalli":
      setCityAreas([
        "Hawalli City Center",
        "Mishref",
        "Jabriya",
        "Mubarak Al Kabeer",
        "Salwa",
        "Bayan",
        "Salmiya",
      ]);
      break;

    case "Salmiya":
      setCityAreas([
        "Salmiya City Center",
        "Salmiya Corniche",
        "Marina Mall",
        "Salmiya Park",
        "Salem Al Mubarak Street",
        "Olympia Mall",
        "Marina Crescent",
      ]);
      break;

    case "Al Farwaniyah":
      setCityAreas([
        "Farwaniya City Center",
        "Abbasiya",
        "Al-Rai",
        "Khaitan",
        "Ishbiliya",
        "Jleeb Al-Shuyoukh",
        "Riggae",
      ]);
      break;

    case "Fahaheel":
      setCityAreas([
        "Fahaheel City Center",
        "Mangaf",
        "Abu Halifa",
        "Fintas",
        "Mahboula",
        "Mubarak Al Kabeer",
        "Ahmadi",
      ]);
      break;

    case "Jahra":
      setCityAreas([
        "Jahra City Center",
        "Naeem",
        "Qasr",
        "Sulaibikhat",
        "Amghara",
        "Jahra Industrial Area",
        "Abdali",
      ]);
      break;

    case "Al Shuwaikh":
      setCityAreas([
        "Shuwaikh City Center",
        "Shuwaikh Industrial Area",
        "Al-Rai",
        "Shuwaikh Port",
        "Shuwaikh Free Trade Zone",
        "Dajeej",
        "Al-Rai Exhibition & Convention Center",
      ]);
      break;

    case "Sabah as Salim":
      setCityAreas([
        "Sabah as Salim City Center",
        "Sabah as Salim Industrial Area",
        "South Sabah as Salim",
        "North Sabah as Salim",
        "East Sabah as Salim",
        "West Sabah as Salim",
        "Julaiaa",
      ]);
      break;

    case "Salwa":
      setCityAreas([
        "Salwa City Center",
        "Mubarak Al Kabeer",
        "Jaber Al Ahmad",
        "South Salwa",
        "North Salwa",
        "East Salwa",
        "West Salwa",
      ]);
      break;

    case "Al Jahra":
      setCityAreas([
        "Al Jahra City Center",
        "Naseem",
        "Taima",
        "Qasr",
        "Mutlaa",
        "Waha",
        "Sulaibiya",
      ]);
      break;

    default:
      setCityAreas([]);
      break;
  }
};
