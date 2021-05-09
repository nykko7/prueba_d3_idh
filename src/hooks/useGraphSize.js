import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function useGraphSize() {
	const { width, height } = useWindowSize();
	const [margin, setMargin] = useState({
		top: 20,
		right: 70,
		bottom: 65,
		left: 70,
	});

	const [graphSize, setGraphSize] = useState({
		innerWidth: width - margin.left - margin.right,
		innerHeight: height - margin.top - margin.bottom,
	});

	useEffect(() => {
		setMargin((prevMargin) => {
			if (prevMargin !== margin) {
				return {
					...prevMargin,
					right: width >= 1000 ? 140 : 100,
					left: width >= 1000 ? 140 : 100,
				};
			} else {
				return margin;
			}
		});

		setGraphSize({
			innerWidth: width - margin.left - margin.right,
			innerHeight: height - margin.top - margin.bottom,
		});
	}, [width, height, margin]);

	return { graphSize, margin, windowSize: { width, height } };
}
