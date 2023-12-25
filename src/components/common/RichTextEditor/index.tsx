import React, { ReactNode, useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './index.module.css';

interface Props {
	handleTextEditor: (payload: ReactNode) => void;
}

const RichTextEditor = ({ handleTextEditor }: Props) => {
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	const toolbarOptions = {
		options: ['inline', 'list', 'textAlign', 'link'],
		inline: {
			inDropdown: false,
			options: ['bold', 'italic', 'underline'],
		},
		list: {
			inDropdown: false,
			options: ['unordered', 'ordered'],
		},
		textAlign: {
			options: ['left', 'center', 'right'],
		},
		link: {
			showOpenOptionOnHover: true,
			defaultTargetOption: '_self',
			options: ['link', 'unlink'],
		},
	};

	const createMarkup = (html: ReactNode) => {
		return DOMPurify.sanitize(html);
	};

	useEffect(() => {
		let html = convertToHTML(editorState.getCurrentContent());
		handleTextEditor(createMarkup(html));
	}, [editorState]);

	return (
		<Editor
			toolbar={toolbarOptions}
			editorState={editorState}
			onEditorStateChange={setEditorState}
			wrapperClassName={`${styles['wrapper-class']}`}
			editorClassName={`${styles['editor-class']}`}
			toolbarClassName={`${styles['toolbar-class']}`}
		/>
	);
};

export default RichTextEditor;
