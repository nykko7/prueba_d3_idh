import React, { useState, useEffect } from 'react';
import './styles/style.css';
import { scaleBand, scaleLinear } from 'd3';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

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
	const [data, setData] = useData();

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	//DROPDOWN TO SELECT ENTITY:
	const [entitiesName, setEntitiesName] = useState([]);
	useEffect(() => {
		setEntitiesName(
			data
				? data.reduce((acc, cur) => {
						acc.push({
							value: parseInt(cur.Id),
							label: cur.Estado,
						});
						return acc;
				  }, [])
				: [],
		);
	}, [data]);
	const initialEntity = 0;
	const [selectedEntity, setSelectedEntity] = useState(initialEntity);
	const idValue = (d) => d.Id;

	//DROPDOWN YEAR:

	//DROPDOWN TO SORT:
	const [sortBy, setSortBy] = useState(0);
	const sortOptions = [
		{ label: 'Alfabeticamente (A - Z)', value: 'alphabetically' },
		{ label: 'Ascendente (0 - 1) ', value: 'ascending' },
		{ label: 'Descendente (1 - 0)', value: 'descending' },
	];

	useEffect(() => {
		if (sortBy === 0) return;
		let key = sortBy.value === 'alphabetically' ? 'Estado' : 'IDH';

		setData(
			[...data].sort((a, b) => {
				if (
					sortBy.value === 'ascending' ||
					sortBy.value === 'alphabetically'
				)
					return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
				else return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
			}),
		);
	}, [sortBy, data, setData]);

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
				<>
					<div className='menus-container'>
						<div className='dropdown-menu'>
							<span className='dropdown-label'>Estado:</span>
							<Dropdown
								options={entitiesName}
								value={selectedEntity}
								onChange={(value) => setSelectedEntity(value)}
								placeholder='Selecciona un Estado'
							/>
						</div>
						<div className='dropdown-menu'>
							<span className='dropdown-label'>Año:</span>
							<Dropdown
								options={entitiesName}
								value={selectedEntity}
								onChange={(value) => setSelectedEntity(value)}
								placeholder='Selecciona un Año'
							/>
						</div>
						<div className='dropdown-menu'>
							<span className='dropdown-label'>Ordenar Datos:</span>
							<Dropdown
								options={sortOptions}
								value={sortBy}
								onChange={(value) => setSortBy(value)}
								placeholder='Selecciona un Orden'
							/>
						</div>
					</div>

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
				</>
			)}
		</>
	);
}

export default App;
