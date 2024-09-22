import React, { useState } from "react";
import RiderProfileTop from "./riderProfileTop";
import BookingHistorytable from "./bookingHistorytable";
import Kyctable from "./Kyctabledata";

const RiderDetails = ({
  rideHistoryDetails,
  riderData,
  type,
  page,
  setPage,
  totalPages,
  rideHistoryLoading,
  setOrderType,
  setOrderValue,
  orderType,
  orderValue,
}) => {
  const [riderTabs, setRiderTabs] = useState("Bookings History");
  return (
    <>
      <div className={`row ms-3`}>
        <RiderProfileTop riderData={riderData} type={type} />

        <div className="d-flex gap-4">
          <div
            onClick={() => setRiderTabs("Bookings History")}
            className={`mb-3 fw_500 py-2 cursor_pointer ${
              riderTabs === "Bookings History"
                ? "light_blue_color border_bottom_blue"
                : "secondary_color"
            }`}
          >
            Bookings History
          </div>

          {/* <div
            onClick={() => setRiderTabs("KYC Document")}
            className={`mb-3 fw_500 py-2 cursor_pointer ${
              riderTabs === "KYC Document"
                ? "light_blue_color border_bottom_blue"
                : "secondary_color"
            }`}
          >
            KYC Document
          </div> */}
        </div>
      </div>
      {riderTabs === "Bookings History" ? (
        <BookingHistorytable
          riderBookingHistory={rideHistoryDetails}
          currentPage={page}
          pagesCount={totalPages}
          setCurrentPage={setPage}
          loading={rideHistoryLoading}
          setOrderType={setOrderType}
          setOrderValue={setOrderValue}
          orderType={orderType}
          orderValue={orderValue}
        />
      ) : (
        riderTabs === "KYC Document" && <Kyctable />
      )}
    </>
  );
};

export default RiderDetails;
