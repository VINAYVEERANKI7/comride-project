import React from "react";
import ComplaintsMobileApp from "../../../components/complaints/mobileApp";
import { useLocation } from "react-router";
import RiderComplaintChat from "../../../components/complaints/rider-complaint-chat";

const RiderMobileApp = () => {
  const navLoaction = useLocation();
  return (
    <>
      <RiderComplaintChat type="riderComplaints" navLoaction={navLoaction} />
      {/* <ComplaintsMobileApp type="riderComplaints" navLoaction={navLoaction}/> */}
    </>
  );
};

export default RiderMobileApp;
