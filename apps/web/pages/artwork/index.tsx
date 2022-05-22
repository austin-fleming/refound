import { ContentSection } from '@components/common/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { MintArtwork } from '@modules/artwork/components/mint-artwork';
import { fetchArtwork } from '@modules/artwork/fetchArtwork';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';


const ArtworkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: artwork, error } = useSwr(id, fetchArtwork);

  return (
   <ContentSection el='article' className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      {artwork ? (
        <>
          <figure className='w-full pb-[100%] relative'>
            <img
              className='w-full absolute top-0 left-0 h-full object-cover object-center'
              src={artwork.source}
              alt={artwork.title}
            />
          </figure>

          <div className='flex flex-col gap-12'>
            <h1 className='text-4xl font-bold'>{artwork.title}</h1>
            <p>${artwork.price}</p>
            <p>{artwork.description}</p>

            <MintArtwork nftId={artwork.id} label='mint' price={artwork.price} />
          </div>
        </>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </ContentSection>
  );
};

export default ArtworkPage;
