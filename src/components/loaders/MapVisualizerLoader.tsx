import React from 'react';
import ContentLoader from 'react-content-loader';
import { MAP_DIMENSIONS } from '../../Constants';

const MapVisualizerLoader: React.FC = () => {
  const width = MAP_DIMENSIONS[0];
  const height = MAP_DIMENSIONS[1];
  return (
    <div className="map-container">
      <ContentLoader
        width={width}
        viewBox={`0 0 ${width} ${height}`}
        speed={2}
        backgroundColor="#007bff"
      >
        <circle cx={0.4 * width} cy={height / 2} r="5" />
        <circle cx={0.5 * width} cy={height / 2} r="5" />
        <circle cx={0.6 * width} cy={height / 2} r="5" />
      </ContentLoader>
    </div>
  );
};

export default MapVisualizerLoader;
