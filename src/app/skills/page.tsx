'use client';
import ActionBtns from '@/components/common/ActionBtns';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import { Form } from '@/components/ui/form';
import useCVStore from '@/store/useCVStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
		skill: z.string().min(1, 'Skill name is required'),
		subSkills: z.string().optional(),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
	});

	const { control, handleSubmit, setValue } = form;

	const editSkill = skills.filter((s) => s.id === queryId).at(0);

	useEffect(() => {
		if (queryId && editSkill) {
			setValue('skill', editSkill.skill);
			setValue('subSkills', editSkill.subSkills);
		}
	}, [queryId, editSkill]);

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
		const deletedSkill = skills.find((s) => s.id === queryId);
		const remainingSkills = skills.filter((s) => s.id !== queryId);
		setSkills(remainingSkills);
		toast.success(`Deleted "${deletedSkill?.skill}"`, {
			action: {
				label: 'Undo',
				onClick: () => {
					if (deletedSkill) {
						setSkills([...remainingSkills, deletedSkill]);
					}
				},
			},
		});
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
						<h2 className="card-header">
							{queryId ? 'Edit' : 'Add'} Skill
						</h2>
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
