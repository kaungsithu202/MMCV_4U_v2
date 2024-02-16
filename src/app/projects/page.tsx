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

const Projects = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);

	const projects = useStore(useCVStore, (state) => state.projects);

	const setProjects = useStore(useCVStore, (state) => state.setProjects);

	const router = useRouter();

	const formSchema = z.object({
		projectTitle: z.string(),
		startMonths: z.string(),
		startYears: z.string(),
		endMonths: z.string(),
		endYears: z.string(),
		projectSummary: z.string(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),

		defaultValues: {
			projectTitle: '',
			startMonths: '',
			startYears: '',
			endMonths: '',
			endYears: '',
			projectSummary: '',
		},
	});

	const { control, handleSubmit } = form;

	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const { projectTitle, startMonths, startYears, endMonths, endYears } =
			values;
		setProjects({
			...projects,
			projectTitle,
			startMonths,
			startYears,
			endMonths,
			endYears,
			projectSummary: convertedContent,
		});
		handleCancel();
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-h-screen overflow-scroll no-scrollbar"
				>
					<section className="card-layout">
						<h2 className="card-header">Edit Project</h2>
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

export default Projects;
