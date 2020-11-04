import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import { Button } from 'antd';
// import { GoogleMap, LoadScript, Marker } from "google-maps-react";


const containerStyle = {
  height: '95vh'
};

const centerFake = { lat: 37.7857, lng: -122.4011 };

const positions = [
  { lat: 37.7857, lng: -122.4011 },
  { lat: 37.8087, lng: -122.4098 },
  { lat: 37.7947, lng: -122.4117 },
  { lat: 37.7958, lng: -122.3938 }
]

const onLoad = marker => {
  console.log('marker: ', marker)
}
const onLoad2 = polyline => {
  console.log('polyline: ', polyline)
}
const options = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ],
  zIndex: 1
};


function MyComponent({cityResult}) {

  let center ;
  if (cityResult===undefined)
  {
    center=centerFake; 
  }
  else{
    const latitude = cityResult.location.lat;
    const longtitude = cityResult.location.lng;
  
    const centerXXX = {
      lat:latitude,
      lng:longtitude
    }
    center=centerXXX;
  }

  // const [location, viewport]  = cityResult; 

  


  // const testFlowDown = ({cityResult})=>
  // {
  //   // const location, viewporet
  //  const { location ,  viewport } = cityResult["cityResult"]; //destructing
  //   setCenter(location);
  //   console.log("======In Google Map (Linda LI)======");
  //   // console.log(cityResult);
  //   // console.log(cityResult['location']);
  //   console.log(JSON.stringify(cityResult));
  //   console.log(cityResult["cityResult"]);

  //   console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${location}`);
  //   console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${viewport}`);

  //   console.log(location["lat"]);
  //   console.log(location["lng"]);


  // }
  // const handleclick=()=>
  // {
  //   testFlowDown(cityResult);
  // }



  return (
    <>
    {/* <Button onClick={handleclick}>
      Click to Test Flow Down
    </Button> */}
    <LoadScript
      googleMapsApiKey="AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {positions.map(pos => 
          <Marker 
            position={pos}
            // onLoad={onLoad}  
            onLoad={onLoad}
          />
        )}
        <Polyline
            onLoad={onLoad2}
            path={positions}
            options={options}
        />

      </GoogleMap>
    </LoadScript>

    </>
  )
}

export default React.memo(MyComponent);


// "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
// "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}} 