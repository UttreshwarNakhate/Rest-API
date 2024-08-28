// // export default Camera;

// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const videoConstraints = {
//   width: 540,
//   facingMode: "environment",
// };

// const Camera = ({ setCapturedImage }) => {
//   const webcamRef = useRef(null);
//   const [url, setUrl] = useState(null);

//   const capturePhoto = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setUrl(imageSrc);
//     const blob = base64ToBlob(imageSrc, "image/png");
//     setCapturedImage(blob); // Pass the blob back to the parent component
//   };

//   // Convert base64 to Blob
//   const base64ToBlob = (base64, mime) => {
//     const byteString = atob(base64.split(",")[1]);
//     const mimeString = mime || base64.split(",")[0].split(":")[1].split(";")[0];
//     const ia = new Uint8Array(byteString.length);
//     for (let i = 0; i < byteString.length; i++) {
//       ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ia], { type: mimeString });
//   };

//   return (
//     <>
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={videoConstraints}
//         mirrored={true}
//         className="h-48 w-78 rounded-md"
//       />

//       <div className="flex space-x-4 my-6">
//         <button
//           type="button"
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={capturePhoto}
//         >
//           Capture
//         </button>
//       </div>

//       {url && (
//         <div>
//           <img src={url} alt="Screenshot" />
//         </div>
//       )}
//     </>
//   );
// };

// export default Camera;


import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "user", // Use the selfie camera
};

const Camera = ({ setCapturedImage }) => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
    const blob = base64ToBlob(imageSrc, "image/png");
    setCapturedImage(blob); // Pass the blob back to the parent component
  };

  // Convert base64 to Blob
  const base64ToBlob = (base64, mime) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = mime || base64.split(",")[0].split(":")[1].split(";")[0];
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        mirrored={true} // Mirror the video for a selfie camera effect
        className="h-48 w-78 rounded-md"
      />

      <div className="flex space-x-4 my-6">
        <button
          type="button"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={capturePhoto}
        >
          Capture
        </button>
      </div>

      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Camera;
