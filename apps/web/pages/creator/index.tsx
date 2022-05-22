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

  return (
    <>
      <section>
        <h1>Intro</h1>
      </section>

      <section>
        {creator ? (
          <code>{JSON.stringify(creator)}</code>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </section>
    </>
  );
};

export default CreatorPage;
