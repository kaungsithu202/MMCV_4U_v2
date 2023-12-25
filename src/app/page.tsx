import ProfileDetail from '@/components/home/ProfileDetailSection/ProfileDetail';
import ProfileAccordion from '@/components/home/ProfileAccordion';
import ExperienceAccordion from '@/components/home/ExperienceAccordion';
import SkillsAccordion from '@/components/home/SkillsAccordion';

export default function Home() {
	return (
		<section className="flex flex-col gap-6">
			<ProfileDetail />
			<ProfileAccordion />
			<ExperienceAccordion />
			<SkillsAccordion />
		</section>
	);
}
