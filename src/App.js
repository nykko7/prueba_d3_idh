import React from 'react';
import './styles/style.css';

import { scaleBand, scaleLinear } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';

const width = window.innerWidth;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 70 };
const xAxisLabelOffset = 50;

console.log(width);
function App() {
	const data = useData();

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d) => d['ISO 3166-2 (3 Dígitos)'];
	const xValue = (d) => d.IDH;

	const yScale =
		data &&
		scaleBand()
			.domain(data.map(yValue))
			.range([0, innerHeight])
			.paddingInner(0.15);

	const xScale =
		data && scaleLinear().domain([0, 1]).range([0, innerWidth]);

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>
				Prueba D3 - Índice de Desarrollo Humano
			</h1>
			{!data ? (
				<pre>Loading...</pre>
			) : (
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
						/>
					</g>
				</svg>
			)}
		</>
	);
}

export default App;
