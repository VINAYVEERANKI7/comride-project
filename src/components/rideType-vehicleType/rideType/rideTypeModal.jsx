import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../rideType-vehicleTypeComponents.css";
import { rideTypeStyles } from "../../mui-styles/mui-styles";
import { useFormik } from "formik";
import * as yup from "yup";
import Savebtn from "../../utilits/buttons/savebtn";
import RideTypePasswordModal from "./passwordModal";
import { useDispatch } from "react-redux";
import {
  rideTypeViewAction,
  rideTypeZoneListAction,
} from "../../../redux/actions/rideTypeAction";
import { uploadImageRideTypeAction } from "../../../redux/actions/imageUploadAction";
import errorToast from "../../utilits/errorToast";
import SpinnerLoading from "../../utilits/spinnerLoading";
import RideTypeDetails from "../rideType-details";
import RideTypeZoneModal from "./rideTypeZoneModal";
import CloseIcon from "../../../assets/icons/close-icon";
import LeavePagemodal from "../../modals/leaveModal";
import ImageUploadModal from "../../modals/image-upload-modal";
import { Spinner } from "react-bootstrap";
import DeletePasswordModal from "../../../modules/rideTypes-vehicleTypes/delete-password-modal";

const RideTypeModal = ({
  rideTypeModal,
  handleRideTypeModalClose,
  adminTable,
  setAdminTable,
  type,
  rideTypeID,
  setRideTypeView,
  rideTypeView,
  setDetailsRideType,
  detailsRideType,
  isCreating,
}) => {
  console.log(rideTypeView, "rideTypeView");

  const [photoUrl, setPhotoUrl] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [zoneLoading, setZoneLoading] = useState(false);
  const [zoneEditable, setZoneEditable] = useState(false);
  const [leavePageShow, setLeavePageShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setZoneLoading(true);
    dispatch(rideTypeZoneListAction(onSuccess, onError));
  }, []);

  const onSuccess = (data) => {
    setZoneLoading(false);
    setZoneList(data?.data);
  };
  const onError = (data) => {
    setZoneLoading(false);
    console.log(data?.data);
  };

  const RideTypeZone = Object?.values(zoneList)?.map((item) => {
    return {
      value: item?.id,
      label: item?.zone_name,
      status: item?.zone_status,
    };
  });
  const [search, setSearch] = useState("");

  const filteredRideTypeZone = search
    ? RideTypeZone?.filter((item) =>
        item.label.toLowerCase()?.includes(search.toLowerCase())
      )
    : RideTypeZone;

  const [rideTypePasswordModal, setRideTypePasswordModal] = useState(false);
  const handleRideTypePassWordClose = () => setRideTypePasswordModal(false);
  const handleRideTypePasswordModal = () => setRideTypePasswordModal(true);

  const [rideTypeZoneModal, setRideTypeZoneModal] = useState(false);
  const handleRideTypeZoneClose = () => setRideTypeZoneModal(false);
  const handleRideTypeZoneShow = () => setRideTypeZoneModal(true);

  const [imageModalShow, setImageModalShow] = useState(false);

  const [findoneLoading, setFindoneLoading] = useState(false);
  useEffect(() => {
    if (type === "viewRideType" || type === "editRideType") {
      setFindoneLoading(true);
      dispatch(
        rideTypeViewAction(
          {
            ride_type_id: rideTypeID,
          },

          onFetchSuccess,
          onFetchError
        )
      );
    }
  }, [type, rideTypeID, adminTable]);

  const onFetchSuccess = (data) => {
    setRideTypeView(data?.data[0]);
    console.log(data?.data[0], "Success");
    setFindoneLoading(false);
  };
  const onFetchError = (data) => {
    console.log(data);
    errorToast(data.message);
    setFindoneLoading(false);
  };
  console.log(rideTypeView?.applicable_zone_permission, "adadadsasda");
  const validationSchema = yup.object({
    rideType: yup
      .string()
      .trim()
      .required("Please fill  the fields to proceed"),
    eligibleBookingType: yup.object().shape({
      Local: yup.boolean(),
      Rental: yup.boolean(),
      OneWayOutstation: yup.boolean(),
      RoundTripOutstation: yup.boolean(),
      altleastOne: yup
        .boolean()
        .test(
          "at-least-one-validation",
          "At least one is required",
          function (value, { parent }) {
            const { Local, Rental, OneWayOutstation, RoundTripOutstation } =
              parent;
            // Check if all are false
            if (
              !Local &&
              !Rental &&
              !OneWayOutstation &&
              !RoundTripOutstation
            ) {
              return false;
            }
            return true;
          }
        ),
    }),

    seatingCapacity: yup
      .string()
      .trim()
      .required("Please fill  the fields to proceed"),
    Upload: yup.mixed("").required("Please fill All this field to proceed"),
  });
  console.log(rideTypeView, "asdadasdasd");
  const formik = useFormik({
    enableReinitialize: true,

    initialValues: isCreating
      ? {
          rideType: "",
          eligibleBookingType: {
            Local: false,
            Rental: false,
            OneWayOutstation: false,
            RoundTripOutstation: false,
            altleastOne: "",
          },
          seatingCapacity: "",
          applicable_zone_permission: [],
          Upload: null,
        }
      : {
          rideType: rideTypeView?.ride_type,
          eligibleBookingType: {
            Local: rideTypeView?.eligible_booking_type?.Local,
            Rental: rideTypeView?.eligible_booking_type?.Rental,
            OneWayOutstation:
              rideTypeView?.eligible_booking_type?.OneWayOutstation,
            RoundTripOutstation:
              rideTypeView?.eligible_booking_type?.RoundTripOutstation,
            altleastOne: "",
          },
          seatingCapacity: rideTypeView?.comride_seating_capacity,

          applicable_zone_permission:
            rideTypeView?.applicable_zone_permission?.map((permission) => ({
              zone_id: permission?.zone_id,
              documentation_availablity: permission?.documentation_availablity,
              booking_availablity: permission?.booking_availablity,
            })),
          Upload: rideTypeView?.image ?? null,
        },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      handleRideTypePasswordModal();
    },
  });

  console.log(formik.values, "formik");

  const resetZones = (values) => {
    if (isCreating === true) {
      console.log(
        values?.applicable_zone_permission?.length,
        filteredRideTypeZone,
        "formik"
      );
      const resetValues = filteredRideTypeZone.map((item) => ({
        zone_id: item.value,
        documentation_availablity: false,
        booking_availablity: false,
      }));

      formik.setFieldValue("applicable_zone_permission", resetValues);
    } else {
      formik.setFieldValue(
        "applicable_zone_permission",
        rideTypeView?.applicable_zone_permission?.length > 0
          ? rideTypeView?.applicable_zone_permission?.map((permission) => ({
              zone_id: permission?.zone_id,
              documentation_availablity: permission?.documentation_availablity,
              booking_availablity: permission?.booking_availablity,
            }))
          : []
      );
    }
  };

  const [uploadLoading, setUploadLoading] = useState(false);

  const avatarUrl = useRef("");

  // const updateAvatar = (imgSrc) => {

  //   console.log(imgSrc, "avatarLog");
  //   avatarUrl.current = imgSrc;

  //   console.log(avatarUrl.current, "avatarLog");
  // };
  function handlePendingAddressFileChange(e) {
    // console.log(imgSrc, "avatarLog");
    // avatarUrl.current = imgSrc;

    // console.log(avatarUrl.current, "avatarLog");

    // if (avatarUrl.current !== null) {
    //   console.log(avatarUrl.current, "avatarLog");
    //   setUploadLoading(true);
    //   dispatch(
    //     uploadImageRideTypeAction(
    //       avatarUrl.current,
    //       onUploadSuccess,
    //       onUploadError
    //     )
    //   );
    // }

    console.log(e, "length");
    if (e.target?.files.length !== 0) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
      setImageModalShow(true);
      // dispatch(
      //   uploadImageRideTypeAction(
      //     e.target.files[0],
      //     onUploadSuccess,
      //     onUploadError
      //   )
      // );
    }
  }
  const onUploadSuccess = (data, modifiedUrl) => {
    console.log(data, "dogImg");
    // setPhotoUrl(data?.data?.data?.location);
    setImageModalShow(true);
    console.log(data.data, "lksmcsckmcas;");

    // setUploadLoading(false);
    // // formik.setFieldValue("Upload", data?.data?.data?.location);
    // const fileInput = document.getElementById("files");
    // if (fileInput) {
    //   fileInput.value = null;
    // }
  };

  console.log(formik.values, "croppedImageUrl");
  const onUploadError = (data) => {
    // setImageModalShow(false);
    console.log(data);
    setUploadLoading(false);
  };

  const formRef = useRef();
  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  console.log(formik.values, "ldkslsf");

  function FormReset() {
    formik.setFieldValue("rideType", formik.initialValues.rideType);
    formik.setFieldValue(
      "eligibleBookingType",
      formik.initialValues.eligibleBookingType
    );

    formik.setFieldValue(
      "seatingCapacity",
      formik.initialValues.seatingCapacity
    );
    formik.setFieldValue("zone", formik.initialValues.zone ?? "");
    formik.setFieldValue("Upload", formik.initialValues.Upload ?? null);
  }

  const checkboxOptions = [
    { value: "Local", label: "Local" },
    { value: "Rental", label: "Rental" },
    { value: "OneWayOutstation", label: "Outstation (One way)" },
    { value: "RoundTripOutstation", label: "Outstation (Round trip)" },
  ];

  console.log(formik.values, "mainValues");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      JSON.stringify(formik.initialValues) !== JSON.stringify(formik.values)
    ) {
      setDisabled(false);
    } else if (
      JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)
    ) {
      setDisabled(true);
    }
  }, [formik.values]);

  const [deleteRideTypeShow, setDeleteRideTypeShow] = useState(false);

  return (
    <>
      <LeavePagemodal
        leavePageShow={leavePageShow}
        handleLeavePageClose={() => setLeavePageShow(false)}
        okayFn={() => {
          handleRideTypeModalClose();
          formik.resetForm();
          setLeavePageShow(false);
        }}
      />
      <RideTypePasswordModal
        rideTypePasswordModal={rideTypePasswordModal}
        handleRideTypePassWordClose={handleRideTypePassWordClose}
        handleRideTypeModalClose={handleRideTypeModalClose}
        formik={formik}
        adminTable={adminTable}
        setAdminTable={setAdminTable}
        rideTypeID={rideTypeID}
        type={type}
        title={
          type === "CreateRideType"
            ? "Are you sure you want to create a new 'Ride type'?"
            : "Are you sure you want to make changes?"
        }
      />
      <RideTypeZoneModal
        rideTypeZoneModal={rideTypeZoneModal}
        handleRideTypeZoneClose={handleRideTypeZoneClose}
        formik={formik}
        type={type}
        setSearch={setSearch}
        filteredRideTypeZone={filteredRideTypeZone}
        zoneEditable={zoneEditable}
        zoneLoading={zoneLoading}
        resetZones={resetZones}
      />
      <ImageUploadModal
        // updateAvatar={handlePendingAddressFileChange}
        imageAction2={uploadImageRideTypeAction}
        dogImg={photoUrl}
        setPhotoUrl={setPhotoUrl}
        formik={formik}
        imageModalShow={imageModalShow}
        imageModalClose={() => setImageModalShow(false)}
        setUploadLoading={setUploadLoading}
        uploadLoading={uploadLoading}
      />
      <Modal
        show={rideTypeModal}
        onHide={handleRideTypeModalClose}
        dialogClassName="ride_type_container"
        contentClassName="border_radius_10px"
        className={`${imageModalShow === true && `blurred_modal`}`}
        backdropClassName="add_admin_modal_backdrop"
        centered
        backdrop={"static"}
        keyboard={false}
      >
        <Modal.Body className=" pt-2 ms-4">
          {findoneLoading ? (
            <div className="p-5 ps-2 d-flex justify-content-center align-items-center">
              <SpinnerLoading />
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center">
                {isCreating ? (
                  <span className="fs_24 fw_600 primary_color">
                    New Ride Type
                  </span>
                ) : (
                  <span className="fs_24 fw_600 primary_color">
                    {rideTypeView?.ride_type ?? "--"} -{" "}
                    {rideTypeView?.ridetype_id2 ?? "--"}
                  </span>
                )}

                <button className="border_none background_none" type="button">
                  {type === "editRideType" ? (
                    <>
                      {!disabled ? (
                        <div
                          onClick={() => {
                            setLeavePageShow(true);
                          }}
                        >
                          <CloseIcon
                            fill="white"
                            className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
                            width={20}
                            height={20}
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            handleRideTypeModalClose();
                            formik.resetForm();
                          }}
                        >
                          <CloseIcon
                            fill="white"
                            className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div
                      onClick={() => {
                        handleRideTypeModalClose();
                        formik.resetForm();
                      }}
                    >
                      <CloseIcon
                        fill="white"
                        className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
                        width={20}
                        height={20}
                      />
                    </div>
                  )}
                </button>
              </div>

              <div className=" mt-4 ">
                {type !== "CreateRideType" && (
                  <div className={`d-flex justify-content-end`}>
                    <div
                      className="light_blue_color details_text fs_14 fw_500 cursor_pointer position-relative"
                      onClick={() => setDetailsRideType(!detailsRideType)}
                    >
                      More Details
                    </div>
                  </div>
                )}

                {detailsRideType ? (
                  <>
                    <div className="cancelled_refund_details_container border white_bg border_radius mt-2">
                      <RideTypeDetails item={rideTypeView} />
                    </div>
                  </>
                ) : null}
                <form onSubmit={formik.handleSubmit} autocomplete="off">
                  <div>
                    <div className="d-flex gap-3 align-items-end">
                      {uploadLoading ? (
                        <div className="ride_type_source_image_container border_radius_3px disabled_border d-flex justify-content-center align-items-center mt-3">
                          <Spinner />
                        </div>
                      ) : formik.values.Upload ? (
                        <img
                          src={formik.values.Upload}
                          className={
                            formik.touched.Upload && formik.errors.Upload
                              ? "ride_type_source_image_container border_radius_3px error_border d-flex justify-content-center align-items-center mt-3"
                              : "ride_type_source_image_container border_radius_3px disabled_border  d-flex justify-content-center align-items-center mt-3"
                          }
                        />
                      ) : (
                        <div
                          className={
                            formik.touched.Upload && formik.errors.Upload
                              ? "ride_type_source_image_container border_radius_3px error_border d-flex justify-content-center align-items-center mt-3"
                              : "ride_type_source_image_container border_radius_3px disabled_border  d-flex justify-content-center align-items-center mt-3"
                          }
                        >
                          No Image
                        </div>
                      )}

                      {type === "CreateRideType" || type === "editRideType" ? (
                        <div className="d-flex">
                          <label
                            className="upload_btn px-3 white_color dark_blue_bg border_radius_3px fs_14 "
                            htmlFor="files"
                          >
                            <input
                              type="file"
                              id="files"
                              className="upload_document_input cursor_pointer"
                              name="Upload"
                              onChange={(e) => {
                                handlePendingAddressFileChange(e);
                              }}
                            />

                            <button
                              type="button"
                              className="border-0 transparent_bg text-white"
                              // onClick={(e) => {
                              //   handlePendingAddressFileChange(e);
                              //   // setImageModalShow(true);
                              // }}
                              onClick={(e) => {
                                document.getElementById("files").click();
                              }}
                            >
                              {formik.values.Upload ? (
                                <span> Re-upload</span>
                              ) : (
                                <span> Upload</span>
                              )}
                            </button>
                          </label>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className="col-6">
                      <TextField
                        size="small"
                        style={{ width: "14rem" }}
                        sx={rideTypeStyles.select}
                        id="seatingCapacity"
                        name="seatingCapacity"
                        label="Comride Seating Capacity*"
                        onBlur={formik.handleBlur}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.seatingCapacity}
                        error={
                          formik.touched.seatingCapacity &&
                          Boolean(formik.errors.seatingCapacity)
                        }
                        disabled={type === "viewRideType"}
                      />
                      <div
                        className={
                          formik.touched.eligibleBookingType &&
                          formik.errors.eligibleBookingType
                            ? "elligible_booking_types_container border_radius_3px error_border px-4 mt-3 position-relative"
                            : "disabled_border border_radius_3px elligible_booking_types_container px-4 mt-3 position-relative"
                        }
                      >
                        {checkboxOptions?.map((option, index) => (
                          <div
                            className={`${index === 0 && "mt-3"} text-nowrap`}
                            key={option.value}
                          >
                            <input
                              type="checkbox"
                              id={option.value}
                              name={option.value}
                              onChange={() => {
                                formik.setFieldValue("eligibleBookingType", {
                                  ...formik.values.eligibleBookingType,
                                  [option.value]:
                                    !formik.values.eligibleBookingType[
                                      option.value
                                    ],
                                });
                              }}
                              checked={
                                formik.values.eligibleBookingType[option.value]
                              }
                              disabled={type === "viewRideType"}
                            />
                            <label
                              className="ps-2 fs_12 dim_grey_color fw_500 text-nowrap"
                              htmlFor={option.value}
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                        <div className="eligible_booking_type_heading white_bg">
                          <span
                            className={
                              formik.touched.eligibleBookingType &&
                              formik.errors.eligibleBookingType
                                ? "fs_12 px-1 red_color fw_500"
                                : "fs_12 px-1 suva_grey_color fw_500"
                            }
                          >
                            Eligible Booking Type*
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <TextField
                        size="small"
                        style={{ width: "14rem" }}
                        sx={rideTypeStyles.select}
                        id="rideType"
                        name="rideType"
                        label="Ride Type*"
                        onBlur={formik.handleBlur}
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.rideType}
                        error={
                          formik.touched.rideType &&
                          Boolean(formik.errors.rideType)
                        }
                        disabled={
                          type === "viewRideType" || type === "editRideType"
                        }
                      />
                    </div>
                  </div>
                  <div className="mt-5 mb-4 d-flex ms-4 align-items-center gap-4">
                    <span className="primary_color fs_16 fw_500">
                      Applicable Zones & Permissions*
                    </span>
                    <button
                      className="border_none border_radius_5px fs_16 fw_500 px-3 white_color blue_color_bg"
                      type="button"
                      onClick={() => {
                        setZoneEditable(false);
                        handleRideTypeZoneShow();
                      }}
                    >
                      View
                    </button>
                    {type !== "viewRideType" && (
                      <button
                        className="border_none primary_bg border_radius_5px fs_16 fw_500 white_color px-3"
                        type="button"
                        onClick={() => {
                          setZoneEditable(true);
                          handleRideTypeZoneShow();
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <div className="error_mes_height">
                    {(formik.errors.rideType && formik.touched.rideType && (
                      <span className="dark_red_color d-flex justify-content-center mt-1 fs_14">
                        {formik.errors.rideType}
                      </span>
                    )) ||
                      (formik.errors.eligibleBookingType &&
                        formik.touched.eligibleBookingType && (
                          <span className="dark_red_color d-flex justify-content-center mt-1 fs_14">
                            {formik.errors.eligibleBookingType?.altleastOne}
                          </span>
                        )) ||
                      (formik.errors.seatingCapacity &&
                        formik.touched.seatingCapacity && (
                          <span className="dark_red_color d-flex justify-content-center mt-1 fs_14">
                            {formik.errors.seatingCapacity}
                          </span>
                        )) ||
                      (formik.errors.zone && formik.touched.zone && (
                        <span className="dark_red_color d-flex justify-content-center mt-1 fs_14">
                          {formik.errors.zone}
                        </span>
                      ))}
                  </div>

                  {type === "CreateRideType" ? (
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                      <button
                        className="body_bg border_none py-2 px-5 border_radius_5px fw_600 d-flex align-items-center gap-2"
                        type="button"
                        onClick={() => {
                          FormReset();
                        }}
                      >
                        <i className="ri-restart-line fw_500"></i> RESET
                      </button>

                      <Savebtn submitFn={handleSubmit} />
                    </div>
                  ) : null}
                  {type === "editRideType" && (
                    <div className="d-flex justify-content-center gap-4 mt-3 ">
                      <button
                        className="fs_18 fw_500 background_none  error_border primary_border red_color border_radius_3px px-5 py-1"
                        type="button"
                        onClick={() => setDeleteRideTypeShow(true)}
                      >
                        Delete
                      </button>
                      <button
                        className="body_bg border_none py-2 px-5 border_radius_5px fw_600 d-flex align-items-center gap-2"
                        type="button"
                        onClick={() => {
                          FormReset();
                        }}
                      >
                        <i className="ri-restart-line fw_500"></i> RESET
                      </button>

                      <Savebtn
                        submitFn={handleSubmit}
                        disabled={disabled}
                        btnClassName={`${
                          disabled
                            ? `disabled_color_bg white_color px-5 m-0`
                            : `light_green_bg px-5 m-0`
                        }`}
                      />
                    </div>
                  )}
                </form>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
      <DeletePasswordModal
        Passwordshow={deleteRideTypeShow}
        handlePasswordClose={() => setDeleteRideTypeShow(false)}
        id={rideTypeView?.id}
        ridetypeclose={handleRideTypeModalClose}
        setAdminTable={setAdminTable}
        adminTable={adminTable}
      />
    </>
  );
};

export default RideTypeModal;
