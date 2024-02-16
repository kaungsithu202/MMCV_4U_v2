'use client';
import IconEye from '@/components/icons/IconEye';
import IconProfile from '@/components/icons/IconProfile';

import CustomAccordion from '@/components/common/CustomAccordion';
import { PROJECTS_URL } from '@/constants/routes';
import useCVStore from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';

const ProjectAccordion = () => {
	const router = useRouter();
	const projects = useStore(useCVStore, (state) => state.projects);

	const handleGoToProjectPage = () => {
		router.push(PROJECTS_URL);
	};

	if (projects.projectTitle?.length === 0) {
		return null;
	}

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 ">
					<IconProfile />
					<p className="card-header">Projects</p>
				</div>
			}
			contentSection={
				<div
					onClick={handleGoToProjectPage}
					className="flex items-center justify-between"
				>
					<p className="text-base font-medium">{projects?.projectTitle}</p>
					<IconEye />
				</div>
			}
		/>
	);
};

export default ProjectAccordion;
