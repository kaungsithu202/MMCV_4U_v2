'use client';
import ActionBtns from '@/components/common/ActionBtns';
import RichTextEditor from '@/components/common/RichTextEditor';
import IconTrash from '@/components/icons/IconTrash';
import { Button } from '@/components/ui/button';
import useCVStore from '@/store/useCVStore';
import { ReactNode, useState } from 'react';
import parse from 'html-react-parser';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const ProfileSummaryEditor = () => {
	const [convertedContent, setConvertedContent] = useState<ReactNode | null>(
		null
	);
	const handleTextEditor = (payload: ReactNode) => {
		setConvertedContent(payload);
	};

	console.log('convertedContent', parse(String(convertedContent)));

	const {
		isEditProfileSummary,
		setIsEditProfileSummary,
		isEditProfileDetail,
		setProfileSummary,
	} = useCVStore();
	return (
		<>
			<div className="card-layout">
				<h2 className="card-header">Edit Profile</h2>
				<div className="flex items-start">
					<p className="font-medium">Text</p>
					<div className="w-1 h-1 bg-red-500 rounded-full mt-3 ml-1" />
				</div>

				<RichTextEditor
					convertedContent={convertedContent}
					handleTextEditor={handleTextEditor}
				/>
			</div>
			<ActionBtns onCancel={() => setIsEditProfileSummary(false)} />
			{/* <div className="card-layout flex item-center justify-between">
				<Button variant="outline" size="lg">
					<IconTrash className="text-gray-600 mr-3 w-5 h-auto" />
					Delete
				</Button>
				<div className="flex items-center gap-3">
					<Button size="lg" variant="outline">
						Cancel
					</Button>
					<Button size="lg">Save</Button>
				</div>
			</div> */}
		</>
	);
};

export default ProfileSummaryEditor;
