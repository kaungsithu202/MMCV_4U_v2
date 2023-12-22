import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ogImage from './logo-color.png';
import EditableTitle from '@/components/home/EditableTitle';
import IconDownload from '@/components/icons/IconDownload';
import FullResume from '@/components/home/FullResume';

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
				<div className="flex w-full bg-primary min-h-screen pt-6 gap-6">
					<div className="w-2/12  flex flex-col justify-start items-center   ">
						<div className="w-8/12 bg-white  rounded-3xl drop-shadow-md flex flex-col py-6 gap-6 px-3 items-center">
							<div className="w-10/12 bg-gray-200 h-16 rounded-2xl"></div>
							<div className="w-10/12 bg-gray-200 h-16 rounded-2xl"></div>
							<div className="w-10/12 bg-gray-200 h-16 rounded-2xl"></div>
							<div className="w-10/12 bg-gray-200 h-16 rounded-2xl"></div>
						</div>
					</div>
					{/* {children} */}
					<section className="w-full flex flex-col gap-6">
						<div className="bg-white round p-6 flex-between">
							<EditableTitle />
							<button className="download-btn">
								<p className="text-lg">Download</p>
								<IconDownload className="icon-size" />
							</button>
						</div>
						{children}
						{/* {!isEditProfileSummary && <ProfileDetailSection />}
				{!isEditProfileDetail && <ProfileSummary />} */}
					</section>

					<FullResume />
				</div>
			</body>
		</html>
	);
}
