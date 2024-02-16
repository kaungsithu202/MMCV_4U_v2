'use client';
import { days, getMonths, lastHundredYears } from '@/lib/date_helper';

import AddFieldButton from '@/components/common/AddFieldButton';
import IconTrash from '@/components/icons/IconTrash';
import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { IPersonalInformation } from '.';
import { Control } from 'react-hook-form';

interface Props {
	personalInformationFields: IPersonalInformation[];
	currentOpenFields: number[];
	control: Control<any>;
	dynamicAddFieldBtns: IPersonalInformation[];
	onCurrentOpenFields: (payload: number | number[]) => void;
	OnCloseCurrentOpenFields: (payload: number) => void;
}

const PersonalInformationForm = ({
	personalInformationFields,
	currentOpenFields,
	control,
	dynamicAddFieldBtns,
	onCurrentOpenFields,
	OnCloseCurrentOpenFields,
}: Props) => {
	return (
		<div>
			<h2 className="card-header py-6">Personal Information</h2>
			<div className="flex flex-wrap gap-2 w-full">
				{personalInformationFields.map((info) => (
					<>
						{currentOpenFields && currentOpenFields.includes(info?.id) && (
							<>
								{info.id === 1 ? (
									<div className="w-full">
										<FormLabel>Date Of Birth</FormLabel>
										<div className="flex w-full gap-2 ">
											<FormField
												control={control}
												name="days"
												render={({ field }) => (
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="p-5">
															<SelectValue placeholder="Day" />
														</SelectTrigger>
														<SelectContent>
															{days.map((day) => (
																<SelectItem value={day}>{day}</SelectItem>
															))}
														</SelectContent>
													</Select>
												)}
											/>
											<FormField
												control={control}
												name="months"
												render={({ field }) => (
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="p-5">
															<SelectValue placeholder="Month" />
														</SelectTrigger>
														<SelectContent>
															{getMonths().map((month) => (
																<SelectItem value={month}>{month}</SelectItem>
															))}
														</SelectContent>
													</Select>
												)}
											/>
											<FormField
												control={control}
												name="years"
												render={({ field }) => (
													<Select
														onValueChange={field.onChange}
														defaultValue={field.value}
													>
														<SelectTrigger className="p-5">
															<SelectValue placeholder="Year" />
														</SelectTrigger>
														<SelectContent>
															{lastHundredYears().map((year) => (
																<SelectItem value={year.toString()}>
																	{year}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												)}
											/>
											<Button
												variant="outline"
												className="bg-red-100 hover:bg-red-50 p-5"
												onClick={() => OnCloseCurrentOpenFields(info?.id)}
											>
												<IconTrash className="text-red-900" />
											</Button>
										</div>
									</div>
								) : (
									<FormField
										control={control}
										name={`${info.fieldName}` as any}
										render={({ field }) => (
											<FormItem className="w-full ">
												<FormLabel>{info.name}</FormLabel>
												<FormControl>
													<div className="flex gap-2">
														<Input
															placeholder={`Enter ${info.name}`}
															{...field}
														/>
														<Button
															variant="outline"
															className="bg-red-100 hover:bg-red-50 p-5 "
															onClick={() => OnCloseCurrentOpenFields(info?.id)}
														>
															<IconTrash className="text-red-900" />
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)}
							</>
						)}
					</>
				))}
				{dynamicAddFieldBtns?.map((info) => (
					<>
						<AddFieldButton
							key={info.id}
							name={info.name}
							id={info.id}
							onClick={onCurrentOpenFields}
							isOpenField={currentOpenFields}
						/>
					</>
				))}
			</div>
		</div>
	);
};

export default PersonalInformationForm;
