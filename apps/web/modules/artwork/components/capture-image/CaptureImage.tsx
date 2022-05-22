import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 720,
  height: 720,
  facingMode: 'user',
};

export const CaptureImage = ({
  imageSrc,
  setImageSrc,
}: {
  imageSrc: string;
  setImageSrc: (src: string) => void;
}) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    // @ts-expect-error: HACK
    setImageSrc(webcamRef.current.getScreenshot());

    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <div className='relative'>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={720}
        videoConstraints={videoConstraints}
      />

      <div className='w-full h-full absolute top-0 left-0 flex flex-col items-center justify-end'>
        <button
          className='font-bold bg-red-800 text-white px-[1.5em] py-[0.6em] rounded-full mb-[0.6em]'
          onClick={capture}>
          Capture Photo
        </button>
      </div>
    </div>
  );
};
