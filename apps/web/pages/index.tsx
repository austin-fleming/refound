import { ContentSection } from '@components/common/content-section';
import { ArtworkPreview } from '@modules/artwork/components/artwork-preview/ArtworkPreview';
import { fetchFeaturedArtworks } from '@modules/artwork/fetchFeaturedArtworks';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import useSWR from 'swr';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { data: featuredArtworks, error } = useSWR('/dummy', fetchFeaturedArtworks, {
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
        {/* <link rel='icon' href='/favicon.ico' /> */}
      </Head>

      <ContentSection el='section' className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <figure className='w-full pb-[100%] relative'>
          <img
            className='w-full h-full absolute top-0 left-0 object-cover object-center'
            src='https://images.unsplash.com/photo-1652904337552-a7d8ca893ec8?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065'
            alt='hero image'
          />
        </figure>

        <div>
          <h1>Hero Line</h1>

          <p>
            Löksås ipsum tid vi annan smultron både ta tre, dunge hans vad vid smultron häst lax.
          </p>
        </div>
      </ContentSection>

      <ContentSection el='section'>
        <h2 className='font-bold text-4xl'>Artwork</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {featuredArtworks ? (
            featuredArtworks.map((artwork) => <ArtworkPreview key={artwork.id} {...artwork} />)
          ) : (
            <div>
              <h2>Loading Artwork...</h2>
            </div>
          )}
        </div>
      </ContentSection>

      <div className='w-full bg-neutral-800'>
        <ContentSection el='section' className='text-white flex flex-col gap-8 py-16'>
          <h2 className='font-bold text-4xl'>Photography by region</h2>

          <div className='flex flex-row gap-4'>
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
