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
		console.log(entity);

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
					<table>
						<thead>
							<tr>
								<th colSpan='2'>
									<h2>ESTADÍSTICAS</h2>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>Promedio IDH</th>
								<td>{promIdh}</td>
							</tr>
							<tr>
								<th>IDH más alto</th>
								<td>{maxIdh}</td>
							</tr>
							<tr>
								<th>IDH más bajo</th>
								<td>{minIdh}</td>
							</tr>
						</tbody>
					</table>
				</>
			) : (
				''
			)}
		</div>
	);
};
