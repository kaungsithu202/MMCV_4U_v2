'use client';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import RichTextEditor from '@/components/common/RichTextEditor';
import { Form, FormField, FormLabel } from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { days, getMonths, lastHundredYears } from '@/lib/date_helper';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

const page = () => {
	const form = useForm();
	const { register, control, handleSubmit } = form;
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);
	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const onSubmit = () => {};

	return (
		<section className="card-layout">
			<h2 className="card-header">Edit Professional Experience</h2>
			<Form {...form}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DefaultForm
						control={control}
						name="jobTitle"
						label="Job Title"
						placeholder="Enter Job Title"
					/>
					<div className="flex items-center gap-3 ">
						<DefaultForm
							control={control}
							name="city"
							label="City"
							placeholder="Enter City"
						/>
						<DefaultForm
							control={control}
							name="country"
							label="Country"
							placeholder="Enter Country"
						/>
					</div>

					<div className="flex items-center gap-3 w-full">
						<div className="w-1/2">
							<FormLabel>Start Date</FormLabel>
							<div className="flex items-center gap-2">
								<FormField
									control={form.control}
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
						</div>
						<div className="w-1/2">
							<FormLabel>End Date</FormLabel>
							<div className="flex items-center gap-2">
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
													<SelectItem value={day}>{day}</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</div>
					</div>
					<RichTextEditor
						convertedContent={convertedContent}
						handleTextEditor={handleTextEditor}
					/>
				</form>
			</Form>
		</section>
	);
};

export default page;
