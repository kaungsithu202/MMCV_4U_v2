import IconPlus from '@/components/icons/IconPlus';
import IconProfile from '@/components/icons/IconProfile';
import IconProjects from '@/components/icons/IconProjects';
import IconSkill from '@/components/icons/IconSkill';
import IconWork from '@/components/icons/IconWork';
import { Button } from '@/components/ui/button';
import DialogCard from '@/components/home/DialogCard';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	EDIT_PROFILE_SUMMARY,
	EXPERIENCE_URL,
	PROJECTS_URL,
	SKILLS_URL,
} from '@/constants/routes';

const ContentDialogSection = () => {
	return (
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
								link={EDIT_PROFILE_SUMMARY}
								titleElements={
									<>
										<IconProfile />
										PROFILE
									</>
								}
								description="Make a great first impression by presenting yourself in a few sentences"
							/>
							<DialogCard
								link={SKILLS_URL}
								titleElements={
									<>
										<IconSkill />
										Skill
									</>
								}
								description="List your technical,managerial or soft skills in this section."
							/>
							<DialogCard
								link={EXPERIENCE_URL}
								titleElements={
									<>
										<IconWork className="w-6 h-auto" />
										Experience
									</>
								}
								description="List your technical,managerial or soft skills in this section."
							/>
							<DialogCard
								link={PROJECTS_URL}
								titleElements={
									<>
										<IconProjects />
										Project
									</>
								}
								description="Worked on a particular challenging project in the past? Mention it here."
							/>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ContentDialogSection;
