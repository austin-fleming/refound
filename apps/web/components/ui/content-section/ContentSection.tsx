import { ReactNode } from "react";

export const ContentSection = ({
	children,
	el = "div",
	className = "",
}: {
	children: ReactNode;
	el?: "div" | "section" | "article" | "nav" | "header";
	className?: string;
}) => {
	const Component = el;

	return (
		<Component className={`w-full max-w-screen-lg p-6 mx-auto ${className}`}>{children}</Component>
	);
};
