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

	const handleProfileSummary = () => {
		router.push(EDIT_PROFILE_SUMMARY);
	};

	const parsedProfileSummary = parse(String(profileSummary));

	return (
		<CustomAccordion
			triggerSection={
				<div className="flex items-center justify-start gap-6 ">
					<IconProfile />
					<p className="card-header">Profile</p>
				</div>
			}
			contentSection={
				<div
					onClick={handleProfileSummary}
					className="flex items-center justify-between"
				>
					<p className="text-md font-medium">{parsedProfileSummary}</p>
					<IconEye />
				</div>
			}
		/>
	);
};

export default ProfileAccordion;
