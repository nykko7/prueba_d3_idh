export const AxisLeft = ({
	yScale,
	isHorizontalBar,
	innerHeight,
	innerWidth,
}) => {
	return isHorizontalBar
		? yScale.domain().map((tickValue) => (
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
		  ))
		: yScale.ticks().map((tickValue) => (
				<g
					className='tick'
					key={tickValue}
					transform={`translate(0, ${yScale(tickValue)})`}
				>
					<line x2={innerWidth} />
					<text
						style={{
							textAnchor: 'end',
							fontSize:
								innerWidth <= 220
									? '0.6em'
									: innerWidth <= 250
									? '0.8em'
									: '1em',
						}}
						x={0}
						dx='-0.73em'
					>
						{tickValue}
					</text>
				</g>
		  ));
};
