import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  //   const [imgSrc, setImgSrc] = useState(null); // State to store the captured image source

  //   Function to capture a photo
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setImgSrc(imageSrc);
    sendDiceImage(imageSrc);
  }, [webcamRef]);

  // Video constraints for camera settings (e.g., front/back camera, resolution)
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user", // "user" for front camera, "environment" for rear camera
    frameRate: { ideal: 5 }, // Set the desired frame rate
  };

  async function sendDiceImage(imageSrc) {
    // e.preventDefault(); // Stops the page reload

    try {
      const response = await fetch("/api/getDiceImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64: imageSrc }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Error during dice image send:", error.message);
    }
  }

  return (
    <div>
      {/* imgSrc ? (
        // Display the captured image
        <img src={imgSrc} alt='captured' />
      ) : ( */}
      {
        // Display the live webcam feed
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat='image/jpeg'
          width={1280}
          videoConstraints={videoConstraints}
        />
      }
      <button onClick={capture}>Capture photo</button>
      {/* {imgSrc && <button onClick={() => setImgSrc(null)}>Retake</button>} */}
    </div>
  );
};

export default WebcamCapture;
