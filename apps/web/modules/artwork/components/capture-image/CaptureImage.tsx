import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    // @ts-expect-error: HACK
    const imageSrc = webcamRef.current.getScreenshot();

    console.log(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export const CaptureImage = () => {
  return <WebcamCapture />;
};
