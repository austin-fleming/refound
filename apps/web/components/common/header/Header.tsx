import { ContentSection } from "../../ui/content-section";
import { NotificationRail } from "../notification-rail";
import NextLink from "next/link";

const navLinks: Array<{ label: string; to: `/${string}` }> = [
	{ label: "create", to: "/create" },
	{ label: "regions", to: "/" },
	{ label: "register / log in", to: "/register" },
];

export const Header = () => (
	<header className="w-full sticky top-0 z-[1000] border-b-2 border-solid border-primary bg-background flex flex-col-reverse">
		<ContentSection el="div" className="flex flex-row-reverse items-baseline justify-between py-0">
			<NextLink href="/">
				<a className="text-4xl leading-none sm:text-8xl">refound</a>
			</NextLink>

			<nav className="flex flex-row gap-4">
				{navLinks.map(({ label, to }) => (
					<NextLink href={to} key={label}>
						<a className="text-sm font-bold">{label}</a>
					</NextLink>
				))}
			</nav>
		</ContentSection>

		<NotificationRail />
	</header>
);
