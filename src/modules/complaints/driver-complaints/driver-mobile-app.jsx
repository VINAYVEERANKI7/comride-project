import React from "react";
import { useLocation } from "react-router";
import DriverComplaintChat from "../../../components/complaints/driver-complaint-chat";

const DriverMobileApp = () => {
  const navLoaction = useLocation();
  return (
    <>
      <DriverComplaintChat type="driverComplaints" navLoaction={navLoaction} />
    </>
  );
};
export default DriverMobileApp;
