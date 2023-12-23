import { FormField } from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@radix-ui/react-select';
import { Control } from 'react-hook-form';

interface Props {
	control: Control<any>;
	name: string;
	placeholder: string;
	selectItems: any[];
}

const SelectForm = ({ control, name, placeholder, selectItems }: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<SelectTrigger className="p-5">
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent className="bg-gray-50 rounded-md">
						<div className="grid grid-cols-3 grid-rows-4 gap-2 p-1 ">
							{selectItems?.map((item) => (
								<SelectItem value={item} className="px-6 py-3 border bg-white ">
									{item}
								</SelectItem>
							))}
						</div>
					</SelectContent>
				</Select>
			)}
		/>
	);
};

export default SelectForm;
