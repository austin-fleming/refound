import { sleep } from '@utils/sleep';
import { ArtworkMocks } from './artworks.mocks';

export const fetchArtwork = async (id: string) => {
  await sleep(1500);

  return ArtworkMocks.find((artwork) => artwork.id === id);
};
