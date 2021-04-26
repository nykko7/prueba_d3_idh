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
	const [data, setData, years] = useData();

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
	const [entitiesYears] = useState(years);
	const initialYear = entitiesYears[entitiesYears.length - 1];

	const [selectedYear, setSelectedYear] = useState(initialYear);

	//DROPDOWN TO SORT:
	const [sortBy, setSortBy] = useState(0);
	const sortOptions = [
		{ label: 'Alfabeticamente (A - Z)', value: 'alphabetically' },
		{ label: 'Ascendente (0 - 1) ', value: 'ascending' },
		{ label: 'Descendente (1 - 0)', value: 'descending' },
	];

	useEffect(() => {
		if (sortBy === 0) return;
		let key = sortBy === 'alphabetically' ? 'Estado' : selectedYear;
		let sortedData = [...data].sort((a, b) => {
			if (sortBy === 'ascending' || sortBy === 'alphabetically')
				return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
			else return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
		});

		setData([...sortedData]);
	}, [sortBy, data, setData, selectedYear]);

	const yValue = (d) => d['ISO 3166-2 (3 Dígitos)'];
	const xValue = (d) => d[selectedYear];

	const yScale =
		data &&
		scaleBand()
			.domain(data.map(yValue))
			.range([0, innerHeight])
			.paddingInner(0.15);

	const xScale =
		data && scaleLinear().domain([0, 1]).range([0, innerWidth]);

	let sum = 0;
	let maxIdh = 0;
	let minIdh = 1;
	let promIdh = 1;

	useEffect(() => {
		const entity = data
			? data.find((entity) => parseInt(entity.Id) === selectedEntity)
			: {};

		entitiesYears.forEach((year) => {
			if (entity[year] >= maxIdh) maxIdh = entity[year];
			if (entity[year] <= minIdh) minIdh = entity[year];
			sum += entity[year];
		});

		promIdh = sum / entitiesYears.length;

		console.log(entity);
		// eslint-disable-next-line
	}, [selectedEntity, entitiesYears]);

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
								value={selectedEntity.value}
								onChange={({ value }) => setSelectedEntity(value)}
								placeholder='Selecciona un Estado'
							/>
						</div>
						<div className='dropdown-menu'>
							<span className='dropdown-label'>Año:</span>
							<Dropdown
								options={entitiesYears}
								value={selectedYear.value}
								onChange={({ value }) => setSelectedYear(value)}
								placeholder='Selecciona un Año'
							/>
						</div>
						<div className='dropdown-menu'>
							<span className='dropdown-label'>Ordenar Datos:</span>
							<Dropdown
								options={sortOptions}
								value={sortBy.value}
								onChange={({ value }) => setSortBy(value)}
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
					<div className='entity-statistics'>
						{selectedEntity ? (
							<>
								<h2>Estadisticas:</h2>
								<h3>Promedio IDH:{promIdh}</h3>
								<h3>IDH más alto:{maxIdh}</h3>
								<h3>IDH más bajo:{minIdh}</h3>
							</>
						) : (
							''
						)}
					</div>
				</>
			)}
		</>
	);
}

export default App;
