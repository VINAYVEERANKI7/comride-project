import React from "react";
import SpinnerLoading from "../../utilits/spinnerLoading";

const EditReferralBtn = ({
  saveLaterBtn = () => {},
  saveViewBtn = () => {},
  resetBtn = () => {},
  is_editable,
  viewBtn = () => {},
  saveAndView = true,
  backBtn = () => {},
  backButton = false,
  ApproveButton = false,
  approveBtn = () => {},
  rejectBtn = () => {},
  viewBtnText = "",
  saveForLater = true,
  deleteBtnFn = () => {},
  DeleteButton = false,
  loading = false,
  saveAndViewText = "Save & View Broadcast",
  disableCheck = false,
}) => {
  console.log(disableCheck, "disableCheck");
  return (
    <>
      {is_editable === false ? (
        <div className="d-flex gap-4 justify-content-end mt-4">
          <button
            className="px-5 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
            type="button"
            onClick={viewBtn}
          >
            {viewBtnText}
          </button>
        </div>
      ) : (
        <>
          {/* <div className=" d-lg-block d-none"> */}
          <div className="d-flex gap-4 justify-content-end mt-4 text-nowrap">
            {backButton && (
              <button
                className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-1 align-item-center"
                type="button"
                onClick={backBtn}
              >
                <i className="ri-arrow-left-line primary_color fw_600" />
                Go Back
              </button>
            )}
            <button
              className="px-4 py-1 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
              type="button"
              onClick={resetBtn}
            >
              Reset
            </button>
            {saveForLater && (
              <button
                className="px-4 py-2 primary_border white_bg primary_color border_radius_3px fs_18 fw_500 d-flex gap-2 align-item-center"
                type="submit"
                onClick={saveLaterBtn}
                disabled={disableCheck || loading}
              >
                {loading ? <SpinnerLoading /> : "Save For Later"}
              </button>
            )}

            {saveAndView && (
              <button
                disabled={disableCheck || loading}
                className="px-3 py-2 primary_border primary_bg white_color border_radius_3px fs_18  d-flex gap-2 align-item-center"
                type="submit"
                onClick={saveViewBtn}
              >
                {loading ? <SpinnerLoading /> : saveAndViewText}
              </button>
            )}
            {ApproveButton && (
              <button
                disabled={disableCheck || loading}
                className="light_green_bg border_none border_radius_3px white_color fs_18 px-5"
                type="submit"
                onClick={approveBtn}
              >
                {loading ? <SpinnerLoading /> : "Approve"}
              </button>
            )}
            {ApproveButton && (
              <button
                disabled={disableCheck || loading}
                className="fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                type="button"
                onClick={rejectBtn}
              >
                Reject
              </button>
            )}
            {DeleteButton && (
              <button
                className="fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                type="button"
                onClick={deleteBtnFn}
              >
                Delete
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default EditReferralBtn;
