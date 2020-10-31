import React from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api';

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

//marker
const onLoad = marker => {
  console.log('marker: ', marker)
}
//marker

//polyline
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
//polyline

//infoWindow
const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15
}
const onLoad3 = infoWindow => {
  console.log('infoWindow: ', infoWindow)
}
//infoWindow

function MyComponent() {
  return (
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
  )
}

export default React.memo(MyComponent)