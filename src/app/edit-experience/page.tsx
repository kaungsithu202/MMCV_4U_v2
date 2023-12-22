'use client';
import DefaultForm from '@/components/common/Forms/DefaultForm';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

const page = () => {
	const form = useForm();

	const onSubmit = () => {};
	return (
		<section className="card-layout">
			<h2 className="card-header">Edit Professional Experience</h2>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<DefaultForm
						control={form.control}
						name="jobTitle"
						label="Job Title"
						placeholder="Enter Job Title"
					/>
					<div className="flex items-center gap-3 ">
						<DefaultForm
							control={form.control}
							name="city"
							label="City"
							placeholder="Enter City"
						/>
						<DefaultForm
							control={form.control}
							name="country"
							label="Country"
							placeholder="Enter Country"
						/>
					</div>
				</form>
			</Form>
		</section>
	);
};

export default page;
