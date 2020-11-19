import React, { useState } from "react";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import Locations from "./Locations/Locations";
import recommendedData from './Locations/Locations.data';
import { Affix } from 'antd';

function Main() {
    const [selected, setSelected] = useState([]);
    const [recommended, setRecommended] = useState(recommendedData);
    const [container, setContainer] = useState(null);

    return (
        <div>
            <SearchAndAdd />
            <Affix target={()=>container}>
                <Locations 
                    recommended={recommended} 
                    selected={selected} 
                    handleUpdateRecommended={setRecommended}
                    handleUpdateSelected={setSelected}
                />
            </Affix>
            <div ref={setContainer}>
                <MapView />
            </div>
        </div>
    )
}

export default Main;