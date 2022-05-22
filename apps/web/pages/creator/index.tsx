import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import * as web3 from '@solana/web3.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
const {
  Connection,
} = require('@solana/web3.js');
import { sendSol } from 'js/donate';
import { ContentSection } from '@components/common/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchArtworkByCreator } from '@modules/creator/fetchArtworkByCreator';
import { fetchCreator } from '@modules/creator/fetchCreator';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import * as React from 'react';

const CreatorPage: NextPage = () => {
  const [amount, setAmount] = React.useState(1);
  const router = useRouter();
  // const { connection } = useConnection();
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  const { publicKey } = useWallet();
  const { id } = router.query;

  const { data: creator, error: creatorError } = useSwr(id, fetchCreator);
  const { data: artworks, error: artworkError } = useSwr(`${id} `, fetchArtworkByCreator);

  const DonateSol = () => {
    if (publicKey) {
      return (
        <div className="flex items-center justify-evenly p-6 border-t border-solid border-slate-200 rounded-b">
          <div className="flex flex-col w-1/3">
            Support with $SOL:
            <input type="number" className="text-2xl md:text-5xl w-full h-full border-4 border-black" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <span>Value in USD: ${amount * 50}</span>
          </div>
          <button onClick={() => {
            sendSol({
              connection,
              solAmount: amount,
              toPublicKey: '6qTus3tf7BCDXY2i6RMYQEAijzVJTGDGg6vg3jAGESB5',
              fromWallet: publicKey,
            })
          }} className="border-4 border-black p-4 md:p-8 rounded-xl" type='button'>Donate</button>
        </div>
      )
    } else {
      return (
        <div className=''>
          <WalletMultiButton className="btn border-black border-2" />
        </div>
      )
    }
  }

  return creator ? (
    <>
      <ContentSection className='grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 items-baseline'>
        <h1 className='text-8xl font-bold'>{creator.name}</h1>
        <div className='flex flex-col gap-8'>
          <p>{creator.description}</p>
        </div>
        <DonateSol />
      </ContentSection>

      {artworks && artworks.length > 0 && (
        <ContentSection className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 py-12'>
          {artworks.map((artwork) => (
            <ArtworkPreview key={artwork.id} {...artwork} />
          ))}
        </ContentSection>
      )}
    </>
  ) : (
    <ContentSection>
      <h2>Loading...</h2>
    </ContentSection>
  );
};

export default CreatorPage;
