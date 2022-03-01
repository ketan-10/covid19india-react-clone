import React from 'react';
import classNames from 'classnames';
import { Data } from '../../types/Types';
import { STATISTIC_CONFIGS } from '../../Constants';
import { getStatistic, formatNumber } from '../../utils/commonFunctions';

interface CellProps {
  stateDetails: Data[''];
  statistic: keyof typeof STATISTIC_CONFIGS;
}
const Cell: React.FC<CellProps> = ({ stateDetails, statistic }) => {
  const result = getStatistic(stateDetails, 'total', statistic);

  const isDelta = STATISTIC_CONFIGS[statistic].showDelta;

  const delta = getStatistic(stateDetails, 'delta', statistic);
  const formatted = formatNumber(
    result,
    STATISTIC_CONFIGS[statistic].format,
    statistic
  );

  const formattedDelta =
    // eslint-disable-next-line no-nested-ternary
    delta > 0
      ? `\u2191${formatNumber(delta, STATISTIC_CONFIGS[statistic].format)}`
      : delta < 0
      ? `\u2193${formatNumber(
          Math.abs(delta),
          STATISTIC_CONFIGS[statistic].format
        )}`
      : '';
  return (
    <div className="cell cell--detail">
      {isDelta && (
        <div className={classNames('delta', `is-${statistic}`)}>
          {formattedDelta}
        </div>
      )}
      <div>{Number.isNaN(formatted) ? '-' : formatted}</div>
    </div>
  );
};
export default Cell;
