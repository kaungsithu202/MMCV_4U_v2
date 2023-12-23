'use client';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import RichTextEditor from '@/components/common/RichTextEditor';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import * as z from 'zod';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { days, getMonths, lastHundredYears } from '@/lib/date_helper';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import ActionBtns from '@/components/common/ActionBtns';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import SelectForm from '@/components/common/Forms/SelectForm';
import SelectDatesForm from '@/components/experience/SelectDatesForm';
import { Label } from '@/components/ui/label';

const page = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);

	const router = useRouter();

	const formSchema = z.object({
		expJobTitle: z.string(),
		expCity: z.string(),
		expCountry: z.string(),
		startMonths: z.string(),
		startYears: z.string(),
		endMonths: z.string(),
		endYears: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		// mode: 'onChange',
		defaultValues: {
			expJobTitle: '',
			expCity: '',
			expCountry: '',
			startMonths: '',
			startYears: '',
			endMonths: '',
			endYears: '',
		},
	});

	const { register, control, handleSubmit } = form;

	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log('values', values);
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<section className="card-layout">
						<h2 className="card-header">Edit Professional Experience</h2>
						<DefaultForm
							control={control}
							name="expJobTitle"
							label="Job Title"
							placeholder="Enter Job Title"
						/>
						<div className="flex items-center gap-3 ">
							<DefaultForm
								control={control}
								name="expCity"
								label="City"
								placeholder="Enter City"
							/>
							<DefaultForm
								control={control}
								name="expCountry"
								label="Country"
								placeholder="Enter Country"
							/>
						</div>

						<div className="flex items-center gap-3 w-full">
							<SelectDatesForm
								control={control}
								label="Start Date"
								monthsName="startMonths"
								yearsName="startYears"
							/>
							<SelectDatesForm
								control={control}
								label="End Date"
								monthsName="endMonths"
								yearsName="endYears"
							/>
							{/* <div className="w-1/2">
								<FormLabel>Start Date</FormLabel>
								<div className="flex items-center gap-2">
									<FormField
										control={control}
										name="startMonth"
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="p-5">
													<SelectValue placeholder="Month" />
												</SelectTrigger>
												<SelectContent className="bg-gray-50 rounded-md">
													<div className="grid grid-cols-3 grid-rows-4 gap-2 p-1 ">
														{getMonths().map((month) => (
															<SelectItem
																value={month}
																key={month}
																className="px-6 py-3 border bg-white "
															>
																{month}
															</SelectItem>
														))}
													</div>
												</SelectContent>
											</Select>
										)}
									/>

									<FormField
										control={control}
										name="startYears"
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="p-5">
													<SelectValue placeholder="Year" />
												</SelectTrigger>
												<SelectContent className="bg-gray-50 rounded-md">
													<div className="grid grid-cols-4 gap-2 p-1 ">
														{lastHundredYears.map((year) => (
															<SelectItem
																className="px-6 py-3 border bg-white "
																value={year.toString()}
															>
																{year}
															</SelectItem>
														))}
													</div>
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							</div> */}
							{/* <div className="w-1/2">
								<FormLabel>End Date</FormLabel>
								<div className="flex items-center gap-2">
									<FormField
										control={form.control}
										name="endMonths"
										render={({ field }) => (
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger className="p-5">
													<SelectValue placeholder="Day" />
												</SelectTrigger>
												<SelectContent className="bg-gray-50 rounded-md">
													<div className="grid grid-cols-3 grid-rows-4 gap-2 p-1 ">
														{getMonths().map((day) => (
															<SelectItem
																value={day}
																className="px-6 py-3 border bg-white "
															>
																{day}
															</SelectItem>
														))}
													</div>
												</SelectContent>
											</Select>
										)}
									/>
									<FormField
										control={form.control}
										name="endYears"
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
														<SelectItem value={day}>{day}</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							</div> */}
						</div>
						<div className="mt-2">
							<Label>Description</Label>
							<RichTextEditor handleTextEditor={handleTextEditor} />
						</div>
					</section>
					<ActionBtns onCancel={handleCancel} styleClass="mt-3" />
					{/* <Button type="submit">Click</Button> */}
				</form>
			</Form>
		</>
	);
};

export default page;
