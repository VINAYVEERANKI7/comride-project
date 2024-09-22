import React, { useRef, useState, useEffect } from "react";
import MoreIcon from "../../assets/icons/more-icon";
import driverImage from "../../assets/images/driver-image.png";
import { BalanceStatus, statusColor } from "../helper";
import "./bookinghistorytablestyle.css";
import moment from "moment";
import { useLocation } from "react-router";
import RiderPasswordModal from "./passwordModal";
import usePermissions from "../usePermissionChecker";
import DetailsModal from "../modals/detailsModal";
import ErrorMessagemodal from "../modals/errorMessageModal";
import styles from "./ridersComponent.module.css";

const RiderProfileTop = ({ riderData, type }) => {
  const riderParams = useLocation();
  const { canRead, canWrite } = usePermissions();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const [blockPasswordModal, setBlockPasswordModal] = useState(false);
  const [errorMessageShow, setErrorMessageShow] = useState(false);
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [riderTable, setRiderTable] = useState(false);
  const [passwordObject, setPasswordObject] = useState({});
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuOptions = [];
  const viewMoreOption = [];
  if (type === "manageRiders") {
    canWrite("manage_riders") &&
      menuOptions.push(
        {
          title: "Reset Rating",
          modalTitle: "Are you sure you want to reset Rating?",
          password: true,
          reason: false,
          disabled: riderData?.ratings < 5 ? false : true,
          type: "reset_rating",
          successMessage: "Rating has been reset successfully!",
          details: false,
        },
        {
          title: "Reset Profile Picture",
          modalTitle: "Are you sure you want to reset Profile Picture?",
          password: true,
          reason: false,
          disabled: riderData?.isProfileRemoved ? true : false,
          type: "reset_profile_picture",
          successMessage: "Profile Picture has been reset successfully!",
          details: false,
        },
        {
          title: "Activate Account",
          modalTitle: "Are you sure you want to Activate this Account?",
          password: true,
          reason: false,
          disabled: riderData?.rider_status,
          type: "activate_account",
          successMessage: "Profile  has been Activated!",
          details: false,
        },
        {
          title: "Block Rider",
          modalTitle: "Are you sure you want to block this profile?",
          password: true,
          reason: true,
          disabled: false,
          type: "block_rider",
          successMessage: "Profile has been blocked!",
          details: false,
        },
        {
          title: "Delete Account",
          modalTitle: "Are you sure you want to delete this profile?",
          password: riderData?.current_balance >= 0 ? true : false,
          reason: true,
          disabled: false,
          type: "delete_account",
          successMessage: "Profile has been deleted successfully!",
          details: false,
        }
      );
  } else if (type === "blockedRiders") {
    if (canWrite("blocked_riders")) {
      menuOptions?.push({
        title: "Unblock Rider",
        modalTitle: "Are you sure you want to unblock Rider?",
        password: true,
        reason: false,
        disabled: false,
        type: "unblock_rider",
        successMessage: "Profile has been unblocked successfully!",
        details: false,
      });
    }
    menuOptions?.push({
      title: "View Block Details",
      modalTitle: "Block details",
      password: false,
      disabled: false,
      type: "rider_block_details",
      details: true,
    });
    viewMoreOption?.push({
      title: "View Block Details",
      modalTitle: "Block details",
      password: false,
      disabled: false,
      type: "rider_block_details",
      details: true,
    });
  }
  if (type === "deletedRiders") {
    menuOptions?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
    viewMoreOption?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
    if (canWrite("deleted_riders")) {
      menuOptions?.push(
        {
          title: "Restore Account",
          modalTitle: "Are you sure you want to restore account?",
          password: true,
          reason: false,
          disabled: false,
          type: "restore_account",
          successMessage: "Account restored successfully!",
          details: false,
        },
        {
          title: "Delete Account Permanently",
          modalTitle: "Are you sure you want to delete account permanently?",
          password: true,
          reason: false,
          disabled: false,
          type: "delete_account_permanently",
          successMessage: "Account deleted permanently!",
          details: false,
        }
      );
    }
  }

  if (type === "permanentlyDeletedRiders") {
    menuOptions?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
    viewMoreOption?.push({
      title: "View Delete Details",
      modalTitle: "Deleted details",
      password: false,
      disabled: false,
      type: "delete_details",
      details: true,
    });
  }

  const sidebarData = [
    {
      label: "First Name",
      value: riderData?.first_name ?? "--",
      display: true,
    },
    {
      label: "Phone Number",
      value: riderData?.phone_number ?? "--",
      display: true,
    },
    {
      label: "Last Name",
      value: riderData?.last_name ?? "--",
      display: true,
    },
    {
      label: "Email ID",
      value: riderData?.email ?? "--",
      display: type !== "permanentlyDeletedDriverRideHistory" ? true : false,
    },
    {
      label: "Referral Code",
      value: riderData?.referral_code ?? "--",
      display: true,
    },
    {
      label: "Start Date",
      value: riderData?.createdAt
        ? moment(riderData?.createdAt).format("DD/MM/YYYY")
        : "--",
      display: true,
    },
    {
      label: "Current Balance",
      value: riderData?.current_balance ?? "--",
      display: true,
    },
    {
      label: "Blocked Count",
      value: riderData?.blocked_count ?? "--",
      display: true,
    },
  ];

  return (
    <div>
      <RiderPasswordModal
        passwordShow={blockPasswordModal}
        handlePasswordClose={() => setBlockPasswordModal(false)}
        riderTable={riderTable}
        setRiderTable={setRiderTable}
        passwordObject={passwordObject}
        id={riderData?.id}
      />
      <DetailsModal
        detailsModalShow={detailsModalShow}
        handleDetailsModalClose={() => setDetailsModalShow(false)}
        user={riderData}
        passwordObject={passwordObject}
      />
      <ErrorMessagemodal
        errorMessageShow={errorMessageShow}
        handleErrorMessageClose={() => setErrorMessageShow(false)}
        title="Rider account cannot be deleted"
        is_description={true}
        description="This rider account cannot be deleted as it has an existing negative Current Balance."
        descriptionTextColor="spanish_gray_color"
        contentDiv={
          <>
            <span className="spanish_gray_color">
              Current Balance(₹):
              <span
                className={`${statusColor(riderData?.current_balance)} fw_600`}
              >
                {riderData?.current_balance
                  ? parseFloat(riderData?.current_balance).toFixed(1)
                  : "--"}
              </span>
            </span>
          </>
        }
      />
      <div
        className={`sidebar_bg border_radius pb-3 row g-0`}
        style={{ marginTop: "-38px" }}
      >
        <div className=" col-12 pe-4">
          <div className="d-flex justify-content-between">
            <div
              className={`d-flex px-3 pt-4 col-2`}
              style={{ maxWidth: "160px" }}
            >
              <img
                src={
                  riderData?.profile_pic ? riderData?.profile_pic : driverImage
                }
                alt="profile"
                width={100}
                height={100}
                cross-origin="use-credentials"
                className="drivers_image border_radius_5px"
              />
            </div>
            <div className={`pt-3 col-10 d-flex justify-content-between`}>
              <div className={`driver_car_details_container d-flex`}>
                <table className="col-7">
                  <tbody
                    className={`d-flex flex-wrap justify-content-between  g-0`}
                  >
                    {sidebarData
                      ?.filter?.((data) => data?.display)
                      ?.map((item) => {
                        return (
                          <React.Fragment key={item?.label}>
                            <tr className={`col-6 row g-0`}>
                              <td
                                className={`secondary_color pe-1 fw_600 fs_13 py-1 col-5`}
                              >
                                {item.label}
                              </td>
                              <td
                                className={`${
                                  item?.label === "Current Balance"
                                    ? BalanceStatus(item.value)
                                    : "primary_color"
                                }  fw_600 fs_13 py-1 ps-3 col-6`}
                                valign="top"
                              >
                                {item?.label === "Current Balance" && `₹`}
                                {item.value}{" "}
                                {item?.is_verified && (
                                  <span className="ms-1"></span>
                                )}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
            {riderParams?.state?.edit === true && (
              <>
                <div className="">
                  <div
                    className="mt-2"
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <MoreIcon className={`cursor_pointer`} width="18" />
                  </div>
                </div>
                {showPopup && (
                  <div
                    className={`${styles.riders_list_container}`}
                    ref={popupRef}
                  >
                    <ul
                      className={`${styles.menu_list} p-3 mb-0 primary_color fs_14 fw_600 text-center`}
                    >
                      {menuOptions?.map((item, index) => {
                        return (
                          <React.Fragment key={item?.modalTitle}>
                            <li className="pt-1 cursor_pointer">
                              <button
                                onClick={() => {
                                  item?.password === true
                                    ? setBlockPasswordModal(true)
                                    : item?.details === true
                                    ? setDetailsModalShow(true)
                                    : setErrorMessageShow(false);
                                  setPasswordObject(item);
                                }}
                                disabled={item?.disabled}
                                className={`background_none border_none ${
                                  item?.disabled === true
                                    ? "disabled_color"
                                    : "primary_color"
                                }  fs_14 fw_600 cursor_pointer`}
                              >
                                {item?.title}
                              </button>
                            </li>
                            {menuOptions?.length - 1 === index ? (
                              <></>
                            ) : (
                              <hr className="list_underline m-1" />
                            )}
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </div>
                  // <div className="popup">
                  //   <p className="small">Reset Rating</p>
                  //   <div className="line"></div>
                  //   <p className="small">Reset Profile Picture</p>
                  //   <div className="line"></div>
                  //   <p className="small" style={{ color: "#c8c7c7" }}>
                  //     Activate Account
                  //   </p>
                  //   <div className="line"></div>
                  //   <p className="small">Block Rider</p>

                  //   <div className="line"></div>
                  //   <p className="small">Delete Account</p>
                  // </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderProfileTop;
