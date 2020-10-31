import React from "react";
import CollapseList from "./RecommendAndSelect/Collapse";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import { Collapse } from "antd";

const Main = () => {

    return (
        <div>
            <SearchAndAdd/>
            <CollapseList style={{position:"fixed" }}/>


           <MapView style={{position: "absolute"}}/>

        </div>
    )
}

export default Main;