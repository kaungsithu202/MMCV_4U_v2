'use client';
import { useRouter } from 'next/navigation';

import CustomAccordion from '../common/CustomAccordion';

import IconEye from '../icons/IconEye';
import IconProfile from '../icons/IconProfile';

const ExperienceAccordion = () => {
	const router = useRouter();

	const handleExperience = () => {
		router.push('/experience');
	};
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
					{/* <p className="text-md font-medium">{parsedProfileSummary}</p> */}
					<IconEye />
				</div>
			}
		/>
	);
};

export default ExperienceAccordion;
