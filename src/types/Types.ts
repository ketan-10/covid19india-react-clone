import { STATISTIC_CONFIGS } from '../Constants';

export type Page = {
  pageLink: string;
  view: JSX.Element;
  displayName: string;
  showInNavbar: boolean;
};

export interface DomEvent extends Event {
  target: HTMLElement;
}

// https://stackoverflow.com/questions/55773761/converting-object-to-union-type
// https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union
type ObjectUnionType<T> = T[keyof T];
export type Filter<T, U> = Extract<ObjectUnionType<T>, U>; // type Extract<T, U> = T extends U ? T : never;

// https://data.covid19india.org/documentation/v4_data.html

export type DataBasicType = {
  confirmed?: number;
  deceased?: number;
  other?: number;
  recovered?: number;
  tested?: number;
  vaccinated1?: number;
  vaccinated2?: number;
};

export type Data = {
  [StateCode: string]: {
    delta?: DataBasicType;
    delta7?: DataBasicType;
    // two weeks confirmed
    // eslint-disable-next-line camelcase
    delta21_14?: DataBasicType;
    districts: {
      [DistrictName: string]: {
        delta?: DataBasicType;
        delta7?: DataBasicType;
        meta?: {
          population?: number;
          tested?: {
            // eslint-disable-next-line camelcase
            last_updated?: string;
            source?: string;
          };
          notes?: string;
        };
        total?: DataBasicType;
      };
    };
    meta?: {
      // eslint-disable-next-line camelcase
      last_updated?: string;
      population?: number;
      tested?: {
        // eslint-disable-next-line camelcase
        last_updated?: string;
        source?: string;
        date?: string;
      };
      notes?: string;
    };
    total?: DataBasicType;
  };
};

// Home Table SortConfig Type
export type SortConfigType = {
  column: keyof typeof STATISTIC_CONFIGS | 'regionName';
  isAscending: boolean;
  isDelta: boolean;
};
