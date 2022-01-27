import React, { useRef, useEffect } from 'react';
import useSWR from 'swr';
import { select } from 'd3-selection';
import { json } from 'd3-fetch';
import { feature } from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';
// eslint-disable-next-line import/no-unresolved
import { Topology, GeometryCollection } from 'topojson-specification';
import { Data } from '../types/Types';
import { BASE_URL, STATE_CODES, MAP_DIMENSIONS } from '../Constants';

type GeometryProperties = {
  st_nm: string;
  st_code: string;
  district?: string;
};

type TopologyObject = {
  states: GeometryCollection<GeometryProperties>;
};

const MapVisualizer: React.FC = () => {
  const { data } = useSWR<Data>(
    `${BASE_URL}api/data/data.json`,
    (link) => fetch(link).then((res) => res.json()),
    {
      revalidateOnMount: true,
      suspense: true, // fallback to top-most suspense till load
    }
  );

  const { data: geoData } = useSWR<Topology<TopologyObject>>(
    `${BASE_URL}api/maps/india.json`,
    (link): Promise<any> => json(link), // we can generate uniques 'key' here and append it to the data.
    {
      revalidateOnMount: false,
      suspense: true, // fallback to top-most suspense till load
    }
  );

  const svgRef = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (!geoData || !data) return;
    const topology = feature(geoData, geoData.objects.states);
    const projection = geoMercator().fitSize([432, 488], topology);
    const path = geoPath(projection);

    const features = topology.features.map((f) => {
      const { district } = f.properties;
      const state = f.properties.st_nm;
      const id = `TT-${state}${district ? `-${district}` : ''}`;
      const value = 0;
      return { ...f, ...{ id, value } };
    });

    const svg = select(svgRef.current);
    svg
      .select('.map')
      .selectAll('path')
      .data(features)
      .enter()
      .append('path')
      .attr('d', path) // path is a function that takes a GeoJSON feature and returns a path string
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.5)
      // .attr('fill', 'var(--dark-m-gray)')
      .attr('fill', 'transparent')
      .attr('stroke', '#007bff');

    const circlesData = features
      .map((d) => {
        const { st_nm: stateCode } = d.properties;
        const stateData = data[STATE_CODES[stateCode]];
        const value = Math.sqrt((stateData.total?.confirmed ?? 0) / 16);
        d.value = value;
        return d;
      })
      .sort((a, b) => b.value - a.value);

    svg
      .select('.circle')
      .selectAll('circle')
      .data(circlesData)
      .enter()
      .append('circle')
      .attr(
        'transform',
        (d) =>
          `translate(${path
            .centroid(d)
            .map((n) => `${n}`)
            .join(',')})`
      )
      .attr('fill-opacity', 0.1)
      .attr('stroke-width', 0.4)
      .attr('r', (d) => Math.sqrt(d.value))
      .attr('fill', '#007bff')
      .attr('stroke', '#007bff')
      .style('cursor', 'pointer')
      .on('mouseenter', function (_) {
        select(this).attr('fill-opacity', 0.5);
      })
      .on('mouseleave', function (_) {
        select(this).attr('fill-opacity', 0.1);
      });
  });
  return (
    <div className="map-container">
      <svg
        ref={svgRef}
        width={MAP_DIMENSIONS[0]}
        viewBox={`0 0 ${MAP_DIMENSIONS[0]} ${MAP_DIMENSIONS[1]}`}
      >
        <g className="map" />
        <g className="circle" />
      </svg>
    </div>
  );
};

export default MapVisualizer;
