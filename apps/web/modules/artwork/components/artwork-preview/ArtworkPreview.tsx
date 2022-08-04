import type { ArtworkModel } from "@modules/artwork/artwork.model";
import { truncate } from "@utils/truncate";
import NextImage from "next/image";

export const ArtworkPreview = (artwork: ArtworkModel) => (
	<a href={`/artwork?id=${artwork.id}`} className="block w-full">
		<article className="w-full">
			<figure className="relative w-[100%] pb-[100%] overflow-hidden rounded-[0.5rem]">
				{/* <img
          className='absolute top-0 left-0 object-cover object-center w-full h-full'
          src={artwork.source}
          alt={artwork.title}
        />
 */}
				<NextImage src={artwork.source} alt={artwork.title} objectFit="cover" layout="fill" />
			</figure>

			<div className="grid grid-cols-[2fr_3fr] items-baseline gap-4 px-[0.5rem] mt-2">
				<h1 className="font-bold">{artwork.title}</h1>
				<p className="text-xs text-slate-800">{truncate(artwork.description, 80)}</p>
			</div>
		</article>
	</a>
);
