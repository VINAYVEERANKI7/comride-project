import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import ImageUploadModal from "../../modals/image-upload-modal";
import { premiumImageUploadAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";

const Premium6Plan3SubPlanDetails = ({
  formik,
  isEditing,
  params,
  premiumSubactiveTab,
  handleDeleteField,
  handleAddField,
  handleRenewalDeleteField,
  handleRenewalAddField,
  setFrontImageLink,
  frontImageLink,
}) => {
  const action = params?.action;

  const showInputBox = formik.values.setupFeeRadio === "Yes";

  useEffect(() => {
    if (formik.values.setupFeeRadio === "No") {
      formik.setFieldValue("setupFeeAmount", "");
    }
  }, [formik.values.setupFeeRadio]);

  console.log(formik, "formikValuesss");

  const [activateAutoRenewal, setActivateAutoRenewal] = useState(false);
  const [planDescriptionImage, setPlanDescriptionImage] = useState(null);
  const [photoUrl, setPhotoUrl] = useState([]);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  function handleNotificationImageChange(e) {
    console.log(e, "formik.values");
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

  function activateAutoRenewalHandleChange(e) {
    const isChecked = e.target.checked;
    if (isChecked === true) {
      setActivateAutoRenewal(true);
      formik.setFieldValue("plan3.activateAutoRenewal", true);
    } else if (isChecked === false) {
      setActivateAutoRenewal(false);
      formik.setFieldValue("plan3.activateAutoRenewal", false);
    }
  }

  console.log(formik.errors, "====================");

  return (
    <>
      <div>
        <ImageUploadModal
          dogImg={photoUrl}
          setPhotoUrl={setPhotoUrl}
          formik={formik}
          imageModalShow={imageModalShow}
          imageModalClose={() => setImageModalShow(false)}
          setUploadLoading={setUploadLoading}
          modalType={"premiumImageUpload"}
          setFrontImageLink={setFrontImageLink}
          field_name={"plan3.planImage"}
          imageAction2={premiumImageUploadAction}
        />
        <div>
          <span className="fs_16 fw_500 primary_color">Plan Details</span>
        </div>
        <div className="d-flex gx-0 ms-4 mb-4">
          <div className="col-xl-6">
            <div>
              <div className="d-flex align-items-center mt-3">
                <div className="col-xl-3">
                  <label
                    className={`fs_14 ${
                      formik.touched.plan3?.planName &&
                      formik.errors.plan3?.planName
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
                      formik.touched.plan3?.planName &&
                      formik.errors.plan3?.planName
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "13rem" }}
                    id="plan3.planName"
                    name="plan3.planName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.plan3?.planName}
                    disabled={!isEditing || action === "view"}
                  />
                  {formik.touched.plan3?.planName &&
                  formik.errors.plan3?.planName ? (
                    <div className="px-3 text-danger">
                      {formik.errors.plan3?.planName}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="d-flex align-items-center mt-2">
                <div className="col-3">
                  <label className="fs_14">Plan Description Image</label>
                </div>
                <div className="col-6">
                  <label
                    className={
                      isEditing === true
                        ? `upload_btn px-2 white_color dark_blue_bg border_radius_5px fs_14 ms-3`
                        : !isEditing &&
                          action === "view" &&
                          planDescriptionImage != null
                        ? `upload_btn px-2 white_color primary_bg border_radius_5px fs_14 ms-3`
                        : `upload_btn px-2 light_grey_bg border_radius_5px fs_14 ms-3`
                    }
                    htmlFor="plan3.planImage"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      id="plan3.planImage"
                      className="upload_document_input cursor_pointer"
                      name="plan3.planImage"
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
                </div>
              </div>

              <div className="d-flex mt-2">
                <div className="col-3">
                  <div className="d-flex">
                    <label
                      className={` primary_color pt-3 fs_14 ${
                        formik.touched.plan3?.planDescription &&
                        formik.errors.plan3?.planDescription
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
                  {formik?.values?.plan3?.planDescription.map(
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
                            name={`plan3.planDescription[${index}]`}
                            value={field}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={
                              formik.touched.plan3?.planDescription &&
                              formik.touched.plan3?.planDescription[index] &&
                              formik.errors.plan3?.planDescription?.[index]
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
                              onClick={() => handleDeleteField(index)}
                              disabled={!isEditing || action === "view"}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div className="ms-4">
                          {" "}
                          {formik.touched.plan3?.planDescription?.[index] &&
                            formik.errors.plan3?.planDescription?.[index] && (
                              <div className="red_color fs_14 mt-1">
                                {formik.errors.plan3?.planDescription[index]}
                              </div>
                            )}
                        </div>
                      </>
                    )
                  )}
                  <div className="mt-3 ms-3">
                    {formik.values.plan3?.planDescription?.length < 5 && (
                      <button
                        type="button"
                        disabled={!isEditing || action === "view"}
                        className={`fs_14 ${
                          !isEditing || action === "view"
                            ? "disabled_color_bg"
                            : "blue_color_bg "
                        } white_color ms-1 border_radius  px-2  border_none`}
                        onClick={handleAddField}
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
                formik.touched.plan3?.activateAutoRenewal &&
                formik.errors.plan3?.activateAutoRenewal
                  ? "red_color"
                  : ""
              }`}
            >
              Auto Renewal option available?
            </label>
            <div>
              <input
                type="checkbox"
                name="autoRenewal"
                onChange={activateAutoRenewalHandleChange}
                disabled={!isEditing || action === "view"}
              />
              <label
                className={`fs_14 ${
                  formik.touched.plan3?.activateAutoRenewal &&
                  formik.errors.plan3?.activateAutoRenewal
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
                  <div className="col-xl-5">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3?.autoRenewalTitle &&
                        formik.errors.plan3?.autoRenewalTitle
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
                        formik.touched.plan3?.autoRenewalTitle &&
                        formik.errors.plan3?.autoRenewalTitle
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "13rem" }}
                      id="plan3.autoRenewalTitle"
                      name="plan3.autoRenewalTitle"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.plan3?.autoRenewalTitle}
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3?.autoRenewalTitle &&
                    formik.errors.plan3?.autoRenewalTitle ? (
                      <div className="px-3 text-danger">
                        {formik.errors.plan3?.autoRenewalTitle}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-5">
                    <div className="d-flex">
                      <label
                        className={` primary_color pt-3 fs_14 ${
                          formik.touched.plan3?.autoRenewalDescription &&
                          formik.errors.plan3?.autoRenewalDescription
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
                    {formik.values.plan3?.autoRenewalDescription.map(
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
                              name={`plan3.autoRenewalDescription[${index}]`}
                              value={field}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              className={
                                formik.touched.plan3?.autoRenewalDescription &&
                                formik.touched.plan3?.autoRenewalDescription[
                                  index
                                ] &&
                                formik.errors.plan3?.autoRenewalDescription?.[
                                  index
                                ]
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
                                onClick={() => handleRenewalDeleteField(index)}
                                disabled={!isEditing || action === "view"}
                              >
                                Delete
                              </button>
                            )}
                          </div>
                          <div className="ms-4">
                            {" "}
                            {formik.touched.plan3?.autoRenewalDescription?.[
                              index
                            ] &&
                              formik.errors.plan3?.autoRenewalDescription?.[
                                index
                              ] && (
                                <div className="red_color fs_14 mt-1">
                                  {
                                    formik.errors.plan3?.autoRenewalDescription[
                                      index
                                    ]
                                  }
                                </div>
                              )}
                          </div>
                        </>
                      )
                    )}
                    <div className="mt-3 ms-3">
                      {formik.values.plan3?.autoRenewalDescription?.length <
                        5 && (
                        <button
                          type="button"
                          disabled={!isEditing || action === "view"}
                          className={`fs_14 ${
                            !isEditing || action === "view"
                              ? "disabled_color_bg"
                              : "blue_color_bg "
                          } white_color ms-1 border_radius  px-2  border_none`}
                          onClick={handleRenewalAddField}
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
        </div>
      </div>
    </>
  );
};

export default Premium6Plan3SubPlanDetails;