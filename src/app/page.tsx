'use client';
import dynamic from 'next/dynamic';
import EditableTitle from '@/components/home/EditableTitle';

const ProfileDetailSection = dynamic(
	() => import('@/components/home/ProfileDetailSection'),
	{ ssr: false }
);
const PdfPreviewSection = dynamic(
	() => import('@/components/home/PdfPreviewSection'),
	{
		ssr: false,
	}
);
import IconDownload from '@/components/icons/IconDownload';
import { DialogContent, Dialog, DialogTrigger } from '@/components/ui/dialog';

import PdfSection from '@/components/home/PdfSection';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
	// const handleDownloadPdf = () => {
	// 	const capture = document?.querySelector('.pdf-component');
	// 	html2canvas(capture).then((canvas) => {
	// 		const imgData = canvas.toDataURL('img/png');
	// 		const doc = new jsPDF('p', 'mm', 'a4');
	// 		const componentWidth = doc.internal.pageSize.getWidth();
	// 		const componentHeight = doc.internal.pageSize.getHeight();
	// 		doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
	// 		doc.save('kst.pdf');
	// 	});
	// };
	return (
		<>
			<section className="w-5/12 flex flex-col gap-6">
				<div className="bg-white round p-6 flex-between">
					<EditableTitle />
					<button
						// onClick={handleDownloadPdf}
						className="download-btn"
					>
						<p className="text-lg">Download</p>
						<IconDownload className="icon-size" />
					</button>
				</div>
				<ProfileDetailSection />
			</section>
			<Dialog>
				<DialogTrigger className="cursor-zoom-in w-5/12 ">
					<PdfPreviewSection />
				</DialogTrigger>
				<DialogContent className="max-w-5xl p-0 rounded-lg  border-none max-h-screen">
					<PdfSection />
				</DialogContent>
			</Dialog>
		</>
	);
}
