import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ReactNode } from 'react';

interface Props {
	triggerSection: ReactNode;
	contentSection: ReactNode;
}

const CustomAccordion = ({ triggerSection, contentSection }: Props) => {
	return (
		<Accordion
			type="single"
			collapsible
			className="bg-paper border border-clay/40 round py-3 px-10 leading-10 cursor-pointer shadow-sm"
		>
			<AccordionItem value="item-1">
				<AccordionTrigger>{triggerSection}</AccordionTrigger>

				<AccordionContent className="relative">
					{contentSection}
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

export default CustomAccordion;
