'use client';
import dynamic, { noSSR } from 'next/dynamic';
import { ReactNode, useState } from 'react';
const ReactQuill = dynamic(() => import('react-quill'), {
	ssr: false,
});

// import ReactQuill from 'react-quill';
// import { Editor } from 'react-draft-wysiwyg';

import 'react-quill/dist/quill.snow.css';
interface Props {
	handleTextEditor: (payload: ReactNode) => void;
}

const RichTextEditor = ({ handleTextEditor }: Props) => {
	const [value, setValue] = useState('');
	// const [editorState, setEditorState] = useState(() =>
	// 	EditorState.createEmpty()
	// );

	// const toolbarOptions = {
	// 	options: ['inline', 'list', 'textAlign', 'link'],
	// 	inline: {
	// 		inDropdown: false,
	// 		options: ['bold', 'italic', 'underline'],
	// 	},
	// 	list: {
	// 		inDropdown: false,
	// 		options: ['unordered', 'ordered'],
	// 	},
	// 	textAlign: {
	// 		options: ['left', 'center', 'right'],
	// 	},
	// 	link: {
	// 		showOpenOptionOnHover: true,
	// 		defaultTargetOption: '_self',
	// 		options: ['link', 'unlink'],
	// 	},
	// };

	// const createMarkup = (html: ReactNode) => {
	// 	return DOMPurify.sanitize(html);
	// };

	// useEffect(() => {
	// 	let html = convertToHTML(editorState.getCurrentContent());
	// 	handleTextEditor(createMarkup(html));
	// }, [editorState]);

	// const handleEditorStateChange = (editorState) => {
	// 	setEditorState(editorState);
	// };

	const toolbarOptions = [
		['bold', 'italic', 'underline', 'strike'], // toggled buttons
		['blockquote', 'code-block'],

		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

		[{ size: ['small', false, 'large'] }], // custom dropdown

		[{ align: [] }],
	];

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={setValue}
			modules={{
				toolbar: toolbarOptions,
			}}
		/>
	);
};

export default RichTextEditor;
