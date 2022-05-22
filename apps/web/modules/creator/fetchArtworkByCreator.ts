import { sleep } from '@utils/sleep';
import { ArtworkMocks } from '../artwork/artworks.mocks';
import { creatorsMocks } from './creators.mocks';

export const fetchArtworkByCreator = async (creatorId: string) => {
  await sleep(3000);

  const creator = creatorsMocks.find((creator) => creator.id === creatorId.trim());

  const artworks = ArtworkMocks.filter((artwork) => creator?.artworkIds.includes(artwork.id));

  return artworks;
};
