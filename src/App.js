import React from 'react';

import { scaleBand, scaleLinear } from 'd3';
import { useData } from './hooks/useData';
import { AxisBottom } from './components/AxisBottom';
import { AxisLeft } from './components/AxisLeft';
import { Marks } from './components/Marks';

const width = window.innerWidth;
const height = window.innerHeight - 120;
const margin = { top: 20, right: 200, bottom: 20, left: 200 };

console.log(width);
function App() {
	const data = useData();

	if (!data) {
		return (
			<>
				<h1 style={{ textAlign: 'center' }}>
					Prueba D3 - Índice de Desarrollo Humano
				</h1>
				<pre>Loading...</pre>
			</>
		);
	}

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d) => d['ISO 3166-2 (3 Dígitos)'];
	const xValue = (d) => d.IDH;

	const yScale = scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight]);

	const xScale = scaleLinear().domain([0, 1]).range([0, innerWidth]);

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>
				Prueba D3 - Índice de Desarrollo Humano
			</h1>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<AxisBottom xScale={xScale} innerHeight={innerHeight} />
					<AxisLeft yScale={yScale} />
					<Marks
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
					/>
				</g>
			</svg>
		</>
	);
}

export default App;
