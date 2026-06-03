import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ogImage from './logo-color.png';
import PageLayout from '@/components/clientLayouts/PageLayout';
import { Toaster } from 'sonner';

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
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-paper focus:text-ink focus:rounded-md focus:shadow-lg"
				>
					Skip to main content
				</a>
				<PageLayout>{children}</PageLayout>
				<Toaster position="bottom-right" richColors />
			</body>
		</html>
	);
}
