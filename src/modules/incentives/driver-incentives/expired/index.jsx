import React from 'react'
import DriverIncentivesDetails from "../../../../components/incentives/driverIncentives/driverIncentivesDetails";
import { useLocation, useParams } from "react-router";

const DriverIncentiveExpired = () => {
  const location = useLocation();
  const params = useParams();
  const is_editable = location?.state?.edit;
  return (
    <>
    <DriverIncentivesDetails
    location={location}
    params={params}
    is_editable={is_editable}
    type="expired"
  />
  </>
  )
}

export default DriverIncentiveExpired;