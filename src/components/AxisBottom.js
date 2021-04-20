export const AxisBottom = ({ xScale, innerHeight }) => {
	return xScale.ticks().map((tickValue) => (
		<g
			className='tick'
			key={tickValue}
			transform={`translate(${xScale(tickValue)},0)`}
		>
			<line y2={innerHeight} />
			<text
				style={{ textAnchor: 'middle' }}
				y={innerHeight + 3}
				dy='0.73em'
			>
				{tickValue}
			</text>
		</g>
	));
};
