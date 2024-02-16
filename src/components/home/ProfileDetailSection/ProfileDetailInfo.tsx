'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Lottie from 'lottie-react';

import IconAddress from '@/components/icons/IconAddress';
import IconEdit from '@/components/icons/IconEdit';
import IconEmail from '@/components/icons/IconEmail';
import IconPhone from '@/components/icons/IconPhone';

import profileAnimation from '@/assets/profileAnimation.json';

import { PROFILE_DETAIL_URL } from '@/constants/routes';

import { cn } from '@/lib/utils';

import useStore from '@/hooks/useStore';
import useCVStore from '@/store/useCVStore';

const ProfileDetailInfo = () => {
	const profileDetail = useStore(useCVStore, (state) => state.profileDetail);
	const profileImg = useStore(useCVStore, (state) => state.profileImg);

	if (!profileDetail) return;

	const { fullName, jobTitle, email, phone, address } = profileDetail;

	const router = useRouter();

	const handleProfileDetail = () => {
		router.push(PROFILE_DETAIL_URL);
	};

	const isEmptyField = (state: string, text: string) => {
		return state?.length === 0 ? text : state;
	};

	const dynamicColor = (state: string) => {
		return state?.trim().length === 0 ? 'text-color-placeholder' : 'text-black';
	};
	return (
		<div
			className="card-layout flex justify-between items-start "
			onClick={handleProfileDetail}
		>
			<div>
				<p className={cn('text-xl font-semibold', dynamicColor(fullName))}>
					{isEmptyField(fullName, 'Your Name')}
				</p>
				{jobTitle && (
					<p className="text-lg font-medium text-gray-400">{jobTitle}</p>
				)}
				<div className="flex items-center gap-2">
					<IconEmail className={cn('icon-size', dynamicColor(email))} />
					<p className={cn('text-md', dynamicColor(email))}>
						{isEmptyField(email, 'Email')}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<IconPhone className={cn('icon-size', dynamicColor(phone))} />
					<p className={cn('text-md', dynamicColor(phone))}>
						{isEmptyField(phone, 'Phone')}
					</p>
				</div>
				<div className="flex items-center gap-2">
					<IconAddress className={cn('icon-size', dynamicColor(address))} />
					<p className={cn('text-md', dynamicColor(address))}>
						{isEmptyField(address, 'Address')}
					</p>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center">
				<button className="icon-btn">
					<IconEdit className="text-white icon-size" />
				</button>
				{profileImg ? (
					<Image
						src={profileImg}
						alt=""
						width={128}
						height={128}
						className="w-32 h-32 rounded-full object-cover object-center mt-3 "
					/>
				) : (
					<Lottie
						animationData={profileAnimation}
						loop={true}
						className="w-32 h-32 mt-3"
					/>
				)}
			</div>
		</div>
	);
};

export default ProfileDetailInfo;
