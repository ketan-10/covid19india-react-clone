import React, { Suspense } from 'react';
import Table from './Table';
import TableLoader from './loaders/TableLoader';
import MapVisualizer from './MapVisualizer';
import MapVisualizerLoader from './loaders/MapVisualizerLoader';

const Main: React.FC = () => (
  <div className="main">
    {/* following suspense is for data loading 
    And the Top level suspense in App.tsx will be for code-base loading, 
    As Main component is used with lazy (code-splitting) */}
    {/* If we keep fallback just as 'Loading...' the page layout will shift around.
    For example in this case the 'Footer' will show for a split second */}
    {/* The take away point here is there are 2 types of suspense here 
    i) code-splitting : which will wait for code to download
    ii) concurrent-mode : when suspended by inner component, 
    It will fallback and Save the current render till the data is available 
    (Note: This save us `data && ` conditional step to check data availability)
    Also one more benefit is 'concurrent-mode' continues the background render,
    To batch multiple suspended and so inturn download data in parallel  */}
    <Suspense fallback={<MapVisualizerLoader />}>
      <MapVisualizer />
    </Suspense>
    <Suspense fallback={<TableLoader />}>
      <Table />
    </Suspense>
  </div>
);

export default Main;
