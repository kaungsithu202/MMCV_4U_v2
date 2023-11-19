import { ISvgIcon } from '@/types/common';
import React from 'react';

const IconPlus = (props: ISvgIcon) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-plus"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			stroke-width={4}
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M12 5l0 14"></path>
			<path d="M5 12l14 0"></path>
		</svg>
	);
};

export default IconPlus;
