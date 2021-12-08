import React, { useState, useCallback } from 'react';
import { SortAscIcon, SortDescIcon } from '@primer/octicons-react';
import produce from 'immer';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';
import { STATE_NAMES, STATISTIC_CONFIGS } from '../Constants';
import { Data, SortConfigType, Filter } from '../types/Types';
import { getStatistic } from '../utils/commonFunctions';
import HeaderCell from './HeaderCell';
import Cell from './Cell';

const Table: React.FC = () => {
  // move data loading to main component
  // https://data.covid19india.org/documentation/v4_data.html
  const { data } = useSWR<Data>(
    'https://data.covid19india.org/v4/min/data.min.json',
    (link) => fetch(link).then((res) => res.json()), // we can generate uniques 'key' here and append it to the data.
    {
      revalidateOnMount: true,
      suspense: true, // fallback to top-most suspense till load
      // also as suspense data will never be null -> https://swr.vercel.app/docs/suspense
    }
  );

  const { t } = useTranslation();

  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    column: 'confirmed',
    isAscending: true,
    isDelta: false,
  });

  const handleSortClick = useCallback(
    (statistic: keyof typeof STATISTIC_CONFIGS | 'regionName') => {
      // following logic is related to table not the header cell -> header cell should just say it was clicked
      if (sortConfig.column !== statistic) {
        setSortConfig(
          produce(sortConfig, (mutableSortConfig) => {
            mutableSortConfig.column = statistic;
          })
        );
      } else {
        setSortConfig(
          produce(sortConfig, (mutableSortConfig) => {
            mutableSortConfig.isAscending = !sortConfig.isAscending;
          })
        );
      }
    },
    [sortConfig, setSortConfig]
  );

  const sortingFunction = useCallback(
    (a: string, b: string) => {
      if (!data || !a || !b) return 0;
      if (a === 'TT' || b === 'TT') return a === 'TT' ? 1 : -1;

      if (sortConfig.column === 'regionName') {
        const regionNameA = STATE_NAMES[a];
        const regionNameB = STATE_NAMES[b];

        return sortConfig.isAscending
          ? regionNameA.localeCompare(regionNameB)
          : regionNameB.localeCompare(regionNameA);
      }
      const statisticConfig = STATISTIC_CONFIGS[sortConfig.column] as Filter<
        typeof STATISTIC_CONFIGS,
        { showDelta: boolean }
      >;
      const type =
        sortConfig.isDelta && statisticConfig?.showDelta ? 'delta' : 'total';

      const aValue = getStatistic(data[a], type, sortConfig.column);

      const bValue = getStatistic(data[b], type, sortConfig.column);

      return sortConfig.isAscending ? bValue - aValue : aValue - bValue;
    },
    [sortConfig, data]
  );

  const statisticConfig = Object.keys(STATISTIC_CONFIGS)
    .filter((_statistic) => {
      const statistic = _statistic as keyof typeof STATISTIC_CONFIGS;
      return !(
        STATISTIC_CONFIGS[statistic] as Filter<
          typeof STATISTIC_CONFIGS,
          {
            tableConfig: {
              hide: boolean;
            };
          }
        >
      )?.tableConfig?.hide;
    })
    .reduce((config, _statistic) => {
      const statistic = _statistic as Exclude<
        keyof typeof STATISTIC_CONFIGS,
        keyof { tableConfig: { hide: boolean } }
      >;
      return { ...config, ...{ [statistic]: STATISTIC_CONFIGS[statistic] } };
    }, {});

  // return data ? <div>je;;p</div> : <h1>Loading</h1>;
  return !data ? (
    <div />
  ) : (
    <div
      className="table"
      style={
        {
          '--columns': Object.keys(statisticConfig).length + 1,
        } as React.CSSProperties
      }
    >
      <div className="row row--header">
        <div
          className="cell cell--statistic"
          onClick={() => handleSortClick('regionName')}
        >
          {sortConfig.column === 'regionName' && (
            <div className="sort-icon">
              {sortConfig.isAscending ? (
                <SortAscIcon size={12} />
              ) : (
                <SortDescIcon size={12} />
              )}
            </div>
          )}

          <div>{t('State/UT')}</div>
        </div>
        {Object.keys(statisticConfig).map((_statistic) => {
          const statistic = _statistic as keyof typeof STATISTIC_CONFIGS;
          return (
            <HeaderCell
              key={statistic}
              statistic={statistic}
              handleSortClick={handleSortClick}
              setSortConfig={setSortConfig}
              sortConfig={sortConfig}
            />
          );
        })}
      </div>
      {Object.keys(data)
        .sort(sortingFunction)
        .map((stateCode) => {
          const stateDetails = data[stateCode];
          return (
            <div key={stateCode} className="row row--detail">
              <div className="cell cell--state-header">
                {t(STATE_NAMES[stateCode])}
              </div>
              {Object.keys(statisticConfig).map((_statistic) => {
                const statistic = _statistic as keyof typeof STATISTIC_CONFIGS;
                return (
                  <Cell
                    stateDetails={stateDetails}
                    statistic={statistic}
                    key={statistic}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

export default Table;
