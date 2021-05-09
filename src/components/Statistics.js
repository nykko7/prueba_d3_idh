import React, { useState, useEffect } from 'react';

export const Statistics = ({
	selectedEntity,
	data,
	entitiesYears,
}) => {
	const [maxIdh, setMaxIdh] = useState(0);
	const [minIdh, setMinIdh] = useState(1);
	const [promIdh, setPromIdh] = useState(1);

	useEffect(() => {
		const entity = data
			? data.find((entity) => parseInt(entity.Id) === selectedEntity)
			: {};

		if (entity === undefined) return null;

		let sum = 0;
		let maxIdh = 0;
		let minIdh = 1;

		for (let i = 0; i < entitiesYears.length; i++) {
			let year = entitiesYears[i];

			if (entity[year] > maxIdh) maxIdh = entity[year];

			if (entity[year] < minIdh) minIdh = entity[year];

			sum += entity[year];
		}

		setMaxIdh(maxIdh.toFixed(2));
		setMinIdh(minIdh.toFixed(2));
		setPromIdh((sum / entitiesYears.length).toFixed(2));
	}, [selectedEntity, data, entitiesYears]);

	return (
		<div className='entity-statistics'>
			{selectedEntity ? (
				<>
					<h2>Estadisticas:</h2>
					<h3>Promedio IDH: {promIdh}</h3>
					<h3>IDH más alto: {maxIdh}</h3>
					<h3>IDH más bajo: {minIdh}</h3>
				</>
			) : (
				''
			)}
		</div>
	);
};
