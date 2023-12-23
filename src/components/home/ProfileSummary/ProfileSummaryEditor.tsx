'use client';
import ActionBtns from '@/components/common/ActionBtns';
import RichTextEditor from '@/components/common/RichTextEditor';
import useCVStore from '@/store/useCVStore';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useStore } from 'zustand';
import parse from 'html-react-parser';

const ProfileSummaryEditor = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		''
	);

	const router = useRouter();

	const setProfileSummary = useStore(
		useCVStore,
		(state) => state.setProfileSummary
	);

	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	const handleCancel = () => {
		router.back();
	};

	const handleSubmit = () => {
		setProfileSummary(convertedContent);
		router.back();
	};

	return (
		<>
			<main className="card-layout">
				<h2 className="card-header">Edit Profile</h2>
				<div className="flex items-start">
					<p className="font-medium">Text</p>
					<div className="w-1 h-1 bg-red-500 rounded-full mt-3 ml-1" />
				</div>

				<RichTextEditor handleTextEditor={handleTextEditor} />
			</main>

			<ActionBtns
				onCancel={handleCancel}
				onSave={handleSubmit}
				styleClass="mt-3"
			/>
		</>
	);
};

export default ProfileSummaryEditor;
