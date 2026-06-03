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
import IconGithub from '@/components/icons/IconGithub';
import IconLinkedin from '@/components/icons/IconLinkedin';

const FullResume = forwardRef((props, ref) => {
	const profileDetail = useStore(useCVStore, (state) => state.profileDetail);
	const profileSummary = useStore(useCVStore, (state) => state.profileSummary);
	const profileImg = useStore(useCVStore, (state) => state.profileImg);
	const experiences = useStore(useCVStore, (state) => state.experience);
	const skills = useStore(useCVStore, (state) => state.skills);
	const projects = useStore(useCVStore, (state) => state.projects);

	const hasContent = (value: unknown) => {
		if (value === null || value === undefined) return false;
		const content = String(value).trim();
		return content !== '' && content !== 'null' && content !== '<p><br></p>';
	};

	const parsedProfileSummary: any = hasContent(profileSummary)
		? parse(String(profileSummary))
		: null;
	return (
		<div
			ref={ref as RefObject<HTMLDivElement>}
			className="overflow-scroll no-scrollbar w-full min-h-screen grid grid-cols-5 pdf-component bg-paper shadow-inner"
		>
			<div className="bg-plum p-6 items-center text-paper col-span-2">
				<h1 className="text-2xl font-semibold ">{profileDetail?.fullName}</h1>
				<h2 className="text-base text-paper/75">{profileDetail?.jobTitle}</h2>
				{profileImg && (
					<Image
						src={profileImg}
						alt={`${profileDetail?.fullName}'s photo`}
						width={80}
						height={80}
						className="w-28 h-28 object-cover rounded-full my-3"
					/>
				)}
				<div className="flex flex-col gap-2 resume-sidebar-details">
					<div
						className="flex flex-col gap-2 resume-contact-list"
						role="group"
						aria-label="Contact information"
					>
						{profileDetail?.email && (
							<Link
								className="text-xs flex items-center gap-2 resume-contact-row"
								href={`mailto:${profileDetail?.email}`}
							>
								<IconEmail className="text-marigold w-3 h-auto" />
								{profileDetail?.email}
							</Link>
						)}
					{profileDetail?.phone && (
						<Link
							className="text-xs flex items-center gap-2 resume-contact-row"
							href={`tel:${profileDetail?.phone}`}
						>
							<IconPhone className="text-marigold w-3 h-auto" />
							{profileDetail?.phone}
						</Link>
					)}
						{profileDetail?.address && (
							<div className="text-xs flex items-start gap-2 resume-contact-row">
								<IconMap className="text-marigold w-3 h-auto" />
								<p>{profileDetail.address}</p>
							</div>
						)}
					</div>
					{profileDetail?.martial && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconHeart className="text-marigold w-3 h-auto" />
							<p>{profileDetail.martial}</p>
						</div>
					)}
					{profileDetail?.gender && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconUser className="text-marigold w-3 h-auto" />
							<p>{profileDetail.gender}</p>
						</div>
					)}
					{profileDetail?.dateOfBirth && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconCalendar className="text-marigold w-3 h-auto" />
							<p>{profileDetail.dateOfBirth}</p>
						</div>
					)}
					{profileDetail?.github && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconGithub className="text-marigold w-3 h-auto" />
							<p>{profileDetail.github}</p>
						</div>
					)}
					{profileDetail?.linkedin && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconLinkedin className="text-marigold w-3 h-auto" />
							<p>{profileDetail.linkedin}</p>
						</div>
					)}
					{profileDetail?.passport && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconId className="text-marigold w-3 h-auto" />
							<p>{profileDetail.passport}</p>
						</div>
					)}
					{profileDetail?.nationality && (
						<div className="text-xs flex items-center gap-2 resume-contact-row">
							<IconFlag className="text-marigold w-3 h-auto" />
							<p>{profileDetail.nationality}</p>
						</div>
					)}
				</div>
				{hasContent(profileSummary) && (
					<section className="my-4 border-t border-paper/18 pt-3">
						<h2 className="text-xs font-bold uppercase tracking-[0.14em] text-marigold">Profile</h2>
						<p className="text-xs mt-1 text-paper/85">{parsedProfileSummary}</p>
					</section>
				)}
				{skills?.length !== 0 && (
					<div>
						<h2 className="text-xs font-bold uppercase mt-4 tracking-[0.14em] text-marigold">Skills</h2>
						{skills?.map?.((s) => (
							<div key={s.id}>
								<p className="text-sm mt-1 font-semibold text-paper">
									{s.skill}
								</p>
								{hasContent(s.subSkills) && (
									<li className="text-xs mt-1 text-paper/80">{s.subSkills}</li>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		<section className="col-span-3 p-6 text-ink bg-paper flex flex-col gap-4">
		{experiences?.length > 0 && (
			<div>
				<h3 className="font-bold my-1 text-plum tracking-[0.16em] text-xs">EXPERIENCE</h3>
				{experiences.map((entry) => (
						<div key={entry.id} className="mb-4 border-b border-clay/35 pb-3 last:border-b-0">
							<h2 className="text-sm font-bold text-ink">
								{entry.expJobTitle}
							</h2>
							<p className="text-xs text-muted">
								{entry.startMonths} {entry.startYears} - {entry.endMonths}{' '}
								{entry.endYears} | {entry.expCity}{' '}
								{entry.expCountry && ', '}{entry.expCountry}
							</p>
							{hasContent(entry.expSummary) && (
								<div className="text-xs leading-relaxed text-ink/85 mt-1">
									{parse(String(entry.expSummary))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
			{projects?.length > 0 && (
				<div>
					<h3 className="font-bold my-1 text-plum tracking-[0.16em] text-xs">PROJECTS</h3>
					{projects.map((proj) => (
						<div key={proj.id} className="mb-4 border-b border-clay/35 pb-3 last:border-b-0">
							<h2 className="text-sm font-bold text-ink">
								{proj.projectTitle}
							</h2>
							{proj.startMonths && (
								<p className="text-xs text-muted">
									{proj.startMonths} {proj.startYears} -{' '}
									{proj.endMonths} {proj.endYears}
								</p>
							)}
							{hasContent(proj.projectSummary) && (
								<div className="text-xs leading-relaxed list-disc text-ink/85 mt-1">
									{parse(String(proj.projectSummary))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</section>
		</div>
	);
});

export default FullResume;
