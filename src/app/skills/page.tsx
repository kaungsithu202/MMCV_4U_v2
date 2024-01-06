'use client';
import ActionBtns from '@/components/common/ActionBtns';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import { Form } from '@/components/ui/form';
import useCVStore from '@/store/useCVStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';
import { useStore } from 'zustand';

const Skills = () => {
	const skills = useStore(useCVStore, (state) => state.skills);
	const setSkills = useStore(useCVStore, (state) => state.setSkills);

	const router = useRouter();
	const searchParams = useSearchParams();

	const queryId = searchParams.get('q');

	const formSchema = z.object({
		skill: z.string(),
		subSkills: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		// mode: 'onChange',
	});

	const { control, handleSubmit, setValue, watch } = form;

	const editSkill = skills.filter((s) => s.id === queryId).at(0);

	useEffect(() => {
		if (queryId) {
			setValue('skill', editSkill!.skill);
			setValue('subSkills', editSkill!.subSkills);
		}
	}, [queryId]);

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const { skill, subSkills } = values;

		if (queryId) {
			if (editSkill?.skill === skill && editSkill?.subSkills === subSkills) {
				return;
			} else {
				const updatedSkills = skills.map(
					(s: { id: string; skill: string; subSkills: string | undefined }) => {
						if (s.id === queryId) {
							return {
								id: queryId,
								skill,
								subSkills,
							};
						} else {
							return s;
						}
					}
				);

				setSkills(updatedSkills);
				router.back();
			}
			return;
		}

		setSkills([...skills, { id: uuidv4(), skill, subSkills }]);
		router.back();
	};

	const handleCancel = () => {
		router.back();
	};

	const handleDelete = () => {
		const selectedSkill = skills.filter((s) => s.id !== queryId);
		setSkills(selectedSkill);
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

export default Skills;
