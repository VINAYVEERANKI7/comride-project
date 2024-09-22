import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInputField from "../../form/passwordInputField";
import { useDispatch } from "react-redux";
import SpinnerLoading from "../../utilits/spinnerLoading";
import SuccessMessagemodal from "../../modals/successMessageModal";

import errorToast from "../../utilits/errorToast";
import {
  defaultPremiumDuedepositEditAction,
  defaultPremiumPricingModuleEditAction,
  managePremiumPricingModuleEditAction,
  managePremiumDuedepositEditAction,
  managePremiumStatusUpdateAction,
  managePremium6DuesEditAction,
} from "../../../redux/actions/premiumaction/defaultPremiumAction";
import Cancelbtn from "../../utilits/buttons/cancelbtn";

const Premium6DuesDetailsPasswdModal = ({
  detailsPremiumPasswordModal,
  handleDetailsPremiumPWClose,
  title,
  formik,
  params,
  premiumtype,
  bookingType,
  id,
  reload,
  setReload,
  moduleType,
  setIsEditing,
  type = "",
  cashOutRequest,
  managePremiumType,
  rideTypeId = "",
  zoneId = "",
  statusValue,
  setStatusValue,
}) => {
  console.log(statusValue, "ksjhkasdas");
  console.log(formik.values, "dues");
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    formikCreatePass.resetForm();
    setReload(!reload);
  };
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const formikCreatePass = useFormik({
    initialValues: {
      password: ``,
    },
    validationSchema: Yup.object({
      password: Yup.string().trim(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("kajhksjd");
      console.log(values);
      if (managePremiumType === "defaultPremium") {
        setLoading(true);
        dispatch(
          defaultPremiumDuedepositEditAction(
            {
              premium_type: premiumtype,
              type: "Dues",
              password: values?.password,
              due_details: {
                CBDueAmount: formik.values.due_details.CBDueAmount,
                DisableRidesIfCBNegative:
                  formik.values.due_details.DisableRidesIfCBNegative,
                CBBalanceAmount:
                  formik.values.due_details.DisableRidesIfCBNegative === true
                    ? formik.values.due_details.CBBalanceAmount
                    : null,
                NumberOfDays:
                  formik.values.due_details.DisableRidesIfCBNegative === true
                    ? formik.values.due_details.NumberOfDays
                    : null,
              },
            },
            { ride_type_id: params?.ride_type_id },
            onEditSuccess,
            onEditError
          )
        );
      } else if (managePremiumType === "managePremium") {
        setLoading(true);
        dispatch(
          managePremium6DuesEditAction(
            {
              premium_type: premiumtype,
              type: "Dues",
              password: values?.password,
              due_details: {
                CBDueAmount: formik.values.due_details.CBDueAmount,
                DisableRidesIfCBNegative:
                  formik.values.due_details.DisableRidesIfCBNegative,
                CBBalanceAmount:
                  formik.values.due_details.DisableRidesIfCBNegative === true
                    ? formik.values.due_details.CBBalanceAmount
                    : null,
                NumberOfDays:
                  formik.values.due_details.DisableRidesIfCBNegative === true
                    ? formik.values.due_details.NumberOfDays
                    : null,
              },
            },
            params?.ride_type_id,
            onStatusSuccess,
            onStatusError
          )
        );
      }
    },
  });

  const onEditSuccess = (data) => {
    formikCreatePass.resetForm();
    setLoading(false);
    handleDetailsPremiumPWClose();
    handleSuccessMessageShow();
    setReload(!reload);
    setIsEditing(false);
    console.log(data, "askjjdbakjsdata");
    setError(false);
  };

  const onEditError = (data) => {
    setLoading(false);
    console.log(data, "askjjdbakjsd");
    errorToast(data?.data?.message);
    setError(data?.data?.message);
  };

  const onStatusSuccess = (data) => {
    formikCreatePass.resetForm();
    setLoading(false);
    handleDetailsPremiumPWClose();
    handleSuccessMessageShow();
    // setReload(!reload);
    setError(false);
    setStatusValue(!statusValue);
  };
  const onStatusError = (data) => {
    setLoading(false);
    errorToast(data?.data?.message);
    setError(data?.data?.message);
  };

  return (
    <>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={
          type === "statusChange"
            ? `${
                premiumtype === "Premium5"
                  ? `${
                      statusValue
                        ? "Premium-5 enabled successfully!"
                        : "Premium-5 disabled successfully!"
                    }`
                  : `${
                      statusValue
                        ? "Premium-4 enabled successfully!"
                        : "Premium-4 disabled successfully!"
                    }`
              }`
            : "Changes made Successfully"
        }
      />
      <Modal
        centered
        show={detailsPremiumPasswordModal}
        onHide={handleDetailsPremiumPWClose}
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
                    handleDetailsPremiumPWClose();
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

export default Premium6DuesDetailsPasswdModal;
