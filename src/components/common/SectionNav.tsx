'use client';
import { useRouter } from 'next/navigation';
import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';
import IconProfile from '@/components/icons/IconProfile';
import IconSkill from '@/components/icons/IconSkill';
import IconWork from '@/components/icons/IconWork';
import IconProjects from '@/components/icons/IconProjects';
import IconUser from '@/components/icons/IconUser';

const navItems = [
	{ label: 'Profile', icon: IconProfile, href: '/profile-detail' },
	{ label: 'Skills', icon: IconSkill, href: '/skills' },
	{ label: 'Experience', icon: IconWork, href: '/experience' },
	{ label: 'Projects', icon: IconProjects, href: '/projects' },
];

const SectionNav = () => {
	const router = useRouter();
	const skills = useStore(useCVStore, (state) => state.skills);
	const experience = useStore(useCVStore, (state) => state.experience);
	const projects = useStore(useCVStore, (state) => state.projects);

	const getItemCount = (label: string) => {
		switch (label) {
			case 'Skills':
				return skills?.length || 0;
			case 'Experience':
				return experience?.length || 0;
			case 'Projects':
				return projects?.length || 0;
			default:
				return null;
		}
	};

	return (
		<nav
			className="w-52 flex flex-col gap-2 py-6 px-3 bg-plum text-paper"
			aria-label="Resume sections"
		>
			<div className="px-3 pb-4">
				<p className="text-xs font-bold uppercase tracking-[0.18em] text-paper/55">
					Resume Desk
				</p>
				<p className="mt-1 text-sm text-paper/75">Build each section</p>
			</div>
			{navItems.map(({ label, icon: Icon, href }) => {
				const count = getItemCount(label);
				return (
					<button
						key={label}
						onClick={() => router.push(href)}
						className="flex items-center gap-3 px-3 py-3 rounded-xl text-left text-sm font-semibold text-paper/78 hover:text-paper hover:bg-paper/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold transition-colors"
					>
						<Icon className="w-4 h-4 shrink-0 text-marigold" />
						<span className="flex-1">{label}</span>
						{count !== null && count > 0 && (
							<span className="rounded-full bg-paper/12 px-2 py-0.5 text-xs text-paper/75">
								{count}
							</span>
						)}
					</button>
				);
			})}
		</nav>
	);
};

export default SectionNav;
