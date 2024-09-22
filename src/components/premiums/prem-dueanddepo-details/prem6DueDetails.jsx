import React, { useEffect } from "react";
import { useState } from "react";
import "../premium.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";
import DetailsPremiumPasswordModal from "../detailsPasswordModal";
import CloseIcon from "../../../assets/icons/close-icon";
import Premium6DuesDetailsPasswdModal from "../subscriptions/premium6DuesDetailsPasswdModal";

const Prem6DuesDetails = ({
  action,
  premiumtype,
  defaultDuedepositData,
  params,
  setReload,
  reload,
  managePremiumType,
  setIsDisable,
  isDisable,
}) => {
  console.log(params, "hiubin");
  const dueData = defaultDuedepositData?.due_details;

  const [isEditing, setIsEditing] = useState(false);
  const [detailsPremiumPasswordModal, setDetailsPremiumPasswordModal] =
    useState(false);
  const handleDetailsPremiumPWClose = () => {
    setDetailsPremiumPasswordModal(false);
  };
  const handleDetailsPremiumPasswordModal = () =>
    setDetailsPremiumPasswordModal(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // CBamount1: dueData?.CBDueAmount1 ?? "",
      // CBThreshold: dueData?.CBDueAmount1Threshold ?? "",
      // CBamount2: dueData?.CBDueAmount2 ?? "",

      due_details: {
        CBDueAmount: dueData?.CBDueAmount ?? "",
        DisableRidesIfCBNegative: dueData?.DisableRidesIfCBNegative ?? false,
        CBBalanceAmount: dueData?.CBBalanceAmount ?? "",
        NumberOfDays: dueData?.NumberOfDays ?? "",
      },
    },
    validationSchema: Yup.object().shape({
      // CBDueAmount: Yup.string().required("please complete all the fields"),
      // CBThreshold: Yup.string().required(
      //   "current balance threshold is required"
      // ),
      // CBamount2: Yup.string().required("current balance amount2 is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleDetailsPremiumPasswordModal();
      setIsEditing(false);
    },
  });
  console.log(formik.values, "dues");

  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  const handleEdit = () => {
    setIsEditing(true);
    setIsDisable(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
    setIsDisable(false);
  };
  console.log(formik.values, "data");

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setCashOutRequest(true);
      formik.setFieldValue("due_details.DisableRidesIfCBNegative", true);
    } else if (isChecked && value === "no") {
      setCashOutRequest(false);
      formik.setFieldValue("due_details.DisableRidesIfCBNegative", false);
    }
  }

  const [cashOutRequest, setCashOutRequest] = useState(
    dueData?.DisableRidesIfCBNegative ?? false
  );

  return (
    <>
      <Premium6DuesDetailsPasswdModal
        detailsPremiumPasswordModal={detailsPremiumPasswordModal}
        handleDetailsPremiumPWClose={handleDetailsPremiumPWClose}
        title={"Are you sure you want to Update"}
        setIsEditing={setIsEditing}
        params={params}
        formik={formik}
        type="Dues"
        setReload={setReload}
        reload={reload}
        premiumtype={premiumtype}
        managePremiumType={managePremiumType}
      />
      <div className="py-5 mt-3">
        <div className=" d-flex justify-content-between pe-4">
          <div className="fs_16 fw_500 primary_color">Dues Details</div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="ps-3 mt-3 fs_14 primary_color">
            <div className="d-flex align-items-center">
              <div className="col-3">
                <label
                  className={`${
                    formik.touched.due_details?.CBDueAmount &&
                    formik.errors.due_details?.CBDueAmount
                      ? " red_color"
                      : ""
                  }`}
                >
                  Current Balance Due Amount -1 (₹)
                </label>
              </div>
              <div className="col-3">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.due_details?.CBDueAmount &&
                    formik.errors.due_details?.CBDueAmount
                      ? " border-red"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "13rem" }}
                  disabled={!isEditing || action === "view"}
                  id="due_details.CBDueAmount"
                  name="due_details.CBDueAmount"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.due_details?.CBDueAmount}
                />
              </div>
            </div>

            <div className="d-flex align-items-center my-4">
              <div className="col-3">
                Do you want to disable rides, if the Current Balance is {"<="}{" "}
                'n' amount for more than 'm' consecutive days?
              </div>
              <div className="col-3">
                <div className="d-flex gap-5 align-items-center">
                  <div className="d-flex ps-2 gap-2">
                    <label>Yes</label>
                    <input
                      type="radio"
                      id="yes"
                      name="due_details.DisableRidesIfCBNegative"
                      value="yes"
                      onChange={handleCheckbox}
                      className="Yesradio"
                      checked={cashOutRequest}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                  <div className="d-flex ps-2 gap-2">
                    <label>No</label>
                    <input
                      type="radio"
                      id="no"
                      name="due_details.DisableRidesIfCBNegative"
                      value="no"
                      onChange={handleCheckbox}
                      className="Noradio"
                      checked={!cashOutRequest}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
              </div>
            </div>
            {cashOutRequest === true ? (
              <>
                <div className="d-flex align-items-center py-2">
                  <div className="col-3">
                    <label
                      className={` amountthreshold ${
                        formik.touched.due_details?.CBBalanceAmount &&
                        formik.errors.due_details?.CBBalanceAmount
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Current balance amount (n)
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.due_details?.CBBalanceAmount &&
                        formik.errors.due_details?.CBBalanceAmount
                          ? " border-red"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="due_details.CBBalanceAmount"
                      name="due_details.CBBalanceAmount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.due_details?.CBBalanceAmount}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="col-3">
                    <label
                      className={`${
                        formik.touched.due_details?.NumberOfDays &&
                        formik.errors.due_details?.NumberOfDays
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Number of days (m)
                    </label>
                  </div>
                  <div className="col-3">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.due_details?.NumberOfDays &&
                        formik.errors.due_details?.NumberOfDays
                          ? " border-red"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "13rem" }}
                      disabled={!isEditing || action === "view"}
                      id="due_details.NumberOfDays"
                      name="due_details.NumberOfDays"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.due_details?.NumberOfDays}
                    />
                  </div>
                </div>
                <div className="col-8 d-flex justify-content-center mt-2">
                  {firstErrorField && (
                    <div className="red_color fs_13 fw_400 ps-3">
                      {formik.errors[firstErrorField]}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </form>

        {action === "view" ? null : (
          <>
            {!isEditing ? (
              <button
                className={`${
                  isDisable === true ? "disabled_color_bg" : "primary_bg"
                } border-0  white_color px-3 fs_15 border_radius_5px`}
                onClick={handleEdit}
                disabled={isDisable === true}
              >
                Edit
              </button>
            ) : (
              <>
                <div className=" d-flex justify-content-end mt-5 me-5 gap-5">
                  <button
                    className=" fs_14 reset_btn border_radius white_bg red_color text-center d-flex align-items-center px-4 py-1 reset_btn"
                    onClick={handleCancel}
                  >
                    <CloseIcon
                      fill="white"
                      height={16}
                      width={16}
                      className={`  rounded-5 p-1 mx-1 red_bg`}
                    />
                    Cancel
                  </button>
                  <button
                    className="fs_14 cancel_btn border_radius white_bg primary_color px-5 "
                    type="reset"
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    Reset
                  </button>
                  <button
                    className="fs_14 save_Btn dark_green_bg border_radius  px-5 white_color border_none"
                    type="submit"
                    onClick={formik.handleSubmit}
                  >
                    Update
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Prem6DuesDetails;
