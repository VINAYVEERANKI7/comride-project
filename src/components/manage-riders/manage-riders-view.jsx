import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import * as riderAction from "../../redux/actions/manageRidersAction";
import errorToast from "../utilits/errorToast";
import InnerLayout from "../layout/innerLayout";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";
import ErrorPageComponent from "../errorPageComponent";
import RiderProfileTop from "./riderProfileTop";
import BookingHistorytable from "./bookingHistorytable";
import ViewKycTable from "./viewKycTable";

function RiderHistoryComponent({ type = "" }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [page, setPage] = useState(0);
  const [pageData, setPageData] = useState({ noOfItems: 0, noOfPages: 0 });
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [error, setError] = useState(false);
  const [riderFindOneTab, setRiderFindOneTab] = useState("Booking Hisory");
  const [riderTable, setRiderTable] = useState(false);
  const [riderData, setriderData] = useState();
  const [rideHistoryDetails, setRideHistoryDetails] = useState();
  const [orderType, setOrderType] = useState("ASC");
  const [orderValue, setOrderValue] = useState("booking_id_2");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (type === "manageRiders") {
      setLoading(true);
      dispatch(
        riderAction.riderViewAction(
          {
            id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "blockedRiders") {
      setLoading(true);
      dispatch(
        riderAction.blockedRiderViewAction(
          {
            id: params?.id,
          },
          onSuccess,
          onError
        )
      );
    } else if (type === "deletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.deletedRiderViewAction(
          {
            rider_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
              start_date: "",
              end_date: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    } else if (type === "permanentlyDeletedRiders") {
      setLoading(true);
      dispatch(
        riderAction.permanentlyDelRiderViewAction(
          {
            rider_id: params?.id,
            search: {
              booking_id_2: "",
              booking_classification: "",
            },
          },
          page,
          onSuccess,
          onError
        )
      );
    }
  }, []);

  const onSuccess = (data) => {
    setriderData(data?.data);

    setPageData({
      noOfItems: data?.data?.count,
      noOfPages: data?.data?.pages,
    });
    setError(false);
    setLoading(false);
  };
  const onError = (data) => {
    errorToast(data?.data?.data);
    setError(true);
    setLoading(false);
  };

  useEffect(() => {
    setTableLoading(true);
    dispatch(
      riderAction.rideHistoryViewAction(
        {
          id: params?.id,
          search: {
            booking_id_2: "",
            booking_classification: "",
            start_date: "",
            end_date: "",
          },
        },
        page,
        orderType,
        orderValue,
        onRideHistorySuccess,
        onRideHistoryError
      )
    );
  }, [page, orderType, orderValue]);

  const onRideHistorySuccess = (data) => {
    setTableLoading(false);
    setRideHistoryDetails(data?.data?.data);
    setTotalPages(data?.data?.pages);
  };

  console.log(rideHistoryDetails, "rideHistoryDetails");
  const onRideHistoryError = (err) => {};

  const statusList = [];

  if (type === "manageRiders") {
    statusList?.push({
      backGroundColor: `${
        riderData?.rider_status === true
          ? "active_container"
          : "inactive_container"
      }`,
      value: riderData?.rider_status === true ? "Active" : "Inactive",
    });
  }

  if (type === "blockedRiders") {
    statusList?.push({
      backGroundColor: `blocked_active_container`,
      value: "Blocked",
    });
  }
  if (type === "deletedRiders") {
    statusList?.push(
      {
        backGroundColor:
          riderData?.rider_status === true
            ? "active_container"
            : "inactive_container",
        value: riderData?.rider_status === true ? "Active" : "Inactive",
      },
      { backGroundColor: "inactive_container", value: "Deleted" }
    );
  }

  return (
    <>
      {loading ? (
        <LoadingSpinnerTable />
      ) : error === true ? (
        <ErrorPageComponent />
      ) : (
        <InnerLayout
          navigateEnable={true}
          mainHeading={`Rider ID - ${riderData?.rider_id2}`}
          statusList={statusList}
          loading={loading}
        >
          <hr className="hr_line_color" />
          <div className="mt-5">
            {/* <div className="row">
                      <div className="col-xl-3 col-lg-5 col-12">
                        <RiderSidebar
                          riderSidebarData={riderData?.riderDetails}
                          riderTable={riderTable}
                          setRiderTable={setRiderTable}
                          type={type}
                        />
                      </div> 

            <div className="col-xl-9 col-lg-7 col-12">
                      <RideHistoryTable
                        rideData={riderData?.riderHistoryTable}
                        loading={loading}
                        error={error}
                        handlePagination={handlePagination}
                        page={page}
                        pageData={pageData}
                      />
                    </div> 
            </div> */}
            {/* <RiderDetails /> */}
            {/* <View/> */}
            {/* <div>
           gfhg
            </div> */}

            <RiderProfileTop riderData={riderData} type={type} />
            <div className="d-flex gap-4">
              <div
                onClick={() => setRiderFindOneTab("Booking Hisory")}
                className={`mb-3 fw_500 py-2 cursor_pointer ${
                  riderFindOneTab === "Booking Hisory"
                    ? "light_blue_color border_bottom_blue"
                    : "secondary_color"
                }`}
              >
                Bookings History
              </div>

              {/* <div
                onClick={() => setRiderFindOneTab("KYC Document")}
                className={`mb-3 fw_500 py-2 cursor_pointer ${
                  riderFindOneTab === "KYC Document"
                    ? "light_blue_color border_bottom_blue"
                    : "secondary_color"
                }`}
              >
                KYC Document
              </div> */}
            </div>
            {riderFindOneTab === "Booking Hisory" ? (
              <BookingHistorytable
                riderBookingHistory={rideHistoryDetails}
                setOrderType={setOrderType}
                orderType={orderType}
                setOrderValue={setOrderValue}
                orderValue={orderValue}
                setPage={setPage}
                page={page}
                pagesCount={totalPages}
                loading={tableLoading}
                currentPage={page}
                setCurrentPage={setPage}
              />
            ) : (
              riderFindOneTab === "KYC Document" && <ViewKycTable />
            )}
          </div>
        </InnerLayout>
      )}
    </>
  );
}

export default RiderHistoryComponent;
