import { SVGProps } from 'react';

const IconDownload = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			className="icon icon-tabler icon-tabler-file-download"
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
			<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
			<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
			<path d="M12 17v-6"></path>
			<path d="M9.5 14.5l2.5 2.5l2.5 -2.5"></path>
		</svg>
	);
};

export default IconDownload;