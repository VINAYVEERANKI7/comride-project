import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import PasswordInputField from "../../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import SuccessMessagemodal from "../../modals/successMessageModal";

import errorToast from "../../utilits/errorToast";
import { managePremium6SubscriptionEditAction } from "../../../redux/actions/premiumaction/defaultPremiumAction";

const Premium6SubscriptionPasswordModal = ({
  subscriptionPasswordModal,
  handleSubscriptionPWClose,
  title,
  reload,
  setReload,
  formik,
  params,
  plan_type,
  premiumtype,
  setIsEditing,
  premiumSubactiveTab,
}) => {
  console.log(params, "akjsb");
  console.log(formik.values, "akjsb");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
    setIsEditing(false);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  console.log(params, "formikkkkkkk", formik.values);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values, "formikkkkkkk", formik.values, plan_type);
      dispatch(
        managePremium6SubscriptionEditAction(
          {
            ride_type_id: params?.ride_type_id,
            zone_id: params?.zoneId ?? params?.id,
            plan_type: plan_type,
            premium_type: premiumtype,
            password: values?.password,
            plan_details: {
              planName:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.planName
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.planName
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.planName,
              planImage:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.planImage
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.planImage
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.planImage,
              planDescription:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.planDescription
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.planDescription
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.planDescription,
              activateAutoRenewal:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.activateAutoRenewal
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.activateAutoRenewal
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.activateAutoRenewal,
              autoRenewalDescription:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.autoRenewalDescription
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.autoRenewalDescription
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.autoRenewalDescription,
              autoRenewalTitle:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.autoRenewalTitle
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2.autoRenewalTitle
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3.autoRenewalTitle,
            },
            credit_mode_details: {
              planValue: formik.values.planValue,
              isThereDiscount: formik.values.isThereDiscount,
              discountPercentage: formik.values.discountPercentage,
              discountAmount: formik.values.discountAmount,
              tax: formik.values.tax,
              discountedTotalValueTaxAmount:
                formik.values.discountedTotalValueTaxAmount,
              totalPlanValueTaxAmount: formik.values.totalPlanValueTaxAmount,
              totalPlanValue: formik.values.totalPlanValue,
              discountedTotalPlanValue: formik.values.discountedTotalPlanValue,
              isThereLimitOnBookingToCharge:
                formik.values.isThereLimitOnBookingToCharge,
              howManyBookingCharged: formik.values.howManyBookingCharged,
              bookingLimitStartTime: formik.values.bookingLimitStartTime,
              bookingLimitEndTime: formik.values.bookingLimitEndTime,
              anyBookingInitialFree: formik.values.anyBookingInitialFree,
              howManyBookingInitialFree:
                formik.values.howManyBookingInitialFree,
            },
            single_payment_details: {
              planValue:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.planValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.planValue,
              isThereDiscount:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.isThereDiscount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.isThereDiscount,
              discountPercentage:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.discountPercentage
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details
                      .discountPercentage,
              discountAmount:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.discountAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.discountAmount,
              tax:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.tax
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.tax,
              discountedTotalValueTaxAmount:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details
                      .discountedTotalValueTaxAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details
                      .discountedTotalValueTaxAmount,
              totalPlanValueTaxAmount:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.totalPlanValueTaxAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details
                      .totalPlanValueTaxAmount,
              totalPlanValue:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.totalPlanValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.totalPlanValue,
              discountedTotalPlanValue:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details
                      .discountedTotalPlanValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details
                      .discountedTotalPlanValue,
              validity:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.validity
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.validity,
              timeValidityDays:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.timeValidityDays
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.timeValidityDays,
              bookingValidity:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.single_payment_details.bookingValidity
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_single_payment_details.bookingValidity,
            },
            auto_payment_details: {
              planValue:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.planValue
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.planValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.planValue,
              isThereDiscount:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.isThereDiscount
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.isThereDiscount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.isThereDiscount,
              discountPercentage:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.discountPercentage
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.discountPercentage
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.discountPercentage,
              discountAmount:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.discountAmount
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.discountAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.discountAmount,
              tax:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.tax
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.tax
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.tax,
              discountedTotalValueTaxAmount:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details
                      .discountedTotalValueTaxAmount
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .discountedTotalValueTaxAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .discountedTotalValueTaxAmount,
              discountedTotalPlanValue:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.discountedTotalPlanValue
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .discountedTotalPlanValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .discountedTotalPlanValue,
              totalPlanValueTaxAmount:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.totalPlanValueTaxAmount
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .totalPlanValueTaxAmount
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .totalPlanValueTaxAmount,
              totalPlanValue:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.totalPlanValue
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.totalPlanValue
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.totalPlanValue,
              validity:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.validity
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.validity
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.validity,
              timeValidityDays:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.timeValidityDays
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.timeValidityDays
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.timeValidityDays,
              bookingValidity:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.bookingValidity
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.bookingValidity
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details.bookingValidity,
              maximumAutoPayLimit:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.maximumAutoPayLimit
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.maximumAutoPayLimit
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .maximumAutoPayLimit,
              isThereLimitOnBookingToCharge:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details
                      .isThereLimitOnBookingToCharge
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .isThereLimitOnBookingToCharge
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .isThereLimitOnBookingToCharge,
              howManyBookingCharged:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.howManyBookingCharged
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .howManyBookingCharged
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .howManyBookingCharged,
              bookingLimitRefersh:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.bookingLimitRefersh
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details.bookingLimitRefersh
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .bookingLimitRefersh,
              anyBookingInitialFree:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.anyBookingInitialFree
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .anyBookingInitialFree
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .anyBookingInitialFree,
              howManyBookingInitialFree:
                premiumSubactiveTab === "Plan1"
                  ? formik.values.auto_payment_details.howManyBookingInitialFree
                  : premiumSubactiveTab === "Plan2"
                  ? formik.values.plan2_auto_payment_details
                      .howManyBookingInitialFree
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_auto_payment_details
                      .howManyBookingInitialFree,
            },
            cancelled_plan_details: {
              driverPAfterCancel:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details.driverPAfterCancel
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .driverPAfterCancel,
              refundIssuedIfPlanCancel:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .refundIssuedIfPlanCancel
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .refundIssuedIfPlanCancel,
              zeroRidesCompletedPercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .zeroRidesCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .zeroRidesCompletedPercentageRefund,
              cancelledAfterOneRidePercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .cancelledAfterOneRidePercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .cancelledAfterOneRidePercentageRefund,
              cancelledAfterTwoRidePercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .cancelledAfterTwoRidePercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .cancelledAfterTwoRidePercentageRefund,
              cancelledAfterTwoOrMoreRidePercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .cancelledAfterTwoOrMoreRidePercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .cancelledAfterTwoOrMoreRidePercentageRefund,
              cancelledAfterThreeRidePercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .cancelledAfterThreeRidePercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .cancelledAfterThreeRidePercentageRefund,
              cancelledAfterThreerOrMoreRidePercentageRefund:
                premiumSubactiveTab === "Plan2"
                  ? formik.values.cancelled_plan_details
                      .cancelledAfterThreerOrMoreRidePercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_cancelled_plan_details
                      .cancelledAfterThreerOrMoreRidePercentageRefund,
            },
            expired_plan_details: {
              driverPAfterExpiry:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details.driverPAfterExpiry
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details.driverPAfterExpiry,
              doesDriverGetRefundIfNoRideOrCompletedSome:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .doesDriverGetRefundIfNoRideOrCompletedSome
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .doesDriverGetRefundIfNoRideOrCompletedSome,
              zeroRidesCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .zeroRidesCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .zeroRidesCompletedPercentageRefund,
              oneRideCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .oneRideCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .oneRideCompletedPercentageRefund,
              twoRideCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .twoRideCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .twoRideCompletedPercentageRefund,
              moreThenTwoRideCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .moreThenTwoRideCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .moreThenTwoRideCompletedPercentageRefund,
              threeRideCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .threeRideCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .threeRideCompletedPercentageRefund,
              moreThenThreeRideCompletedPercentageRefund:
                premiumSubactiveTab === "Plan3"
                  ? formik.values.expired_plan_details
                      .moreThenThreeRideCompletedPercentageRefund
                  : premiumSubactiveTab === "Plan3" &&
                    formik.values.plan3_expired_plan_details
                      .moreThenThreeRideCompletedPercentageRefund,
            },
          },
          onEditSuccess,
          onEditError
        )
      );
    },
  });

  const onEditSuccess = (data) => {
    console.log(data, "sadad");
    formikCreatePass.resetForm();
    setLoading(false);
    setError(false);
    handleSubscriptionPWClose();
    handleSuccessMessageShow();
  };

  const onEditError = (data) => {
    console.log(data, "sadad");
    setLoading(false);
    errorToast(data?.data?.data ?? data?.data?.message);
    setError(data?.data?.data ?? data?.data?.message);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title="Changes made Successfully!"
      />
      <Modal
        centered
        show={subscriptionPasswordModal}
        onHide={handleSubscriptionPWClose}
        dialogClassName="status_change_container"
        contentClassName="border_radius_10px"
        backdropClassName="ridetype_second_modal_backdrop"
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body>
          <div className="px-3">
            <form onSubmit={formikCreatePass.handleSubmit}>
              <div className="d-flex justify-content-center fs_22 fw_600 mt-0">
                <span className="primary_color">{title}</span>
              </div>
              <div className="mt-3">
                <PasswordInputField
                  itemName={"password"}
                  inputValue={formikCreatePass.values.password}
                  onChangeFn={(e) => {
                    formikCreatePass.handleChange(e);
                  }}
                  onBlurFn={formikCreatePass.handleBlur}
                  formikError={formikCreatePass.errors.password}
                  formikTouched={formikCreatePass.touched.password}
                  error={error}
                />
                <div className="red_color fw_500 ms-5">{error ?? null}</div>
              </div>
              <div className="d-flex justify-content-between mt-4 px-lg-5 px-md-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    setError(false);
                    handleSubscriptionPWClose();
                    formikCreatePass.resetForm();
                  }}
                />

                <button
                  type="submit"
                  className=" primary_bg border_radius_5px px-2 py-1 border_none"
                >
                  <span className=" fs_18 white_color px-3">
                    {loading ? <SpinnerLoading /> : `Confirm`}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Premium6SubscriptionPasswordModal;
