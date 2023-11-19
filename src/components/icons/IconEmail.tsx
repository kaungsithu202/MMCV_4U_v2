import { ISvgIcon } from '@/types/common';

const IconEmail = (props: ISvgIcon) => {
	return (
		<svg
			className="icon icon-tabler icon-tabler-mail-filled"
			width="44"
			height="44"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			fill="none"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
			<path d="M3 7l9 6l9 -6" />
		</svg>
	);
};

export default IconEmail;
