import { ContentSection } from '@components/ui/content-section';
import type { ArtworkModel } from '@modules/artwork/artwork.model';
import { ArtworkMocks } from '@modules/artwork/artworks.mocks';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { MintArtwork } from '@modules/artwork/components/mint-artwork';
import { fetchArtwork } from '@modules/artwork/fetchArtwork';
import { useState, useEffect } from 'react';
import { sleep } from '@utils/sleep';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSwr from 'swr';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

const ArtworkPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: artwork, error } = useSwr(id, fetchArtwork);

  return (
    <ContentSection el='article' className='grid grid-cols-1 gap-8 pb-48 md:grid-cols-2'>
      {artwork ? (
        <>
          <figure className='w-full pb-[100%] relative'>
            <img
              className='absolute top-0 left-0 object-cover object-center w-full h-full'
              src={artwork.source}
              alt={artwork.title}
            />
          </figure>

          <div className='flex flex-col gap-12'>
            <h1 className='text-4xl font-bold'>{artwork.title}</h1>
            <MintArtwork nftId={artwork.id} label='mint' price={artwork.price} />
            <p>{artwork.description}</p>
          </div>
        </>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </ContentSection>
  );
};

export default ArtworkPage;
