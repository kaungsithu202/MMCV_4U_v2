'use client';
import ActionBtns from '@/components/common/ActionBtns';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import RichTextEditor from '@/components/common/RichTextEditor';
import SelectDatesForm from '@/components/experience/SelectDatesForm';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import useCVStore from '@/store/useCVStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useStore } from 'zustand';

const page = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);

	const experience = useStore(useCVStore, (state) => state.experience);

	const setExperience = useStore(useCVStore, (state) => state.setExperience);

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

	const { control, handleSubmit } = form;

	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const handleCancel = () => {
		router.back();
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const {
			expJobTitle,
			expCity,
			expCountry,
			startMonths,
			startYears,
			endMonths,
			endYears,
		} = values;
		setExperience({
			...experience,
			expJobTitle,
			expCity,
			expCountry,
			startMonths,
			startYears,
			endMonths,
			endYears,
			expSummary: convertedContent,
		});
		handleCancel();
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-h-screen overflow-scroll no-scrollbar"
				>
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
