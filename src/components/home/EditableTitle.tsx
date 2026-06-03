'use client';

import { useState } from 'react';
import IconEdit from '../icons/IconEdit';
import IfElse from '../common/IfElse';
import IconCheck from '../icons/IconCheck';
import useCVStore from '@/store/useCVStore';
import { useStore } from 'zustand';

const EditableTitle = () => {
	const [isEdit, setIsEdit] = useState(false);
	const resumeTitle = useStore(useCVStore, (state) => state.resumeTitle);
	const setResumeTitle = useCVStore((state) => state.setResumeTitle);

	return (
		<div className="">
			<IfElse
				isTrue={isEdit}
				ifBlock={
					<div className="flex-center-3 ">
						<input
							className="outline-none ring-1 px-3 py-3 round bg-secondary/50 text-ink ring-clay focus:ring-terracotta"
							value={resumeTitle}
							onChange={(e) => {
								setResumeTitle(e.target.value);
							}}
						/>
						<button
							onClick={() => {
								setIsEdit(false);
							}}
							className="icon-btn"
						>
							<IconCheck className="text-paper" />
						</button>
					</div>
				}
				elseBlock={
					<div
						onClick={() => setIsEdit(true)}
						className="flex-center-3 group  cursor-pointer"
					>
						<p className="card-header group-hover:text-plum">{resumeTitle}</p>
						<IconEdit
							className="icon-size text-muted group-hover:text-terracotta"
							role="button"
						/>
					</div>
				}
			/>
		</div>
	);
};

export default EditableTitle;
