import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

let divNames = [
    {
        "id": "242",
        "area_name": "DAUDNAGAR"
    },
    {
        "id": "121",
        "area_name": "unKnown"
    },
    {
        "id": "215",
        "area_name": "MASAURHI"
    },
    {
        "id": "230",
        "area_name": "AURANGABAD"
    },
    {
        "id": "233",
        "area_name": "BHAGALPUR(U)"
    },
    {
        "id": "244",
        "area_name": "MANPUR"
    },
    {
        "id": "227",
        "area_name": "GAYA(R)"
    },
    {
        "id": "235",
        "area_name": "BANKA"
    },
    {
        "id": "239",
        "area_name": "JAMUI"
    },
    {
        "id": "245",
        "area_name": "AMARPUR"
    },
    {
        "id": "218",
        "area_name": "BUXAR"
    },
    {
        "id": "246",
        "area_name": "RAJAULI"
    },
    {
        "id": "243",
        "area_name": "NAUGACHIA"
    },
    {
        "id": "229",
        "area_name": "SHERGHATI"
    },
    {
        "id": "226",
        "area_name": "GAYA(U)"
    },
    {
        "id": "217",
        "area_name": "ARRAH"
    },
    {
        "id": "213",
        "area_name": "BARH"
    },
    {
        "id": "201",
        "area_name": "PATNACITY"
    },
    {
        "id": "203",
        "area_name": "RAJENDRANAGAR"
    },
    {
        "id": "205",
        "area_name": "KANKARBAGH(2)"
    },
    {
        "id": "206",
        "area_name": "GULZARBAGH"
    },
    {
        "id": "208",
        "area_name": "PATLIPUTRA"
    },
    {
        "id": "211",
        "area_name": "DANAPUR"
    },
    {
        "id": "212",
        "area_name": "BIHTA"
    },
    {
        "id": "219",
        "area_name": "BIHARSARIF"
    },
    {
        "id": "220",
        "area_name": "RAJGIR"
    },
    {
        "id": "223",
        "area_name": "SASARAM"
    },
    {
        "id": "231",
        "area_name": "JAHANABAD"
    },
    {
        "id": "234",
        "area_name": "BHAGALPUR(E)"
    },
    {
        "id": "236",
        "area_name": "MUNGER"
    },
    {
        "id": "207",
        "area_name": "NEW CAPITAL"
    },
    {
        "id": "209",
        "area_name": "DAKBUNGLOW"
    },
    {
        "id": "214",
        "area_name": "FATUHA"
    },
    {
        "id": "216",
        "area_name": "PATNA"
    },
    {
        "id": "222",
        "area_name": "NAWADA"
    },
    {
        "id": "204",
        "area_name": "KANKARBAGH(1)"
    },
    {
        "id": "221",
        "area_name": "EKANGARSARAI"
    },
    {
        "id": "237",
        "area_name": "LAKHISARAI"
    },
    {
        "id": "202",
        "area_name": "BANKIPUR"
    },
    {
        "id": "232",
        "area_name": "ARWAL"
    },
    {
        "id": "241",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "225",
        "area_name": "BHABHUA"
    },
    {
        "id": "210",
        "area_name": "GARDANIBAGH"
    },
    {
        "id": "238",
        "area_name": "SHEIKHPURA"
    },
    {
        "id": "224",
        "area_name": "DEHRIONSONE"
    },
    {
        "id": "240",
        "area_name": "KHAGAUL"
    },
    {
        "id": "200",
        "area_name": "ASHIYANA"
    },
    {
        "id": "228",
        "area_name": "BIHARSARIF(U)"
    },
    {
        "id": "101",
        "area_name": "PURNEA"
    },
    {
        "id": "102",
        "area_name": "KATIHAR"
    },
    {
        "id": "103",
        "area_name": "KISHANGANJ"
    },
    {
        "id": "104",
        "area_name": "FORBISGANJ"
    },
    {
        "id": "105",
        "area_name": "SAHARSA"
    },
    {
        "id": "106",
        "area_name": "SUPAUL"
    },
    {
        "id": "107",
        "area_name": "MADHEPURA"
    },
    {
        "id": "108",
        "area_name": "KHAGARIA"
    },
    {
        "id": "110",
        "area_name": "DARBHANGA(R)"
    },
    {
        "id": "111",
        "area_name": "MADHUBANI"
    },
    {
        "id": "112",
        "area_name": "JHANJHARPUR"
    },
    {
        "id": "113",
        "area_name": "SAMASTIPUR"
    },
    {
        "id": "114",
        "area_name": "ROSERA"
    },
    {
        "id": "115",
        "area_name": "DALSINGSARAI"
    },
    {
        "id": "116",
        "area_name": "BARAUNI"
    },
    {
        "id": "117",
        "area_name": "BEGUSARAI"
    },
    {
        "id": "118",
        "area_name": "MUZAFFARPUR(U-I)"
    },
    {
        "id": "119",
        "area_name": "MUZAFFARPUR(E)"
    },
    {
        "id": "120",
        "area_name": "MUZAFFARPUR(W)"
    },
    {
        "id": "121",
        "area_name": "HAZIPUR"
    },
    {
        "id": "122",
        "area_name": "SITAMARHI"
    },
    {
        "id": "123",
        "area_name": "SHEOHAR"
    },
    {
        "id": "124",
        "area_name": "CHAPRA(W)"
    },
    {
        "id": "125",
        "area_name": "CHAPRA(E)"
    },
    {
        "id": "126",
        "area_name": "GOPALGANJ"
    },
    {
        "id": "127",
        "area_name": "SIWAN"
    },
    {
        "id": "128",
        "area_name": "MOTIHARI"
    },
    {
        "id": "129",
        "area_name": "RAXAUL"
    },
    {
        "id": "130",
        "area_name": "BETTIAH"
    },
    {
        "id": "131",
        "area_name": "PURNEA (EAST)"
    },
    {
        "id": "132",
        "area_name": "BAGHA"
    },
    {
        "id": "133",
        "area_name": "MAHUA"
    },
    {
        "id": "134",
        "area_name": "MUZAFFARPUR(U-II)"
    },
    {
        "id": "135",
        "area_name": "BENIPUR"
    },
    {
        "id": "136",
        "area_name": "JAINAGAR"
    },
    {
        "id": "137",
        "area_name": "SIMRI BAKHTIYARPUR"
    },
    {
        "id": "138",
        "area_name": "RAGHOPUR"
    },
    {
        "id": "139",
        "area_name": "UDAKISHANGANJ"
    },
    {
        "id": "140",
        "area_name": "PUPRI"
    },
    {
        "id": "141",
        "area_name": "CHAKIA"
    },
    {
        "id": "142",
        "area_name": "MIRGANJ"
    },
    {
        "id": "143",
        "area_name": "MAHARAJGANJ"
    },
    {
        "id": "144",
        "area_name": "BARSOI"
    },
    {
        "id": "145",
        "area_name": "BAHADURGANJ"
    },
    {
        "id": "146",
        "area_name": "ARARIA"
    }
]

let subDivNames = [
    {
        "id": "2423",
        "area_name": "RAFIGANJ"
    },
    {
        "id": "2152",
        "area_name": "PUNPUN"
    },
    {
        "id": "2422",
        "area_name": "GOH"
    },
    {
        "id": "2302",
        "area_name": "BARUN"
    },
    {
        "id": "2421",
        "area_name": "DAUDNAGAR"
    },
    {
        "id": "2331",
        "area_name": "SULTANGANJ"
    },
    {
        "id": "2307",
        "area_name": "DEO"
    },
    {
        "id": "2441",
        "area_name": "MANPUR"
    },
    {
        "id": "2271",
        "area_name": "TEKARI"
    },
    {
        "id": "2351",
        "area_name": "BANKA"
    },
    {
        "id": "2391",
        "area_name": "JAMUI"
    },
    {
        "id": "2451",
        "area_name": "AMARPUR"
    },
    {
        "id": "2452",
        "area_name": "RAJAUN"
    },
    {
        "id": "2185",
        "area_name": "KORAN SARAI"
    },
    {
        "id": "2461",
        "area_name": "RAJAULI"
    },
    {
        "id": "2431",
        "area_name": "NAUGACHIA"
    },
    {
        "id": "2443",
        "area_name": "KHIZARSARAI"
    },
    {
        "id": "2352",
        "area_name": "KATORIYA"
    },
    {
        "id": "2394",
        "area_name": "GIDDHAUR"
    },
    {
        "id": "2292",
        "area_name": "IMAMGANJ"
    },
    {
        "id": "2184",
        "area_name": "ITARHI"
    },
    {
        "id": "2183",
        "area_name": "DUMARO"
    },
    {
        "id": "2336",
        "area_name": "MUZAHIDPUR"
    },
    {
        "id": "2264",
        "area_name": "BODHGAYA"
    },
    {
        "id": "2293",
        "area_name": "DOBHI"
    },
    {
        "id": "2182",
        "area_name": "BUXAR(R)"
    },
    {
        "id": "2173",
        "area_name": "ARA(R)"
    },
    {
        "id": "2174",
        "area_name": "PIRO"
    },
    {
        "id": "2131",
        "area_name": "BARH"
    },
    {
        "id": "2133",
        "area_name": "MOKAMA"
    },
    {
        "id": "2132",
        "area_name": "BAKHTIYARPUR"
    },
    {
        "id": "2012",
        "area_name": "KATRA"
    },
    {
        "id": "2013",
        "area_name": "MAHRUFGANJ"
    },
    {
        "id": "2031",
        "area_name": "RAJENDRA NAGAR"
    },
    {
        "id": "2051",
        "area_name": "#N/A"
    },
    {
        "id": "2062",
        "area_name": "MEENA BAZAR"
    },
    {
        "id": "2083",
        "area_name": "SADAKAT ASHRAM"
    },
    {
        "id": "2111",
        "area_name": "DANAPUR"
    },
    {
        "id": "2121",
        "area_name": "BIHTA"
    },
    {
        "id": "2122",
        "area_name": "MANER"
    },
    {
        "id": "2123",
        "area_name": "BIKRAM"
    },
    {
        "id": "2194",
        "area_name": "CHANDI"
    },
    {
        "id": "2195",
        "area_name": "ASTHAWAN"
    },
    {
        "id": "2201",
        "area_name": "RAJGIR"
    },
    {
        "id": "2237",
        "area_name": "KOCHAS"
    },
    {
        "id": "2261",
        "area_name": "POWER HOUSE"
    },
    {
        "id": "2262",
        "area_name": "GOLPATHAR"
    },
    {
        "id": "2273",
        "area_name": "MANPUR"
    },
    {
        "id": "2311",
        "area_name": "JEHANABAD"
    },
    {
        "id": "2332",
        "area_name": "TILKAMANJHI"
    },
    {
        "id": "2344",
        "area_name": "KAHALGAON"
    },
    {
        "id": "2365",
        "area_name": "TARAPUR"
    },
    {
        "id": "2052",
        "area_name": "GOPALPUR"
    },
    {
        "id": "2071",
        "area_name": "NEW CAPITAL"
    },
    {
        "id": "2085",
        "area_name": "S.K.PURI"
    },
    {
        "id": "2092",
        "area_name": "KADAMKUAN"
    },
    {
        "id": "2124",
        "area_name": "PALIGANJ"
    },
    {
        "id": "2141",
        "area_name": "FATUHA"
    },
    {
        "id": "2162",
        "area_name": "NAUBATPUR"
    },
    {
        "id": "2175",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "2191",
        "area_name": "BIHARSHARIF(U1)"
    },
    {
        "id": "2202",
        "area_name": "NALANDA"
    },
    {
        "id": "2221",
        "area_name": "NAWADA"
    },
    {
        "id": "2222",
        "area_name": "RAJAULI"
    },
    {
        "id": "2223",
        "area_name": "WARSALIGANJ"
    },
    {
        "id": "2235",
        "area_name": "SASARAM(R)"
    },
    {
        "id": "2236",
        "area_name": "BIKRAMGANJ"
    },
    {
        "id": "2263",
        "area_name": "CHANDCHAURA"
    },
    {
        "id": "2291",
        "area_name": "SHERGHATI"
    },
    {
        "id": "2312",
        "area_name": "MAKDUMPUR"
    },
    {
        "id": "2041",
        "area_name": "KARBIGAHIYA"
    },
    {
        "id": "2043",
        "area_name": "KANKARBAGH"
    },
    {
        "id": "2091",
        "area_name": "MAURYA LOK"
    },
    {
        "id": "2112",
        "area_name": "KHAGAUL"
    },
    {
        "id": "2161",
        "area_name": "BHUSAULA"
    },
    {
        "id": "2172",
        "area_name": "ARA(U2)"
    },
    {
        "id": "2213",
        "area_name": "HILSA"
    },
    {
        "id": "2272",
        "area_name": "GAYA(R)"
    },
    {
        "id": "2301",
        "area_name": "AURANGABAD"
    },
    {
        "id": "2303",
        "area_name": "DAUDNAGAR"
    },
    {
        "id": "2333",
        "area_name": "NATHNAGAR"
    },
    {
        "id": "2342",
        "area_name": "ALGANJ"
    },
    {
        "id": "2363",
        "area_name": "MUNGER"
    },
    {
        "id": "2364",
        "area_name": "JAMALPUR"
    },
    {
        "id": "2181",
        "area_name": "BUXAR(U)"
    },
    {
        "id": "2192",
        "area_name": "BIHARSHARIF(U2)"
    },
    {
        "id": "2193",
        "area_name": "BIHARSHARIF(R)"
    },
    {
        "id": "2234",
        "area_name": "SASARAM(U)"
    },
    {
        "id": "2304",
        "area_name": "GOH"
    },
    {
        "id": "2373",
        "area_name": "BARAHIYA"
    },
    {
        "id": "2022",
        "area_name": "UNIVERSITY"
    },
    {
        "id": "2072",
        "area_name": "BOARD COLONY"
    },
    {
        "id": "2113",
        "area_name": "DIGHA"
    },
    {
        "id": "2134",
        "area_name": "HATHIDAH"
    },
    {
        "id": "2171",
        "area_name": "ARA(U1)"
    },
    {
        "id": "2306",
        "area_name": "RAFIGANJ"
    },
    {
        "id": "2323",
        "area_name": "ARWAL"
    },
    {
        "id": "2442",
        "area_name": "WAZIRGANJ"
    },
    {
        "id": "2224",
        "area_name": "PAKRIBARAWAN"
    },
    {
        "id": "2411",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "2176",
        "area_name": "KOILWAR"
    },
    {
        "id": "2341",
        "area_name": "NAUGACHIA"
    },
    {
        "id": "2251",
        "area_name": "BHABUA(R)"
    },
    {
        "id": "2412",
        "area_name": "PIRO"
    },
    {
        "id": "2432",
        "area_name": "BIHPUR"
    },
    {
        "id": "2196",
        "area_name": "BIHARSHARIF(R2)"
    },
    {
        "id": "2255",
        "area_name": "BHABHUA(U)"
    },
    {
        "id": "2462",
        "area_name": "HISUA"
    },
    {
        "id": "2305",
        "area_name": "NAVINAGAR"
    },
    {
        "id": "2345",
        "area_name": "VIKRAMSHILA"
    },
    {
        "id": "2367",
        "area_name": "KHARAGPUR"
    },
    {
        "id": "2011",
        "area_name": "CHOWK"
    },
    {
        "id": "2021",
        "area_name": "BANKIPUR"
    },
    {
        "id": "2032",
        "area_name": "MACHHUA TOLI"
    },
    {
        "id": "2042",
        "area_name": "BAHADURPUR"
    },
    {
        "id": "2101",
        "area_name": "GARDANIBAGH"
    },
    {
        "id": "2102",
        "area_name": "JAKKANPUR"
    },
    {
        "id": "2142",
        "area_name": "DEEDARGANJ"
    },
    {
        "id": "2211",
        "area_name": "EKANGARSARAI"
    },
    {
        "id": "2061",
        "area_name": "GAIGHAT"
    },
    {
        "id": "2151",
        "area_name": "MASAURHI"
    },
    {
        "id": "2212",
        "area_name": "ISLAMPUR"
    },
    {
        "id": "2372",
        "area_name": "SURAJGARAHA"
    },
    {
        "id": "2084",
        "area_name": "PATLIPUTRA"
    },
    {
        "id": "2413",
        "area_name": "GARHANI"
    },
    {
        "id": "2392",
        "area_name": "JHAJHA"
    },
    {
        "id": "2371",
        "area_name": "LAKHISARAI"
    },
    {
        "id": "2381",
        "area_name": "SHEIKHPURA"
    },
    {
        "id": "2241",
        "area_name": "DEHRI(1)"
    },
    {
        "id": "2242",
        "area_name": "DEHRI(2)"
    },
    {
        "id": "2243",
        "area_name": "NASRIGANJ"
    },
    {
        "id": "2252",
        "area_name": "MOHANIA"
    },
    {
        "id": "2253",
        "area_name": "KUDRA"
    },
    {
        "id": "2254",
        "area_name": "RAMGARH"
    },
    {
        "id": "2343",
        "area_name": "SULTANJGANJ"
    },
    {
        "id": "2382",
        "area_name": "BARBIGHA"
    },
    {
        "id": "2393",
        "area_name": "SIKANDRA"
    },
    {
        "id": "2401",
        "area_name": "KHAGAUL"
    },
    {
        "id": "2402",
        "area_name": "PHULWARISHARIF"
    },
    {
        "id": "2053",
        "area_name": "R.K.NAGAR"
    },
    {
        "id": "2002",
        "area_name": "KHAJPURA"
    },
    {
        "id": "2281",
        "area_name": "BIHARSARIF(U1)"
    },
    {
        "id": "2001",
        "area_name": "ASHIYANA"
    },
    {
        "id": "2282",
        "area_name": "BIHARSARIF(U2)"
    },
    {
        "id": "1014",
        "area_name": "BANMANKHI"
    },
    {
        "id": "1015",
        "area_name": "DHAMDAHA"
    },
    {
        "id": "1016",
        "area_name": "KRITYANAND NAGAR"
    },
    {
        "id": "1022",
        "area_name": "KATIHAR(R)"
    },
    {
        "id": "1024",
        "area_name": "KORHA"
    },
    {
        "id": "1025",
        "area_name": "MANIHARI"
    },
    {
        "id": "1031",
        "area_name": "KISHANGANJ"
    },
    {
        "id": "1034",
        "area_name": "KOCHDHAMA"
    },
    {
        "id": "1042",
        "area_name": "FORBESGANJ"
    },
    {
        "id": "1052",
        "area_name": "SAHARSA(R)"
    },
    {
        "id": "1054",
        "area_name": "SAUR BAZAR"
    },
    {
        "id": "1061",
        "area_name": "SUPAUL"
    },
    {
        "id": "1062",
        "area_name": "TRIVENIGANJ"
    },
    {
        "id": "1071",
        "area_name": "MADHEPURA"
    },
    {
        "id": "1073",
        "area_name": "SINGHESWAR"
    },
    {
        "id": "1074",
        "area_name": "MURALIGANJ"
    },
    {
        "id": "1082",
        "area_name": "KHAGARIA(R)"
    },
    {
        "id": "1083",
        "area_name": "GOGRI"
    },
    {
        "id": "1084",
        "area_name": "MANSI"
    },
    {
        "id": "1101",
        "area_name": "DARBHANGA(R)"
    },
    {
        "id": "1105",
        "area_name": "SINGHWARA"
    },
    {
        "id": "1106",
        "area_name": "BAHADURPUR"
    },
    {
        "id": "1107",
        "area_name": "BAHERI"
    },
    {
        "id": "1111",
        "area_name": "MADHUBANI"
    },
    {
        "id": "1112",
        "area_name": "BENIPATTI"
    },
    {
        "id": "1114",
        "area_name": "BISFI"
    },
    {
        "id": "1115",
        "area_name": "PANDAUL"
    },
    {
        "id": "1121",
        "area_name": "JAHANJHARPUR"
    },
    {
        "id": "1122",
        "area_name": "PHULPARAS"
    },
    {
        "id": "1123",
        "area_name": "MADHEPUR"
    },
    {
        "id": "1132",
        "area_name": "SAMASTIPUR(R)"
    },
    {
        "id": "1133",
        "area_name": "KALYANPUR"
    },
    {
        "id": "1134",
        "area_name": "PUSA"
    },
    {
        "id": "1141",
        "area_name": "ROSRA"
    },
    {
        "id": "1142",
        "area_name": "BIBHUTIPUR"
    },
    {
        "id": "1151",
        "area_name": "DALSINGHSARAI"
    },
    {
        "id": "1152",
        "area_name": "MOHIUDDINAGAR"
    },
    {
        "id": "1153",
        "area_name": "SARAIRANJAN"
    },
    {
        "id": "1161",
        "area_name": "BARAUNI"
    },
    {
        "id": "1162",
        "area_name": "BACHHWARA"
    },
    {
        "id": "1163",
        "area_name": "BHAGWANPUR"
    },
    {
        "id": "1171",
        "area_name": "BEGUSARAI"
    },
    {
        "id": "1172",
        "area_name": "MAJHAUL"
    },
    {
        "id": "1173",
        "area_name": "BALIA"
    },
    {
        "id": "1174",
        "area_name": "BEGUSARAI_RURAL"
    },
    {
        "id": "1181",
        "area_name": "MARIPUR"
    },
    {
        "id": "1182",
        "area_name": "SARAIYAGANJ"
    },
    {
        "id": "1183",
        "area_name": "KALYANI"
    },
    {
        "id": "1184",
        "area_name": "MIT"
    },
    {
        "id": "1191",
        "area_name": "MUJJAFARPUR(E)"
    },
    {
        "id": "1192",
        "area_name": "SAKRA"
    },
    {
        "id": "1193",
        "area_name": "DHOLI_NEW"
    },
    {
        "id": "1202",
        "area_name": "MOTIPUR"
    },
    {
        "id": "1203",
        "area_name": "SARAIYA"
    },
    {
        "id": "1204",
        "area_name": "MUJJAFARPUR(W)"
    },
    {
        "id": "1213",
        "area_name": "MAHNAR"
    },
    {
        "id": "1214",
        "area_name": "BIDUPUR"
    },
    {
        "id": "1216",
        "area_name": "HAJIPUR_RURAL"
    },
    {
        "id": "1217",
        "area_name": "JANDAHA"
    },
    {
        "id": "1221",
        "area_name": "SITAMARHI"
    },
    {
        "id": "1223",
        "area_name": "BERGANIYA"
    },
    {
        "id": "1224",
        "area_name": "RUNNI SAIDPUR"
    },
    {
        "id": "1226",
        "area_name": "REEGA"
    },
    {
        "id": "1231",
        "area_name": "SHEOHAR"
    },
    {
        "id": "1242",
        "area_name": "CHAPRA(R)"
    },
    {
        "id": "1243",
        "area_name": "BANIYAPUR"
    },
    {
        "id": "1244",
        "area_name": "EKMA"
    },
    {
        "id": "1251",
        "area_name": "MARHAUWARA"
    },
    {
        "id": "1252",
        "area_name": "SONPUR"
    },
    {
        "id": "1253",
        "area_name": "SHITALPUR"
    },
    {
        "id": "1261",
        "area_name": "GOPALGANJ"
    },
    {
        "id": "1264",
        "area_name": "BARAULI"
    },
    {
        "id": "1272",
        "area_name": "SIWAN(R)"
    },
    {
        "id": "1273",
        "area_name": "MAIRWA"
    },
    {
        "id": "1275",
        "area_name": "RAGHUNATHPUR"
    },
    {
        "id": "1281",
        "area_name": "MOTIHARI"
    },
    {
        "id": "1284",
        "area_name": "DHAKA_NEW"
    },
    {
        "id": "1291",
        "area_name": "RAXAUL"
    },
    {
        "id": "1292",
        "area_name": "GHORASAHAN"
    },
    {
        "id": "1301",
        "area_name": "BETTIAH"
    },
    {
        "id": "1302",
        "area_name": "NARKATIYAGANJ"
    },
    {
        "id": "1305",
        "area_name": "CHANPATIYA"
    },
    {
        "id": "1306",
        "area_name": "MAJHAULIA"
    },
    {
        "id": "1307",
        "area_name": "SIKTA"
    },
    {
        "id": "1311",
        "area_name": "GULABAGH_NEW"
    },
    {
        "id": "1312",
        "area_name": "PURNEA(R)_NEW"
    },
    {
        "id": "1313",
        "area_name": "AMOUR"
    },
    {
        "id": "1314",
        "area_name": "BAISEE"
    },
    {
        "id": "1321",
        "area_name": "BAGHA_NEW"
    },
    {
        "id": "1322",
        "area_name": "RAMNAGAR_NEW"
    },
    {
        "id": "1323",
        "area_name": "MADHUBANI_BAGHA"
    },
    {
        "id": "1331",
        "area_name": "MAHUA_NEW"
    },
    {
        "id": "1332",
        "area_name": "LALGANJ_NEW"
    },
    {
        "id": "1333",
        "area_name": "DABHAICH"
    },
    {
        "id": "1334",
        "area_name": "GORAUL"
    },
    {
        "id": "1341",
        "area_name": "RAMDAYALU NAGAR"
    },
    {
        "id": "1342",
        "area_name": "SKMCH"
    },
    {
        "id": "1351",
        "area_name": "SAKARI_NEW"
    },
    {
        "id": "1352",
        "area_name": "BENIPUR_NEW"
    },
    {
        "id": "1353",
        "area_name": "BIRAUL_NEW"
    },
    {
        "id": "1361",
        "area_name": "JAINAGAR_NEW"
    },
    {
        "id": "1362",
        "area_name": "BASOPATTI"
    },
    {
        "id": "1363",
        "area_name": "BABUBARHI"
    },
    {
        "id": "1371",
        "area_name": "SIMRI BAKHTIYARPUR N"
    },
    {
        "id": "1372",
        "area_name": "SONBARSA"
    },
    {
        "id": "1381",
        "area_name": "BIRPUR_NEW"
    },
    {
        "id": "1382",
        "area_name": "RAGHOPUR_NEW"
    },
    {
        "id": "1383",
        "area_name": "NIRMALI_NEW"
    },
    {
        "id": "1391",
        "area_name": "UDAKISHUNGANJ_NEW"
    },
    {
        "id": "1392",
        "area_name": "ALAMNAGAR"
    },
    {
        "id": "1401",
        "area_name": "PUPRI_NEW"
    },
    {
        "id": "1402",
        "area_name": "BATHNAHA"
    },
    {
        "id": "1403",
        "area_name": "SURSAND"
    },
    {
        "id": "1404",
        "area_name": "NANPUR"
    },
    {
        "id": "1411",
        "area_name": "CHAKIA_NEW"
    },
    {
        "id": "1412",
        "area_name": "ARERAJ_NEW"
    },
    {
        "id": "1413",
        "area_name": "MADHUBAN_CHAKIA"
    },
    {
        "id": "1414",
        "area_name": "KESHARIA"
    },
    {
        "id": "1421",
        "area_name": "MIRGANJ_NEW"
    },
    {
        "id": "1422",
        "area_name": "KUCHAIKOT_NEW"
    },
    {
        "id": "1423",
        "area_name": "BHORE"
    },
    {
        "id": "1431",
        "area_name": "MAHARAJGANJ_NEW"
    },
    {
        "id": "1432",
        "area_name": "BASANTPUR"
    },
    {
        "id": "1433",
        "area_name": "PACHRUKHI"
    },
    {
        "id": "1441",
        "area_name": "KATIHAR(R)_NEW"
    },
    {
        "id": "1442",
        "area_name": "BARSOI_NEW"
    },
    {
        "id": "1443",
        "area_name": "KADWA"
    },
    {
        "id": "1451",
        "area_name": "BAHADURGANJ_NEW"
    },
    {
        "id": "1452",
        "area_name": "THAKURGANJ_NEW"
    },
    {
        "id": "1453",
        "area_name": "DIGHALBANK"
    },
    {
        "id": "1461",
        "area_name": "ARARIA_NEW"
    },
    {
        "id": "1462",
        "area_name": "JOKIHAT_NEW"
    },
    {
        "id": "1463",
        "area_name": "RANIGANJ_NEW"
    }
]

let sectionNames = [
    {
        "id": "24232",
        "area_name": "RAFIGANJ RURAL"
    },
    {
        "id": "21523",
        "area_name": "PUNPUN2"
    },
    {
        "id": "24222",
        "area_name": "HASPURA"
    },
    {
        "id": "23022",
        "area_name": "TENGRA"
    },
    {
        "id": "24231",
        "area_name": "RAFIGANJ URBAN"
    },
    {
        "id": "24212",
        "area_name": "OBRA"
    },
    {
        "id": "23312",
        "area_name": "SULTANGANJ(U)"
    },
    {
        "id": "23072",
        "area_name": "MADANPUR"
    },
    {
        "id": "24414",
        "area_name": "AMARA"
    },
    {
        "id": "22715",
        "area_name": "MAU"
    },
    {
        "id": "23518",
        "area_name": "KAKWARA"
    },
    {
        "id": "23916",
        "area_name": "LAXMIPUR"
    },
    {
        "id": "24514",
        "area_name": "PHULIDUMAR"
    },
    {
        "id": "24522",
        "area_name": "SAKAHARA"
    },
    {
        "id": "21852",
        "area_name": "BRHAMPUR"
    },
    {
        "id": "24611",
        "area_name": "RAJAULI"
    },
    {
        "id": "24612",
        "area_name": "SIRADULLAH"
    },
    {
        "id": "24311",
        "area_name": "NAUGACHHIYA U"
    },
    {
        "id": "24433",
        "area_name": "NIMCHAK BATHANI"
    },
    {
        "id": "23525",
        "area_name": "KATORIA"
    },
    {
        "id": "23526",
        "area_name": "CHANAN"
    },
    {
        "id": "23941",
        "area_name": "GIDDHAUR"
    },
    {
        "id": "24513",
        "area_name": "SAMBHUGANJ"
    },
    {
        "id": "23313",
        "area_name": "SULTANGANJ(R)"
    },
    {
        "id": "24523",
        "area_name": "DHORAIYA"
    },
    {
        "id": "22924",
        "area_name": "KOTHI"
    },
    {
        "id": "21841",
        "area_name": "ITARHI"
    },
    {
        "id": "21839",
        "area_name": "KESATH"
    },
    {
        "id": "23361",
        "area_name": "NAYA BAZAR"
    },
    {
        "id": "22642",
        "area_name": "BODHGAYA(URBAN)"
    },
    {
        "id": "24615",
        "area_name": "GOVINDPUR"
    },
    {
        "id": "22931",
        "area_name": "BARACHATTI"
    },
    {
        "id": "21825",
        "area_name": "DALSAGAR"
    },
    {
        "id": "24521",
        "area_name": "RAJAUN"
    },
    {
        "id": "21734",
        "area_name": "BARAHARA"
    },
    {
        "id": "21735",
        "area_name": "SAHAR"
    },
    {
        "id": "21736",
        "area_name": "AGIAON"
    },
    {
        "id": "21743",
        "area_name": "CHARPOKHARI"
    },
    {
        "id": "21313",
        "area_name": "BELCHI"
    },
    {
        "id": "21333",
        "area_name": "GOSHWARI"
    },
    {
        "id": "21737",
        "area_name": "UDWANT NAGAR"
    },
    {
        "id": "21744",
        "area_name": "TARARI"
    },
    {
        "id": "21836",
        "area_name": "CHAKKI"
    },
    {
        "id": "21837",
        "area_name": "CHAUGAI"
    },
    {
        "id": "21838",
        "area_name": "BRAHMPUR"
    },
    {
        "id": "21323",
        "area_name": "ATHMALGOLA"
    },
    {
        "id": "21314",
        "area_name": "PANDARAK"
    },
    {
        "id": "20121",
        "area_name": "KATRA"
    },
    {
        "id": "20131",
        "area_name": "MAHRUFGANJ(S)"
    },
    {
        "id": "20311",
        "area_name": "RAJENDRA NAGAR"
    },
    {
        "id": "20312",
        "area_name": "SAIDPUR"
    },
    {
        "id": "20512",
        "area_name": "NAYA CHAK"
    },
    {
        "id": "20622",
        "area_name": "MEENABAZAR(2)"
    },
    {
        "id": "20832",
        "area_name": "RAJAPUR"
    },
    {
        "id": "21111",
        "area_name": "DANAPUR"
    },
    {
        "id": "21211",
        "area_name": "BIHTA(1)"
    },
    {
        "id": "21222",
        "area_name": "SHERPUR"
    },
    {
        "id": "21232",
        "area_name": "LALA BHADSARA"
    },
    {
        "id": "21311",
        "area_name": "BARH TOWN"
    },
    {
        "id": "21332",
        "area_name": "MOKAMA(R)"
    },
    {
        "id": "21522",
        "area_name": "SAMPATCHAK"
    },
    {
        "id": "21731",
        "area_name": "ARA(R)"
    },
    {
        "id": "21742",
        "area_name": "GARHANI"
    },
    {
        "id": "21941",
        "area_name": "CHANDI"
    },
    {
        "id": "21952",
        "area_name": "BIND"
    },
    {
        "id": "22011",
        "area_name": "RAJGIR"
    },
    {
        "id": "22371",
        "area_name": "KOCHAS"
    },
    {
        "id": "22612",
        "area_name": "NEW AREA"
    },
    {
        "id": "22622",
        "area_name": "GOLPATHAR(N)"
    },
    {
        "id": "22623",
        "area_name": "GOLPATHAR(E)"
    },
    {
        "id": "22732",
        "area_name": "FATEHPUR"
    },
    {
        "id": "23113",
        "area_name": "COURT"
    },
    {
        "id": "23323",
        "area_name": "NORTH"
    },
    {
        "id": "23441",
        "area_name": "KAHALGAON"
    },
    {
        "id": "23651",
        "area_name": "ASARGANJ"
    },
    {
        "id": "23653",
        "area_name": "TARAPUR"
    },
    {
        "id": "20522",
        "area_name": "GOPALPUR"
    },
    {
        "id": "20711",
        "area_name": "NEW CAPITAL"
    },
    {
        "id": "20852",
        "area_name": "A.N.COLLEGE"
    },
    {
        "id": "20922",
        "area_name": "EXHIBITION ROAD"
    },
    {
        "id": "21242",
        "area_name": "MAHABALIPUR"
    },
    {
        "id": "21331",
        "area_name": "MOKAMA TOWN"
    },
    {
        "id": "21411",
        "area_name": "FATHUA(U)"
    },
    {
        "id": "21412",
        "area_name": "FATUHA(R)"
    },
    {
        "id": "21622",
        "area_name": "JAITIPUR"
    },
    {
        "id": "21751",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "21831",
        "area_name": "DUMRAON"
    },
    {
        "id": "21912",
        "area_name": "NAISARAI"
    },
    {
        "id": "21953",
        "area_name": "SARMERA"
    },
    {
        "id": "22021",
        "area_name": "NALANDA"
    },
    {
        "id": "22213",
        "area_name": "NAWADA(R)"
    },
    {
        "id": "22214",
        "area_name": "HISUA"
    },
    {
        "id": "22223",
        "area_name": "SIRDALA"
    },
    {
        "id": "22231",
        "area_name": "WARSALIGANJ"
    },
    {
        "id": "22351",
        "area_name": "SASARAM(R)"
    },
    {
        "id": "22363",
        "area_name": "DINARA"
    },
    {
        "id": "22372",
        "area_name": "KARAHAGAR"
    },
    {
        "id": "22611",
        "area_name": "HEAD QUARTER"
    },
    {
        "id": "22631",
        "area_name": "GOWEL BIGHA"
    },
    {
        "id": "22913",
        "area_name": "CHERKI"
    },
    {
        "id": "23122",
        "area_name": "MAKDUMPUR"
    },
    {
        "id": "23652",
        "area_name": "SANGRAMPUR"
    },
    {
        "id": "20122",
        "area_name": "MALSALAMI"
    },
    {
        "id": "20412",
        "area_name": "KARBIGAHIYA(W)"
    },
    {
        "id": "20432",
        "area_name": "KANKARBAGH(W)"
    },
    {
        "id": "20912",
        "area_name": "STATION ROAD"
    },
    {
        "id": "21122",
        "area_name": "KHAGAUL 2"
    },
    {
        "id": "21212",
        "area_name": "BIHTA(2)"
    },
    {
        "id": "21213",
        "area_name": "PAREO"
    },
    {
        "id": "21611",
        "area_name": "PHULWARI"
    },
    {
        "id": "21721",
        "area_name": "WEST"
    },
    {
        "id": "21832",
        "area_name": "SIMRI"
    },
    {
        "id": "22132",
        "area_name": "HILSA(R)"
    },
    {
        "id": "22211",
        "area_name": "NAWADA(E)"
    },
    {
        "id": "22212",
        "area_name": "NAWADA(W)"
    },
    {
        "id": "22633",
        "area_name": "DANDI BAGH"
    },
    {
        "id": "22721",
        "area_name": "GAYA(R)"
    },
    {
        "id": "22911",
        "area_name": "SHERGHATI"
    },
    {
        "id": "23012",
        "area_name": "TOWN(2)"
    },
    {
        "id": "23032",
        "area_name": "OBRA"
    },
    {
        "id": "23331",
        "area_name": "NATHNAGAR"
    },
    {
        "id": "23421",
        "area_name": "ALIGANJ"
    },
    {
        "id": "23633",
        "area_name": "PURANIGANJ"
    },
    {
        "id": "23644",
        "area_name": "DHARHARA"
    },
    {
        "id": "20411",
        "area_name": "KARBIGAHIYA(E)"
    },
    {
        "id": "20851",
        "area_name": "S.K.PURI"
    },
    {
        "id": "20921",
        "area_name": "KADAMKUAN"
    },
    {
        "id": "21121",
        "area_name": "KHAGAUL(1)"
    },
    {
        "id": "21123",
        "area_name": "PHULWARI"
    },
    {
        "id": "21231",
        "area_name": "BIKRAM"
    },
    {
        "id": "21241",
        "area_name": "PALI"
    },
    {
        "id": "21752",
        "area_name": "BIHIYA"
    },
    {
        "id": "21753",
        "area_name": "SAHPUR"
    },
    {
        "id": "21812",
        "area_name": "BUXAR(E)"
    },
    {
        "id": "21822",
        "area_name": "CHAUSA"
    },
    {
        "id": "21823",
        "area_name": "ITADHI"
    },
    {
        "id": "21834",
        "area_name": "KORAN SARAI"
    },
    {
        "id": "21835",
        "area_name": "RAGHUNATHPUR"
    },
    {
        "id": "21921",
        "area_name": "RAMCHANDRAPUR"
    },
    {
        "id": "21931",
        "area_name": "HARNAUT"
    },
    {
        "id": "21951",
        "area_name": "ASTHAWAN"
    },
    {
        "id": "22343",
        "area_name": "MADAR DARWAJA"
    },
    {
        "id": "22362",
        "area_name": "DAWATH"
    },
    {
        "id": "22711",
        "area_name": "TEKARI"
    },
    {
        "id": "22712",
        "area_name": "GURARU"
    },
    {
        "id": "23011",
        "area_name": "TOWN(1)"
    },
    {
        "id": "23041",
        "area_name": "GOH"
    },
    {
        "id": "23111",
        "area_name": "EAST"
    },
    {
        "id": "23112",
        "area_name": "WEST"
    },
    {
        "id": "23333",
        "area_name": "UNIVERSITY"
    },
    {
        "id": "23631",
        "area_name": "LALDARWAZA"
    },
    {
        "id": "23642",
        "area_name": "JAMALPUR(R)"
    },
    {
        "id": "23732",
        "area_name": "BARAHIYA(R)"
    },
    {
        "id": "20222",
        "area_name": "UNIVERSITY"
    },
    {
        "id": "20721",
        "area_name": "BOARD COLONY"
    },
    {
        "id": "20911",
        "area_name": "MAURYA LOK"
    },
    {
        "id": "21132",
        "area_name": "GOLA ROAD"
    },
    {
        "id": "21341",
        "area_name": "HATHIDAH TOWN"
    },
    {
        "id": "21342",
        "area_name": "HATHIDAH(R)"
    },
    {
        "id": "21711",
        "area_name": "HEAD"
    },
    {
        "id": "21712",
        "area_name": "EAST"
    },
    {
        "id": "21824",
        "area_name": "RAJPUR"
    },
    {
        "id": "21913",
        "area_name": "SOHSARAI"
    },
    {
        "id": "22221",
        "area_name": "RAJAULI"
    },
    {
        "id": "22222",
        "area_name": "AKBARPUR"
    },
    {
        "id": "22353",
        "area_name": "CHENARI"
    },
    {
        "id": "22621",
        "area_name": "DELHA"
    },
    {
        "id": "22733",
        "area_name": "MANPUR(N)"
    },
    {
        "id": "22734",
        "area_name": "MANPUR(S)"
    },
    {
        "id": "22912",
        "area_name": "BARACHATTI"
    },
    {
        "id": "22922",
        "area_name": "DUMARIYA"
    },
    {
        "id": "23031",
        "area_name": "DAUDNAGAR"
    },
    {
        "id": "23061",
        "area_name": "TOWN"
    },
    {
        "id": "23232",
        "area_name": "ATUALLAH"
    },
    {
        "id": "23423",
        "area_name": "SABOUR"
    },
    {
        "id": "23442",
        "area_name": "PIRPAITHI"
    },
    {
        "id": "23643",
        "area_name": "JAMALPUR(U)"
    },
    {
        "id": "24211",
        "area_name": "DAUDNAGAR"
    },
    {
        "id": "24221",
        "area_name": "GOH"
    },
    {
        "id": "22713",
        "area_name": "KONCH"
    },
    {
        "id": "23311",
        "area_name": "SAHKUND"
    },
    {
        "id": "24613",
        "area_name": "AKBARPUR"
    },
    {
        "id": "24614",
        "area_name": "FATEHPUR"
    },
    {
        "id": "24512",
        "area_name": "LAXMIPUR CHIRAIYA"
    },
    {
        "id": "24424",
        "area_name": "MOHRA"
    },
    {
        "id": "22024",
        "area_name": "BEN"
    },
    {
        "id": "22243",
        "area_name": "KAUAKOL"
    },
    {
        "id": "24113",
        "area_name": "SAHPUR"
    },
    {
        "id": "24233",
        "area_name": "PAUTHU"
    },
    {
        "id": "22714",
        "area_name": "PARAIYA"
    },
    {
        "id": "21738",
        "area_name": "KARISATH"
    },
    {
        "id": "21762",
        "area_name": "KOILWAR"
    },
    {
        "id": "23416",
        "area_name": "GOPALPUR"
    },
    {
        "id": "22517",
        "area_name": "ADHAURA"
    },
    {
        "id": "21842",
        "area_name": "PURSHOTTAMPUR"
    },
    {
        "id": "21761",
        "area_name": "BARHARA"
    },
    {
        "id": "22932",
        "area_name": "MOHANPUR"
    },
    {
        "id": "24124",
        "area_name": "HASAN BAZAR"
    },
    {
        "id": "24321",
        "area_name": "THANA BIHPUR"
    },
    {
        "id": "24511",
        "area_name": "AMARPUR"
    },
    {
        "id": "21763",
        "area_name": "GIDDHA"
    },
    {
        "id": "21961",
        "area_name": "BIHARSHARIF(RURAL)"
    },
    {
        "id": "21851",
        "area_name": "CHAUGAI"
    },
    {
        "id": "21853",
        "area_name": "RAGHUNATHPUR"
    },
    {
        "id": "22553",
        "area_name": "RAMPUR"
    },
    {
        "id": "22933",
        "area_name": "DOBHI"
    },
    {
        "id": "24624",
        "area_name": "NARHAT"
    },
    {
        "id": "24313",
        "area_name": "GOPALPUR"
    },
    {
        "id": "24323",
        "area_name": "NARAYANPUR"
    },
    {
        "id": "23052",
        "area_name": "KUTUMBA"
    },
    {
        "id": "24621",
        "area_name": "HISUA"
    },
    {
        "id": "24622",
        "area_name": "MESKAUR"
    },
    {
        "id": "24623",
        "area_name": "NARDIGANJ"
    },
    {
        "id": "24431",
        "area_name": "KHIZARSARAI"
    },
    {
        "id": "21854",
        "area_name": "SIMRI"
    },
    {
        "id": "24412",
        "area_name": "MANPUR SOUTH"
    },
    {
        "id": "23942",
        "area_name": "LAXMIPUR"
    },
    {
        "id": "24312",
        "area_name": "NAUGACHHIYA R"
    },
    {
        "id": "24115",
        "area_name": "KARMANIPUR"
    },
    {
        "id": "24114",
        "area_name": "DULHINGANJ"
    },
    {
        "id": "21963",
        "area_name": "KARANBIGHA"
    },
    {
        "id": "23362",
        "area_name": "MIRJAANHAT"
    },
    {
        "id": "23451",
        "area_name": "PIRPAINTI"
    },
    {
        "id": "21855",
        "area_name": "NAYA BHOJPUR"
    },
    {
        "id": "23671",
        "area_name": "KHARAGPUR"
    },
    {
        "id": "20112",
        "area_name": "CITY CHOWK"
    },
    {
        "id": "20212",
        "area_name": "BANKIPUR(2)"
    },
    {
        "id": "20322",
        "area_name": "M.PUR"
    },
    {
        "id": "20413",
        "area_name": "ASHOK NAGAR"
    },
    {
        "id": "20422",
        "area_name": "KUMHRAR"
    },
    {
        "id": "20513",
        "area_name": "KHEMNI CHAK(W)"
    },
    {
        "id": "20621",
        "area_name": "MEENABAZAR(1)"
    },
    {
        "id": "21011",
        "area_name": "GARDANIBAGH"
    },
    {
        "id": "21022",
        "area_name": "MITHAPUR"
    },
    {
        "id": "21322",
        "area_name": "BAKHTIYARPUR(R)"
    },
    {
        "id": "21421",
        "area_name": "DEEDARGANJ"
    },
    {
        "id": "21621",
        "area_name": "NAUBATPUR"
    },
    {
        "id": "21722",
        "area_name": "NORTH"
    },
    {
        "id": "21732",
        "area_name": "KOILWAR"
    },
    {
        "id": "21911",
        "area_name": "BARI PAHARI"
    },
    {
        "id": "21942",
        "area_name": "NAGARNAUSA"
    },
    {
        "id": "22111",
        "area_name": "EKANGARSARAI"
    },
    {
        "id": "22342",
        "area_name": "GOLACHNI"
    },
    {
        "id": "22352",
        "area_name": "NOKHA"
    },
    {
        "id": "22361",
        "area_name": "BIKRAMGANJ"
    },
    {
        "id": "22613",
        "area_name": "CHANDAUTI"
    },
    {
        "id": "22722",
        "area_name": "BELAGANJ"
    },
    {
        "id": "22731",
        "area_name": "WAZIRGANJ"
    },
    {
        "id": "22914",
        "area_name": "GURUA"
    },
    {
        "id": "23051",
        "area_name": "NAVINAGAR"
    },
    {
        "id": "23121",
        "area_name": "GHOSI"
    },
    {
        "id": "23322",
        "area_name": "SOUTH"
    },
    {
        "id": "20132",
        "area_name": "MAHRUFGANJ(N)"
    },
    {
        "id": "20421",
        "area_name": "BAHADURPUR"
    },
    {
        "id": "20611",
        "area_name": "PATHAR KI MASJID"
    },
    {
        "id": "20612",
        "area_name": "GAIGHAT"
    },
    {
        "id": "20831",
        "area_name": "SADAKAT ASHRAM"
    },
    {
        "id": "21112",
        "area_name": "MES"
    },
    {
        "id": "21321",
        "area_name": "BAKHTIYARPUR(U)"
    },
    {
        "id": "21422",
        "area_name": "PAHARI"
    },
    {
        "id": "21512",
        "area_name": "MASAURHI(2)"
    },
    {
        "id": "21521",
        "area_name": "PUNPUN"
    },
    {
        "id": "21612",
        "area_name": "NEORA"
    },
    {
        "id": "21741",
        "area_name": "PIRO"
    },
    {
        "id": "21811",
        "area_name": "BUXAR(W)"
    },
    {
        "id": "21833",
        "area_name": "NAWANAGAR"
    },
    {
        "id": "21932",
        "area_name": "RAHUI"
    },
    {
        "id": "22012",
        "area_name": "SILAO"
    },
    {
        "id": "22121",
        "area_name": "ISLAMPUR(U)"
    },
    {
        "id": "22131",
        "area_name": "HILSA(U)"
    },
    {
        "id": "22341",
        "area_name": "BEDA"
    },
    {
        "id": "22625",
        "area_name": "GOLPATHAR(S)"
    },
    {
        "id": "22632",
        "area_name": "CHAND CHAURA"
    },
    {
        "id": "22921",
        "area_name": "IMAMGANJ"
    },
    {
        "id": "23021",
        "area_name": "BARUN"
    },
    {
        "id": "23062",
        "area_name": "RURAL"
    },
    {
        "id": "23321",
        "area_name": "TILKAMANJHI"
    },
    {
        "id": "23443",
        "area_name": "SANAHULA"
    },
    {
        "id": "23632",
        "area_name": "BARI BAZAR"
    },
    {
        "id": "23641",
        "area_name": "BARIYARPUR"
    },
    {
        "id": "23721",
        "area_name": "KAJRA"
    },
    {
        "id": "20111",
        "area_name": "PADHARI KI HAWELI"
    },
    {
        "id": "20211",
        "area_name": "BANKIPUR(1)"
    },
    {
        "id": "20221",
        "area_name": "PMCH"
    },
    {
        "id": "20321",
        "area_name": "M.TOLI"
    },
    {
        "id": "20431",
        "area_name": "KANKARBAGH(E)"
    },
    {
        "id": "20433",
        "area_name": "HANUMANNAGAR"
    },
    {
        "id": "20713",
        "area_name": "MLA FLAT"
    },
    {
        "id": "20841",
        "area_name": "P.P.COLONY"
    },
    {
        "id": "20842",
        "area_name": "INDUSTRIAL AREA"
    },
    {
        "id": "21012",
        "area_name": "ANISABAD"
    },
    {
        "id": "21021",
        "area_name": "JAKKANPUR"
    },
    {
        "id": "21131",
        "area_name": "DIGHA"
    },
    {
        "id": "21221",
        "area_name": "MANER"
    },
    {
        "id": "21312",
        "area_name": "BARH(R)"
    },
    {
        "id": "21511",
        "area_name": "MASAURHI(1)"
    },
    {
        "id": "21733",
        "area_name": "SANDESH"
    },
    {
        "id": "21821",
        "area_name": "BUXAR(R)"
    },
    {
        "id": "21922",
        "area_name": "BARI DARGAH"
    },
    {
        "id": "21923",
        "area_name": "DHANESHWARGHAT"
    },
    {
        "id": "22022",
        "area_name": "GIRIYAK"
    },
    {
        "id": "22112",
        "area_name": "PARWALPUR"
    },
    {
        "id": "22122",
        "area_name": "ISLAMPUR(R)"
    },
    {
        "id": "22232",
        "area_name": "PAKRIBARWAN"
    },
    {
        "id": "22624",
        "area_name": "GODAM"
    },
    {
        "id": "22735",
        "area_name": "KHIZARASARAI"
    },
    {
        "id": "23013",
        "area_name": "RURAL"
    },
    {
        "id": "23231",
        "area_name": "ARWAL"
    },
    {
        "id": "23332",
        "area_name": "CHAMPANAGAR"
    },
    {
        "id": "23422",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "23731",
        "area_name": "BARAHIYA(U)"
    },
    {
        "id": "24131",
        "area_name": "AGION"
    },
    {
        "id": "23924",
        "area_name": "BODWA"
    },
    {
        "id": "24423",
        "area_name": "TANKUPPA"
    },
    {
        "id": "21843",
        "area_name": "RAJPUR"
    },
    {
        "id": "24432",
        "area_name": "ATRI"
    },
    {
        "id": "23943",
        "area_name": "BARHAT"
    },
    {
        "id": "24322",
        "area_name": "KHARIK"
    },
    {
        "id": "22551",
        "area_name": "BHAGWANPUR"
    },
    {
        "id": "23452",
        "area_name": "VIKRAMSHILA"
    },
    {
        "id": "24123",
        "area_name": "TARARI"
    },
    {
        "id": "24122",
        "area_name": "CHARPOKHARI"
    },
    {
        "id": "23363",
        "area_name": "POWERHOUSE"
    },
    {
        "id": "24132",
        "area_name": "GARHANI"
    },
    {
        "id": "24121",
        "area_name": "PIRO"
    },
    {
        "id": "21844",
        "area_name": "PIYARA"
    },
    {
        "id": "22516",
        "area_name": "RAMPUR"
    },
    {
        "id": "23715",
        "area_name": "CHANAN"
    },
    {
        "id": "22023",
        "area_name": "KATRISARAI"
    },
    {
        "id": "22216",
        "area_name": "NARHAT"
    },
    {
        "id": "22234",
        "area_name": "KASHICHAK"
    },
    {
        "id": "23815",
        "area_name": "GHATKUSUMBHA"
    },
    {
        "id": "21962",
        "area_name": "NOORSARAI"
    },
    {
        "id": "24112",
        "area_name": "BIHIYA"
    },
    {
        "id": "23925",
        "area_name": "SIMULTALLA"
    },
    {
        "id": "23517",
        "area_name": "CHANDAN"
    },
    {
        "id": "21954",
        "area_name": "BENAR"
    },
    {
        "id": "24133",
        "area_name": "SAHAR"
    },
    {
        "id": "22552",
        "area_name": "BHABHUA(U)"
    },
    {
        "id": "24411",
        "area_name": "MANPUR NORTH"
    },
    {
        "id": "23444",
        "area_name": "EKCHARI"
    },
    {
        "id": "24422",
        "area_name": "FATEHPUR"
    },
    {
        "id": "23926",
        "area_name": "MADHOPUR"
    },
    {
        "id": "24421",
        "area_name": "WAZIRGANJ"
    },
    {
        "id": "22641",
        "area_name": "BODHGAYA(RURAL)"
    },
    {
        "id": "24413",
        "area_name": "GERE"
    },
    {
        "id": "24111",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "22415",
        "area_name": "RAJPUR"
    },
    {
        "id": "22414",
        "area_name": "AKODIGOLA"
    },
    {
        "id": "22413",
        "area_name": "DALMIYANAGAR"
    },
    {
        "id": "22412",
        "area_name": "BMP"
    },
    {
        "id": "22411",
        "area_name": "DEHRI(U)"
    },
    {
        "id": "22423",
        "area_name": "TILAUTHU"
    },
    {
        "id": "22421",
        "area_name": "NAUHATTA"
    },
    {
        "id": "22424",
        "area_name": "KARWANDIYA"
    },
    {
        "id": "22422",
        "area_name": "ROHTAS"
    },
    {
        "id": "22432",
        "area_name": "KARKAT"
    },
    {
        "id": "22431",
        "area_name": "NASRIGANJ"
    },
    {
        "id": "22511",
        "area_name": "BHBAUA(U)"
    },
    {
        "id": "22513",
        "area_name": "BHAGWANPUR"
    },
    {
        "id": "22512",
        "area_name": "BHABUA(R)"
    },
    {
        "id": "22514",
        "area_name": "CHAND"
    },
    {
        "id": "22521",
        "area_name": "MOHANIA"
    },
    {
        "id": "22522",
        "area_name": "DURGAWATI"
    },
    {
        "id": "22531",
        "area_name": "KUDRA"
    },
    {
        "id": "22532",
        "area_name": "PUSAULI"
    },
    {
        "id": "22542",
        "area_name": "NUAON"
    },
    {
        "id": "22541",
        "area_name": "RAMARH"
    },
    {
        "id": "23415",
        "area_name": "NARAYANPUR"
    },
    {
        "id": "23414",
        "area_name": "KHARIK"
    },
    {
        "id": "23411",
        "area_name": "NAUGACHIA(U)"
    },
    {
        "id": "23413",
        "area_name": "BIHPUR"
    },
    {
        "id": "23412",
        "area_name": "NAUGACHIA(R)"
    },
    {
        "id": "23433",
        "area_name": "SULTANGANJ(R)"
    },
    {
        "id": "23432",
        "area_name": "SULTANGANJ(U)"
    },
    {
        "id": "23431",
        "area_name": "SAHKUND"
    },
    {
        "id": "23516",
        "area_name": "DHORAIYA"
    },
    {
        "id": "23515",
        "area_name": "BARAHAT"
    },
    {
        "id": "23512",
        "area_name": "BOUNSI"
    },
    {
        "id": "23511",
        "area_name": "BANKA"
    },
    {
        "id": "23514",
        "area_name": "RAJOUN"
    },
    {
        "id": "23513",
        "area_name": "KATORIYA"
    },
    {
        "id": "23524",
        "area_name": "BELHAR"
    },
    {
        "id": "23523",
        "area_name": "PHULLIDUMER"
    },
    {
        "id": "23521",
        "area_name": "AMARPUR"
    },
    {
        "id": "23522",
        "area_name": "SAMBHUGANJ"
    },
    {
        "id": "23712",
        "area_name": "LAKHISARAI(N)"
    },
    {
        "id": "23714",
        "area_name": "LAKHISARAI(S)"
    },
    {
        "id": "23713",
        "area_name": "LAKHISARAI(R)"
    },
    {
        "id": "23711",
        "area_name": "HALSI"
    },
    {
        "id": "23813",
        "area_name": "SHEIKHPURA(U)"
    },
    {
        "id": "23811",
        "area_name": "ARIYARI"
    },
    {
        "id": "23812",
        "area_name": "SHEIKHPURA(R)"
    },
    {
        "id": "23822",
        "area_name": "ONAMA"
    },
    {
        "id": "23821",
        "area_name": "BARBIGHA"
    },
    {
        "id": "23915",
        "area_name": "MALAYPUR"
    },
    {
        "id": "23912",
        "area_name": "JAMUI(U)"
    },
    {
        "id": "23914",
        "area_name": "KHAIRA"
    },
    {
        "id": "23913",
        "area_name": "JAMUI(R)"
    },
    {
        "id": "23911",
        "area_name": "GIDHOR"
    },
    {
        "id": "23922",
        "area_name": "SONO"
    },
    {
        "id": "23923",
        "area_name": "CHAKAI"
    },
    {
        "id": "23921",
        "area_name": "JHAJHA"
    },
    {
        "id": "23931",
        "area_name": "ALIGANJ"
    },
    {
        "id": "23932",
        "area_name": "SIKANDRA"
    },
    {
        "id": "21423",
        "area_name": "FATEHPUR"
    },
    {
        "id": "22235",
        "area_name": "ROH"
    },
    {
        "id": "22515",
        "area_name": "CHAINPUR"
    },
    {
        "id": "23672",
        "area_name": "TETIYA BAMBER"
    },
    {
        "id": "23814",
        "area_name": "CHEWARA"
    },
    {
        "id": "22233",
        "area_name": "KOWAKOL"
    },
    {
        "id": "21413",
        "area_name": "DANIYAWA"
    },
    {
        "id": "23716",
        "area_name": "RAMGARH CHOWK"
    },
    {
        "id": "22915",
        "area_name": "DOBHI"
    },
    {
        "id": "22916",
        "area_name": "AMAS"
    },
    {
        "id": "22917",
        "area_name": "MOHANPUR"
    },
    {
        "id": "22923",
        "area_name": "BANKEY BAZAR"
    },
    {
        "id": "22113",
        "area_name": "TELHARA"
    },
    {
        "id": "22123",
        "area_name": "KHUDAGANJ"
    },
    {
        "id": "22133",
        "area_name": "KARAI PARSURAI"
    },
    {
        "id": "21943",
        "area_name": "THARTHRI"
    },
    {
        "id": "22215",
        "area_name": "NARDIGANJ"
    },
    {
        "id": "22224",
        "area_name": "GOVINDPUR"
    },
    {
        "id": "23114",
        "area_name": "KAKO"
    },
    {
        "id": "23123",
        "area_name": "HULASGANJ"
    },
    {
        "id": "23124",
        "area_name": "MAKDUMPUR(W)"
    },
    {
        "id": "22364",
        "area_name": "SURYAPURA"
    },
    {
        "id": "22365",
        "area_name": "SANJHAULI"
    },
    {
        "id": "22354",
        "area_name": "SHEOSAGAR"
    },
    {
        "id": "23014",
        "area_name": "DEO"
    },
    {
        "id": "23015",
        "area_name": "MADANPUR"
    },
    {
        "id": "23042",
        "area_name": "HASPURA"
    },
    {
        "id": "23233",
        "area_name": "KURTHA"
    },
    {
        "id": "23234",
        "area_name": "BANSHI"
    },
    {
        "id": "23235",
        "area_name": "KALER"
    },
    {
        "id": "23115",
        "area_name": "RATANI"
    },
    {
        "id": "23125",
        "area_name": "MODANGANJ"
    },
    {
        "id": "23722",
        "area_name": "SURAJGRAHA"
    },
    {
        "id": "21513",
        "area_name": "DHANARUA"
    },
    {
        "id": "22217",
        "area_name": "KEDRIGANJ"
    },
    {
        "id": "22523",
        "area_name": "CHAURASHIYA"
    },
    {
        "id": "24011",
        "area_name": "GARI KHANA"
    },
    {
        "id": "22242",
        "area_name": "ROH"
    },
    {
        "id": "22241",
        "area_name": "PAKRIBARAWAN"
    },
    {
        "id": "22724",
        "area_name": "CHAKAND"
    },
    {
        "id": "24012",
        "area_name": "KHAGAUL"
    },
    {
        "id": "24013",
        "area_name": "BAIELY ROAD"
    },
    {
        "id": "24021",
        "area_name": "PHULWARISHARIF"
    },
    {
        "id": "24022",
        "area_name": "WALMI"
    },
    {
        "id": "23071",
        "area_name": "DEO"
    },
    {
        "id": "23673",
        "area_name": "SHAYAMPUR"
    },
    {
        "id": "21713",
        "area_name": "POWERGANJ"
    },
    {
        "id": "20532",
        "area_name": "R.K.NAGAR"
    },
    {
        "id": "21933",
        "area_name": "KALYANBIGHA"
    },
    {
        "id": "23334",
        "area_name": "TRANSFERAL"
    },
    {
        "id": "20022",
        "area_name": "VIJAYNAGAR"
    },
    {
        "id": "22013",
        "area_name": "RAJGIR U"
    },
    {
        "id": "21113",
        "area_name": "ANAND BAZAR"
    },
    {
        "id": "22813",
        "area_name": "NAISARAI"
    },
    {
        "id": "20521",
        "area_name": "KUMHRAR"
    },
    {
        "id": "22812",
        "area_name": "SOHSARAI"
    },
    {
        "id": "20011",
        "area_name": "ASHIYANA"
    },
    {
        "id": "22218",
        "area_name": "TRANSFERRED"
    },
    {
        "id": "21934",
        "area_name": "DHAMAULI"
    },
    {
        "id": "22821",
        "area_name": "BARIDARGAH"
    },
    {
        "id": "22823",
        "area_name": "DHANESHWARGHAT"
    },
    {
        "id": "22811",
        "area_name": "BARIPAHARI"
    },
    {
        "id": "20531",
        "area_name": "KHEMNICHAK"
    },
    {
        "id": "20012",
        "area_name": "IGIMS"
    },
    {
        "id": "20712",
        "area_name": "BUDHA COLONY"
    },
    {
        "id": "20021",
        "area_name": "KHAJPURA"
    },
    {
        "id": "21013",
        "area_name": "BEUR"
    },
    {
        "id": "22822",
        "area_name": "RAMCHANDRAPUR"
    },
    {
        "id": "20722",
        "area_name": "RAJABAZAAR"
    },
    {
        "id": "10142",
        "area_name": "BARHARAKOTHI"
    },
    {
        "id": "10141",
        "area_name": "BANMANKHI(1)"
    },
    {
        "id": "10143",
        "area_name": "BANMANKHI(2)"
    },
    {
        "id": "10153",
        "area_name": "DHAMDAHA"
    },
    {
        "id": "10154",
        "area_name": "MIRGANJ"
    },
    {
        "id": "10152",
        "area_name": "RUPAULI"
    },
    {
        "id": "10151",
        "area_name": "BHAWANIPUR"
    },
    {
        "id": "10162",
        "area_name": "K.NAGAR_NEW"
    },
    {
        "id": "10161",
        "area_name": "SRINAGAR_NEW"
    },
    {
        "id": "10221",
        "area_name": "KATIHAR(R)"
    },
    {
        "id": "10226",
        "area_name": "FALKA"
    },
    {
        "id": "10227",
        "area_name": "MANIHARI"
    },
    {
        "id": "10222",
        "area_name": "BARARI"
    },
    {
        "id": "10242",
        "area_name": "SAMAILI"
    },
    {
        "id": "10244",
        "area_name": "FALKA_NEW"
    },
    {
        "id": "10243",
        "area_name": "KORHA_NEW"
    },
    {
        "id": "10241",
        "area_name": "KURSELA_NEW"
    },
    {
        "id": "10255",
        "area_name": "MANSAHI"
    },
    {
        "id": "10252",
        "area_name": "SAMANPUR"
    },
    {
        "id": "10253",
        "area_name": "MANIHARI_NEW"
    },
    {
        "id": "10251",
        "area_name": "BARARI_NEW"
    },
    {
        "id": "10254",
        "area_name": "AMDABAD"
    },
    {
        "id": "10312",
        "area_name": "KISHANGANJ(R)"
    },
    {
        "id": "10341",
        "area_name": "KOCHDHAMAN_NEW"
    },
    {
        "id": "10343",
        "area_name": "MADHO"
    },
    {
        "id": "10342",
        "area_name": "BISHANPUR"
    },
    {
        "id": "10425",
        "area_name": "JOGBANI"
    },
    {
        "id": "10422",
        "area_name": "NARPATGANJ"
    },
    {
        "id": "10426",
        "area_name": "KURSAKANTA"
    },
    {
        "id": "10424",
        "area_name": "FORBESGANJ(R)"
    },
    {
        "id": "10423",
        "area_name": "AURAHI"
    },
    {
        "id": "10529",
        "area_name": "BANGAON"
    },
    {
        "id": "10523",
        "area_name": "NAUHATTA"
    },
    {
        "id": "10521",
        "area_name": "KHARA"
    },
    {
        "id": "10525",
        "area_name": "MAHESI"
    },
    {
        "id": "10527",
        "area_name": "BHELAHI"
    },
    {
        "id": "10528",
        "area_name": "DARHAR"
    },
    {
        "id": "10526",
        "area_name": "SOUR BAZAR"
    },
    {
        "id": "10543",
        "area_name": "SATTARKATIA_NEW"
    },
    {
        "id": "10544",
        "area_name": "PACHGACHHIA"
    },
    {
        "id": "10541",
        "area_name": "SAUR_BAZAR_NEW"
    },
    {
        "id": "10542",
        "area_name": "RAUTA"
    },
    {
        "id": "10613",
        "area_name": "SUPAUL(R)"
    },
    {
        "id": "10612",
        "area_name": "KISHANPUR"
    },
    {
        "id": "10614",
        "area_name": "PARSARMA"
    },
    {
        "id": "10623",
        "area_name": "JADIYA"
    },
    {
        "id": "10622",
        "area_name": "TRIVENIGANJ"
    },
    {
        "id": "10621",
        "area_name": "PIPRA"
    },
    {
        "id": "10624",
        "area_name": "KATAIYA"
    },
    {
        "id": "10716",
        "area_name": "MADHEPURA_WEST"
    },
    {
        "id": "10712",
        "area_name": "MADHEPURA(R)"
    },
    {
        "id": "10711",
        "area_name": "MADHEPURA(U)"
    },
    {
        "id": "10732",
        "area_name": "GHAMHARIA"
    },
    {
        "id": "10733",
        "area_name": "GHAILADH"
    },
    {
        "id": "10734",
        "area_name": "SHANKARPUR"
    },
    {
        "id": "10731",
        "area_name": "SINGHESWAR_NEW"
    },
    {
        "id": "10741",
        "area_name": "KUMARKHAND_NORTH_NEW"
    },
    {
        "id": "10744",
        "area_name": "MURLIGANJ_SOUTH"
    },
    {
        "id": "10742",
        "area_name": "KUMARKHAND_SOUTH"
    },
    {
        "id": "10743",
        "area_name": "MURLIGANJ_NEW"
    },
    {
        "id": "10825",
        "area_name": "ALOULI"
    },
    {
        "id": "10826",
        "area_name": "KHAGARIA_RURAL_II"
    },
    {
        "id": "10821",
        "area_name": "RURAL"
    },
    {
        "id": "10827",
        "area_name": "HARIPUR"
    },
    {
        "id": "10824",
        "area_name": "CHOUTHAM"
    },
    {
        "id": "10834",
        "area_name": "JHANJHARA"
    },
    {
        "id": "10832",
        "area_name": "MAHESHKHUNT"
    },
    {
        "id": "10833",
        "area_name": "PARBATTA"
    },
    {
        "id": "10831",
        "area_name": "GOGRI"
    },
    {
        "id": "10842",
        "area_name": "CHAUTHAM_NEW"
    },
    {
        "id": "10841",
        "area_name": "MANSI_NEW"
    },
    {
        "id": "10843",
        "area_name": "BELDAUR_NEW"
    },
    {
        "id": "11019",
        "area_name": "KHIRMA"
    },
    {
        "id": "11012",
        "area_name": "KEOTI"
    },
    {
        "id": "11011",
        "area_name": "GANGWARA"
    },
    {
        "id": "11053",
        "area_name": "JALE_NEW"
    },
    {
        "id": "11051",
        "area_name": "SINGHWARA_NEW"
    },
    {
        "id": "11052",
        "area_name": "SANAHPUR"
    },
    {
        "id": "11054",
        "area_name": "KAMTAUL"
    },
    {
        "id": "11063",
        "area_name": "BAHADURPUR_NORTH"
    },
    {
        "id": "11061",
        "area_name": "HANUMANNAGAR_NEW"
    },
    {
        "id": "11062",
        "area_name": "BAHADURPUR_NEW"
    },
    {
        "id": "11073",
        "area_name": "HATHAURI_DIH"
    },
    {
        "id": "11072",
        "area_name": "BAHERI_NEW"
    },
    {
        "id": "11071",
        "area_name": "HAYAGHAT_NEW"
    },
    {
        "id": "11114",
        "area_name": "RAJNAGAR"
    },
    {
        "id": "11113",
        "area_name": "MADHUBANI(R)"
    },
    {
        "id": "11115",
        "area_name": "LOHA"
    },
    {
        "id": "11124",
        "area_name": "MADHWAPUR"
    },
    {
        "id": "11121",
        "area_name": "BENIPATTI"
    },
    {
        "id": "11125",
        "area_name": "ARER"
    },
    {
        "id": "11142",
        "area_name": "SIMRI"
    },
    {
        "id": "11141",
        "area_name": "BISFI_NEW"
    },
    {
        "id": "11153",
        "area_name": "RAMPATTI"
    },
    {
        "id": "11151",
        "area_name": "PANDAUL_NEW"
    },
    {
        "id": "11152",
        "area_name": "SARSOPAHI"
    },
    {
        "id": "11211",
        "area_name": "JAHANJHARPUR"
    },
    {
        "id": "11215",
        "area_name": "NARYANPUR"
    },
    {
        "id": "11217",
        "area_name": "RUDRAPUR"
    },
    {
        "id": "11214",
        "area_name": "ANRHRATHARI"
    },
    {
        "id": "11216",
        "area_name": "TULAPATGANJ"
    },
    {
        "id": "11213",
        "area_name": "LAKHNAUR"
    },
    {
        "id": "11223",
        "area_name": "LAUKAHI"
    },
    {
        "id": "11222",
        "area_name": "GHOGHARDIHA"
    },
    {
        "id": "11224",
        "area_name": "KHUTONA"
    },
    {
        "id": "11221",
        "area_name": "PHULPARAS"
    },
    {
        "id": "11232",
        "area_name": "LAKHNAUR_NEW"
    },
    {
        "id": "11231",
        "area_name": "MADHEPUR_NEW"
    },
    {
        "id": "11323",
        "area_name": "BISHANPUR"
    },
    {
        "id": "11321",
        "area_name": "MOHANPUR"
    },
    {
        "id": "11325",
        "area_name": "NAJIPUR"
    },
    {
        "id": "11322",
        "area_name": "UJIARPUR"
    },
    {
        "id": "11324",
        "area_name": "KARPURIGRAM"
    },
    {
        "id": "11334",
        "area_name": "CHAKMEHSI"
    },
    {
        "id": "11332",
        "area_name": "MATHRAPUR"
    },
    {
        "id": "11335",
        "area_name": "KHANPUR"
    },
    {
        "id": "11333",
        "area_name": "WARISNAGAR"
    },
    {
        "id": "11331",
        "area_name": "KALYANPUR"
    },
    {
        "id": "11343",
        "area_name": "PUSA ROAD"
    },
    {
        "id": "11342",
        "area_name": "MORWA"
    },
    {
        "id": "11341",
        "area_name": "PUSA FARM"
    },
    {
        "id": "11344",
        "area_name": "TAJPUR"
    },
    {
        "id": "11412",
        "area_name": "ROSRA(R)"
    },
    {
        "id": "11417",
        "area_name": "HASSANPUR"
    },
    {
        "id": "11411",
        "area_name": "ROSRA(U)"
    },
    {
        "id": "11414",
        "area_name": "BITHAN"
    },
    {
        "id": "11418",
        "area_name": "DHUDHPURA"
    },
    {
        "id": "11421",
        "area_name": "BIBHUTIPUR_NEW"
    },
    {
        "id": "11422",
        "area_name": "NARHAN"
    },
    {
        "id": "11424",
        "area_name": "SINGHIA_NEW"
    },
    {
        "id": "11423",
        "area_name": "SHIVAJINAGAR_NEW"
    },
    {
        "id": "11511",
        "area_name": "DALSINGHSARAI"
    },
    {
        "id": "11513",
        "area_name": "PAGRA"
    },
    {
        "id": "11512",
        "area_name": "VIDHYAPATINAGAR"
    },
    {
        "id": "11524",
        "area_name": "MORWA-II"
    },
    {
        "id": "11522",
        "area_name": "PATORI"
    },
    {
        "id": "11523",
        "area_name": "MOHANPUR"
    },
    {
        "id": "11521",
        "area_name": "MOHIUDDINAGAR"
    },
    {
        "id": "11532",
        "area_name": "MUSRIGHARARI"
    },
    {
        "id": "11531",
        "area_name": "SARAIRANJAN"
    },
    {
        "id": "11533",
        "area_name": "CHAKLALSAHI"
    },
    {
        "id": "11614",
        "area_name": "BIHAT"
    },
    {
        "id": "11612",
        "area_name": "BARAUNI(R)"
    },
    {
        "id": "11611",
        "area_name": "BARAUNI"
    },
    {
        "id": "11615",
        "area_name": "TILRATH"
    },
    {
        "id": "11624",
        "area_name": "MANSOORCHAK"
    },
    {
        "id": "11622",
        "area_name": "BACHHWARA"
    },
    {
        "id": "11623",
        "area_name": "TEGHRA(R)"
    },
    {
        "id": "11621",
        "area_name": "TEGHRA"
    },
    {
        "id": "11632",
        "area_name": "BIRPUR_NEW"
    },
    {
        "id": "11631",
        "area_name": "BHAGWANPUR_NEW"
    },
    {
        "id": "11713",
        "area_name": "BEGUSARAI(W)"
    },
    {
        "id": "11714",
        "area_name": "POWER HOUSE"
    },
    {
        "id": "11716",
        "area_name": "RURAL"
    },
    {
        "id": "11724",
        "area_name": "NAOKOTHI"
    },
    {
        "id": "11721",
        "area_name": "MAJHAUL"
    },
    {
        "id": "11722",
        "area_name": "GARHPURA"
    },
    {
        "id": "11723",
        "area_name": "KHUDABANPUR"
    },
    {
        "id": "11725",
        "area_name": "BAKHRI"
    },
    {
        "id": "11731",
        "area_name": "BALIA"
    },
    {
        "id": "11732",
        "area_name": "DANDARI"
    },
    {
        "id": "11733",
        "area_name": "SAHEBPUR KAMAL"
    },
    {
        "id": "11741",
        "area_name": "MATIHANI_NEW"
    },
    {
        "id": "11742",
        "area_name": "BEGUSARAI_R_NEW"
    },
    {
        "id": "11813",
        "area_name": "NAYATOLA"
    },
    {
        "id": "11811",
        "area_name": "AGHORIA BAZAR"
    },
    {
        "id": "11812",
        "area_name": "MARIPUR"
    },
    {
        "id": "11822",
        "area_name": "SIKANDARPUR"
    },
    {
        "id": "11821",
        "area_name": "SARAIYAGANJ(1)"
    },
    {
        "id": "11832",
        "area_name": "KALYANI"
    },
    {
        "id": "11831",
        "area_name": "CHANDWARA"
    },
    {
        "id": "11833",
        "area_name": "MISCOT"
    },
    {
        "id": "11841",
        "area_name": "SARAIYAGANJ-II"
    },
    {
        "id": "11842",
        "area_name": "MIT"
    },
    {
        "id": "11914",
        "area_name": "NEURA"
    },
    {
        "id": "11913",
        "area_name": "GAIGHAT"
    },
    {
        "id": "11911",
        "area_name": "MINAPUR"
    },
    {
        "id": "11912",
        "area_name": "KATRA"
    },
    {
        "id": "11922",
        "area_name": "BARIYARPUR_NEW"
    },
    {
        "id": "11921",
        "area_name": "SAKRA_NEW"
    },
    {
        "id": "11923",
        "area_name": "MARKAN"
    },
    {
        "id": "11932",
        "area_name": "DHOLI_NEW"
    },
    {
        "id": "11933",
        "area_name": "BANDRA"
    },
    {
        "id": "11931",
        "area_name": "MUSHAHRI_NEW"
    },
    {
        "id": "12021",
        "area_name": "MOTIPUR"
    },
    {
        "id": "12022",
        "area_name": "SAHEBGANJ"
    },
    {
        "id": "12025",
        "area_name": "DHANAIYA"
    },
    {
        "id": "12023",
        "area_name": "BARURAJ"
    },
    {
        "id": "12024",
        "area_name": "KATHAIYA"
    },
    {
        "id": "12035",
        "area_name": "AROPUR"
    },
    {
        "id": "12031",
        "area_name": "SARAIYA"
    },
    {
        "id": "12033",
        "area_name": "PAROO"
    },
    {
        "id": "12032",
        "area_name": "JAITPUR"
    },
    {
        "id": "12034",
        "area_name": "DEORIYA"
    },
    {
        "id": "12046",
        "area_name": "MANIHARI"
    },
    {
        "id": "12045",
        "area_name": "KURHANI"
    },
    {
        "id": "12044",
        "area_name": "TURKI"
    },
    {
        "id": "12041",
        "area_name": "DAMODERPUR"
    },
    {
        "id": "12043",
        "area_name": "KANTI"
    },
    {
        "id": "12042",
        "area_name": "MARWAN"
    },
    {
        "id": "12134",
        "area_name": "SAHDEI"
    },
    {
        "id": "12131",
        "area_name": "MAHNAR"
    },
    {
        "id": "12133",
        "area_name": "DESARI"
    },
    {
        "id": "12141",
        "area_name": "BIDUPUR"
    },
    {
        "id": "12143",
        "area_name": "KANCHANPUR"
    },
    {
        "id": "12142",
        "area_name": "RAGHOPUR"
    },
    {
        "id": "12161",
        "area_name": "HAJIPUR_RURAL_I_NEW"
    },
    {
        "id": "12162",
        "area_name": "HAJIPUR_RURAL_II"
    },
    {
        "id": "12171",
        "area_name": "JANDAHA_NEW"
    },
    {
        "id": "12172",
        "area_name": "BASANTPUR"
    },
    {
        "id": "12215",
        "area_name": "DUMRA(R)"
    },
    {
        "id": "12216",
        "area_name": "DUMRA"
    },
    {
        "id": "12233",
        "area_name": "SUPPI"
    },
    {
        "id": "12231",
        "area_name": "BAIRGANIA"
    },
    {
        "id": "12243",
        "area_name": "RUNNISAIDPUR(S)"
    },
    {
        "id": "12241",
        "area_name": "RUNNISAIDPUR"
    },
    {
        "id": "12242",
        "area_name": "BELSAND"
    },
    {
        "id": "12244",
        "area_name": "PARSAUNI"
    },
    {
        "id": "12261",
        "area_name": "REEGA_NEW"
    },
    {
        "id": "12262",
        "area_name": "MAJORGANJ"
    },
    {
        "id": "12312",
        "area_name": "PIPRAHI"
    },
    {
        "id": "12311",
        "area_name": "SHEOHAR"
    },
    {
        "id": "12313",
        "area_name": "DUMRI KATSARI"
    },
    {
        "id": "12314",
        "area_name": "TARIYANI"
    },
    {
        "id": "12315",
        "area_name": "PURNAHIA"
    },
    {
        "id": "12423",
        "area_name": "GARKHA"
    },
    {
        "id": "12428",
        "area_name": "DORIGANJ"
    },
    {
        "id": "12427",
        "area_name": "BASANT"
    },
    {
        "id": "12421",
        "area_name": "CHAPRA(S)"
    },
    {
        "id": "12422",
        "area_name": "RIVILGANJ"
    },
    {
        "id": "12435",
        "area_name": "BANIYAPUR_II"
    },
    {
        "id": "12432",
        "area_name": "BANIYAPUR"
    },
    {
        "id": "12433",
        "area_name": "LAHLADPUR"
    },
    {
        "id": "12431",
        "area_name": "NAGRA"
    },
    {
        "id": "12434",
        "area_name": "JALALPUR"
    },
    {
        "id": "12441",
        "area_name": "EKMA_NEW"
    },
    {
        "id": "12442",
        "area_name": "TAJPUR"
    },
    {
        "id": "12443",
        "area_name": "MANJHI_NEW"
    },
    {
        "id": "12444",
        "area_name": "DAUDPUR_NEW"
    },
    {
        "id": "12514",
        "area_name": "ISHUAPUR"
    },
    {
        "id": "12511",
        "area_name": "MARHAUWARA"
    },
    {
        "id": "12515",
        "area_name": "MASHARAKH"
    },
    {
        "id": "12516",
        "area_name": "AMANOR"
    },
    {
        "id": "12513",
        "area_name": "PANAPUR"
    },
    {
        "id": "12517",
        "area_name": "MARHAUWARA(R)"
    },
    {
        "id": "12512",
        "area_name": "TARAIYA"
    },
    {
        "id": "12524",
        "area_name": "MAKER"
    },
    {
        "id": "12522",
        "area_name": "NAYAGOWN"
    },
    {
        "id": "12526",
        "area_name": "PARSA"
    },
    {
        "id": "12521",
        "area_name": "SONPUR"
    },
    {
        "id": "12525",
        "area_name": "DIGHAWARA"
    },
    {
        "id": "12532",
        "area_name": "DARIAPUR_NEW"
    },
    {
        "id": "12531",
        "area_name": "DIGHWARA(U)_NEW"
    },
    {
        "id": "12612",
        "area_name": "THAWE"
    },
    {
        "id": "12613",
        "area_name": "MANJHA"
    },
    {
        "id": "12614",
        "area_name": "GOPALGANJ(R)"
    },
    {
        "id": "12643",
        "area_name": "BAIKUNTHPUR"
    },
    {
        "id": "12644",
        "area_name": "BARAULI_II"
    },
    {
        "id": "12642",
        "area_name": "SIDHWALIA"
    },
    {
        "id": "12641",
        "area_name": "BARAULI"
    },
    {
        "id": "12727",
        "area_name": "HUSSAINIGANJ"
    },
    {
        "id": "12721",
        "area_name": "SIWAN(R)"
    },
    {
        "id": "12728",
        "area_name": "ANDAR"
    },
    {
        "id": "12726",
        "area_name": "ZIRADEI"
    },
    {
        "id": "12731",
        "area_name": "MAIRWA"
    },
    {
        "id": "12733",
        "area_name": "GUTHNI"
    },
    {
        "id": "12732",
        "area_name": "DARAULI"
    },
    {
        "id": "12753",
        "area_name": "HASANPURA"
    },
    {
        "id": "12751",
        "area_name": "CHAINPUR_NEW"
    },
    {
        "id": "12752",
        "area_name": "RAGHUNATHPUR_NEW"
    },
    {
        "id": "12812",
        "area_name": "PIPRA KOTHI"
    },
    {
        "id": "12816",
        "area_name": "BANJARIA"
    },
    {
        "id": "12813",
        "area_name": "KOTWA"
    },
    {
        "id": "12815",
        "area_name": "MOTIHARI(R)"
    },
    {
        "id": "12811",
        "area_name": "MOTIHARI TOWN(2)"
    },
    {
        "id": "12843",
        "area_name": "CHIRAIYA_NEW"
    },
    {
        "id": "12845",
        "area_name": "PATAHI_NEW"
    },
    {
        "id": "12841",
        "area_name": "DHAKA_I_NEW"
    },
    {
        "id": "12842",
        "area_name": "DHAKA_II"
    },
    {
        "id": "12844",
        "area_name": "PAKARIDAYAL_NEW"
    },
    {
        "id": "12912",
        "area_name": "RAMGARWA"
    },
    {
        "id": "12914",
        "area_name": "RAXAUL(R)"
    },
    {
        "id": "12913",
        "area_name": "SUGAULI"
    },
    {
        "id": "12923",
        "area_name": "ADAPUR"
    },
    {
        "id": "12921",
        "area_name": "GHORASAHAN"
    },
    {
        "id": "12924",
        "area_name": "BANKATWA"
    },
    {
        "id": "12922",
        "area_name": "CHHOURADANO"
    },
    {
        "id": "13012",
        "area_name": "BETTIAH TOWN(2)"
    },
    {
        "id": "13011",
        "area_name": "BETTIAH TOWN(1)"
    },
    {
        "id": "13015",
        "area_name": "MANJHAULIA"
    },
    {
        "id": "13025",
        "area_name": "SATHI"
    },
    {
        "id": "13024",
        "area_name": "NARKATIYAGANJ(R)"
    },
    {
        "id": "13021",
        "area_name": "NARKATIYAGANJ"
    },
    {
        "id": "13052",
        "area_name": "YOGAPATTI_NEW"
    },
    {
        "id": "13051",
        "area_name": "CHANPATIYA_NEW"
    },
    {
        "id": "13053",
        "area_name": "BAIRIYA_NEW"
    },
    {
        "id": "13054",
        "area_name": "KUMARBAGH"
    },
    {
        "id": "13055",
        "area_name": "NAWALPUR"
    },
    {
        "id": "13061",
        "area_name": "MAJHAULIA_NEW"
    },
    {
        "id": "13062",
        "area_name": "SARISWA BAZAR"
    },
    {
        "id": "13064",
        "area_name": "JAGDISHPUR"
    },
    {
        "id": "13063",
        "area_name": "NAUTAN_NEW"
    },
    {
        "id": "13071",
        "area_name": "SIKTA_NEW"
    },
    {
        "id": "13072",
        "area_name": "MAINATAR"
    },
    {
        "id": "13073",
        "area_name": "GAUNAHA_NEW"
    },
    {
        "id": "13113",
        "area_name": "JALALGARH_NEW"
    },
    {
        "id": "13112",
        "area_name": "KASBA_NEW"
    },
    {
        "id": "13123",
        "area_name": "PURNEA_ZERO_MILE"
    },
    {
        "id": "13121",
        "area_name": "PURNEA(R)_NEW"
    },
    {
        "id": "13122",
        "area_name": "DAGARUA_NEW"
    },
    {
        "id": "13131",
        "area_name": "BAISA_NEW"
    },
    {
        "id": "13133",
        "area_name": "AMOUR_NEW"
    },
    {
        "id": "13141",
        "area_name": "BARAIDGAH"
    },
    {
        "id": "13143",
        "area_name": "BAISI_NEW"
    },
    {
        "id": "13142",
        "area_name": "BELAGACHHI"
    },
    {
        "id": "13213",
        "area_name": "VALMIKINAGAR_NEW"
    },
    {
        "id": "13215",
        "area_name": "KUMHIA"
    },
    {
        "id": "13214",
        "area_name": "SEMRA"
    },
    {
        "id": "13212",
        "area_name": "CHAUTARAWA_NEW"
    },
    {
        "id": "13222",
        "area_name": "LAURIYA_NEW"
    },
    {
        "id": "13221",
        "area_name": "RAMNAGAR_NEW"
    },
    {
        "id": "13224",
        "area_name": "DHOBANI_DHARAMPUR"
    },
    {
        "id": "13223",
        "area_name": "RAMNAGAR(R)"
    },
    {
        "id": "13231",
        "area_name": "MADHUBANI"
    },
    {
        "id": "13232",
        "area_name": "BHITAHA"
    },
    {
        "id": "13311",
        "area_name": "MAHUA_NEW"
    },
    {
        "id": "13317",
        "area_name": "MIRZANAGAR"
    },
    {
        "id": "13314",
        "area_name": "RAJAPAKAR_NEW"
    },
    {
        "id": "13316",
        "area_name": "PIROI_MAHUA"
    },
    {
        "id": "13321",
        "area_name": "BHAGWANPUR_NEW"
    },
    {
        "id": "13324",
        "area_name": "LALGANJ_NEW"
    },
    {
        "id": "13332",
        "area_name": "DABHAICH"
    },
    {
        "id": "13333",
        "area_name": "CHEHRAKALAN"
    },
    {
        "id": "13331",
        "area_name": "PATEPUR_N"
    },
    {
        "id": "13341",
        "area_name": "VAISHALI_N"
    },
    {
        "id": "13342",
        "area_name": "BELSAR_N"
    },
    {
        "id": "13343",
        "area_name": "GORAUL_N"
    },
    {
        "id": "13411",
        "area_name": "BHAGWANPUR"
    },
    {
        "id": "13414",
        "area_name": "BELA"
    },
    {
        "id": "13413",
        "area_name": "RAMDAYALU"
    },
    {
        "id": "13412",
        "area_name": "BHIKHANPUR"
    },
    {
        "id": "13424",
        "area_name": "MATIHANI"
    },
    {
        "id": "13427",
        "area_name": "RAMPUR"
    },
    {
        "id": "13423",
        "area_name": "BOCHAHA"
    },
    {
        "id": "13422",
        "area_name": "BAIRIYA"
    },
    {
        "id": "13426",
        "area_name": "JHAPHA"
    },
    {
        "id": "13421",
        "area_name": "SKMCH"
    },
    {
        "id": "13425",
        "area_name": "AURAI_NEW"
    },
    {
        "id": "13511",
        "area_name": "SAKARI_NEW"
    },
    {
        "id": "13513",
        "area_name": "MANIGACHHI_NEW"
    },
    {
        "id": "13512",
        "area_name": "TARDIH_NEW"
    },
    {
        "id": "13523",
        "area_name": "GHANSHYAMPUR_NEW"
    },
    {
        "id": "13521",
        "area_name": "BENIPUR_NEW"
    },
    {
        "id": "13524",
        "area_name": "BENIPUR_RURAL"
    },
    {
        "id": "13522",
        "area_name": "ALINAGAR_NEW"
    },
    {
        "id": "13533",
        "area_name": "K.ASTHAN_NEW"
    },
    {
        "id": "13532",
        "area_name": "GAURA BAURAM_NEW"
    },
    {
        "id": "13534",
        "area_name": "BIRAUL_RURAL"
    },
    {
        "id": "13531",
        "area_name": "BIRAUL_NEW"
    },
    {
        "id": "13612",
        "area_name": "KHAJAULI_NEW"
    },
    {
        "id": "13611",
        "area_name": "JAINAGAR_NEW"
    },
    {
        "id": "13622",
        "area_name": "HARLAKHI_NEW"
    },
    {
        "id": "13621",
        "area_name": "BASOPATTI_NEW"
    },
    {
        "id": "13623",
        "area_name": "KALUAHI_NEW"
    },
    {
        "id": "13631",
        "area_name": "LADANIYA_NEW"
    },
    {
        "id": "13632",
        "area_name": "BABUBARHI_NEW"
    },
    {
        "id": "13711",
        "area_name": "SIMRIBKHTYRPUR_NEW"
    },
    {
        "id": "13712",
        "area_name": "BALWAHAT"
    },
    {
        "id": "13714",
        "area_name": "SALKHUA_NEW"
    },
    {
        "id": "13713",
        "area_name": "KADUMBER"
    },
    {
        "id": "13715",
        "area_name": "ALANI"
    },
    {
        "id": "13722",
        "area_name": "MAURA"
    },
    {
        "id": "13723",
        "area_name": "PATARGHAT_NEW"
    },
    {
        "id": "13721",
        "area_name": "SONBARSA_NEW"
    },
    {
        "id": "13724",
        "area_name": "BANMA ITAHARI_NEW"
    },
    {
        "id": "13811",
        "area_name": "BIRPUR_NEW"
    },
    {
        "id": "13812",
        "area_name": "CHHATAPUR_NEW"
    },
    {
        "id": "13821",
        "area_name": "RAGHOPUR_NEW"
    },
    {
        "id": "13824",
        "area_name": "KARIJAN"
    },
    {
        "id": "13823",
        "area_name": "SARAIGARH_N"
    },
    {
        "id": "13822",
        "area_name": "PRATAPGANJ_NEW"
    },
    {
        "id": "13832",
        "area_name": "MARAUNA_NEW"
    },
    {
        "id": "13831",
        "area_name": "NIRMALI_NEW"
    },
    {
        "id": "13914",
        "area_name": "UDAKISHUNGANJ_WEST"
    },
    {
        "id": "13912",
        "area_name": "GWALPARA_NEW"
    },
    {
        "id": "13913",
        "area_name": "BIHARIGANJ_NEW"
    },
    {
        "id": "13911",
        "area_name": "UDAKISHUNGANJ_NEW"
    },
    {
        "id": "13923",
        "area_name": "PURAINI"
    },
    {
        "id": "13922",
        "area_name": "CHAUSA_NEW"
    },
    {
        "id": "13921",
        "area_name": "ALAMNAGAR_NEW"
    },
    {
        "id": "14013",
        "area_name": "CHIRAUT"
    },
    {
        "id": "14011",
        "area_name": "PUPRI_NEW"
    },
    {
        "id": "14012",
        "area_name": "BAJPATTI_NEW"
    },
    {
        "id": "14021",
        "area_name": "BATHNAHA_N"
    },
    {
        "id": "14022",
        "area_name": "SONBERSA_N"
    },
    {
        "id": "14023",
        "area_name": "SAHIYARA"
    },
    {
        "id": "14024",
        "area_name": "BHUTAHI"
    },
    {
        "id": "14031",
        "area_name": "SURSAND_N"
    },
    {
        "id": "14032",
        "area_name": "PARIHAR_N"
    },
    {
        "id": "14033",
        "area_name": "BELA_PUPRI"
    },
    {
        "id": "14042",
        "area_name": "BOKHRA"
    },
    {
        "id": "14041",
        "area_name": "NANPUR_NEW"
    },
    {
        "id": "14111",
        "area_name": "CHAKIA_NEW"
    },
    {
        "id": "14112",
        "area_name": "MEHASI_NEW"
    },
    {
        "id": "14123",
        "area_name": "HARSIDHI_NEW"
    },
    {
        "id": "14121",
        "area_name": "ARERAJ_NEW"
    },
    {
        "id": "14122",
        "area_name": "PAHARPUR_NEW"
    },
    {
        "id": "14124",
        "area_name": "SANGRAMPUR"
    },
    {
        "id": "14132",
        "area_name": "TETARIA_NEW"
    },
    {
        "id": "14131",
        "area_name": "MADHUBAN_NEW"
    },
    {
        "id": "14141",
        "area_name": "KESARIYA_NEW"
    },
    {
        "id": "14142",
        "area_name": "KALYANPUR_NEW"
    },
    {
        "id": "14213",
        "area_name": "MIRGANJ_NEW"
    },
    {
        "id": "14211",
        "area_name": "HATHUWA_NEW"
    },
    {
        "id": "14215",
        "area_name": "PHULWARIA_NEW"
    },
    {
        "id": "14214",
        "area_name": "UCHKAGOWAN_NEW"
    },
    {
        "id": "14212",
        "area_name": "HATHUWA_II"
    },
    {
        "id": "14221",
        "area_name": "KUCHAIKOT_NEW"
    },
    {
        "id": "14222",
        "area_name": "PANCH DEORI_NEW"
    },
    {
        "id": "14223",
        "area_name": "BALVANTSAGAR"
    },
    {
        "id": "14224",
        "area_name": "PATTICHAKRAGOPI"
    },
    {
        "id": "14231",
        "area_name": "BHORE_NEW"
    },
    {
        "id": "14232",
        "area_name": "VIJAYPUR_NEW"
    },
    {
        "id": "14233",
        "area_name": "KATYA_NEW"
    },
    {
        "id": "14311",
        "area_name": "MAHARAJGANJ_NEW"
    },
    {
        "id": "14312",
        "area_name": "DURAUNDA"
    },
    {
        "id": "14321",
        "area_name": "BASANTPUR_NEW"
    },
    {
        "id": "14323",
        "area_name": "LAKRINABIGANJ"
    },
    {
        "id": "14322",
        "area_name": "GORIYAKOTHI_NEW"
    },
    {
        "id": "14331",
        "area_name": "PACHRUKHI_NEW"
    },
    {
        "id": "14333",
        "area_name": "JAMO"
    },
    {
        "id": "14332",
        "area_name": "BARHARIA_NEW"
    },
    {
        "id": "14413",
        "area_name": "HASANGANJ"
    },
    {
        "id": "14412",
        "area_name": "PRANPUR_NEW"
    },
    {
        "id": "14411",
        "area_name": "DANDKHORA_NEW"
    },
    {
        "id": "14424",
        "area_name": "SALMARI"
    },
    {
        "id": "14421",
        "area_name": "BARSOI_NEW"
    },
    {
        "id": "14422",
        "area_name": "BALRAMPUR_NEW"
    },
    {
        "id": "14423",
        "area_name": "ABADPUR"
    },
    {
        "id": "14432",
        "area_name": "KADWA_SOUTH"
    },
    {
        "id": "14431",
        "area_name": "KADWA_NEW"
    },
    {
        "id": "14433",
        "area_name": "AZAMNAGAR_NEW"
    },
    {
        "id": "14511",
        "area_name": "BAHADURGANJ_NEW"
    },
    {
        "id": "14513",
        "area_name": "ALTABARI"
    },
    {
        "id": "14512",
        "area_name": "BAHADURGANJ_RURAL"
    },
    {
        "id": "14525",
        "area_name": "POWAKHALI"
    },
    {
        "id": "14523",
        "area_name": "POTHIA_NEW"
    },
    {
        "id": "14522",
        "area_name": "THAKURGANJ(U)"
    },
    {
        "id": "14527",
        "area_name": "CHHATTARGACHHI"
    },
    {
        "id": "14526",
        "area_name": "FOLA"
    },
    {
        "id": "14521",
        "area_name": "THAKURGANJ(R)_NEW"
    },
    {
        "id": "14524",
        "area_name": "GALWALIA"
    },
    {
        "id": "14531",
        "area_name": "DIGHALBANK_NEW"
    },
    {
        "id": "14533",
        "area_name": "PATTARGACHH"
    },
    {
        "id": "14532",
        "area_name": "TERAGACHH_NEW"
    },
    {
        "id": "14612",
        "area_name": "ARARIA(R)_NEW"
    },
    {
        "id": "14613",
        "area_name": "BOCHI_NEW"
    },
    {
        "id": "14622",
        "area_name": "PALASI_NEW"
    },
    {
        "id": "14623",
        "area_name": "SIKTI_NEW"
    },
    {
        "id": "14624",
        "area_name": "MAHALGAON"
    },
    {
        "id": "14621",
        "area_name": "JOKIHAT_NEW"
    },
    {
        "id": "14632",
        "area_name": "BHARGAMA_NEW"
    },
    {
        "id": "14631",
        "area_name": "RANIGANJ_NEW"
    },
    {
        "id": "14633",
        "area_name": "GUNWANTI"
    }
]

export const getReadingsSummary = createAsyncThunk('readings/remarks', 
	async (payload, {getState}) => {
        let {users} = getState();
        return await axios.get(`https://mr.bharatsmr.com/dashboard/sectionAnalysis?filter=${users.agency}&boardCode=${users.boardCode}&subDiv=${payload.subDiv}&sectionCode=${payload.sectionCode}&startDate=${users.startDate}&endDate=${users.endDate}`)
        .then(res => {
            return {data:res.data.remarkCounts,count:res.data.remarkCounts.length,startDate:payload.startDate,endDate:payload.endDate}
        })
	}
)

export const sectionSummarySlice = createSlice({
	name: 'remarks',
	initialState: {
        loading: true,
        error: false,
        data: [],
        count: 0,
        subDiv:null,
        section:null,
        area:null,
        startDate:'',
        endDate:''
    },
	extraReducers: {
		[getReadingsSummary.pending]: (state) => {
            state.loading = true
            state.error = false
		},
		[getReadingsSummary.fulfilled]: (state, action) => {
            state.loading = false
            state.error = false
            state.data = action.payload.data
            state.startDate = action.payload.startDate
            state.endDate = action.payload.endDate
		},
		[getReadingsSummary.rejected]: (state) => {
			state.loading = false
            state.error = true
		},
	}
	
});

export default sectionSummarySlice.reducer;