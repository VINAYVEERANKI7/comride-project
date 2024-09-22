import React, { useState } from 'react';
import './stylen.css';
import { LineChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import Alltime from "./alltime";
import Hydtoday from "./Hydtoday";
import QRCode from "react-qr-code";
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{FaHeart,FaYoutube,FaInstagram,FaTwitter,FaGithub,FaFacebook,FaLinkedin} from 'react-icons/fa'
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";


function Dammycode() {
  const [isHorleyContentVisible, setIsHorleyContentVisible] = useState(false);
  const toggleHorleyContent = () => {
    setIsHorleyContentVisible(!isHorleyContentVisible);
  };
  const[isTrade,setIsTrends] = useState(false)
  const tradedropdown = ()=>{
    setIsTrends(!isTrade)
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('city');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAllTime, setShowAllTime] = useState(false);

  const [isInrDropdownOpen, setIsInrDropdownOpen] = useState(false);
  const [isInrDropdownUp, setIsInrDropdownUp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSilverBg, setShowSilverBg] = useState(false); 
  const [showInfoPopup, setShowInfoPopup] = useState(false); 
  const [showsecondInfoPopup, setShowsecondInfoPopup] = useState(false); 
  const [showthirdInfoPopup, setShowthirdInfoPopup] = useState(false); 
  const [showfourthInfoPopup, setShowfourthInfoPopup] = useState(false); 
  const [search, setSearch] = useState('');
  const [cities, setCities] = useState([
   'All Cities',
   'Hyderabad',
    'Bangalore',
    
  ]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [displaySearchBar, setDisplaySearchBar] = useState(true);
  const [ongoingTrips, setOngoingTrips] = useState(2717); 
  const [onlineDrivers, setOnlineDrivers] = useState(43484); 
  const [selectedCity, setSelectedCity] = useState('All Cities'); 

  const Array = [
    { name: "10: Apr", student: 13, fees: 1,other:2 },
    { name: "10: Apr", student: 13, fees: 1,other:2 },
    { name: "04:00", student: 10, fees: 12,other:6  },
    { name: "08:00", student: 20, fees: 23,other:4 },
    { name: "12:00", student: 9, fees: 10,other:0},
    { name: "16:00", student: 3, fees: 7 },
    { name: "0", student: 3, fees: 10 },
  ];
  

  
  const handleSearchInputChanges = (event) => {
    const query = event.target.value;
    setSearch(query);
    filterCities(query);
  };

  const filterCities = (query) => {
    const filtered = cities.filter(city =>
      city.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCities(filtered);
    setDisplaySearchBar(true);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    
    if (city === 'Hyderabad') {
      setOngoingTrips(10);
      setOnlineDrivers(4803);
    }
    
    else {
      
      setOngoingTrips(2717);
      setOnlineDrivers(43484);
    }
  };

  const toggleAllTime = () => {
    setShowAllTime(!showAllTime);
  };


   const handleSort = (column) => {
    if (sortColumn === column) {
   
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  

  
  const tableData = [
   
    { city: 'Bangalore', onlineDrivers: '30,213', searches: '2,31,052',searcheswg:"2,84,988",searchesfq:"1,96,842",searcheswgq:"1,04,966",bookings:"1,03,993",ongoingtrips:"2,479" },
    { city: 'Kolkata', onlineDrivers: '3,944', searches: '31,141',searcheswg:"29,975",searchesfq:"17,909",searcheswgq:"13,642",bookings:"10,831",ongoingtrips:"610" },
    { city: 'Chennai', onlineDrivers: '5,477', searches: '11,967',searcheswg:"11,858",searchesfq:"6,280",searcheswgq:"4,822",bookings:"4,814",ongoingtrips:"96" },
    { city: 'Kochi', onlineDrivers: '1,588', searches: '2,468',searcheswg:"2,368",searchesfq:"1,420",searcheswgq:"1,011",bookings:"1,011",ongoingtrips:"33" },
    { city: 'Mysore', onlineDrivers: '585', searches: '715',searcheswg:"698",searchesfq:"440",searcheswgq:"422",bookings:"422",ongoingtrips:"3" },
    { city: 'Hyderabad', onlineDrivers: '2,921', searches: '3,571',searcheswg:"3,551",searchesfq:"1,922",searcheswgq:"515",bookings:"514",ongoingtrips:"13" },
    { city: 'Tumkuru', onlineDrivers: '89', searches: '573',searcheswg:"534",searchesfq:"304",searcheswgq:"220",bookings:"219",ongoingtrips:"4" },
    { city: 'Delhi', onlineDrivers: '721', searches: '891',searcheswg:"799",searchesfq:"319",searcheswgq:"120",bookings:"119",ongoingtrips:"0" },
  ];

  const sortedData = tableData.sort((a, b) => {
    const first = sortDirection === 'asc' ? a : b;
    const second = sortDirection === 'asc' ? b : a;
  
    if (sortColumn === 'city') {
      return first.city.localeCompare(second.city);
    } else if (sortColumn === 'onlineDrivers') {
     
      const firstValue = parseFloat(first.onlineDrivers.replace(/,/g, ''));
      const secondValue = parseFloat(second.onlineDrivers.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'searches') {
    
      const firstValue = parseFloat(first.searches.replace(/,/g, ''));
      const secondValue = parseFloat(second.searches.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'searcheswg') {
     
      const firstValue = parseFloat(first.searcheswg.replace(/,/g, ''));
      const secondValue = parseFloat(second.searcheswg.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'searchesfq') {
      
      const firstValue = parseFloat(first.searchesfq.replace(/,/g, ''));
      const secondValue = parseFloat(second.searchesfq.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'searcheswgq') {
     
      const firstValue = parseFloat(first.searcheswgq.replace(/,/g, ''));
      const secondValue = parseFloat(second.searcheswgq.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'bookings') {
      
      const firstValue = parseFloat(first.bookings.replace(/,/g, ''));
      const secondValue = parseFloat(second.bookings.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else if (sortColumn === 'ongoingtrips') {
      
      const firstValue = parseFloat(first.ongoingtrips.replace(/,/g, ''));
      const secondValue = parseFloat(second.ongoingtrips.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else {
      return 0; 
    }
  });

  const customYAxisFormatter = (tick) => {
    switch (tick) {
      case 6:
        return '5K';
      case 10:
        return '10K';
      case 12:
        return '15K';
      case 16:
        return '20K';
      case 20:
        return '25K';
      default:
        return ''; 
    }
  };
  const customYAxisFormatters = (tick) => {
    switch (tick) {
      case 4:
        return '50K';
      case 8:
        return '50K';
      case 12:
        return '1L';
      
      default:
        return ''; 
    }
  };
  const CustomYAxisFormatters = (tick) => {
    switch (tick) {
      case 4:
        return '10L';
      case 8:
        return '10L';
      case 12:
        return '20L';
        case 16:
        return '25L';
      
      default:
        return ''; 
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
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

 
  
  return (
   <BrowserRouter>
    <div>
      <div style={{display:"flex"}}>
        <img className="imagen" src="/comride-logo.png" alt="Namma Yatri Logo" />
        
        <p className='allcities' onClick={toggleDropdown}>{selectedCity}</p>
        <i className={`bx ${isDropdownOpen ? 'bx-chevron-up' : 'bx-chevron-down'} dropdown`} onClick={toggleDropdown}></i>
        {isDropdownOpen && (
          <div className="popup">
          <div className="popupstyles">
            <i className="bx bx-search searchstyles"></i>
            {displaySearchBar && (
              <input
                className="inputstyles"
                type="text"
                id="searchInput"
                placeholder="Search cities..."
                value={search}
                onChange={handleSearchInputChanges}
              />
            )}
          </div>
          
          <div className='firstsearch'>
  {(filteredCities.length > 0 ? filteredCities : cities).map((city, index) => (
    <p key={index} onClick={() => handleCityClick(city)}
      className={`city ${city === 'All Cities' ? 'blue-text' : ''} ${city === 'All Cities' || city === 'Hyderabad' || city === 'Bangalore' ? 'hover-city' : ''}`}>
      {city}
    </p>
  ))}
</div>

          
        </div>
      
        )}
        <p className='inr' onClick={toggleInrDropdown}>₹ INR </p>
        <i className={`bx ${isInrDropdownUp ? 'bx-chevron-up' : 'bx-chevron-down'} dropdowni`} onClick={toggleInrDropdown}></i>
        {isInrDropdownOpen && (
          <div className="dropdown-content">
            <p>₹ INR Dropdown Content Here</p>
          </div>
        )}
        <p className='dapp'>Download App</p>
      </div>
      <div className='livesectionstyles'>
        <img className="liveimage" src="/liveimage.png" alt="liveimage" />    
        <p className='ongstyle' onClick={() => handleCityClick('Hyderabad')}>On-going Trips <span style={{ color: "#318CE7" }}>{ongoingTrips}</span></p>
        <div className='oline'></div>
        <p className='ongstyle'>Online Drivers <span style={{ color: "#318CE7" }}>{onlineDrivers}</span></p>
      </div>
      <div style={{display:"flex"}}>
        <p className='todaystyle' onClick={toggleSilverBg}>Today</p> 
       
        <p className='allstyle' onClick={toggleAllTime} style={{cursor:"pointer"}}>All-Time</p>

      </div>
      <div >
      {selectedCity === 'Hyderabad' && (
          <Hydtoday />
        )}
      </div>
      {showAllTime && (
          <div className='silverbg'>
            {showAllTime && <Alltime />}
           
          </div>
        )}

     
        <div className='silverbg'>
        
        {showSilverBg && (
         
          <div className='whitebg threedivs'>
            <div style={{display:"flex"}}>
           <div className='three greenbg'>
            <div style={{display:"flex"}}>
              <p className='Completedtrips'>Completed Trips</p>
              <i className='bx bx-info-circle infostyles' onMouseEnter={handleInfoHover} onMouseLeave={handleInfoLeave}></i>
              {showInfoPopup && 
             <div className="blackpopup">
              <p style={{marginLeft:"12px"}}>Number of trips completed</p>

              <div style={{display:"flex"}} >
               <p style={{marginTop:"-7px"}}><span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px"}}>35.42k</span>
               &nbsp;&nbsp;<span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>------------</span></p>
              <p style={{marginTop:"-15px",marginLeft:"3%"}}>Today's completed</p>
               </div>
            <p style={{marginTop:"-24px",marginLeft:"45%"}}>Trips</p>

            <div style={{display:"flex"}} >
  <p style={{marginTop:"-7px"}}>
    <span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px",backgroundColor:"#E8E9EB",borderRadius:"3px"}}>
      7.01k
      <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i>
    </span>
    &nbsp;&nbsp;
    <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>----------</span>
  </p>
  <p style={{marginTop:"-15px",marginLeft:"3%"}}>Last hour's</p>
</div>
 <p style={{marginTop:"-24px",marginLeft:"45%"}}>Completed Trips</p>
           </div>
             }       
           
           </div>
<p className='sevenstyles'>76,199</p>
<p className='oneeightstyles'>
<span>1,876<i class='bx bx-up-arrow-alt'></i></span></p>
            </div>


            <div className='three bluebg'>
           <div style={{display:"flex"}}>
           <p className='searches'> Searches</p>
            <i className='bx bx-info-circle infostyles' onMouseEnter={handlesecondInfoHover} onMouseLeave={handlesecondInfoLeave}></i>
            {showsecondInfoPopup &&
             <div className="blacksecondpopup">
              <p className='nosearches'>Number of searches made by users</p>
              <p style={{marginTop:"-10px"}}><span style={{marginLeft:"12px",color: 'rgb(177, 171, 171)'}}>2.72L</span>&nbsp;&nbsp;
              <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>--------------</span>&nbsp;&nbsp;Today's Searches</p>
              <p style={{marginTop:"-10px"}}><span style={{marginLeft:"12px",color: 'rgb(177, 171, 171)'}}>14.7K
              <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i></span>&nbsp;&nbsp;
              <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>---------</span>&nbsp;&nbsp;Last hour's Searches</p>
             </div>
            
            }
            
            </div>
            <p className='sevenstyles'>2,71,626</p>
            <p className='twosevenstyles'>
<span>14,704<i class='bx bx-up-arrow-alt'></i></span></p>
            </div>




            <div className='three orangebg'>
             <div>
              <div style={{display:"flex"}}>
           <p className='Completedtrips'>Drivers' Earning</p> 
           <i className='bx bx-info-circle infostyles'onMouseEnter={handlethirdInfoHover} onMouseLeave={handlethirdInfoLeave}></i>    
             {showthirdInfoPopup &&
             <div className='blackthirdpopup'>
              <p style={{marginLeft:"12px"}}>Value generated for the drivers</p>
              <div style={{display:"flex"}} >
               <p style={{marginTop:"-7px"}}><span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px"}}>₹1.13Cr</span>
               &nbsp;&nbsp;<span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>------------</span></p>
              <p style={{marginTop:"-15px",marginLeft:"3%"}}>Today's Driver's</p>
               </div>
            <p style={{marginTop:"-24px",marginLeft:"45%"}}>Earning</p>
            <div style={{display:"flex"}} >
  <p style={{marginTop:"-7px"}}>
    <span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px",backgroundColor:"#E8E9EB",borderRadius:"3px"}}>
      ₹1.62L
      <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i>
    </span>
    &nbsp;&nbsp;
    <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>----------</span>
  </p>
  <p style={{marginTop:"-15px",marginLeft:"3%"}}>Last hour's Driver's</p>
</div>
 <p style={{marginTop:"-24px",marginLeft:"45%"}}>Earnings</p>    
             </div>
             }
              </div>
              <p className='sevenstyles'>₹1,13,47,589</p>
              <p className='onesixstyles'><span>₹1,62,389<i class='bx bx-up-arrow-alt'></i></span></p>
             </div>
            </div>


              </div>
    <div>
    <div style={{display:"flex"}}>
    <p className='conversion'>Conversion Rate</p> 
    <i className='bx bx-info-circle info'onMouseEnter={handlefourthInfoHover} onMouseLeave={handlefourthInfoLeave}></i>   
    {showfourthInfoPopup &&
<div className="fourthpopup">
  <p style={{textAlign:"center",color:"white",marginTop:"6px"}}>conversion Rate =</p>
  <p style={{textAlign:"center",color:"white",marginTop:"-18px"}}>Completed trips/Searches</p>
  </div>
    }
    </div>
  
    <div style={{marginLeft:"22px"}}>
   <div style={{backgroundColor:"rgb(224, 251, 249)",width:"98%",height:"22px",borderRadius:"5px"}}></div>   
   <div style={{backgroundColor:"rgb(50, 190, 180)",width:"53%",marginTop:"-22px",height:"22px",borderRadius:"5px"}}></div> 
   <div className='vlinesmall'></div>
   <div className='vlinessmall'></div>
   <p style={{marginLeft:"52%",fontSize:"13px",color:"rgb(133, 129, 129)",marginTop:"-1px"}}>27.3%</p>
   <p style={{marginLeft:"93%",fontSize:"13px",color:"rgb(133, 129, 129)",marginTop:"-33px"}}>Goal:50%</p>
    </div>

    <div className="Allcitiesseaech">
              <i className="bx bx-search searchstyles" ></i>
              <input
          className="inputstyless"
          type="text"
          placeholder="All Cities"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
            </div>

  <div>
    <table className='tablestyles'>
    

<tr style={{backgroundColor:"#dfe3e4"}}>
<th>
        City
        <i
          style={{ marginLeft: '5px', cursor: 'pointer' }}
          className={`bx ${
            sortColumn === 'city' && sortDirection === 'asc'
              ? 'bx-up-arrow-alt'
              : 'bx-down-arrow-alt'
          }`}
          onClick={() => handleSort('city')}
        ></i>
      </th>



      <th>
  Online Drivers
  <i
    style={{ marginLeft: '5px', cursor: 'pointer' }}
    className={`bx ${
      sortColumn === 'onlineDrivers' && sortDirection === 'asc'
        ? 'bx-down-arrow-alt'
        : 'bx-up-arrow-alt'
    }`}
    onClick={() => handleSort('onlineDrivers')}
  ></i>
</th>

      <th>Searches
      <i
    style={{ marginLeft: '5px', cursor: 'pointer' }}
    className={`bx ${
      sortColumn === 'searches' && sortDirection === 'asc'
        ? 'bx-down-arrow-alt'
        : 'bx-up-arrow-alt'
    }`}
    onClick={() => handleSort('searches')}
  ></i>
      </th>


      <th>Searches
      <i style={{marginLeft:"15px", cursor: 'pointer'}}
  className={`bx ${
    sortColumn === 'searcheswg' && sortDirection === 'asc'
      ? 'bx-down-arrow-alt'
      : 'bx-up-arrow-alt'
  }`}
  onClick={() => handleSort('searcheswg')}
></i>
        <br/>Which got estimate</th>



      <th>Searches
      <i style={{marginLeft:"15px",cursor:"ponter"}} 
      className={`bx ${
    sortColumn === 'searchesfq' && sortDirection === 'asc'
      ? 'bx-down-arrow-alt'
      : 'bx-up-arrow-alt'
  }`}
  onClick={() => handleSort('searchesfq')}
></i>
        <br/>Quotes</th>

       
      <th>Searches
      <i style={{marginLeft:"15px", cursor:"pointer"}} 
      className={`bx ${
        sortColumn === 'searcheswgq' && sortDirection === 'asc'
          ? 'bx-down-arrow-alt'
          : 'bx-up-arrow-alt'
      }`}
      onClick={() => handleSort('searcheswgq')}
    ></i>
        <br/>Which got quotes</th>


      <th>Bookings
      <i style={{marginLeft:"15px",cursor:"pointer"}}
      className={`bx ${
        sortColumn === 'bookings' && sortDirection === 'asc'
          ? 'bx-down-arrow-alt'
          : 'bx-up-arrow-alt'
      }`}
      onClick={() => handleSort('bookings')}
    ></i>
      </th>

      <th>On-going
      <i style={{marginLeft:"15px",cursor:"pointer"}}
      className={`bx ${
        sortColumn === 'ongoingtrips' && sortDirection === 'asc'
          ? 'bx-down-arrow-alt'
          : 'bx-up-arrow-alt'
      }`}
      onClick={() => handleSort('ongoingtrips')}
    ></i>
        <br/>Trips</th>
      </tr>

      {tableData
  .filter((row) => {
    
    return row.city.toLowerCase().includes(searchQuery.toLowerCase());
  })
  .map((row, index, filteredData) => (
    <tr
      className={index % 2 === 0 ? 'height ' : 'height bg'}
      key={index}
    >
      <td>{row.city}</td>
      <td>{row.onlineDrivers}</td>
      <td>{row.searches}</td>
      <td>{row.searcheswg}</td>
      <td>{row.searchesfq}</td>
      <td>{row.searcheswgq}</td>
      <td>{row.bookings}</td>
      <td>{row.ongoingtrips}</td>
    </tr>
  ))}
{tableData
  .filter((row) => {
    
    return !row.city.toLowerCase().includes(searchQuery.toLowerCase());
  })
  .map((row, index) => (
    <tr
      className={index % 2 === 0 ? 'height ' : 'height bg'}
      key={index}
    >
      <td>{row.city}</td>
      <td>{row.onlineDrivers}</td>
      <td>{row.searches}</td>
      <td>{row.searcheswg}</td>
      <td>{row.searchesfq}</td>
      <td>{row.searcheswgq}</td>
      <td>{row.bookings}</td>
      <td>{row.ongoingtrips}</td>
    </tr>
  ))}

<tr className='height bgc'>
        <td >India Total</td>
        <td>45,869</td>
        <td>2,89,293</td>
        <td>2,87,152</td>
        <td>2,25,436</td>
        <td>1,25,718</td>
        <td>1,21,923</td>
        <td>3,238</td>
      </tr>

            
      
    </table>
    </div>

    <div>
      <p className='triptrends'>Trip Trends</p>

     
    </div>
<div>
  <p onClick={toggleHorleyContent}>Hourly</p>
  {isHorleyContentVisible && (
   
<div>
  <div style={{display:"flex",marginTop:"-10px"}}>
    <p style={{marginLeft:"12px",fontWeight:"400",color:"#686d78"}}>Searches</p>
    <p style={{marginLeft:"29%",fontWeight:"400",color:"#686d78"}}>Completed Trips</p>
    <p style={{marginLeft:"24%",fontWeight:"400",color:"#686d78"}}>Drivers' Earning</p>
  </div>
  
<div style={{display:"flex",marginTop:"-20px"}}>
<div className='grapsstyles grapsbluebg'>
  <p style={{display:"inline-block",fontSize:"14px",color:"#2e83c4",marginLeft:"10px"}}>Today's Total</p>
  <p style={{display:"inline-block",fontSize:"14px",color:"#2e83c4",marginLeft:"63%",backgroundColor:"#d4e3f1"}}>india</p>
  <p style={{fontSize:"17px",color:"#2e83c4",fontWeight:"500",marginTop:"-13px",marginLeft:"10px"}}>2,15,525</p>
  <ResponsiveContainer aspect={2}>
    <LineChart data={Array}>
      <CartesianGrid horizontal="true" vertical="" strokeDasharray="3 3" stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis
        orientation="right"
        ticks={yAxissTicks}
        tickFormatter={customYAxisFormatters}
         />
    <Tooltip cursor={{ stroke: '#2e83c4', strokeWidth: 1 }} />
      <Line type="basis" dataKey="student" stroke='Gray' activeDot={{ r: 5 }} />
      <Line dataKey="fees" />
      <Line dataKey="other" />
    </LineChart>
  </ResponsiveContainer>
</div>

    <div className='grapsstyles grapsgreenbg'>
    <p style={{display:"inline-block",fontSize:"14px",color:"rgb(98, 201, 98)",marginLeft:"10px"}}>Today's Total</p>
  <p style={{display:"inline-block",fontSize:"14px",color:"rgb(98, 201, 98)",marginLeft:"63%",backgroundColor:"CDFFCD"}}>india</p>
  <p style={{fontSize:"17px",color:"rgb(98, 201, 98)",fontWeight:"500",marginTop:"-13px",marginLeft:"10px"}}>2,15,525</p>
      <ResponsiveContainer  aspect={2}>
        <LineChart data={Array} >
 <CartesianGrid horizontal="true" vertical="" strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis
  orientation="right"
  ticks={yAxisTicks}
  tickFormatter={customYAxisFormatter}
/>
<Tooltip cursor={{ stroke: '#28a745', strokeWidth: 1 }} />
          <Line type="basis" dataKey="student" stroke='rgb(98, 201, 98)' activeDot={{ r: 5 }} />
          <Line dataKey="fees"  stroke='gray'/>
          <Line dataKey="other" stroke='rgb(98, 201, 98)'/>
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className='grapsstyles grapsorangebg'>
    <p style={{display:"inline-block",fontSize:"14px",color:"orange",marginLeft:"10px"}}>Today's Total</p>
  <p style={{display:"inline-block",fontSize:"14px",color:"orange",marginLeft:"63%",backgroundColor:"rgb(253, 241, 220)"}}>india</p>
  <p style={{fontSize:"17px",color:"orange",fontWeight:"500",marginTop:"-13px",marginLeft:"10px"}}>2,15,525</p>
      <ResponsiveContainer  aspect={2}>
        <LineChart data={Array}>
<CartesianGrid horizontal="true" vertical="" strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis
            orientation="right"
            ticks={yAxissTickss}
            tickFormatter={CustomYAxisFormatters } 
            />
          <Tooltip cursor={{ stroke: '#fd7e14', strokeWidth: 1 }} />
          <Line type="basis" dataKey="student" stroke='Gray' activeDot={{ r: 5 }} />
          <Line dataKey="fees" stroke='orange'/>
          <Line dataKey="other" stroke='orange' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

  </div>
  )}

    
  
  </div>
   
    <div style={{marginTop:"7%",display:"flex"}}>
      <div>
      <p className='startnow'>START NOW</p>
      <p className='bamstyles'>Book and move</p>
      <p className='bamstyles'style={{marginTop:"-40px"}}>anywhere in the city</p>
      </div>
    <div style={{marginLeft:"49%"}}>
    <QRCode value="2" style={{height:"150px",width:"150px",marginTop:"-20px"}}/>
     </div>
      </div>
     
      <div >
 <div>
      <hr style={{ width: '100%', borderTop: '1px solid rgb(133, 129, 129)' }} />
      <p style={{color:"rgb(147, 143, 143)"}}>Made with <span style={{color:"#ff474c"}}><FaHeart/></span></p>
<p style={{color:"rgb(147, 143, 143)"}}>#beOpen#chooseOpen</p>
</div>

<div>
  <p className='findstyles'>Find us Online</p>
  <div className='socialicons'>
<FaYoutube className='icon youtube'/>
<FaInstagram className='icon instagram'/>
<FaTwitter className='icon twitter'/>
<FaGithub className='icon'/>
<FaFacebook className='icon facebook'/>
<FaLinkedin className='icon linkedin'/>
  </div>
</div>

        </div>
    </div>
          </div>
           )}
        </div>
  <Routes>
  

  <Route path="/alltime" element={<Alltime />} />

  </Routes>
    </div>
   </BrowserRouter>
    
  );
}

export default Dammycode;