import { sleep } from '@utils/sleep';
import { creatorsMocks } from './creators.mocks';

export const fetchCreator = async (id: string) => {
  await sleep(3000);

  return creatorsMocks.find((creator) => creator.id === id);
};
