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
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={720}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};
