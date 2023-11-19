import { ISvgIcon } from '@/types/common';

const IconCheck = (props: ISvgIcon) => {
	return (
		<svg
			className="icon icon-tabler icon-tabler-check"
			width={24}
			height={24}
			viewBox="0 0 24 24"
			strokeWidth="2"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
			<path d="M5 12l5 5l10 -10"></path>
		</svg>
	);
};

export default IconCheck;
