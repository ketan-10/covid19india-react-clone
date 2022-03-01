import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { axisBottom, axisRight } from 'd3-axis';
import { scaleTime, scaleLinear } from 'd3-scale';
import { area, curveStep } from 'd3-shape';
import { brushX } from 'd3-brush';
import { TimeSeries } from '../../types/Types';
// import {usedra} from "react-use";

interface TimeSeriesBrushProps {
  timeSeries: TimeSeries;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const width = 700;

const TimeSeriesBrush: React.FC<TimeSeriesBrushProps> = ({
  timeSeries,
  setStartDate,
  setEndDate,
}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current);

    const { dates } = timeSeries.TT;
    const dateKeys = Object.keys(dates);

    const confirmed = dateKeys.map((key) => ({
      date: new Date(key),
      // value: dates[key].total?.confirmed ?? 0,
      value: dates[key].delta?.confirmed ?? 0,
    }));

    const minDate = confirmed.reduce((a, b) => (a.date < b.date ? a : b));
    const maxDate = confirmed.reduce((a, b) => (a.date >= b.date ? a : b));

    const minValue = confirmed.reduce((a, b) => (a.value < b.value ? a : b));
    const maxValue = confirmed.reduce((a, b) => (a.value >= b.value ? a : b));

    const xScale = scaleTime()
      .domain([minDate.date, maxDate.date])
      .range([0, width]);

    const xAxis = axisBottom(xScale);

    svg
      .select<SVGGElement>('.x-axis')
      .attr('transform', 'translate(0, 100)')
      // .call(xAxis);
      .call((thisElement) => xAxis(thisElement));

    const yScale = scaleLinear()
      .domain([minValue.value, maxValue.value])
      .range([100, 10]);

    const stepCurve = area<{ date: Date; value: number }>()
      .curve(curveStep)
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value));
    svg
      .select<SVGGElement>('.confirmed-graph')
      .selectAll('path')
      .data([confirmed])
      .enter()
      .append('path')
      .attr('d', stepCurve)
      .attr('fill', 'var(--red-light)')
      .attr('stroke', 'var(--red)');

    svg.select<SVGGElement>('.brush').call(
      brushX().on('start brush', ({ type, selection }) => {
        if (type !== 'brush') return;
        const [x, y] = selection as [number, number];

        const x0 = xScale.invert(x);
        const x1 = xScale.invert(y);
        setStartDate(x0);
        setEndDate(x1);
      })
    );
  }, [setEndDate, setStartDate, timeSeries]);
  return (
    <svg ref={svgRef} width={width} height={120}>
      <g className="confirmed-graph" />
      <g className="x-axis" />
      <g className="brush" />
    </svg>
  );
};

export default TimeSeriesBrush;
