'use client';
import { toast } from 'sonner';

import IconPlus from '@/components/icons/IconPlus';
import IconProfile from '@/components/icons/IconProfile';
import IconTrash from '@/components/icons/IconTrash';
import IconEditCircle from '@/components/icons/IconEditCircle';
import { Button } from '@/components/ui/button';

import CustomAccordion from '@/components/common/CustomAccordion';
import { PROJECTS_URL } from '@/constants/routes';
import useCVStore from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { useStore } from 'zustand';

const ProjectAccordion = () => {
	const router = useRouter();
	const projects = useStore(useCVStore, (state) => state.projects);
	const deleteProject = useStore(useCVStore, (state) => state.deleteProject);
	const addProject = useStore(useCVStore, (state) => state.addProject);

	const handleAddProject = () => {
		router.push(PROJECTS_URL);
	};

	const handleEditProject = (id: string) => {
		router.push(`${PROJECTS_URL}?q=${id}`);
	};

	const handleDeleteProject = (proj: { id: string; projectTitle: string }) => {
		const projData = projects.find((p) => p.id === proj.id);
		deleteProject(proj.id);
		toast.success(`Deleted "${proj.projectTitle}"`, {
			action: {
				label: 'Undo',
				onClick: () => {
					if (projData) {
						addProject(projData);
					}
				},
			},
		});
	};

	if (!projects || projects.length === 0) {
		return null;
	}

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 text-ink">
					<IconProfile className="text-terracotta" />
					<p className="card-header">Projects</p>
				</div>
			}
			contentSection={
				<>
					{projects.map((proj) => (
						<div
							key={proj.id}
						className="flex items-center justify-between gap-3 py-3 px-3 rounded-xl my-1 bg-secondary/50 hover:bg-secondary border border-clay/30"
						>
							<p className="text-base font-semibold">{proj.projectTitle}</p>
							<div className="flex items-center gap-2">
								<button
									onClick={() => handleEditProject(proj.id)}
									aria-label={`Edit ${proj.projectTitle}`}
								>
									<IconEditCircle className="w-5 h-auto text-plum" />
								</button>
								<button
									onClick={() => handleDeleteProject(proj)}
									aria-label={`Delete ${proj.projectTitle}`}
								>
									<IconTrash className="w-5 h-auto text-[var(--danger)]" />
								</button>
							</div>
						</div>
					))}
					<div className="flex items-center justify-center mt-3">
						<Button
							variant="outline"
							className="rounded-3xl border-clay/60 border"
							size="lg"
							onClick={handleAddProject}
						>
							<IconPlus className="mr-3" /> Project
						</Button>
					</div>
				</>
			}
		/>
	);
};

export default ProjectAccordion;
