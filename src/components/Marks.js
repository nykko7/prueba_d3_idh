export const Marks = ({
	data,
	yScale,
	xScale,
	xValue,
	yValue,
	idValue,
	selectedEntity,
}) => {
	return data.map((d) => {
		const selected = parseInt(idValue(d)) === selectedEntity;
		return (
			<rect
				className={`mark${selected ? ' selected' : ''}`}
				key={yValue(d)}
				x={0}
				y={yScale(yValue(d))}
				width={xScale(xValue(d))}
				height={yScale.bandwidth()}
			>
				<title>
					{d['Estado']} - Indice de Desarrollo Humano: {xValue(d)}
				</title>
			</rect>
		);
	});
};
