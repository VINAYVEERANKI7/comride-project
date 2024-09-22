import React, { useState, useRef } from "react";
import "./bookinghistorytablestyle.css";
import { Modal } from "react-bootstrap";
import eyeOn from "../../assets/icons/eye-on.svg";
import DownloadIcon from "../../assets/icons/download-icon";

function Kycdocmenttable({ onCancel }) {
  const [showModal, setShowModal] = useState(false);
  const [showsecondModal, setShowsecondModal] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [documentStatus, setDocumentStatus] = useState("");
  const [uploadVisible, setUploadVisible] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [popupEditMode, setPopupEditMode] = useState(false);

  const popuphandleEditClick = () => {
    setPopupEditMode(true);
  };

  const handleEditClick = () => {
    setShowModal(true);
    setDocumentStatus("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
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

  const handleSaveClick = () => {
    setDocumentStatus("Waiting for Approval");
  };

  const handleApproveClick = () => {
    setDocumentStatus("Approved");
    document.getElementById("approvalStatus").style.color = "#32f45f";
  };

  const toggleUploadButton = () => {
    setUploadVisible(!uploadVisible);
  };

  const handleDownloadImage = () => {
    if (downloadableImage) {
      const link = document.createElement("a");
      link.href = downloadableImage;
      link.setAttribute("download", "image.jpg");
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    }
  };

  const openImageInNewTab = () => {
    if (uploadedImage) {
      window.open(uploadedImage, "_blank");
    }
  };

  return (
    <div>
      <p>
        <u>Documents</u>
      </p>
      <div>
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

          <span
            className="edit"
            style={{ position: "absolute", right: "20px" }}
            onClick={toggleUploadButton}
          >
            Upload
          </span>
          <span
            className="edit"
            style={{ position: "absolute", right: "20px" }}
            onClick={handleEditClick}
          >
            Edit
          </span>
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

          <span
            className="edit"
            style={{ position: "absolute", right: "20px" }}
            onClick={toggleUploadButton}
          >
            Upload
          </span>

          <span
            className="edit"
            style={{ position: "absolute", right: "20px" }}
            onClick={handleEditClick}
          >
            Edit
          </span>
        </p>
        <div style={{ display: "flex", marginLeft: "69%" }}>
          <p className="reset">Reset</p>
          <p className="reject bg" onClick={onCancel}>
            Cancel
          </p>
          <p className="approve">Save</p>
        </div>
      </div>

      <div>
        <Modal
          style={{
            width: "500px",
            height: "400px",
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
                <DownloadIcon onClick={handleDownloadImage} />
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
                <DownloadIcon onClick={handleDownloadImage} />
              </div>
            </div>
            {popupEditMode ? (
              <div style={{ display: "flex", marginTop: "10px" }}>
                <p onClick={handleCloseModal} className="cancel">
                  Cancel
                </p>
                <p className="savepopup">Save</p>
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
            Proof Of Address(POA)
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
              <DownloadIcon onClick={handleDownloadImage} />
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
              <DownloadIcon onClick={handleDownloadImage} />
            </div>
          </div>

          {/* <p className="edits" onClick={popuphandleEditClick}>Edit</p> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Kycdocmenttable;
