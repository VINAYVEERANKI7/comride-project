// import React from "react";
// import ReactCrop from 'react-image-crop'
// import 'react-image-crop/dist/ReactCrop.css'
// import 'react-image-crop/src/ReactCrop.scss'
// import ReactCrop, { type Crop } from 'react-image-crop'

// function CropDemo({ src }) {
//     const [crop, setCrop] = useState<Crop>()
//     return (
//       <ReactCrop crop={crop} onChange={c => setCrop(c)}>
//         <img src={src} />
//       </ReactCrop>
//     )
//   }

import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import setCanvasPreview from "./setCanvasPreview";

// function generateDownload(canvas, crop) {
//   if (!crop || !canvas) {
//     return;
//   }

//   canvas.toBlob(
//     (blob) => {
//       const previewUrl = window.URL.createObjectURL(blob);

//       const anchor = document.createElement("a");
//       anchor.download = "cropPreview.png";
//       anchor.href = URL.createObjectURL(blob);
//       anchor.click();

//       window.URL.revokeObjectURL(previewUrl);
//     },
//     "image/png",
//     1
//   );
// }

// function setCanvasImage(image, canvas, crop) {
//   if (!crop || !canvas || !image) {
//     return;
//   }

//   const scaleX = image.naturalWidth / image.width;
//   const scaleY = image.naturalHeight / image.height;
//   const ctx = canvas.getContext("2d");
//   // refer https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
//   const pixelRatio = window.devicePixelRatio;

//   canvas.width = crop.width * pixelRatio * scaleX;
//   canvas.height = crop.height * pixelRatio * scaleY;

//   // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setTransform
//   ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//   ctx.imageSmoothingQuality = "high";

//   // refer https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
//   ctx.drawImage(
//     image,
//     crop.x * scaleX,
//     crop.y * scaleY,
//     crop.width * scaleX,
//     crop.height * scaleY,
//     0,
//     0,
//     crop.width * scaleX,
//     crop.height * scaleY
//   );
// }

// export default function ImageCropping() {
//   const [upImg, setUpImg] = useState();

//   const imgRef = useRef(null);
//   const previewCanvasRef = useRef(null);

//   const [crop, setCrop] = useState({ unit: "px", width: 30, aspect: 1 });
//   const [completedCrop, setCompletedCrop] = useState(null);

//   console.log(crop, upImg, "imageconsole");

//   // on selecting file we set load the image on to cropper
//   const onSelectFile = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const reader = new FileReader();
//       console.log(reader, "reader:");
//       reader.addEventListener("load", () => setUpImg(reader.result));
//       reader.readAsDataURL(e.target.files[0]);
//     }
//   };

//   const onLoad = useCallback((img) => {
//     imgRef.current = img;
//   }, []);

//   useEffect(() => {
//     setCanvasImage(imgRef.current, previewCanvasRef.current, completedCrop);
//   }, [completedCrop]);

//   return (
//     <div className="App">
//       <div>
//         <input type="file" accept="image/*" onChange={onSelectFile} />
//       </div>
//       <ReactCrop
//         src={upImg}
//         circularCrop
//         keepSelection
//         aspect={1}
//         onImageLoaded={onLoad}
//         crop={crop}
//         onChange={(c) => setCrop(c)}
//         onComplete={(c) => setCompletedCrop(c)}
//       />
//       <div>
//         {/* Canvas to display cropped image */}
//         <canvas
//           ref={previewCanvasRef}
//           // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
//           style={{
//             width: Math.round(completedCrop?.width ?? 0),
//             height: Math.round(completedCrop?.height ?? 0),
//           }}
//         />
//       </div>
//       <p>
//         Note that the download below won't work in this sandbox due to the
//         iframe missing 'allow-downloads'. It's just for your reference.
//       </p>
//       <button
//         type="button"
//         disabled={!completedCrop?.width || !completedCrop?.height}
//         onClick={() =>
//           generateDownload(previewCanvasRef.current, completedCrop)
//         }
//       >
//         Download cropped image
//       </button>
//     </div>
//   );
// }

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

const ImageCropping = ({ imageModalClose, updateAvatar }) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [error, setError] = useState("");
  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("Load", (e) => {
        if (error) setError("");
        const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image should be 150x150px");
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label>
        <span>Choose Profile Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="black w-full text-sm text-slate-500"
        />
      </label>
      {error && <p className="text-danger">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col item-center">
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt=""
              style={{ maxHeight: "70vh" }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <button
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();

              console.log( "avatarLog");
              updateAvatar(dataUrl), imageModalClose;
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropping;
