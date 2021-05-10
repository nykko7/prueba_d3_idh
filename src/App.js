import React, { useState } from 'react';
import './styles/style.css';
import 'react-dropdown/style.css';

import { useData } from './hooks/useData';

import { Title } from './components/Title';
import { BarChart } from './components/BarChart';
import { DropdownMenu } from './components/DropdownMenu';
import { Statistics } from './components/Statistics';
import { Loading } from './components/Loading';

function App() {
	const [data, setData, years] = useData();
	const [selectedEntity, setSelectedEntity] = useState(0);
	const [entitiesYears] = useState(years);
	const initialYear = entitiesYears[entitiesYears.length - 1];
	const [selectedYear, setSelectedYear] = useState(initialYear);
	const [sortBy, setSortBy] = useState(0);

	return (
		<>
			<Title title='Prueba D3 - Índice de Desarrollo Humano' />
			{!data ? (
				<Loading />
			) : (
				<>
					<DropdownMenu
						years={entitiesYears}
						data={data}
						setData={setData}
						selectedEntity={selectedEntity}
						setSelectedEntity={setSelectedEntity}
						selectedYear={selectedYear}
						setSelectedYear={setSelectedYear}
						entitiesYears={entitiesYears}
						sortBy={sortBy}
						setSortBy={setSortBy}
					/>
					<BarChart
						data={data}
						selectedEntity={selectedEntity}
						selectedYear={selectedYear}
					/>
					<Statistics
						selectedEntity={selectedEntity}
						data={data}
						entitiesYears={entitiesYears}
					/>
				</>
			)}
		</>
	);
}

export default App;
