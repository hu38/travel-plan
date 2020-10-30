import React from "react";
import Locations from "./RecommendAndSelect/Locations";
import MapView from "./MapView";

const Main = () => {

    return (
        <div>

            <Locations style={{position:"fixed" }}/>


           <MapView style={{position: "absolute"}}/>

        </div>
    )
}

export default Main;