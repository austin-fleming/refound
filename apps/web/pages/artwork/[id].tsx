import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import useSwr from 'swr';

const fetchHomepageArtwork = async () => {
  await sleep(3000);

  return ArtworkMocks;
};

const ArtworkPage: NextPage = () => {
  const { data: artworks, error } = useSwr('', fetchHomepageArtwork);

  return (
    <>
      <section>
        <h1>Intro</h1>
      </section>

      <section>
        {artworks ? (
          artworks.map(ArtworkPreview)
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
