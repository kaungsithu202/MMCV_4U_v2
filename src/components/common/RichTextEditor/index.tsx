'use client';
import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
});

import 'react-quill/dist/quill.snow.css';
interface Props {
	handleTextEditor: (payload: ReactNode) => void;
}

const RichTextEditor = ({ handleTextEditor }: Props) => {
	const [value, setValue] = useState('');

	const handleChangeValue = (payload: string) => {
		setValue(payload);
		handleTextEditor(payload);
	};

	const toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],

		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }],

		[{ size: ['small', false, 'large'] }],

		[{ align: [] }],
	];

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={(payload) => handleChangeValue(payload)}
			modules={{
				toolbar: toolbarOptions,
			}}
		/>
	);
};

export default RichTextEditor;
