import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "../../modals/image-upload-modal";
import { premiumImageUploadAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";
import { Link } from "react-router-dom";

const Premium6SubPlanDetails = ({
  formik,
  isEditing,
  params,
  premiumSubactiveTab,
  handleplanDescriptionDeleteField,
  handleplanDescriptionAddField,
  handlerenewalDescriptionDeleteField,
  handlerenewalDescriptionAddField,
  setFrontImageLink,
  frontImageLink,
  subscriptData,
}) => {
  const action = params?.action;
  const [photoUrl, setPhotoUrl] = useState([]);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  console.log(frontImageLink, "Image");

  function handleNotificationImageChange(e) {
    // if (e.target?.files?.length !== 0) {
    //   setNotificationImage(URL.createObjectURL(e.target.files[0]));
    //   dispatch(
    //     uploadImageCouponAction(
    //       e.target.files[0],
    //       onUploadSuccess,
    //       onUploadError
    //     )
    //   );
    // }
    console.log("lala");
    if (e.target?.files.length !== 0) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setImageModalShow(true);
    }
  }

  console.log(formik, "formik");

  const showInputBox = formik.values.setupFeeRadio === "Yes";

  useEffect(() => {
    if (formik.values.setupFeeRadio === "No") {
      formik.setFieldValue("setupFeeAmount", "");
    }
  }, [formik.values.setupFeeRadio]);

  console.log(formik, "formikValuesss");

  const [activateAutoRenewal, setActivateAutoRenewal] = useState(false);
  const [planDescriptionImage, setPlanDescriptionImage] = useState(null);

  useEffect(() => {
    if (subscriptData) {
      setActivateAutoRenewal(
        subscriptData?.premium_6_plan_details?.activateAutoRenewal
      );
      setPlanDescriptionImage(subscriptData?.premium_6_plan_details?.planImage);
    }
  }, [subscriptData]);

  function activateAutoRenewalHandleChange(e) {
    const isChecked = e.target.checked;
    if (isChecked === true) {
      setActivateAutoRenewal(true);
      formik.setFieldValue("activateAutoRenewal", true);
    } else if (isChecked === false) {
      setActivateAutoRenewal(false);
      formik.setFieldValue("activateAutoRenewal", false);
    }
  }

  console.log(
    subscriptData,
    isEditing,
    "isEditing",
    action,
    planDescriptionImage
  );

  console.log(formik.errors);

  return (
    <>
      <div>
        <ImageUploadModal
          // updateAvatar={handlePendingAddressFileChange}
          dogImg={photoUrl}
          setPhotoUrl={setPhotoUrl}
          formik={formik}
          imageModalShow={imageModalShow}
          imageModalClose={() => setImageModalShow(false)}
          setUploadLoading={setUploadLoading}
          modalType={"premiumImageUpload"}
          setFrontImageLink={setFrontImageLink}
          field_name={"planImage"}
          imageAction2={premiumImageUploadAction}
        />
        <div>
          <span className="fs_16 fw_500 primary_color">Plan Details</span>
        </div>
        <div className="d-flex gx-0 ms-4 mb-4">
          <div className="col-xl-6">
            <div>
              <div className="d-flex mt-3">
                <div className="col-xl-3">
                  <label
                    className={`fs_14 ${
                      formik.touched.planName && formik.errors.planName
                        ? " red_color"
                        : ""
                    }`}
                  >
                    Plan Name
                  </label>
                </div>
                <div className="col-xl-6">
                  <input
                    className={`border_radius_7px p-1 outline_none fs_16 ms-3 ${
                      formik.touched.planName && formik.errors.planName
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "13rem" }}
                    id="planName"
                    name="planName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.planName}
                    disabled={!isEditing || action === "view"}
                  />
                  {formik.touched.planName && formik.errors.planName ? (
                    <div className="px-3 text-danger">
                      {formik.errors.planName}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <div className="col-xl-3">
                  <label className="fs_14">Plan Description Image</label>
                </div>
                <div className="col-xl-6 mx-3">
                  <label
                    className={
                      isEditing === true
                        ? `upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14`
                        : !isEditing ||
                          (action === "view" && planDescriptionImage != null)
                        ? `upload_btn px-2 white_color primary_bg border_radius_5px fs_14`
                        : `upload_btn px-2 light_grey_bg border_radius_5px fs_14`
                    }
                    htmlFor="planImage"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="planImage"
                      className="upload_document_input cursor_pointer"
                      name="planImage"
                      disabled={isEditing === false ? true : false}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setPlanDescriptionImage(e.target.value);
                        handleNotificationImageChange(e);
                      }}
                    />
                    {planDescriptionImage != null ? (
                      !isEditing || action === "view" ? (
                        <Link
                          style={{ textDecoration: "none" }}
                          className="text-white"
                          to={planDescriptionImage}
                        >
                          View
                        </Link>
                      ) : (
                        <span> Re-upload</span>
                      )
                    ) : (
                      <span className="mx-3"> Upload</span>
                    )}
                  </label>
                  {/* {uploadedStage2 ||
                formik.values.notification_image_stage2.length >= 1 ? (
                  <span> Re-upload</span>
                ) : (
                  <span> Upload</span>
                )} */}
                  {/* <span className="primary_color fs_14">Days</span> */}
                </div>
              </div>

              <div className="d-flex mt-2">
                <div className="col-3">
                  <div className="d-flex">
                    <label
                      className={` primary_color pt-3 fs_14 ${
                        formik.touched.planDescription &&
                        formik.errors.planDescription
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Plan Description in Driver Mobile App
                      <div className="secondary_color fs_14">
                        (max 5 points)
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-9">
                  {formik?.values?.planDescription?.map((field, index) => (
                    <>
                      <div
                        className="mt-3 d-flex align-items-center fs_14"
                        key={index}
                      >
                        <span>{index + 1 + "."}</span>
                        <input
                          style={{ width: "13rem" }}
                          type="text"
                          name={`planDescription[${index}]`}
                          value={field}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={
                            formik.touched.planDescription &&
                            formik.touched.planDescription[index] &&
                            formik.errors.planDescription?.[index]
                              ? "border_radius_7px error_border p-1 ms-1 outline_none fs_16 "
                              : !isEditing || action === "view"
                              ? "border_radius_7px disabled_bg_color  disabled_border p-1 ms-1 outline_none fs_16"
                              : "border_radius_7px primary_color primary_border p-1 ms-1 outline_none fs_16"
                          }
                          disabled={!isEditing || action === "view"}
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className={`fs_14 fw_500 border_radius ${
                              !isEditing || action === "view"
                                ? "disabled_color_bg white_color"
                                : "white_bg red_color error_border"
                            } px-1 ms-2`}
                            onClick={() =>
                              handleplanDescriptionDeleteField(index)
                            }
                            disabled={!isEditing || action === "view"}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <div className="ms-4">
                        {" "}
                        {formik.touched.planDescription?.[index] &&
                          formik.errors.planDescription?.[index] && (
                            <div className="red_color fs_14 mt-1">
                              {formik.errors.planDescription[index]}
                            </div>
                          )}
                      </div>
                    </>
                  ))}
                  <div className="mt-3 ms-3">
                    {formik?.values?.planDescription?.length < 5 && (
                      <button
                        type="button"
                        disabled={!isEditing || action === "view"}
                        className={`fs_14 ${
                          !isEditing || action === "view"
                            ? "disabled_color_bg"
                            : "blue_color_bg "
                        } white_color ms-1 border_radius  px-2  border_none`}
                        onClick={handleplanDescriptionAddField}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              className={`fs_14 ${
                formik.touched.activateAutoRenewal &&
                formik.errors.activateAutoRenewal
                  ? "red_color"
                  : ""
              }`}
            >
              Auto Renewal option available?
            </label>
            <div>
              <input
                type="checkbox"
                name="activateAutoRenewal"
                onChange={activateAutoRenewalHandleChange}
                disabled={!isEditing || action === "view"}
                checked={activateAutoRenewal}
              />
              <label
                className={`fs_14 ${
                  formik.touched.activateAutoRenewal &&
                  formik.errors.activateAutoRenewal
                    ? " red_color"
                    : ""
                }`}
              >
                Can a user activate Auto-Renewal on this plan?
              </label>
            </div>

            {activateAutoRenewal === true ? (
              <div>
                <div className="d-flex mt-3">
                  <div className="col-xl-4">
                    <label
                      className={`fs_14 ${
                        formik.touched.autoRenewalTitle &&
                        formik.errors.autoRenewalTitle
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Auto-Renewal Title
                    </label>
                  </div>
                  <div className="col-xl-6">
                    <input
                      className={`border_radius_7px p-1 outline_none fs_16 ms-3 ${
                        formik.touched.autoRenewalTitle &&
                        formik.errors.autoRenewalTitle
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "13rem" }}
                      id="autoRenewalTitle"
                      name="autoRenewalTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.autoRenewalTitle}
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.autoRenewalTitle &&
                    formik.errors.autoRenewalTitle ? (
                      <div className="px-3 text-danger">
                        {formik.errors.autoRenewalTitle}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-4">
                    <div className="d-flex">
                      <label
                        className={` primary_color pt-3 fs_14 ${
                          formik.touched.autoRenewalDescription &&
                          formik.errors.autoRenewalDescription
                            ? " red_color"
                            : ""
                        }`}
                      >
                        Auto-Renewal Description in Driver Mobile App
                        <div className="secondary_color fs_14">
                          (max 3 points)
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    {formik?.values?.autoRenewalDescription?.map(
                      (field, index) => (
                        <>
                          <div
                            className="mt-3 d-flex align-items-center fs_14"
                            key={index}
                          >
                            <span>{index + 1 + "."}</span>
                            <input
                              style={{ width: "13rem" }}
                              type="text"
                              name={`autoRenewalDescription[${index}]`}
                              value={field}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.autoRenewalDescription &&
                                formik.touched.autoRenewalDescription[index] &&
                                formik.errors.autoRenewalDescription?.[index]
                                  ? "border_radius_7px error_border p-1 ms-1 outline_none fs_16 "
                                  : !isEditing || action === "view"
                                  ? "border_radius_7px disabled_bg_color  disabled_border p-1 ms-1 outline_none fs_16"
                                  : "border_radius_7px primary_color primary_border p-1 ms-1 outline_none fs_16"
                              }
                              disabled={!isEditing || action === "view"}
                            />
                            {index > 0 && (
                              <button
                                type="button"
                                className={`fs_14 fw_500 border_radius ${
                                  !isEditing || action === "view"
                                    ? "disabled_color_bg white_color"
                                    : "white_bg red_color error_border"
                                } px-1 ms-2`}
                                onClick={() =>
                                  handlerenewalDescriptionDeleteField(index)
                                }
                                disabled={!isEditing || action === "view"}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="ms-4">
                            {" "}
                            {formik.touched.autoRenewalDescription?.[index] &&
                              formik.errors.autoRenewalDescription?.[index] && (
                                <div className="red_color fs_14 mt-1">
                                  {formik.errors.autoRenewalDescription[index]}
                                </div>
                              )}
                          </div>
                        </>
                      )
                    )}
                    <div className="mt-3 ms-3">
                      {formik?.values?.autoRenewalDescription?.length < 5 && (
                        <button
                          type="button"
                          disabled={!isEditing || action === "view"}
                          className={`fs_14 ${
                            !isEditing || action === "view"
                              ? "disabled_color_bg"
                              : "blue_color_bg "
                          } white_color ms-1 border_radius  px-2  border_none`}
                          onClick={handlerenewalDescriptionAddField}
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* <div className="col-xl-6">
            <div className="d-flex align-items-center mt-3">
              <div className="col-3">
                <label
                  className={`fs_14 ${formik.touched.planValue && formik.errors.planValue
                      ? "red_color"
                      : "primary_color"
                    }`}
                >
                  Plan Value
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none fs_16 ${formik.touched.planValue && formik.errors.planValue
                      ? "error_border"
                      : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                  style={{ width: "5rem" }}
                  id="planValue"
                  name="planValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planValue}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-3">
                <label className="primary_color fs_14">Setup Fee</label>
              </div>
              <div className="col-6">
                <span className="align-items-center">
                  <input
                    className="Yesradio"
                    type="radio"
                    id="planValueYes"
                    name="setupFeeRadio"
                    value="Yes"
                    checked={formik.values.setupFeeRadio === "Yes"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="planValueYes">
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="planValueNo"
                    name="setupFeeRadio"
                    value="No"
                    checked={formik.values.setupFeeRadio === "No"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="planValueNo">
                    No
                  </label>
                </span>
              </div>
            </div>
            {showInputBox && (
              <div className="d-flex align-items-center mt-3">
                <div className="col-3">
                  <label
                    className={`fs_14 ${formik.touched.setupFeeAmount &&
                        formik.errors.setupFeeAmount
                        ? " red_color"
                        : "primary_color"
                      }`}
                  >
                    Setup fee?
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px outline_none ${formik.touched.setupFeeAmount &&
                        formik.errors.setupFeeAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                    style={{ width: "9rem" }}
                    type="text"
                    id="setupFeeAmount"
                    name="setupFeeAmount"
                    value={formik.values.setupFeeAmount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={!isEditing || action === "view"}
                  />
                </div>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Premium6SubPlanDetails;
