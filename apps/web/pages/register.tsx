import { ContentSection } from '@components/ui/content-section';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchFeaturedArtworks } from '@modules/artwork/fetchFeaturedArtworks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import useSWR from 'swr';

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Refound</title>
        <meta name='description' content='Democratized photojournalism for the brave' />
      </Head>

      <ContentSection el='section' className='grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2'>
        <div>
          <h1 className='font-bold text-4xl mb-[1em]'>Register</h1>

          <p className='text-lg font-bold'>
            <span className='text-sm font-normal'>Step 01</span> Connect your wallet
          </p>
          <p className='text-lg font-bold'>
            <span className='text-sm font-normal'>Step 02</span> Choose a beneficiary
          </p>
        </div>

        <div className='flex flex-col gap-8'>
          <label className='flex flex-col gap-4'>
            <span className='text-sm font-bold'>Beneficiary&apos;s Wallet Address</span>
            <input className='border-b-2 border-black border-solid' type='text' />
          </label>

          <span>- or -</span>

          <button
            className='border-2 border-solid border-black py-[0.6em] text-base px-[1.5em] text-center'
            type='button'>
            Humanitarian Aid Fund
          </button>
          <button
            className='border-2 border-solid border-black py-[0.6em] text-base px-[1.5em] text-center'
            type='button'>
            Education Fund
          </button>
          <button
            className='border-2 border-solid border-black py-[0.6em] text-base px-[1.5em] text-center'
            type='button'>
            Environmental Fund
          </button>
        </div>
      </ContentSection>
    </>
  );
};

export default RegisterPage;
