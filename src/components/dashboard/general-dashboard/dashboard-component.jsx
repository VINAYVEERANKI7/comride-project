import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import exportFromJSON from "export-from-json";
import GraphComponent from "./graph-component";

const DashboardComponent = ({ dashboardDetailsData, activeStatus }) => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [sortColumn, setSortColumn] = useState("city");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const todayCardData = [
    {
      name: "Completed Trips",
      count: dashboardDetailsData?.completedTripsCount ?? 0,
      infoName: "Number of trips completed",
      infoDescription: "Overall Completed Trips",
      background: "bg-green",
    },
  ];
  const allTimeCardData = [
    {
      name: "Completed Trips",
      count: dashboardDetailsData?.completedTripsCount ?? 0,
      infoName: "Number of trips completed",
      infoDescription: "Overall Completed Trips",
      background: "bg-green",
    },
    {
      name: "Registered Users",
      count: dashboardDetailsData?.RegisteredUsers ?? 0,
      infoName: "Number of Registered Users",
      infoDescription: "Registered Users",
      background: "bg-lightblue",
    },
    {
      name: "Enabled Drivers",
      count: dashboardDetailsData?.RegisteredUsers ?? 0,
      infoName: "Number of Enabled Drivers",
      infoDescription: "Enabled Drivers",
      background: "bg-pink",
    },
  ];
  const handleInfoHover = (index) => {
    setHoverIndex(index);
  };
  const handleInfoLeave = () => {
    setHoverIndex(null);
  };
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fileName = "report"; // CSV
  const exportType = exportFromJSON.types.csv; // CSV

  const downloadDataFnc = () => {
    const tableData = [];
    if (dashboardDetailsData?.CityDetails?.length > 0) {
      dashboardDetailsData?.CityDetails?.map((item, index) => {
        tableData.push({
          "sl no": index + 1,
          City: item.zoneName?.zone_name ?? "--",
          bookings: item?.allBookingCount ?? 0,
          "Completed Trips": item?.completed_booking_count ?? 0,
        });
      });
      exportFromJSON({ data: tableData, fileName, exportType });
    }
  };
  return (
    <div className="mx-4">
      <div className="d-flex flex-wrap gap-5">
        {activeStatus === "Today" && (
          <>
            {todayCardData?.map((item, index) => (
              <div
                key={index}
                className={`${item?.background} dashboard-card-container rounded-3 text-center py-4 position-relative`}
              >
                <p className="fs_24 text-secondary d-flex justify-content-center align-items-start">
                  {item?.name}{" "}
                  <i
                    className="bx bx-info-circle fs_14 mt-2 mx-2 cursor_pointer"
                    onMouseEnter={() => handleInfoHover(index)}
                    onMouseLeave={handleInfoLeave}
                  ></i>
                </p>
                <p className="fs_34">{item?.count} </p>
                {hoverIndex === index && (
                  <div className="p-2 px-3 text-start position-absolute bg-dark info-container rounded-3">
                    <p>{item?.infoName}</p>
                    <div className="d-flex justify-content-between">
                      <div>{item?.count}</div>
                      <div className="px-2">---------</div>
                      <div className="col-7">{item?.infoDescription}s</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        {activeStatus === "AllTime" && (
          <>
            {allTimeCardData?.map((item, index) => (
              <div
                key={index}
                className={`${item?.background} dashboard-card-container rounded-3 text-center py-4 position-relative`}
              >
                <p className="fs_24 text-secondary d-flex justify-content-center align-items-start">
                  {item?.name}{" "}
                  <i
                    className="bx bx-info-circle fs_14 mt-2 mx-2 cursor_pointer"
                    onMouseEnter={() => handleInfoHover(index)}
                    onMouseLeave={handleInfoLeave}
                  ></i>
                </p>
                <p className="fs_34">{item?.count} </p>
                {hoverIndex === index && (
                  <div className="p-2 px-3 text-start position-absolute bg-dark info-container rounded-3">
                    <p>{item?.infoName}</p>
                    <div className="d-flex justify-content-between">
                      <div>{item?.count}</div>
                      <div className="px-2">---------</div>
                      <div className="col-7">{item?.infoDescription}s</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="my-5 col-5">
        <div className="Allcitiessearch ">
          <i className="bx bx-search searchstyles"></i>
          <input
            className="inputstyless w-100"
            type="text"
            placeholder="All Cities"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <table className="tablestyles">
          <tr style={{ backgroundColor: "#dfe3e4" }}>
            {tableHeading?.map((item, index) => (
              <th>
                {item?.name}
                <i
                  className={`bx cursor_pointer ${
                    sortColumn === "city" && sortDirection === "asc"
                      ? "bx-up-arrow-alt"
                      : "bx-down-arrow-alt"
                  }`}
                  onClick={() => handleSort(item?.name)}
                ></i>
              </th>
            ))}
          </tr>
          {dashboardDetailsData?.CityDetails.filter((row) => {
            return row.zoneName?.zone_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }).map((row, index, filteredData) => (
            <tr
              className={index % 2 === 0 ? "height " : "height bg"}
              key={index}
            >
              <td>{row.zoneName?.zone_name}</td>
              <td>{row.allBookingCount}</td>
              <td>{row.completed_booking_count}</td>
            </tr>
          ))}
          {dashboardDetailsData?.CityDetails.filter((row) => {
            return !row.zoneName?.zone_name
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }).map((row, index, filteredData) => (
            <tr
              className={index % 2 === 0 ? "height " : "height bg"}
              key={index}
            >
              <td>{row.zoneName?.zone_name}</td>
              <td>{row.allBookingCount}</td>
              <td>{row.completed_booking_count}</td>
            </tr>
          ))}
        </table>
        <div className="text-end my-3">
          <button
            onClick={() => downloadDataFnc()}
            className="border-0 rounded-2 py-1 px-3"
          >
            Download Data
          </button>
        </div>
      </div>
      <div>
        <GraphComponent activeStatus={activeStatus} />
      </div>
    </div>
  );
};

export default DashboardComponent;

const tableHeading = [
  {
    name: "City",
  },
  {
    name: "Bookings",
  },
  {
    name: "Completed Trips",
  },
];
