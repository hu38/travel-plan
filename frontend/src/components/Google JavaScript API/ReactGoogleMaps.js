import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Button } from 'antd';
// import { GoogleMap, LoadScript, Marker } from "google-maps-react";


const containerStyle = {
  height: '95vh'
};

const center = { lat: 37.7857, lng: -122.4011 };

const positions = [
  { lat: 37.7857, lng: -122.4011 },
  { lat: 37.8087, lng: -122.4098 },
  { lat: 37.7947, lng: -122.4117 },
  { lat: 37.7958, lng: -122.3938 }
]

const onLoad = marker => {
  console.log('marker: ', marker)
}



function MyComponent({cityResult}) {

  const testFlowDown = ({cityResult})=>
  {
    const { location ,  viewport } = cityResult["cityResult"]; //destructing
    console.log("======In Google Map (Linda LI)======");
    // console.log(cityResult);
    // console.log(cityResult['location']);
    console.log(JSON.stringify(cityResult));
    console.log(cityResult["cityResult"]);

    console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${location}`);
    console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${viewport}`);

    console.log(location["lat"]);
    console.log(location["lng"]);


  }


  const handleclick=()=>
  {
    testFlowDown(cityResult);
  }



  return (
    <>
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

      </GoogleMap>
    </LoadScript>

    <Button onClick={handleclick}>
          Click to Test Flow Down
    </Button>

    </>
  )
}

export default React.memo(MyComponent);


// "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
// "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}} 