'use client';
import IconCalendar from '@/components/icons/IconCalendar';
// name 36px
//job title 24px
//image 80x80
//other 12px
//title 16px

import IconEmail from '@/components/icons/IconEmail';
import IconFlag from '@/components/icons/IconFlag';
import IconHeart from '@/components/icons/IconHeart';
import IconId from '@/components/icons/IconId';
import IconMap from '@/components/icons/IconMap';
import IconPhone from '@/components/icons/IconPhone';
import IconUser from '@/components/icons/IconUser';
import useCVStore from '@/store/useCVStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
//12px
const PdfPreviewSection = () => {
	const pdfRef = useRef(null);
	const { profileDetail } = useCVStore();
	console.log(pdfRef);
	console.log('profileDetail?.phone');
	//max-h-[calc(100vh-3rem)]
	const handleDownloadPdf = () => {
		// const capture = document?.querySelector('.pdf-component');
		html2canvas(pdfRef?.current).then((canvas) => {
			const imgData = canvas.toDataURL('img/png');
			const doc = new jsPDF('p', 'mm', 'a4');
			const componentWidth = doc.internal.pageSize.getWidth();
			const componentHeight = doc.internal.pageSize.getHeight();
			doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
			doc.save('kst.pdf');
		});
	};
	return (
		<div ref={pdfRef} className="h-full w-full grid grid-cols-5 pdf-component">
			<div className="bg-[#672d50] p-6 items-center text-white col-span-2 ">
				<h1 className="text-2xl font-semibold ">{profileDetail.fullName}</h1>
				<h2 className="text-base ">{profileDetail.jobTitle}</h2>
				{profileDetail?.profileImg && (
					<Image
						src={profileDetail.profileImg}
						alt={`${profileDetail.fullName}'s photo`}
						width={80}
						height={80}
						className="w-28 h-28 object-cover rounded-full my-3"
					/>
				)}
				<address>
					{profileDetail.email && (
						<Link
							className="text-xxs flex items-center gap-2"
							href={`mailto:${profileDetail?.email}`}
						>
							<IconEmail className="text-white w-3 h-auto" />
							{profileDetail.email}
						</Link>
					)}
					{profileDetail.phone && (
						<Link
							className="text-xxs flex items-center gap-2"
							href={`tel:+95${+profileDetail?.phone}`}
						>
							<IconPhone className="text-white w-3 h-auto" />
							{profileDetail.phone}
						</Link>
					)}
					{profileDetail.address && (
						<div className="text-xxs flex items-center gap-2">
							<IconMap className="text-white w-3 h-auto" />
							<p>{profileDetail.address}</p>
						</div>
					)}
				</address>
				{profileDetail.martial && (
					<div className="text-xxs flex items-center gap-2">
						<IconHeart className="text-white w-3 h-auto" />
						<p>{profileDetail.martial}</p>
					</div>
				)}
				{profileDetail.gender && (
					<div className="text-xxs flex items-center gap-2">
						<IconUser className="text-white w-3 h-auto" />
						<p>{profileDetail.gender}</p>
					</div>
				)}
				{profileDetail.dateOfBirth && (
					<div className="text-xxs flex items-center gap-2">
						<IconCalendar className="text-white w-3 h-auto" />
						<p>{profileDetail.dateOfBirth}</p>
					</div>
				)}
				{profileDetail.passport && (
					<div className="text-xxs flex items-center gap-2">
						<IconId className="text-white w-3 h-auto" />
						<p>{profileDetail.passport}</p>
					</div>
				)}
				{profileDetail.nationality && (
					<div className="text-xxs flex items-center gap-2">
						<IconFlag className="text-white w-3 h-auto" />
						<p>{profileDetail.nationality}</p>
					</div>
				)}
			</div>
			<div className="col-span-3 bg-white">
				<button onClick={handleDownloadPdf}>Download</button>
			</div>
		</div>
	);
};

export default PdfPreviewSection;
