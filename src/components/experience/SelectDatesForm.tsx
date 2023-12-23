'use client';
import { FormField, FormLabel } from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { getMonths, lastHundredYears } from '@/lib/date_helper';
import { Control } from 'react-hook-form';

interface Props {
	control: Control<any>;
	label: string;
	monthsName: string;
	yearsName: string;
}

const SelectDatesForm = ({ control, label, monthsName, yearsName }: Props) => {
	return (
		<>
			<div className="w-1/2">
				<FormLabel>{label}</FormLabel>
				<div className="flex items-center gap-2">
					<FormField
						control={control}
						name={monthsName}
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className="p-5">
									<SelectValue placeholder="Month" />
								</SelectTrigger>
								<SelectContent className="bg-gray-50 rounded-md">
									<div className="grid grid-cols-3 grid-rows-4 gap-2 p-1 ">
										{getMonths().map((month) => (
											<SelectItem
												value={month}
												key={month}
												className="px-6 py-3 border bg-white "
											>
												{month}
											</SelectItem>
										))}
									</div>
								</SelectContent>
							</Select>
						)}
					/>

					<FormField
						control={control}
						name={yearsName}
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
		</>
	);
};

export default SelectDatesForm;
