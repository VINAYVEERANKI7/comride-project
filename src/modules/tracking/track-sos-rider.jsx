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

const TrackSosRider = () => {
  const initialCenter = { lat: 15.9129, lng: 79.74 };
  const [center, setCenter] = useState(initialCenter);
  const [map, setMap] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [zoom, setZoom] = useState(6);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMarkerDetails, setShowMarkerDetails] = useState(null);
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

  const handleSearch = () => {};

  return (
    <div className="tracking_container mx-4 my-5">
      <p className="primary_color m-1 fw_600 fs_26 mx-4">Track SOS Rider</p>
      <div style={mapContainerStyle} className="m-4">
        {loadError ? (
          <div>Failed to load google map.Try refreshing the page</div>
        ) : isLoaded ? (
          <>
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
            ></GoogleMap>
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
                <button
                  onClick={() => setInputValue("")}
                  className="border-0 m-0 bg-white"
                >
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

                  <div className="d-flex align-items-center w-100 underline my-2">
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
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TrackSosRider;
