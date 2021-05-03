import { useState, useEffect } from 'react';

import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/nykko7/7502eb16b0636c616b07947ac61553d8/raw/609c1e821716d3e64b7baf8fbb9e4546337062ef/Entidades_Mexico.csv';

export const useData = () => {
	const [data, setData] = useState(null);
	let years = [];

	while (years.length < 7) {
		let year = Math.floor(Math.random() * (2020 - 1950)) + 1950;
		if (years.indexOf(year) === -1) years.push(year);
	}
	years = [...years].sort((a, b) => a - b);

	useEffect(() => {
		const row = (d) => {
			years.forEach((year) => {
				d[year] = parseFloat(Math.random().toFixed(2));
			});
			return d;
		};
		csv(csvUrl, row).then(setData);
		// eslint-disable-next-line
	}, []);

	return [data, setData, years];
};
