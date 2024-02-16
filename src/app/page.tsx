import dynamic from 'next/dynamic';

import ExperienceAccordion from '@/components/home/ExperienceAccordion';
import ProfileAccordion from '@/components/home/ProfileAccordion';
import ProjectAccordion from '@/components/home/ProjectAccordion';
import SkillsAccordion from '@/components/home/SkillsAccordion';
import ContentDialogSection from '@/components/home/ContentDialogSection';

const ProfileDetail = dynamic(
	() => import('@/components/home/ProfileDetailSection/ProfileDetailInfo')
);

export default function Home() {
	return (
		<section className="flex flex-col gap-6 ">
			<ProfileDetail />
			<ProfileAccordion />
			<SkillsAccordion />
			<ExperienceAccordion />
			<ProjectAccordion />
			<ContentDialogSection />
		</section>
	);
}
