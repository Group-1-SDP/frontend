import { useMemo } from "react";
import * as d3 from "d3";
import { BarItem } from "./BarItem";

const MARGIN = { top: 30, right: 30, bottom: 30, left: 30 };
const BAR_PADDING = 0.3;

type BarplotProps = {
  width: number;
  height: number;
  data: { name: string; value: number }[];
};

export const Barplot = ({ width, height, data }: BarplotProps) => {
  // Bounds = area inside the graph
  const boundsWidth = width - MARGIN.left - MARGIN.right;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // X axis is for groups since the barplot is horizontal
  const groups = data.map((d) => d.name);
  const xScale = useMemo(() => {
    return d3
      .scaleBand()
      .domain(groups)
      .range([0, boundsWidth])
      .padding(BAR_PADDING);
  }, [data, width]);

  // Y axis
  const max = d3.max(data.map((d) => d.value));
  const yScale = d3.scaleLinear().domain([0, max]).range([boundsHeight, 0]);

  // Build the shapes
  const allShapes = data.map((d) => {
    return (
      <BarItem
        key={d.name}
        name={d.name}
        value={d.value}
        barWidth={xScale.bandwidth()}
        barHeight={boundsHeight - yScale(d.value)}
        x={xScale(d.name)}
        y={yScale(d.value)}
      />
    );
  });

  return (
    <div>
      <svg width={width} height={height}>
        <g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
          {allShapes}
          {/* X Axis */}
          <g transform={`translate(0,${boundsHeight})`}>
            {xScale.domain().map((d) => (
              <text
                key={d}
                x={xScale(d) + xScale.bandwidth() / 2}
                y={10}
                style={{ textAnchor: "middle" }}
              >
              </text>
            ))}
          </g>
          {/* Y Axis */}
          <g>
            {yScale.ticks().map((tick) => (
              <g key={tick} transform={`translate(0,${yScale(tick)})`}>
                <line x2={boundsWidth} stroke="rgba(0,0,0,0.1)" />
                <text x={-5} y={5} dy="0.32em" style={{ textAnchor: "end" }}>
                </text>
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};
