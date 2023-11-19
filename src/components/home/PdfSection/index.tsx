'use client';
// name 36px
//job title 24px
//image 80x80
//other 12px
//title 16px

import IconEmail from '@/components/icons/IconEmail';
import IconPhone from '@/components/icons/IconPhone';
import useCVStore from '@/store/useCVStore';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//12px
const PdfSection = () => {
	const { profileDetail } = useCVStore();

	console.log('profileDetail?.phone');
	//max-h-[calc(100vh-3rem)]

	return (
		<div className="w-full    h-full grid grid-cols-5 pdf-component">
			<div className="bg-[#672d50] rounded-l-lg p-14  text-white col-span-2">
				<h1 className="text-5xl font-semibold ">{profileDetail.fullName}</h1>
				<h2 className="text-3xl ">{profileDetail.jobTitle}</h2>
				{profileDetail?.profileImg && (
					<Image
						src={profileDetail.profileImg}
						alt={`${profileDetail.fullName}'s photo`}
						width={160}
						height={160}
						className="w-48 h-48 object-cover rounded-full my-3"
					/>
				)}
				<address>
					{profileDetail.email && (
						<Link
							className="text-base flex items-center gap-2"
							href={`mailto:${profileDetail?.email}`}
						>
							<IconEmail className="text-white w-5 h-auto" />
							{profileDetail.email}
						</Link>
					)}
					{profileDetail.phone && (
						<Link
							className="text-base flex items-center gap-2"
							href={`tel:+95${+profileDetail?.phone}`}
						>
							<IconPhone className="text-white w-5 h-auto" />
							{profileDetail.phone}
						</Link>
					)}
				</address>
			</div>
			<div className="col-span-3">
				{/* <button onClick={handleDownloadPdf}>Download</button> */}
			</div>
		</div>
	);
};

export default PdfSection;
