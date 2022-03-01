import React, { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { select, Selection } from 'd3-selection';
import { scaleTime, scaleLinear } from 'd3-scale';
import { axisBottom, axisRight, axisTop, axisLeft } from 'd3-axis';
import { line, area, curveStep } from 'd3-shape';
import { BASE_URL, MAX_DATE, MIN_DATE } from '../../Constants';
import { TimeSeries } from '../../types/Types';
import { getActive } from '../../utils/commonFunctions';
import TimeSeriesBrush from './TimeSeriesBrush';

type DataType = { date: Date; value: number };

const TimeSeriesChart: React.FC = () => {
  const svgRef = useRef(null);

  const { data: timeSeries } = useSWR<TimeSeries>(
    `${BASE_URL}api/data/timeseries.json`,
    (link) => fetch(link).then((res) => res.json()),
    {
      revalidateOnMount: true,
      suspense: true, // fallback to top-most suspense till load
    }
  );

  const [startDate, setStartDate] = useState<Date>(MIN_DATE);
  const [endDate, setEndDate] = useState<Date>(MAX_DATE);

  useEffect(() => {
    if (!timeSeries) return;

    const { dates } = timeSeries.TT;
    const dateKeys = Object.keys(dates);

    const confirmed = dateKeys
      .map((key) => ({
        date: new Date(key),
        // value: dates[key].total?.confirmed ?? 0,
        value: getActive(dates[key].delta),
      }))
      .filter((d) => d.date >= new Date(startDate))
      .filter((d) => d.date < new Date(endDate)) as DataType[];

    if (!confirmed || !confirmed.length) return;
    const minDate = confirmed.reduce((a, b) => (a.date < b.date ? a : b));
    const maxDate = confirmed.reduce((a, b) => (a.date >= b.date ? a : b));

    const minValue = confirmed.reduce((a, b) => (a.value < b.value ? a : b));
    const maxValue = confirmed.reduce((a, b) => (a.value >= b.value ? a : b));

    const xScale = scaleTime()
      .domain([minDate.date, maxDate.date])
      .range([10, 900]);

    const xAxis = axisBottom(xScale);

    const yScale = scaleLinear()
      .domain([minValue.value, maxValue.value])
      .range([500, 10]);

    const yAxis = axisRight(yScale);
    const svg = select(svgRef.current);
    svg
      .select<SVGGElement>('.x-axis')
      .attr('transform', 'translate(0, 500)')
      .call(xAxis);
    svg
      .select<SVGGElement>('.y-axis')
      .attr('transform', 'translate(900, 0)')
      .call(yAxis);

    // svg
    //   .select<SVGGElement>('.points')
    //   .selectAll('circle')
    //   .data(confirmed)
    //   .enter()
    //   .append('circle')
    //   .style('fill', 'var(--blue)')
    //   .attr('opacity', 0.7)
    //   .attr('cx', (d) => xScale(d.date))
    //   .attr('cy', (d) => yScale(d.value))
    //   .attr('r', 2);

    const l = line<DataType>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value));

    const a = area<DataType>()
      .curve(curveStep)
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value));

    const confirmedDelta7 = dateKeys
      .map((key) => ({
        date: new Date(key),
        // value: dates[key].total?.confirmed ?? 0,
        value: getActive(dates[key].delta7) / 7,
      }))
      .filter((d) => d.date >= new Date(startDate))
      .filter((d) => d.date < new Date(endDate)) as DataType[];

    const selectedData = svg
      .select<SVGGElement>('.line')
      .selectAll<SVGPathElement, DataType[]>('path')
      .data([confirmedDelta7])
      .attr('d', (d) => l(d));

    selectedData
      .enter()
      .append('path')
      .attr('d', (d) => l(d))
      .attr('fill', 'none')
      .attr('stroke', 'var(--blue)');

    // remove not needed
    // selectedData.exit().remove();

    svg
      .select<SVGGElement>('.area')
      .selectAll<SVGPathElement, DataType[]>('path')
      .data([confirmed], (d) => d.length)
      // .call((update) => {
      //   update.attr('d', (d) => a(d));
      // })
      .call((enter) => {
        enter
          .enter()
          .append('path')
          .attr('d', (d) => a(d))
          .attr('fill', 'var(--blue-light)');
      })
      // here remove needed.
      .call((exit) => {
        exit.exit().remove();
      });
  }, [endDate, startDate, timeSeries]);

  return (
    <div>
      <svg ref={svgRef} style={{ width: 1000, height: 600 }}>
        <g className="x-axis" />
        <g className="y-axis" />
        <g className="points" />
        <g className="line" />
        <g className="area" />
      </svg>

      {timeSeries && (
        <TimeSeriesBrush {...{ timeSeries, setStartDate, setEndDate }} />
      )}
    </div>
  );
};

export default TimeSeriesChart;
