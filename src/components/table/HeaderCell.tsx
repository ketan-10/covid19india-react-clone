import React, { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useLongPress } from 'react-use';
import produce from 'immer';
import { SortAscIcon, SortDescIcon } from '@primer/octicons-react';
import classNames from 'classnames';
import { STATISTIC_CONFIGS } from '../../Constants';
import { SortConfigType } from '../../types/Types';
import { toTitleCase } from '../../utils/commonFunctions';

// as header cell have he sorting functionality.
// we have a question of where to handel it.
// either we can just handel what will be displayed in the header cell here
// and pass the onClick function back to parent.

interface HeaderCellProps {
  statistic: keyof typeof STATISTIC_CONFIGS;
  handleSortClick: (statistic: keyof typeof STATISTIC_CONFIGS) => void;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfigType>>;
  sortConfig: SortConfigType;
}

const HeaderCell: React.FC<HeaderCellProps> = ({
  statistic,
  handleSortClick,
  setSortConfig,
  sortConfig,
}) => {
  const { t } = useTranslation();
  // useRef is used to ignore false click after mouse-up on double click.
  const isDoubleClicking = useRef(false);
  const handleLongPress = useCallback(() => {
    if (statistic !== sortConfig.column) {
      return;
    }
    isDoubleClicking.current = true;
    setSortConfig(
      produce(sortConfig, (mutableSortConfig) => {
        mutableSortConfig.isDelta = !sortConfig.isDelta;
      })
    );
  }, [statistic, sortConfig, setSortConfig]);

  const handleClick = useCallback(() => {
    if (isDoubleClicking.current) {
      isDoubleClicking.current = false;
      return;
    }
    handleSortClick(statistic);
  }, [statistic, handleSortClick, isDoubleClicking]);

  // if preventDefault is not false it's rejecting the click event `handleClick`
  const longPressEvent = useLongPress(handleLongPress, {
    isPreventDefault: false,
  });

  return (
    <div
      className="cell cell--statistic"
      onClick={() => handleClick()}
      {...longPressEvent}
    >
      {statistic === sortConfig.column && (
        <div
          className={classNames('sort-icon', {
            [`is-${statistic}`]: sortConfig.isDelta,
          })}
        >
          {sortConfig.isAscending ? (
            <SortAscIcon size={12} />
          ) : (
            <SortDescIcon size={12} />
          )}
        </div>
      )}
      <div>
        {t(toTitleCase(STATISTIC_CONFIGS[statistic].displayName ?? ''))}
      </div>
    </div>
  );
};

export default HeaderCell;
