import IconPlus from '../icons/IconPlus';
import { Button } from '../ui/button';

interface Props {
	name: string;
	id: string | number;
	onClick: (payload: number[]) => void;
	isOpenField: number[];
}

const AddFieldButton = ({ name, id, onClick, isOpenField }: Props) => {
	return (
		<>
			<Button
				type="button"
				variant="outline"
				className="rounded-xl mt-1"
				onClick={() => onClick([...new Set([...isOpenField, id])])}
			>
				<IconPlus className="mr-2 text-gray-400" />
				<span className="text-gray-400">{name}</span>
			</Button>
		</>
	);
};

export default AddFieldButton;
