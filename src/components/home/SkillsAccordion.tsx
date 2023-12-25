'use client';
import { usePathname, useRouter } from 'next/navigation';
import { Reorder } from 'framer-motion';
import { useState } from 'react';

import CustomAccordion from '../common/CustomAccordion';

import IconEye from '../icons/IconEye';
import IconProfile from '../icons/IconProfile';
import IconSkill from '../icons/IconSkill';
import IconOrder from '../icons/IconOrder';
import { useStore } from 'zustand';
import useCVStore from '@/store/useCVStore';
import { Button } from '../ui/button';
import IconPlus from '../icons/IconPlus';
import IconEdit from '../icons/IconEdit';

import useQueryParams from '@/hooks/useQueryParams';
const SkillsAccordion = () => {
	const skills = useStore(useCVStore, (state) => state.skills);
	const setSkills = useStore(useCVStore, (state) => state.setSkills);

	const [items, setItems] = useState(skills);

	const router = useRouter();

	const handleSkills = () => {
		router.push('/skills');
	};

	const handleEditSkill = (payload: string) => {
		router.push(`/skills?q=${payload}`);
	};

	console.log('skills', skills);
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
						// onClick={handleSkills}
						className="flex flex-col"
						axis="y"
						values={skills}
						onReorder={setSkills}
					>
						{skills.map((s) => (
							<Reorder.Item
								key={s.skill}
								className="flex items-center justify-between gap-3 py-3 px-3 rounded-md my-1 bg-violet-50 hover:bg-violet-200"
								value={s}
							>
								<div className="flex items-center justify-start gap-3">
									<IconOrder />{' '}
									<p className="text-base font-semibold">{s.skill}</p>
								</div>
								<IconEdit onClick={() => handleEditSkill(s.skill)} />
							</Reorder.Item>
						))}
					</Reorder.Group>
					<div className="flex items-center justify-center">
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
