export const AxisBottom = ({
	xScale,
	innerHeight,
	innerWidth,
	isHorizontalBar,
}) => {
	return isHorizontalBar
		? xScale.ticks().map((tickValue) => (
				<g
					className='tick'
					key={tickValue}
					transform={`translate(${xScale(tickValue)},0)`}
				>
					<line y2={innerHeight} />
					<text
						style={{
							textAnchor: 'middle',
							fontSize:
								innerWidth <= 220
									? '0.6em'
									: innerWidth <= 250
									? '0.8em'
									: '1em',
						}}
						y={innerHeight + 3}
						dy='0.73em'
					>
						{tickValue}
					</text>
				</g>
		  ))
		: xScale.domain().map((tickValue) => (
				<g key={tickValue} className='tick'>
					<text
						transform={`translate(0, ${innerHeight}) rotate(-90)`}
						style={{
							textAnchor: 'end',
							fontSize:
								innerWidth <= 600
									? '0.6em'
									: innerWidth <= 740
									? '0.8em'
									: '1em',
						}}
						dx='-0.8em'
						dy={3}
						y={xScale(tickValue) + xScale.bandwidth() / 2}
					>
						{tickValue}
					</text>
				</g>
		  ));
};
