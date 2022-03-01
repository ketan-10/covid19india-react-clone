import classNames from 'classnames';
import React from 'react';
import { PRIMARY_STATISTICS } from '../../Constants';
import { camelCase } from '../../utils/commonFunctions';

const Level: React.FC = () => (
  <div className="levels">
    {PRIMARY_STATISTICS.map((stat) => (
      <div key={stat} className={classNames('level', `is-${stat}`)}>
        <h5>{camelCase(stat)}</h5>
        <h4>+ 1172</h4>
        <h1>3,84,022</h1>
      </div>
    ))}
  </div>
);

export default Level;
