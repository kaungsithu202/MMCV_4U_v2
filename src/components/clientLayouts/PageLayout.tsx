'use client';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import EditableTitle from '@/components/home/EditableTitle';
import IconDownload from '@/components/icons/IconDownload';
import FullResume from '../home/FullResume';
import DashboardSkeletons from '../skeletons/DashboardSkeleton';

interface Props {
	children: React.ReactNode;
}
const PageLayout = ({ children }: Props) => {
	const componentRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	return (
		<>
			<div className="flex w-full bg-primary min-h-screen pt-6 gap-6">
				<DashboardSkeletons />
				<div className="w-full flex flex-col gap-6">
					<div className="bg-white round p-6 flex-between">
						<EditableTitle />
						<button onClick={handlePrint} className="download-btn">
							<p className="text-lg">Download</p>
							<IconDownload className="icon-size" />
						</button>
					</div>
					{children}
				</div>
				<FullResume ref={componentRef} />
			</div>
		</>
	);
};

export default PageLayout;
