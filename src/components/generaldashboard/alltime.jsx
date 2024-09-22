import React, { useState, useEffect } from "react";

import "./stylen.css";
import {
  AreaChart,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./alltimestyles.css";

import "boxicons/css/boxicons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Alltime() {
  useEffect(() => {
    generateData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("city");
  const [sortDirection, setSortDirection] = useState("asc");
  const [isHorleyContentVisible, setIsHorleyContentVisible] = useState(false);
  const toggleHorleyContent = () => {
    setIsHorleyContentVisible(!isHorleyContentVisible);
  };

  const [isInrDropdownOpen, setIsInrDropdownOpen] = useState(false);
  const [isInrDropdownUp, setIsInrDropdownUp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSilverBg, setShowSilverBg] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [showsecondInfoPopup, setShowsecondInfoPopup] = useState(false);
  const [showthirdInfoPopup, setShowthirdInfoPopup] = useState(false);
  const [showfourthInfoPopup, setShowfourthInfoPopup] = useState(false);
  const [showfiveInfoPopup, setShowfiveInfoPopup] = useState(false);
  const [data, setData] = useState([]);
  const [showsixInfoPopup, setShowsixInfoPopup] = useState(false);

  const generateData = () => {
    const startDate = new Date(2024, 0, 24);
    const endDate = new Date(2024, 3, 24);
    const newData = [];

    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      newData.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: Math.floor(Math.random() * 1000),
      });
    }

    setData(newData);
  };

  useEffect(() => {
    generateData();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const tableData = [
    {
      city: "Bangalore",
      searches: "10,55,90,305",
      searcheswg: "10,46,40,879",
      searchesfq: "8,26,93,167",
      searcheswgq: "4,85,98,786",
      bookings: "4,77,98,192",
      ongoingtrips: "3,03,83,241",
      onlineDrivers: "3,213",
    },
    {
      city: "Kolkata",
      searches: "1,29,03,679",
      searcheswg: "1,10,98,307",
      searchesfq: "77,95,266",
      searcheswgq: "46,91,227",
      bookings: "38,10,301",
      ongoingtrips: "22,40,642",
      onlineDrivers: "3,654",
    },
    {
      city: "Chennai",
      searches: "15,86,711",
      searcheswg: "14,40,549",
      searchesfq: "9,80,468",
      searcheswgq: "7,49,114",
      bookings: "6,72,265",
      ongoingtrips: "4,60,213",
      onlineDrivers: "298",
    },
    {
      city: "Kochi",
      searches: "13,98,463",
      searcheswg: "12,82,741",
      searchesfq: "5,23,763",
      searcheswgq: "3,41,803",
      bookings: "3,40,030",
      ongoingtrips: "1,84,357",
      onlineDrivers: "5,098",
    },
    {
      city: "Mysore",
      searches: "4,06,688",
      searcheswg: "4,02,022",
      searchesfq: "2,33,247",
      searcheswgq: "2,17,613",
      bookings: "2,13,044",
      ongoingtrips: "1,41,899",
      onlineDrivers: "2,784",
    },
    {
      city: "Hyderabad",
      searches: "5,03,896",
      searcheswg: "4,47,156",
      searchesfq: "2,16,302",
      searcheswgq: "80,530",
      bookings: "79,108",
      ongoingtrips: "32,869",
      onlineDrivers: "987",
    },

    {
      city: "Delhi",
      searches: "1,43,586",
      searcheswg: "1,14,101",
      searchesfq: "45,500",
      searcheswgq: "16,233",
      bookings: "15,879",
      ongoingtrips: "6,248",
      onlineDrivers: "1,213",
    },
  ];

  const sortedData = tableData.sort((a, b) => {
    const first = sortDirection === "asc" ? a : b;
    const second = sortDirection === "asc" ? b : a;

    if (sortColumn === "city") {
      return first.city.localeCompare(second.city);
    } else if (sortColumn === "onlineDrivers") {
      const firstValue = parseFloat(first.onlineDrivers.replace(/,/g, ""));
      const secondValue = parseFloat(second.onlineDrivers.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "searcheswg") {
      const firstValue = parseFloat(first.searcheswg.replace(/,/g, ""));
      const secondValue = parseFloat(second.searcheswg.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "searchesfq") {
      const firstValue = parseFloat(first.searchesfq.replace(/,/g, ""));
      const secondValue = parseFloat(second.searchesfq.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "searcheswgq") {
      const firstValue = parseFloat(first.searcheswgq.replace(/,/g, ""));
      const secondValue = parseFloat(second.searcheswgq.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "bookings") {
      const firstValue = parseFloat(first.bookings.replace(/,/g, ""));
      const secondValue = parseFloat(second.bookings.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "ongoingtrips") {
      const firstValue = parseFloat(first.ongoingtrips.replace(/,/g, ""));
      const secondValue = parseFloat(second.ongoingtrips.replace(/,/g, ""));
      return firstValue - secondValue;
    } else if (sortColumn === "searches") {
      const firstValue = parseFloat(first.searches.replace(/,/g, ""));
      const secondValue = parseFloat(second.searches.replace(/,/g, ""));
      return firstValue - secondValue;
    } else {
      return 0;
    }
  });

  const Array = [
    { name: "8: Apr", student: 13, fees: 1, other: 2 },
    { name: "04:00", student: 10, fees: 12, other: 6 },
    { name: "08:00", student: 20, fees: 23, other: 4 },
    { name: "12:00", student: 9, fees: 10, other: 0 },
    { name: "16:00", student: 3, fees: 7 },
    { name: "0", student: 3, fees: 10 },
  ];

  const customYAxisFormatter = (tick) => {
    switch (tick) {
      case 0:
        return "0";
      case 250:
        return "1L";
      case 500:
        return "2L";
      default:
        return "";
    }
  };
  const customYAxisFormatters = (tick) => {
    switch (tick) {
      case 0:
        return "0";
      case 250:
        return "5L";
      case 500:
        return "10L";
      default:
        return "";
    }
  };

  const CustomYAxisFormatters = (tick) => {
    switch (tick) {
      case 0:
        return "0";
      case 250:
        return "2Cr";
      case 500:
        return "4Cr";
      default:
        return "";
    }
  };

  const yAxisTicks = [0, 6, 10, 12, 16, 20];
  const yAxissTicks = [0, 4, 8, 12];
  const yAxissTickss = [0, 4, 8, 12];

  const toggleInrDropdown = () => {
    setIsInrDropdownOpen(!isInrDropdownOpen);
    setIsInrDropdownUp(!isInrDropdownUp);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSilverBg = () => {
    setShowSilverBg(!showSilverBg);
  };

  const handleInfoHover = () => {
    setShowInfoPopup(true);
  };

  const handleInfoLeave = () => {
    setShowInfoPopup(false);
  };

  const handlesecondInfoHover = () => {
    setShowsecondInfoPopup(true);
  };

  const handlesecondInfoLeave = () => {
    setShowsecondInfoPopup(false);
  };
  const handlethirdInfoHover = () => {
    setShowthirdInfoPopup(true);
  };

  const handlethirdInfoLeave = () => {
    setShowthirdInfoPopup(false);
  };
  const handlefourthInfoHover = () => {
    setShowfourthInfoPopup(true);
  };

  const handlefourthInfoLeave = () => {
    setShowfourthInfoPopup(false);
  };

  const handlefiveInfoHover = () => {
    setShowfiveInfoPopup(true);
  };

  const handlefiveInfoLeave = () => {
    setShowfiveInfoPopup(false);
  };

  const handlesixInfoHover = () => {
    setShowsixInfoPopup(true);
  };

  const handlesixInfoLeave = () => {
    setShowsixInfoPopup(false);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ marginLeft: "7%" }}>
      <div className="whitebgall threedivs">
        <div style={{ display: "flex" }}>
          <div className="three greenbg">
            <div style={{ display: "flex" }}>
              <p className="Completedtrips">Completed Trips</p>
              <i
                className="bx bx-info-circle infostyles"
                onMouseEnter={handleInfoHover}
                onMouseLeave={handleInfoLeave}
              ></i>
              {showInfoPopup && (
                <div className="blackpopupallg">
                  <p style={{ marginLeft: "12px" }}>
                    Number of trips completed
                  </p>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "-7px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                        }}
                      >
                        3,33,15,864
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        ------------
                      </span>
                    </p>
                    <p style={{ marginTop: "-15px", marginLeft: "1%" }}>
                      Overall completed
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "52%" }}>Trips</p>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "-7px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                          backgroundColor: "#E8E9EB",
                          borderRadius: "3px",
                        }}
                      >
                        1,36,076
                        <i
                          class="bx bx-up-arrow-alt"
                          style={{ fontSize: "20px", marginTop: "-15px" }}
                        ></i>
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        ----------
                      </span>
                    </p>
                    <p style={{ marginTop: "-15px", marginLeft: "6%" }}>
                      Yesterday's
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "54%" }}>
                    Completed Trips
                  </p>
                </div>
              )}
            </div>
            <p className="sevenstyles">3.33Cr</p>
            <p className="oneeightstyles">
              <span>
                1.36L<i class="bx bx-up-arrow-alt"></i>
              </span>
            </p>
          </div>

          <div className="three bluebg">
            <div style={{ display: "flex" }}>
              <p className="searches"> Searches</p>
              <i
                className="bx bx-info-circle infostyles"
                onMouseEnter={handlesecondInfoHover}
                onMouseLeave={handlesecondInfoLeave}
              ></i>
              {showsecondInfoPopup && (
                <div className="blackpopupalltimes">
                  <p className="nosearches">Number of searches made by users</p>
                  <p style={{ marginTop: "-10px" }}>
                    <span
                      style={{
                        marginLeft: "12px",
                        color: "rgb(177, 171, 171)",
                      }}
                    >
                      12,19,97,261
                    </span>
                    &nbsp;&nbsp;
                    <span
                      style={{ color: "rgb(177, 171, 171)", fontSize: "10px" }}
                    >
                      --------------
                    </span>
                    &nbsp;&nbsp;Overall Searches
                  </p>
                  <p style={{ marginTop: "-10px" }}>
                    <span
                      style={{
                        color: "rgb(177, 171, 171)",
                        marginLeft: "12px",
                        backgroundColor: "#E8E9EB",
                        borderRadius: "3px",
                      }}
                    >
                      5,50,485
                      <i
                        class="bx bx-up-arrow-alt"
                        style={{ fontSize: "20px", marginTop: "-15px" }}
                      ></i>
                    </span>
                    &nbsp;&nbsp;
                    <span
                      style={{ color: "rgb(177, 171, 171)", fontSize: "10px" }}
                    >
                      -----------------
                    </span>
                    &nbsp;&nbsp;Yesterday Searches
                  </p>
                </div>
              )}
            </div>
            <p className="sevenstyles">12.2Cr</p>
            <p className="twosevenstyles">
              <span>
                5.5L<i class="bx bx-up-arrow-alt"></i>
              </span>
            </p>
          </div>

          <div className="three orangebg">
            <div>
              <div style={{ display: "flex" }}>
                <p className="Completedtrips">Drivers' Earning</p>
                <i
                  className="bx bx-info-circle infostyles"
                  onMouseEnter={handlethirdInfoHover}
                  onMouseLeave={handlethirdInfoLeave}
                ></i>
                {showthirdInfoPopup && (
                  <div className="blackpopupallo">
                    <p style={{ marginLeft: "12px" }}>
                      Value generated for the drivers
                    </p>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginTop: "-7px" }}>
                        <span
                          style={{
                            color: "rgb(177, 171, 171)",
                            marginLeft: "10px",
                          }}
                        >
                          ₹4,98,83,49,641
                        </span>
                        &nbsp;&nbsp;
                      </p>
                      <p style={{ marginTop: "-15px", marginLeft: "3%" }}>
                        Overall Driver's
                      </p>
                    </div>
                    <p style={{ marginTop: "-24px", marginLeft: "48%" }}>
                      Earning
                    </p>
                    <div style={{ display: "flex" }}>
                      <p style={{ marginTop: "-7px" }}>
                        <span
                          style={{
                            color: "rgb(177, 171, 171)",
                            marginLeft: "10px",
                            backgroundColor: "#E8E9EB",
                            borderRadius: "3px",
                          }}
                        >
                          ₹2,00,93,005
                          <i
                            class="bx bx-up-arrow-alt"
                            style={{ fontSize: "20px", marginTop: "-15px" }}
                          ></i>
                        </span>
                        &nbsp;&nbsp;
                      </p>
                      <p style={{ marginTop: "-15px", marginLeft: "3%" }}>
                        Yesterday's Driver's
                      </p>
                    </div>
                    <p style={{ marginTop: "-24px", marginLeft: "48%" }}>
                      Earnings
                    </p>
                  </div>
                )}
              </div>
              <p className="sevenstyles">₹498.83Cr</p>
              <p className="onesixstyles">
                <span>
                  ₹2.01Cr<i class="bx bx-up-arrow-alt"></i>
                </span>
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="three lightbluebg">
            <div style={{ display: "flex" }}>
              <p className="Completedtrips">Registered Users</p>
              <i
                className="bx bx-info-circle infostyles"
                onMouseEnter={handlefiveInfoHover}
                onMouseLeave={handlefiveInfoLeave}
              ></i>
              {showfiveInfoPopup && (
                <div className="blackpopupfive">
                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "16px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                        }}
                      >
                        57,66,748
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        ------------
                      </span>
                    </p>
                    <p style={{ marginTop: "5px", marginLeft: "1%" }}>
                      Overall Registered
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "49%" }}>Users</p>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "-7px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                          backgroundColor: "#E8E9EB",
                          borderRadius: "3px",
                        }}
                      >
                        13,331
                        <i
                          class="bx bx-up-arrow-alt"
                          style={{ fontSize: "20px", marginTop: "-15px" }}
                        ></i>
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        ----------
                      </span>
                    </p>
                    <p style={{ marginTop: "-15px", marginLeft: "6%" }}>
                      Yesterday's
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "51%" }}>
                    Registered Users
                  </p>
                </div>
              )}
            </div>
            <p className="sevenstyles">57.67L</p>
            <p className="fivesevenstyles">
              <span>
                13.33K<i class="bx bx-up-arrow-alt"></i>
              </span>
            </p>
          </div>

          <div className="three pinkbg">
            <div style={{ display: "flex" }}>
              <p className="Completedtrips">Enabled Drivers</p>
              <i
                className="bx bx-info-circle infostyles"
                onMouseEnter={handlesixInfoHover}
                onMouseLeave={handlesixInfoLeave}
              ></i>
              {showsixInfoPopup && (
                <div className="blackpopupsix">
                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "27px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                        }}
                      >
                        3,33,15,864
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        ------------
                      </span>
                    </p>
                    <p style={{ marginTop: "15px", marginLeft: "1%" }}>
                      Overall Enabled
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "49%" }}>
                    Drivers
                  </p>

                  <div style={{ display: "flex" }}>
                    <p style={{ marginTop: "-7px" }}>
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          marginLeft: "10px",
                          backgroundColor: "#E8E9EB",
                          borderRadius: "3px",
                        }}
                      >
                        1,742
                        <i
                          class="bx bx-up-arrow-alt"
                          style={{ fontSize: "20px", marginTop: "-15px" }}
                        ></i>
                      </span>
                      &nbsp;&nbsp;
                      <span
                        style={{
                          color: "rgb(177, 171, 171)",
                          fontSize: "10px",
                        }}
                      >
                        -------------
                      </span>
                    </p>
                    <p style={{ marginTop: "-15px", marginLeft: "8%" }}>
                      Yesterday's Enabled
                    </p>
                  </div>
                  <p style={{ marginTop: "-24px", marginLeft: "49%" }}>
                    Drivers
                  </p>
                </div>
              )}
            </div>
            <p className="sevenstyles">2.95L</p>
            <p className="onesevenstyles">
              <span>
                1.74KL<i class="bx bx-up-arrow-alt"></i>
              </span>
            </p>
          </div>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <p className="conversionall">Conversion Rate</p>
            <i
              className="bx bx-info-circle info"
              onMouseEnter={handlefourthInfoHover}
              onMouseLeave={handlefourthInfoLeave}
            ></i>
            {showfourthInfoPopup && (
              <div className="fourthpopup">
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    marginTop: "6px",
                  }}
                >
                  conversion Rate =
                </p>
                <p
                  style={{
                    textAlign: "center",
                    color: "white",
                    marginTop: "-18px",
                  }}
                >
                  Completed trips/Searches
                </p>
              </div>
            )}
          </div>

          <div style={{ marginLeft: "22px" }}>
            <div
              style={{
                backgroundColor: "rgb(224, 251, 249)",
                width: "98%",
                height: "22px",
                borderRadius: "5px",
              }}
            ></div>
            <div
              style={{
                backgroundColor: "rgb(50, 190, 180)",
                width: "53%",
                marginTop: "-22px",
                height: "22px",
                borderRadius: "5px",
              }}
            ></div>
            <div className="vlinesmall"></div>
            <div className="vlinessmall"></div>
            <p
              style={{
                marginLeft: "52%",
                fontSize: "13px",
                color: "rgb(133, 129, 129)",
                marginTop: "-1px",
              }}
            >
              27.3%
            </p>
            <p
              style={{
                marginLeft: "93%",
                fontSize: "13px",
                color: "rgb(133, 129, 129)",
                marginTop: "-33px",
              }}
            >
              Goal:50%
            </p>
          </div>

          <div className="Allcitiessearch">
            <i className="bx bx-search searchstyles"></i>
            <input
              className="inputstyless"
              type="text"
              placeholder="All Cities"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
          </div>

          <div>
            <table className="tablestyles">
              <tr style={{ backgroundColor: "#dfe3e4" }}>
                <th>
                  City
                  <i
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "city" && sortDirection === "asc"
                        ? "bx-up-arrow-alt"
                        : "bx-down-arrow-alt"
                    }`}
                    onClick={() => handleSort("city")}
                  ></i>
                </th>

                <th>
                  Searches
                  <i
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "searches" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("searches")}
                  ></i>
                </th>

                <th>
                  Searches
                  <i
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "searcheswg" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("searcheswg")}
                  ></i>
                  <br />
                  Which got estimate
                </th>

                <th>
                  Searches
                  <i
                    style={{ marginLeft: "15px", cursor: "ponter" }}
                    className={`bx ${
                      sortColumn === "searchesfq" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("searchesfq")}
                  ></i>
                  <br />
                  for Quotes
                </th>

                <th>
                  Searches
                  <i
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "searcheswgq" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("searcheswgq")}
                  ></i>
                  <br />
                  Which got quotes
                </th>

                <th>
                  Bookings
                  <i
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "bookings" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("bookings")}
                  ></i>
                </th>

                <th>
                  Completed
                  <i
                    style={{ marginLeft: "15px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "ongoingtrips" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("ongoingtrips")}
                  ></i>
                  <br />
                  Trips
                </th>

                <th>
                  Search-to-rate
                  <i
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    className={`bx ${
                      sortColumn === "onlineDrivers" && sortDirection === "asc"
                        ? "bx-down-arrow-alt"
                        : "bx-up-arrow-alt"
                    }`}
                    onClick={() => handleSort("onlineDrivers")}
                  ></i>
                </th>
              </tr>

              {tableData
                .filter((row) => {
                  return row.city
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })
                .map((row, index, filteredData) => (
                  <tr
                    className={index % 2 === 0 ? "height " : "height bg"}
                    key={index}
                  >
                    <td>{row.city}</td>

                    <td>{row.searches}</td>
                    <td>{row.searcheswg}</td>
                    <td>{row.searchesfq}</td>
                    <td>{row.searcheswgq}</td>
                    <td>{row.bookings}</td>
                    <td>{row.ongoingtrips}</td>
                    <td>{row.onlineDrivers}</td>
                  </tr>
                ))}
              {tableData
                .filter((row) => {
                  // Filter rows based on the search query
                  return !row.city
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
                })
                .map((row, index) => (
                  <tr
                    className={index % 2 === 0 ? "height " : "height bg"}
                    key={index}
                  >
                    <td>{row.city}</td>

                    <td>{row.searches}</td>
                    <td>{row.searcheswg}</td>
                    <td>{row.searchesfq}</td>
                    <td>{row.searcheswgq}</td>
                    <td>{row.bookings}</td>
                    <td>{row.ongoingtrips}</td>
                    <td>{row.onlineDrivers}</td>
                  </tr>
                ))}

              <tr className="height bgc">
                <td>India Total</td>
                <td>12,25,33,328</td>
                <td>11,94,25,755</td>
                <td>9,24,87,713</td>
                <td>5,46,95,306</td>
                <td>5,29,28,819</td>
                <td>3,34,49,469</td>
                <td>17,247</td>
              </tr>
            </table>
          </div>

          <div>
            <p className="triptrends">Trip Trends</p>
          </div>
          <div>
            <p onClick={toggleHorleyContent}>Hourly</p>
            {isHorleyContentVisible && (
              <div>
                <div style={{ display: "flex", marginTop: "-10px" }}>
                  <p
                    style={{
                      marginLeft: "12px",
                      fontWeight: "400",
                      color: "#686d78",
                    }}
                  >
                    Searches
                  </p>
                  <p
                    style={{
                      marginLeft: "29%",
                      fontWeight: "400",
                      color: "#686d78",
                    }}
                  >
                    Completed Trips
                  </p>
                  <p
                    style={{
                      marginLeft: "24%",
                      fontWeight: "400",
                      color: "#686d78",
                    }}
                  >
                    Drivers' Earning
                  </p>
                </div>

                <div style={{ display: "flex", marginTop: "-20px" }}>
                  <div className="grapsstyles grapsbluebg">
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "#2e83c4",
                        marginLeft: "10px",
                      }}
                    >
                      Today's Total
                    </p>
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "#2e83c4",
                        marginLeft: "63%",
                        backgroundColor: "#d4e3f1",
                      }}
                    >
                      india
                    </p>
                    <p
                      style={{
                        fontSize: "17px",
                        color: "#2e83c4",
                        fontWeight: "500",
                        marginTop: "-13px",
                        marginLeft: "10px",
                      }}
                    >
                      2,15,525
                    </p>
                    <ResponsiveContainer aspect={2}>
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tick={(props) => {
                            const { x, y, payload } = props;
                            const date = payload.value;
                            if (
                              date === "Jan 24" ||
                              date === "Feb 24" ||
                              date === "Mar 24" ||
                              date === "Apr 24"
                            ) {
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  dy={16}
                                  textAnchor="middle"
                                  fill="#666"
                                >
                                  {date}
                                </text>
                              );
                            }
                            return null;
                          }}
                        />

                        <YAxis
                          tickFormatter={customYAxisFormatters}
                          orientation="right"
                        />
                        <Tooltip
                          cursor={{ stroke: "#2e83c4", strokeWidth: 1 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#2e83c4"
                          fill="none"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grapsstyles grapsgreenbg">
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "rgb(98, 201, 98)",
                        marginLeft: "10px",
                      }}
                    >
                      Today's Total
                    </p>
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "rgb(98, 201, 98)",
                        marginLeft: "63%",
                        backgroundColor: "CDFFCD",
                      }}
                    >
                      india
                    </p>
                    <p
                      style={{
                        fontSize: "17px",
                        color: "rgb(98, 201, 98)",
                        fontWeight: "500",
                        marginTop: "-13px",
                        marginLeft: "10px",
                      }}
                    >
                      2,15,525
                    </p>
                    <ResponsiveContainer aspect={2}>
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tick={(props) => {
                            const { x, y, payload } = props;
                            const date = payload.value; // Assuming payload.value is a string
                            if (
                              date === "Jan 24" ||
                              date === "Feb 24" ||
                              date === "Mar 24" ||
                              date === "Apr 24"
                            ) {
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  dy={16}
                                  textAnchor="middle"
                                  fill="#666"
                                >
                                  {date}
                                </text>
                              );
                            }
                            return null;
                          }}
                        />
                        <YAxis
                          tickFormatter={customYAxisFormatter}
                          orientation="right"
                        />
                        <Tooltip
                          cursor={{ stroke: "#28a745", strokeWidth: 1 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="rgb(98, 201, 98)"
                          fill="none"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grapsstyles grapsorangebg">
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "orange",
                        marginLeft: "10px",
                      }}
                    >
                      Today's Total
                    </p>
                    <p
                      style={{
                        display: "inline-block",
                        fontSize: "14px",
                        color: "orange",
                        marginLeft: "63%",
                        backgroundColor: "rgb(253, 241, 220)",
                      }}
                    >
                      india
                    </p>
                    <p
                      style={{
                        fontSize: "17px",
                        color: "orange",
                        fontWeight: "500",
                        marginTop: "-13px",
                        marginLeft: "10px",
                      }}
                    >
                      2,15,525
                    </p>
                    <ResponsiveContainer aspect={2}>
                      <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tick={(props) => {
                            const { x, y, payload } = props;
                            const date = payload.value;
                            if (
                              date === "Jan 24" ||
                              date === "Feb 24" ||
                              date === "Mar 24" ||
                              date === "Apr 24"
                            ) {
                              return (
                                <text
                                  x={x}
                                  y={y}
                                  dy={16}
                                  textAnchor="middle"
                                  fill="#666"
                                >
                                  {date}
                                </text>
                              );
                            }
                            return null;
                          }}
                        />
                        <YAxis
                          orientation="right"
                          tickFormatter={CustomYAxisFormatters}
                        />
                        <Tooltip
                          cursor={{ stroke: "#fd7e14", strokeWidth: 1 }}
                        />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="orange"
                          fill="none"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Alltime;
