import React, { useState } from "react";

const Premium6Plan3Cancellation = ({ formik, params, isEditing }) => {
  const action = params?.action;

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik.setFieldValue(
        "plan3_cancelled_plan_details.refundIssuedIfPlanCancel",
        true
      );
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik.setFieldValue(
        "plan3_cancelled_plan_details.refundIssuedIfPlanCancel",
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
          <span className=" primary_color fs_16 fw_500">Plan Cancellation</span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="col-xl-6">
            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_cancelled_plan_details
                      ?.driverPAfterCancel &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.driverPAfterCancel
                      ? " red_color"
                      : ""
                  }`}
                >
                  Defalut for the driver premium after this plan cancellation
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.plan3_cancelled_plan_details
                      ?.driverPAfterCancel &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.driverPAfterCancel
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_cancelled_plan_details.driverPAfterCancel"
                  name="plan3_cancelled_plan_details.driverPAfterCancel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.plan3_cancelled_plan_details
                      ?.driverPAfterCancel
                  }
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.plan3_cancelled_plan_details
                  ?.driverPAfterCancel &&
                formik.errors.plan3_cancelled_plan_details
                  ?.driverPAfterCancel ? (
                  <div className="text-danger">
                    {
                      formik.errors.plan3_cancelled_plan_details
                        ?.driverPAfterCancel
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
                    formik.touched.plan3_cancelled_plan_details
                      ?.refundIssuedIfPlanCancel &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.refundIssuedIfPlanCancel
                      ? " red_color"
                      : ""
                  }`}
                >
                  Are refunds issued if the plan is cancelled?
                </label>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="radio"
                      id="yes"
                      name="plan3_cancelled_plan_details.refundIssuedIfPlanCancel"
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
                      name="plan3_cancelled_plan_details.refundIssuedIfPlanCancel"
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_cancelled_plan_details.zeroRidesCompletedPercentageRefund"
                      name="plan3_cancelled_plan_details.zeroRidesCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_cancelled_plan_details
                      ?.zeroRidesCompletedPercentageRefund &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.zeroRidesCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_cancelled_plan_details
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Cancelled after 1 ride (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_cancelled_plan_details.cancelledAfterOneRidePercentageRefund"
                      name="plan3_cancelled_plan_details.cancelledAfterOneRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_cancelled_plan_details
                      ?.cancelledAfterOneRidePercentageRefund &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.cancelledAfterOneRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_cancelled_plan_details
                            ?.cancelledAfterOneRidePercentageRefund
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Cancelled after 2 rides (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_cancelled_plan_details.cancelledAfterTwoRidePercentageRefund"
                      name="plan3_cancelled_plan_details.cancelledAfterTwoRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_cancelled_plan_details
                      ?.cancelledAfterTwoRidePercentageRefund &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.cancelledAfterTwoRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_cancelled_plan_details
                            ?.cancelledAfterTwoRidePercentageRefund
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterThreeRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterThreeRidePercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Cancelled after 3 rides (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterThreeRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterThreeRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_cancelled_plan_details.cancelledAfterThreeRidePercentageRefund"
                      name="plan3_cancelled_plan_details.cancelledAfterThreeRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_cancelled_plan_details
                          ?.cancelledAfterThreeRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_cancelled_plan_details
                      ?.cancelledAfterThreeRidePercentageRefund &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.cancelledAfterThreeRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_cancelled_plan_details
                            ?.cancelledAfterThreeRidePercentageRefund
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
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterThreerOrMoreRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterThreerOrMoreRidePercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Cancelled after {">"}3 rides (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.plan3_cancelled_plan_details
                          ?.cancelledAfterThreerOrMoreRidePercentageRefund &&
                        formik.errors.plan3_cancelled_plan_details
                          ?.cancelledAfterThreerOrMoreRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_cancelled_plan_details.cancelledAfterThreerOrMoreRidePercentageRefund"
                      name="plan3_cancelled_plan_details.cancelledAfterThreerOrMoreRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_cancelled_plan_details
                          ?.cancelledAfterThreerOrMoreRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_cancelled_plan_details
                      ?.cancelledAfterThreerOrMoreRidePercentageRefund &&
                    formik.errors.plan3_cancelled_plan_details
                      ?.cancelledAfterThreerOrMoreRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_cancelled_plan_details
                            ?.cancelledAfterThreerOrMoreRidePercentageRefund
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

export default Premium6Plan3Cancellation;
