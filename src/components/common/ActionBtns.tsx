import { cn } from '@/lib/utils';
import IconTrash from '../icons/IconTrash';
import { Button } from '../ui/button';

interface Props {
	onDelete: () => void;
	onCancel: () => void;
	onSave: () => void;
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
	return (
		<div
			className={cn(
				'bg-white round py-5 px-10  leading-10 cursor-pointer drop-shadow-md flex item-center justify-between',
				styleClass
			)}
		>
			<Button variant="outline" size="lg" onClick={onDelete}>
				<IconTrash className="text-gray-600 mr-3 w-5 h-auto" />
				Delete
			</Button>
			<div className="flex items-center gap-3">
				<Button size="lg" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button size="lg" onClick={onSave}>
					Save
				</Button>
			</div>
		</div>
	);
};

export default ActionBtns;
