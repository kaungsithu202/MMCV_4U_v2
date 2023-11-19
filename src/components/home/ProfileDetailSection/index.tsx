'use client';
import IfElse from '@/components/common/IfElse';
import EditableProfileDetail from './EditableProfileDetail';
import ProfileDetail from './ProfileDetail';
import useCVStore from '@/store/useCVStore';

const ProfileDetailSection = () => {
	const { isEditProfileDetail } = useCVStore();
	return (
		<IfElse
			isTrue={isEditProfileDetail}
			ifBlock={<EditableProfileDetail />}
			elseBlock={<ProfileDetail />}
		/>
	);
};

export default ProfileDetailSection;
