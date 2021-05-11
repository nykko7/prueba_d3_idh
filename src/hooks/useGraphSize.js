import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function useGraphSize() {
	const { width, height } = useWindowSize();
	const [margin, setMargin] = useState({
		top: 20,
		right: 80,
		bottom: 65,
		left: 80,
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
					right: width >= 1000 ? 140 : 80,
					left: width >= 1000 ? 140 : 80,
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
