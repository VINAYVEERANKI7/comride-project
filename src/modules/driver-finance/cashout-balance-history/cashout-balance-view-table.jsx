import React from "react";
import DriverCurbalDetails from "../../../components/driver-finance/driver-finance-details/driver-curbal-details";
import DriverCashoutBalanceHistoryDetails from "../../../components/driver-finance/driver-finance-details/driver-cashout-balance-history";

const CashoutBalanceViewTable = () => {
  return (
    <>
      <DriverCashoutBalanceHistoryDetails type={"cashoutBalanceHistory"} />
    </>
  );
};

export default CashoutBalanceViewTable;
