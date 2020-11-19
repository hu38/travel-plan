import React, { useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline, useJsApiLoader } from '@react-google-maps/api';
import { Button } from 'antd';
// import { GoogleMap, LoadScript, Marker } from "google-maps-react";


const containerStyle = {
  height: '85vh'
  // height: window.innerHeight - 150
};

const centerFake = { lat: 37.7857, lng: -122.4011 };
const neFake = { lat:37.812, lng: -122.3482 };
const swFake = { lat:37.70339999999999, lng: -122.527 };

const positionsFake = [
  { lat: 37.7857, lng: -122.4011 },
  { lat: 37.7947, lng: -122.4117 },
  { lat: 37.8087, lng: -122.4098 },
  { lat: 37.7958, lng: -122.3938 }
]

const onLoad1 = marker => {
  console.log('marker: ', marker)
}
const onLoad2 = polyline => {
  console.log('polyline: ', polyline)
}
const options = {
  strokeColor: 'Coral',
  strokeOpacity: 0.9,
  strokeWeight: 4,
  fillColor: 'Crimson',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  zIndex: 1
};

const MyComponent = ({cityResult, recomendCityList, encodedRoute}) => {

  //info window open/close & selected places
  const [selectedPlace, setSelectedPlace] = useState(null);
  // const [infoOpen, setInfoOpen] = useState(false);
  const [markerMap, setMarkerMap] = useState({});

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.name]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);
    console.log("mememe"+JSON.stringify(selectedPlace))

    // Required so clicking a 2nd marker works as expected
    // if (infoOpen) {
    //   setInfoOpen(false);
    // }

    // setInfoOpen(true);
  };


  //test markers with recomendCityList
  let positions = [ ];
  positions = positionsFake;
  if (recomendCityList !== undefined) {
    console.log("I got the list!")
    positions = [];   //empty the selected list
    recomendCityList.map(pos => positions.push(pos));   //get the new list
  }

  // function getPositions(input,list) {
  //   console.log("hello" + JSON.stringify(input.location))
  //   return input.map(pos => list.push(pos.location))
  // }

  const decodePolyline = require('decode-google-map-polyline');
  // var polylineCode = 'neuaEejkbUEGc@j@PXl@p@P\\a@f@GHyDtEgC`DoCfDzHbQp@rAbH`JdBtBrCjDn@p@dDbDfIvHfD~CrK~Jo@z@uCrDmJnL}^ld@mVjZmQrTgArAFJ';
  // var polylineCode = encodedRoute;
  // const polyline = decodePolyline(polylineCode);
  // console.log("POLYLINE IS HERE" + JSON.stringify(polyline));
  // let path;
  // if (polyline===undefined) {
  //   path = positions;
  // }else {
  //   path = polyline;
  // }
  // console.log("PATH IS HERE" + JSON.stringify(path));


  let center;
  let ne;
  let sw;
  if (cityResult===undefined)
  {
    center=centerFake; 
    ne = neFake;
    sw = swFake;
  }
  else{
    center = cityResult.location;
    ne = cityResult.viewport.northeast;
    sw = cityResult.viewport.southwest;
    console.log(JSON.stringify(ne) + JSON.stringify(sw));
  }

  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    const viewport = [sw, ne];
    viewport.forEach(bound => bounds.extend(new window.google.maps.LatLng(bound.lat, bound.lng)))
    map.fitBounds(bounds);
    console.log("bounds" + JSON.stringify(bounds))
    setMap(map)
  }, [])
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onMapClick = (...args) => {
    console.log('onClick args: ', args)
  }

  const divStyle = {
    background: `rgba(255,255,255, 0.5)`,
    border: `0px solid #ccc`,
    padding: 0,
  }

  // const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // let labelIndex = 0;

  // const [center, setCenter] = useState({lat: 37.7857, lng: -122.4011});
  // const [ne, setNE] = useState({lat:37.812, lng: -122.3482});
  // const [sw, setSW] = useState({lat:37.70339999999999, lng: -122.527});
  // // const viewport = [{lat:37.70339999999999, lng: -122.527}, {lat:37.812, lng: -122.3482}];

  return (
    <>
    {/* <Button type="primary" onClick={findOptimizeRoutes()}>Primary Button</Button> */}
    <LoadScript
      googleMapsApiKey="AIzaSyAuvzzlAIwAnDg5XlJalg1tOa-pQs-tkPI"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onDblClick={onMapClick}
        options={{gestureHandling:'greedy'}}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        {positions.map(pos => 
          <Marker
            key={pos.name}
            position={pos.location}
            // onLoad={onLoad1}  
            onLoad={marker => markerLoadHandler(marker, pos)}
            onClick={event => markerClickHandler(event, pos)}
            label={{text: pos.name, fontFamily: "Verdana", fontSize: "10px", color: "dark-grey", fontWeight: "bold"}}
            // icon={{
            //   path: "M24,9c0,4.07-3.06,7.44-7,7.94V30c0,0.55-0.45,1-1,1s-1-0.45-1-1V16.94c-3.94-0.5-7-3.87-7-7.94    c0-4.41,3.59-8,8-8S24,4.59,24,9z",
            //   fillColor: "Tomato",
            //   fillOpacity: 1.0,
            //   strokeWeight: 0.0,
            //   scale: 1.0
            // }}
            // onClick={event => markerClickHandler(event, pos)}
            // label= {labels[labelIndex++ % labels.length]}
          />
        )}

        {/* optional infowindow, research later*/}
          {/* <InfoWindow
            // position={pos.location}
            anchor={markerMap[selectedPlace.name]}
          >
            <div style={divStyle}>
              <h6>{selectedPlace.name}</h6>
            </div>
          </InfoWindow> */}


        {/* <Polyline
            onLoad={onLoad2}
            path={path}
            options={options}
        /> */}

      </GoogleMap>
    </LoadScript>
    </>
  )
}

export default React.memo(MyComponent);


// "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
// "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}} 