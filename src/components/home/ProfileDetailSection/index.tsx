'use client';
import IfElse from '@/components/common/IfElse';
import EditableProfileDetail from './EditableProfileDetail';
import ProfileDetail from './ProfileDetail';
import useCVStore from '@/store/useCVStore';

const ProfileDetailSection = () => {
	const { isEditProfileDetail } = useCVStore();
	return <EditableProfileDetail />;
};

export default ProfileDetailSection;
