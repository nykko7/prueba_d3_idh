import React from 'react';
import { scaleBand, scaleLinear } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import useGraphSize from '../hooks/useGraphSize';

export const BarChart = ({ data, selectedEntity, selectedYear }) => {
	const { graphSize, margin, windowSize } = useGraphSize();

	const { width, height } = windowSize;
	const { innerWidth, innerHeight } = graphSize;

	const xAxisLabelOffset = 50;

	const isHorizontalBar = width <= 480;

	const yValue = (d) =>
		isHorizontalBar ? d['ISO 3166-2 (3 Dígitos)'] : d[selectedYear];
	const xValue = (d) =>
		isHorizontalBar ? d[selectedYear] : d['Estado'];
	const idValue = (d) => d.Id;

	const yScale =
		data && isHorizontalBar
			? scaleBand()
					.domain(data.map(yValue))
					.range([0, innerHeight])
					.paddingInner(0.15)
			: scaleLinear().domain([0, 1]).range([innerHeight, 0]);

	const xScale =
		data && isHorizontalBar
			? scaleLinear().domain([0, 1]).range([0, innerWidth])
			: scaleBand()
					.domain(data.map(xValue))
					.range([0, innerWidth])
					.paddingInner(0.15);
	return (
		<svg width={width} height={height}>
			<g
				transform={`translate(${margin.left}, ${margin.top})`}
				style={{ maxWidth: '1200px' }}
			>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					innerWidth={innerWidth}
					isHorizontalBar={isHorizontalBar}
				/>
				<AxisLeft
					yScale={yScale}
					innerHeight={innerHeight}
					innerWidth={innerWidth}
					isHorizontalBar={isHorizontalBar}
				/>
				{isHorizontalBar && (
					<text
						className='axis-label'
						x={innerWidth / 2}
						textAnchor='middle'
						y={innerHeight + xAxisLabelOffset}
					>
						IDH
					</text>
				)}
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					idValue={idValue}
					innerHeight={innerHeight}
					selectedEntity={selectedEntity}
					isHorizontalBar={isHorizontalBar}
				/>
			</g>
		</svg>
	);
};
