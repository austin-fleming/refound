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

      <ContentSection el='section'>
        <h2>Intro Section</h2>
      </ContentSection>

      <ContentSection el='section'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {featuredArtworks ? (
            featuredArtworks.map((artwork) => <ArtworkPreview key={artwork.id} {...artwork} />)
          ) : (
            <div>
              <h2>Loading Artwork...</h2>
            </div>
          )}
        </div>
      </ContentSection>
    </>
  );
};

export default Home;
