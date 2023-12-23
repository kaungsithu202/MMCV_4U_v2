'use client';
import parse from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { RefObject, forwardRef } from 'react';

import IconCalendar from '@/components/icons/IconCalendar';
import IconEmail from '@/components/icons/IconEmail';
import IconFlag from '@/components/icons/IconFlag';
import IconHeart from '@/components/icons/IconHeart';
import IconId from '@/components/icons/IconId';
import IconMap from '@/components/icons/IconMap';
import IconPhone from '@/components/icons/IconPhone';
import IconUser from '@/components/icons/IconUser';

import useStore from '@/hooks/useStore';
import useCVStore from '@/store/useCVStore';

const FullResume = forwardRef((props, ref) => {
	const profileDetail = useStore(useCVStore, (state) => state.profileDetail);

	const profileSummary = useStore(useCVStore, (state) => state.profileSummary);

	const parsedProfileSummary = parse(String(profileSummary));

	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="min-h-screen  h-[calc(100vh-1.5rem)] w-full grid grid-cols-5 pdf-component"
		>
			<div className="bg-[#672d50] p-6 items-center text-white col-span-2 ">
				<h1 className="text-2xl font-semibold ">{profileDetail?.fullName}</h1>
				<h2 className="text-base ">{profileDetail?.jobTitle}</h2>
				{profileDetail?.profileImg && (
					<Image
						src={profileDetail.profileImg}
						alt={`${profileDetail.fullName}'s photo`}
						width={80}
						height={80}
						className="w-28 h-28 object-cover rounded-full my-3"
					/>
				)}
				<div className="flex flex-col gap-2">
					<address className="flex flex-col gap-2">
						{profileDetail?.email && (
							<Link
								className="text-xxs flex items-center gap-2"
								href={`mailto:${profileDetail?.email}`}
							>
								<IconEmail className="text-white w-3 h-auto" />
								{profileDetail?.email}
							</Link>
						)}
						{profileDetail?.phone && (
							<Link
								className="text-xxs flex items-center gap-2"
								href={`tel:+95${+profileDetail?.phone}`}
							>
								<IconPhone className="text-white w-3 h-auto" />
								{profileDetail?.phone}
							</Link>
						)}
						{profileDetail?.address && (
							<div className="text-xxs flex items-start gap-2">
								<IconMap className="text-white w-3 h-auto" />
								<p>{profileDetail.address}</p>
							</div>
						)}
					</address>
					{profileDetail?.martial && (
						<div className="text-xxs flex items-center gap-2">
							<IconHeart className="text-white w-3 h-auto" />
							<p>{profileDetail.martial}</p>
						</div>
					)}
					{profileDetail?.gender && (
						<div className="text-xxs flex items-center gap-2">
							<IconUser className="text-white w-3 h-auto" />
							<p>{profileDetail.gender}</p>
						</div>
					)}
					{profileDetail?.dateOfBirth && (
						<div className="text-xxs flex items-center gap-2">
							<IconCalendar className="text-white w-3 h-auto" />
							<p>{profileDetail.dateOfBirth}</p>
						</div>
					)}
					{profileDetail?.passport && (
						<div className="text-xxs flex items-center gap-2">
							<IconId className="text-white w-3 h-auto" />
							<p>{profileDetail.passport}</p>
						</div>
					)}
					{profileDetail?.nationality && (
						<div className="text-xxs flex items-center gap-2">
							<IconFlag className="text-white w-3 h-auto" />
							<p>{profileDetail.nationality}</p>
						</div>
					)}
				</div>
				<section className="my-3">
					<h2 className="text-xs font-bold uppercase">Profile</h2>
					<p className="text-xxs mt-1">{parsedProfileSummary}</p>
				</section>
			</div>
			<div className="col-span-3 bg-white">
				{/* <button onClick={handleDownloadPdf}>Download</button> */}
				<div>asd</div>
			</div>
		</div>
	);
});

export default FullResume;
