import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = () => {
	return (
		<div className='loading-container'>
			<ReactLoading
				type='cylon'
				color={'#137b80'}
				height={'15%'}
				width={'15%'}
			/>
		</div>
	);
};
