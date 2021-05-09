import { useEffect, useState } from 'react';

export default function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		height: 500,
	});

	function changeWindowSize() {
		setWindowSize({
			width: window.innerWidth,
			height: 500,
		});
	}

	useEffect(() => {
		window.addEventListener('resize', changeWindowSize);
		return () =>
			window.removeEventListener('resize', changeWindowSize);
	}, []);

	return windowSize;
}
