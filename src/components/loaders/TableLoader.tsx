import React from 'react';
import ContentLoader from 'react-content-loader';

import { useMeasure } from 'react-use';

const TableLoader: React.FC = () => {
  const [ref, { width }] = useMeasure<HTMLDivElement>();

  // first width will be zero -> react will run the component.
  // unlike directly updating the component inside useLayoutEffect without re-render.
  // here we are not updating but just reading.. so will get the width on next render, and width=0 on first render.
  const componentWidth = width || window.innerWidth - 30;
  // note we are not using useWindowSize() as this is just first time render thing. until ref is null
  // and useWindowSize will re-render the component on window size change.

  const rows = 20;
  const height = 45;
  return (
    <div ref={ref} className="table-loader">
      <ContentLoader
        viewBox={`0 0 ${width} ${height * rows}`}
        height={rows * height}
        width={componentWidth}
        speed={2}
        animate={false}
      >
        {[...Array(rows).keys()].map((index) => (
          <rect
            key={index}
            x="0"
            y={index * height}
            rx="3"
            ry="3"
            width={componentWidth}
            height={height - 5}
          />
        ))}
      </ContentLoader>
    </div>
  );
};

export default TableLoader;
