import React, {  useState, useRef, useEffect  } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import 'boxicons/css/boxicons.min.css';

const center = { lat: 16.552723, lng: 81.212936 };
import '../TrackVehile/Trackstyle.css';
function Tracksosrider() {
  const [inputValue, setInputValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [thirdInputValue, setThirdInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [map, setMap] = useState(null);
  const [error, setError] = useState('');

  const originRef = useRef(null);

  const mapContainerStyle = {
    position: 'relative',
    height: '100vh',
    width: '96%',
    marginLeft: "22px",
    borderRadius: "13px",
  };

  useEffect(() => {
    if (inputValue || thirdInputValue || selectedOption) {
      setError('');
    }
  }, [inputValue, thirdInputValue, selectedOption]);

  const handleClearInput = () => {
    setInputValue('');
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setIsRotated(!isRotated); 
  };

  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearch = () => {
    const origin = originRef.current.value;
    if (!origin || !thirdInputValue || !selectedOption) {
      setError('Rider SOS not activated');
    } else {
      setError('');
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: origin }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          if (map) {
            map.panTo(location);
            new window.google.maps.Marker({ position: location, map: map });
          }
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
  };

  return (
    <div className='rider_coupon'>
      <p className='rider_coupon_styles'>Track SOS Rider</p>
      <LoadScript googleMapsApiKey="AIzaSyC2o2GOVeUrZul4bBTUghBNPC3iP_QyXJU" libraries={['places']}>
        <div style={mapContainerStyle}>
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
            options={{
              disableDefaultUI: true           
            }}
            onLoad={(map) => setMap(map)}
          >
            <Marker position={center} />
          </GoogleMap>
          <div className='inputContainerStyle'>
            <Autocomplete>
              <input
                type="text"
                className='inputStyle'
                placeholder="Enter location"
                ref={originRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </Autocomplete>
            {inputValue && (
              <div
                className='buttonStyle'
                onClick={handleClearInput}
                aria-label="Clear input"
              >
                &times;
              </div>
            )}
            <div className='inputContainerStyles'>
              <p style={{ border: "2px solid #1D3785", color: "#1D3785", textAlign: "center", backgroundColor: "white" }}>Track</p>
              <div className="iconContainer">
              <i className={`bx bx-chevron-up ${isRotated ? 'rotate' : ''}`} onClick={toggleDetails} style={{ fontSize: '24px' }}></i>
                {showDetails && (
                  <div className="popup">
                    <div className="popups"></div>
                    <input 
                      type="text" 
                      value={thirdInputValue} 
                      onChange={(e) => setThirdInputValue(e.target.value)} 
                      style={{ marginTop: "10px", border: "none", backgroundColor: "#F0F0F0", color: "#687284", borderRadius:"4px", width:"258px", marginBottom:"10px",height:"35px"}} 
                      placeholder="'Enter here'"
                    /><br/>
                    
                    <input 
                      type="radio" 
                      name="options" 
                      value="Rider ID" 
                      checked={selectedOption === "Rider ID"} 
                      onChange={handleRadioChange} 
                      style={{ marginBottom:"20px" }}
                    />&nbsp;
                    <label>Rider ID</label><br/>
                    {error && <p style={{ textAlign:'center', color: '#D20000' }}>{error}</p>}
                    <input
                      type="button"
                      value="Search"
                      onClick={handleSearch}
                      className="searchButton"
                      style={{ marginBottom:"10px",height:"30px",width:"258px",backgroundColor:"#0F203C",color:"white",borderRadius:"5px" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoadScript>
    </div>
  );
}

export default Tracksosrider


