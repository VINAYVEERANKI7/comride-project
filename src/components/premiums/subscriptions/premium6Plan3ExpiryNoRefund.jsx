import React, { useState } from "react";

const Premium6Plan3ExpiryNoRideRefund = ({ formik, params, isEditing }) => {
  const action = params?.action;

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik.setFieldValue(
        "plan3_expired_plan_details.doesDriverGetRefundIfNoRideOrCompletedSome",
        true
      );
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik.setFieldValue(
        "plan3_expired_plan_details.doesDriverGetRefundIfNoRideOrCompletedSome",
        false
      );
    }
  }

  const [isDiscount, setIsDiscount] = useState(
    // depositeData?.CODriverRequest === true ? true : false
    false
  );
  function handleCheckboxBookingLimit(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsBookingLimit(true);
    } else if (isChecked && value === "no") {
      setIsBookingLimit(false);
    }
  }

  const [isBookingLimit, setIsBookingLimit] = useState(
    // depositeData?.CODriverRequest === true ? true : false
    false
  );
  function handleCheckboxInitialBookingfree(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsInitialBookingfree(true);
    } else if (isChecked && value === "no") {
      setIsInitialBookingfree(false);
    }
  }

  const [isInitialBookingfree, setIsInitialBookingfree] = useState(
    // depositeData?.CODriverRequest === true ? true : false
    false
  );

  return (
    <>
      <div>
        <div>
          <span className=" primary_color fs_16 fw_500">
            Expiry and No-Ride refund
          </span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="col-xl-6">
            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_expired_plan_details
                      ?.driverPAfterExpiry &&
                    formik.errors.plan3_expired_plan_details?.driverPAfterExpiry
                      ? " red_color"
                      : ""
                  }`}
                >
                  Defalut for the driver premium after this plan expiry
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.plan3_expired_plan_details
                      ?.driverPAfterExpiry &&
                    formik.errors.plan3_expired_plan_details?.driverPAfterExpiry
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_expired_plan_details.driverPAfterExpiry"
                  name="plan3_expired_plan_details.driverPAfterExpiry"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.plan3_expired_plan_details?.driverPAfterExpiry
                  }
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.plan3_expired_plan_details
                  ?.driverPAfterExpiry &&
                formik.errors.plan3_expired_plan_details?.driverPAfterExpiry ? (
                  <div className="text-danger">
                    {
                      formik.errors.plan3_expired_plan_details
                        ?.driverPAfterExpiry
                    }
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_expired_plan_details
                      ?.doesDriverGetRefundIfNoRideOrCompletedSome &&
                    formik.errors.plan3_expired_plan_details
                      ?.doesDriverGetRefundIfNoRideOrCompletedSome
                      ? " red_color"
                      : ""
                  }`}
                >
                  Does driver get refund if no rides or few rides completed
                  within the validity?
                </label>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="radio"
                      id="yes"
                      name="plan3_expired_plan_details.doesDriverGetRefundIfNoRideOrCompletedSome"
                      value="yes"
                      onChange={handleCheckbox}
                      className="Yesradio"
                      checked={isDiscount}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    Yes
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="no"
                      name="plan3_expired_plan_details.doesDriverGetRefundIfNoRideOrCompletedSome"
                      value="no"
                      onChange={handleCheckbox}
                      className="Noradio"
                      checked={!isDiscount}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    No
                  </div>
                </div>
              </div>
            </div>

            {isDiscount === true ? (
              <>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3_expired_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Zero rides completed (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_expired_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_expired_plan_details.zeroRidesCompletedPercentageRefund"
                      name="plan3_expired_plan_details.zeroRidesCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_expired_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_expired_plan_details
                      ?.zeroRidesCompletedPercentageRefund &&
                    formik.errors.plan3_expired_plan_details
                      ?.zeroRidesCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_expired_plan_details
                            ?.zeroRidesCompletedPercentageRefund
                        }
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3_expired_plan_details
                          ?.oneRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.oneRideCompletedPercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      1 ride completed (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_expired_plan_details
                          ?.oneRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.oneRideCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_expired_plan_details.oneRideCompletedPercentageRefund"
                      name="plan3_expired_plan_details.oneRideCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_expired_plan_details
                          ?.oneRideCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_expired_plan_details
                      ?.oneRideCompletedPercentageRefund &&
                    formik.errors.plan3_expired_plan_details
                      ?.oneRideCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_expired_plan_details
                            ?.oneRideCompletedPercentageRefund
                        }
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3_expired_plan_details
                          ?.twoRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.twoRideCompletedPercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      2 rides completed (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_expired_plan_details
                          ?.twoRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.twoRideCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_expired_plan_details.twoRideCompletedPercentageRefund"
                      name="plan3_expired_plan_details.twoRideCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_expired_plan_details
                          ?.twoRideCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_expired_plan_details
                      ?.twoRideCompletedPercentageRefund &&
                    formik.errors.plan3_expired_plan_details
                      ?.twoRideCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_expired_plan_details
                            ?.twoRideCompletedPercentageRefund
                        }
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3_expired_plan_details
                          ?.threeRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.threeRideCompletedPercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      3 rides completed (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_expired_plan_details
                          ?.threeRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.threeRideCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_expired_plan_details.threeRideCompletedPercentageRefund"
                      name="plan3_expired_plan_details.threeRideCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_expired_plan_details
                          ?.threeRideCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_expired_plan_details
                      ?.threeRideCompletedPercentageRefund &&
                    formik.errors.plan3_expired_plan_details
                      ?.threeRideCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_expired_plan_details
                            ?.threeRideCompletedPercentageRefund
                        }
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.plan3_expired_plan_details
                          ?.moreThenThreeRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.moreThenThreeRideCompletedPercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      More than 3 rides completed (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_expired_plan_details
                          ?.moreThenThreeRideCompletedPercentageRefund &&
                        formik.errors.plan3_expired_plan_details
                          ?.moreThenThreeRideCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_expired_plan_details.moreThenThreeRideCompletedPercentageRefund"
                      name="plan3_expired_plan_details.moreThenThreeRideCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_expired_plan_details
                          ?.moreThenThreeRideCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_expired_plan_details
                      ?.moreThenThreeRideCompletedPercentageRefund &&
                    formik.errors.plan3_expired_plan_details
                      ?.moreThenThreeRideCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_expired_plan_details
                            ?.moreThenThreeRideCompletedPercentageRefund
                        }
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Premium6Plan3ExpiryNoRideRefund;
