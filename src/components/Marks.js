export const Marks = ({ data, yScale, xScale, xValue, yValue }) => {
	return data.map((d) => (
		<rect
			className='mark'
			key={yValue(d)}
			x={0}
			y={yScale(yValue(d))}
			width={xScale(xValue(d))}
			height={yScale.bandwidth()}
		>
			<title>
				Indice de Desarrollo Humano {d['Estado']}: {xValue(d)}
			</title>
		</rect>
	));
};
