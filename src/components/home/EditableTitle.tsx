'use client';

import { useState } from 'react';
import IconEdit from '../icons/IconEdit';
import IfElse from '../common/IfElse';
import IconCheck from '../icons/IconCheck';

const EditableTitle = () => {
	const [isEdit, setIsEdit] = useState(false);
	const [title, setTitle] = useState('Your Resume Title');

	return (
		<div className="">
			<IfElse
				isTrue={isEdit}
				ifBlock={
					<div className="flex-center-3 ">
						<input
							className="outline-none ring-1 px-3 py-3 round ring-gray-300"
							value={title}
							onChange={(e) => {
								setTitle(e.target.value);
							}}
						/>
						<button
							onClick={() => {
								setIsEdit(false);
							}}
							className="icon-btn"
						>
							<IconCheck className="text-white " />
						</button>
					</div>
				}
				elseBlock={
					<div
						onClick={() => setIsEdit(true)}
						className="flex-center-3 group  cursor-pointer"
					>
						<p className="card-header group-hover:text-black/80">{title}</p>
						<IconEdit
							className="icon-size group-hover:text-black/60"
							role="button"
						/>
					</div>
				}
			/>
		</div>
	);
};

export default EditableTitle;
