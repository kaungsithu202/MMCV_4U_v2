'use client';
import IconEye from '@/components/icons/IconEye';
import IconProfile from '@/components/icons/IconProfile';

import parse from 'html-react-parser';

import CustomAccordion from '@/components/common/CustomAccordion';
import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';
import { EDIT_PROFILE_SUMMARY } from '@/constants/routes';
import { useRouter } from 'next/navigation';

const ProfileAccordion = () => {
	const router = useRouter();

	const profileSummary = useStore(useCVStore, (state) => state.profileSummary);
	const summaryContent = String(profileSummary).trim();

	if (!summaryContent || summaryContent === 'null' || summaryContent === '<p><br></p>') {
		return null;
	}

	const handleProfileSummary = () => {
		router.push(EDIT_PROFILE_SUMMARY);
	};

	const parsedProfileSummary = parse(summaryContent);

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 text-ink">
					<IconProfile className="text-terracotta" />
					<p className="card-header">Profile</p>
				</div>
			}
			contentSection={
				<div
					onClick={handleProfileSummary}
					className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2 text-ink hover:bg-secondary"
				>
					<p className="text-md font-medium">{parsedProfileSummary}</p>
					<IconEye className="text-plum" />
				</div>
			}
		/>
	);
};

export default ProfileAccordion;
