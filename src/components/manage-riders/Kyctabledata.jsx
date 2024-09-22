import React, { useState, useRef } from "react";
import "./bookinghistorytablestyle.css";
import { saveAs } from "file-saver";
import { Modal } from "react-bootstrap";
import eyeOn from "../../assets/icons/eye-on.svg";
import Download from "./download.png";

function Kyctable() {
  const [showKycTable, setShowKycTable] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showsecondModal, setShowsecondModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");
  const [firstName, setFirstName] = useState("");
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [popupEditMode, setPopupEditMode] = useState(false);

  const popuphandleEditClick = () => {
    setPopupEditMode(true);
  };

  const handleEditClick = () => {
    setShowModal(true);
    setDocumentStatus("");
    setEditMode(true);
    setOriginalFirstName(firstName);
  };

  const handleTableSaveClick = () => {
    console.log("First Name:", firstName);
    setEditMode(true);
  };

  const handleCloseModal = () => {
    setFirstName(originalFirstName);
    setShowModal(false);
  };

  const handleResetClick = () => {
    setFirstName(originalFirstName);
  };

  const handleViewClick = () => {
    setShowsecondModal(true);
  };

  const handleViewCloseClick = () => {
    setShowsecondModal(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file.name;
    setSelectedFileName(fileName);
    setUploadedImage(URL.createObjectURL(file));
  };

  const handleReuploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDownloadImage = () => {
    if (uploadedImage) {
      saveAs(uploadedImage, "image.jpg");
    }
  };

  const openImageInNewTab = () => {
    if (uploadedImage) {
      window.open(uploadedImage, "_blank");
    }
  };

  const handlesEditClick = () => {
    setEditMode(true);
  };

  const handlesCancelClick = () => {
    setEditMode(false);
  };

  const handlePopupSaveClick = () => {
    console.log("Uploaded Image URL:", uploadedImage);

    setEditMode(true);
  };

  return (
    <div>
      <div className="ridercoupons">
        {!showKycTable && (
          <>
            <p className="document">
              <u>Documents</u>
            </p>
            <p className="skyblue">
              <span className="documentname">Document Name</span>
              <span className="documentdetails">Document Details</span>
              <span className="reviewstatus">Review Status</span>
              <span className="expirydate">Expiry Date</span>
            </p>
            <p>
              <span className="documentname">Proof of identity(POI)</span>
              <span className="aadhar">Aadhar</span>
              <span
                className="approved"
                style={{ position: "absolute", right: "50%" }}
              >
                Approved
              </span>
              <span
                className="dashs"
                style={{ position: "absolute", right: "35%" }}
              >
                -
              </span>
              <span
                className="view"
                style={{ position: "absolute", right: "99px" }}
                onClick={handleViewClick}
              >
                View
              </span>
              {editMode && (
                <p
                  className="edit"
                  style={{
                    position: "absolute",
                    right: "23px",
                    marginTop: "-21px",
                  }}
                  onClick={handleEditClick}
                >
                  Edit
                </p>
              )}
            </p>
            <div className="line"></div>
            <p style={{ position: "relative", marginTop: "15px" }}>
              <span className="documentname">Proof of Address(POA)</span>
              <span className="aadhar">{selectedFileName || "Aadhar"}</span>
              <span
                id="approvalStatus"
                className="approved"
                style={{
                  position: "absolute",
                  right: "50%",
                  color:
                    documentStatus === "Approved"
                      ? "#32f45f"
                      : documentStatus === "Waiting for Approval"
                      ? "orange"
                      : "#0F203C",
                }}
              >
                {documentStatus || (
                  <span style={{ color: "#0F203C" }}>----------</span>
                )}
              </span>
              <span
                className="dashs"
                style={{ position: "absolute", right: "35%" }}
              >
                -
              </span>
              <span
                className="view"
                style={{ position: "absolute", right: "99px" }}
                onClick={handleViewClick}
              >
                View
              </span>
              {editMode && (
                <p
                  className="edit"
                  style={{
                    position: "absolute",
                    right: "23px",
                    marginTop: "-21px",
                  }}
                  onClick={handleEditClick}
                >
                  Edit
                </p>
              )}
            </p>
            <div className="line"></div>
          </>
        )}

        <br />
        <div>
          {editMode ? (
            <div style={{ display: "flex", marginLeft: "69%" }}>
              <p className="reset" onClick={handleResetClick}>
                Reset
              </p>
              <p className="reject bg" onClick={handlesCancelClick}>
                Cancel
              </p>
              <p className="approve" onClick={handleTableSaveClick}>
                Save
              </p>
            </div>
          ) : (
            <p
              className="edit"
              style={{ position: "absolute", right: "20px" }}
              onClick={handlesEditClick}
            >
              Edit
            </p>
          )}
        </div>
      </div>

      <div>
        <Modal
          style={{
            width: "500px",
            height: "450px",
            marginTop: "12%",
            marginLeft: "42%",
          }}
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Body>
            <p className="poaddress">
              Proof Of Address(POA)
              <span className="xstyles" onClick={handleCloseModal}>
                x
              </span>
            </p>
            <div className="line"></div>
            <p style={{ color: "#0f203c" }}>
              Status:{" "}
              <span
                style={{
                  color:
                    documentStatus === "Waiting for Approval"
                      ? "orange"
                      : "green",
                }}
              >
                {documentStatus}
              </span>
            </p>
            <p style={{ color: "#0f203c" }}>Front Photo *</p>
            <div className="updocstyles">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <p style={{ marginTop: "8px", marginLeft: "3px" }}>
                upload&nbsp;documents
              </p>
              <div style={{ marginLeft: "40%", marginTop: "5px" }}>
                {popupEditMode && (
                  <p className="reuploads" onClick={handleReuploadClick}>
                    Re-upload
                  </p>
                )}
                <img
                  className="eye"
                  src={eyeOn}
                  alt="password visibility on or off"
                  onClick={openImageInNewTab}
                />

                <img
                  src={Download}
                  onClick={handleDownloadImage}
                  style={{ height: "20px", width: "27px" }}
                  alt="My Image"
                />
              </div>
            </div>
            <p style={{ color: "#0f203c" }}>Back Photo *</p>
            <div className="updocstyles">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <p style={{ marginTop: "8px", marginLeft: "3px" }}>
                upload&nbsp;documents
              </p>
              <div style={{ marginLeft: "40%", marginTop: "5px" }}>
                {popupEditMode && (
                  <p className="reuploads" onClick={handleReuploadClick}>
                    Re-upload
                  </p>
                )}
                <img
                  className="eye"
                  src={eyeOn}
                  alt="password visibility on or off"
                  onClick={openImageInNewTab}
                />

                <img
                  src={Download}
                  onClick={handleDownloadImage}
                  style={{ height: "20px", width: "27px" }}
                  alt="My Image"
                />
              </div>
            </div>
            {popupEditMode ? (
              <div style={{ display: "flex", marginTop: "10px" }}>
                <p onClick={handleCloseModal} className="cancel">
                  Cancel
                </p>
                <p className="savepopup" onClick={handlePopupSaveClick}>
                  Save
                </p>
              </div>
            ) : (
              <p className="edits" onClick={popuphandleEditClick}>
                Edit
              </p>
            )}
          </Modal.Body>
        </Modal>
      </div>

      <Modal
        style={{
          width: "450px",
          height: "400px",
          marginTop: "12%",
          marginLeft: "42%",
        }}
        show={showsecondModal}
        onHide={handleViewCloseClick}
      >
        <Modal.Body>
          <p className="poaddress">
            Proof Of Identity(POI)
            <span className="xstyles" onClick={handleViewCloseClick}>
              x
            </span>
          </p>
          <div className="line"></div>
          <p style={{ color: "#0f203c" }}>
            Status:{" "}
            <span
              style={{
                color:
                  documentStatus === "Waiting for Approval"
                    ? "orange"
                    : "green",
              }}
            >
              {documentStatus}
            </span>
          </p>
          <p style={{ color: "#0f203c" }}>Front Photo *</p>
          <div className="updocstyles">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <p style={{ marginTop: "8px", marginLeft: "3px" }}>
              upload&nbsp;documents
            </p>
            <div style={{ marginLeft: "40%", marginTop: "5px" }}>
              <img
                className="eye"
                src={eyeOn}
                alt="password visibility on or off"
                onClick={openImageInNewTab}
              />
              {/* <DownloadIcon onClick={handleDownloadImage} /> */}
              <img
                src={Download}
                onClick={handleDownloadImage}
                style={{ height: "20px", width: "27px" }}
                alt="My Image"
              />
            </div>
          </div>
          <p style={{ color: "#0f203c" }}>Back Photo *</p>
          <div className="updocstyles">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <p style={{ marginTop: "8px", marginLeft: "3px" }}>
              upload&nbsp;documents
            </p>
            <div style={{ marginLeft: "40%", marginTop: "5px" }}>
              <img
                className="eye"
                src={eyeOn}
                alt="password visibility on or off"
                onClick={openImageInNewTab}
              />
              {/* <DownloadIcon onClick={handleDownloadImage}/> */}
              <img
                src={Download}
                onClick={handleDownloadImage}
                style={{ height: "20px", width: "27px" }}
                alt="My Image"
              />
            </div>
          </div>

          {/* <p className="edits" onClick={popuphandleEditClick}>Edit</p> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Kyctable;
