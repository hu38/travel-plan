import React, { useState } from "react";
import { Modal} from 'antd';
import { Select, Button, message } from 'antd';

const EnterDestination = (props) => {
    
  // const [visible, setVisible] = useState();
  //const [options, setOptions] = useState([]);
  // setVisible(props.enterVisible);
  const options = [
    { value: 'New York', label: 'New York' },
    { value: 'Los Angeles', label: 'Los Angeles' },
    { value: 'Chicago', label: 'Chicago' },
    { value: 'Miami', label: 'Miami' },
    { value: 'Dallas', label: 'Dallas' },
    { value: 'Philadelphia', label: 'Philadelphia' },
    { value: 'Houston', label: 'Houston' },
    { value: 'Atlanta', label: 'Atlanta' },
    { value: 'Washington', label: 'Washington' },
    { value: 'Boston', label: 'Boston' },
    { value: 'Phoenix', label: 'Phoenix' },
    { value: 'Seattle', label: 'Seattle' },
    { value: 'San Francisco', label: 'San Francisco' },
    { value: 'Detroit', label: 'Detroit' },
    { value: 'San Diego', label: 'San Diego' },
    { value: 'Minneapolis', label: 'Minneapolis' },
    { value: 'Tampa', label: 'Tampa' },
    { value: 'Denver', label: 'Denver' },
    { value: 'Brooklyn', label: 'Brooklyn' },
    { value: 'Queens', label: 'Queens' },
    { value: 'Riverside', label: 'Riverside' },
    { value: 'Baltimore', label: 'Baltimore' },
    { value: 'Las Vegas', label: 'Las Vegas' },
    { value: 'Portland', label: 'Portland' },
    { value: 'San Antonio', label: 'San Antonio' },
    { value: 'St. Louis', label: 'St. Louis' },
    { value: 'Sacramento', label: 'Sacramento' },
    { value: 'Orlando', label: 'Orlando' },
    { value: 'San Jose', label: 'San Jose' },
    { value: 'Cleveland', label: 'Cleveland' },
    { value: 'Pittsburgh', label: 'Pittsburgh' },
    { value: 'Austin', label: 'Austin' },
    { value: 'Cincinnati', label: 'Cincinnati' },
    { value: 'Kansas City', label: 'Kansas City' },
    { value: 'Manhattan', label: 'Manhattan' },
    { value: 'Indianapolis', label: 'Indianapolis' },
    { value: 'Columbus', label: 'Columbus' },
    { value: 'Charlotte', label: 'Charlotte' },
    { value: 'Virginia Beach', label: 'Virginia Beach' },
    { value: 'Bronx', label: 'Bronx' },
    { value: 'Milwaukee', label: 'Milwaukee' },
    { value: 'Providence', label: 'Providence' },
    { value: 'Jacksonville', label: 'Jacksonville' },
    { value: 'Salt Lake City', label: 'Salt Lake City' },
    { value: 'Nashville', label: 'Nashville' },
    { value: 'Richmond', label: 'Richmond' },
    { value: 'Memphis', label: 'Memphis' },
    { value: 'Raleigh', label: 'Raleigh' },
    { value: 'New Orleans', label: 'New Orleans' },
    { value: 'Louisville', label: 'Louisville' },
    { value: 'Oklahoma City', label: 'Oklahoma City' },
    { value: 'Bridgeport', label: 'Bridgeport' },
    { value: 'Buffalo', label: 'Buffalo' },
    { value: 'Fort Worth', label: 'Fort Worth' },
    { value: 'Hartford', label: 'Hartford' },
    { value: 'Tucson', label: 'Tucson' },
    { value: 'Omaha', label: 'Omaha' },
    { value: 'El Paso', label: 'El Paso' },
    { value: 'Honolulu', label: 'Honolulu' },
    { value: 'McAllen', label: 'McAllen' },
    { value: 'Albuquerque', label: 'Albuquerque' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'Sarasota', label: 'Sarasota' },
    { value: 'Dayton', label: 'Dayton' },
    { value: 'Rochester', label: 'Rochester' },
    { value: 'Fresno', label: 'Fresno' },
    { value: 'Allentown', label: 'Allentown' },
    { value: 'Tulsa', label: 'Tulsa' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Concord', label: 'Concord' },
    { value: 'Colorado Springs', label: 'Colorado Springs' },
    { value: 'Charleston', label: 'Charleston' },
    { value: 'Springfield', label: 'Springfield' },
    { value: 'Grand Rapids', label: 'Grand Rapids' },
    { value: 'Mission Viejo', label: 'Mission Viejo' },
    { value: 'Albany', label: 'Albany' },
    { value: 'Knoxville', label: 'Knoxville' },
    { value: 'Bakersfield', label: 'Bakersfield' },
    { value: 'Ogden', label: 'Ogden' },
    { value: 'Baton Rouge', label: 'Baton Rouge' },
    { value: 'Akron', label: 'Akron' },
    { value: 'New Haven', label: 'New Haven' },
    { value: 'Columbia', label: 'Columbia' },
    { value: 'Mesa', label: 'Mesa' },
    { value: 'Palm Bay', label: 'Palm Bay' },
    { value: 'Provo', label: 'Provo' },
    { value: 'Worcester', label: 'Worcester' },
    { value: 'Murrieta', label: 'Murrieta' },
    { value: 'Greenville', label: 'Greenville' },
    { value: 'Wichita', label: 'Wichita' },
    { value: 'Toledo', label: 'Toledo' },
    { value: 'Staten Island', label: 'Staten Island' },
    { value: 'Des Moines', label: 'Des Moines' },
    { value: 'Long Beach', label: 'Long Beach' },
    { value: 'Port St. Lucie', label: 'Port St. Lucie' },
    { value: 'Denton', label: 'Denton' },
    { value: 'Madison', label: 'Madison' },
    { value: 'Reno', label: 'Reno' },
    { value: 'Harrisburg', label: 'Harrisburg' },
    { value: 'Little Rock', label: 'Little Rock' },
    { value: 'Oakland', label: 'Oakland' },
    { value: 'Durham', label: 'Durham' },
    { value: 'Winston-Salem', label: 'Winston-Salem' },
    { value: 'Bonita Springs', label: 'Bonita Springs' },
    { value: 'Indio', label: 'Indio' },
    { value: 'Palm Coast', label: 'Palm Coast' },
    { value: 'Chattanooga', label: 'Chattanooga' },
    { value: 'Spokane', label: 'Spokane' },
    { value: 'Syracuse', label: 'Syracuse' },
    { value: 'Lancaster', label: 'Lancaster' },
    { value: 'Arlington', label: 'Arlington' },
    { value: 'Stockton', label: 'Stockton' },
    { value: 'Poughkeepsie', label: 'Poughkeepsie' },
    { value: 'Augusta', label: 'Augusta' },
    { value: 'Boise', label: 'Boise' },
    { value: 'Oxnard', label: 'Oxnard' },
    { value: 'Scranton', label: 'Scranton' },
    { value: 'Modesto', label: 'Modesto' },
    { value: 'Kissimmee', label: 'Kissimmee' },
    { value: 'Aurora', label: 'Aurora' },
    { value: 'Youngstown', label: 'Youngstown' },
    { value: 'Fayetteville', label: 'Fayetteville' },
    { value: 'Anaheim', label: 'Anaheim' },
    { value: 'Pensacola', label: 'Pensacola' },
    { value: 'Victorville', label: 'Victorville' },
    { value: 'Lancaster', label: 'Lancaster' },
    { value: 'Greensboro', label: 'Greensboro' },
    { value: 'Corpus Christi', label: 'Corpus Christi' },
    { value: 'Fort Wayne', label: 'Fort Wayne' },
    { value: 'Santa Ana', label: 'Santa Ana' },
    { value: 'Flint', label: 'Flint' },
    { value: 'San Juan', label: 'San Juan' },
    { value: 'Fayetteville', label: 'Fayetteville' },
    { value: 'Jackson', label: 'Jackson' },
    { value: 'Santa Rosa', label: 'Santa Rosa' },
    { value: 'Lansing', label: 'Lansing' },
    { value: 'Ann Arbor', label: 'Ann Arbor' },
    { value: 'Henderson', label: 'Henderson' },
    { value: 'Huntsville', label: 'Huntsville' },
    { value: 'Lexington', label: 'Lexington' },
    { value: 'Mobile', label: 'Mobile' },
    { value: 'Fort Collins', label: 'Fort Collins' },
    { value: 'Asheville', label: 'Asheville' },
    { value: 'Santa Clarita', label: 'Santa Clarita' },
    { value: 'St. Paul', label: 'St. Paul' },
    { value: 'Antioch', label: 'Antioch' },
    { value: 'Lakeland', label: 'Lakeland' },
    { value: 'Trenton', label: 'Trenton' },
    { value: 'Lincoln', label: 'Lincoln' },
    { value: 'Plano', label: 'Plano' },
    { value: 'Irvine', label: 'Irvine' },
    { value: 'Davenport', label: 'Davenport' },
    { value: 'Rockford', label: 'Rockford' },
    { value: 'Newark', label: 'Newark' },
    { value: 'South Bend', label: 'South Bend' },
    { value: 'Shreveport', label: 'Shreveport' },
    { value: 'Round Lake Beach', label: 'Round Lake Beach' },
    { value: 'Savannah', label: 'Savannah' },
    { value: 'Myrtle Beach', label: 'Myrtle Beach' },
    { value: 'Chula Vista', label: 'Chula Vista' },
    { value: 'Eugene', label: 'Eugene' },
    { value: 'Canton', label: 'Canton' },
    { value: 'Lubbock', label: 'Lubbock' },
    { value: 'Reading', label: 'Reading' },
    { value: 'Winter Haven', label: 'Winter Haven' },
    { value: 'Salem', label: 'Salem' },
    { value: 'St. Petersburg', label: 'St. Petersburg' },
    { value: 'Lafayette', label: 'Lafayette' },
    { value: 'Laredo', label: 'Laredo' },
    { value: 'Jersey City', label: 'Jersey City' },
    { value: 'Concord', label: 'Concord' },
    { value: 'Columbus', label: 'Columbus' },
    { value: 'Chandler', label: 'Chandler' },
    { value: 'McKinney', label: 'McKinney' },
    { value: 'Scottsdale', label: 'Scottsdale' },
    { value: 'Killeen', label: 'Killeen' },
    { value: 'Tallahassee', label: 'Tallahassee' },
    { value: 'Peoria', label: 'Peoria' },
    { value: 'Wilmington', label: 'Wilmington' },
    { value: 'Montgomery', label: 'Montgomery' },
    { value: 'Gilbert', label: 'Gilbert' },
    { value: 'Glendale', label: 'Glendale' },
    { value: 'North Las Vegas', label: 'North Las Vegas' },
    { value: 'Anchorage', label: 'Anchorage' },
    { value: 'Chesapeake', label: 'Chesapeake' },
    { value: 'Barnstable Town', label: 'Barnstable Town' },
    { value: 'Norfolk', label: 'Norfolk' },
    { value: 'Fremont', label: 'Fremont' },
    { value: 'Kennewick', label: 'Kennewick' },
    { value: 'Garland', label: 'Garland' },
    { value: 'Irving', label: 'Irving' },
    { value: 'Visalia', label: 'Visalia' },
    { value: 'Atlantic City', label: 'Atlantic City' },
    { value: 'Nashua', label: 'Nashua' },
    { value: 'Paradise', label: 'Paradise' },
    { value: 'Hialeah', label: 'Hialeah' },
    { value: 'Arlington', label: 'Arlington' },
    { value: 'Evansville', label: 'Evansville' }
  ]

    // lifted State
    /* lift to <Main />
    const [cityResult, setcityResult]= useState(undefined);  // undefined
    const [ModalText, setModalText] = useState("Boston"); //  ie.  const [cityText,   setCityText]= useState("Boston"); // lifted from EnterDestination
    */

    // destinaion Result in { } object format. 
    // http://localhost:8080/api/place/find-city?city=losangelos
    /* "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
              "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}}*/

    // test
    // const useEffect{}  // side effect after done
    
    const handleOk = () => {
      props.findCityLocation(); 
      props.findRecommendCityList();
      props.closeCity();
    };
    
    const handleCancel = () => {
      message.warning('Please enter a city and press Go button');
    };

    //const onSearch = (searchText) => {
    //  setOptions(
     //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
     // );
    //  if(options.indexOf(searchText,0)!= -1){
    //    props.setCityText(searchText);
    //  }
   // };

    const handleChange = (data) => {
      props.setCityText(data);
    };

    //const mockVal = (str, repeat = 1) => {
    //  return {
     //   value: str.repeat(repeat),
     // };
   // };

  
      return (
        <>
          <Modal
            title="Choose your city"
            visible = {props.enterVisible || props.recomendLoading}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" 
                onClick={handleOk}
                loading = {props.recomendLoading}
                disabled = {props.recomendLoading}>
                  Go
                </Button>,
              ]}
          >
              <Select
                showSearch
                allowClear
                options={options}
                style={{ width: 200 }}
                placeholder="e.g.Boston"
                onChange={handleChange}
                //onSearch={onSearch}
                //filterOption={false}
            >
            </Select>
          </Modal>
          
        </>
      );
    }
  
  export default EnterDestination;