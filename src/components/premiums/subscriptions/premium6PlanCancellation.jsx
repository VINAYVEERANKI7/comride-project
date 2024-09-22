import React, { useState } from "react";

const Premium6PlanCancellation = ({
  formik,
  params,
  isEditing,
  subscriptData,
}) => {
  const action = params?.action;

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik.setFieldValue(
        "cancelled_plan_details.refundIssuedIfPlanCancel",
        true
      );
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik.setFieldValue(
        "cancelled_plan_details.refundIssuedIfPlanCancel",
        false
      );
    }
  }

  const [isDiscount, setIsDiscount] = useState(
    subscriptData?.premium_6_plan_cancellation?.refundIssuedIfPlanCancel
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
                    formik.touched.cancelled_plan_details?.driverPAfterCancel &&
                    formik.errors.cancelled_plan_details?.driverPAfterCancel
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
                    formik.touched.cancelled_plan_details?.driverPAfterCancel &&
                    formik.errors.cancelled_plan_details?.driverPAfterCancel
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="cancelled_plan_details.driverPAfterCancel"
                  name="cancelled_plan_details.driverPAfterCancel"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.cancelled_plan_details?.driverPAfterCancel
                  }
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.cancelled_plan_details?.driverPAfterCancel &&
                formik.errors.cancelled_plan_details?.driverPAfterCancel ? (
                  <div className="text-danger">
                    {formik.errors.cancelled_plan_details?.driverPAfterCancel}
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
                    formik.touched.cancelled_plan_details
                      ?.refundIssuedIfPlanCancel &&
                    formik.errors.cancelled_plan_details
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
                      name="cancelled_plan_details.refundIssuedIfPlanCancel"
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
                      name="cancelled_plan_details.refundIssuedIfPlanCancel"
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
                        formik.touched.cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund &&
                        formik.errors.cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="cancelled_plan_details.zeroRidesCompletedPercentageRefund"
                      name="cancelled_plan_details.zeroRidesCompletedPercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.cancelled_plan_details
                          ?.zeroRidesCompletedPercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.cancelled_plan_details
                      ?.zeroRidesCompletedPercentageRefund &&
                    formik.errors.cancelled_plan_details
                      ?.zeroRidesCompletedPercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="cancelled_plan_details.cancelledAfterOneRidePercentageRefund"
                      name="cancelled_plan_details.cancelledAfterOneRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.cancelled_plan_details
                          ?.cancelledAfterOneRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.cancelled_plan_details
                      ?.cancelledAfterOneRidePercentageRefund &&
                    formik.errors.cancelled_plan_details
                      ?.cancelledAfterOneRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="cancelled_plan_details.cancelledAfterTwoRidePercentageRefund"
                      name="cancelled_plan_details.cancelledAfterTwoRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.cancelled_plan_details
                          ?.cancelledAfterTwoRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.cancelled_plan_details
                      ?.cancelledAfterTwoRidePercentageRefund &&
                    formik.errors.cancelled_plan_details
                      ?.cancelledAfterTwoRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.cancelled_plan_details
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
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterTwoOrMoreRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
                          ?.cancelledAfterTwoOrMoreRidePercentageRefund
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Cancelled after {">"}2 rides (% refund)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.cancelled_plan_details
                          ?.cancelledAfterTwoOrMoreRidePercentageRefund &&
                        formik.errors.cancelled_plan_details
                          ?.cancelledAfterTwoOrMoreRidePercentageRefund
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="cancelled_plan_details.cancelledAfterTwoOrMoreRidePercentageRefund"
                      name="cancelled_plan_details.cancelledAfterTwoOrMoreRidePercentageRefund"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.cancelled_plan_details
                          ?.cancelledAfterTwoOrMoreRidePercentageRefund
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.cancelled_plan_details
                      ?.cancelledAfterTwoOrMoreRidePercentageRefund &&
                    formik.errors.cancelled_plan_details
                      ?.cancelledAfterTwoOrMoreRidePercentageRefund ? (
                      <div className="text-danger">
                        {
                          formik.errors.cancelled_plan_details
                            ?.cancelledAfterTwoOrMoreRidePercentageRefund
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

export default Premium6PlanCancellation;
