// // import React, { useState } from 'react';
// // import Webcam from "react-webcam";

// // const WebcamComponent = () => <Webcam />;

// // const videoConstraints = {
// //     width: 220,
// //     height: 200,
// //     facingMode: "user"
// // };

// // export const WebcamCapture = () => {

// //     const [image,setImage]=useState('');
// //     const webcamRef = React.useRef(null);

// //     const capture = React.useCallback(
// //         () => {
// //         const imageSrc = webcamRef.current.getScreenshot();
// //         setImage(imageSrc)
// //         });

// //     return (
// //         <div className="webcam-container">
// //             <div className="webcam-img">

// //                 {image == '' ? <Webcam
// //                     audio={false}
// //                     height={200}
// //                     ref={webcamRef}
// //                     screenshotFormat="image/jpeg"
// //                     width={220}
// //                     videoConstraints={videoConstraints}
// //                 /> : <img src={image} />}
// //             </div>
// //             <div>
// //                 {image != '' ?
// //                     <button onClick={(e) => {
// //                         e.preventDefault();
// //                         setImage('')
// //                     }}
// //                         className="webcam-btn rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
// //                         Retake Image</button> :
// //                     <button onClick={(e) => {
// //                         e.preventDefault();
// //                         capture();
// //                     }}
// //                         className="webcam-btn rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Capture</button>
// //                 }
// //             </div>
// //         </div>
// //     );
// // };
// import React, { useEffect, useRef, useState } from "react";
// import Webcam from "react-webcam";

// const videoConstraints = {
//   width: 540,
//   facingMode: "environment",
// };
// const Camera = () => {
//   const webcamRef = useRef(null);

//   const [url, setUrl] = useState(null);

//   const capturePhoto = React.useCallback(async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setUrl(imageSrc);
//   }, [webcamRef]);

//   const onUserMedia = (e) => {
//     console.log("e", e);
//   };
//   return (
//     <>
//       <Webcam
//         ref={webcamRef}
//         audio={true}
//         screenshotFormat="image/png"
//         videoConstraints={videoConstraints}
//         onUserMedia={onUserMedia}
//         mirrored={true}
//         screenshotQuality={1}
//       />

//       <div className="flex space-x-4">
//         <button
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={capturePhoto}
//         >
//           Capture
//         </button>
//         <button
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={() => setUrl(null)}
//         >
//           Refresh
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
//     setCapturedImage(imageSrc); // Pass the image back to the parent component
//   };

//   return (
//     <>
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={videoConstraints}
//         mirrored={true}
//       />

//       <div className="flex space-x-4">
//         <button
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={capturePhoto}
//         >
//           Capture
//         </button>
//         <button
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={() => setUrl(null)}
//         >
//           Refresh
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
//     setCapturedImage(imageSrc); // Pass the image back to the parent component
//   };

//   return (
//     <>
//       <Webcam
//         ref={webcamRef}
//         audio={false}
//         screenshotFormat="image/png"
//         videoConstraints={videoConstraints}
//         mirrored={true}
//       />

//       <div className="flex space-x-4">
//         <button
//           type="button" // Prevents form submission
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={capturePhoto}
//         >
//           Capture
//         </button>
//         <button
//           type="button" // Prevents form submission
//           className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//           onClick={() => setUrl(null)}
//         >
//           Refresh
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
  facingMode: "environment",
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
        mirrored={true}
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
        {/* <button
          type="button"
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setUrl(null)}
        >
          Refresh
        </button> */}
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
