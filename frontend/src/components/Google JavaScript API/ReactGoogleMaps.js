import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)