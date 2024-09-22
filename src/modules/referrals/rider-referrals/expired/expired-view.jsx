import React from "react";
import { useLocation, useParams } from "react-router";
import CreateReferralDetails from "../../../../components/referrals/riderReferrals/create-referral-details";

const ReferralExpiredView = () => {
  const Data = useLocation();
  const params = useParams();

  return (
    <>
        <CreateReferralDetails Data={Data} params={params} />
    </>
  );
};
export default ReferralExpiredView;
