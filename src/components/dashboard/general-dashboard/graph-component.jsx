import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  LineChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import {
  dashboardGraphDetailsAction,
  dashboardMoreGraphDetailsAction,
} from "../../../redux/actions/dashboard/dashboard-action";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import ArrowDownIcon from "../../../assets/icons/arrowDownIcon";
import DropDownIcon from "../../../assets/icons/dropdown-icon";

const GraphComponent = ({ activeStatus }) => {
  const dispatch = useDispatch();
  const [dashboardGraphData, setDashboardGraphData] = useState([]);
  const [dashboardGraphMoreData, setDashboardMoreGraphData] = useState([]);
  const [activeGraphStatus, setActiveGraphStatus] = useState("Daily");
  const [showMore, setShowMore] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    if (startDate === null && endDate === null) {
      const now = new Date();
      const past = new Date();
      past.setMonth(past.getMonth() - 6);

      setEndDate(moment(now).format("YYYY-MM-DD"));
      setStartDate(past.toISOString().split("T")[0]);
    }
    if (activeStatus === "Today") {
      setLoading(true);
      setLoadingMore(true);
      dispatch(
        dashboardGraphDetailsAction(
          {
            search: {
              type: activeStatus,
            },
            graphType: "Today",
          },
          onFetchGraphSuccess,
          onFetchGraphError
        )
      );
      dispatch(
        dashboardMoreGraphDetailsAction(
          {
            search: {
              type: activeStatus,
            },
            graphType: "Today",
          },
          onFetchGraphMoreSuccess,
          onFetchGraphMoreError
        )
      );
    } else if (activeStatus === "AllTime") {
      if (startDate !== null && endDate !== null) {
        setLoading(true);
        setLoadingMore(true);
        dispatch(
          dashboardGraphDetailsAction(
            {
              search: {
                type: activeStatus,
              },
              graphType: activeGraphStatus,
              GraphStartDate: moment(startDate).format(
                "YYYY-MM-DD HH:mm:ss.SSS Z"
              ),
              GraphEndDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss.SSS Z"),
            },
            onFetchGraphSuccess,
            onFetchGraphError
          )
        );
        dispatch(
          dashboardMoreGraphDetailsAction(
            {
              search: {
                type: activeStatus,
              },
              graphType: activeGraphStatus,
              GraphStartDate: moment(startDate).format(
                "YYYY-MM-DD HH:mm:ss.SSS Z"
              ),
              GraphEndDate: moment(endDate).format("YYYY-MM-DD HH:mm:ss.SSS Z"),
            },
            onFetchGraphMoreSuccess,
            onFetchGraphMoreError
          )
        );
      }
    }
  }, [activeStatus, activeGraphStatus, startDate, endDate]);

  const onFetchGraphSuccess = (data) => {
    setDashboardGraphData(data.data);
    setLoading(false);
  };
  const onFetchGraphError = () => {
    setLoading(false);
  };

  const onFetchGraphMoreSuccess = (data) => {
    setDashboardMoreGraphData(data.data);
    setLoadingMore(false);
  };
  const onFetchGraphMoreError = () => {
    setLoadingMore(false);
  };

  const formatYAxis = (tickItem) => {
    if (tickItem >= 10000000) {
      return `${(tickItem / 10000000).toFixed(1)}CR`; // Crore
    } else if (tickItem >= 1000000) {
      return `${(tickItem / 1000000).toFixed(1)}M`;
    } else if (tickItem >= 100000) {
      return `${(tickItem / 100000).toFixed(1)}L`; // Lakh
    } else if (tickItem >= 1000) {
      return `${(tickItem / 1000).toFixed(1)}k`;
    } else {
      return tickItem;
    }
  };

  const formatXAxis = (tickItem) => {
    if (tickItem === 0) {
      const today = new Date();
      const options = { month: "short", day: "numeric" };
      const formattedDate = today.toLocaleDateString("en-US", options);
      return formattedDate;
    }
    return `${tickItem}`;
  };

  // Custom X-axis tick component
  const CustomXAxisTick = (props) => {
    const { x, y, payload } = props;
    const displayValue = formatXAxis(payload.value);
    return (
      <text x={x} y={y + 10} textAnchor="middle" fill="#666" fontSize={14}>
        {displayValue}
      </text>
    );
  };

  const formatAllTimeXAxis = (tickItem) => {
    const date = new Date(tickItem);
    const monthShortNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const day = date.getDate();
    const month = monthShortNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    return `${month}-${year}`;
  };

  const graphColorPatterns = [
    { background: "bg-lightblue", line: "rgb(33,148,255)" },
    { background: "bg-green", line: "#0000FF" },
    { background: "bg-pink", line: "#00FF00" },
  ];

  return (
    <div className="mb-5">
      {loading ? (
        <div
          style={{ height: "50vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </div>
      ) : (
        <>
          {activeStatus === "Today" && (
            <>
              <div className="d-flex flex-wrap justify-content-between">
                {dashboardGraphData?.map((item, index) => (
                  <div className="col-6 mt-5" key={index}>
                    <p className="my-2">{item?.Name}</p>
                    <div
                      className={` graph-container rounded-3 ${
                        graphColorPatterns[index % graphColorPatterns.length]
                          .background
                      }`}
                    >
                      <div className="d-flex justify-content-between p-3">
                        <div>
                          <p> Today's Total</p>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {item?.totalcount}
                          </p>
                        </div>
                        <p className="fs_14">India</p>
                      </div>
                      <ResponsiveContainer aspect={4}>
                        <LineChart
                          data={item?.data}
                          margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
                        >
                          <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#ccc"
                          />
                          <XAxis
                            dataKey="startHour"
                            ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
                            domain={[0, 24]}
                            tick={<CustomXAxisTick />}
                          />
                          <YAxis
                            orientation="right"
                            tickFormatter={formatYAxis}
                            tick={{ fontSize: 14 }}
                          />
                          <Tooltip
                            cursor={{ stroke: "#2e83c4", strokeWidth: 1 }}
                          />

                          <Line
                            type="monotone"
                            stroke={
                              graphColorPatterns[
                                index % graphColorPatterns.length
                              ].line
                            }
                            dataKey="count"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeStatus === "AllTime" && (
            <div>
              <div className="d-flex justify-content-between col-4 my-4">
                <div
                  onClick={() => setActiveGraphStatus("Daily")}
                  className={`mb-3 fw_500 py-2 cursor_pointer ${
                    activeGraphStatus === "Daily"
                      ? "light_blue_color border_bottom_blue"
                      : "secondary_color"
                  }`}
                >
                  Daily
                </div>
                <div
                  onClick={() => setActiveGraphStatus("Weekly")}
                  className={`mb-3 fw_500 py-2 cursor_pointer ${
                    activeGraphStatus === "Weekly"
                      ? "light_blue_color border_bottom_blue"
                      : "secondary_color"
                  }`}
                >
                  Weekly
                </div>
                <div
                  onClick={() => setActiveGraphStatus("Monthly")}
                  className={`mb-3 fw_500 py-2 cursor_pointer ${
                    activeGraphStatus === "Monthly"
                      ? "light_blue_color border_bottom_blue"
                      : "secondary_color"
                  }`}
                >
                  Monthly
                </div>
                <div
                  onClick={() => setActiveGraphStatus("Quarterly")}
                  className={`mb-3 fw_500 py-2 cursor_pointer ${
                    activeGraphStatus === "Quarterly"
                      ? "light_blue_color border_bottom_blue"
                      : "secondary_color"
                  }`}
                >
                  Quarterly
                </div>
              </div>
              <div className="d-flex gap-3 col-4">
                <input
                  className="form-control"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  className="form-control"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="d-flex flex-wrap justify-content-between">
                {dashboardGraphData?.map((item, index) => (
                  <div className="col-6 mt-5" key={index}>
                    <p className="my-2">{item?.Name}</p>
                    <div
                      className={` graph-container rounded-3 ${
                        graphColorPatterns[index % graphColorPatterns.length]
                          .background
                      }`}
                    >
                      <div className="d-flex justify-content-between p-3">
                        <div>
                          <p> Today's Total</p>
                          <p
                            style={{
                              fontSize: "17px",
                              color: "rgb(98, 201, 98)",
                              fontWeight: "500",
                            }}
                          >
                            {item?.totalcount}
                          </p>
                        </div>
                        <p>India</p>
                      </div>
                      <ResponsiveContainer aspect={4}>
                        <LineChart
                          data={item?.data}
                          margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
                        >
                          <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            // strokeDasharray="3 3"
                            stroke="#ccc"
                          />
                          <XAxis
                            dataKey="date"
                            tick={{ fontSize: 14 }}
                            tickFormatter={formatAllTimeXAxis}
                          />
                          <YAxis orientation="right" tick={{ fontSize: 14 }} />
                          <Tooltip
                            cursor={{ stroke: "#2e83c4", strokeWidth: 1 }}
                          />

                          <Line
                            stroke={
                              graphColorPatterns[
                                index % graphColorPatterns.length
                              ].line
                            }
                            type="monotone"
                            dataKey="count"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      <div className="my-5">
        {!showMore ? (
          <button
            onClick={() => setShowMore(true)}
            className="border-0 bg-white"
          >
            More Graphs <DropDownIcon />
          </button>
        ) : (
          <button
            onClick={() => setShowMore(false)}
            className="border-0 bg-white"
          >
            show less{" "}
            <label style={{ rotate: "180deg" }}>
              <DropDownIcon />
            </label>
          </button>
        )}
        {showMore && (
          <>
            {loadingMore ? (
              <div
                style={{ height: "50vh" }}
                className="d-flex justify-content-center align-items-center"
              >
                <Spinner />
              </div>
            ) : (
              <div className="d-flex flex-wrap justify-content-between">
                {dashboardGraphMoreData?.map((item, index) => (
                  <div className="col-6 mt-5" key={index}>
                    <p className="my-2">{item?.Name}</p>
                    <div
                      className={` graph-container rounded-3 ${
                        graphColorPatterns[index % graphColorPatterns.length]
                          .background
                      }`}
                    >
                      <div className="d-flex justify-content-between p-3">
                        <div>
                          <p> Today's Total</p>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: "500",
                            }}
                          >
                            {item?.totalcount}
                          </p>
                        </div>
                        <p className="fs_14">India</p>
                      </div>
                      <ResponsiveContainer aspect={4}>
                        <LineChart
                          data={item?.data}
                          margin={{ top: 20, right: 30, left: 50, bottom: 10 }}
                        >
                          <CartesianGrid
                            horizontal={true}
                            vertical={false}
                            strokeDasharray="3 3"
                            stroke="#ccc"
                          />
                          <XAxis
                            dataKey="startHour"
                            ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
                            domain={[0, 24]}
                            tick={<CustomXAxisTick />}
                          />
                          <YAxis
                            orientation="right"
                            tickFormatter={formatYAxis}
                            tick={{ fontSize: 14 }}
                          />
                          <Tooltip
                            cursor={{ stroke: "#2e83c4", strokeWidth: 1 }}
                          />

                          <Line
                            type="monotone"
                            stroke={
                              graphColorPatterns[
                                index % graphColorPatterns.length
                              ].line
                            }
                            dataKey="count"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ))}{" "}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GraphComponent;

const testData = [
  {
    startHour: 0,
    count: 0,
  },
  {
    startHour: 1,
    count: 6,
  },
  {
    startHour: 2,
    count: 100,
  },
  {
    startHour: 3,
    count: 500,
  },
  {
    startHour: 4,
    count: 800,
  },
  {
    startHour: 5,
    count: 1000,
  },
  {
    startHour: 6,
    count: 2000,
  },
  {
    startHour: 7,
    count: 4500,
  },
  {
    startHour: 8,
    count: 5860,
  },
  {
    startHour: 9,
    count: 850,
  },
  {
    startHour: 10,
    count: 560,
  },
  {
    startHour: 11,
    count: 7550,
  },
  {
    startHour: 12,
    count: 550,
  },
  {
    startHour: 13,
    count: 8570,
  },
  {
    startHour: 14,
    count: 4580,
  },
  {
    startHour: 15,
    count: 7580,
  },
  {
    startHour: 16,
    count: 660,
  },
  {
    startHour: 17,
    count: 880,
  },
  {
    startHour: 18,
    count: 5450,
  },
  {
    startHour: 19,
    count: 420,
  },
  {
    startHour: 20,
    count: 8600,
  },
  {
    startHour: 21,
    count: 4780,
  },
  {
    startHour: 22,
    count: 2,
  },
  {
    startHour: 23,
    count: 500,
  },
  {
    hourlyTotalCount: 0,
  },
];
