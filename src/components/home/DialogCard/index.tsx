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
			className="bg-secondary/60 border border-clay/40 p-4 rounded-xl hover:bg-secondary hover:border-terracotta/50 transform transition-colors ease-in-out cursor-pointer"
		>
			<div className="flex items-center gap-3 text-ink text-lg font-semibold">
				{/* <IconProfile className="w-2 h-auto" /> Profile */}
				{titleElements}
			</div>
			<p className="my-3 text-sm leading-6 text-muted">{description}</p>
		</Link>
	);
};

export default DialogCard;
