import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';

export const DropdownMenu = ({
	data,
	setData,
	entitiesYears,
	selectedEntity,
	setSelectedEntity,
	selectedYear,
	setSelectedYear,
	sortBy,
	setSortBy,
}) => {
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

	//DROPDOWN TO SORT:

	const sortOptions = [
		{ label: 'Alfabeticamente (A - Z)', value: 'alphabetically' },
		{ label: 'Ascendente (0 - 1) ', value: 'ascending' },
		{ label: 'Descendente (1 - 0)', value: 'descending' },
	];

	useEffect(() => {
		if (sortBy === 0) return;
		if (!data) return;

		let key = sortBy === 'alphabetically' ? 'Estado' : selectedYear;
		let sortedData = [...data].sort((a, b) => {
			if (sortBy === 'ascending' || sortBy === 'alphabetically')
				return a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
			else return a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0;
		});

		setData((prevData) => {
			return JSON.stringify(sortedData) !== JSON.stringify(prevData)
				? sortedData
				: data;
		});
	}, [sortBy, selectedYear, data, setData]);

	return (
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
					// placeholder='Selecciona un Año'
					defaultValue={{
						label: selectedYear.value,
						value: selectedYear.value,
					}}
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
	);
};
