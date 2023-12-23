import ProfileDetail from '@/components/home/ProfileDetailSection/ProfileDetail';
import ProfileAccordion from '@/components/home/ProfileAccordion';
import ExperienceAccordion from '@/components/home/ExperienceAccordion';

export default function Home() {
	return (
		<section className="flex flex-col gap-6">
			<ProfileDetail />
			<ProfileAccordion />
			<ExperienceAccordion />
		</section>
	);
}
