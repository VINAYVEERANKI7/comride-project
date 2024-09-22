import React from "react";
import "../manage-booking-requests.css";
import BookingRequestTable from "../../../components/manage-booking-request/bookingRequestTable";

const UnsuccessFulRequests = () => {
  return (
    <>
      <BookingRequestTable type="unsuccessfulRequests" />
    </>
  );
};

export default UnsuccessFulRequests;
