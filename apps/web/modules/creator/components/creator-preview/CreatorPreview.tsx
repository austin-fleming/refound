import { ArtworkModel } from "@modules/artwork/artwork.model";
import type { CreatorModel } from "@modules/creator/creator.model";
import { truncate } from "@utils/truncate";

export const CreatorPreview = (creator: CreatorModel) => (
	<a href={`/creator?id=${creator.id}`} className="block w-full">
		<article className="w-full">
			<figure className="relative w-[100%] pb-[100%] overflow-hidden rounded-[0.5rem]">
				<img
					className="absolute top-0 left-0 object-cover object-center w-full h-full"
					src={creator.source}
					alt={creator.name}
				/>
			</figure>

			<div className="flex flex-col w-full items-baseline gap-4 px-[0.5rem] mt-2">
				<h1 className="font-bold">{creator.name}</h1>
			</div>
		</article>
	</a>
);
