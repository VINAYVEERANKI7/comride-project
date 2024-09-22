import React from "react";
import Modal from "react-bootstrap/Modal";
import NoButton from "../utilits/buttons/noButton";
import "./modal.css";
import YesNoLinkButton from "../utilits/buttons/yesButtonWithoutLink";

const ConfirmModal = ({
  title = "Are you sure you want to leave this page?",
  description = "Any changes made will be discarded.",
  title_color = "primary_color",
  okayFn,
  confirmShow,
  handleClose,
  subsection = false,
}) => {
  return (
    <>
      <Modal
        centered
        show={confirmShow}
        onHide={handleClose}
        dialogClassName="leave_modal_container"
        contentClassName="border_radius_10px"
        backdropClassName="create_password_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="d-flex justify-content-center   mt-3">
            <span className={`fs_20 ${title_color} fw_600 text-center`}>
              {title}
            </span>
          </div>
          {subsection ? (
            <div className="d-flex justify-content-center my-2 mb-4">
              <span className="text-center fw_400 fs_18 primary_color">
                {description}
              </span>
            </div>
          ) : null}
          <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
            <NoButton cancelFn={handleClose} />
            <YesNoLinkButton okay="Yes" okayFn={okayFn} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ConfirmModal;
