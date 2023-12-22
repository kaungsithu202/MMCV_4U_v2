import IconTrash from '../icons/IconTrash';
import { Button } from '../ui/button';

interface Props {
	onDelete: () => void;
	onCancel: () => void;
	onSave: () => void;
	isShowDelete: boolean;
}

const ActionBtns = ({ onDelete, onCancel, onSave, isShowDelete }: Props) => {
	return (
		<div className="card-layout flex item-center justify-between">
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
