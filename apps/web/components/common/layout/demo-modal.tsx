import NextLink from "next/link";

export const DemoModal = () => (
	<aside className="fixed p-4 text-sm bg-white border-2 border-black border-solid bottom-4 right-4">
		<p className="font-bold leading-loose">This is a demo</p>
		<div>
			<p>
				Names and images you may see on this site are to demonstrate features we have coming in the
				future.
			</p>
			<p>
				If you would like to stay in the loop, you can{" "}
				<NextLink href="https://waitlist.refound.app">
					<a className="underline">join our waitlist.</a>
				</NextLink>
			</p>
		</div>
	</aside>
);
