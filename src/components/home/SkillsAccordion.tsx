'use client';
import { Reorder } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import CustomAccordion from '../common/CustomAccordion';

import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';
import IconOrder from '../icons/IconOrder';
import IconPlus from '../icons/IconPlus';
import IconSkill from '../icons/IconSkill';
import { Button } from '../ui/button';

import IconEditCircle from '../icons/IconEditCircle';
const SkillsAccordion = () => {
	const skills = useStore(useCVStore, (state) => state.skills);
	const setSkills = useStore(useCVStore, (state) => state.setSkills);

	if (skills?.length === 0) return null;

	const [items, setItems] = useState(skills);

	const router = useRouter();

	const handleSkills = () => {
		router.push('/skills');
	};

	const handleEditSkill = (payload: string) => {
		router.push(`/skills?q=${payload}`);
	};

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 ">
					<IconSkill />
					<p className="card-header">Skills</p>
				</div>
			}
			contentSection={
				<>
					<Reorder.Group
						className="flex flex-col"
						axis="y"
						values={skills}
						onReorder={setSkills}
					>
						{skills.map((s) => (
							<Reorder.Item
								key={s.id}
								className="flex items-center justify-between gap-3 py-3 px-3 rounded-md my-1 bg-violet-50 hover:bg-violet-100"
								value={s}
							>
								<div className="flex items-center justify-start gap-3">
									<IconOrder />{' '}
									<p className="text-base font-semibold">{s.skill}</p>
								</div>
								<IconEditCircle
									className="w-5 h-auto"
									onClick={() => handleEditSkill(s.id)}
								/>
							</Reorder.Item>
						))}
					</Reorder.Group>

					<div className="flex items-center justify-center mt-3">
						<Button
							variant="outline"
							className="rounded-3xl border-gray-200 border-4 "
							size="lg"
							onClick={handleSkills}
						>
							<IconPlus className="mr-3" /> Skills
						</Button>
					</div>
				</>
			}
		/>
	);
};

export default SkillsAccordion;
