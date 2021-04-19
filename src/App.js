import React, { useState, useEffect } from 'react';

import { csv, scaleBand, scaleLinear, max } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/nykko7/7502eb16b0636c616b07947ac61553d8/raw/609c1e821716d3e64b7baf8fbb9e4546337062ef/Entidades_Mexico.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 20 };

function App() {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.IDH = +Math.random().toFixed(2);
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	if (!data) {
		return <pre>Loading...</pre>;
	}

	console.log(data[0]);
	console.log(data[1]);
	console.log(data[2]);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = height - margin.left - margin.right;

	const yScale = scaleBand()
		.domain(data.map((d) => d['Estado']))
		.range([0, innerHeight]);

	const xScale = scaleLinear()
		.domain([0, max(data, (d) => d.IDH)])
		.range([0, innerWidth]);

	return (
		<>
			<h1 style={{ textAlign: 'center' }}>
				Prueba D3 - Índice de Desarrollo Humano
			</h1>
			<g transform={`translate(${margin.left}, ${margin.top})`}>
				<svg width={width} height={height}>
					{data.map((d, i) => (
						<rect
							key={i}
							x={0}
							y={yScale(d['Estado'])}
							width={xScale(d.IDH)}
							height={yScale.bandwidth()}
						/>
					))}
				</svg>
			</g>
		</>
	);
}

export default App;
