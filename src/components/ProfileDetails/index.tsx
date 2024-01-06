'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { convertFileToBase64 } from '@/lib/utils';
import useCVStore from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PersonalInformationForm from './PersonalInformationForm';
import ProfileDetailsForm from './ProfileDetailsForm';

export interface IPersonalInformation {
	id: number;
	name: string;
	fieldName: string;
}

const personalInformationFields: IPersonalInformation[] = [
	{
		id: 1,
		name: 'Date Of Birth',
		fieldName: 'dateOfBirth',
	},
	{
		id: 2,
		name: 'Nationality',
		fieldName: 'nationality',
	},
	{
		id: 3,
		name: 'Passport or Id',
		fieldName: 'passport',
	},
	{
		id: 4,
		name: 'Martial Status',
		fieldName: 'martial',
	},
	{
		id: 5,
		name: 'Gender',
		fieldName: 'gender',
	},
];

const baseSchema = {
	fullName: z.string(),
	jobTitle: z.string(),
	profileImg: z
		.any()
		.refine((files) => files?.length !== 1, 'Image is required.'),
	email: z.string().refine(
		(email) => {
			const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
			return emailRegex.test(email);
		},
		{
			message: 'Invalid email address',
		}
	),
	phone: z.string().refine(
		(phone) => {
			const phoneRegex = /^\d{9,13}$/;
			return phoneRegex.test(phone);
		},
		{
			message: 'Invalid phone number',
		}
	),
	address: z.string(),
	nationality: z.string().optional(),
	passport: z.string().optional(),
	martial: z.string().optional(),
	gender: z.string().optional(),
	days: z.string().optional(),
	months: z.string().optional(),
	years: z.string().optional(),
};

const personalInformationSchema = personalInformationFields.reduce(
	(acc, field) => {
		return {
			...acc,
			[field.fieldName]: z.string().optional(),
		};
	},
	{} as Record<string, z.ZodOptional<any>>
);

const finalSchema = { ...baseSchema, ...personalInformationSchema };

const formSchema = z.object(finalSchema);

const ProfileDetail = () => {
	const router = useRouter();

	const {
		profileDetail,
		setProfileDetail,
		openedPersonalInformationFields,
		setOpenedPersonalInformationFields,
	} = useCVStore();

	const [currentOpenFields, setCurrentOpenFields] = useState<number[]>([]);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			fullName: '',
			jobTitle: '',
			profileImg: '',
			email: '',
			phone: '',
			address: '',
			nationality: '',
			passport: '',
			martial: '',
			gender: '',
			days: '',
			months: '',
			years: '',
		},
	});

	const dynamicAddFieldButtons = personalInformationFields
		.map((field) => field)
		.filter((field) => !currentOpenFields.includes(field.id));
	console.log('dynamicAddFieldButtons', dynamicAddFieldButtons);

	useEffect(() => {
		const storedProfileDetail = sessionStorage.getItem('cv-storage');
		if (storedProfileDetail) {
			const data = JSON.parse(storedProfileDetail);
			let storedData = data?.state?.profileDetail;
			const properties = [
				'fullName',
				'jobTitle',
				'profileImg',
				'email',
				'phone',
				'address',
				'nationality',
				'passport',
				'martial',
				'gender',
				'days',
				'months',
				'years',
			];
			properties.forEach((property: any) =>
				form.setValue(property, storedData?.[property])
			);
			setCurrentOpenFields(openedPersonalInformationFields);
		}
	}, [form.setValue, openedPersonalInformationFields]);

	const profileImgValue = form.getValues('profileImg');

	useEffect(() => {
		if (profileImgValue?.length === 0 || typeof profileImgValue === 'string')
			return;
		const convertProfileImageToBase64 = async () => {
			const base64Img = await convertFileToBase64(profileImgValue);
			console.log(base64Img);
			setProfileDetail({
				...profileDetail,
				profileImg: base64Img as string,
			});
		};
		convertProfileImageToBase64();
	}, [profileImgValue]);

	const handleCurrentOpenFields = (payload: number[]) => {
		setCurrentOpenFields(payload);
	};

	const handleOnCloseCurrentOpenFields = (id: number) => {
		const removedFields = currentOpenFields.filter((field) => id !== field);
		setCurrentOpenFields(removedFields);
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const {
			fullName,
			jobTitle,
			email,
			phone,
			address,
			days,
			months,
			years,
			nationality,
			passport,
			martial,
			gender,
		} = values;

		const dateOfBirth = `${days} ${months} ${years}`;
		const formattedDateOfBirth = moment(dateOfBirth).format('Do MMM YYYY');

		setProfileDetail({
			...profileDetail,
			fullName: fullName,
			jobTitle: jobTitle,
			email,
			phone: phone,
			address,
			nationality,
			passport,
			martial,
			gender,
			days,
			months,
			years,
			dateOfBirth: formattedDateOfBirth,
		});
		setOpenedPersonalInformationFields(currentOpenFields);
		router.back();
	};

	const handleCancel = () => {
		router.push('/');
	};

	return (
		<section className="card-layout ">
			<h2 className="card-header">Edit Personal Details</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<ProfileDetailsForm
						control={form.control}
						profileImage={profileDetail?.profileImg}
					/>
					<PersonalInformationForm
						personalInformationFields={personalInformationFields}
						currentOpenFields={currentOpenFields}
						control={form.control}
						dynamicAddFieldButtons={dynamicAddFieldButtons}
						onCurrentOpenFields={handleCurrentOpenFields}
						OnCloseCurrentOpenFields={handleOnCloseCurrentOpenFields}
					/>
					<div className="flex items-end justify-end gap-3 mt-5">
						<Button variant="outline" size="lg" onClick={handleCancel}>
							Cancel
						</Button>
						<Button type="submit" size="lg">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default ProfileDetail;
