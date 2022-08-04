import { ContentSection } from "../../ui/content-section";
import NextLink from "next/link";

export const NotificationRail = () => (
	<aside className="w-full text-white bg-neutral-800">
		<NextLink href="https://waitlist.refound.app">
			<a target="blank" className="block w-full">
				<ContentSection className="py-2">
					<p className="text-sm">
						<span>This is a demo.</span> If you would like to stay in the loop, you can join our
						wait list.
					</p>
				</ContentSection>
			</a>
		</NextLink>
	</aside>
);
