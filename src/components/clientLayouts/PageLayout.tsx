'use client';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import EditableTitle from '@/components/home/EditableTitle';
import IconDownload from '@/components/icons/IconDownload';
import FullResume from '../home/FullResume';
import SectionNav from '../common/SectionNav';

interface Props {
	children: React.ReactNode;
}

const resumePrintStyles = `
	@page {
		size: A4;
		margin: 0;
	}

	* {
		box-sizing: border-box;
	}

	body {
		margin: 0;
		background: #fff8ee;
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact;
	}

	.pdf-component {
		display: grid !important;
		grid-template-columns: 40% 60% !important;
		width: 210mm !important;
		min-height: 297mm !important;
		overflow: visible !important;
		background: #fff8ee !important;
		box-shadow: none !important;
		font-family: Arial, Helvetica, sans-serif !important;
		color: #2b1025 !important;
	}

	.pdf-component > div:first-child {
		background: #5a1947 !important;
		color: #fff8ee !important;
		padding: 28px 24px !important;
		grid-column: auto !important;
	}

	.pdf-component > section {
		background: #fff8ee !important;
		color: #2b1025 !important;
		padding: 28px 32px !important;
		display: flex !important;
		flex-direction: column !important;
		gap: 18px !important;
		grid-column: auto !important;
	}

	.pdf-component h1,
	.pdf-component h2,
	.pdf-component h3,
	.pdf-component p,
	.pdf-component li {
		margin: 0 !important;
	}

	.pdf-component h1 {
		font-size: 28px !important;
		line-height: 1.1 !important;
		font-weight: 700 !important;
		letter-spacing: -0.02em !important;
	}

	.pdf-component > div:first-child > h2 {
		font-size: 15px !important;
		line-height: 1.35 !important;
		font-weight: 500 !important;
		color: rgba(255, 248, 238, 0.82) !important;
		margin-top: 6px !important;
	}

	.pdf-component img {
		width: 112px !important;
		height: 112px !important;
		object-fit: cover !important;
		border-radius: 999px !important;
		margin: 16px 0 !important;
	}

	.pdf-component a,
	.pdf-component a:visited {
		color: inherit !important;
		text-decoration: none !important;
	}

	.pdf-component svg {
		width: 12px !important;
		height: 12px !important;
		min-width: 12px !important;
		color: #e8b84f !important;
		stroke: currentColor !important;
	}

	.pdf-component > div:first-child div,
	.pdf-component > div:first-child a {
		font-size: 12px !important;
		line-height: 1.45 !important;
	}

	.pdf-component .resume-sidebar-details,
	.pdf-component .resume-contact-list,
	.pdf-component > div:first-child section {
		display: flex !important;
		flex-direction: column !important;
		gap: 8px !important;
	}

	.pdf-component .resume-contact-row {
		display: grid !important;
		grid-template-columns: 14px 1fr !important;
		align-items: start !important;
		gap: 8px !important;
		width: 100% !important;
		text-align: left !important;
	}

	.pdf-component .resume-contact-row svg {
		margin-top: 2px !important;
	}

	.pdf-component .resume-contact-row p,
	.pdf-component .resume-contact-row a {
		text-align: left !important;
		word-break: break-word !important;
	}

	.pdf-component > div:first-child section {
		border-top: 1px solid rgba(255, 248, 238, 0.18) !important;
		margin-top: 18px !important;
		padding-top: 14px !important;
	}

	.pdf-component > div:first-child section h2,
	.pdf-component > div:first-child h2[class] {
		font-size: 11px !important;
		font-weight: 800 !important;
		text-transform: uppercase !important;
		letter-spacing: 0.14em !important;
		color: #e8b84f !important;
	}

	.pdf-component > div:first-child p,
	.pdf-component > div:first-child li {
		font-size: 12px !important;
		line-height: 1.5 !important;
		color: rgba(255, 248, 238, 0.9) !important;
	}

	.pdf-component > div:first-child li {
		margin-left: 16px !important;
	}

	.pdf-component > section h3 {
		font-size: 11px !important;
		line-height: 1.2 !important;
		font-weight: 800 !important;
		letter-spacing: 0.16em !important;
		text-transform: uppercase !important;
		color: #5a1947 !important;
		margin-bottom: 8px !important;
	}

	.pdf-component > section h2 {
		font-size: 15px !important;
		line-height: 1.25 !important;
		font-weight: 800 !important;
		color: #2b1025 !important;
		margin-bottom: 4px !important;
	}

	.pdf-component > section p,
	.pdf-component > section div {
		font-size: 12px !important;
		line-height: 1.55 !important;
	}

	.pdf-component > section p {
		color: #7d574f !important;
	}

	.pdf-component > section > div > div {
		border-bottom: 1px solid rgba(199, 172, 145, 0.55) !important;
		padding-bottom: 12px !important;
		margin-bottom: 12px !important;
	}

	.pdf-component > section > div > div:last-child {
		border-bottom: 0 !important;
		margin-bottom: 0 !important;
	}
`;

const PageLayout = ({ children }: Props) => {
	const componentRef = useRef<HTMLDivElement>(null);

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		documentTitle: 'MMCV4U Resume',
		pageStyle: resumePrintStyles,
	});
	return (
		<>
			<div className="flex w-full max-h-screen gap-6 bg-canvas text-ink">
				<SectionNav />
				<div className="w-full flex flex-col gap-6 py-6" id="main-content">
					<div className="bg-paper border border-clay/40 round p-6 flex-between shadow-sm">
						<EditableTitle />
						<button
							onClick={handlePrint}
							className="download-btn"
							aria-label="Download resume as PDF"
						>
							<p className="text-lg">Download</p>
							<IconDownload className="icon-size" />
						</button>
					</div>
					<div className="overflow-y-scroll max-h-[calc(100vh-48px)] no-scrollbar">
						{children}
					</div>
				</div>

				<FullResume ref={componentRef} />
			</div>
		</>
	);
};

export default PageLayout;
