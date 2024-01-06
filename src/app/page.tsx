import DialogCard from '@/components/home/DialogCard';
import ProfileAccordion from '@/components/home/ProfileAccordion';
import ProfileDetail from '@/components/home/ProfileDetailSection/ProfileDetailInfo';
import SkillsAccordion from '@/components/home/SkillsAccordion';
import IconPlus from '@/components/icons/IconPlus';
import IconProfile from '@/components/icons/IconProfile';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { PROFILE_DETAIL_URL } from '@/constants/routes';

export default function Home() {
	return (
		<section className="flex flex-col gap-6 ">
			<ProfileDetail />

			<ProfileAccordion />
			{/* <ExperienceAccordion /> */}
			<SkillsAccordion />
			<div className="flex items-center justify-center">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="h-14 font-bold text-lg rounded-full">
							<IconPlus className="mr-3" /> Add Content
						</Button>
					</DialogTrigger>
					<DialogContent className="h-[80vh] ">
						<DialogHeader>
							<DialogTitle className="mb-6 text-3xl font-bold">
								Add Content
							</DialogTitle>
							<DialogDescription className="grid grid-cols-4 gap-5">
								<DialogCard
									link={PROFILE_DETAIL_URL}
									titleElements={
										<>
											<IconProfile />
											PROFILE
										</>
									}
									description="Make a great first impression by presenting yourself in a few sentences"
								/>
								<div>Education</div>
								<div>Education</div>
								<div>Education</div>
								<div>Education</div>
								<div>Education</div>
								<div>Education</div>
							</DialogDescription>
						</DialogHeader>
					</DialogContent>
				</Dialog>
			</div>
		</section>
	);
}
