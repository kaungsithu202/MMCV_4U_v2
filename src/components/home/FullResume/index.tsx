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
import useQueryParams from '@/hooks/useQueryParams';
const FullResume = forwardRef((props, ref) => {
	const profileDetail = useStore(useCVStore, (state) => state.profileDetail);
	const profileSummary = useStore(useCVStore, (state) => state.profileSummary);
	const exp = useStore(useCVStore, (state) => state.experience);
	const skills = useStore(useCVStore, (state) => state.skills);
	const projects = useStore(useCVStore, (state) => state.projects);

	const parsedProfileSummary = parse(String(profileSummary));
	console.log('sss', exp?.expSummary);
	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="min-h-screen  overflow-scroll no-scrollbar w-full grid grid-cols-5 pdf-component"
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
				{parsedProfileSummary !== '' && (
					<section className="my-3">
						<h2 className="text-xs font-bold uppercase">Profile</h2>
						<p className="text-xxs mt-1">{parsedProfileSummary}</p>
					</section>
				)}
				{skills?.length !== 0 && (
					<div>
						<h2 className="text-xs font-bold uppercase">Skills</h2>
						{skills?.map?.((s) => (
							<p className="text-xxs mt-1">{s.skill}</p>
						))}
					</div>
				)}
			</div>
			<section className="col-span-3 p-6 text-black bg-white flex flex-col gap-2">
				{exp?.expJobTitle && (
					<div>
						<h3 className="font-bold my-1">EXPERIENCE</h3>
						<h2 className="text-xs italic  font-semibold">
							{exp?.expJobTitle}
						</h2>
						<p className="text-xxs">
							{exp?.startMonths} {exp?.startYears} - present {exp?.endMonths}{' '}
							{exp?.endYears} | {exp?.expCity} {exp?.expCountry && ','}
							{exp?.expCountry}
						</p>
						<p className="text-xxs leading-tight">
							{parse(String(exp?.expSummary))}
						</p>
					</div>
				)}
				<div>
					<h3 className="font-bold my-1">PROJECTS</h3>
					<h2 className="text-xs italic  font-semibold">
						{projects?.projectTitle}
					</h2>
					{projects?.startMonths && (
						<p className="text-xxs">
							{projects?.startMonths} {projects?.startYears} -{' '}
							{projects?.endMonths} {projects?.endYears}
						</p>
					)}
					<div className="text-xxs leading-tight list-disc ">
						{parse(String(projects?.projectSummary))}
					</div>
				</div>
			</section>
		</div>
	);
});

export default FullResume;
