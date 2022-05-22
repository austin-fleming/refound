import { sleep } from '@utils/sleep';
import { ArtworkMocks } from './artworks.mocks';

export const fetchArtwork = async (id: string) => {
  await sleep(3000);

  return ArtworkMocks.map((artwork) => artwork.id === id);
};
