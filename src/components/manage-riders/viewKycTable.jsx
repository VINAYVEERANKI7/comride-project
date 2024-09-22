import React, { useState, useRef } from "react";
import "./bookinghistorytablestyle.css";
import { Modal } from "react-bootstrap";
import eyeOn from "../../assets/icons/eye-on.svg";

import Download from "./download.png";
import { saveAs } from "file-saver";

function ViewKycTable() {
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
  const [popupVisible, setPopupVisible] = useState(false);
  const imageUrl =
    "https://thumbs.dreamstime.com/b/colorful-flower-meadow-spring-ai-generated-jpg-colorful-flower-meadow-spring-270907794.jpg";

  const popuphandleEditClick = () => {
    setPopupEditMode(true);
  };

  const handleDownload = async () => {
    const fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleEditClick = () => {
    setShowModal(true);
    setDocumentStatus("");
    setEditMode(true);
    setOriginalFirstName(firstName);
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
    console.log("Uploaded image:", URL.createObjectURL(file));
  };

  const handleDownloadImage = (imageUrl) => {
    console.log("Downloading image:", imageUrl);

    if (imageUrl) {
      const link = document.createElement("a");

      link.href = imageUrl;

      link.setAttribute("download", "image.jpg");

      link.style.display = "none";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    }
  };

  const openImageInNewTab = () => {
    const imageURL =
      "https://thumbs.dreamstime.com/b/colorful-flower-meadow-spring-ai-generated-jpg-colorful-flower-meadow-spring-270907794.jpg";
    window.open(imageURL, "_blank");
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

                <img
                  src={Download}
                  onClick={handleDownload}
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
                <img
                  src={Download}
                  onClick={handleDownload}
                  style={{ height: "20px", width: "27px" }}
                  alt="My Image"
                />
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ViewKycTable;
