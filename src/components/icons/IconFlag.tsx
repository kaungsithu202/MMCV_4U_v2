import { ISvgIcon } from '@/types/common';
import React from 'react';

const IconFlag = (props: ISvgIcon) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="icon icon-tabler icon-tabler-flag-2"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			strokeWidth={2}
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M5 14h14v-9h-14v16" />
		</svg>
	);
};

export default IconFlag;
