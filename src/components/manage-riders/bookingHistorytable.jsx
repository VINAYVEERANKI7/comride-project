import React, { useState } from "react";
import "./bookinghistorytablestyle.css";
import ArrowDownIcon from "../../assets/icons/arrowDownIcon";
import ArrowUpIcon from "../../assets/icons/arrowUpIcon";
import LoadingSpinnerTable from "../utilits/loadingSpinnerTable";

function BookingHistorytable({
  riderBookingHistory,
  orderType,
  setOrderType,
  setOrderValue,
  orderValue,
  pagesCount,
  loading,
  currentPage,
  setCurrentPage,
}) {
  const [showBookingPopup, setShowBookingPopup] = useState(false);

  const bookkingClassificationArray = [
    "Ongoing Booking",
    "Completed Booking",
    "Cancelled Booking",
    "Accident Booking",
  ];

  return (
    <>
      <div>
        <table className="table border_radius_5px mx-2">
          <thead>
            <tr>
              <th className="   orange_bg text-align-center text-white fs_16 fw_400">
                Booking Id
                {orderType === "DESC" && orderValue === "booking_id_2" ? (
                  <ArrowUpIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowUpFn={() => {
                      setOrderType("ASC");
                      setOrderValue("booking_id_2");
                    }}
                  />
                ) : (
                  <ArrowDownIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowDownFn={() => {
                      setOrderType("DESC");
                      setOrderValue("booking_id_2");
                    }}
                  />
                )}
              </th>
              <th className="orange_bg text-align-center text-white fs_16 fw_400">
                Driver Vehicle Id
              </th>
              <th
                className="orange_bg text-align-center text-white fs_16 fw_400"
                onClick={() => setShowBookingPopup(!showBookingPopup)}
              >
                Booking Classification
              </th>
              <th className="orange_bg text-align-center text-white fs_16 fw_400">
                Start Date & Time
                {orderType === "DESC" && orderValue === "start_date" ? (
                  <ArrowUpIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowUpFn={() => {
                      setOrderType("ASC");
                      setOrderValue("start_date");
                    }}
                  />
                ) : (
                  <ArrowDownIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowDownFn={() => {
                      setOrderType("DESC");
                      setOrderValue("start_date");
                    }}
                  />
                )}
              </th>
              <th className="orange_bg text-align-center text-white fs_16 fw_400">
                End Date & Time
              </th>
              <th className="orange_bg text-align-center text-white fs_16 fw_400">
                Trip Duration
              </th>
              <th className="orange_bg text-align-center text-white fs_16 fw_400">
                Final Fare
                {orderType === "DESC" && orderValue === "final_fare" ? (
                  <ArrowUpIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowUpFn={() => {
                      setOrderType("ASC");
                      setOrderValue("final_fare");
                    }}
                  />
                ) : (
                  <ArrowDownIcon
                    width={24}
                    height={26}
                    fill="white"
                    arrowDownFn={() => {
                      setOrderType("DESC");
                      setOrderValue("final_fare");
                    }}
                  />
                )}
              </th>
            </tr>
          </thead>
          {riderBookingHistory?.length > 0 ? (
            <tbody>
              {loading ? (
                <LoadingSpinnerTable />
              ) : (
                <>
                  {" "}
                  {riderBookingHistory?.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td className="secondary_color fs_14 px-3">
                          {item.booking_id_2 ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          {item.DriverVehicleNumber ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          {item.booking_classification ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          {item.start_date ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          {item.end_date ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          {item.trip_duration ?? "--"}
                        </td>
                        <td className="secondary_color fs_14 px-3">
                          ₹ {item.final_fare ?? "--"}
                        </td>
                      </tr>
                    );
                  })}{" "}
                </>
              )}
            </tbody>
          ) : (
            <div className="text-center w-100 mt-2">No data found</div>
          )}
        </table>

        {showBookingPopup && (
          <div className="Popup">
            <div className="popup_pointer"></div>

            {bookkingClassificationArray?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <p className="primary_color fs_14 mx-3 mb-2 mt-1">{item}</p>
                  <hr className="m-0" />
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className="pagination">
          <span>
            {currentPage + 1} / {pagesCount}
          </span>
          <p
            className="arrowstyles"
            onClick={() =>
              setCurrentPage(
                currentPage + 1 === pagesCount ? currentPage - 1 : currentPage
              )
            }
            disabled={currentPage === 0}
          >
            &lt;
          </p>

          <p
            className="arrowstyles"
            onClick={() =>
              setCurrentPage(
                currentPage < pagesCount - 1 ? currentPage + 1 : currentPage
              )
            }
            disabled={currentPage === pagesCount}
          >
            &gt;
          </p>
        </div>
      </div>
    </>
  );
}

export default BookingHistorytable;
