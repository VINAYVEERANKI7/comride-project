import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Autocomplete,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "boxicons/css/boxicons.min.css";
import "./Trackstyle.css";

import carImageMarker from "./sedan-image.jpg";
import driverImage from "./driver-image.png";

const initialCenter = { lat: 16.552723, lng: 81.212936 };

function TrackVehicle() {
  const [center, setCenter] = useState(initialCenter);
  const [inputValue, setInputValue] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [thirdInputValue, setThirdInputValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [map, setMap] = useState(null);
  const [error, setError] = useState("");
  const [markerPosition, setMarkerPosition] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [reachedEluru, setReachedEluru] = useState(false);

  const mapContainerStyle = {
    position: "relative",
    height: "100vh",
    width: "96%",
    marginLeft: "22px",
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

      const offsets = [
        {
          lat: place.geometry.location.lat() + 0.01,
          lng: place.geometry.location.lng() + 0.01,
        },
        {
          lat: place.geometry.location.lat() - 0.01,
          lng: place.geometry.location.lng() - 0.01,
        },
        {
          lat: place.geometry.location.lat() + 0.01,
          lng: place.geometry.location.lng() - 0.01,
        },
        {
          lat: place.geometry.location.lat() - 0.01,
          lng: place.geometry.location.lng() + 0.01,
        },
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng() - 0.02,
        },
      ];
      setMarkerPosition([centralMarkerPosition, ...offsets]);

      setPopupPosition(null);
    }
  };

  useEffect(() => {
    if (inputValue || thirdInputValue || selectedOption) {
      setError("");
    }
  }, [inputValue, thirdInputValue, selectedOption]);

  const handleClearInput = () => {
    setInputValue("");
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsRotated(!isRotated);
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = () => {
    if (!inputValue || !selectedOption) {
      setError("Please enter location and select an option");
      return;
    }

    setError("");

    if (
      selectedOption === "Booking ID" &&
      (thirdInputValue === "BID1234" || thirdInputValue === "BID5678")
    ) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
      });
      directionsRenderer.setMap(map);

      const request = {
        origin: new window.google.maps.LatLng(center.lat, center.lng),
        destination: "Bhimavaram, India",
        travelMode: "DRIVING",
      };

      directionsService.route(request, (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);

          const steps = response.routes[0].legs[0].steps;
          let stepIndex = 0;

          const moveMarker = () => {
            if (stepIndex < steps.length) {
              const nextPosition = steps[stepIndex].end_location;

              setCenter({ lat: nextPosition.lat(), lng: nextPosition.lng() });
              setMarkerPosition([
                { lat: nextPosition.lat(), lng: nextPosition.lng() },
              ]);
              stepIndex++;

              const isAtEluru =
                nextPosition.lat() >= 16.70328 &&
                nextPosition.lng() >= 81.10038;

              setReachedEluru(isAtEluru);

              if (reachedEluru) {
                setTimeout(() => {
                  clearInterval(interval);
                }, 6000);
              }
            } else {
              setCenter(initialCenter);
              setMarkerPosition([initialCenter]);
              stepIndex = 0;
            }
          };

          const interval = setInterval(moveMarker, 5000);

          setTimeout(() => {
            clearInterval(interval);

            directionsRenderer.setMap(null);
          }, steps.length * 5000);
        } else {
          setError("Failed to calculate directions.");
        }
      });
    }
  };

  const handleMarkerMouseOver = (position, index) => {
    if (index !== null && index >= 0 && index < 6) {
      if (
        selectedOption === "Booking ID" &&
        (thirdInputValue === "BID1234" || thirdInputValue === "BID5678")
      ) {
        setPopupData({
          driverID: `DID${thirdInputValue}`,
          vehicleID: thirdInputValue,
          driverImageSrc: driverImage,
          carImageSrc: carImageMarker,
          HUNDAI: "ELANTRA",
          code: "AS - ME - 0123",
          driverid: `D-${thirdInputValue}`,
          vehicleid: `VI-${thirdInputValue}`,
          localtrip: "Local Trip",
        });

        setPopupPosition(position);
      }
    }
  };

  const handleMarkerMouseOut = () => {
    setPopupPosition(null);
  };

  return (
    <div className="rider_coupon">
      <p className="rider_coupon_styles">Track Vehicle</p>
      {/* <LoadScript googleMapsApiKey="AIzaSyC2o2GOVeUrZul4bBTUghBNPC3iP_QyXJU" libraries={['places']}> */}
      <div style={mapContainerStyle}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            height: "100%",
            width: "100%",
            borderRadius: "inherit",
          }}
          options={{
            disableDefaultUI: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          {markerPosition &&
            markerPosition.map((position, index) => (
              <Marker
                key={index}
                position={position}
                onMouseOver={() => handleMarkerMouseOver(position, index)}
                onMouseOut={handleMarkerMouseOut}
                //  icon={{
                //    url: carImageMarker,
                //    scaledSize: new window.google.maps.Size(40, 40),
                //    anchor: new window.google.maps.Point(25, 25),
                //  }}
              />
            ))}

          {popupPosition && popupData && (
            <InfoWindow
              position={popupPosition}
              options={{
                disableAutoPan: true,
                maxWidth: 200,
                maxHeight: 200,
                pixelOffset: new window.google.maps.Size(0, -40),
                closeOnClick: false,
              }}
            >
              <div>
                <div style={{ display: "inline-block" }}>
                  {popupData.driverImageSrc && (
                    <img
                      src={popupData.driverImageSrc}
                      alt="Driver"
                      style={{
                        width: "65px",
                        height: "65px",
                        marginRight: "10px",
                        borderRadius: "5px",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  {popupData.carImageSrc && (
                    <img
                      src={popupData.carImageSrc}
                      alt="Car"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "5px",
                        marginLeft: "-10px",
                      }}
                    />
                  )}
                  {popupData.HUNDAI && (
                    <p
                      style={{
                        color: "#9E9E9E",
                        fontSize: "10px",
                        letterSpacing: "2px",
                        marginLeft: "13px",
                      }}
                    >
                      HUNDAI{popupData.HUNDAI}
                    </p>
                  )}
                  {popupData.code && (
                    <p
                      style={{
                        color: "#0F203C",
                        marginTop: "-15px",
                        marginLeft: "18px",
                        wordSpacing: "3px",
                      }}
                    >
                      {popupData.code}
                    </p>
                  )}
                  {popupData.driverid && (
                    <p style={{ color: "#0F203C" }}>
                      Driver ID&nbsp;&nbsp;&nbsp;&nbsp;
                      <u>{popupData.driverid}</u>
                    </p>
                  )}
                  {popupData.vehicleid && (
                    <p style={{ color: "#0F203C", marginTop: "-10px" }}>
                      VehicleID&nbsp;&nbsp;<u>{popupData.vehicleid}</u>
                    </p>
                  )}
                </div>
                {/* <div style={{display:"inline-block", borderLeft: "1px solid #E2E2E2", height: "160px", marginLeft: "10px"}}></div>
  <div style={{display:"inline-block"}}>
  
    {popupData.HUNDAI && (
    <p style={{color:"#9E9E9E",fontSize:"10px"}}>HUNDAI{popupData.HUNDAI}</p>
  )}</div> */}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>

        <div className="inputContainerStyle">
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
              className="inputStyle"
              placeholder="Enter location"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </Autocomplete>
          {inputValue && (
            <div
              className="buttonStyle"
              onClick={handleClearInput}
              aria-label="Clear input"
            >
              &times;
            </div>
          )}
          <div className="inputContainerStyles">
            <p
              style={{
                border: "2px solid #1D3785",
                color: "#1D3785",
                textAlign: "center",
                backgroundColor: "white",
              }}
            >
              Track
            </p>
            <div className="iconContainer">
              <i
                className={`bx bx-chevron-up ${isRotated ? "rotate" : ""}`}
                onClick={toggleDetails}
                style={{ fontSize: "24px" }}
              ></i>
              {showDetails && (
                <div className="popup">
                  <div className="popups"></div>
                  <input
                    type="text"
                    value={thirdInputValue}
                    onChange={(e) => setThirdInputValue(e.target.value)}
                    style={{
                      marginTop: "10px",
                      border: "none",
                      backgroundColor: "#F0F0F0",
                      color: "#687284",
                      borderRadius: "4px",
                      width: "258px",
                      marginBottom: "10px",
                      height: "35px",
                    }}
                    placeholder="'Enter here'"
                  />
                  <br />
                  <input
                    type="radio"
                    name="options"
                    value="Booking ID"
                    checked={selectedOption === "Booking ID"}
                    onChange={handleRadioChange}
                    style={{ marginBottom: "10px" }}
                  />
                  &nbsp;
                  <label>Booking ID</label>
                  <br />
                  <div className="underline"></div>
                  <input
                    type="radio"
                    name="options"
                    value="Driver ID"
                    checked={selectedOption === "Driver ID"}
                    onChange={handleRadioChange}
                  />
                  &nbsp;
                  <label>Driver ID</label>
                  <br />
                  <div className="underline"></div>
                  <input
                    type="radio"
                    name="options"
                    value="Rider ID"
                    checked={selectedOption === "Rider ID"}
                    onChange={handleRadioChange}
                  />
                  &nbsp;
                  <label>Rider ID</label>
                  <br />
                  {error && (
                    <p style={{ textAlign: "center", color: "#D20000" }}>
                      {error}
                    </p>
                  )}
                  <input
                    type="button"
                    value="Search"
                    onClick={handleSearch}
                    className="searchButton"
                    style={{
                      marginBottom: "10px",
                      height: "30px",
                      width: "258px",
                      backgroundColor: "#0F203C",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* </LoadScript> */}
    </div>
  );
}
export default TrackVehicle;
