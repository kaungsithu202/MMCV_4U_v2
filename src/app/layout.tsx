import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ogImage from './logo-color.png';
import EditableTitle from '@/components/home/EditableTitle';
import IconDownload from '@/components/icons/IconDownload';
import FullResume from '@/components/home/FullResume';
import PageLayout from '@/components/clientLayouts/PageLayout';
import { Suspense } from 'react';

const nunito = localFont({
	src: '../../public/fonts/Nunito-VariableFont_wght.ttf',
});

export const metadata: Metadata = {
	title: 'MMCV',
	description: 'Free Resume Builder',
	openGraph: {
		images: ogImage.src,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<link rel="icon" href="/logo-color.png" />

			<body className={nunito.className}>
				<PageLayout>{children}</PageLayout>
			</body>
		</html>
	);
}
