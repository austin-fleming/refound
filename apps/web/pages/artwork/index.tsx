import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchArtwork } from '@modules/artwork/fetchArtwork';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';

const fetchHomepageArtwork = async () => {
  await sleep(3000);

  return ArtworkMocks;
};

const ArtworkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: artworks, error } = useSwr(id, fetchArtwork);

  return (
    <>
      <section>
        <h1>Intro</h1>
      </section>

      <section>
        {artworks ? (
          <code>{JSON.stringify(artworks)}</code>
        ) : (
          <div>
            <h2>Loading...</h2>
          </div>
        )}
      </section>
    </>
  );
};

export default ArtworkPage;
