import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function useGraphSize() {
	const { width, height } = useWindowSize();
	const [margin, setMargin] = useState({
		top: 20,
		right:
			width >= 1480
				? 140
				: width >= 1000
				? 80
				: width >= 480
				? 40
				: 20,
		left: width >= 1480 ? 140 : width >= 1000 ? 80 : 60,
		bottom: width >= 480 ? 170 : 65,
	});

	const [graphSize, setGraphSize] = useState({
		innerWidth: width - margin.left - margin.right,
		innerHeight: height - margin.top - margin.bottom,
	});

	useEffect(() => {
		setMargin(
			(prevMargin) => {
				const newMargin = {
					...prevMargin,
					right:
						width >= 1480
							? 140
							: width >= 1000
							? 80
							: width >= 480
							? 40
							: 20,
					left: width >= 1480 ? 140 : width >= 1000 ? 80 : 60,
					bottom: width >= 480 ? 170 : 65,
				};

				if (prevMargin.right !== newMargin.right) {
					return newMargin;
				} else {
					return margin;
				}
			},
			[width],
		);

		setGraphSize({
			innerWidth: width - margin.left - margin.right,
			innerHeight: height - margin.top - margin.bottom,
		});
	}, [width, height, margin]);

	return { graphSize, margin, windowSize: { width, height } };
}
