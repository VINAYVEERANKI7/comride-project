import React from "react";
import Modal from "react-bootstrap/Modal";
import NoButton from "../utilits/buttons/noButton";
import YesButton from "../utilits/buttons/yesButton";
import "./modal.css";
import YesNoLinkButton from "../utilits/buttons/yesButtonWithoutLink";

const PremiumLeavePlanModal = ({
  link,
  leavePageShow,
  handleLeavePageClose,
  title = "Are you sure you want to leave this page?",
  description = "Any changes made will be discarded.",
  subsection = false,
  title_color = "primary_color",
  onClickFn,
}) => {
  return (
    <>
      <Modal
        centered
        show={leavePageShow}
        onHide={handleLeavePageClose}
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
            <div className="d-flex justify-content-center mt-4">
              <span className="text-center fw_400 fs_18 primary_color">
                {description}
              </span>
            </div>
          ) : null}
          <div className="d-flex justify-content-center gap-3 align-items-center mt-2">
            <NoButton cancelFn={handleLeavePageClose} />
            <div className="d-flex justify-content-center">
              <button
                className="UpdatePricingSuccessOkay_btn  primary_bg border_radius_5px px-4 py-1 mt-2 mb-2 border_none"
                onClick={onClickFn}
                type="button"
              >
                <span className=" fs_18 white_color fw_500 px-4">Yes</span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PremiumLeavePlanModal;
