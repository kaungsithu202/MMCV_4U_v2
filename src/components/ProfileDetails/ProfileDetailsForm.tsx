'use client';
import Image from 'next/image';
import DefaultForm from '../common/Forms/DefaultForm';
import IfElse from '../common/IfElse';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { Control } from 'react-hook-form';
import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	Dialog,
	DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { cn, convertFileToBase64 } from '@/lib/utils';
import getCroppedImg from '@/lib/cropImage';
import useCVStore from '@/store/useCVStore';
interface Props {
	control: Control<any>;
	profileImage: string;
}

const ProfileDetailsForm = ({ control }: Props) => {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [isOpenCropper, setIsOpenCropper] = useState(false);
	const [cropShape, setCropShape] = useState('rect');
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const [cropResultImage, setCropResultImage] = useState(null);
	const [profileImage, setProfileImage] = useState<string | null>(null);

	const setProfileImageZustand = useCVStore((state) => state.setProfileImage);

	const onCropComplete = (croppedArea, croppedAreaPixels) => {
		console.log('croppedAreaPixels', croppedAreaPixels);
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const convertProfileImageToBase64 = async (profileImgValue) => {
		const base64Img = await convertFileToBase64(profileImgValue);
		return base64Img;
	};

	const showCroppedImage = async () => {
		try {
			const croppedImage = await getCroppedImg(profileImage, croppedAreaPixels);
			console.log('donee', { croppedImage });
			setCropResultImage(croppedImage);
			setProfileImageZustand(croppedImage);
			setIsOpenCropper(false);
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<div className="flex items-start justify-between w-full relative">
			<div className="w-4/6">
				<DefaultForm
					control={control}
					name="fullName"
					label="Full name"
					placeholder="Enter your name"
				/>
				<DefaultForm
					control={control}
					name="jobTitle"
					label="Job title"
					placeholder="Enter job title"
				/>
				<div className="flex items-start gap-3">
					<DefaultForm
						control={control}
						name="email"
						label="Email"
						placeholder="Enter email"
					/>

					<DefaultForm
						control={control}
						name="phone"
						label="Phone"
						placeholder="Enter Phone"
					/>
				</div>
				<DefaultForm
					control={control}
					name="address"
					label="Address"
					placeholder="City,Country"
				/>
			</div>
			<Dialog open={isOpenCropper} onOpenChange={setIsOpenCropper}>
				<DialogContent className="h-[90vh] flex flex-col justify-center ">
					<DialogTitle className="absolute top-4 text-lg font-bold">
						Upload Portrait Photo
					</DialogTitle>

					<div className="w-full h-auto absolute top-14 left-0 right-0 bottom-20">
						<Cropper
							image={profileImage}
							crop={crop}
							zoom={zoom}
							aspect={1 / 1}
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							cropShape={cropShape}
						/>
					</div>

					<div className="absolute bottom-3 left-[50%] right-[50%] -translate-x-1/2  w-full">
						<div className="flex items-center justify-evenly">
							<div className="flex items-center gap-6">
								<div
									role="button"
									onClick={() => setCropShape('rect')}
									className={cn(
										'w-12 h-12 border-[1px] border-gray-400 bg-inherit cursor-pointer',
										{
											'bg-blue-300 border-[1px] border-blue-500':
												cropShape === 'rect',
										}
									)}
								></div>
								<div
									role="button"
									onClick={() => setCropShape('round')}
									className={cn(
										'w-12 h-12  rounded-full border-[1px] border-gray-400 cursor-pointer',
										{
											'bg-blue-300 border-[1px] border-blue-500':
												cropShape === 'round',
										}
									)}
								></div>
							</div>
							<input
								type="range"
								value={zoom}
								min={1}
								max={3}
								step={0.1}
								aria-labelledby="Zoom"
								onChange={(e) => {
									setZoom(e.target.value);
								}}
								className="zoom-range  h-1 bg-blue-500 w-80"
							/>
							<Button onClick={showCroppedImage}>Save</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>

			<FormField
				control={control}
				name="profileImg"
				render={({ field: { onChange } }) => (
					<FormItem className="w-32 h-32 bg-gray-200 rounded-full relative">
						{cropResultImage && (
							<Image
								src={cropResultImage}
								alt="profile"
								width={128}
								height={128}
								className="rounded-full w-32 h-32 object-cover cursor-pointer "
							/>
						)}
						<input
							type="file"
							accept="image/*"
							className="absolute inset-0 opacity-0"
							onChange={async (e) => {
								const base64Img = await convertProfileImageToBase64(
									e.target.files![0]
								);

								setProfileImage(base64Img);

								setIsOpenCropper(true);
							}}
						/>
						<FormMessage />
					</FormItem>
				)}
			/>
		</div>
	);
};

export default ProfileDetailsForm;
