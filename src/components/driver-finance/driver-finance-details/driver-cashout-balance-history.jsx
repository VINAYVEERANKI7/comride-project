import React, { useEffect, useRef, useState } from "react";
import InnerLayout from "../../layout/innerLayout";
import {
  capitalizeFirstLetter,
  driverNavigateFn,
  insertSpaces,
  navigationFn,
  removeUnderScore,
  useSortableData,
} from "../../helper";
import { driFinCashTransHisFindOneAction } from "../../../redux/actions/driverFinanceAction/cashoutTransactionHistory";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import errorToast from "../../utilits/errorToast";
import LoadingSpinnerTable from "../../utilits/loadingSpinnerTable";
import SearchInputfield from "../../form/searchInputfield";
import styles from "../../../modules/manage-admins/manage-admins.module.css";
import useDisplayToggle from "../../useDisplayToggle";
import LoadAndError from "../../utilits/loadAndError";
import moment from "moment";

const DriverCashoutBalanceHistoryDetails = ({ type = "" }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [driverFinanceDataList, setDriverFinanceDataList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkList, setCheckList] = useState();
  const { items, requestSort, sortConfig } = useSortableData();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const onClickRef = useRef(null);
  const insideClickRef = useRef(null);
  const [dropDown, setDropDown] = useState(false);
  useDisplayToggle({
    onClickRef,
    insideClickRef,
    setDisplay: setDropDown,
  });

  function checkboxChecker(e) {
    if (checkList === e.target.id) {
      setCheckList("");
    } else {
      setCheckList(e.target.id);
    }
  }

  console.log(driverFinanceDataList?.bookings, "driverFinanceDataList");

  useEffect(() => {
    setLoading(true);
    dispatch(
      driFinCashTransHisFindOneAction(
        {
          driver_id: params.id,
        },
        page,
        onSuccess,
        onError
      )
    );
  }, []);

  const onSuccess = (data) => {
    console.log(data.data, type, "cashoutBalanceHistory");
    setDriverFinanceDataList(data?.data);
    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };

  const onError = (data) => {
    errorToast(data?.data?.data);
    setErrorMessage(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  const sidebarTableData = [
    {
      label: "Driver ID",
      value: driverFinanceDataList.driver?.driver_id2,
      navLink: true,
      link: driverNavigateFn(
        driverFinanceDataList?.driver,
        driverFinanceDataList?.driver?.id
      ),
    },
    {
      label: "First Name",
      value: driverFinanceDataList.driver?.first_name,
    },
    {
      label: "Last Name",
      value: driverFinanceDataList.driver?.last_name
        ? capitalizeFirstLetter(driverFinanceDataList.driver?.last_name)
        : "--",
    },
    {
      label: "Phone Number",
      value: driverFinanceDataList.driver?.phone_number,
    },
    {
      label: "Driver Type",
      value: driverFinanceDataList.driver?.driver_type
        ? removeUnderScore(driverFinanceDataList.driver?.driver_type)
        : "--",
    },

    {
      label: "Current Balance",
      value: driverFinanceDataList.driver?.current_balance,
      style: {
        color:
          driverFinanceDataList.driver?.current_balance < 0
            ? "error_color"
            : "black",
      },
    },
    {
      label: "Cashout Balance",
      value: driverFinanceDataList.cashout_amount,
    },
  ];
  const tableHeading = [
    { title: "Transaction Time", value: "deposite_date" },
    { title: "Type", value: "deposite_time" },
    { title: "Reference Id", value: "coupon_type" },
    { title: "Amount(₹)", value: "" },
    { title: "Rider Payment Status", value: "" },
    { title: "Driver Trip Payout Status", value: "" },
    { title: "Current Balance(₹)", value: "" },
  ];
  return (
    <>
      <InnerLayout
        mainHeading={type ? insertSpaces(type) : "--"}
        navigateEnable={true}
        heading_classname={"ms-0"}
      >
        <div className="row mt-2">
          {Array.from(
            { length: Math.ceil(sidebarTableData?.length / 3) },
            (_, i) => (
              <div className={`col-lg-3  fs_15`} key={i}>
                {sidebarTableData?.slice(i * 4, i * 4 + 4)?.map((item) => (
                  <div className="d-flex mb-2" key={item.label}>
                    <div
                      className="secondary_color fw_500"
                      style={{ width: "180px" }}
                    >
                      {item?.label}
                    </div>
                    <div
                      className="flex-grow-1 text-start primary_color ms-4 fw_500 position-relative"
                      style={{
                        width: "150px",
                        color: item.value < 0 ? "red" : "",
                      }}
                    >
                      {item?.navLink ? (
                        <NavLink className="primary_color" to={item?.link}>
                          {item?.value}
                        </NavLink>
                      ) : (
                        item?.value
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        <div className="row mt-3">
          <div className="col-md-12 table_container">
            {loading && <LoadingSpinnerTable />}
            <table className="table text-nowrap">
              <thead>
                <tr className="pale_blue_bg">
                  <th
                    scope="col"
                    className={`${styles.first_list} transparent_bg`}
                  >
                    <input
                      type="checkbox"
                      className="manage_fare_checkbox_row ms-2"
                      id="mastercheck"
                    />
                  </th>
                  <th
                    className="cursor_pointer fs_14 fw_500 text-nowrap position-relative transparent_bg"
                    onClick={
                      type === "currentBalance"
                        ? () => setDropDown(!dropDown)
                        : null
                    }
                    ref={onClickRef}
                  >
                    Transaction Date
                  </th>

                  {tableHeading.map((item, index) => {
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
                  })}
                  <th className={`${styles.last_list} transparent_bg`}></th>
                </tr>
              </thead>

              <tbody className="light_blue_bg">
                <LoadAndError
                  loader={loading}
                  error={error}
                  status={
                    driverFinanceDataList?.driver_coupon_usages?.length === 0 &&
                    driverFinanceDataList?.driver_referral_sender_usages
                      ?.length === 0 &&
                    driverFinanceDataList?.driver_incentive_usage_histories
                      ?.length === 0 &&
                    driverFinanceDataList?.driver_referral_reciver_usages
                      ?.length === 0 &&
                    driverFinanceDataList?.bookings?.length === 0
                    //  "---This table is empty ---"
                  }
                  errorMessage={errorMessage}
                >
                  {driverFinanceDataList?.driver_coupon_usages?.map((item) => (
                    <tr>
                      <th scope="row">
                        <input
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>

                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.deposite_date
                            ? moment(item?.deposite_date).format("DD-MM-YYYY")
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.deposite_time ? item?.deposite_time : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver_coupon?.coupon_type
                            ? removeUnderScore(item?.driver_coupon?.coupon_type)
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          className={"secondary_color fs_14 fw_500"}
                          to={`/driver-coupons/usage-history/view/${item?.driver_coupon?.id}`}
                          state={{
                            coupon_id: item?.driver_coupon?.coupon_code,
                            coupon_status: item?.driver_coupon?.coupon_status,
                          }}
                        >
                          {item?.driver_coupon?.coupon_code
                            ? item?.driver_coupon?.coupon_code
                            : "--"}
                        </NavLink>
                      </td>

                      <td>
                        <span
                          className={`secondary_color fs_14 fw_500 ${
                            item?.current_balance < 0 ? "error_color" : ""
                          }`}
                        >
                          {item?.driver_coupon?.cb_deposite_amount
                            ? item?.driver_coupon?.cb_deposite_amount
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">--</span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">--</span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.current_balance ? item?.current_balance : "--"}
                        </span>
                      </td>
                      <th className={`${styles.last_list} transparent_bg`}></th>
                    </tr>
                  ))}

                  {driverFinanceDataList?.driver_referral_sender_usages?.map(
                    (item) => (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            driverFinanceDataList
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deposite_date
                              ? moment(item?.deposite_date).format("DD-MM-YYYY")
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deposite_time ? item?.deposite_time : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.driver_referral_sender?.receiver_coupon_type
                              ? item?.driver_referral_sender
                                  ?.receiver_coupon_type
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <NavLink
                            className={"secondary_color fs_14 fw_500"}
                            to={`/driver-referral/sender-history/view/${item?.driver_referral_sender?.id}`}
                            state={{
                              referral_classification:
                                item?.driver_referral_sender
                                  ?.referral_classification,
                              referral_id:
                                item?.driver_referral_sender?.referral_code,
                              referral_status:
                                item?.driver_referral_sender?.referral_status,
                            }}
                          >
                            {item?.driver_referral_sender?.referral_code ??
                              "--"}
                          </NavLink>
                        </td>

                        <td>
                          <span
                            className={`secondary_color fs_14 fw_500 ${
                              item?.current_balance < 0 ? "error_color" : ""
                            }`}
                          >
                            {item?.driver_referral_sender
                              ?.sender_cb_deposite_amount
                              ? item?.driver_referral_sender
                                  ?.sender_cb_deposite_amount
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.current_balance
                              ? item?.current_balance
                              : "--"}
                          </span>
                        </td>
                        <th
                          className={`${styles.last_list} transparent_bg`}
                        ></th>
                      </tr>
                    )
                  )}

                  {driverFinanceDataList?.driver_incentive_usage_histories?.map(
                    (item) => (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deposite_date
                              ? moment(item?.deposite_date).format("DD-MM-YYYY")
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.deposite_time ? item?.deposite_time : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.driver_incentive?.incentive_classification
                              ? item?.driver_incentive?.incentive_classification
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <NavLink
                            className={"secondary_color fs_14 fw_500"}
                            to={`/driver-incentive/usage-history/view/${item?.driver_incentive?.id}`}
                          >
                            {item?.driver_incentive?.incentive_code ?? "--"}
                          </NavLink>
                        </td>

                        <td>
                          <span
                            className={`secondary_color fs_14 fw_500 ${
                              item?.driver_incentive?.incentive_time_slots1?.some(
                                (slot) => slot?.amount < 0
                              )
                                ? "error_color"
                                : ""
                            }`}
                          >
                            {item?.driver_incentive?.incentive_time_slots1?.map(
                              (slot) => slot?.amount
                            )}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {/* {item?.current_balance ? item?.current_balance : "--"} */}
                            {item?.current_balance
                              ? item?.current_balance
                              : "--"}
                          </span>
                        </td>
                        <th
                          className={`${styles.last_list} transparent_bg`}
                        ></th>
                      </tr>
                    )
                  )}

                  {driverFinanceDataList?.driver_referral_reciver_usages?.map(
                    (item) => (
                      <tr>
                        <th scope="row">
                          <input
                            type="checkbox"
                            className="manage_fare_checkbox ms-2"
                            onChange={checkboxChecker}
                          />
                        </th>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.used_date
                              ? moment(item?.used_date).format("DD-MM-YYYY")
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.used_date
                              ? moment(item?.used_date).format("HH:MM:SS")
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.driver_referral_reciver
                              ?.referral_classification
                              ? item?.driver_referral_reciver
                                  ?.referral_classification
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <NavLink
                            className={"secondary_color fs_14 fw_500"}
                            to={`/driver-referral/reciever-history/view/${item?.driver_referral_reciver?.id}`}
                            state={{
                              referral_classification:
                                item?.driver_referral_reciver
                                  ?.referral_classification,
                              referral_id:
                                item?.driver_referral_reciver?.referral_code,
                              referral_status:
                                item?.driver_referral_reciver?.referral_status,
                              coupon_type:
                                item?.driver_referral_reciver
                                  ?.receiver_coupon_type,
                            }}
                          >
                            {item?.driver_referral_reciver?.referral_code ??
                              "--"}
                          </NavLink>
                        </td>

                        <td>
                          <span
                            className={`secondary_color fs_14 fw_500 ${
                              item?.current_balance < 0 ? "error_color" : ""
                            }`}
                          >
                            {item?.driver_referral_reciver
                              ?.receiver_cb_deposite_amount
                              ? item?.driver_referral_reciver
                                  ?.receiver_cb_deposite_amount
                              : "--"}
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            --
                          </span>
                        </td>
                        <td>
                          <span className="secondary_color fs_14 fw_500">
                            {item?.current_balance
                              ? item?.current_balance
                              : "--"}
                          </span>
                        </td>
                        <th
                          className={`${styles.last_list} transparent_bg`}
                        ></th>
                      </tr>
                    )
                  )}

                  {driverFinanceDataList?.bookings?.map((item) => (
                    <tr>
                      <th scope="row">
                        <input
                          type="checkbox"
                          className="manage_fare_checkbox ms-2"
                          onChange={checkboxChecker}
                        />
                      </th>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver_billing?.createdAt
                            ? moment(item?.driver_billing?.createdAt).format(
                                "DD-MM-YYYY"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver_billing?.createdAt
                            ? moment(item?.driver_billing?.createdAt).format(
                                "HH:MM:SS"
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.booking_classification
                            ? removeUnderScore(item?.booking_classification)
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <NavLink
                          className={"secondary_color fs_14 fw_500"}
                          to={navigationFn(
                            item?.booking_classification,
                            item?.id
                          )}
                        >
                          {item?.booking_id_2 ?? "--"}
                        </NavLink>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.current_balance ? item?.current_balance : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.rider_payment?.payment_status
                            ? item?.rider_payment?.payment_status
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.driver_billing?.driver_trip_payout_status
                            ? removeUnderScore(
                                item?.driver_billing?.driver_trip_payout_status
                              )
                            : "--"}
                        </span>
                      </td>
                      <td>
                        <span className="secondary_color fs_14 fw_500">
                          {item?.current_balance ? item?.current_balance : "--"}
                        </span>
                      </td>
                      <th className={`${styles.last_list} transparent_bg`}></th>
                    </tr>
                  ))}
                </LoadAndError>
              </tbody>
            </table>
          </div>
        </div>
      </InnerLayout>
    </>
  );
};

export default DriverCashoutBalanceHistoryDetails;
