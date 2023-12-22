'use client';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import IconEye from '@/components/icons/IconEye';
import IconProfile from '@/components/icons/IconProfile';
import useCVStore from '@/store/useCVStore';
import { useRouter } from 'next/navigation';

import ProfileDetail from '@/components/home/ProfileDetailSection/ProfileDetail';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { EDIT_PROFILE_SUMMARY } from '@/constants/routes';

const ProfileDetailSection = dynamic(
	() => import('@/components/home/ProfileDetailSection'),
	{ ssr: false }
);

export default function Home() {
	const componentRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const handleProfileSummary = () => {
		router.push(EDIT_PROFILE_SUMMARY);
	};
	return (
		<>
			{/* <ProfileDetailSection /> */}
			<ProfileDetail />
			<Accordion type="single" collapsible className="card-layout">
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
			{/* <section className="w-full flex flex-col gap-6">
				<div className="bg-white round p-6 flex-between">
					<EditableTitle />
					<button onClick={handlePrint} className="download-btn">
						<p className="text-lg">Download</p>
						<IconDownload className="icon-size" />
					</button>
				</div>
				{!isEditProfileSummary && <ProfileDetailSection />}
				{!isEditProfileDetail && <ProfileSummary />}
			</section>

			<FullResume ref={componentRef} /> */}

			{/* <Dialog>
				<DialogTrigger className="cursor-zoom-in w-5/12 ">
					<PdfPreviewSection />
				</DialogTrigger>
				<DialogContent className="max-w-5xl p-0 rounded-lg  border-none max-h-screen">
					<PdfSection />
				</DialogContent>
			</Dialog> */}
		</>
	);
}
