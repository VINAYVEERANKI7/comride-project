import React, { useEffect, useState } from "react";
import { socket } from "../../../redux/config";

const Premium6CreditMode = ({
  formik,
  params,
  isEditing,
  subscriptData,
  premiumSubactiveTab,
}) => {
  const action = params?.action;

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik.setFieldValue("isThereDiscount", true);
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik.setFieldValue("isThereDiscount", false);
    }
  }

  const [isDiscount, setIsDiscount] = useState(
    subscriptData?.premium_6_credit_mode?.isThereDiscount ?? null
  );
  function handleCheckboxBookingLimit(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsBookingLimit(true);
      formik.setFieldValue("isThereLimitOnBookingToCharge", true);
    } else if (isChecked && value === "no") {
      setIsBookingLimit(false);
      formik.setFieldValue("isThereLimitOnBookingToCharge", false);
    }
  }

  const [isBookingLimit, setIsBookingLimit] = useState(
    subscriptData?.premium_6_auto_pay?.isThereLimitOnBookingToCharge ?? null
  );
  function handleCheckboxInitialBookingfree(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsInitialBookingfree(true);
      formik.setFieldValue("anyBookingInitialFree", true);
    } else if (isChecked && value === "no") {
      setIsInitialBookingfree(false);
      formik.setFieldValue("anyBookingInitialFree", false);
    }
  }

  const [isInitialBookingfree, setIsInitialBookingfree] = useState(
    subscriptData?.premium_6_auto_pay?.anyBookingInitialFree ?? null
  );

  useEffect(() => {
    if (subscriptData) {
      setIsInitialBookingfree(
        subscriptData?.premium_6_auto_pay?.anyBookingInitialFree
      );
      setIsBookingLimit(
        subscriptData?.premium_6_auto_pay?.isThereLimitOnBookingToCharge
      );
      setIsDiscount(subscriptData?.premium_6_credit_mode?.isThereDiscount);
    }
  }, [subscriptData]);

  console.log(formik?.values, "formik.values");

  useEffect(() => {
    const data = {
      adminId: localStorage.getItem("id"),
      is_there_discount: formik?.values?.isThereDiscount,
      plan_value: formik?.values?.planValue,
      discount: formik?.values?.discountPercentage,
      discount_tax: formik?.values?.tax,
      type: "credit_mode",
    };
    console.log(formik.values.isThereDiscount, "formik.values");
    const withoutDiscountData = {
      adminId: localStorage.getItem("id"),
      is_there_discount: false,
      plan_value: formik?.values?.planValue,
      tax: formik?.values?.tax,
      type: "credit_mode",
    };

    if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.isThereDiscount == true
    ) {
      if (
        formik?.values?.planValue != null &&
        formik?.values?.discountPercentage != null &&
        formik?.values?.tax != null &&
        formik?.values?.tax != ""
      ) {
        console.log("Enter", data, "formik.values");
        socket.emit("fetch_premium_calculation_data", data);
      }
    } else if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.isThereDiscount == false
    ) {
      if (
        formik?.values?.planValue != null &&
        formik?.values?.tax != null &&
        formik?.values?.tax != ""
      ) {
        console.log("Enter", withoutDiscountData, "formik.values");
        socket.emit("fetch_premium_calculation_data", withoutDiscountData);
      }
    }
  }, [
    formik?.values?.planValue,
    formik?.values?.tax,
    formik?.values?.discountPercentage,
    formik?.values?.isThereDiscount,
  ]);

  useEffect(() => {
    if (formik?.values?.isThereDiscount == true) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "credit_mode") {
          formik.setFieldValue("discountAmount", data?.data?.dicountAmount);
          formik.setFieldValue(
            "discountedTotalValueTaxAmount",
            data?.data?.discountTotalPlanValueTaxAmount
          );
          formik.setFieldValue("totalPlanValue", data?.data?.TotalPlanValue);
          formik.setFieldValue(
            "discountedTotalPlanValue",
            data?.data?.DiscountTotalPlanValue
          );
        }
      });
    } else if (formik?.values?.isThereDiscount == false) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "credit_mode") {
          formik.setFieldValue("totalPlanValue", data?.data?.TotalPlanValue);
          formik.setFieldValue(
            "totalPlanValueTaxAmount",
            data?.data?.TotalPlanValueTaxAmount
          );
        }
      });
    }
  }, [
    socket,
    formik?.values?.planValue,
    formik?.values?.tax,
    formik?.values?.discountPercentage,
    formik?.values?.isThereDiscount,
  ]);
  console.log(formik.errors);

  return (
    <>
      <div>
        <div>
          <span className=" primary_color fs_16 fw_500">Credit Mode</span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="">
            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.planValue && formik.errors.planValue
                      ? " red_color"
                      : ""
                  }`}
                >
                  Plan Value (₹)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.planValue && formik.errors.planValue
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
                />{" "}
                /booking
                {formik.touched.planValue && formik.errors.planValue ? (
                  <div className="text-danger">{formik.errors.planValue}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.isThereDiscount &&
                    formik.errors.isThereDiscount
                      ? " red_color"
                      : ""
                  }`}
                >
                  {/* 1st reminder through Message (Days) */}
                  Is there a discount?
                </label>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="radio"
                      id="yes"
                      name="isThereDiscount"
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
                      name="answer"
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
                        formik.touched.discountPercentage &&
                        formik.errors.discountPercentage
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Discount (%)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.discountPercentage &&
                        formik.errors.discountPercentage
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="discountPercentage"
                      name="discountPercentage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.discountPercentage}
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.discountPercentage &&
                    formik.errors.discountPercentage ? (
                      <div className="text-danger">
                        {formik.errors.discountPercentage}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.discountAmount &&
                        formik.errors.discountAmount
                          ? " red_color"
                          : ""
                      }`}
                    >
                      Discount Amount (₹)
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.discountAmount &&
                        formik.errors.discountAmount
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="discountAmount"
                      name="discountAmount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.discountAmount}
                      disabled={true}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="d-flex mt-2">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.tax && formik.errors.tax ? " red_color" : ""
                  }`}
                >
                  Tax (%)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.tax && formik.errors.tax
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="tax"
                  name="tax"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tax}
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.tax && formik.errors.tax ? (
                  <div className="text-danger">{formik.errors.tax}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {isDiscount ? (
              <div className="d-flex align-items-center mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.discountedTotalValueTaxAmount &&
                      formik.errors.discountedTotalValueTaxAmount
                        ? " red_color"
                        : ""
                    }`}
                  >
                    Discounted Total Plan Value Tax Amount (₹)
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px p-1 outline_none ${
                      formik.touched.discountedTotalValueTaxAmount &&
                      formik.errors.discountedTotalValueTaxAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="discountedTotalValueTaxAmount"
                    name="discountedTotalValueTaxAmount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discountedTotalValueTaxAmount}
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            {isDiscount != true ? (
              <div className="d-flex align-items-center mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.totalPlanValueTaxAmount &&
                      formik.errors.totalPlanValueTaxAmount
                        ? " red_color"
                        : ""
                    }`}
                  >
                    Total Plan Value Tax Amount(₹)
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px p-1 outline_none ${
                      formik.touched.totalPlanValueTaxAmount &&
                      formik.errors.totalPlanValueTaxAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="totalPlanValueTaxAmount"
                    name="totalPlanValueTaxAmount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.totalPlanValueTaxAmount}
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex align-items-center mt-2">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.totalPlanValue &&
                    formik.errors.totalPlanValue
                      ? " red_color"
                      : ""
                  }`}
                >
                  Total Plan Value (₹)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.totalPlanValue &&
                    formik.errors.totalPlanValue
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="totalPlanValueCreditMode"
                  name="totalPlanValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.totalPlanValue}
                  disabled={true}
                />
              </div>
            </div>

            {isDiscount ? (
              <div className="d-flex align-items-center mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.discountedTotalPlanValue &&
                      formik.errors.discountedTotalPlanValue
                        ? " red_color"
                        : ""
                    }`}
                  >
                    Discounted Total Plan Value (₹)
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px p-1 outline_none ${
                      formik.touched.discountedTotalPlanValue &&
                      formik.errors.discountedTotalPlanValue
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="discountedTotalPlanValue"
                    name="discountedTotalPlanValue"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.discountedTotalPlanValue}
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.isThereLimitOnBookingToCharge &&
                    formik.errors.isThereLimitOnBookingToCharge
                      ? " red_color"
                      : ""
                  }`}
                >
                  {/* 1st reminder through Message (Days) */}
                  Is there a limit on bookings that will be charged?
                </label>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="radio"
                      id="yes"
                      name="isThereLimitOnBookingToCharge"
                      value="yes"
                      onChange={handleCheckboxBookingLimit}
                      className="Yesradio"
                      checked={isBookingLimit}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    Yes
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="no"
                      name="isThereLimitOnBookingToCharge"
                      value="no"
                      onChange={handleCheckboxBookingLimit}
                      className="Noradio"
                      checked={!isBookingLimit}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    No
                  </div>
                </div>
              </div>
            </div>

            {isBookingLimit ? (
              <>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.howManyBookingCharged &&
                        formik.errors.howManyBookingCharged
                          ? " red_color"
                          : ""
                      }`}
                    >
                      How many bookings will be charged within the validity?
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.howManyBookingCharged &&
                        formik.errors.howManyBookingCharged
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="howManyBookingCharged"
                      name="howManyBookingCharged"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.howManyBookingCharged}
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.howManyBookingCharged &&
                    formik.errors.howManyBookingCharged ? (
                      <div className="text-danger">
                        {formik.errors.howManyBookingCharged}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.bookingLimitStartTime &&
                        formik.errors.bookingLimitStartTime
                          ? " red_color"
                          : ""
                      }`}
                    >
                      At what time does the Booking Limit value 'Start'?
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.bookingLimitStartTime &&
                        formik.errors.bookingLimitStartTime
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="bookingLimitStartTime"
                      name="bookingLimitStartTime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bookingLimitStartTime}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.bookingLimitEndTime &&
                        formik.errors.bookingLimitEndTime
                          ? " red_color"
                          : ""
                      }`}
                    >
                      At what time does the Booking Limit value 'End'?
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      type="time"
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.bookingLimitEndTime &&
                        formik.errors.bookingLimitEndTime
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="bookingLimitEndTime"
                      name="bookingLimitEndTime"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.bookingLimitEndTime}
                      disabled={!isEditing || action === "view"}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="d-flex align-items-center mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.anyBookingInitialFree &&
                    formik.errors.anyBookingInitialFree
                      ? " red_color"
                      : ""
                  }`}
                >
                  {/* 1st reminder through Message (Days) */}
                  Are any of the initial bookings free?
                </label>
              </div>
              <div className="col-4">
                <div className="d-flex align-items-center gap-3">
                  <div>
                    <input
                      type="radio"
                      id="yes"
                      name="anyBookingInitialFree"
                      value="yes"
                      onChange={handleCheckboxInitialBookingfree}
                      className="Yesradio"
                      checked={isInitialBookingfree}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    Yes
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="no"
                      name="anyBookingInitialFree"
                      value="no"
                      onChange={handleCheckboxInitialBookingfree}
                      className="Noradio"
                      checked={!isInitialBookingfree}
                      disabled={!isEditing || action === "view"}
                    />{" "}
                    No
                  </div>
                </div>
              </div>
            </div>

            {isInitialBookingfree ? (
              <>
                <div className="d-flex mt-2">
                  <div className="col-6">
                    <label
                      className={`fs_14 ${
                        formik.touched.howManyBookingInitialFree &&
                        formik.errors.howManyBookingInitialFree
                          ? " red_color"
                          : ""
                      }`}
                    >
                      How many initial Bookings are free?
                    </label>
                  </div>
                  <div className="col-6">
                    <input
                      className={`border_radius_7px p-1 outline_none ${
                        formik.touched.howManyBookingInitialFree &&
                        formik.errors.howManyBookingInitialFree
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="howManyBookingInitialFree"
                      name="howManyBookingInitialFree"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.howManyBookingInitialFree}
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.howManyBookingInitialFree && formik.errors.howManyBookingInitialFree ? (
                  <div className="text-danger">{formik.errors.howManyBookingInitialFree}</div>
                ) : (
                  <></>
                )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* <div className="d-flex align-items-center mt-2">
              <div className="col-8">
                <label
                  className={`fs_14 ${
                    formik.touched.planExpirySecondRemind &&
                    formik.errors.planExpirySecondRemind
                      ? " red_color"
                      : ""
                  }`}
                >
                  2nd reminder through Message (Days)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.planExpirySecondRemind &&
                    formik.errors.planExpirySecondRemind
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="planExpirySecondRemind"
                  name="planExpirySecondRemind"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planExpirySecondRemind}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div> */}
            {/* <div className="d-flex align-items-center mt-2">
              <div className="col-8">
                <label
                  className={`fs_14 ${
                    formik.touched.planExpiryThirdRemind &&
                    formik.errors.planExpiryThirdRemind
                      ? " red_color"
                      : ""
                  }`}
                >
                  3rd reminder through call (Days)
                </label>
              </div>
              <div className="col-4">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.planExpiryThirdRemind &&
                    formik.errors.planExpiryThirdRemind
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="planExpiryThirdRemind"
                  name="planExpiryThirdRemind"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.planExpiryThirdRemind}
                  disabled={!isEditing || action === "view"}
                />
              </div>
            </div> */}
          </div>
          {/* <div className="col-xl-6">
            <div className="d-flex align-items-center mt-3">
              <div className="col-8">
                <label className="fs_14">
                  Enable auto renewal feature for this plan in the driver app
                </label>
              </div>
              <div className="col-6">
                <span className="align-items-center">
                  <input
                    className="Yesradio"
                    type="radio"
                    id="subExpiryRadioYes"
                    name="subExpiryRadio"
                    value="Yes"
                    checked={formik.values.subExpiryRadio === "Yes"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="subExpiryRadioYes">
                    Yes
                  </label>
                </span>
                <span className="align-items-center">
                  <input
                    className="ms-3"
                    type="radio"
                    id="subExpiryRadioNo"
                    name="subExpiryRadio"
                    value="No"
                    checked={formik.values.subExpiryRadio === "No"}
                    onChange={formik.handleChange}
                    disabled={!isEditing || action === "view"}
                  />
                  <label className="ps-3 fs_14" htmlFor="subExpiryRadioNo">
                    No
                  </label>
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Premium6CreditMode;
