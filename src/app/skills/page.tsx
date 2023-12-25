'use client';
import ActionBtns from '@/components/common/ActionBtns';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import { Form } from '@/components/ui/form';
import useCVStore from '@/store/useCVStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useStore } from 'zustand';

const Skills = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);

	const skills = useStore(useCVStore, (state) => state.skills);
	const setSkills = useStore(useCVStore, (state) => state.setSkills);

	const router = useRouter();
	const searchParams = useSearchParams();

	const search = searchParams.get('q');

	console.log('search', search);
	console.log('skills', skills);

	// const found = skills.find((s) => s.skill === search);

	const formSchema = z.object({
		skill: z.string(),
		subSkills: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		// mode: 'onChange',
	});

	const { control, handleSubmit, setValue } = form;

	useEffect(() => {
		if (search) {
			setValue('skill', search);
		}
	}, [search]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const { skill, subSkills } = values;
		if (search) {
			const updatedSkills = skills.map((s) => {
				if (s.skill === search) {
					return {
						skill,
						subSkills: '',
					};
				} else {
					return {
						skill: s.skill,
						subSkills: '',
					};
				}
			});

			setSkills(updatedSkills);
			return;
		}
		setSkills([
			...skills,
			{
				skill,
				subSkills,
			},
		]);
		router.back();
	};

	const handleCancel = () => {
		router.back();
	};
	console.log('skills', skills);
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="max-h-screen overflow-scroll no-scrollbar"
				>
					<section className="card-layout">
						<h2 className="card-header">Edit Skill</h2>
						<DefaultForm
							control={control}
							name="skill"
							label="Skill"
							placeholder="Enter Skill"
						/>

						<DefaultForm
							control={control}
							name="subSkills"
							label="Information /Sub-skills"
							placeholder="Enter information or sub-skills"
						/>
					</section>
					<ActionBtns onCancel={handleCancel} styleClass="mt-3" />
					{/* <Button type="submit">Click</Button> */}
				</form>
			</Form>
		</>
	);
};

export default Skills;
