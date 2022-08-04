import { ContentSection } from "@components/ui/content-section";
import NextImage from "next/image";
import heroImage from "@public/hero.png";

export const Hero = () => (
	<section className="relative min-h-[50vh] flex flex-col justify-end">
		<ContentSection el="div" className="grid items-baseline grid-cols-2 gap-8 text-background">
			<h1 className="text-6xl">Mint it back to life</h1>

			<p>
				Refound is an NFT marketplace where journalists and photographers can share first person,
				creative content from the frontlines swiftly, raise awareness, and sell directly to
				businesses, with sale proceeds going to customizable beneficiaries.
			</p>
		</ContentSection>

		<div className="p-4 absolute top-0 bottom-0 left-0 right-0 z-[-1] w-full h-full">
			<div className="relative w-full h-full bg-primary">
				<NextImage
					src={heroImage}
					alt="man standing in front of protest"
					priority
					layout="fill"
					objectFit="cover"
					className="w-full h-full opacity-25"
				/>
			</div>
		</div>
	</section>
);
