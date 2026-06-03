'use client';
import { useRouter } from 'next/navigation';
import IconPlus from '@/components/icons/IconPlus';
import IconProfile from '@/components/icons/IconProfile';
import IconWork from '@/components/icons/IconWork';
import IconSkill from '@/components/icons/IconSkill';
import IconProjects from '@/components/icons/IconProjects';
import { PROFILE_DETAIL_URL, SKILLS_URL, EXPERIENCE_URL, PROJECTS_URL } from '@/constants/routes';

const quickActions = [
	{ label: 'Add your name & photo', icon: IconProfile, href: PROFILE_DETAIL_URL },
	{ label: 'Add your first skill', icon: IconSkill, href: SKILLS_URL },
	{ label: 'Add work experience', icon: IconWork, href: EXPERIENCE_URL },
	{ label: 'Add a project', icon: IconProjects, href: PROJECTS_URL },
];

const EmptyState = () => {
	const router = useRouter();

	return (
		<div className="bg-paper border border-clay/40 round p-8 text-center shadow-sm">
			<div className="max-w-md mx-auto">
				<div className="w-16 h-16 bg-plum-soft rounded-full flex items-center justify-center mx-auto mb-4">
					<IconPlus className="w-8 h-8 text-plum" />
				</div>
				<h2 className="text-xl font-bold mb-2 text-ink">Start building your resume</h2>
				<p className="text-muted mb-6">
					Fill in your details and watch your resume come to life in real time on the right.
				</p>
				<div className="grid grid-cols-2 gap-3">
					{quickActions.map(({ label, icon: Icon, href }) => (
						<button
							key={label}
							onClick={() => router.push(href)}
							className="flex items-center gap-2 px-4 py-3 rounded-xl border border-clay/50 bg-secondary/40 hover:border-terracotta/60 hover:bg-secondary transition-colors text-left text-sm font-semibold text-ink"
						>
							<Icon className="w-4 h-4 text-terracotta shrink-0" />
							{label}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default EmptyState;
