import React, { useEffect, useState } from "react";
import InnerLayout from "../../layout/innerLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import { useDispatch } from "react-redux";
import {
  managePremium4SubscriptionAction,
  managePremium5SubscriptionAction,
  archivedPremium4SubscriptionAction,
  archivedPremium5SubscriptionAction,
  managePremium6SubscriptionAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";
import SubscriptionPasswordModal from "./subscriptionPassWord";
import Premium6SubPlanDetails from "./premium6SubPlanDetails.jsx";
import Premium6CreditMode from "./premium6CreditMode.jsx";
import Premium6AutoPayMode from "./premium6AutoPayMode.jsx";
import Premium6Plan2SubPlanDetails from "./premium6Plan2SubPlanDetails.jsx";
import Premium6Plan2SinglePaymentMode from "./premium6Plan2SinglePaymentMode.jsx";
import Premium6PlanCancellation from "./premium6PlanCancellation.jsx";
import Premium6ExpiryNoRideRefund from "./premium6ExpiryandNoRideRefund.jsx";
import Premium6SubscriptionPasswordModal from "./premium6SubscriptionModal.jsx";
import Premium6Plan2AutoPayMode from "./premium6Plan2AutoPayMode.jsx";
import Premium6Plan3SubPlanDetails from "./premium6plan3SubPlanDetails.jsx";
import Premium6Plan3SinglePaymentMode from "./premium6Plan3SinglePaymentMode.jsx";
import Premium6Plan3AutoPayMode from "./premium6Plan3AutoPayMode.jsx";
import Premium6Plan3Cancellation from "./premium6Plan3Cancellation.jsx";
import Premium6Plan3ExpiryNoRideRefund from "./premium6Plan3ExpiryNoRefund.jsx";
import { Switch } from "@material-ui/core";
import DetailsPremiumPasswordModal from "../detailsPasswordModal.jsx";
import PremiumLeavePlanModal from "../../modals/premiumLeavePlanModal.jsx";
import errorToast from "../../utilits/errorToast.js";
const Premium6Subscription = ({
  params,
  action,
  managePremiumType,
  premiumtype,
  premiumSubactiveTab,
  setPremiumSubActiveTab,
  setStatusValue,
  statusValue,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptData, setSubscriptData] = useState({});
  const [reload, setReload] = useState(false);
  const [planDescNum, setPlanDescNum] = useState(1);
  const [frontImageLink, setFrontImageLink] = useState({
    img: "",
    error: false,
  });
  const [plan2ImageLink, setPlan2ImageLink] = useState({
    img: "",
    error: false,
  });
  const [plan3ImageLink, setPlan3ImageLink] = useState({
    img: "",
    error: false,
  });

  const [subscriptionPasswordModal, setsubscriptionPasswordModal] =
    useState(false);
  const handleSubscriptionPWClose = () => {
    setsubscriptionPasswordModal(false);
  };
  const handleSubscriptionPWShow = () => setsubscriptionPasswordModal(true);
  const [statusChangeShow, setstatusChangeShowShow] = useState(false);
  const handleStatusChangeClose = () => setstatusChangeShowShow(false);
  const handleStatusChangeShow = () => setstatusChangeShowShow(true);
  const [leavePageShow, setLeavePageShow] = useState(false);
  const handleLeavePageClose = () => setLeavePageShow(false);
  const handleLeavePageShow = () => setLeavePageShow(true);

  const subscriptionSubHead = [
    { label: "Plan-1", value: "Plan1" },
    { label: "Plan-2", value: "Plan2" },
    { label: "Plan-3", value: "Plan3" },
  ];
  const subscriptionSubHeadFunc = (label) => {
    return premiumSubactiveTab === label ? "buttonactive" : "buttoninactive";
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsEditing(false);
  };

  useEffect(() => {
    if (managePremiumType === "managePremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          managePremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          managePremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium6") {
        setLoading(true);
        dispatch(
          managePremium6SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else if (managePremiumType === "defaultPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          archivedPremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.id },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          archivedPremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.id },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    } else if (managePremiumType === "archivedPremium") {
      if (premiumtype === "Premium4") {
        setLoading(true);
        dispatch(
          archivedPremium4SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      } else if (premiumtype === "Premium5") {
        setLoading(true);
        dispatch(
          archivedPremium5SubscriptionAction(
            { ride_type_id: params?.ride_type_id, zone_id: params?.zoneId },
            onFetchSuccess,
            onFetchError
          )
        );
      }
    }
  }, [premiumtype, params?.ride_type_id, premiumSubactiveTab]);

  const onFetchSuccess = (data) => {
    console.log(data, "askjdhaskd", premiumSubactiveTab);
    setLoading(false);
    if (premiumSubactiveTab === "30DaysPlan") {
      setSubscriptData(data?.data?.Plan30Days);
    } else if (premiumSubactiveTab === "90DaysPlan") {
      setSubscriptData(data?.data?.Plan90Days);
    } else if (premiumSubactiveTab === "180DaysPlan") {
      setSubscriptData(data?.data?.Plan180Days);
    } else if (premiumSubactiveTab === "Plan1") {
      setSubscriptData(data?.data?.PlanOne);
      setStatusValue(data?.data?.PlanOne?.status === "Active" ? true : false);
    } else if (premiumSubactiveTab === "Plan2") {
      setSubscriptData(data?.data?.PlanTwo);
      setStatusValue(data?.data?.PlanTwo?.status === "Active" ? true : false);
    } else if (premiumSubactiveTab === "Plan3") {
      setSubscriptData(data?.data?.PlanThree);
      setStatusValue(data?.data?.PlanThree?.status === "Active" ? true : false);
    }
    console.log(data?.data, "asdasdasd");
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data, "asdasdasd");
    errorToast(data?.data?.message);
  };

  const formikPlan1 = useFormik({
    enableReinitialize: true,

    initialValues: {
      plan_type: subscriptData?.plan_type,
      planName: subscriptData?.premium_6_plan_details?.planName ?? "",
      planImage: subscriptData?.premium_6_plan_details?.planImage ?? null,
      planDescription:
        subscriptData?.premium_6_plan_details?.planDescription ?? [],
      activateAutoRenewal:
        subscriptData?.premium_6_plan_details?.activateAutoRenewal ?? false,
      autoRenewalDescription:
        subscriptData?.premium_6_plan_details?.autoRenewalDescription ?? [],
      autoRenewalTitle:
        subscriptData?.premium_6_plan_details?.autoRenewalTitle ?? "",
      planValue: subscriptData?.premium_6_credit_mode?.planValue ?? "",
      isThereDiscount:
        subscriptData?.premium_6_credit_mode?.isThereDiscount ?? false,
      discountPercentage:
        subscriptData?.premium_6_credit_mode?.discountPercentage ?? "",
      discountAmount:
        subscriptData?.premium_6_credit_mode?.discountAmount ?? "",
      tax: subscriptData?.premium_6_credit_mode?.tax ?? "",
      discountedTotalValueTaxAmount:
        subscriptData?.premium_6_credit_mode?.discountedTotalValueTaxAmount ??
        "",
      totalPlanValueTaxAmount:
        subscriptData?.premium_6_credit_mode?.totalPlanValueTaxAmount ?? "",
      totalPlanValue:
        subscriptData?.premium_6_credit_mode?.totalPlanValue ?? "",
      discountedTotalPlanValue:
        subscriptData?.premium_6_credit_mode?.discountedTotalPlanValue ?? "",
      isThereLimitOnBookingToCharge:
        subscriptData?.premium_6_credit_mode?.isThereLimitOnBookingToCharge ??
        false,
      howManyBookingCharged:
        subscriptData?.premium_6_credit_mode?.howManyBookingCharged ?? "",
      bookingLimitStartTime:
        subscriptData?.premium_6_credit_mode?.bookingLimitStartTime ?? "12:00",
      bookingLimitEndTime:
        subscriptData?.premium_6_credit_mode?.bookingLimitEndTime ?? "23:00",
      anyBookingInitialFree:
        subscriptData?.premium_6_credit_mode?.anyBookingInitialFree ?? false,
      howManyBookingInitialFree:
        subscriptData?.premium_6_credit_mode?.howManyBookingInitialFree ?? "",
      auto_payment_details: {
        planValue: subscriptData?.premium_6_auto_pay?.planValue ?? "",
        isThereDiscount:
          subscriptData?.premium_6_auto_pay?.isThereDiscount ?? false,
        discountPercentage:
          subscriptData?.premium_6_auto_pay?.discountPercentage ?? "",
        discountAmount: subscriptData?.premium_6_auto_pay?.discountAmount ?? "",
        tax: subscriptData?.premium_6_auto_pay?.tax ?? "",
        discountedTotalValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.discountedTotalValueTaxAmount ??
          "",
        totalPlanValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.totalPlanValueTaxAmount ?? "",
        totalPlanValue: subscriptData?.premium_6_auto_pay?.totalPlanValue ?? "",
        discountedTotalPlanValue:
          subscriptData?.premium_6_auto_pay?.discountedTotalPlanValue ?? "",
        validity: subscriptData?.premium_6_auto_pay?.validity,
        timeValidityDays:
          subscriptData?.premium_6_auto_pay?.timeValidityDays ?? "",
        bookingValidity:
          subscriptData?.premium_6_auto_pay?.bookingValidity ?? "",
        maximumAutoPayLimit:
          subscriptData?.premium_6_auto_pay?.maximumAutoPayLimit ?? "",
        isThereLimitOnBookingToCharge:
          subscriptData?.premium_6_auto_pay?.isThereLimitOnBookingToCharge ??
          false,
        howManyBookingCharged:
          subscriptData?.premium_6_auto_pay?.howManyBookingCharged ?? "",
        bookingLimitRefersh:
          subscriptData?.premium_6_auto_pay?.bookingLimitRefersh ?? "24 hrs",
        anyBookingInitialFree:
          subscriptData?.premium_6_auto_pay?.anyBookingInitialFree ?? "",
        howManyBookingInitialFree:
          subscriptData?.premium_6_auto_pay?.howManyBookingInitialFree ?? "",
      },
    },

    validationSchema: Yup.object().shape({
      planName: Yup.string().required("!Required"),
      planValue: Yup.string().required("!Required"),
      tax: Yup.string().required("!Required"),
      isThereDiscount: Yup.bool(),
      discountPercentage: Yup.string().test({
        test: function (value) {
          const { isThereDiscount } = this.parent;
          if (isThereDiscount) {
            return !!value;
          }
          return true;
        },
        message: "!Required",
      }),
      isThereLimitOnBookingToCharge: Yup.bool(),
      howManyBookingCharged: Yup.string().test({
        test: function (value) {
          const { isThereLimitOnBookingToCharge } = this.parent;
          if (isThereLimitOnBookingToCharge) {
            return !!value;
          }
          return true;
        },
        message: "!Required",
      }),
      anyBookingInitialFree: Yup.bool(),
      howManyBookingInitialFree: Yup.string().test({
        test: function (value) {
          const { anyBookingInitialFree } = this.parent;
          if (anyBookingInitialFree) {
            return !!value;
          }
          return true;
        },
        message: "!Required",
      }),
      activateAutoRenewal: Yup.bool(),
      autoRenewalTitle: Yup.string().test({
        test: function (value) {
          const { activateAutoRenewal } = this.parent;
          if (activateAutoRenewal) {
            return !!value;
          }
          return true;
        },
        message: "!Required",
      }),
      auto_payment_details: Yup.object().shape({
        planValue: Yup.string().required("!Required"),
        tax: Yup.string().required("!Required"),
        maximumAutoPayLimit: Yup.string().required("!Required"),
        isThereDiscount: Yup.bool(),
        discountPercentage: Yup.string().test({
          test: function (value) {
            const { isThereDiscount } = this.parent;
            if (isThereDiscount) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        anyBookingInitialFree: Yup.bool(),
        howManyBookingInitialFree: Yup.string().test({
          test: function (value) {
            const { anyBookingInitialFree } = this.parent;
            if (anyBookingInitialFree) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        isThereLimitOnBookingToCharge: Yup.bool(),
        howManyBookingCharged: Yup.string().test({
          test: function (value) {
            const { isThereLimitOnBookingToCharge } = this.parent;
            if (isThereLimitOnBookingToCharge) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),
    }),

    onSubmit: (values) => {
      console.log(values, "formikvaluessasasasasas");
      handleSubscriptionPWShow();
    },
  });

  const formikPlan2 = useFormik({
    enableReinitialize: true,

    initialValues: {
      plan2: {
        planName: subscriptData?.premium_6_plan_details?.planName ?? "",
        planImage: subscriptData?.premium_6_plan_details?.planImage ?? null,
        planDescription:
          subscriptData?.premium_6_plan_details?.planDescription ?? [],
        activateAutoRenewal:
          subscriptData?.premium_6_plan_details?.activateAutoRenewal ?? false,
        autoRenewalDescription:
          subscriptData?.premium_6_plan_details?.autoRenewalDescription ?? [],
        autoRenewalTitle:
          subscriptData?.premium_6_plan_details?.autoRenewalTitle ?? "",
      },
      single_payment_details: {
        planValue: subscriptData?.premium_6_single_payment?.planValue ?? "",
        isThereDiscount:
          subscriptData?.premium_6_single_payment?.isThereDiscount ?? false,
        discountPercentage:
          subscriptData?.premium_6_single_payment?.discountPercentage ?? "",
        discountAmount:
          subscriptData?.premium_6_single_payment?.discountAmount ?? "",
        tax: subscriptData?.premium_6_single_payment?.tax ?? "",
        discountedTotalValueTaxAmount:
          subscriptData?.premium_6_single_payment
            ?.discountedTotalValueTaxAmount ?? "",
        totalPlanValueTaxAmount:
          subscriptData?.premium_6_single_payment?.totalPlanValueTaxAmount ??
          "",
        totalPlanValue:
          subscriptData?.premium_6_single_payment?.totalPlanValue ?? "",
        discountedTotalPlanValue:
          subscriptData?.premium_6_single_payment?.discountedTotalPlanValue ??
          "",
        validity: subscriptData?.premium_6_single_payment?.validity ?? "",
        timeValidityDays:
          subscriptData?.premium_6_single_payment?.timeValidityDays ?? "",
        bookingValidity:
          subscriptData?.premium_6_single_payment?.bookingValidity ?? "",
      },
      plan2_auto_payment_details: {
        planValue: subscriptData?.premium_6_auto_pay?.planValue ?? "",
        isThereDiscount:
          subscriptData?.premium_6_auto_pay?.isThereDiscount ?? false,
        discountPercentage:
          subscriptData?.premium_6_auto_pay?.discountPercentage ?? "",
        discountAmount: subscriptData?.premium_6_auto_pay?.discountAmount ?? "",
        tax: subscriptData?.premium_6_auto_pay?.tax ?? "",
        discountedTotalValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.discountedTotalValueTaxAmount ??
          "",
        totalPlanValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.totalPlanValueTaxAmount ?? "",
        totalPlanValue: subscriptData?.premium_6_auto_pay?.totalPlanValue ?? "",
        discountedTotalPlanValue:
          subscriptData?.premium_6_auto_pay?.discountedTotalPlanValue ?? "",
        validity: subscriptData?.premium_6_auto_pay?.validity,
        timeValidityDays:
          subscriptData?.premium_6_auto_pay?.timeValidityDays ?? "",
        bookingValidity:
          subscriptData?.premium_6_auto_pay?.bookingValidity ?? "",
        maximumAutoPayLimit:
          subscriptData?.premium_6_auto_pay?.maximumAutoPayLimit ?? "",
        howManyHourAutopayTriggered:
          subscriptData?.premium_6_auto_pay?.howManyHourAutopayTriggered ?? "",
        afterHowManyCompleteBookingAutopayTriggered:
          subscriptData?.premium_6_auto_pay
            ?.afterHowManyCompleteBookingAutopayTriggered ?? "",
      },
      cancelled_plan_details: {
        driverPAfterCancel:
          subscriptData?.premium_6_plan_cancellation?.driverPAfterCancel ?? "",
        refundIssuedIfPlanCancel:
          subscriptData?.premium_6_plan_cancellation
            ?.refundIssuedIfPlanCancel ?? false,
        zeroRidesCompletedPercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.zeroRidesCompletedPercentageRefund ?? "",
        cancelledAfterOneRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterOneRidePercentageRefund ?? "",
        cancelledAfterTwoRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterTwoRidePercentageRefund ?? "",
        cancelledAfterTwoOrMoreRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterTwoOrMoreRidePercentageRefund ?? "",
      },
      expired_plan_details: {
        driverPAfterExpiry:
          subscriptData?.premium_6_expiry_and_no_refund?.driverPAfterExpiry ??
          "",
        doesDriverGetRefundIfNoRideOrCompletedSome:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.doesDriverGetRefundIfNoRideOrCompletedSome ?? false,
        zeroRidesCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.zeroRidesCompletedPercentageRefund ?? "",
        oneRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.oneRideCompletedPercentageRefund ?? "",
        twoRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.twoRideCompletedPercentageRefund ?? "",
        moreThenTwoRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.moreThenTwoRideCompletedPercentageRefund ?? "",
      },
    },

    validationSchema: Yup.object().shape({
      plan2: Yup.object().shape({
        planName: Yup.string().required("!Required"),
        activateAutoRenewal: Yup.bool(),
        autoRenewalTitle: Yup.string().test({
          test: function (value) {
            const { activateAutoRenewal } = this.parent;
            if (activateAutoRenewal) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      single_payment_details: Yup.object().shape({
        planValue: Yup.string().required("!Required"),
        isThereDiscount: Yup.bool(),
        discountPercentage: Yup.string().test({
          test: function (value) {
            const { isThereDiscount } = this.parent;
            if (isThereDiscount) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        tax: Yup.string().required("!Required"),
        validity: Yup.string().required("!Required"),
        timeValidityDays: Yup.string().required("!Required"),
        bookingValidity: Yup.string().test({
          test: function (value) {
            const { validity } = this.parent;
            if (validity === "BookingsAndTime") {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      plan2_auto_payment_details: Yup.object().shape({
        planValue: Yup.string().required("!Required"),
        isThereDiscount: Yup.bool(),
        discountPercentage: Yup.string().test({
          test: function (value) {
            const { isThereDiscount } = this.parent;
            if (isThereDiscount) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        tax: Yup.string().required("!Required"),
        validity: Yup.string().required("!Required"),
        timeValidityDays: Yup.string().required("!Required"),
        bookingValidity: Yup.string().test({
          test: function (value) {
            const { validity } = this.parent;
            console.log(validity, "======================");

            if (validity === "BookingsAndTime") {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        maximumAutoPayLimit: Yup.string().required("!Required"),
        howManyHourAutopayTriggered: Yup.string().required("!Required"),
        afterHowManyCompleteBookingAutopayTriggered:
          Yup.string().required("!Required"),
      }),

      cancelled_plan_details: Yup.object().shape({
        driverPAfterCancel: Yup.string().required("!Required"),
        refundIssuedIfPlanCancel: Yup.bool(),
        zeroRidesCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterOneRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterTwoRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterTwoOrMoreRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      expired_plan_details: Yup.object().shape({
        driverPAfterExpiry: Yup.string().required("!Required"),
        doesDriverGetRefundIfNoRideOrCompletedSome: Yup.bool(),
        zeroRidesCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        oneRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        twoRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        moreThenTwoRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),
    }),

    onSubmit: (values) => {
      console.log(values, "formikvaluessasasasasas");
      handleSubscriptionPWShow();
    },
  });

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      plan3: {
        planName: subscriptData?.premium_6_plan_details?.planName ?? "",
        planImage: subscriptData?.premium_6_plan_details?.planImage ?? null,
        planDescription:
          subscriptData?.premium_6_plan_details?.planDescription ?? [],
        activateAutoRenewal:
          subscriptData?.premium_6_plan_details?.activateAutoRenewal ?? false,
        autoRenewalDescription:
          subscriptData?.premium_6_plan_details?.autoRenewalDescription ?? [],
        autoRenewalTitle:
          subscriptData?.premium_6_plan_details?.autoRenewalTitle ?? "",
      },
      plan3_single_payment_details: {
        planValue: subscriptData?.premium_6_single_payment?.planValue ?? "",
        isThereDiscount:
          subscriptData?.premium_6_single_payment?.isThereDiscount ?? false,
        discountPercentage:
          subscriptData?.premium_6_single_payment?.discountPercentage ?? "",
        discountAmount:
          subscriptData?.premium_6_single_payment?.discountAmount ?? "",
        tax: subscriptData?.premium_6_single_payment?.tax ?? "",
        discountedTotalValueTaxAmount:
          subscriptData?.premium_6_single_payment
            ?.discountedTotalValueTaxAmount ?? "",
        totalPlanValueTaxAmount:
          subscriptData?.premium_6_single_payment?.totalPlanValueTaxAmount ??
          "",
        totalPlanValue:
          subscriptData?.premium_6_single_payment?.totalPlanValue ?? "",
        discountedTotalPlanValue:
          subscriptData?.premium_6_single_payment?.discountedTotalPlanValue ??
          "",
        validity: subscriptData?.premium_6_single_payment?.validity ?? "",
        timeValidityDays:
          subscriptData?.premium_6_single_payment?.timeValidityDays ?? "",
        bookingValidity:
          subscriptData?.premium_6_single_payment?.bookingValidity ?? "",
      },
      plan3_auto_payment_details: {
        planValue: subscriptData?.premium_6_auto_pay?.planValue ?? "",
        isThereDiscount:
          subscriptData?.premium_6_auto_pay?.isThereDiscount ?? false,
        discountPercentage:
          subscriptData?.premium_6_auto_pay?.discountPercentage ?? "",
        discountAmount: subscriptData?.premium_6_auto_pay?.discountAmount ?? "",
        tax: subscriptData?.premium_6_auto_pay?.tax ?? "",
        discountedTotalValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.discountedTotalValueTaxAmount ??
          "",
        totalPlanValueTaxAmount:
          subscriptData?.premium_6_auto_pay?.totalPlanValueTaxAmount ?? "",
        totalPlanValue: subscriptData?.premium_6_auto_pay?.totalPlanValue ?? "",
        discountedTotalPlanValue:
          subscriptData?.premium_6_auto_pay?.discountedTotalPlanValue ?? "",
        validity: subscriptData?.premium_6_auto_pay?.validity,
        timeValidityDays:
          subscriptData?.premium_6_auto_pay?.timeValidityDays ?? "",
        bookingValidity:
          subscriptData?.premium_6_auto_pay?.bookingValidity ?? "",
        maximumAutoPayLimit:
          subscriptData?.premium_6_auto_pay?.maximumAutoPayLimit ?? "",
        isThereLimitOnBookingToCharge:
          subscriptData?.premium_6_auto_pay?.isThereLimitOnBookingToCharge ??
          false,
        howManyBookingCharged:
          subscriptData?.premium_6_auto_pay?.howManyBookingCharged ?? "",
        bookingLimitRefersh:
          subscriptData?.premium_6_auto_pay?.bookingLimitRefersh ?? "24 hrs",
        anyBookingInitialFree:
          subscriptData?.premium_6_auto_pay?.anyBookingInitialFree ?? "",
        howManyBookingInitialFree:
          subscriptData?.premium_6_auto_pay?.howManyBookingInitialFree ?? "",
        howManyHourAutopayTriggered:
          subscriptData?.premium_6_auto_pay?.howManyHourAutopayTriggered ?? "",
        afterHowManyCompleteBookingAutopayTriggered:
          subscriptData?.premium_6_auto_pay
            ?.afterHowManyCompleteBookingAutopayTriggered ?? "",
      },
      plan3_cancelled_plan_details: {
        driverPAfterCancel:
          subscriptData?.premium_6_plan_cancellation?.driverPAfterCancel ?? "",
        refundIssuedIfPlanCancel:
          subscriptData?.premium_6_plan_cancellation
            ?.refundIssuedIfPlanCancel ?? false,
        zeroRidesCompletedPercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.zeroRidesCompletedPercentageRefund ?? "",
        cancelledAfterOneRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterOneRidePercentageRefund ?? "",
        cancelledAfterTwoRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterTwoRidePercentageRefund ?? "",
        cancelledAfterTwoOrMoreRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterTwoOrMoreRidePercentageRefund ?? "",
        cancelledAfterThreeRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterThreeRidePercentageRefund ?? "",
        cancelledAfterThreerOrMoreRidePercentageRefund:
          subscriptData?.premium_6_plan_cancellation
            ?.cancelledAfterThreerOrMoreRidePercentageRefund ?? "",
      },
      plan3_expired_plan_details: {
        driverPAfterExpiry:
          subscriptData?.premium_6_expiry_and_no_refund?.driverPAfterExpiry ??
          "",
        doesDriverGetRefundIfNoRideOrCompletedSome:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.doesDriverGetRefundIfNoRideOrCompletedSome ?? false,
        zeroRidesCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.zeroRidesCompletedPercentageRefund ?? "",
        oneRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.oneRideCompletedPercentageRefund ?? "",
        twoRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.twoRideCompletedPercentageRefund ?? "",
        moreThenTwoRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.moreThenTwoRideCompletedPercentageRefund ?? "",
        threeRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.threeRideCompletedPercentageRefund ?? "",
        moreThenThreeRideCompletedPercentageRefund:
          subscriptData?.premium_6_expiry_and_no_refund
            ?.moreThenThreeRideCompletedPercentageRefund ?? "",
      },
    },

    validationSchema: Yup.object().shape({
      plan3: Yup.object().shape({
        planName: Yup.string().required("!Required"),
        activateAutoRenewal: Yup.bool(),
        autoRenewalTitle: Yup.string().test({
          test: function (value) {
            const { activateAutoRenewal } = this.parent;
            if (activateAutoRenewal) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      plan3_single_payment_details: Yup.object().shape({
        planValue: Yup.string().required("!Required"),
        isThereDiscount: Yup.bool(),
        discountPercentage: Yup.string().test({
          test: function (value) {
            const { isThereDiscount } = this.parent;
            if (isThereDiscount) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        tax: Yup.string().required("!Required"),
        validity: Yup.string().required("!Required"),
        timeValidityDays: Yup.string().required("!Required"),
        bookingValidity: Yup.string().test({
          test: function (value) {
            const { validity } = this.parent;
            if (validity === "BookingsAndTime") {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      plan3_auto_payment_details: Yup.object().shape({
        planValue: Yup.string().required("!Required"),
        isThereDiscount: Yup.bool(),
        discountPercentage: Yup.string().test({
          test: function (value) {
            const { isThereDiscount } = this.parent;
            if (isThereDiscount) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        tax: Yup.string().required("!Required"),
        validity: Yup.string().required("!Required"),
        timeValidityDays: Yup.string().required("!Required"),
        bookingValidity: Yup.string().test({
          test: function (value) {
            const { validity } = this.parent;
            console.log(validity, "======================");

            if (validity === "BookingsAndTime") {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        maximumAutoPayLimit: Yup.string().required("!Required"),
        howManyHourAutopayTriggered: Yup.string().required("!Required"),
        afterHowManyCompleteBookingAutopayTriggered:
          Yup.string().required("!Required"),
      }),

      plan3_cancelled_plan_details: Yup.object().shape({
        driverPAfterCancel: Yup.string().required("!Required"),
        refundIssuedIfPlanCancel: Yup.bool(),
        zeroRidesCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterOneRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterTwoRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterThreeRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        cancelledAfterThreerOrMoreRidePercentageRefund: Yup.string().test({
          test: function (value) {
            const { refundIssuedIfPlanCancel } = this.parent;
            console.log(refundIssuedIfPlanCancel, "======================");

            if (refundIssuedIfPlanCancel) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),

      plan3_expired_plan_details: Yup.object().shape({
        driverPAfterExpiry: Yup.string().required("!Required"),
        doesDriverGetRefundIfNoRideOrCompletedSome: Yup.bool(),
        zeroRidesCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        oneRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        twoRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        threeRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
        moreThenThreeRideCompletedPercentageRefund: Yup.string().test({
          test: function (value) {
            const { doesDriverGetRefundIfNoRideOrCompletedSome } = this.parent;
            if (doesDriverGetRefundIfNoRideOrCompletedSome) {
              return !!value;
            }
            return true;
          },
          message: "!Required",
        }),
      }),
    }),

    onSubmit: (values) => {
      console.log(values, "formikvaluessasasasasas");
      handleSubscriptionPWShow();
    },
  });
  const firstErrorField = Object.keys(formik.errors).find(
    (fieldName) => formik.touched[fieldName] && formik.errors[fieldName]
  );

  const handleplanDescriptionAddField = () => {
    const lastInputValue =
      formikPlan1?.values?.planDescription[
        formikPlan1?.values?.planDescription?.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formikPlan1.setFieldValue("planDescription", [
        ...formikPlan1.values.planDescription,
        "",
      ]);
    }
  };

  const handleplanDescriptionDeleteField = (index) => {
    const updatedFields = [...formikPlan1.values.planDescription];
    updatedFields.splice(index, 1);
    formikPlan1.setFieldValue("planDescription", updatedFields);
  };

  const handleplan2DescriptionAddField = () => {
    const lastInputValue =
      formikPlan2.values.plan2?.planDescription[
        formikPlan2.values.plan2?.planDescription.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formikPlan2.setFieldValue("plan2.planDescription", [
        ...formikPlan2.values.plan2?.planDescription,
        "",
      ]);
    }
  };

  const handleplan2DescriptionDeleteField = (index) => {
    const updatedFields = [...formikPlan2.values.plan2?.planDescription];
    updatedFields.splice(index, 1);
    formikPlan2.setFieldValue("plan2.planDescription", updatedFields);
  };

  const handleplan3DescriptionAddField = () => {
    const lastInputValue =
      formik.values.plan3?.planDescription[
        formik.values.plan3?.planDescription.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formik.setFieldValue("plan3.planDescription", [
        ...formik.values.plan3?.planDescription,
        "",
      ]);
    }
  };

  const handleplan3DescriptionDeleteField = (index) => {
    const updatedFields = [...formik.values.plan3?.planDescription];
    updatedFields.splice(index, 1);
    formik.setFieldValue("plan3.planDescription", updatedFields);
  };

  const handleRenewalAddField = () => {
    const lastInputValue =
      formikPlan2.values.plan2?.autoRenewalDescription[
        formikPlan2.values.plan2?.autoRenewalDescription.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formikPlan2.setFieldValue("plan2.autoRenewalDescription", [
        ...formikPlan2.values.plan2?.autoRenewalDescription,
        "",
      ]);
    }
  };

  const handleRenewalDeleteField = (index) => {
    const updatedFields = [...formikPlan2.values.plan2?.planDescription];
    updatedFields.splice(index, 1);
    formikPlan2.setFieldValue("plan2.autoRenewalDescription", updatedFields);
  };

  const handlePlan3RenewalAddField = () => {
    const lastInputValue =
      formik.values.plan3?.autoRenewalDescription[
        formik.values.plan3?.autoRenewalDescription.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formik.setFieldValue("plan3.autoRenewalDescription", [
        ...formik.values.plan3?.autoRenewalDescription,
        "",
      ]);
    }
  };

  const handlePlan3RenewalDeleteField = (index) => {
    const updatedFields = [...formik.values.plan3?.planDescription];
    updatedFields.splice(index, 1);
    formik.setFieldValue("plan3.autoRenewalDescription", updatedFields);
  };

  const handlerenewalDescriptionAddField = () => {
    const lastInputValue =
      formikPlan1.values.autoRenewalDescription[
        formikPlan1.values.autoRenewalDescription.length - 1
      ];
    if (lastInputValue?.trim() !== "") {
      formikPlan1.setFieldValue("autoRenewalDescription", [
        ...formikPlan1.values.autoRenewalDescription,
        "",
      ]);
    }
  };

  const handlerenewalDescriptionDeleteField = (index) => {
    const updatedFields = [...formikPlan1.values.autoRenewalDescription];
    updatedFields.splice(index, 1);
    formikPlan1.setFieldValue("autoRenewalDescription", updatedFields);
  };

  const [Disable, setDisable] = useState(null);

  useEffect(() => {
    let hasChanged = false;
    if (premiumSubactiveTab === "Plan1") {
      for (const key in formikPlan1.values) {
        if (
          formikPlan1.values.hasOwnProperty(key) &&
          formikPlan1.initialValues.hasOwnProperty(key)
        ) {
          if (formikPlan1.values[key] != formikPlan1.initialValues[key]) {
            hasChanged = true;
            break;
          }
        }
      }
    } else {
      for (const key in formik.values) {
        if (
          formik.values.hasOwnProperty(key) &&
          formik.initialValues.hasOwnProperty(key)
        ) {
          if (formik.values[key] != formik.initialValues[key]) {
            hasChanged = true;
            break;
          }
        }
      }
    }

    setDisable(!hasChanged);
  }, [formik.values]);

  return (
    <>
      <Premium6SubscriptionPasswordModal
        subscriptionPasswordModal={subscriptionPasswordModal}
        handleSubscriptionPWClose={handleSubscriptionPWClose}
        title={"Are you sure you want make changes ?"}
        reload={reload}
        setReload={setReload}
        formik={
          premiumSubactiveTab === "Plan1"
            ? formikPlan1
            : premiumSubactiveTab === "Plan2"
            ? formikPlan2
            : premiumSubactiveTab === "Plan3" && formik
        }
        params={params}
        plan_type={subscriptData?.plan_type}
        premiumtype={premiumtype}
        setIsEditing={setIsEditing}
        premiumSubactiveTab={premiumSubactiveTab}
      />
      <DetailsPremiumPasswordModal
        detailsPremiumPasswordModal={statusChangeShow}
        handleDetailsPremiumPWClose={handleStatusChangeClose}
        title={`${
          premiumtype === "Premium5"
            ? `${
                statusValue
                  ? "Are you sure you want to disable Premium-5?"
                  : "Are you sure you want to enable Premium-5?"
              }`
            : premiumtype === "Premium4"
            ? `${
                statusValue
                  ? "Are you sure you want to disable Premium-4?"
                  : "Are you sure you want to enable Premium-4?"
              }`
            : premiumtype === "Premium6" &&
              `${
                statusValue
                  ? "Are you sure you want to disable Premium-6?"
                  : "Are you sure you want to enable Premium-6?"
              }`
        }`}
        type={"statusChange"}
        premiumtype={premiumtype}
        rideTypeId={params?.ride_type_id}
        zoneId={params?.zoneId}
        managePremiumType={managePremiumType}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
        reload={reload}
        setReload={setReload}
        premiumSubactiveTab={premiumSubactiveTab}
        params={params}
      />
      <PremiumLeavePlanModal
        leavePageShow={leavePageShow}
        handleLeavePageClose={handleLeavePageClose}
        // link={-1}
        onClickFn={() => {
          handleCancel();
          premiumSubactiveTab === "Plan1"
            ? formikPlan1?.resetForm()
            : premiumSubactiveTab === "Plan2"
            ? formikPlan2.resetForm()
            : premiumSubactiveTab === "Plan3" && formik.resetForm();
          handleLeavePageClose();
        }}
        subsection={true}
      />
      <InnerLayout
        mainHeading=""
        navigateEnable={false}
        layoutClassname="inner_layout_container"
      >
        <div className="premium_sub_layout">
          <div className="sub_border_bottom">
            {subscriptionSubHead.map((item) => {
              return (
                <>
                  <label
                    key={item.label}
                    className={`px-4  mt-3 pb-1  fs_16 ${subscriptionSubHeadFunc(
                      item.value
                    )}`}
                    onClick={() => {
                      premiumSubactiveTab === "Plan1"
                        ? formikPlan1?.initialValues !== formikPlan1?.values
                          ? handleLeavePageShow()
                          : setPremiumSubActiveTab(item.value)
                        : premiumSubactiveTab === "Plan2"
                        ? formikPlan2?.initialValues !== formikPlan2?.values
                          ? handleLeavePageShow()
                          : setPremiumSubActiveTab(item.value)
                        : premiumSubactiveTab === "Plan3" &&
                          formik?.initialValues !== formik?.values
                        ? handleLeavePageShow()
                        : setPremiumSubActiveTab(item.value);
                    }}
                  >
                    {" "}
                    {item.label}
                  </label>
                </>
              );
            })}
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-end my-1">
              {action === "view" ? null : (
                <>
                  <div>
                    {!isEditing ? (
                      <>
                        <button
                          className="border-0 primary_bg white_color px-3 fs_15 border_radius_5px mt-1 p-1"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                      </>
                    ) : (
                      <div className="d-flex justify-content-end">
                        <div>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <div className="d-flex align-items-center me-2">
                              <span
                                className={
                                  statusValue
                                    ? "disabled_color fs_14 fw_600 ms-1"
                                    : "red_color fs_14 fw_500 ms-1"
                                }
                              >
                                Disable
                              </span>

                              <Switch
                                onChange={handleStatusChangeShow}
                                checked={statusValue}
                                offColor="#F600003"
                                offHandleColor="#ed0b0b"
                                onColor="#00AB2E"
                                onHandleColor="#00ab2e"
                                handleDiameter={25}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="none"
                                activeBoxShadow="none"
                                height={13}
                                width={43}
                                className="react-switch MuiSwitch-colorSecondary"
                                id="material-switch"
                                disabled={premiumtype != "Premium6" && true}
                                // disabled={action === "view" && true}
                              />
                              <span
                                className={
                                  statusValue
                                    ? "green_color fs_14 fw_500 ms-1"
                                    : "disabled_color fs_14 fw_600 ms-1"
                                }
                              >
                                Enable
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            {premiumSubactiveTab === "Plan1" ? (
              <>
                <div className="ps-4 ">
                  <Premium6SubPlanDetails
                    isEditing={isEditing}
                    formik={formikPlan1}
                    premiumSubactiveTab={premiumSubactiveTab}
                    params={params}
                    planDescNum={planDescNum}
                    setPlanDescNum={setPlanDescNum}
                    handleplanDescriptionAddField={
                      handleplanDescriptionAddField
                    }
                    handleplanDescriptionDeleteField={
                      handleplanDescriptionDeleteField
                    }
                    handlerenewalDescriptionAddField={
                      handlerenewalDescriptionAddField
                    }
                    handlerenewalDescriptionDeleteField={
                      handlerenewalDescriptionDeleteField
                    }
                    setFrontImageLink={setFrontImageLink}
                    frontImageLink={frontImageLink}
                    subscriptData={subscriptData}
                  />
                </div>
                <div className="d-flex">
                  <div className="ps-4 mt-3">
                    <Premium6CreditMode
                      isEditing={isEditing}
                      formik={formikPlan1}
                      params={params}
                      subscriptData={subscriptData}
                      premiumSubactiveTab={premiumSubactiveTab}
                    />
                  </div>
                  <div className="ps-4 mt-3">
                    <Premium6AutoPayMode
                      isEditing={isEditing}
                      formik={formikPlan1}
                      params={params}
                      subscriptData={subscriptData}
                      premiumSubactiveTab={premiumSubactiveTab}
                    />
                  </div>
                </div>
              </>
            ) : premiumSubactiveTab === "Plan2" ? (
              <>
                <div className="ps-4 ">
                  <Premium6Plan2SubPlanDetails
                    isEditing={isEditing}
                    formik={formikPlan2}
                    premiumSubactiveTab={premiumSubactiveTab}
                    params={params}
                    planDescNum={planDescNum}
                    setPlanDescNum={setPlanDescNum}
                    handleAddField={handleplan2DescriptionAddField}
                    handleDeleteField={handleplan2DescriptionDeleteField}
                    handleRenewalDeleteField={handleRenewalDeleteField}
                    handleRenewalAddField={handleRenewalAddField}
                    setFrontImageLink={setPlan2ImageLink}
                    frontImageLink={plan2ImageLink}
                  />
                </div>
                <div className="d-flex">
                  <div className="ps-4 mt-3 col-xl-6">
                    <Premium6Plan2SinglePaymentMode
                      isEditing={isEditing}
                      formik={formikPlan2}
                      params={params}
                      subscriptData={subscriptData}
                      premiumSubactiveTab={premiumSubactiveTab}
                    />
                  </div>
                  <div className="ps-4 mt-3">
                    <Premium6Plan2AutoPayMode
                      isEditing={isEditing}
                      formik={formikPlan2}
                      params={params}
                      subscriptData={subscriptData}
                      premiumSubactiveTab={premiumSubactiveTab}
                    />
                  </div>
                </div>
                <hr />
                <div className="ps-4 mt-3">
                  <Premium6PlanCancellation
                    isEditing={isEditing}
                    formik={formikPlan2}
                    params={params}
                    subscriptData={subscriptData}
                  />
                </div>
                <hr />
                <div className="ps-4 mt-3">
                  <Premium6ExpiryNoRideRefund
                    isEditing={isEditing}
                    formik={formikPlan2}
                    subscriptData={subscriptData}
                    params={params}
                  />
                </div>
              </>
            ) : (
              premiumSubactiveTab === "Plan3" && (
                <>
                  <div className="ps-4 ">
                    <Premium6Plan3SubPlanDetails
                      isEditing={isEditing}
                      formik={formik}
                      premiumSubactiveTab={premiumSubactiveTab}
                      params={params}
                      planDescNum={planDescNum}
                      setPlanDescNum={setPlanDescNum}
                      handleAddField={handleplan3DescriptionAddField}
                      handleDeleteField={handleplan3DescriptionDeleteField}
                      handleRenewalDeleteField={handlePlan3RenewalDeleteField}
                      handleRenewalAddField={handlePlan3RenewalAddField}
                      setFrontImageLink={setPlan3ImageLink}
                      frontImageLink={plan3ImageLink}
                    />
                  </div>
                  <div className="d-flex">
                    <div className="ps-4 mt-3 col-xl-6">
                      <Premium6Plan3SinglePaymentMode
                        isEditing={isEditing}
                        formik={formik}
                        params={params}
                        subscriptData={subscriptData}
                        premiumSubactiveTab={premiumSubactiveTab}
                      />
                    </div>
                    <div className="ps-4 mt-3">
                      <Premium6Plan3AutoPayMode
                        isEditing={isEditing}
                        formik={formik}
                        params={params}
                        subscriptData={subscriptData}
                        premiumSubactiveTab={premiumSubactiveTab}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="ps-4 mt-3">
                    <Premium6Plan3Cancellation
                      isEditing={isEditing}
                      formik={formik}
                      params={params}
                    />
                  </div>
                  <hr />
                  <div className="ps-4 mt-3">
                    <Premium6Plan3ExpiryNoRideRefund
                      isEditing={isEditing}
                      formik={formik}
                      params={params}
                    />
                  </div>
                </>
              )
            )}
            {isEditing ? (
              <>
                <div className="d-flex justify-content-end gap-3">
                  <Cancelbtn
                    cancelFn={() => {
                      handleCancel();
                    }}
                  />
                  <button
                    className="white_bg border_radius_5px px-2 undo_change_btn fw_600 mb-2 mb-sm-0"
                    type="reset"
                    onClick={() => {
                      formik.resetForm();
                    }}
                  >
                    <span className="d-flex align-items-center red_color px-4 fs_14">
                      <i className="ri-close-circle-fill red_color pe-1"></i>
                      Reset
                    </span>
                  </button>
                  <button
                    className="border_none green_color_bg white_color px-5  py-2 border_radius_5px fw_600 fs_14 mb-2 mb-sm-0"
                    type="submit"
                    onClick={formik.handleSubmit}
                    disabled={Disable}
                  >
                    Update
                  </button>
                </div>
              </>
            ) : null}
          </form>
        </div>
      </InnerLayout>
    </>
  );
};

export default Premium6Subscription;
