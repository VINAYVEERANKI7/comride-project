import React from "react";
import { useLocation, useParams } from "react-router";
import Broadcastdetails from "../../../components/broadcast/broadcastdetails";
import BroadcastRiderdetails from "../../../components/broadcast/broadcastRiderDetails";

const RiderBroadcastExpired = () => {
  const params = useParams();
  const location = useLocation();
  return (
    <>
      <BroadcastRiderdetails
        params={params}
        location={location}
        type={"Rider"}
      />
    </>
  );
};

export default RiderBroadcastExpired;
