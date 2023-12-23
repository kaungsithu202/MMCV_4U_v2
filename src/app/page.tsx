'use client';
import { useRouter } from 'next/navigation';

import IconEye from '@/components/icons/IconEye';
import IconProfile from '@/components/icons/IconProfile';

import ProfileDetail from '@/components/home/ProfileDetailSection/ProfileDetail';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import { EDIT_PROFILE_SUMMARY } from '@/constants/routes';

export default function Home() {
	const router = useRouter();

	const handleProfileSummary = () => {
		router.push(EDIT_PROFILE_SUMMARY);
	};
	return (
		<>
			{/* <ProfileDetailSection /> */}
			<ProfileDetail />
			<Accordion
				type="single"
				collapsible
				className=" bg-white round py-5 px-10  leading-10 cursor-pointer drop-shadow-md"
			>
				<AccordionItem value="item-1">
					<AccordionTrigger>
						<div className="flex items-center justify-start gap-6 ">
							<IconProfile />
							<p className="card-header">Profile</p>
						</div>
					</AccordionTrigger>

					<AccordionContent className=" relative  ">
						<div
							onClick={handleProfileSummary}
							className="flex items-center justify-between"
						>
							<p className="text-md font-medium">I am passionate developer</p>
							<IconEye />
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}
