import { ContentSection } from '@components/common/content-section';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchFeaturedArtworks } from '@modules/artwork/fetchFeaturedArtworks';
import { CreatorPreview } from '@modules/creator/components/creator-preview/CreatorPreview';
import { fetchCreators } from '@modules/creator/fetchCreators';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import useSWR from 'swr';

const Home: NextPage = () => {
  const { data: featuredArtworks, error: artworksError } = useSWR(
    '/artworks',
    fetchFeaturedArtworks,
    {
      refreshInterval: 500,
    },
  );

  const { data: creators, error: creatorsError } = useSWR('/creator', fetchCreators, {
    refreshInterval: 500,
  });

  useEffect(() => {
    console.log(featuredArtworks);
  }, [featuredArtworks]);

  return (
    <>
      <Head>
        <title>Refound</title>
        <meta name='description' content='Democratized photojournalism for the brave' />
      </Head>

      <section className='relative w-full h-[50vh] max-h-[200vh] bg-indigo-900 flex flex-col justify-end'>
        <img
          className='absolute top-0 left-0 object-cover object-center w-full h-full opacity-30'
          src='/hero.png'
          alt='hero image'
        />
        <ContentSection
          el='div'
          className='relative z-10 grid items-baseline grid-cols-1 gap-4 pt-12 text-white md:grid-cols-2'>
          <h1 className=' max-w-[15ch] text-4xl font-bold'>Mint it to back to life on Refound</h1>

          <p className='max-w-[35ch]'>
            Refound is an NFT marketplace where journalists and photographers can share first
            person, creative content from the frontlines swiftly, raise awareness, and sell directly
            to businesses, with sale proceeds going to customizable beneficiaries.
          </p>
        </ContentSection>
      </section>

      <ContentSection el='section'>
        <h2 className='font-bold text-4xl mb-[1em]'>Photography</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 gap-y-12'>
          {featuredArtworks ? (
            featuredArtworks.map((artwork) => <ArtworkPreview key={artwork.id} {...artwork} />)
          ) : (
            <div>
              <h2>Loading Photography...</h2>
            </div>
          )}
        </div>
      </ContentSection>

      <ContentSection el='section'>
        <h2 className='font-bold text-4xl mb-[1em]'>Journalists</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 gap-y-12'>
          {creators ? (
            creators.map((creator) => <CreatorPreview key={creator.id} {...creator} />)
          ) : (
            <div>
              <h2>Loading Journalists...</h2>
            </div>
          )}
        </div>
      </ContentSection>

      <div className='w-full bg-neutral-800'>
        <ContentSection el='section' className='flex flex-col gap-8 py-16 text-white'>
          <h2 className='text-4xl font-bold'>Photography by region</h2>

          <div className='flex flex-row flex-wrap gap-4 max-w-[75%]'>
            {['Africa', 'Asia', 'Europe', 'N. America', 'Oceania', 'S. America'].map((region) => (
              <span>{region}</span>
            ))}
          </div>
        </ContentSection>
      </div>
    </>
  );
};

export default Home;
