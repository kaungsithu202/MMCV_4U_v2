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

const Projects = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		''
	);

	const projects = useStore(useCVStore, (state) => state.projects);
	const addProject = useStore(useCVStore, (state) => state.addProject);
	const updateProject = useStore(useCVStore, (state) => state.updateProject);
	const deleteProject = useStore(useCVStore, (state) => state.deleteProject);

	const router = useRouter();
	const searchParams = useSearchParams();
	const queryId = searchParams.get('q');

	const editEntry = projects.find((proj) => proj.id === queryId);

	const formSchema = z.object({
		projectTitle: z.string().min(1, 'Project title is required'),
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
			setValue('projectTitle', editEntry.projectTitle);
			setValue('startMonths', editEntry.startMonths);
			setValue('startYears', editEntry.startYears);
			setValue('endMonths', editEntry.endMonths);
			setValue('endYears', editEntry.endYears);
			setConvertedContent(editEntry.projectSummary as ReactNode);
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
			const deletedEntry = projects.find((proj) => proj.id === queryId);
			deleteProject(queryId);
			toast.success(`Deleted "${deletedEntry?.projectTitle}"`, {
				action: {
					label: 'Undo',
					onClick: () => {
						if (deletedEntry) {
							addProject(deletedEntry);
						}
					},
				},
			});
		}
		router.back();
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const { projectTitle, startMonths, startYears, endMonths, endYears } =
			values;

		if (queryId) {
			updateProject(queryId, {
				projectTitle,
				startMonths,
				startYears,
				endMonths,
				endYears,
				projectSummary: convertedContent,
			});
		} else {
			addProject({
				id: uuidv4(),
				projectTitle,
				startMonths,
				startYears,
				endMonths,
				endYears,
				projectSummary: convertedContent,
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
							{queryId ? 'Edit' : 'Add'} Project
						</h2>
						<DefaultForm
							control={control}
							name="projectTitle"
							label="Project Title"
							placeholder="Enter Project Title"
						/>

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
								defaultValue={editEntry?.projectSummary as string}
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

export default Projects;
