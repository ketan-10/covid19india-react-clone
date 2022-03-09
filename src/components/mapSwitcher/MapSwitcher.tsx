import classNames from 'classnames';
import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, useTransition, animated, config } from 'react-spring';
import { useMeasure } from 'react-use';
import { PRIMARY_STATISTICS, STATISTIC_CONFIGS } from '../../Constants';

const MapSwitcher: React.FC = () => {
  const [status, setStatus] = useState<typeof PRIMARY_STATISTICS[number]>(
    PRIMARY_STATISTICS[0]
  );
  const [mapSwitcherRef, { width }] = useMeasure<HTMLDivElement>();
  // is animation in progress
  const [isAnimating, setIsAnimating] = useState(false);
  const [spring, api] = useSpring(() => ({
    x: 0,
    opacity: 0,
    background: 'transparent',
    config: config.gentle,
  }));

  useEffect(() => {
    api.start({
      x: (width * PRIMARY_STATISTICS.indexOf(status)) / 4,
      background: `${STATISTIC_CONFIGS[status].color ?? '0'}20`,
      opacity: 1,
      onStart: setIsAnimating.bind(this, true),
      onRest: setIsAnimating.bind(this, false),
    });
  }, [api, status, width]);

  return (
    <>
      <animated.div
        style={{
          width: '25%',
          height: '100%',
          position: 'absolute',
          borderRadius: '5px',
          ...spring,
        }}
      />
      <div className="map-switcher" ref={mapSwitcherRef}>
        {PRIMARY_STATISTICS.map((stat) => (
          <div
            key={stat}
            onClick={() => setStatus(stat)}
            className={classNames('clickable', {
              [`is-${stat}`]: !isAnimating,
            })}
          />
        ))}
      </div>
    </>
  );
};

export default MapSwitcher;
