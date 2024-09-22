import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInputField from "../../components/form/passwordInputField";
import Cancelbtn from "../../components/utilits/buttons/cancelbtn";
import SpinnerLoading from "../../components/utilits/spinnerLoading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ErrorMessagemodal from "../../components/modals/errorMessageModal";
import SuccessMessagemodal from "../../components/modals/successMessageModal";
import { deleteRideTypeAction } from "../../redux/actions/rideTypeAction";

const DeletePasswordModal = ({
  Passwordshow,
  handlePasswordClose,
  title_color = "primary_color",
  id,
  ridetypeclose,
  setAdminTable,
  adminTable,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMessageShow, setSuccessMessageShow] = useState(false);

  const formikUpdatePass = useFormik({
    initialValues: {
      ConfirmPassword: "",
    },
    validationSchema: Yup.object({
      ConfirmPassword: Yup.string().trim().required(),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);

      dispatch(
        deleteRideTypeAction(
          {
            ride_type_id: id,
            password: values?.ConfirmPassword,
          },
          onSubmitSuccess,
          onSubmitError
        )
      );
    },
  });

  const onSubmitSuccess = () => {
    handlePasswordClose();
    ridetypeclose();
    setSuccessMessageShow(true);
    setLoading(false);
    formikUpdatePass?.resetForm();
  };
  const onSubmitError = () => {
    setLoading(false);
  };

  return (
    <div>
      <SuccessMessagemodal
        successMessageShow={successMessageShow}
        handleSuccessMessageClose={() => {
          setSuccessMessageShow(false);
          setAdminTable(!adminTable);
        }}
        title={"Ride type deleted Successfully"}
        title_color={"red_color"}
        subsection={false}
      />
      <Modal
        centered
        backdrop={"static"}
        keyboard={false}
        show={Passwordshow}
        onHide={handlePasswordClose}
        dialogClassName="change_update_password_container"
        contentClassName="change_update_password_card"
        backdropClassName="create_password_modal_backdrop"
      >
        <Modal.Body>
          <div className="px-sm-4">
            <form onSubmit={formikUpdatePass.handleSubmit}>
              <div className="d-flex justify-content-center flex-column align-items-center mb-3">
                <span className={`fs_21  fw_600 text-center`}>
                  Are you sure you want to delete this ride type?
                </span>
              </div>
              <PasswordInputField
                itemName={"ConfirmPassword"}
                inputValue={formikUpdatePass.values.ConfirmPassword}
                onChangeFn={(e) => {
                  formikUpdatePass.handleChange(e);
                  setError(false);
                }}
                onBlurFn={formikUpdatePass.handleBlur}
                formikError={formikUpdatePass.errors.ConfirmPassword}
                formikTouched={formikUpdatePass.touched.ConfirmPassword}
                error={error}
              />
              <div className="red_color fw_500 ms-sm-5">
                <span>{error}</span>
              </div>
              <div className="d-flex justify-content-sm-between justify-content-center gap-sm-0 gap-3 mt-4 px-sm-5 mb-3">
                <Cancelbtn
                  cancelFn={() => {
                    handlePasswordClose();
                    setLoading(false);
                    setError(false);
                    formikUpdatePass?.resetForm();
                  }}
                />
                <button
                  className=" primary_bg border_radius_5px px-4 py-1 border_none"
                  type="sumbit"
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerLoading />
                  ) : (
                    <span className=" fs_18 white_color ps-2">Proceed</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DeletePasswordModal;
