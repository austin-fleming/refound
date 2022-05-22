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

  return (
    <ContentSection className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className=' col-span-full'>
        <h1 className='text-4xl font-bold'>Create</h1>
      </div>
      <ArtworkForm formData={artworkFormData} setFormData={setArtworkFormData} />
      {imageSrc ? (
        <img src={imageSrc} />
      ) : (
        <CaptureImage imageSrc={imageSrc} setImageSrc={setImageSrc} />
      )}
    </ContentSection>
  );
};

export default CreatePage;
