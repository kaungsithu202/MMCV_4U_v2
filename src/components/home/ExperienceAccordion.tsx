'use client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import CustomAccordion from '../common/CustomAccordion';

import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';
import IconEditCircle from '../icons/IconEditCircle';
import IconPlus from '../icons/IconPlus';
import IconProfile from '../icons/IconProfile';
import IconTrash from '../icons/IconTrash';
import { Button } from '../ui/button';

const ExperienceAccordion = () => {
	const experience = useStore(useCVStore, (state) => state.experience);
	const deleteExperience = useStore(useCVStore, (state) => state.deleteExperience);
	const addExperience = useStore(useCVStore, (state) => state.addExperience);

	const router = useRouter();

	const handleAddExperience = () => {
		router.push('/experience');
	};

	const handleEditExperience = (id: string) => {
		router.push(`/experience?q=${id}`);
	};

	const handleDeleteExperience = (entry: { id: string; expJobTitle: string }) => {
		const entryData = experience.find((exp) => exp.id === entry.id);
		deleteExperience(entry.id);
		toast.success(`Deleted "${entry.expJobTitle}"`, {
			action: {
				label: 'Undo',
				onClick: () => {
					if (entryData) {
						addExperience(entryData);
					}
				},
			},
		});
	};

	if (!experience || experience.length === 0) {
		return null;
	}

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 text-ink">
					<IconProfile className="text-terracotta" />
					<p className="card-header">Experience</p>
				</div>
			}
			contentSection={
				<>
					{experience.map((exp) => (
						<div
							key={exp.id}
						className="flex items-center justify-between gap-3 py-3 px-3 rounded-xl my-1 bg-secondary/50 hover:bg-secondary border border-clay/30"
						>
							<p className="text-base font-semibold">{exp.expJobTitle}</p>
							<div className="flex items-center gap-2">
								<button
									onClick={() => handleEditExperience(exp.id)}
									aria-label={`Edit ${exp.expJobTitle}`}
								>
									<IconEditCircle className="w-5 h-auto text-plum" />
								</button>
								<button
									onClick={() => handleDeleteExperience(exp)}
									aria-label={`Delete ${exp.expJobTitle}`}
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
							onClick={handleAddExperience}
						>
							<IconPlus className="mr-3" /> Experience
						</Button>
					</div>
				</>
			}
		/>
	);
};

export default ExperienceAccordion;
