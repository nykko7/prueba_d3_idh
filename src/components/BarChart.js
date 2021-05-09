import React from 'react';
import { scaleBand, scaleLinear } from 'd3';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import useGraphSize from '../hooks/useGraphSize';

export const BarChart = ({ data, selectedEntity, selectedYear }) => {
	const { width, height } = useGraphSize().windowSize;
	const { innerWidth, innerHeight } = useGraphSize().graphSize;
	const { margin } = useGraphSize();
	const xAxisLabelOffset = 50;

	const yValue = (d) => d['ISO 3166-2 (3 Dígitos)'];
	const xValue = (d) => d[selectedYear];
	const idValue = (d) => d.Id;

	const yScale =
		data &&
		scaleBand()
			.domain(data.map(yValue))
			.range([0, innerHeight])
			.paddingInner(0.15);

	const xScale =
		data && scaleLinear().domain([0, 1]).range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} />
				<AxisLeft yScale={yScale} />
				<text
					className='axis-label'
					x={innerWidth / 2}
					textAnchor='middle'
					y={innerHeight + xAxisLabelOffset}
				>
					IDH
				</text>
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					idValue={idValue}
					selectedEntity={selectedEntity}
				/>
			</g>
		</svg>
	);
};
