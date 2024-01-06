'use client';
import Image from 'next/image';
import DefaultForm from '../common/Forms/DefaultForm';
import IfElse from '../common/IfElse';
import { FormField, FormItem, FormMessage } from '../ui/form';
import { Control } from 'react-hook-form';

interface Props {
	control: Control<any>;
	profileImage: string;
}

const ProfileDetailsForm = ({ control, profileImage }: Props) => {
	return (
		<div className="flex items-start justify-between w-full">
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
			<IfElse
				isTrue={profileImage?.length === 0}
				ifBlock={
					<FormField
						control={control}
						name="profileImg"
						render={({ field: { onChange } }) => (
							<FormItem className="w-32 h-32 bg-gray-200 rounded-full relative">
								<input
									type="file"
									accept="image/*"
									className="absolute inset-0 opacity-0"
									onChange={(e) => onChange(e.target.files![0])}
								/>
								<FormMessage />
							</FormItem>
						)}
					/>
				}
				elseBlock={
					<Image
						src={profileImage}
						alt="profile"
						width={128}
						height={128}
						className="rounded-full w-32 h-32 object-cover "
					/>
				}
			/>
		</div>
	);
};

export default ProfileDetailsForm;
