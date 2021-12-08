export const BASE_URL = '/covid19india-react-clone/';

export const UNASSIGNED_STATE_CODE = 'UN';
export const STATE_NAMES: {
  [stateCode: string]: string;
} = {
  AP: 'Andhra Pradesh',
  AR: 'Arunachal Pradesh',
  AS: 'Assam',
  BR: 'Bihar',
  CT: 'Chhattisgarh',
  GA: 'Goa',
  GJ: 'Gujarat',
  HR: 'Haryana',
  HP: 'Himachal Pradesh',
  JH: 'Jharkhand',
  KA: 'Karnataka',
  KL: 'Kerala',
  MP: 'Madhya Pradesh',
  MH: 'Maharashtra',
  MN: 'Manipur',
  ML: 'Meghalaya',
  MZ: 'Mizoram',
  NL: 'Nagaland',
  OR: 'Odisha',
  PB: 'Punjab',
  RJ: 'Rajasthan',
  SK: 'Sikkim',
  TN: 'Tamil Nadu',
  TG: 'Telangana',
  TR: 'Tripura',
  UT: 'Uttarakhand',
  UP: 'Uttar Pradesh',
  WB: 'West Bengal',
  AN: 'Andaman and Nicobar Islands',
  CH: 'Chandigarh',
  DN: 'Dadra and Nagar Haveli and Daman and Diu',
  DL: 'Delhi',
  JK: 'Jammu and Kashmir',
  LA: 'Ladakh',
  LD: 'Lakshadweep',
  PY: 'Puducherry',
  TT: 'India',
  [UNASSIGNED_STATE_CODE]: 'Unassigned',
};

const stateCodes: { code: string; name: string }[] = [];
const stateCodesMap: {
  [stateName: string]: string;
} = {};
Object.keys(STATE_NAMES).map((key, _) => {
  stateCodesMap[STATE_NAMES[key]] = key;
  stateCodes.push({ code: key, name: STATE_NAMES[key] });
  return null;
});
export const STATE_CODES = stateCodesMap;
export const STATE_CODES_ARRAY = stateCodes;

// A.k.a "Table-Columns"
export const STATISTIC_CONFIGS = {
  confirmed: {
    displayName: 'confirmed',
    color: '#ff073a',
    format: 'long',
    showDelta: true,
    hasPrimary: true,
  },
  active: {
    displayName: 'active',
    color: '#007bff',
    format: 'long',
    hasPrimary: true,
  },
  recovered: {
    displayName: 'recovered',
    color: '#28a745',
    format: 'long',
    showDelta: true,
    hasPrimary: true,
  },
  deceased: {
    displayName: 'deceased',
    color: '#6c757d',
    format: 'long',
    showDelta: true,
    hasPrimary: true,
  },
  other: {
    displayName: 'other',
    format: 'long',
    color: '#fd7e14',
    showDelta: true,
    tableConfig: {
      notes: 'Migrated cases or non-COVID deaths',
    },
    hasPrimary: true,
  },
  tested: {
    displayName: 'tested',
    color: '#4b1eaa',
    format: 'short',
    showDelta: true,
    hideZero: true,
    category: 'tested',
  },
  vaccinated1: {
    displayName: 'vaccinated (at least one dose)',
    color: '#fb5581',
    format: 'short',
    showDelta: true,
    hideZero: true,
    category: 'vaccinated',
  },
  vaccinated2: {
    displayName: 'fully vaccinated',
    color: '#fb5581',
    format: 'short',
    showDelta: true,
    hideZero: true,
    category: 'vaccinated',
  },
  vaccinated: {
    displayName: 'vaccine doses administered',
    color: '#fb5581',
    format: 'short',
    showDelta: true,
    hideZero: true,
    category: 'vaccinated',
  },
  tpr: {
    displayName: 'test positivity ratio',
    format: '%',
    color: '#fd7e14',
    nonLinear: true,
    onlyDelta7: true,
    hideZero: true,
    category: 'tested',
    tableConfig: {
      notes: 'Calculated over last 7 days',
    },
    hasPrimary: true,
  },
  cfr: {
    displayName: 'case fatality ratio',
    format: '%',
    color: '#fd7e14',
    nonLinear: true,
    hasPrimary: true,
  },
  recoveryRatio: {
    displayName: 'recovery ratio',
    format: '%',
    nonLinear: true,
    tableConfig: {
      hide: true,
    },
    hasPrimary: true,
  },
  activeRatio: {
    displayName: 'active ratio',
    format: '%',
    nonLinear: true,
    tableConfig: {
      hide: true,
    },
    hasPrimary: true,
  },
  caseGrowth: {
    displayName: 'Case Growth',
    format: '%',
    nonLinear: true,
    canBeInfinite: true,
    tableConfig: {
      notes:
        'Percentage growth of cases last week compared to the week a fortnight ago',
    },
    hasPrimary: true,
    mapConfig: {
      transformFn: (val: number): string | undefined => {
        if (val <= 0) return '≤ 0%';
        if (val <= 20) return '0 - 20%';
        if (val <= 50) return '20 - 50%';
        if (val > 50) return '> 50%';
      },
      // d3 scale
      // colorScale: scaleOrdinal(
      //   ['≤ 0%', '0 - 20%', '20 - 50%', '> 50%'],
      //   ['#1a9850', '#fee08b', '#fc8d59', '#d73027']
      // ),
    },
  },
  population: {
    displayName: 'population',
    format: 'short',
    color: '#b6854d',
    hideZero: true,
    mapConfig: {
      spike: true,
    },
  },
};

export const TESTED_EXPIRING_DAYS = 7;
export const LOCALE_SHORTHANDS = {
  english: 'en-US',
  hindi: 'hi',
  telugu: 'te',
  kannada: 'en-US',
  gujarati: 'gu',
  marathi: 'en-US',
  tamil: 'ta',
  bengali: 'bn',
  punjabi: 'en-US',
  malayalam: 'en-US',
  odiya: 'en-US',
};
export const ISO_DATE_REGEX = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/g;
export const INDIA_ISO_SUFFIX = 'T00:00:00+05:30';
