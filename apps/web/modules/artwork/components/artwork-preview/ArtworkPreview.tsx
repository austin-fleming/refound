import { ArtworkModel } from '@modules/artwork/artwork.model';

export const ArtworkPreview = (artwork: ArtworkModel) => (
  <a href={`/artwork/${artwork.id}`} className='w-full block'>
    <article className='w-full'>
      <figure className='relative w-[100%] pb-[100%] overflow-hidden'>
        <img
          className='w-full h-full absolute top-0 left-0 object-cover object-center'
          src={artwork.source}
          alt={artwork.title}
        />
      </figure>

      <h1>{artwork.title}</h1>
      <p>{artwork.description}</p>
    </article>
  </a>
);
