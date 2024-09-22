import React from "react";
import { useLocation, useParams } from "react-router";
import BroadcastRiderdetails from "../../../components/broadcast/broadcastRiderDetails";

const ActiveRiderBroadcast = () => {
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

export default ActiveRiderBroadcast;
