interface Props {
	isTrue: boolean;
	ifBlock: JSX.Element;
	elseBlock: JSX.Element;
}

const IfElse = ({ isTrue, ifBlock, elseBlock }: Props) => {
	return <>{isTrue ? <>{ifBlock}</> : <>{elseBlock}</>}</>;
};

export default IfElse;
