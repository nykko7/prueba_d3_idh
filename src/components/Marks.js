export const Marks = ({
	data,
	yScale,
	xScale,
	xValue,
	yValue,
	idValue,
	selectedEntity,
	isHorizontalBar,
	innerHeight,
}) => {
	return data.map((d) => {
		const selected = parseInt(idValue(d)) === selectedEntity;
		return isHorizontalBar ? (
			<rect
				className={`mark${selected ? ' selected' : ''}`}
				key={idValue(d)}
				x={0}
				y={yScale(yValue(d))}
				width={xScale(xValue(d))}
				height={yScale.bandwidth()}
			>
				<title>Indice de Desarrollo Humano: {xValue(d)}</title>
			</rect>
		) : (
			<rect
				className={`mark${selected ? ' selected' : ''}`}
				key={idValue(d)}
				x={xScale(xValue(d))}
				y={yScale(yValue(d))}
				width={xScale.bandwidth()}
				height={innerHeight - yScale(yValue(d))}
			>
				<title>Indice de Desarrollo Humano: {yValue(d)}</title>
			</rect>
		);
	});
};
