
import React, { useState } from 'react';

import './stylen.css';
import './hydstyles.css';
import { LineChart, CartesianGrid, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import "./alltimestyles.css"
import QRCode from "react-qr-code";
import 'boxicons/css/boxicons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{FaHeart,FaYoutube,FaInstagram,FaTwitter,FaGithub,FaFacebook,FaLinkedin} from 'react-icons/fa'


function Hydtoday() {
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
  

  const [isInrDropdownOpen, setIsInrDropdownOpen] = useState(false);
  const [isInrDropdownUp, setIsInrDropdownUp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSilverBg, setShowSilverBg] = useState(false); 
  const [showInfoPopup, setShowInfoPopup] = useState(false); 
  const [showsecondInfoPopup, setShowsecondInfoPopup] = useState(false); 
  const [showthirdInfoPopup, setShowthirdInfoPopup] = useState(false); 
  const [showfourthInfoPopup, setShowfourthInfoPopup] = useState(false); 
  const [showfiveInfoPopup, setShowfiveInfoPopup] = useState(false); 
  
  const [showsixInfoPopup, setShowsixInfoPopup] = useState(false); 
  
  const Array = [
    { name: "8: Apr", student: 13, fees: 1,other:2 },
    { name: "04:00", student: 10, fees: 12,other:6  },
    { name: "08:00", student: 20, fees: 23,other:4 },
    { name: "12:00", student: 9, fees: 10,other:0},
    { name: "16:00", student: 3, fees: 7 },
    { name: "0", student: 3, fees: 10 },
  ];

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

  const handleSort = (column) => {
    if (sortColumn === column) {
    
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  

  
  const tableData = [
   
    { city: 'Other Wards', onlineDrivers: '1,507', searches: '598',searcheswg:"576",searchesfq:"303",searcheswgq:"55",bookings:"55",ongoingtrips:"1" },
    { city: 'Monda MarKet',onlineDrivers: '129', searches: '101',searcheswg:"101",searchesfq:"47",searcheswgq:"21",bookings:"21",ongoingtrips:"0"},
    { city: 'Kondapur', onlineDrivers: '203',searches: '161',searcheswg:"161",searchesfq:"90",searcheswgq:"14",bookings:"14",ongoingtrips:"0" },
    { city: 'KPHB Colony',onlineDrivers: '63', searches: '60',searcheswg:"60",searchesfq:"32",searcheswgq:"8",bookings:"8",ongoingtrips:"0" },
    { city: 'Himayath Nagar',onlineDrivers: '32', searches: '46',searcheswg:"46",searchesfq:"26",searcheswgq:"14",bookings:"14",ongoingtrips:"0"},
    { city: 'Uppal',onlineDrivers: '52', searches: '28',searcheswg:"28",searchesfq:"21",searcheswgq:"7",bookings:"7",ongoingtrips:"0"},
    { city: 'Shaikpet',onlineDrivers: '46', searches: '28',searcheswg:"28",searchesfq:"15",searcheswgq:"5",bookings:"5",ongoingtrips:"0"},
    { city: 'Chaitanyapuri',onlineDrivers: '20', searches: '12',searcheswg:"12",searchesfq:"5",searcheswgq:"4",bookings:"4",ongoingtrips:"0" },
    { city: 'Kachiguda',onlineDrivers: '26', searches: '50',searcheswg:"50",searchesfq:"22",searcheswgq:"7",bookings:"7",ongoingtrips:"1"},
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
    else if (sortColumn === 'searches') {
      const firstValue = parseFloat(first.searches.replace(/,/g, ''));
      const secondValue = parseFloat(second.searches.replace(/,/g, ''));
      return firstValue - secondValue;
    }
    else {
      return 0; 
    }
  });
  
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
    <div className="hydtoday-overlay"> 
      <div>
      
      
      <div className='whitebg threedivs'>
            <div style={{display:"flex"}}>
           <div className='three greenbg'>
            <div style={{display:"flex"}}>
              <p className='Completedtrips'>Completed Trips</p>
              <i className='bx bx-info-circle infostyles' onMouseEnter={handleInfoHover} onMouseLeave={handleInfoLeave}></i>
              {showInfoPopup && 
             <div className="blackpopuphyd">
              <p style={{marginLeft:"12px"}}>Number of trips completed</p>

              <div style={{display:"flex"}} >
               <p style={{marginTop:"-7px"}}><span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px"}}>162</span>
               &nbsp;&nbsp;<span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>------------</span></p>
              <p style={{marginTop:"-15px",marginLeft:"1%"}}>Today's Completed</p>
               </div>
            <p style={{marginTop:"-24px",marginLeft:"35%"}}>Trips</p>

            <div style={{display:"flex"}} >
  <p style={{marginTop:"-7px"}}>
    <span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px",backgroundColor:"#E8E9EB",borderRadius:"3px"}}>
      12
      <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i>
    </span>
    &nbsp;&nbsp;
    <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>----------</span>
  </p>
  <p style={{marginTop:"-15px",marginLeft:"2%"}}>Last hour's</p>
</div>
 <p style={{marginTop:"-24px",marginLeft:"35%"}}>Completed Trips</p>
           </div>
             }       
           
           </div>
<p className='sevenstyles'>162</p>
<p className='oneeightstyles'>
<span>12<i class='bx bx-up-arrow-alt'></i></span></p>
            </div>


            <div className='three bluebg'>
           <div style={{display:"flex"}}>
           <p className='searches'> Searches</p>
            <i className='bx bx-info-circle infostyles' onMouseEnter={handlesecondInfoHover} onMouseLeave={handlesecondInfoLeave}></i>
            {showsecondInfoPopup &&
             <div className="blacksecondpopuphyd">
              <p className='nosearches'>Number of searches made by users</p>
              <p style={{marginTop:"-10px"}}><span style={{marginLeft:"12px",color: 'rgb(177, 171, 171)'}}>3.42K</span>&nbsp;&nbsp;
              <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>--------------</span>&nbsp;&nbsp;Today's Searches</p>
              <p style={{marginTop:"-10px"}}><span style={{color: 'rgb(177, 171, 171)',marginLeft:"12px",backgroundColor:"#E8E9EB",borderRadius:"3px"}}>400
              <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i></span>&nbsp;&nbsp;
              <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>-------------</span>&nbsp;&nbsp;Lasthour's Searches</p>
             </div>
            
            }
            
            </div>
            <p className='sevenstyles'>3,417</p>
            <p className='twosevenstyles'>
<span>400<i class='bx bx-up-arrow-alt'></i></span></p>
            </div>


     <div className='three orangebg'>
             <div>
              <div style={{display:"flex"}}>
           <p className='Completedtrips'>Drivers' Earning</p> 
           <i className='bx bx-info-circle infostyles'onMouseEnter={handlethirdInfoHover} onMouseLeave={handlethirdInfoLeave}></i>    
             {showthirdInfoPopup &&
             <div className='blackthirdpopuphyd '>
              <p style={{marginLeft:"12px"}}>Value generated for the drivers</p>
              <div style={{display:"flex"}} >
               <p style={{marginTop:"-7px"}}><span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px"}}>₹27.56K</span>
               &nbsp;&nbsp;
               <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>------------</span>
               </p>
              <p style={{marginTop:"-15px",marginLeft:"3%"}}>Today's Driver's</p>
               </div>
            <p style={{marginTop:"-24px",marginLeft:"48%"}}>Earning</p>
            <div style={{display:"flex"}} >
  <p style={{marginTop:"-7px"}}>
    <span style={{color: 'rgb(177, 171, 171)',marginLeft:"10px",backgroundColor:"#E8E9EB",borderRadius:"3px"}}>
      ₹2.16K
      <i class='bx bx-up-arrow-alt' style={{fontSize:"20px",marginTop:"-15px"}}></i>
    </span>
    &nbsp;&nbsp;
    <span style={{color: 'rgb(177, 171, 171)',fontSize:"10px"}}>----------</span>
  </p>
  <p style={{marginTop:"-15px",marginLeft:"3%"}}>
    Last hour's Driver's</p>
</div>
 <p style={{marginTop:"-24px",marginLeft:"48%"}}>Earnings</p>    
             </div>
             }
              </div>
              <p className='sevenstyles'>₹27,563</p>
              <p className='onesixstyles'><span>₹2,160<i class='bx bx-up-arrow-alt'></i></span></p>
             </div>
            </div>

            </div>


           
    <div>
    <div style={{display:"flex"}}>
    <p className='conversionall'>Conversion Rate</p> 
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
   <div style={{backgroundColor:"rgb(50, 190, 180)",width:"13%",marginTop:"-22px",height:"22px",borderRadius:"5px"}}></div> 
   <div className='vlinesmallhyd'></div>
   <div className='vlinessmall'></div>
   <p style={{marginLeft:"12%",fontSize:"13px",color:"rgb(133, 129, 129)",marginTop:"-1px"}}>4.8%</p>
   <p style={{marginLeft:"93%",fontSize:"13px",color:"rgb(133, 129, 129)",marginTop:"-33px"}}>Goal:50%</p>
    </div>

    <div className="Allcitiesseaech">
              <i className="bx bx-search searchstyles" ></i>
              <input
          className="inputstyless"
          type="text"
          placeholder="All Area"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
            </div>

  <div>
    <table className='tablestyles'>
    

<tr style={{backgroundColor:"#dfe3e4"}}>
<th>
        Ward
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
  Online
  <i
    style={{ marginLeft: '5px', cursor: 'pointer' }}
    className={`bx ${
      sortColumn === 'onlineDrivers' && sortDirection === 'asc'
        ? 'bx-down-arrow-alt'
        : 'bx-up-arrow-alt'
    }`}
    onClick={() => handleSort('onlineDrivers')}
  ></i><br/>
  Drivers
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
        <br/>for Quotes</th>

       
      <th>Searches
      <i style={{marginLeft:"15px", cursor:"pointer"}} 
      className={`bx ${
        sortColumn === 'searcheswgq' && sortDirection === 'asc'
          ? 'bx-down-arrow-alt'
          : 'bx-up-arrow-alt'
      }`}
      onClick={() => handleSort('searcheswgq')}
    ></i>
        <br/>Which got Quotes</th>


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
        <td >Hyderabad Total</td>
        <td>5,981</td>
        <td>3,536</td>
        <td>3,505</td>
        <td>1,821</td>
        <td>393</td>
        <td>393</td>
        <td>7</td>
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
        <LineChart data={Array}>

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
    </div>

    </div>
  );
}

export default Hydtoday;
