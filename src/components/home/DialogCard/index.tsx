import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
	link: string;
	titleElements: ReactNode;
	description: string;
}

const DialogCard = ({ link, titleElements, description }: Props) => {
	return (
		<Link
			href={link}
			className="bg-gray-100 p-3 rounded-md hover:scale-105 transform transition-transform ease-in-out cursor-pointer"
		>
			<div className="flex items-center gap-3 text-black text-lg font-semibold">
				{/* <IconProfile className="w-2 h-auto" /> Profile */}
				{titleElements}
			</div>
			<p className="my-3 text-sm text-gray-600">{description}</p>
		</Link>
	);
};

export default DialogCard;
