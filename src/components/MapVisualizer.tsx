// 😫😫Please ignore the typescript ignore-statements 😫😫 Just want to get d3 working first.
// 😁😁 After d3 is properly setup i'll worry about typescript.

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useRef, useEffect } from 'react';
import useSWR from 'swr';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { Data } from '../types/Types';
import { BASE_URL, STATE_CODES, MAP_DIMENSIONS } from '../Constants';

// Reference Commit: https://github.com/covid19india/covid19india-react/blob/9ef4ca39173a58859996d4d8151a64c385533ca9/src/components/mapvisualizer.js
const MapVisualizer = () => {
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
  const { data: geoData } = useSWR(
    `${BASE_URL}api/india.json`,
    (link) => d3.json(link), // we can generate uniques 'key' here and append it to the data.
    {
      revalidateOnMount: false,
      suspense: true, // fallback to top-most suspense till load
      // also as suspense data will never be null -> https://swr.vercel.app/docs/suspense
    }
  );

  const svgRef = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const topology = topojson.feature(geoData, geoData.objects['india-states']);
    const projection = d3.geoMercator().fitSize([432, 488], topology);
    const path = d3.geoPath(projection);

    const features = topology.features.map((f: any) => {
      const { district } = f.properties as { district: string };
      const state = f.properties.st_nm as string;
      const obj = { ...f };
      obj.id = `TT-${state}${district ? `-${district}` : ''}`;
      return obj;
    });

    const svg = d3.select(svgRef.current);
    svg
      .select('.map')
      .selectAll('path')
      .data(features, (d: any) => d.id)
      .enter()
      .append('path')
      .attr('d', path as unknown as string)
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.5)
      // .attr('fill', 'var(--dark-m-gray)')
      .attr('fill', 'transparent')
      .attr('stroke', '#007bff');

    const circlesData = features
      .map((d) => {
        const { st_nm: stateCode } = d.properties;
        const stateData = data[STATE_CODES[stateCode]];
        const value = Math.sqrt(stateData.total?.confirmed / 16);
        d.value = value;
        return d;
      })
      .sort((a, b) => b.value - a.value);

    svg
      .select('.circle')
      .selectAll('circle')
      .data(circlesData, (d) => d.id)
      .enter()
      .append('circle')
      .attr('transform', (d) => `translate(${path.centroid(d)})`)
      .attr('fill-opacity', 0.1)
      .attr('stroke-width', 0.4)
      .attr('r', (d) => Math.sqrt(d.value))
      .attr('fill', '#007bff')
      .attr('stroke', '#007bff')
      .style('cursor', 'pointer')
      .on('mouseenter', function (_) {
        d3.select(this).attr('fill-opacity', 0.5);
      })
      .on('mouseleave', function (_) {
        d3.select(this).attr('fill-opacity', 0.1);
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
