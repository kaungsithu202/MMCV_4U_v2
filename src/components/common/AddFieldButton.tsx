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
				<IconPlus className="mr-2 text-terracotta" />
				<span className="text-muted">{name}</span>
			</Button>
		</>
	);
};

export default AddFieldButton;
