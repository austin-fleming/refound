import { sleep } from "@utils/sleep";
import { ArtworkMocks } from "./artworks.mocks";

export const fetchFeaturedArtworks = async () => {
  console.log('fetching...')
    await sleep(3000);
    console.log('featched....')
    return ArtworkMocks;
  };