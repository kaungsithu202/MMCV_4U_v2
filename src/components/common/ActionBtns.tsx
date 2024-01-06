import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';
import IconTrash from '../icons/IconTrash';
import { Button } from '../ui/button';

interface Props {
	onDelete: () => void;
	onCancel: () => void;
	onSave?: () => void;
	isShowDelete?: boolean;
	styleClass: string;
}

const ActionBtns = ({
	onDelete,
	onCancel,
	onSave,
	isShowDelete,
	styleClass,
}: Props) => {
	const handleTest =
		(e: MouseEvent<HTMLButtonElement, MouseEvent>) => (payload: number) => {
			console.log('payload', payload);
		};
	return (
		<div
			className={cn(
				'bg-white round py-5 px-10  leading-10 cursor-pointer drop-shadow-md flex item-center justify-end',
				styleClass,
				{
					'justify-between': isShowDelete,
				}
			)}
		>
			{isShowDelete && (
				<Button variant="outline" size="lg" type="button" onClick={onDelete}>
					<IconTrash className="text-gray-600 mr-3 w-5 h-auto" />
					Delete
				</Button>
			)}

			<div className="flex items-center gap-3 ">
				<Button size="lg" variant="outline" type="button" onClick={onCancel}>
					Cancel
				</Button>
				<Button size="lg" type="submit" onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default ActionBtns;
