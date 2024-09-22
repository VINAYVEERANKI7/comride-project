import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalHeading from "../../utilits/buttons/modal-header";
import eyeOn from "../../../assets/icons/eye-on.svg";
import eyeOff from "../../../assets/icons/eye-off.svg";
import errorToast from "../../utilits/errorToast";
import successToast from "../../utilits/successToast";
import { useDispatch } from "react-redux";
import Cancelbtn from "../../utilits/buttons/cancelbtn";
import SpinnerLoading from "../../utilits/spinnerLoading";
import * as driverAction from "../../../redux/actions/manageDriversAction";
import SuccessMessagemodal from "../../modals/successMessageModal";
import { useNavigate } from "react-router";

const RejectDocumnetPasswordModal = ({
  passwordShow,
  handlePasswordClose,
  driverDetails,
  mainType,
  rejectType,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = window?.location?.pathname;
  const mainPagePath = "/" + currentPath?.split("/")[1];

  console.log(mainPagePath, "mainPagePath");
  const [errorMessage, setErrorMessage] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessageShow, setSuccessMessageShow] = useState(false);
  const handleSuccessMessageShow = () => setSuccessMessageShow(true);

  const handleSuccessMessageClose = () => {
    setSuccessMessageShow(false);
    navigate(`${mainPagePath}`);
  };

  const formikPass = useFormik({
    enableReinitialize: true,
    initialValues: {
      ConfirmPassword: ``,
      reason: ``,
      addressproof_rejected_reason: "",
      vehiclerc_rejected_reason: "",
      vehicleinsurance_rejected_reason: "",
      drivinglicense_rejected_reason: "",
      profilepic_rejected_reason: "",
      vehiclephotos_rejected_reason: "",
      background_verification_rejected_reason: "",
      physical_verification_rejected_reason: "",
    },
    validationSchema: Yup.object({
      // ConfirmPassword: Yup.string().trim().required(),
      // reason: Yup.string().required("Please fill this field to Proceed"),
      // Yup.string().when("is_reason", {
      //   is: true,
      //   then: Yup.string().required("Please fill this field to Proceed"),
      //   otherwise: Yup.string(),
      // }),
    }),

    onSubmit: (values) => {
      console.log(values);
      dispatch(
        driverAction.RejectDriverAction(
          {
            driver_id: driverDetails?.id,
            password: values.ConfirmPassword,
            addressproof_rejected_reason:
              rejectType === "addressProof"
                ? values?.addressproof_rejected_reason
                : "",
            drivinglicense_rejected_reason:
              rejectType === "drivingLicense"
                ? values?.drivinglicense_rejected_reason
                : "",
            profilepic_rejected_reason:
              rejectType === "profilePhoto"
                ? values?.profilepic_rejected_reason
                : "",
            vehicleinsurance_rejected_reason:
              rejectType === "vehicleInsurance"
                ? values?.vehicleinsurance_rejected_reason
                : "",
            vehiclerc_rejected_reason:
              rejectType === "vehicleRc"
                ? values?.vehiclerc_rejected_reason
                : "",
            vehiclephotos_rejected_reason:
              rejectType === "vehiclePhoto" ? values?.rejectType : "",
          },
          onSuccess,
          onError
        )
      );
    },
  });

  const onSuccess = (data) => {
    successToast(data?.data);
    setLoading(false);
    handlePasswordClose();
    handleSuccessMessageShow();
  };
  const onError = (data) => {
    // errorToast(data?.data);
    // setLoading(false);
    // if (passwordObject?.type === "unblock_driver") {
    //   errorToast(data?.data?.message);
    //   setErrorMessage(data?.data?.data);
    // } else {
    //   errorToast(data?.data);
    //   setErrorMessage(data?.data);
    // }
  };

  return (
    <>
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={passwordShow}
        onHide={handlePasswordClose}
        dialogClassName="admin_block_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <ModalHeading
            title={"Password"}
            statusShow={false}
            closeFn={() => {
              handlePasswordClose();
              // formik?.resetForm();
            }}
          />
          <form onSubmit={formikPass.handleSubmit}>
            <div className="d-flex justify-content-center mb-3">
              <div className="d-flex flex-column">
                <span className="primary_color fw_600">
                  Driver ID:
                  <span className="ps-5 ms-3 secondary_color fw_600">
                    {driverDetails?.driver_id2
                      ? driverDetails?.driver_id2
                      : "--"}
                  </span>
                </span>
                <span className="primary_color fw_600 ">
                  Driver First Name:
                  <span className="secondary_color fw_600 ps-1">
                    {driverDetails?.first_name
                      ? driverDetails?.first_name
                      : "--"}
                  </span>
                </span>
              </div>
            </div>
            <div>
              <div>
                <label
                  className={
                    (formikPass.errors.ConfirmPassword &&
                      formikPass.touched.ConfirmPassword) ||
                    errorMessage
                      ? `fs_16 fw_500 mb-1 mt-2 red_color`
                      : `fs_16 fw_500 mb-1 mt-2 primary_color`
                  }
                >
                  Password
                </label>
                <div className="mb-3">
                  <div className="d-flex position-relative ">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className={
                        (formikPass.errors.ConfirmPassword &&
                          formikPass.touched.ConfirmPassword) ||
                        errorMessage
                          ? ` password_error input_text_holder background_none w-100 border_radius_3px py-1 outline_none ps-2`
                          : `background_none input_text_holder w-100 border_radius_3px py-1 password_input outline_none ps-2`
                      }
                      placeholder={"Enter password"}
                      name={"ConfirmPassword"}
                      // id={itemName}
                      value={formikPass.values.ConfirmPassword}
                      onChange={(e) => {
                        formikPass.handleChange(e);
                        setErrorMessage(false);
                      }}
                      onBlur={formikPass.handleBlur}
                      autoComplete={"off"}
                      // autoFocus={true}
                    />
                    <div className="restore_password_visible cursor_pointer">
                      <img
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        src={passwordVisible ? eyeOn : eyeOff}
                        alt="password visibility on or off"
                      />
                    </div>
                  </div>
                  {formikPass.errors.ConfirmPassword &&
                    formikPass.touched.ConfirmPassword(
                      <span className="red_color fw_500 fs_14">
                        {formikPass.errors.ConfirmPassword}
                      </span>
                    )}
                </div>
              </div>
              <div>
                <span className="d-flex justify-content-between">
                  <label
                    className={
                      formikPass.errors.reason && formikPass.touched.reason
                        ? `fs_16 fw_500 mb-1 red_color`
                        : `fs_16 fw_500 mb-1 primary_color`
                    }
                  >
                    Reason
                  </label>
                  <span
                    className={`${
                      count === 160 ? "red_color" : "primary_color"
                    }   text-end`}
                  >
                    ({count}/160) characters
                  </span>
                </span>

                <textarea
                  type="text"
                  className={
                    formikPass.errors.reason && formikPass.touched.reason
                      ? `error_border background_none w-100 border_radius_3px py-lg-1 py-sm-2 outline_none ps-2 block_text_area input_text_holder resize_none`
                      : `background_none w-100 border_radius_3px py-lg-1 py-sm-2 password_input outline_none ps-2 block_text_area input_text_holder resize_none`
                  }
                  placeholder={"Enter the reason"}
                  name={
                    rejectType === "addressProof"
                      ? "addressproof_rejected_reason"
                      : rejectType === "drivingLicense"
                      ? "drivinglicense_rejected_reason"
                      : rejectType === "profilePhoto"
                      ? "profilepic_rejected_reason"
                      : rejectType === "vehicleInsurance"
                      ? "vehicleinsurance_rejected_reason"
                      : rejectType === "vehicleRc"
                      ? "vehiclerc_rejected_reason"
                      : rejectType === "vehiclePhoto"
                      ? "vehiclephotos_rejected_reason"
                      : "rejected_reason"
                  }
                  id={"reason"}
                  onChange={(e) => {
                    formikPass.handleChange(e);
                    setCount(e.target.value.length);
                  }}
                  onBlur={formikPass.handleBlur}
                  maxLength="160"
                  autoFocus={true}
                />
                {formikPass.errors.reason && formikPass.touched.reason && (
                  <div className="red_color fs_14 fw_500">
                    {formikPass.errors.reason}
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between mt-3 px-lg-5 px-md-5 mb-3 ">
                <Cancelbtn
                  cancelFn={() => {
                    handlePasswordClose();
                    formikPass.resetForm();
                    setErrorMessage(false);
                  }}
                />
                <button
                  onClick={() => console.log("clicked")}
                  className=" primary_bg border_radius_5px px-4 py-1 text-center border_none fs_18 white_color"
                  type="sumbit"
                >
                  {loading ? <SpinnerLoading /> : "Proceed"}
                </button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={handleSuccessMessageClose}
        title={`Rejected Successfully`}
      />
    </>
  );
};

export default RejectDocumnetPasswordModal;
