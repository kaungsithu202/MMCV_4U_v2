'use client';
import { days, getMonths, lastHundredYears } from '@/lib/date_helper';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import AddFieldButton from '@/components/common/AddFieldButton';
import IfElse from '@/components/common/IfElse';
import IconTrash from '@/components/icons/IconTrash';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { convertFileToBase64 } from '@/lib/utils';
import useCVStore from '@/store/useCVStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IPersonalInformation {
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

const EditableProfileDetail = () => {
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

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

	// useEffect(() => {
	// 	form.handleSubmit(onSubmit)();
	// }, [watchedFields, form.handleSubmit, onSubmit]);

	return (
		<section className="card-layout ">
			<h2 className="card-header">Edit Personal Details</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex items-start justify-between w-full max-h-[calc(468px-56px)] overflow-y-auto no-scrollbar">
						<div className="w-4/6">
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full name</FormLabel>
										<FormControl>
											<Input placeholder="Enter your name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="jobTitle"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Job title</FormLabel>
										<FormControl>
											<Input placeholder="Enter job title" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-start gap-3">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input placeholder="Enter email" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="phone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Phone</FormLabel>
											<FormControl>
												<Input placeholder="Enter Phone" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Address</FormLabel>
										<FormControl>
											<Input placeholder="City,Country" {...field} />
											{/* <Input placeholder="Enter Phone" {...field} /> */}
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<IfElse
							isTrue={profileDetail.profileImg?.length === 0}
							ifBlock={
								<FormField
									control={form.control}
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
									src={profileDetail?.profileImg}
									alt="profile"
									width={128}
									height={128}
									className="rounded-full w-32 h-32 object-cover "
								/>
							}
						/>
					</div>
					<div>
						<h2 className="card-header py-6">Personal Information</h2>
						<div className="flex flex-wrap gap-2 w-full">
							{personalInformationFields.map((info, index) => (
								<>
									{currentOpenFields &&
										currentOpenFields.includes(info?.id) && (
											<>
												{info.id === 1 ? (
													<div className="w-full">
														<FormLabel>Date Of Birth</FormLabel>
														<div className="flex w-full gap-2 ">
															<FormField
																control={form.control}
																name="days"
																render={({ field }) => (
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																	>
																		<SelectTrigger className="p-5">
																			<SelectValue placeholder="Day" />
																		</SelectTrigger>
																		<SelectContent>
																			{days.map((day) => (
																				<SelectItem value={day}>
																					{day}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
																)}
															/>
															<FormField
																control={form.control}
																name="months"
																render={({ field }) => (
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																	>
																		<SelectTrigger className="p-5">
																			<SelectValue placeholder="Month" />
																		</SelectTrigger>
																		<SelectContent>
																			{getMonths().map((month) => (
																				<SelectItem value={month}>
																					{month}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
																)}
															/>
															<FormField
																control={form.control}
																name="years"
																render={({ field }) => (
																	<Select
																		onValueChange={field.onChange}
																		defaultValue={field.value}
																	>
																		<SelectTrigger className="p-5">
																			<SelectValue placeholder="Year" />
																		</SelectTrigger>
																		<SelectContent>
																			{lastHundredYears.map((year) => (
																				<SelectItem value={year.toString()}>
																					{year}
																				</SelectItem>
																			))}
																		</SelectContent>
																	</Select>
																)}
															/>
															<Button
																variant="outline"
																className="bg-red-100 hover:bg-red-50 p-5"
																onClick={() =>
																	handleOnCloseCurrentOpenFields(info?.id)
																}
															>
																<IconTrash className="text-red-900" />
															</Button>
														</div>
													</div>
												) : (
													<FormField
														control={form.control}
														name={`${info.fieldName}` as any}
														render={({ field }) => (
															<FormItem className="w-full ">
																<FormLabel>{info.name}</FormLabel>
																<FormControl>
																	<div className="flex gap-2">
																		<Input
																			placeholder={`Enter ${info.name}`}
																			{...field}
																		/>
																		<Button
																			variant="outline"
																			className="bg-red-100 hover:bg-red-50 p-5 "
																			onClick={() =>
																				handleOnCloseCurrentOpenFields(info?.id)
																			}
																		>
																			<IconTrash className="text-red-900" />
																		</Button>
																	</div>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												)}
											</>
										)}
								</>
							))}
							{dynamicAddFieldButtons.map((info, index) => (
								<>
									<AddFieldButton
										key={info.id}
										name={info.name}
										id={info.id}
										onClick={handleCurrentOpenFields}
										isOpenField={currentOpenFields}
									/>
								</>
							))}
						</div>
					</div>
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

export default EditableProfileDetail;
