export const AxisLeft = ({ yScale }) => {
	return yScale.domain().map((tickValue) => (
		<g key={tickValue} className='tick'>
			<text
				style={{ textAnchor: 'end' }}
				dy='.32em'
				x={-3}
				y={yScale(tickValue) + yScale.bandwidth() / 2}
			>
				{tickValue}
			</text>
		</g>
	));
};
