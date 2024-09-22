import React, { useRef, useState } from "react";
import styles from "../manage-riders/ridersComponent.module.css";
import style from "../../modules/manage-admins/manage-admins.module.css";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import moment from "moment";
import LoadAndError from "../utilits/loadAndError";
import {
  formatAmount,
  navigationFn,
  removeUnderScore,
  useSortableData,
} from "../helper";
import TablePaginations from "../utilits/pagination";
import { NavLink, useParams } from "react-router-dom";
import SearchInputfield from "../form/searchInputfield";
import { useEffect } from "react";
import MoreIcon from "../../assets/icons/more-icon";
import { useDispatch } from "react-redux";
import {
  activeAutoRenewAction,
  cancelActiveAutoRenewAction,
  cancelNormalAutoRenewAction,
} from "../../redux/actions/manageDriversAction";
import errorToast from "../utilits/errorToast";
import successToast from "../utilits/successToast";
import SwitchPremiumModal from "../driver-finance/driver-finance-modals/switchPremiumModal";
import {
  premiumPlanAction,
  premiumSchedulePlanAction,
} from "../../redux/actions/driverFinanceAction/createCashTransaction";
import useDisplayToggle from "../useDisplayToggle";

const DriverPremiumStatusHistoryTable = ({
  loading,
  setLoading,
  error,
  handlePagination,
  page,
  pageData,
  pendingList,
  driverPremiumData,
}) => {
  const dispatch = useDispatch();
  const insideClickRef = useRef(null);
  const onClickRef = useRef(null);
  console.log(driverPremiumData, "driverPremiumData: ");
  const { items, requestSort, sortConfig } = useSortableData(pendingList);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [premiumMoreOptions, setPremiumMoreOptions] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const params = useParams();
  const [switchPremiumModal, setSwitchPremiumModal] = useState(false);
  const [cashPaymentMethod, setCashPaymentMethod] = useState("");
  const [premiumPlanData, setPremiumPlanData] = useState("");

  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setTableDisplay: setSelectedOptionIndex,
    setDisplay: setPremiumMoreOptions,
  });

  function autoRenewFn(premiumData) {
    console.log(premiumData, "premiumData:");
    dispatch(
      activeAutoRenewAction(
        {
          driver_id: params?.id,
          auto_renewal: true,
          plan_type: premiumData?.plan_type,
          premium_type: premiumData?.premium_type,
        },
        onActiveAutoRenewSuccess,
        onActiveAutoRenewError
      )
    );
  }

  const onActiveAutoRenewSuccess = (data) => {
    console.log(data, "ActivateAutoRenewalSuccess:");
    successToast(data?.data?.message);
  };
  const onActiveAutoRenewError = (err) => {
    console.log(err, "ActivateAutoRenewalError");
    errorToast(err?.data?.message);
  };

  function cancelAutoRenewFn(premiumData) {
    console.log(premiumData, "premiumData");
    const cancelAutoRenewAction =
      premiumData?.is_auto_renewal_active === false
        ? cancelNormalAutoRenewAction
        : cancelActiveAutoRenewAction;
    dispatch(
      cancelAutoRenewAction(
        {
          driver_id: params?.id,
        },
        onCancelAutoRenewSuccess,
        onCancelAutoRenewError
      )
    );
  }
  const onCancelAutoRenewSuccess = (data) => {
    console.log(data, "CancelAutoRenewalSuccess:");
    successToast(data?.data?.message);
  };
  const onCancelAutoRenewError = (data) => {
    console.log(data, "CancelActiveAutoRenewalError:");
    successToast(data?.data?.message);
  };
  console.log(driverPremiumData);

  // useEffect(() => {
  //   if (cashPaymentMethod === "switch_premium") {
  //     setLoading(true);
  //     dispatch(
  //       premiumPlanAction(
  //         { driver_id: driverData?.id },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   } else if (cashPaymentMethod === "schedule_premium") {
  //     setLoading(true);
  //     dispatch(
  //       premiumSchedulePlanAction(
  //         { driver_id: driverData?.id },
  //         onFetchSuccess,
  //         onFetchError
  //       )
  //     );
  //   }
  // }, [cashPaymentMethod, driverData?.id]);

  function premiumSwitchOrScheduleFn() {
    if (cashPaymentMethod === "switch_premium") {
      dispatch(
        premiumPlanAction(
          { driver_id: params?.id },
          onFetchSuccess,
          onFetchError
        )
      );
    } else if (cashPaymentMethod === "schedule_premium") {
      dispatch(
        premiumSchedulePlanAction(
          { driver_id: params?.id },
          onFetchSuccess,
          onFetchError
        )
      );
    }
  }
  const onFetchSuccess = (data) => {
    setLoading(false);
    setPremiumPlanData(data?.data);
    setSwitchPremiumModal(true);
    console.log(data, "asdbkads");
  };
  const onFetchError = (data) => {
    setLoading(false);
    console.log(data, "asdbkads");
    setPremiumPlanData([]);
  };

  //   useEffect(() => {
  //     pageData && setLoading(false);
  //   });
  return (
    <>
      <div className={`${styles.rider_history_table_container}`}>
        {loading && <LoadingSpinnerTable />}
        {/* {tableHeading.map((item, index) => {
                    const isActiveSortIndex = activeSortIndex === index;
                    return (
                      <SearchInputfield
                        title={item?.title}
                        requestSort={requestSort}
                        sortName={item?.value}
                        key={item?.title}
                        index={index}
                        isActiveSortIndex={isActiveSortIndex}
                        setActiveSortIndex={setActiveSortIndex}
                        sortConfig={sortConfig}
                      />
                    );
                  })} */}
        <table
          ref={onClickRef}
          className={`table manage_fare_list_navbar text-nowrap`}
        >
          <thead>
            <tr className={`orange_bg`}>
              <th scope="col" className={`${style.first_list} transparent_bg`}>
                <span className="white_color fs_14 fw_500">Premium Ref Id</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Premium Type</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Validity</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Status</span>
              </th>

              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">
                  Transaction Date
                </span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Auto Pay</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Start Date</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">Expiry Date</span>
              </th>
              <th scope="col" className={`transparent_bg`}>
                <span className="white_color fs_14 fw_500">
                  Transaction mode
                </span>
              </th>
              <th scope="col" className={`${style.last_list} transparent_bg`}>
                <span
                  className={`white_color fs_14 text-nowrap d-flex align-items-center fw_500`}
                ></span>
              </th>
            </tr>
          </thead>
          <tbody className="light_blue_bg">
            {/* <LoadAndError
              loader={loading}
              error={error}
              status={rideData?.data?.length === 0}
            > */}
            {driverPremiumData?.data?.map((item, index) => {
              const start_date = new Date(item?.start_date);
              let isOlderThanThreeDays = false;

              if (start_date !== "" && start_date !== null) {
                const currentDate = new Date();
                const differenceInMilliseconds = currentDate - start_date;
                const differenceInDays =
                  differenceInMilliseconds / (1000 * 60 * 60 * 24);

                if (differenceInDays > 3) {
                  isOlderThanThreeDays = true;
                }
              }
              return (
                <tr key={index}>
                  <SwitchPremiumModal
                    switchPremiumModal={switchPremiumModal}
                    handleSwitchPremiumClose={() =>
                      setSwitchPremiumModal(false)
                    }
                    premiumPlanData={premiumPlanData}
                    // reload={reload}
                    // setReload={setReload}
                    driver_id={params?.id}
                    type={
                      cashPaymentMethod === "switch_premium"
                        ? "Switch"
                        : cashPaymentMethod === "schedule_premium"
                        ? "Schedule"
                        : ""
                    }
                  />
                  <td>
                    <NavLink
                      className=" secondary_color"
                      to={navigationFn(item?.id)}
                      // target='_blank'
                    >
                      <span className="secondary_color  fs_14 fw_500">
                        {item?.premium_code ? item?.premium_code : "--"}
                      </span>
                    </NavLink>
                  </td>

                  <td>
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.premium_type ? item?.premium_type : "--"}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.validity ? item?.validity : "--"}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.status ? item?.status : "--"}
                    </span>
                  </td>

                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.transaction_date === null
                        ? "--"
                        : moment(item?.transaction_date).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.auto_pay ? item?.auto_pay : "--"}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.start_date === null
                        ? "--"
                        : moment(item?.start_date).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                    </span>
                  </td>
                  <td>
                    <span className="secondary_color fs_14 fw_500">
                      {item?.expiry_date === null
                        ? "--"
                        : moment(item?.expiry_date).format(
                            "DD-MM-YYYY HH:mm:ss"
                          )}
                    </span>
                  </td>

                  <td>
                    <span className="secondary_color  fs_14 fw_500">
                      {item?.transaction_mode ? item?.transaction_mode : "--"}
                    </span>
                  </td>

                  <td className={`position-relative`}>
                    <div
                      ref={insideClickRef}
                      className="secondary_color fs_14 fw_500 mx-2"
                      onClick={() => {
                        setPremiumMoreOptions(true);
                        setSelectedOptionIndex(index);
                      }}
                    >
                      <MoreIcon
                        fill="#0F203C"
                        height="22"
                        width="22"
                        className={`box_shadow_00000029 rounded-2 p-1 cursor_pointer`}
                      />
                    </div>

                    {premiumMoreOptions && selectedOptionIndex === index && (
                      <div
                        style={{ right: "26px", top: "22px", zIndex: 55545 }}
                        className={`position-absolute secondary_color bg-white p-2 box_shadow_00000029 rounded-3`}
                      >
                        {item?.premium_type !== "Premium3" && (
                          <>
                            <span className={`mx-2 cursor_pointer`}>
                              Invoice-1
                            </span>
                            <hr className={`m-1 p-0`} />
                          </>
                        )}
                        {isOlderThanThreeDays ? (
                          <>
                            {item?.premium_type !== "Premium3" && (
                              <>
                                <span
                                  onClick={() => {
                                    setCashPaymentMethod("schedule_premium");
                                    premiumSwitchOrScheduleFn();
                                  }}
                                  className={`mx-2 cursor_pointer`}
                                >
                                  Schedule
                                </span>
                                <hr className={`m-1 p-0`} />
                              </>
                            )}
                            {item?.status !== "Halted" && (
                              <span
                                onClick={() => {
                                  setCashPaymentMethod("switch_premium");
                                  premiumSwitchOrScheduleFn();
                                }}
                                className={`mx-2 cursor_pointer`}
                              >
                                Switch
                              </span>
                            )}
                          </>
                        ) : (
                          <>
                            {item?.status !== "Halted" && (
                              <span className={`mx-2 cursor_pointer`}>
                                Cancel
                              </span>
                            )}
                          </>
                        )}
                        {item?.status !== "Halted" && (
                          <hr className={`m-1 p-0`} />
                        )}
                        {item?.premium_type !== "Premium3" &&
                          item?.status !== "Halted" && (
                            <span className={`mx-2 cursor_pointer`}>
                              {item?.auto_renewal ? (
                                <span onClick={() => cancelAutoRenewFn(item)}>
                                  Deactivate auto-renewal
                                </span>
                              ) : (
                                <span onClick={() => autoRenewFn(item)}>
                                  Activate auto-renewal
                                </span>
                              )}
                            </span>
                          )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {/* </LoadAndError> */}
          </tbody>
        </table>
      </div>
      <div className="mt-5 pt-3">
        <TablePaginations
          paginate={handlePagination}
          currentPage={page}
          pageData={pageData}
        />
      </div>
    </>
  );
};

export default DriverPremiumStatusHistoryTable;
