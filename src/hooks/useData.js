import { useState, useEffect } from 'react';

import { csv } from 'd3';

const csvUrl =
	'https://gist.githubusercontent.com/nykko7/7502eb16b0636c616b07947ac61553d8/raw/609c1e821716d3e64b7baf8fbb9e4546337062ef/Entidades_Mexico.csv';

export const useData = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const row = (d) => {
			d.IDH = +Math.random().toFixed(2);
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	return [data, setData];
};
