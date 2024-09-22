import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  Autocomplete,
  useJsApiLoader,
} from "@react-google-maps/api";
import { libraries } from "../../modules/manage-zone";
import React, { useEffect, useState } from "react";
import carImageMarker from "../../assets/images/carr 1.png";
import { mapStyle } from "../../components/manage-zones/map/maphelper";
import "./tracking.css";
import clearSearch from "../../assets/icons/closefill.svg";
import location from "../../assets/icons/map.svg";
import search from "../../assets/icons/search.svg";
import { useDispatch } from "react-redux";
import { trackingListAction } from "../../redux/actions/tracking/tracking-action";
import auto from "../../assets/icons/tracking/auto.png";

const TrackingVehicles = () => {
  const dispatch = useDispatch();
  const initialCenter = { lat: 15.9129, lng: 79.74 };
  const [center, setCenter] = useState(initialCenter);
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [trackingList, setTrackingList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMarkerDetails, setShowMarkerDetails] = useState(null);
  const [zoom, setZoom] = useState(6);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC2o2GOVeUrZul4bBTUghBNPC3iP_QyXJU",
    libraries,
  });

  const mapContainerStyle = {
    position: "relative",
    height: "82vh",
    width: "97%",
    borderRadius: "13px",
  };

  const handlePlaceSelect = (place) => {
    if (place.geometry && place.geometry.location) {
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setInputValue(place.formatted_address);

      const centralMarkerPosition = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
    }
  };

  const trackAllFnc = () => {
    dispatch(
      trackingListAction(
        {
          driver_id: "",
          rider_id: "",
          booking_id: "",
        },
        onFetchListSuccess,
        onFetchListError
      )
    );
  };

  useEffect(() => {
    trackAllFnc();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      trackAllFnc();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const onFetchListSuccess = (data) => {
    console.log(data.data, "onFetchListSuccess");
    setTrackingList(data.data);
  };

  const onFetchListError = (data) => {
    console.log(data, "setErrorMessage");
  };

  const handleSearch = () => {
    dispatch(
      trackingListAction(
        {
          driver_id: selectedType === "Driver ID" ? searchInput : "",
          rider_id: selectedType === "Rider ID" ? searchInput : "",
          booking_id: selectedType === "Booking ID" ? searchInput : "",
        },
        onFetchSuccess,
        onFetchError
      )
    );
  };

  const onFetchSuccess = (data) => {
    setCenter({
      lat: data.data.location.lat,
      lng: data.data.location.long,
    });
    setShowMarkerDetails(data.data);
    setZoom(8);
  };

  const onFetchError = (data) => {
    console.log(data.data.data, "setErrorMessage");
    setErrorMessage(data.data.data);
  };

  const findOneDriver = (data) => {
    dispatch(
      trackingListAction(
        {
          driver_id: data?.driver_id2,
          rider_id: "",
          booking_id: "",
        },
        onFetchOneSuccess,
        onFetchOneError
      )
    );
  };
  const onFetchOneSuccess = (data) => {
    setShowMarkerDetails(data.data);
    setCenter({
      lat: data.data.location.lat,
      lng: data.data.location.long,
    });
    setZoom(8);
  };
  const onFetchOneError = (data) => {};

  function formatVehicleNumber(vehicleNumber) {
    const lowerCaseNumber = vehicleNumber.toLowerCase();
    const formattedNumber = `${lowerCaseNumber.slice(
      0,
      2
    )}-${lowerCaseNumber.slice(2, 4)}-${lowerCaseNumber.slice(
      4,
      6
    )}-${lowerCaseNumber.slice(6)}`;

    return formattedNumber;
  }

  return (
    <div className="tracking_container mx-4 my-5">
      <p className="primary_color m-1 fw_600 fs_26 mx-4">Track Vehicle</p>
      <div style={mapContainerStyle} className="m-4">
        {loadError ? (
          <div>Failed to load google map.Try refreshing the page</div>
        ) : isLoaded ? (
          <>
            <div className="inputContainerStyle">
              <div className="d-flex align-items-center bg-white mb-2 rounded-1 box-shadow">
                <img src={location} alt="v" width={20} className="ms-1 mb-1" />
                <Autocomplete
                  onLoad={(autocomplete) => {
                    autocomplete.addListener("place_changed", () => {
                      const place = autocomplete.getPlace();
                      handlePlaceSelect(place);
                    });
                  }}
                >
                  <input
                    type="text"
                    className="autocomplete-input m-0 input"
                    placeholder="Enter location"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Autocomplete>
                <button className="border-0 m-0 bg-white">
                  <img src={clearSearch} alt="clear" width={24} />
                </button>
              </div>

              <div className="inputContainerStyles">
                <button className="track-btn bg-white  p-2 py-2 rounded-2 d-flex align-items-center gap-3">
                  <img src={location} alt="v" width={20} className="mb-1" />
                  Track
                  <i
                    className={`bx bx-chevron-up ms-2 ${
                      showDetails ? "" : "rotate"
                    }`}
                    onClick={() => setShowDetails(!showDetails)}
                    style={{ fontSize: "24px" }}
                  ></i>
                </button>
              </div>
              {showDetails && (
                <div className="track-input-container p-3 my-2">
                  <div className="search-input-container rounded-1 d-flex align-items-center">
                    <img src={search} alt="clear" width={20} className="mx-1" />
                    <input
                      className="search-input input-focus"
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="'Enter here'"
                    />
                  </div>
                  <div className="d-flex align-items-center w-100 mt-3 underline">
                    <input
                      type="radio"
                      className="track-radio"
                      name="options"
                      value="Booking ID"
                      id="Booking ID"
                      checked={selectedType === "Booking ID"}
                      onChange={() => setSelectedType("Booking ID")}
                    />
                    <label htmlFor="Booking ID" className="ms-2">
                      Booking ID
                    </label>
                  </div>
                  <div className="d-flex align-items-center w-100 underline">
                    <input
                      type="radio"
                      className="track-radio"
                      name="options"
                      value="Booking ID"
                      id="Rider ID"
                      checked={selectedType === "Rider ID"}
                      onChange={() => setSelectedType("Rider ID")}
                    />
                    <label htmlFor="Rider ID" className="ms-2 ">
                      Rider ID
                    </label>
                  </div>
                  <div className="d-flex align-items-center w-100 mb-1">
                    <input
                      type="radio"
                      name="options"
                      className="track-radio"
                      id="Driver ID"
                      value="Driver ID"
                      checked={selectedType === "Driver ID"}
                      onChange={() => setSelectedType("Driver ID")}
                    />
                    <label htmlFor="Driver ID" className="ms-2 ">
                      Driver ID
                    </label>
                  </div>
                  {errorMessage && (
                    <label
                      className="w-100 text-center"
                      style={{ color: "#D20000" }}
                    >
                      {errorMessage}
                    </label>
                  )}
                  <button
                    onClick={() => handleSearch()}
                    className="submit-btn text-white border-0 w-100 rounded-1 py-1 mt-2"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
            <GoogleMap
              center={center}
              zoom={zoom}
              mapContainerStyle={{
                height: "100%",
                width: "100%",
                borderRadius: "inherit",
              }}
              options={{
                disableDefaultUI: true,
                rotateControl: true,
                styles: mapStyle,
              }}
              onLoad={(map) => setMap(map)}
            >
              {trackingList?.map((position, index) => (
                <>
                  <MarkerF
                    key={index}
                    position={{
                      lat: position?.location?.lat,
                      lng: position?.location?.long,
                    }}
                    icon={{
                      url: carImageMarker,
                      scaledSize: { width: 50, height: 30 },
                    }}
                    onClick={() => findOneDriver(position)}
                    // onMouseOut={() => setShowMarkerDetails(null)}
                  />
                </>
              ))}
              {showMarkerDetails && (
                <InfoWindowF
                  position={{
                    lat: showMarkerDetails?.location?.lat,
                    lng: showMarkerDetails?.location?.long,
                  }}
                  options={{
                    disableAutoPan: true,
                    closeOnClick: false,
                    pixelOffset: new window.google.maps.Size(0, -40),
                  }}
                  onCloseClick={() => {
                    setShowMarkerDetails(null);
                    setZoom(6);
                  }}
                >
                  <div className="d-flex align-items-start">
                    <div className="info-details-centainer h-100 px-3 fw_500">
                      <div>
                        <img
                          className="rounded-1"
                          src={showMarkerDetails?.profile_pic?.photo}
                          height={60}
                          width={60}
                          alt="profile"
                        />
                      </div>
                      <p className="mt-3 fw_500 mb-0 ms-2">
                        {showMarkerDetails?.vehicle_details?.vehicle_make}{" "}
                        {showMarkerDetails?.vehicle_details?.vehicle_model}
                      </p>
                      <p className="text-uppercase m-1 ms-3">
                        {formatVehicleNumber(
                          showMarkerDetails?.vehicle_details
                            ?.vehicle_registration_number
                        )}
                      </p>
                      <p className="mt-3">
                        Driver ID : {showMarkerDetails?.driver_id2}
                      </p>
                    </div>
                    {showMarkerDetails?.booking_details ? (
                      <div className="booking-info-container color_0F203C px-3 fw_500">
                        <p className="fs_20 fw_600 color_0F203C">
                          {showMarkerDetails?.booking_details?.booking_type ===
                          "LocalTrip"
                            ? "Local Trip"
                            : ""}
                        </p>

                        <div className="w-100 d-flex">
                          <div style={{ width: "40%" }} className="text-end">
                            <label> Booking ID :</label>
                          </div>
                          <div style={{ width: "60%" }} className="ms-1">
                            {showMarkerDetails?.booking_details?.booking_id_2}
                          </div>
                        </div>

                        <div className="w-100 d-flex">
                          <div style={{ width: "40%" }} className="text-end">
                            <label> Rider ID :</label>
                          </div>
                          <div style={{ width: "60%" }} className="ms-1">
                            {
                              showMarkerDetails?.booking_details?.rider_details
                                ?.rider_id2
                            }
                          </div>
                        </div>

                        <div className="w-100 d-flex">
                          <div style={{ width: "40%" }} className="text-end">
                            <label> Pickup Address :</label>
                          </div>
                          <div style={{ width: "60%" }} className="ms-1">
                            {
                              showMarkerDetails?.booking_details?.pickup_address
                                ?.address
                            }
                          </div>
                        </div>

                        <div className="w-100 d-flex">
                          <div style={{ width: "40%" }} className="text-end">
                            <label> Additional Stop :</label>
                          </div>
                          <div style={{ width: "60%" }} className="ms-1">
                            {showMarkerDetails?.booking_details?.additional_stop
                              ?.address === ""
                              ? "N/A"
                              : showMarkerDetails?.booking_details
                                  ?.additional_stop?.address}
                          </div>
                        </div>

                        <div className="w-100 d-flex">
                          <div style={{ width: "40%" }} className="text-end">
                            <label> Drop-Off Address :</label>
                          </div>
                          <div style={{ width: "60%" }} className="ms-1">
                            {
                              showMarkerDetails?.booking_details
                                ?.dropoff_address?.address
                            }
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{ height: "9rem" }}
                        className="booking-info-container color_0F203C px-3 fw_500 d-flex justify-content-center align-items-center"
                      >
                        <div>--- Currently not in a ride ---</div>
                      </div>
                    )}
                  </div>
                </InfoWindowF>
              )}
            </GoogleMap>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TrackingVehicles;
