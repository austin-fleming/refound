import type { ReactNode } from "react";
import { Header } from "../header";
import { DemoModal } from "./demo-modal";

export const Layout = ({ children }: { children: ReactNode }) => (
	<>
		<Header />

		<main className="w-full min-h-screen" id="main-content">
			{children}
		</main>
	</>
);
