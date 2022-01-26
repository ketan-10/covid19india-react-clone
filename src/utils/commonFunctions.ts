import {
  differenceInDays,
  format,
  formatDistance,
  formatISO,
  subDays,
  Locale,
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import i18n from 'i18next';

import { Data } from '../types/Types';
import {
  STATISTIC_CONFIGS,
  TESTED_EXPIRING_DAYS,
  LOCALE_SHORTHANDS,
  ISO_DATE_REGEX,
  INDIA_ISO_SUFFIX,
} from '../Constants';
// retry Promise : https://github.com/ketan-10/Testing/blob/master/coroutine-async-await/retry-promise.js
export function retry<T>(
  fn: () => Promise<T>,
  retriesLeft = 5,
  interval = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          }

          // Passing on "reject" is the important part
          retry(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
}

// whole lot of math to determine the column values from the data
export const getStatistic = (
  data: Data[''] | undefined,
  type: 'delta' | 'delta7' | 'total',
  statistic: keyof typeof STATISTIC_CONFIGS,
  {
    expiredDate = null,
    normalizedByPopulationPer = null,
    movingAverage = false,
    canBeNaN = false,
  } = {}
): number => {
  if (expiredDate !== null) {
    const statisticConfig = STATISTIC_CONFIGS[statistic];
    if (statisticConfig?.category === 'tested') {
      if (
        !data?.meta?.tested?.date ||
        differenceInDays(
          parseIndiaDate(expiredDate),
          parseIndiaDate(data.meta.tested.date)
        ) > TESTED_EXPIRING_DAYS
      ) {
        return 0;
      }
    }
  }

  let multiplyFactor = 1;
  if (type === 'delta' && movingAverage) {
    // eslint-disable-next-line no-param-reassign
    type = 'delta7';
    multiplyFactor *= 1 / 7;
  }

  // per lakh calculations
  if (normalizedByPopulationPer === 'million') {
    multiplyFactor *= 1e6 / (data?.meta?.population ?? 0);
  } else if (normalizedByPopulationPer === 'lakh') {
    multiplyFactor *= 1e5 / (data?.meta?.population ?? 0);
  } else if (normalizedByPopulationPer === 'hundred') {
    multiplyFactor *= 1e2 / (data?.meta?.population ?? 0);
  }

  let val = 0;
  if (statistic === 'active' || statistic === 'activeRatio') {
    const confirmed = data?.[type]?.confirmed || 0;
    const deceased = data?.[type]?.deceased || 0;
    const recovered = data?.[type]?.recovered || 0;
    const other = data?.[type]?.other || 0;
    const active = confirmed - deceased - recovered - other;
    if (statistic === 'active') {
      val = active;
    } else if (statistic === 'activeRatio') {
      val = 100 * (active / confirmed);
    }
  } else if (statistic === 'vaccinated') {
    const dose1 = data?.[type]?.vaccinated1 || 0;
    const dose2 = data?.[type]?.vaccinated2 || 0;
    val = dose1 + dose2;
  } else if (statistic === 'tpr') {
    const confirmed = data?.[type]?.confirmed || 0;
    const tested = data?.[type]?.tested || 0;
    val = 100 * (confirmed / tested);
  } else if (statistic === 'cfr') {
    const deceased = data?.[type]?.deceased || 0;
    const confirmed = data?.[type]?.confirmed || 0;
    val = 100 * (deceased / confirmed);
  } else if (statistic === 'recoveryRatio') {
    const recovered = data?.[type]?.recovered || 0;
    const confirmed = data?.[type]?.confirmed || 0;
    val = 100 * (recovered / confirmed);
  } else if (statistic === 'caseGrowth') {
    const confirmedDeltaLastWeek = data?.delta7?.confirmed || 0;
    const confirmedDeltaTwoWeeksAgo = data?.delta21_14?.confirmed || 0;
    val =
      type === 'total'
        ? 100 *
          ((confirmedDeltaLastWeek - confirmedDeltaTwoWeeksAgo) /
            confirmedDeltaTwoWeeksAgo)
        : 0;
  } else if (statistic === 'population') {
    val = type === 'total' ? data?.meta?.population ?? 0 : 0;
  } else {
    val = data?.[type]?.[statistic] ?? 0;
  }

  const statisticConfig = STATISTIC_CONFIGS[statistic];
  multiplyFactor = (statisticConfig?.nonLinear && 1) || multiplyFactor;

  let result = multiplyFactor * val;
  if (!canBeNaN) {
    result = (!Number.isNaN(result) && result) || 0;
  }
  if (!statisticConfig?.canBeInfinite) {
    result = ((Number.isNaN(result) || Number.isFinite(result)) && result) || 0;
  }
  return result;
};

// dates

let locale: Locale | undefined;
const getLocale = () => {
  import('date-fns/locale').then((localePackage) => {
    locale = localePackage[
      LOCALE_SHORTHANDS[
        (i18n.language ||
          window.localStorage.i18nextLng) as keyof typeof LOCALE_SHORTHANDS
      ]
    ] as Locale;
  });
};

export const getIndiaDate = (): ReturnType<typeof utcToZonedTime> =>
  utcToZonedTime(new Date(), 'Asia/Kolkata');

export const getIndiaDateISO = (): ReturnType<typeof formatISO> =>
  formatISO(getIndiaDate(), { representation: 'date' });

export const getIndiaDateYesterday = (): ReturnType<typeof subDays> =>
  subDays(getIndiaDate(), 1);

export const getIndiaDateYesterdayISO = (): ReturnType<typeof formatISO> =>
  formatISO(getIndiaDateYesterday(), { representation: 'date' });

export const formatLastUpdated = (
  unformattedDate: Date | string
): ReturnType<typeof formatDistance> => {
  getLocale();
  return formatDistance(new Date(unformattedDate), new Date(), {
    locale,
  });
};

export const parseIndiaDate = (
  unformattedDate: Date | string
): ReturnType<typeof utcToZonedTime> => {
  if (!unformattedDate) {
    return getIndiaDate();
  }
  if (
    typeof unformattedDate === 'string' &&
    unformattedDate.match(ISO_DATE_REGEX)
  ) {
    // eslint-disable-next-line no-param-reassign
    unformattedDate += INDIA_ISO_SUFFIX;
  }
  return utcToZonedTime(new Date(unformattedDate), 'Asia/Kolkata');
};

export const formatDate = (
  unformattedDate: Date | string,
  formatString: string
): string => {
  if (!unformattedDate) return '';
  if (
    typeof unformattedDate === 'string' &&
    unformattedDate.match(ISO_DATE_REGEX)
  )
    // eslint-disable-next-line no-param-reassign
    unformattedDate += INDIA_ISO_SUFFIX;
  const date = utcToZonedTime(new Date(unformattedDate), 'Asia/Kolkata');
  return format(date, formatString, {
    locale,
  });
};

export const formatDateObjIndia = (
  dateObj: Date | number
): ReturnType<typeof format> =>
  format(dateObj, "yyyy-MM-dd'T'HH:mm:ss+05:30", {
    locale,
  });

// formatting
const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
});
export const abbreviateNumber = (number: number): string => {
  const numberCleaned = Math.round(Math.abs(number));
  if (numberCleaned < 1e3) return numberFormatter.format(Math.floor(number));
  if (numberCleaned >= 1e3 && numberCleaned < 1e5)
    return `${numberFormatter.format(number / 1e3)}K`;
  if (numberCleaned >= 1e5 && numberCleaned < 1e7)
    return `${numberFormatter.format(number / 1e5)}L`;
  if (numberCleaned >= 1e7 && numberCleaned < 1e10)
    return `${numberFormatter.format(number / 1e7)}Cr`;
  if (numberCleaned >= 1e10 && numberCleaned < 1e14)
    return `${numberFormatter.format(number / 1e10)}K Cr`;
  if (numberCleaned >= 1e14)
    return `${numberFormatter.format(number / 1e14)}L Cr`;
  return '';
};

export const formatNumber = (
  value: number,
  option = '',
  statistic?: keyof typeof STATISTIC_CONFIGS
): string => {
  if (
    Number.isNaN(value) ||
    (statistic && STATISTIC_CONFIGS[statistic]?.hideZero && value === 0)
  ) {
    return '-';
  }
  if (option === 'long') {
    return numberFormatter.format(
      Math.abs(value) < 1 ? value : Math.round(value)
    );
  }
  if (option === 'short') {
    return abbreviateNumber(value);
  }
  if (option === '%') {
    return `${numberFormatter.format(value)}%`;
  }
  if (option === '') {
    return numberFormatter.format(value);
  }
  return '';
};

export const toTitleCase = (str: string): string =>
  str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
