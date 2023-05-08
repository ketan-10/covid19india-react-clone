import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';
import { scaleTime, scaleLinear } from 'd3-scale';
import { area, curveStep } from 'd3-shape';
import { brushX } from 'd3-brush';
import { useMeasure } from 'react-use';
import { TimeSeries } from '../../types/Types';
// import {usedra} from "react-use";

interface TimeSeriesBrushProps {
  timeSeries: TimeSeries;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const height = 70;
const leftMargin = 30;
type DataType = { date: Date; value: number };

const TimeSeriesBrush: React.FC<TimeSeriesBrushProps> = ({
  timeSeries,
  setStartDate,
  setEndDate,
}) => {
  const svgRef = useRef(null);
  const [wrapperRef, { width }] = useMeasure<HTMLDivElement>();
  useEffect(() => {
    // if (!width) return;
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
      .range([0, width - leftMargin]);

    const xAxis = axisBottom(xScale).ticks(5);

    svg
      .select<SVGGElement>('.x-axis')
      .attr('transform', `translate(0, ${height})`)
      .attr('stroke', 'var(--red-hover)')
      .call((thisElement) => xAxis(thisElement))
      .selectAll('path')
      .attr('stroke', 'var(--red)');

    const yScale = scaleLinear()
      .domain([minValue.value, maxValue.value])
      .range([height, 10]);

    const stepCurve = area<DataType>()
      .curve(curveStep)
      .x((d) => xScale(d.date))
      .y0(yScale(0))
      .y1((d) => yScale(d.value));
    // svg
    //   .select<SVGGElement>('.confirmed-graph')
    //   .selectAll('path')
    //   .data([confirmed])
    //   .enter()
    //   .append('path')
    //   .attr('d', stepCurve)
    //   .attr('fill', 'var(--red-light)')
    //   .attr('stroke', 'var(--red)');

    svg
      .select<SVGGElement>('.confirmed-graph')
      .selectAll<SVGAElement, DataType[]>('path')
      .data([confirmed])
      .join(
        (enter) =>
          enter
            .append('path')
            .attr('d', stepCurve)
            .attr('fill', 'var(--red-light)')
            .attr('stroke', 'var(--red)'),
        (update) => update.attr('d', stepCurve),
        (exit) => exit.remove()
      )
      .append('path')
      .attr('d', stepCurve)
      .attr('fill', 'var(--red-light)')
      .attr('stroke', 'var(--red)');

    const brush = brushX()
      .extent([
        [0, 0],
        [width - leftMargin, height],
      ])
      .on('start brush', ({ type, selection }) => {
        if (type !== 'brush') return;
        const [x, y] = selection as [number, number];

        const x0 = xScale.invert(x);
        const x1 = xScale.invert(y);
        setStartDate(x0);
        setEndDate(x1);
      });
    svg
      .select<SVGGElement>('.brush')
      .call(brush)
      .call(brush.move.bind(this), [width / 2, width / 2 + width / 4]);
  }, [setEndDate, setStartDate, timeSeries, width, svgRef]);
  return (
    <div className="brush-container" ref={wrapperRef}>
      <svg ref={svgRef}>
        <g className="confirmed-graph" />
        <g className="x-axis" />
        <g className="brush" />
      </svg>
    </div>
  );
};

export default TimeSeriesBrush;
