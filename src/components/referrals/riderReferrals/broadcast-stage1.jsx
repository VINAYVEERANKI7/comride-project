import React from "react";
import { useState } from "react";
import CouponCheckboxField from "../../form/couponCheckboxField";
import DraftMessageInput from "../../form/draftMessageInput";
import CouponDetails from "../../coupons/riderCoupons/coupondetails";

const ReferralBroadcastStage1 = ({
  formik,
  is_editable,
  referralBackendData,
  type = "",
  currentReferralData,
  driverreferral,
  riderreferral,
}) => {
  const [referralDetails, setReferralDetails] = useState(false);
  return (
    <>
      <div className="discount_detials_container mt-2 px-3 p-2 pb-3">
        <div className=" d-flex justify-content-between position-relative">
          <div className=" primary_color fs_18 fw_500 text_underline">
            Stage 1 :
          </div>
          {riderreferral === "riderreferral" ? (
            <>
              {type !== "createRiderReferral" ? (
                <>
                  <div
                    className="position-absolute end-0 mt-1 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                    onClick={() => setReferralDetails(!referralDetails)}
                  >
                    More Details
                  </div>
                  {referralDetails ? (
                    <>
                      <div className="coupon_details_block border white_bg border_radius">
                        <CouponDetails item={referralBackendData} />
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : driverreferral === "driverreferral" ? (
            <>
              {type !== "createDriverReferral" ? (
                <>
                  <div
                    className="position-absolute end-0 mt-1 light_blue_color text_underline fs_14 fw_500 cursor_pointer"
                    onClick={() => setReferralDetails(!referralDetails)}
                  >
                    More Details
                  </div>
                  {referralDetails ? (
                    <>
                      <div className="coupon_details_block border white_bg border_radius">
                        <CouponDetails item={currentReferralData} />
                      </div>
                    </>
                  ) : null}
                </>
              ) : null}
            </>
          ) : null}
        </div>
        <CouponCheckboxField
          formikError={formik.errors.receiverDraftMessage}
          formikTouched={formik.touched.receiverDraftMessage}
          itemName="receiverDraftMessage"
          onChangeFn={formik.handleChange}
          labelName="Receiver Draft Message"
          formikValue={formik.values.receiverDraftMessage}
          formik={formik}
          labelColor={
            formik.values.receiverDraftMessage === true ? true : false
          }
          disabled={is_editable === false ? true : false}
        />
        <div className="ps-4 pe-3">
          <DraftMessageInput
            labelName="Draft Message Title*"
            itemName={"draftMessageTitle"}
            formik={formik}
            formikValue={formik.values.draftMessageTitle}
            formikError={formik.errors.draftMessageTitle}
            formikTouched={formik.touched.draftMessageTitle}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
            }
            is_input={true}
          />

          <DraftMessageInput
            labelName="Draft Message Body1*"
            itemName={"draftMessageBody1"}
            formik={formik}
            formikValue={formik.values.draftMessageBody1}
            formikError={formik.errors.draftMessageBody1}
            formikTouched={formik.touched.draftMessageBody1}
            onBlurFn={formik.handleBlur}
            disabled={
              is_editable === false ||
              formik?.values?.receiverDraftMessage === false
            }
          />
        </div>
      </div>
    </>
  );
};

export default ReferralBroadcastStage1;
