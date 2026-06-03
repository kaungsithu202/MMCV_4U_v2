'use client';
import ActionBtns from '@/components/common/ActionBtns';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import RichTextEditor from '@/components/common/RichTextEditor';
import SelectDatesForm from '@/components/experience/SelectDatesForm';
import { Form } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import useCVStore from '@/store/useCVStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { useStore } from 'zustand';

const Experience = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		''
	);

	const experience = useStore(useCVStore, (state) => state.experience);
	const addExperience = useStore(useCVStore, (state) => state.addExperience);
	const updateExperience = useStore(useCVStore, (state) => state.updateExperience);
	const deleteExperience = useStore(useCVStore, (state) => state.deleteExperience);

	const router = useRouter();
	const searchParams = useSearchParams();
	const queryId = searchParams.get('q');

	const editEntry = experience.find((exp) => exp.id === queryId);

	const formSchema = z.object({
		expJobTitle: z.string().min(1, 'Job title is required'),
		expCity: z.string().min(1, 'City is required'),
		expCountry: z.string().min(1, 'Country is required'),
		startMonths: z.string().min(1, 'Start month is required'),
		startYears: z.string().min(1, 'Start year is required'),
		endMonths: z.string().min(1, 'End month is required'),
		endYears: z.string().min(1, 'End year is required'),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	const { control, handleSubmit, setValue } = form;

	useEffect(() => {
		if (queryId && editEntry) {
			setValue('expJobTitle', editEntry.expJobTitle);
			setValue('expCity', editEntry.expCity);
			setValue('expCountry', editEntry.expCountry);
			setValue('startMonths', editEntry.startMonths);
			setValue('startYears', editEntry.startYears);
			setValue('endMonths', editEntry.endMonths);
			setValue('endYears', editEntry.endYears);
			setConvertedContent(editEntry.expSummary as ReactNode);
		}
	}, [queryId, editEntry]);

	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const handleCancel = () => {
		router.back();
	};

	const handleDelete = () => {
		if (queryId) {
			const deletedEntry = experience.find((exp) => exp.id === queryId);
			deleteExperience(queryId);
			toast.success(`Deleted "${deletedEntry?.expJobTitle}"`, {
				action: {
					label: 'Undo',
					onClick: () => {
						if (deletedEntry) {
							addExperience(deletedEntry);
						}
					},
				},
			});
		}
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

		if (queryId) {
			updateExperience(queryId, {
				expJobTitle,
				expCity,
				expCountry,
				startMonths,
				startYears,
				endMonths,
				endYears,
				expSummary: convertedContent,
			});
		} else {
			addExperience({
				id: uuidv4(),
				expJobTitle,
				expCity,
				expCountry,
				startMonths,
				startYears,
				endMonths,
				endYears,
				expSummary: convertedContent,
			});
		}
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
						<h2 className="card-header">
							{queryId ? 'Edit' : 'Add'} Professional Experience
						</h2>
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
							<RichTextEditor
								handleTextEditor={handleTextEditor}
								defaultValue={editEntry?.expSummary as string}
							/>
						</div>
					</section>
					<ActionBtns
						onCancel={handleCancel}
						styleClass="mt-3"
						onDelete={handleDelete}
						isShowDelete={Boolean(queryId)}
					/>
				</form>
			</Form>
		</>
	);
};

export default Experience;
