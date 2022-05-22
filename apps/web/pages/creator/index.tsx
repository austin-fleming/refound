import { ContentSection } from '@components/common/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchCreator } from '@modules/creator/fetchCreator';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';

const CreatorPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: creator, error } = useSwr(id, fetchCreator);

  return creator ? (
    <>
      <ContentSection className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 items-baseline'>
        <h1 className='text-8xl font-bold'>{creator.name}</h1>
        <div className='flex flex-col gap-8'>
          <p>{creator.description}</p>
          <button type='button'>Donate</button>
        </div>
      </ContentSection>

      <ContentSection>
        <div>gallery</div>
      </ContentSection>
    </>
  ) : (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default CreatorPage;
