import React, { useEffect, useState } from "react";
import BackIcon from "../../assets/icons/backIcom";
import "./generaldashboard.css";
import { useDispatch } from "react-redux";
import {
  dashboardDetailsAction,
  dashboardGraphDetailsAction,
} from "../../redux/actions/dashboard/dashboard-action";
import DashboardComponent from "../dashboard/general-dashboard/dashboard-component";
import live from "../../assets/images/LiveRounded.svg";
import Today from "./today";
import Alltime from "./alltime";
import { Spinner } from "react-bootstrap";

const GeneralDashboard = () => {
  const dispatch = useDispatch();
  const [activeStatus, setActiveStatus] = useState("Today");
  const [dashboardDetailsData, setDashboardDetailsData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(
      dashboardDetailsAction(
        {
          search: {
            type: activeStatus,
          },
        },
        onFetchSuccess,
        onFetchError
      )
    );
  }, [activeStatus]);
  loading;

  const onFetchSuccess = (data) => {
    setLoading(false);
    setDashboardDetailsData(data.data);
  };
  const onFetchError = () => {
    setLoading(false);
  };

  return (
    <div className="rider_coupon">
      <div className="d-flex align-items-end mx-2">
        <label className="mb-2 pb-1">
          <BackIcon />
        </label>
        <label className="generaldashboard">General Dashboard</label>
      </div>
      {loading ? (
        <div
          style={{ height: "80vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </div>
      ) : (
        <>
          <div className="live-container d-flex justify-content-center py-3 my-4">
            <div className="d-flex align-items-center">
              <div>
                <img src={live} alt="live" />
              </div>
              <div className="mx-5 text-dark">
                {dashboardDetailsData !== null && (
                  <div>
                    <label className="text-secondary px-4">
                      On-going Trips
                      <span className="text-primary mx-2">
                        {dashboardDetailsData?.ongoingTripsCount ?? 0}
                      </span>
                    </label>
                    <label
                      className="text-secondary px-4 py-2"
                      style={{ borderLeft: "1.5px solid lightgrey" }}
                    >
                      Online Drivers
                      <span className="text-primary mx-2">
                        {dashboardDetailsData?.onlineDriversCount ?? 0}
                      </span>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="todayalltimestyles d-flex my-4">
            <div
              onClick={() => setActiveStatus("Today")}
              className={`mb-3 fw_500 py-2 cursor_pointer ${
                activeStatus === "Today"
                  ? "light_blue_color border_bottom_blue"
                  : "secondary_color"
              }`}
              style={{ marginRight: "10px" }}
            >
              Today
            </div>
            <div
              style={{ marginLeft: "40px" }}
              onClick={() => setActiveStatus("AllTime")}
              className={`mb-3 fw_500 py-2 cursor_pointer ${
                activeStatus === "AllTime"
                  ? "light_blue_color border_bottom_blue"
                  : "secondary_color"
              }`}
            >
              All-Time
            </div>
          </div>

          <DashboardComponent
            activeStatus={activeStatus}
            dashboardDetailsData={dashboardDetailsData}
          />
        </>
      )}

      {/* {activeStatus === "Today" && (
        <Today dashboardDetailsData={dashboardDetailsData} />
      )}
      {activeStatus === "AllTime" && <Alltime />} */}

      {/* generaldashboard */}
    </div>
  );
};

export default GeneralDashboard;
