import { Button } from "antd";
import React from "react";
import ReactGoogleMaps from './Google JavaScript API/ReactGoogleMaps'

const MapView = ({cityResult, recomendCityList, encodedRoute, findOptimizeRoutes}) => {

//     const testFlowDown = ({cityResult})=>
//   {
//     // const { location ,  viewport } = cityResult; //destructing
//     console.log("============");
//     console.log(cityResult);
//     // console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${location}`);
//     // console.log(`./Google JavaScript API/<ReactGoogleMaps />  : ${viewport}`);
//   }

//   const handleclick=()=>
//   {
//     testFlowDown(cityResult);
//   }

    return (
        <>
        {/* <Button onClick={handleclick}> buttonnn </Button> */}
        <div>
            <ReactGoogleMaps cityResult={cityResult} recomendCityList={recomendCityList} encodedRoute={encodedRoute} />
        </div>
        </ >
    )
}

export default MapView;