import React from "react";
import { BalanceStatus } from "../helper";
import DriversDocumentsTable from "../manage-drivers/manageDriversTable/driversDocumentsTable";
import { NavLink } from "react-router-dom";
import moment from "moment";

const DriverDetailsFindOne = ({ driverData, driverId, profileData, type }) => {
  console.log(type, "type");
  return (
    <div>
      <table className="d-flex col-12 fs_13 gap-3">
        <tbody itemScope="col" className="col-3">
          <tr>
            <td className={`disabled_color  py-1`}>First Name</td>
            <td>{driverData?.first_name ?? "--"}</td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>Last Name</td>
            <td>{driverData?.last_name ?? "--"}</td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>Gender</td>
            <td>{driverData?.gender ?? "--"}</td>
          </tr>
          <tr>
            <td className={`disabled_color  py-1`}>DOB</td>
            <td>
              {driverData?.dob
                ? moment(driverData?.dob).format("DD/MM/YYYY")
                : "--"}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Referral Code</td>
            <td>{driverData?.referral_code ?? "--"}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Registered Zone</td>
            <td>{driverData?.registered_zone_name?.zone_name ?? "--"}</td>
          </tr>
        </tbody>
        <tbody itemScope="col" className="col-3">
          <tr>
            <td className={`disabled_color py-1`}>Phone Number</td>
            <td>{driverData?.phone_number ?? "--"}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Email ID</td>
            <td>{driverData?.email ?? "--"}</td>
          </tr>
          <tr>
            <td className={` disabled_color py-1`}>Current Balance</td>
            <td
              className={`${
                BalanceStatus(driverData?.current_balance) ?? "red_color"
              }`}
            >
              ₹ {driverData?.current_balance}{" "}
            </td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Driver Type</td>
            <td>{driverData?.driver_type}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Total Rides Cancelled</td>
            <td>{driverData?.rides_cancelled_count ?? "-"}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Total Rides Denied</td>
            <td>{driverData?.rides_denied_count ?? "-"}</td>
          </tr>
        </tbody>
        <tbody itemScope="col" className="col-6">
          <tr>
            <td className={`disabled_color py-1`}>Account Blocked Count</td>
            <td>{driverData?.blocked_count ?? "-"}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>
              Application Rejected Count
            </td>
            <td>{driverData?.application_rejected_count ?? "-"}</td>
          </tr>
          <tr>
            <td className={`disabled_color py-1`}>Admin Comments</td>
            <td style={{ maxWidth: "15rem" }}>
              {driverData?.admin_comments ?? "-"}
            </td>
          </tr>
        </tbody>
      </table>

      <DriversDocumentsTable driverData={driverData} />
      {profileData.state.edit ? (
        <NavLink
          to={`${
            type === "blockedDrivers"
              ? "/blocked-drivers"
              : type === "pendingRideHistory"
              ? "/pending-applications"
              : type === "rejectApplication"
              ? "/rejected-applications"
              : type === "expiredDocuments"
              ? "/expired-documents"
              : "/manage-drivers"
          }/driver-details-edit/${driverId}`}
          state={{ type: type }}
          className={`d-flex justify-content-end`}
          style={{ textDecoration: "none" }}
        >
          <button
            className={`primary_bg text-white border-0 py-1 px-5 rounded-2 my-2`}
          >
            Edit
          </button>
        </NavLink>
      ) : null}
    </div>
  );
};

export default DriverDetailsFindOne;
