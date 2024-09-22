import React, { useEffect, useState } from "react";
import { socket } from "../../../redux/config";

const Premium6AutoPayMode = ({
  formik,
  params,
  isEditing,
  subscriptData,
  premiumSubactiveTab,
}) => {
  const action = params?.action;
  const [isDiscount, setIsDiscount] = useState(
    subscriptData?.premium_6_auto_pay?.isThereDiscount
  );

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;
    console.log(e.target, isChecked, value, "isdiscount");

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik?.setFieldValue("auto_payment_details.isThereDiscount", true);
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik?.setFieldValue("auto_payment_details.isThereDiscount", false);
    }
  }

  function handleCheckboxBookingLimit(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsBookingLimit(true);
      formik.setFieldValue(
        "auto_payment_details.isThereLimitOnBookingToCharge",
        true
      );
    } else if (isChecked && value === "no") {
      setIsBookingLimit(false);
      formik.setFieldValue(
        "auto_payment_details.isThereLimitOnBookingToCharge",
        false
      );
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
      formik.setFieldValue("auto_payment_details.anyBookingInitialFree", true);
    } else if (isChecked && value === "no") {
      setIsInitialBookingfree(false);
      formik.setFieldValue("auto_payment_details.anyBookingInitialFree", false);
    }
  }

  const [isInitialBookingfree, setIsInitialBookingfree] = useState(
    subscriptData?.premium_6_auto_pay?.anyBookingInitialFree ?? null
  );

  useEffect(() => {
    if (subscriptData) {
      setIsBookingLimit(
        subscriptData?.premium_6_auto_pay?.isThereLimitOnBookingToCharge
      );
      setIsInitialBookingfree(
        subscriptData?.premium_6_auto_pay?.anyBookingInitialFree
      );
    }
  }, [subscriptData]);

  useEffect(() => {
    const data = {
      adminId: localStorage.getItem("id"),
      is_there_discount: formik?.values?.auto_payment_details?.isThereDiscount,
      plan_value: formik?.values?.auto_payment_details?.planValue,
      discount: formik?.values?.auto_payment_details?.discountPercentage,
      discount_tax: formik?.values?.auto_payment_details?.tax,
      type: "auto_pay",
    };

    const withoutDiscountData = {
      adminId: localStorage.getItem("id"),
      is_there_discount: false,
      plan_value: formik?.values?.auto_payment_details?.planValue,
      tax: formik?.values?.auto_payment_details?.tax,
      type: "auto_pay",
    };

    if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.auto_payment_details?.isThereDiscount == true
    ) {
      if (
        formik.values?.auto_payment_details?.planValue != null &&
        formik.values?.auto_payment_details?.discountPercentage != null &&
        formik.values?.auto_payment_details?.tax != null &&
        formik.values?.auto_payment_details?.tax != ""
      ) {
        console.log("Enter", data, "formik.values");
        socket.emit("fetch_premium_calculation_data", data);
      }
    } else if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.auto_payment_details?.isThereDiscount == false
    ) {
      if (
        formik?.values?.auto_payment_details?.planValue != null &&
        formik?.values?.auto_payment_details?.tax != null &&
        formik?.values?.auto_payment_details?.tax != ""
      ) {
        console.log("Enter", withoutDiscountData, "formik.values");
        socket.emit("fetch_premium_calculation_data", withoutDiscountData);
      }
    }
  }, [formik?.values?.auto_payment_details]);

  useEffect(() => {
    if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.auto_payment_details?.isThereDiscount == true
    ) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "auto_pay") {
          formik.setFieldValue(
            "auto_payment_details.discountAmount",
            data?.data?.dicountAmount
          );
          formik.setFieldValue(
            "auto_payment_details.discountedTotalValueTaxAmount",
            data?.data?.discountTotalPlanValueTaxAmount
          );
          formik.setFieldValue(
            "auto_payment_details.totalPlanValue",
            data?.data?.TotalPlanValue
          );
          formik.setFieldValue(
            "auto_payment_details.discountedTotalPlanValue",
            data?.data?.DiscountTotalPlanValue
          );
        }
      });
    } else if (
      premiumSubactiveTab === "Plan1" &&
      formik?.values?.auto_payment_details?.isThereDiscount == false
    ) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "auto_pay") {
          formik.setFieldValue(
            "auto_payment_details.totalPlanValue",
            data?.data?.TotalPlanValue
          );
          formik.setFieldValue(
            "auto_payment_details.totalPlanValueTaxAmount",
            data?.data?.TotalPlanValueTaxAmount
          );
        }
      });
    }
  }, [socket, formik.values.auto_payment_details]);

  return (
    <>
      <div>
        <div>
          <span className=" primary_color fs_16 fw_500">Autopay Mode</span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="">
            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.auto_payment_details?.planValue &&
                    formik.errors.auto_payment_details?.planValue
                      ? " red_color"
                      : ""
                  }`}
                >
                  {/* 1st reminder through Message (Days) */}
                  Plan Value (₹)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.auto_payment_details?.planValue &&
                    formik.errors.auto_payment_details?.planValue
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="auto_payment_details.planValue"
                  name="auto_payment_details.planValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.auto_payment_details?.planValue}
                  disabled={!isEditing || action === "view"}
                />{" "}
                /booking
                {formik.touched.auto_payment_details?.planValue &&
                formik.errors.auto_payment_details?.planValue ? (
                  <div className="text-danger">
                    {formik.errors.auto_payment_details?.planValue}
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
                    formik.touched?.auto_payment_details?.isThereDiscount &&
                    formik.errors?.auto_payment_details?.isThereDiscount
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
                      name="auto_payment_details.isThereDiscount"
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
                      name="auto_payment_details.isThereDiscount"
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
                        formik.touched.auto_payment_details
                          ?.discountPercentage &&
                        formik.errors.auto_payment_details?.discountPercentage
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
                        formik.touched.auto_payment_details
                          ?.discountPercentage &&
                        formik.errors.auto_payment_details?.discountPercentage
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="auto_payment_details.discountPercentage"
                      name="auto_payment_details.discountPercentage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.auto_payment_details?.discountPercentage
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.auto_payment_details?.discountPercentage &&
                    formik.errors.auto_payment_details?.discountPercentage ? (
                      <div className="text-danger">
                        {formik.errors.auto_payment_details?.discountPercentage}
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
                        formik.touched.auto_payment_details?.discountAmount &&
                        formik.errors.auto_payment_details?.discountAmount
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
                        formik.touched.auto_payment_details?.discountAmount &&
                        formik.errors.auto_payment_details?.discountAmount
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="auto_payment_details.discountAmount"
                      name="auto_payment_details.discountAmount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.auto_payment_details?.discountAmount}
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
                    formik.touched.auto_payment_details?.tax &&
                    formik.errors.auto_payment_details?.tax
                      ? " red_color"
                      : ""
                  }`}
                >
                  Tax (%)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.auto_payment_details?.tax &&
                    formik.errors.auto_payment_details?.tax
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="auto_payment_details.tax"
                  name="auto_payment_details.tax"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.auto_payment_details?.tax}
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.auto_payment_details?.tax &&
                formik.errors.auto_payment_details?.tax ? (
                  <div className="text-danger">
                    {formik.errors.auto_payment_details?.tax}
                  </div>
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
                      formik.touched.auto_payment_details
                        ?.discountedTotalValueTaxAmount &&
                      formik.errors.auto_payment_details
                        ?.discountedTotalValueTaxAmount
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
                      formik.touched.auto_payment_details
                        ?.discountedTotalValueTaxAmount &&
                      formik.errors.auto_payment_details
                        ?.discountedTotalValueTaxAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="auto_payment_details.discountedTotalValueTaxAmount"
                    name="auto_payment_details.discountedTotalValueTaxAmount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.auto_payment_details
                        ?.discountedTotalValueTaxAmount
                    }
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
                      formik.touched.auto_payment_details
                        ?.totalPlanValueTaxAmount &&
                      formik.errors.auto_payment_details
                        ?.totalPlanValueTaxAmount
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
                      formik.touched.auto_payment_details
                        ?.totalPlanValueTaxAmount &&
                      formik.errors.auto_payment_details
                        ?.totalPlanValueTaxAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="auto_payment_details.totalPlanValueTaxAmountAutoPay"
                    name="auto_payment_details.totalPlanValueTaxAmount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.auto_payment_details
                        ?.totalPlanValueTaxAmount
                    }
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
                    formik.touched.auto_payment_details?.totalPlanValue &&
                    formik.errors.auto_payment_details?.totalPlanValue
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
                    formik.touched.auto_payment_details?.totalPlanValue &&
                    formik.errors.auto_payment_details?.totalPlanValue
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="auto_payment_details.totalPlanValueAutoPay"
                  name="auto_payment_details.totalPlanValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.auto_payment_details?.totalPlanValue}
                  disabled={true}
                />
              </div>
            </div>

            {isDiscount ? (
              <div className="d-flex align-items-center mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.auto_payment_details
                        ?.discountedTotalPlanValue &&
                      formik.errors.auto_payment_details
                        ?.discountedTotalPlanValue
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
                      formik.touched.auto_payment_details
                        ?.discountedTotalPlanValue &&
                      formik.errors.auto_payment_details
                        ?.discountedTotalPlanValue
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="auto_payment_details?.discountedTotalPlanValue"
                    name="auto_payment_details?.discountedTotalPlanValue"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.auto_payment_details
                        ?.discountedTotalPlanValue
                    }
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex mt-2">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.auto_payment_details?.maximumAutoPayLimit &&
                    formik.errors.auto_payment_details?.maximumAutoPayLimit
                      ? " red_color"
                      : ""
                  }`}
                >
                  Maximum Autopay limit value (₹)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.auto_payment_details?.maximumAutoPayLimit &&
                    formik.errors.auto_payment_details?.maximumAutoPayLimit
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="auto_payment_details.maximumAutoPayLimit"
                  name="auto_payment_details.maximumAutoPayLimit"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.auto_payment_details?.maximumAutoPayLimit
                  }
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.auto_payment_details?.maximumAutoPayLimit &&
                formik.errors.auto_payment_details?.maximumAutoPayLimit ? (
                  <div className="text-danger">
                    {formik.errors.auto_payment_details?.maximumAutoPayLimit}
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
                    formik.touched.auto_payment_details
                      ?.isThereLimitOnBookingToCharge &&
                    formik.errors.auto_payment_details
                      ?.isThereLimitOnBookingToCharge
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
                      name="auto_payment_details.isThereLimitOnBookingToCharge"
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
                      name="auto_payment_details.isThereLimitOnBookingToCharge"
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
                        formik.touched.auto_payment_details
                          ?.howManyBookingCharged &&
                        formik.errors.auto_payment_details
                          ?.howManyBookingCharged
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
                        formik.touched.auto_payment_details
                          ?.howManyBookingCharged &&
                        formik.errors.auto_payment_details
                          ?.howManyBookingCharged
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="auto_payment_details.howManyBookingCharged"
                      name="auto_payment_details.howManyBookingCharged"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.auto_payment_details
                          ?.howManyBookingCharged
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.auto_payment_details
                      ?.howManyBookingCharged &&
                    formik.errors.auto_payment_details
                      ?.howManyBookingCharged ? (
                      <div className="text-danger">
                        {
                          formik.errors.auto_payment_details
                            ?.howManyBookingCharged
                        }
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
                        formik.touched.auto_payment_details
                          ?.bookingLimitRefersh &&
                        formik.errors.auto_payment_details?.bookingLimitRefersh
                          ? " red_color"
                          : ""
                      }`}
                    >
                      {/* At what time does the Booking Limit value 'Start'? */}
                      How often does the booking limit value refresh?
                    </label>
                  </div>
                  <div className="col-6">
                    {/* <input
                  type="time"
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
                  /> */}
                    {formik.values.auto_payment_details?.bookingLimitRefersh}
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
                    formik.touched.auto_payment_details
                      ?.anyBookingInitialFree &&
                    formik.errors.auto_payment_details?.anyBookingInitialFree
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
                      name="auto_payment_details.anyBookingInitialFree"
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
                      name="auto_payment_details.anyBookingInitialFree"
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
                        formik.touched.auto_payment_details
                          ?.howManyBookingInitialFree &&
                        formik.errors.auto_payment_details
                          ?.howManyBookingInitialFree
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
                        formik.touched.auto_payment_details
                          ?.howManyBookingInitialFree &&
                        formik.errors.auto_payment_details
                          ?.howManyBookingInitialFree
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="auto_payment_details.howManyBookingInitialFree"
                      name="auto_payment_details.howManyBookingInitialFree"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.auto_payment_details
                          ?.howManyBookingInitialFree
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.auto_payment_details
                      ?.howManyBookingInitialFree &&
                    formik.errors.auto_payment_details
                      ?.howManyBookingInitialFree ? (
                      <div className="text-danger">
                        {
                          formik.errors.auto_payment_details
                            ?.howManyBookingInitialFree
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

export default Premium6AutoPayMode;
