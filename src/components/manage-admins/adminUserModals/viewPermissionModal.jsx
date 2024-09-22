import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../adminModals.css";
import Resetbtn from "../../utilits/buttons/resetbtn";
import { removeUnderScore } from "../../helper";
import CloseIcon from "../../../assets/icons/close-icon";

const ViewPermissionsModal = ({
  permissionShow,
  handlePermissionClose,
  formik,
  action,
  setCreatePermissionValues,
  createPermissionValues,
  getPermissions,
}) => {
  console.log(getPermissions, "getPermissions");

  const mainpermissions = {
    dashboard: {
      driver_dashboard: getPermissions?.driver_dashboard,
      complaint_dashboard: getPermissions?.complaint_dashboard,
    },
    analysis_dashboard: {
      rider_metrics: getPermissions?.rider_metrics,
      // driver_metrics: getPermissions?.driver_metrics,
      booking_metrics: getPermissions?.booking_metrics,
      cancellation_metrics: getPermissions?.cancellation_metrics,
      earning_metrics: getPermissions?.earning_metrics,
    },
    manage_admin: {
      admin_users: getPermissions?.admin_users,
      blocked_admins: getPermissions?.blocked_admins,
      deleted_admins: getPermissions?.deleted_admins,
    },
    riders: {
      manage_riders: getPermissions?.manage_riders,
      blocked_riders: getPermissions?.blocked_riders,
    },
    drivers: {
      manage_drivers: getPermissions?.manage_drivers,
      pending_application: getPermissions?.pending_application,
      rejected_application: getPermissions?.rejected_application,
      banned_application: getPermissions?.banned_application,
      expired_documents: getPermissions?.expired_documents,
      blocked_driver: getPermissions?.blocked_driver,
    },
    deleted_users: {
      deleted_riders: getPermissions?.deleted_riders,
      permanentely_deleted_drivers:
        getPermissions?.permanentely_deleted_drivers,
      permanentely_deleted_riders: getPermissions?.permanentely_deleted_riders,
      deleted_drivers: getPermissions?.deleted_drivers,
    },
    manage_booking_requests: {
      ongoing_booking_requests: getPermissions?.ongoing_booking_requests,
      unsuccessful_booking_requests:
        getPermissions?.unsuccessful_booking_requests,
    },
    manage_bookings: {
      ongoing_booking: getPermissions?.ongoing_booking,
      completed_booking: getPermissions?.completed_booking,
      cancelled_booking: getPermissions?.cancelled_booking,
      accident_booking: getPermissions?.accident_booking,
      adjusted_booking: getPermissions?.adjusted_booking,
    },

    booking_invoices: {
      booking_invoice: getPermissions?.booking_invoice,
    },
    refund: {
      pending_refund: getPermissions?.pending_refund,
      successful_refund: getPermissions?.successful_refund,
      cancelled_refund: getPermissions?.cancelled_refund,
    },

    driver_metrics: {
      driver_metrics: getPermissions?.driver_metrics,
    },
    driver_finances: {
      driver_finance: getPermissions?.driver_finance,
    },

    ride_type_Vehicle_type: {
      ride_types: getPermissions?.ride_types,
      vehicle_types: getPermissions?.vehicle_types,
    },
    zones: {
      manage_zones: getPermissions?.manage_zones,
      blocked_zones: getPermissions?.blocked_zones,
      archived_zones: getPermissions?.archived_zones,
    },
    fares: {
      manage_fares: getPermissions?.manage_fares,
      defualt_fares: getPermissions?.defualt_fares,
      deleted_intrazone_fares: getPermissions?.deleted_intrazone_fares,
      archived_intrazone_fares: getPermissions?.archived_intrazone_fares,
      archived_fares: getPermissions?.archived_fares,
    },
    // Driver Premiums need to add
    driver_premium: {
      manage_driver_premiums: getPermissions?.manage_driver_premiums,
      default_driver_premiums: getPermissions?.default_driver_premiums,
      archived_premiums: getPermissions?.archived_premiums,
    },
    rider_complaints: {
      my_rider_complaint: getPermissions?.my_rider_complaint,
      rider_mobileapp: getPermissions?.rider_mobileapp,
      rider_call: getPermissions?.rider_call,
      rider_pending_complaints: getPermissions?.rider_pending_complaints,
      rider_inprogress_complaint: getPermissions?.rider_inprogress_complaint,
      rider_resloved_closed_complaint:
        getPermissions?.rider_resloved_closed_complaint,
    },
    driver_complaints: {
      my_driver_complaint: getPermissions?.my_driver_complaint,
      driver_mobileapp: getPermissions?.driver_mobileapp,
      driver_call: getPermissions?.driver_call,
      driver_pending_complaints: getPermissions?.driver_pending_complaints,
      driver_inprogress_complaint: getPermissions?.driver_inprogress_complaint,
      driver_resloved_closed_complaint:
        getPermissions?.driver_resloved_closed_complaint,
    },
    sos: {
      my_driver_sos: getPermissions?.my_driver_sos,
      my_rider_sos: getPermissions?.my_rider_sos,
      pending_create_rider_sos: getPermissions?.pending_create_rider_sos,
      pending_create_driver_sos: getPermissions?.pending_create_driver_sos,
      inprogress_rider_sos: getPermissions?.inprogress_rider_sos,
      inprogress_driver_sos: getPermissions?.inprogress_driver_sos,
      resloved_closed_sos: getPermissions?.resloved_closed_sos,
      local_responder: getPermissions?.local_responder,
    },

    rider_finances: {
      rider_finance: getPermissions?.rider_finance,
    },

    coupons: {
      rider_coupons: getPermissions?.rider_coupons,
      rider_coupons_review_required:
        getPermissions?.rider_coupons_review_required,
      rider_coupons_active: getPermissions?.rider_coupons_active,
      rider_coupons_rejected: getPermissions?.rider_coupons_rejected,
      rider_coupons_deleted: getPermissions?.rider_coupons_deleted,
      rider_coupons_expired: getPermissions?.rider_coupons_expired,
      rider_coupons_usage_history: getPermissions?.rider_coupons_usage_history,

      driver_coupons: getPermissions?.driver_coupons,
      driver_coupons_review_required:
        getPermissions?.driver_coupons_review_required,
      driver_coupons_active: getPermissions?.driver_coupons_active,
      driver_coupons_rejected: getPermissions?.driver_coupons_rejected,
      driver_coupons_deleted: getPermissions?.driver_coupons_deleted,
      driver_coupons_expired: getPermissions?.driver_coupons_expired,
      driver_coupons_usage_history:
        getPermissions?.driver_coupons_usage_history,
    },
    referrals: {
      rider_referrals: getPermissions?.rider_referrals,

      rider_referrals_review_required:
        getPermissions?.rider_referrals_review_required,
      rider_referrals_active: getPermissions?.rider_referrals_active,
      rider_referrals_rejected: getPermissions?.rider_referrals_rejected,
      rider_referrals_deleted: getPermissions?.rider_referrals_deleted,
      rider_referrals_expired: getPermissions?.rider_referrals_expired,
      rider_referrals_usage_history:
        getPermissions?.rider_referrals_usage_history,

      driver_referrals: getPermissions?.driver_referrals,
      driver_referrals_review_required:
        getPermissions?.driver_referrals_review_required,
      driver_referrals_active: getPermissions?.driver_referrals_active,
      driver_referrals_rejected: getPermissions?.driver_referrals_rejected,
      driver_referrals_deleted: getPermissions?.driver_referrals_deleted,
      driver_referrals_expired: getPermissions?.driver_referrals_expired,
      driver_referrals_usage_history:
        getPermissions?.driver_referrals_usage_history,
    },
    incentives: {
      rider_incentive: getPermissions?.rider_incentive,
      rider_incentive_review_required:
        getPermissions?.rider_incentive_review_required,
      rider_incentive_active: getPermissions?.rider_incentive_active,
      rider_incentive_rejected: getPermissions?.rider_incentive_rejected,
      rider_incentive_deleted: getPermissions?.rider_incentive_deleted,
      rider_incentive_expired: getPermissions?.rider_incentive_expired,
      rider_incentive_usage_history:
        getPermissions?.rider_incentive_usage_history,

      driver_incentive: getPermissions?.driver_incentive,

      driver_incentive_review_required:
        getPermissions?.driver_incentive_review_required,
      driver_incentive_active: getPermissions?.driver_incentive_active,
      driver_incentive_rejected: getPermissions?.driver_incentive_rejected,
      driver_incentive_deleted: getPermissions?.driver_incentive_deleted,
      driver_incentive_expired: getPermissions?.driver_incentive_expired,
      driver_incentive_usage_history:
        getPermissions?.driver_incentive_usage_history,
    },
    broadcast: {
      rider_broadcast: getPermissions?.rider_broadcast,

      rider_broadcast_review_required:
        getPermissions?.rider_broadcast_review_required,
      rider_broadcast_active: getPermissions?.rider_broadcast_active,
      rider_broadcast_rejected: getPermissions?.rider_broadcast_rejected,
      rider_broadcast_deleted: getPermissions?.rider_broadcast_deleted,
      rider_broadcast_expired: getPermissions?.rider_broadcast_expired,

      driver_broadcast: getPermissions?.driver_broadcast,

      driver_broadcast_review_required:
        getPermissions?.driver_broadcast_review_required,
      driver_broadcast_active: getPermissions?.driver_broadcast_active,
      driver_broadcast_rejected: getPermissions?.driver_broadcast_rejected,
      driver_broadcast_deleted: getPermissions?.driver_broadcast_deleted,
      driver_broadcast_expired: getPermissions?.driver_broadcast_expired,
    },
    faq: {
      rider_faq: getPermissions?.rider_faq,
      driver_faq: getPermissions?.driver_faq,
    },

    notification_and_sms: {
      nse_rider: getPermissions?.nse_rider,
      nse_driver: getPermissions?.nse_driver,
    },
    tracking: {
      track_vehicle: getPermissions?.track_vehicle,
      track_sos_rider: getPermissions?.track_sos_rider,
    },
  };

  console.log(mainpermissions, "mainpermissions");

  const handleCancelFn = () => {
    if (action === "view") {
      handlePermissionClose();
    } else {
      // formik.setFieldValue("user_permission", formik?.values?.user_permission);
      handlePermissionClose();
    }
  };

  const [viewAllChecked, setViewAllChecked] = useState(false);
  const [editAllChecked, setEditAllChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const handleViewAllChange = (event) => {
    const isChecked = event.target.checked;
    setViewAllChecked(isChecked);
    const updatedPermissions = { ...mainpermissions };
    for (const sectionName in updatedPermissions) {
      for (const subSectionName in updatedPermissions[sectionName]) {
        console.log(isChecked, "updatedPermissions : ");
        updatedPermissions[sectionName][subSectionName].read = isChecked;
      }
    }
    setCreatePermissionValues(updatedPermissions);
  };

  const handleEditAllChange = (event) => {
    const isChecked = event.target.checked;
    setViewAllChecked(isChecked);
    setEditAllChecked(isChecked);
    const updatedPermissions = { ...mainpermissions };
    for (const sectionName in updatedPermissions) {
      for (const subSectionName in updatedPermissions[sectionName]) {
        updatedPermissions[sectionName][subSectionName].write = isChecked;
        updatedPermissions[sectionName][subSectionName].read = isChecked;
      }
    }
    setCreatePermissionValues(updatedPermissions);
  };

  const handleEditCheck = (e, sectionName, subSectionName) => {
    const { checked } = e.target;
    const updatedPermissions = { ...mainpermissions };
    updatedPermissions[sectionName][subSectionName].read = checked;
    updatedPermissions[sectionName][subSectionName].write = checked;

    setCreatePermissionValues(updatedPermissions);
  };

  const handleWriteCheck = (e, sectionName, subSectionName) => {
    const { checked } = e.target;
    const isWrite = e.currentTarget.name?.includes("write");
    const updatedPermissions = { ...mainpermissions };
    updatedPermissions[sectionName][subSectionName].read = checked;

    setCreatePermissionValues(updatedPermissions);
  };

  // const handleViewAllChange = (event) => {
  //   const isChecked = event.target.checked;
  //   setViewAllChecked(isChecked);
  //   const updatedPermissions = { ...mainpermissions };
  //   for (const sectionName in updatedPermissions) {
  //     for (const subSectionName in updatedPermissions[sectionName]) {
  //       updatedPermissions[sectionName][subSectionName].read = isChecked;
  //     }
  //   }
  //   console.log(updatedPermissions, "updatedPermissions");
  // };

  // const handleEditAllChange = (event) => {
  //   const isChecked = event.target.checked;
  //   setViewAllChecked(isChecked);
  //   setEditAllChecked(isChecked);
  //   const updatedPermissions = { ...mainpermissions };
  //   for (const sectionName in updatedPermissions) {
  //     for (const subSectionName in updatedPermissions[sectionName]) {
  //       updatedPermissions[sectionName][subSectionName].write = isChecked;
  //       updatedPermissions[sectionName][subSectionName].read = isChecked;
  //     }
  //   }
  //   console.log(updatedPermissions, "updatedPermissions");
  //   setCreatePermissionValues(updatedPermissions);
  // };

  // const handleWriteCheck = (event, sectionName, subSectionName) => {
  //   formik.handleChange(event);
  //   const isWrite = event.currentTarget.name?.includes("write");

  //   if (isWrite) {
  //     if (event.currentTarget.checked) {
  //       formik.setFieldValue(
  //         `user_permission.${sectionName}.${subSectionName}.read`,
  //         true
  //       );
  //     } else {
  //       formik.setFieldValue(
  //         `user_permission.${sectionName}.${subSectionName}.read`,
  //         false
  //       );
  //     }
  //   }
  // };

  useEffect(() => {
    // console.log(
    //   formik.values.user_permission === formik.initialValues.user_permission,
    //   "user_permission"
    // );

    if (
      JSON.stringify(mainpermissions) === JSON.stringify(createPermissionValues)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [createPermissionValues]);

  return (
    <>
      <Modal
        centered
        show={permissionShow}
        onHide={handlePermissionClose}
        size="large"
        dialogClassName="add_new_admin_container"
        contentClassName="border_radius_15px"
        backdropClassName="edit_admin_modal_backdrop"
        backdrop={action === "view" ? true : "static"}
        keyboard={false}
      >
        <div className="admin_panel py-3 d-flex justify-content-between align-items-center">
          <div> </div>
          <span className=" d-flex justify-content-center fs_14 fw_600 view_title">
            Admin Panel Feature Permissions
          </span>
          <button
            className="border_none background_none mx-2"
            onClick={() => {
              formik.setFieldValue(
                "user_permission",
                formik?.initialValues?.user_permission
              );
              handleCancelFn();
            }}
            type="button"
          >
            <CloseIcon
              fill="white"
              className={`primary_bg fs_21 rounded-5 fw_500 p-1`}
              width={20}
              height={20}
            />
          </button>
        </div>
        <Modal.Body>
          <>
            <div className=" d-flex justify-content-center mt-2">
              <div className="col-lg-10 col-12">
                <div className="row justify-content-center table_header pale_blue_bg g-0">
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Menu Section</div>
                  </div>
                  <div className="col-4">
                    <div className="px-3 py-2 fs_12 fw_500">Sub-section</div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">
                      {" "}
                      <input
                        type="checkbox"
                        id="viewAll"
                        checked={viewAllChecked}
                        onChange={(e) => handleViewAllChange(e)}
                        disabled={editAllChecked}
                      />{" "}
                      View
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="px-3 py-2 fs_12 ms-3 fw_500">
                      {" "}
                      <input
                        type="checkbox"
                        id="viewAll"
                        checked={editAllChecked}
                        onChange={(e) => handleEditAllChange(e)}
                      />{" "}
                      Edit
                    </div>
                  </div>
                </div>

                <div className="view_permissions_lists">
                  {Object.entries(mainpermissions).map(
                    ([sectionName, permissions]) => {
                      return (
                        <div
                          className="row g-0 justify-content-center"
                          key={sectionName}
                        >
                          <div className="col-4 table_btms">
                            <div className="py-2 px-2 fs_14 fw_500">
                              {sectionName
                                ? removeUnderScore(sectionName)
                                : "--"}
                            </div>
                          </div>
                          <div className="col-8 table_data">
                            <div className="row g-0">
                              {Object.entries(permissions).map(
                                ([subSectionName, subPermissions]) => {
                                  return (
                                    <React.Fragment key={subSectionName}>
                                      <div className="col-6 table_btms">
                                        <div className="px-2 py-1 fs_14 fw_500">
                                          {subSectionName
                                            ? removeUnderScore(subSectionName)
                                            : "--"}
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_read`}
                                            name={`user_permission.${sectionName}.${subSectionName}.read`}
                                            // checked={subPermissions?.read}
                                            checked={
                                              permissions[subSectionName]?.read
                                            }
                                            onChange={(e) =>
                                              handleWriteCheck(
                                                e,
                                                sectionName,
                                                subSectionName
                                              )
                                            }
                                            disabled={
                                              permissions[subSectionName]?.write
                                            }
                                          />
                                        </div>
                                      </div>
                                      <div className="col-3 table_btms">
                                        <div className="px-2 ms-3 py-1 fs_14 last_lists">
                                          <input
                                            type="checkbox"
                                            className="manage_fare_checkbox_row ms-2"
                                            id={`${sectionName}_${subSectionName}_write`}
                                            name={`user_permission.${sectionName}.${subSectionName}.write`}
                                            checked={
                                              permissions[subSectionName]?.write
                                            }
                                            onChange={(e) =>
                                              handleEditCheck(
                                                e,
                                                sectionName,
                                                subSectionName
                                              )
                                            }
                                            disabled={false}
                                          />
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </>
        </Modal.Body>

        <div className="admin_downpanel">
          <div
            className={`d-flex ${
              action === "view"
                ? "justify-content-end me-3"
                : "justify-content-center"
            }  mt-3 gap-sm-3 gap-1 mb-3`}
          >
            <button
              className={`border_none  d-flex align-items-center fs_16 px-sm-4 fw_500 border_radius_3px gap-2  py-1`}
              type="button"
              onClick={() => {
                formik.setFieldValue("user_permission", mainpermissions);
                handlePermissionClose();
              }}
            >
              <i className="ri-close-circle-fill primary_color fs_18"></i>
              Cancel
            </button>
            {action === "view" ? (
              <></>
            ) : (
              <>
                {" "}
                <Resetbtn
                  disabled={disabled}
                  onResetFn={() => {
                    formik.setFieldValue("user_permission", mainpermissions);
                  }}
                />
                <button
                  disabled={disabled}
                  className={`light_green_bg px-sm-5  white_color border_none  border_radius_5px ms-3 fw_400 py-2 d-flex align-items-center gap-2`}
                  type={"button"}
                  onClick={() => {
                    handleCancelFn();
                  }}
                >
                  <i className="ri-save-fill"></i> SAVE
                </button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ViewPermissionsModal;
