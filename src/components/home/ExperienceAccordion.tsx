'use client';
import { useRouter } from 'next/navigation';

import CustomAccordion from '../common/CustomAccordion';

import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';
import IconEye from '../icons/IconEye';
import IconProfile from '../icons/IconProfile';

const ExperienceAccordion = () => {
	const experience = useStore(useCVStore, (state) => state.experience);

	const router = useRouter();

	const handleExperience = () => {
		router.push('/experience');
	};

	if (experience.expJobTitle.length === 0) {
		return null;
	}

	console.log('experience', experience.expJobTitle);

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 ">
					<IconProfile />
					<p className="card-header">Experience</p>
				</div>
			}
			contentSection={
				<div
					onClick={handleExperience}
					className="flex items-center justify-between"
				>
					<p className="text-base font-medium">{experience?.expJobTitle}</p>
					<IconEye />
				</div>
			}
		/>
	);
};

export default ExperienceAccordion;
