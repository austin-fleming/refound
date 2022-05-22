import { ContentSection } from '@components/common/content-section';
import { ArtworkForm, ArtworkFormData } from '@modules/artwork/components/artwork-form';
import { CaptureImage } from '@modules/artwork/components/capture-image';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const CreatePage: NextPage = () => {
  const [imageSrc, setImageSrc] = useState('');
  const [artworkFormData, setArtworkFormData] = useState<ArtworkFormData>({
    title: '',
    price: 0,
    description: '',
    region: 'africa',
  });

  const [creationStep, setCreationStep] = useState<'READY' | 'UPLOADING' | 'DONE'>('READY');

  return (
    <ContentSection className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className=' col-span-full'>
        <h1 className='text-4xl font-bold'>Create</h1>
      </div>

      {creationStep === 'READY' && (
        <>
          <div className='flex flex-col gap-12'>
            <ArtworkForm formData={artworkFormData} setFormData={setArtworkFormData} />
            {imageSrc && artworkFormData && (
              <button
                className='bg-green-800 text-white font-bold rounded-full py-[0.6em] px-[1.5em]'
                type='button'
                onClick={() => {
                  setCreationStep('UPLOADING');
                }}>
                create
              </button>
            )}
          </div>

          {imageSrc ? (
            <img src={imageSrc} />
          ) : (
            <CaptureImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
          )}
        </>
      )}

      {creationStep === 'UPLOADING' && <div>Uploading...</div>}

      {creationStep === 'DONE' && <div>Done!</div>}
    </ContentSection>
  );
};

export default CreatePage;
