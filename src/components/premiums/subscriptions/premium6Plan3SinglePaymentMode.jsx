import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import {
  reactSelectUsageLimit,
  reactSelectUsageLimitDisabled,
  reactSelectUsageLimitError,
} from "../../mui-styles/react-styles";
import DropDownIcon from "../../../assets/icons/dropdown-icon";
import { socket } from "../../../redux/config";

const Premium6Plan3SinglePaymentMode = ({
  formik,
  params,
  isEditing,
  subscriptData,
  premiumSubactiveTab,
}) => {
  const action = params?.action;

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <DropDownIcon fill={props} />
      </components.DropdownIndicator>
    );
  };

  function handleCheckbox(e) {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked && value === "yes") {
      setIsDiscount(true);
      formik.setFieldValue(
        "plan3_single_payment_details.isThereDiscount",
        true
      );
    } else if (isChecked && value === "no") {
      setIsDiscount(false);
      formik.setFieldValue(
        "plan3_single_payment_details.isThereDiscount",
        false
      );
    }
  }

  const [isDiscount, setIsDiscount] = useState(
    subscriptData?.premium_6_single_payment?.isThereDiscount
  );

  const bookingValidity = [
    { value: "time", label: "Time(Unlimited Booking)" },
    { value: "BookingsAndTime", label: "Booking & Time" },
  ];

  useEffect(() => {
    const data = {
      adminId: localStorage.getItem("id"),
      is_there_discount:
        formik?.values?.plan3_single_payment_details?.isThereDiscount,
      plan_value: formik?.values?.plan3_single_payment_details?.planValue,
      discount:
        formik?.values?.plan3_single_payment_details?.discountPercentage,
      discount_tax: formik?.values?.plan3_single_payment_details?.tax,
      type: "single_mode",
    };

    const withoutDiscountData = {
      adminId: localStorage.getItem("id"),
      is_there_discount: false,
      plan_value: formik?.values?.plan3_single_payment_details?.planValue,
      tax: formik?.values?.plan3_single_payment_details?.tax,
      type: "single_mode",
    };

    if (
      premiumSubactiveTab === "Plan3" &&
      formik?.values?.plan3_single_payment_details?.isThereDiscount == true
    ) {
      if (
        formik.values?.plan3_single_payment_details?.planValue != null &&
        formik.values?.plan3_single_payment_details?.discountPercentage !=
          null &&
        formik.values?.plan3_single_payment_details?.tax != null &&
        formik.values?.plan3_single_payment_details?.tax != ""
      ) {
        console.log("Enter", data, "formik.values");
        socket.emit("fetch_premium_calculation_data", data);
      }
    } else if (
      premiumSubactiveTab === "Plan3" &&
      formik?.values?.plan3_single_payment_details?.isThereDiscount == false
    ) {
      if (
        formik?.values?.plan3_single_payment_details?.planValue != null &&
        formik?.values?.plan3_single_payment_details?.tax != null &&
        formik?.values?.plan3_single_payment_details?.tax != ""
      ) {
        console.log("Enter", withoutDiscountData, "formik.values");
        socket.emit("fetch_premium_calculation_data", withoutDiscountData);
      }
    }
  }, [formik?.values?.plan3_single_payment_details]);

  useEffect(() => {
    if (
      premiumSubactiveTab === "Plan3" &&
      formik?.values?.plan3_single_payment_details?.isThereDiscount == true
    ) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "single_mode") {
          formik.setFieldValue(
            "plan3_single_payment_details.discountAmount",
            data?.data?.dicountAmount
          );
          formik.setFieldValue(
            "plan3_single_payment_details.discountedTotalValueTaxAmount",
            data?.data?.discountTotalPlanValueTaxAmount
          );
          formik.setFieldValue(
            "plan3_single_payment_details.totalPlanValue",
            data?.data?.TotalPlanValue
          );
          formik.setFieldValue(
            "plan3_single_payment_details.discountedTotalPlanValue",
            data?.data?.DiscountTotalPlanValue
          );
        }
      });
    } else if (
      premiumSubactiveTab === "Plan3" &&
      formik?.values?.plan3_single_payment_details?.isThereDiscount == false
    ) {
      socket.on("updated_premium_calculation_data", (data) => {
        console.log(data, "formik.values");
        if (data?.data?.type === "single_mode") {
          formik.setFieldValue(
            "plan3_single_payment_details.totalPlanValue",
            data?.data?.TotalPlanValue
          );
          formik.setFieldValue(
            "plan3_single_payment_details.totalPlanValueTaxAmount",
            data?.data?.TotalPlanValueTaxAmount
          );
        }
      });
    }
  }, [socket, formik.values.plan3_single_payment_details]);

  return (
    <>
      <div>
        <div>
          <span className=" primary_color fs_16 fw_500">Single Payment</span>
        </div>
        <div className="row gx-0 mb-4 ms-4">
          <div className="">
            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_single_payment_details?.planValue &&
                    formik.errors.plan3_single_payment_details?.planValue
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
                    formik.touched.plan3_single_payment_details?.planValue &&
                    formik.errors.plan3_single_payment_details?.planValue
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_single_payment_details.planValue"
                  name="plan3_single_payment_details.planValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.plan3_single_payment_details?.planValue}
                  disabled={!isEditing || action === "view"}
                />{" "}
                /booking
                {formik.touched.plan3_single_payment_details?.planValue &&
                formik.errors.plan3_single_payment_details?.planValue ? (
                  <div className="text-danger">
                    {formik.errors.plan3_single_payment_details?.planValue}
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
                    formik.touched.plan3_single_payment_details
                      ?.isThereDiscount &&
                    formik.errors.plan3_single_payment_details?.isThereDiscount
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
                      name="plan3_single_payment_details.isThereDiscount"
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
                      name="plan3_single_payment_details.isThereDiscount"
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
                        formik.touched.plan3_single_payment_details
                          ?.discountPercentage &&
                        formik.errors.plan3_single_payment_details
                          ?.discountPercentage
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
                        formik.touched.plan3_single_payment_details
                          ?.discountPercentage &&
                        formik.errors.plan3_single_payment_details
                          ?.discountPercentage
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_single_payment_details.discountPercentage"
                      name="plan3_single_payment_details.discountPercentage"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_single_payment_details
                          ?.discountPercentage
                      }
                      disabled={!isEditing || action === "view"}
                    />
                    {formik.touched.plan3_single_payment_details
                      ?.discountPercentage &&
                    formik.errors.plan3_single_payment_details
                      ?.discountPercentage ? (
                      <div className="text-danger">
                        {
                          formik.errors.plan3_single_payment_details
                            ?.discountPercentage
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
                        formik.touched.plan3_single_payment_details
                          ?.discountAmount &&
                        formik.errors.plan3_single_payment_details
                          ?.discountAmount
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
                        formik.touched.plan3_single_payment_details
                          ?.discountAmount &&
                        formik.errors.plan3_single_payment_details
                          ?.discountAmount
                          ? "error_border"
                          : !isEditing || action === "view"
                          ? "disabled_bg_color  disabled_border"
                          : "primary_color primary_border"
                      }`}
                      style={{ width: "5rem" }}
                      id="plan3_single_payment_details.discountAmount"
                      name="plan3_single_payment_details.discountAmount"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={
                        formik.values.plan3_single_payment_details
                          ?.discountAmount
                      }
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
                    formik.touched.plan3_single_payment_details?.tax &&
                    formik.errors.plan3_single_payment_details?.tax
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
                    formik.touched.plan3_single_payment_details?.tax &&
                    formik.errors.plan3_single_payment_details?.tax
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_single_payment_details.tax"
                  name="plan3_single_payment_details.tax"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.plan3_single_payment_details?.tax}
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.plan3_single_payment_details?.tax &&
                formik.errors.plan3_single_payment_details?.tax ? (
                  <div className="text-danger">
                    {formik.errors.plan3_single_payment_details?.tax}
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
                      formik.touched.plan3_single_payment_details
                        ?.discountedTotalValueTaxAmount &&
                      formik.errors.plan3_single_payment_details
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
                      formik.touched.plan3_single_payment_details
                        ?.discountedTotalValueTaxAmount &&
                      formik.errors.plan3_single_payment_details
                        ?.discountedTotalValueTaxAmount
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="plan3_single_payment_details.discountedTotalValueTaxAmount"
                    name="plan3_single_payment_details.discountedTotalValueTaxAmount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.plan3_single_payment_details
                        ?.discountedTotalValueTaxAmount
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
                    formik.touched.plan3_single_payment_details
                      ?.totalPlanValue &&
                    formik.errors.plan3_single_payment_details?.totalPlanValue
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
                    formik.touched.plan3_single_payment_details
                      ?.totalPlanValue &&
                    formik.errors.plan3_single_payment_details?.totalPlanValue
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_single_payment_details.totalPlanValue"
                  name="plan3_single_payment_details.totalPlanValue"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.plan3_single_payment_details?.totalPlanValue
                  }
                  disabled={true}
                />
              </div>
            </div>

            {isDiscount ? (
              <div className="d-flex align-items-center mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.plan3_single_payment_details
                        ?.discountedTotalPlanValue &&
                      formik.errors.plan3_single_payment_details
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
                      formik.touched.plan3_single_payment_details
                        ?.discountedTotalPlanValue &&
                      formik.errors.plan3_single_payment_details
                        ?.discountedTotalPlanValue
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color  disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="plan3_single_payment_details.discountedTotalPlanValue"
                    name="plan3_single_payment_details.discountedTotalPlanValue"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.plan3_single_payment_details
                        ?.discountedTotalPlanValue
                    }
                    disabled={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="d-flex mt-3">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_single_payment_details?.validity &&
                    formik.errors.plan3_single_payment_details?.validity
                      ? " red_color"
                      : ""
                  }`}
                >
                  {/* 1st reminder through Message (Days) */}
                  Validity
                </label>
              </div>
              <div className="col-6">
                <div className="w-75">
                  <div>
                    <Select
                      isDisabled={!isEditing}
                      id="plan3_single_payment_details.validity"
                      instanceId="plan3_single_payment_details.validity"
                      options={bookingValidity}
                      placeholder="Select validity"
                      styles={
                        formik.errors.plan3_single_payment_details?.validity &&
                        formik.touched.plan3_single_payment_details?.validity
                          ? reactSelectUsageLimitError
                          : !isEditing
                          ? reactSelectUsageLimitDisabled
                          : reactSelectUsageLimit
                      }
                      name="plan3_single_payment_details.validity"
                      value={bookingValidity?.filter((option) => {
                        return (
                          option.value ===
                          formik.values.plan3_single_payment_details?.validity
                        );
                      })}
                      onChange={(selectedOption) => {
                        let event = {
                          target: {
                            name: "plan3_single_payment_details.validity",
                            value: selectedOption.value,
                          },
                        };

                        formik.setFieldValue(
                          "plan3_single_payment_details.validity",
                          selectedOption.value
                        );
                        formik.handleChange(event);
                      }}
                      components={{
                        IndicatorSeparator: () => null,
                        DropdownIndicator,
                      }}
                    />
                    {formik.touched.plan3_single_payment_details?.validity &&
                    formik.errors.plan3_single_payment_details?.validity ? (
                      <div className="text-danger">
                        {formik.errors.plan3_single_payment_details?.validity}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex mt-2">
              <div className="col-6">
                <label
                  className={`fs_14 ${
                    formik.touched.plan3_single_payment_details
                      ?.timeValidityDays &&
                    formik.errors.plan3_single_payment_details?.timeValidityDays
                      ? " red_color"
                      : ""
                  }`}
                >
                  Time Validity (days)
                </label>
              </div>
              <div className="col-6">
                <input
                  className={`border_radius_7px p-1 outline_none ${
                    formik.touched.plan3_single_payment_details
                      ?.timeValidityDays &&
                    formik.errors.plan3_single_payment_details?.timeValidityDays
                      ? "error_border"
                      : !isEditing || action === "view"
                      ? "disabled_bg_color  disabled_border"
                      : "primary_color primary_border"
                  }`}
                  style={{ width: "5rem" }}
                  id="plan3_single_payment_details.timeValidityDays"
                  name="plan3_single_payment_details.timeValidityDays"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.plan3_single_payment_details?.timeValidityDays
                  }
                  disabled={!isEditing || action === "view"}
                />
                {formik.touched.plan3_single_payment_details
                  ?.timeValidityDays &&
                formik.errors.plan3_single_payment_details?.timeValidityDays ? (
                  <div className="text-danger">
                    {
                      formik.errors.plan3_single_payment_details
                        ?.timeValidityDays
                    }
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            {formik.values.plan3_single_payment_details?.validity ===
            "BookingsAndTime" ? (
              <div className="d-flex mt-2">
                <div className="col-6">
                  <label
                    className={`fs_14 ${
                      formik.touched.plan3_single_payment_details
                        ?.bookingValidity &&
                      formik.errors.plan3_single_payment_details
                        ?.bookingValidity
                        ? " red_color"
                        : ""
                    }`}
                  >
                    Bookings Validity
                  </label>
                </div>
                <div className="col-6">
                  <input
                    className={`border_radius_7px p-1 outline_none ${
                      formik.touched.plan3_single_payment_details
                        ?.bookingValidity &&
                      formik.errors.plan3_single_payment_details
                        ?.bookingValidity
                        ? "error_border"
                        : !isEditing || action === "view"
                        ? "disabled_bg_color disabled_border"
                        : "primary_color primary_border"
                    }`}
                    style={{ width: "5rem" }}
                    id="plan3_single_payment_details.bookingValidity"
                    name="plan3_single_payment_details.bookingValidity"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.plan3_single_payment_details
                        ?.bookingValidity
                    }
                    disabled={!isEditing || action === "view"}
                  />
                  {formik.touched.plan3_single_payment_details
                    ?.bookingValidity &&
                  formik.errors.plan3_single_payment_details
                    ?.bookingValidity ? (
                    <div className="text-danger">
                      {
                        formik.errors.plan3_single_payment_details
                          ?.bookingValidity
                      }
                    </div>
                  ) : (
                    <></>
                  )}
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

export default Premium6Plan3SinglePaymentMode;
