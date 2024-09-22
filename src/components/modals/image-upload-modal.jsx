// import React from "react";
// import ImageCropping from "../image-cropping";
// import Modal from "react-bootstrap/Modal";

// const ImageUploadModal = ({ imageModalShow, imageModalClose, updateAvatar }) => {
//   return (
//     <Modal
//       show={imageModalShow}
//       onHide={imageModalClose}
//       dialogClassName="ride_type_container"
//       contentClassName="border_radius_10px"
//       backdropClassName="add_admin_modal_backdrop"
//       centered
//       backdrop={"static"}
//       keyboard={false}
//     >
//       <Modal.Body className=" pt-2 ms-4">
//         <ImageCropping updateAvatar={updateAvatar} imageModalClose={imageModalClose} />
//       </Modal.Body>
//     </Modal>
//   );
// };
// export default ImageUploadModal;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import ImgDailog from "./imgDailog";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import getCroppedImg from "./cropImage";
import styles from "./styles";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  UploadProfilePicAction,
  uploadImageRideTypeAction,
} from "../../redux/actions/imageUploadAction";
import "./modal.css";
import SpinnerLoading from "../utilits/spinnerLoading";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";

const ImageUploadModal = ({
  classes,
  imageModalShow,
  imageModalClose,
  dogImg,
  setPhotoUrl,
  formik,
  setUploadLoading,
  modalType,
  setFrontImageLink,
  field_name = "Upload",
  imageAction1 = UploadProfilePicAction,
  imageAction2,
  uploadLoading,
}) => {
  console.log(dogImg, "dogImg", field_name);
  const dispatch = useDispatch();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  console.log(crop, "crop", croppedAreaPixels);

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const showCroppedImage = async () => {
    try {
      setUploadLoading(true);
      console.log("doneeeees", croppedAreaPixels);
      const croppedImage = await getCroppedImg(
        dogImg,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      const croppedImagefile = croppedImage[0];
      if (croppedImagefile) {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
      if (modalType === "profilePhoto") {
        console.log("profilePic");
        dispatch(imageAction1(croppedImage, onUploadSuccess, onUploadError));
      } else {
        dispatch(imageAction2(croppedImage, onUploadSuccess, onUploadError));
      }
      imageModalClose;
    } catch (e) {
      console.error(e);
      setUploadLoading(false);
    }
  };

  const onUploadSuccess = (data, modifiedUrl) => {
    console.log(data);
    if (modalType === "profilePhoto") {
      setFrontImageLink({ img: data.data.data.location, error: false });
      formik.setFieldValue(`${field_name}`, data?.data?.data?.location ?? null);
    } else if (modalType === "premiumImageUpload") {
      formik.setFieldValue(`${field_name}`, data?.data?.data?.location ?? null);
    } else formik.setFieldValue("Upload", data?.data?.data?.location ?? null);
    imageModalClose();
    setUploadLoading(false);
    console.log(formik.values, "formik.values");
  };
  const onUploadError = (data, modifiedUrl) => {
    setUploadLoading(false);
  };

  const onClose = () => {
    setCroppedImage(null);
  };

  return (
    <div>
      <Modal
        show={imageModalShow}
        onHide={imageModalClose}
        dialogClassName="ride_type_container"
        contentClassName="border_radius_10px"
        backdropClassName="add_admin_modal_backdrop"
        centered
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body className="">
          <i
            onClick={imageModalClose}
            className="ri-close-circle-line fs_26 d-flex justify-content-end cursor_pointer"
          ></i>

          <>
            <div
              className={`position-relative w-100`}
              style={{ height: 300, background: "#333" }}
            >
              {uploadLoading ? (
                <div
                  className={`position-relative w-100 d-flex justify-content-center align-items-center h-100`}
                >
                  <LoadingSpinnerTable />
                </div>
              ) : (
                <Cropper
                  image={dogImg}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              )}
            </div>
            <div
              className={`controls d-flex p-4 flex-column align-items-stretch`}
            >
              <div className={`d-flex align-items-center gap-2 p-2`}>
                <Typography variant="overline">Zoom</Typography>
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  // classes={{ root: styles.slider }}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>
              <div className={`d-flex align-items-center gap-2 p-2`}>
                <Typography variant="overline">Rotation</Typography>
                <Slider
                  value={rotation}
                  min={0}
                  max={360}
                  step={1}
                  aria-labelledby="Rotation"
                  // classes={{ root: styles.slider }}
                  onChange={(e, rotation) => setRotation(rotation)}
                />
              </div>
              <div className="d-flex  justify-content-end gap-3">
                <button
                  disabled={uploadLoading}
                  onClick={() => {
                    // cancelModalFn();
                    // setFrontImageLink("");
                    imageModalClose();
                  }}
                  className={`white-bg px-4 py-1 error_color error_border_dark border_radius_5px`}
                  type="button"
                >
                  <span className="d-flex align-items-center gap-2 fs_18">
                    {/* <i className="ri-close-circle-line "></i> */}
                    <span>Cancel </span>
                  </span>
                </button>
                <Button
                  onClick={showCroppedImage}
                  variant="contained"
                  color="primary"
                  disabled={uploadLoading}
                >
                  Crop Image
                </Button>
              </div>
            </div>{" "}
          </>

          {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageUploadModal;

// const StyledDemo = withStyles(styles)(ImageUploadModal)

// const rootElement = document.getElementById('root')
// ReactDOM.render(<StyledDemo />, rootElement)
