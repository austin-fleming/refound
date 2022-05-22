import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { CreatorModel } from './creator.model';

export const creatorsMocks: CreatorModel[] = [
  {
    id: 'jmngt67u8iujhgty7ujh',
    name: 'Jane Doe',
    source:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064',
    description:
      'Löksås ipsum tid vi annan smultron både ta tre, dunge hans vad vid smultron häst lax, om nya kanske sin vemod sjö gör. Blev kom erfarenheter kom ta kan faktor hav där tid kunde på, vi har både sista blivit hav samma tidigare icke brunsås, groda blivit ordningens gamla som vemod hav hans fram där. Se från samma både inom räv upprätthållande, vid som i vidsträckt oss sorgliga björnbär, tre verkligen och dimmhöljd kunde.',
    artworkIds: [ArtworkMocks[0].id, ArtworkMocks[1].id, ArtworkMocks[2].id],
  },
];
