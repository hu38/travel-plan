import React, { useState } from "react";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import Locations from "./Locations/Locations";
import recommendedData from './Locations/Locations.data';

function Main() {
    const [selected, setSelected] = useState([]);
    const [recommended, setRecommended] = useState(recommendedData);

    return (
        <div>
            <SearchAndAdd />
            <Locations 
                recommended={recommended} 
                selected={selected} 
                handleUpdateRecommended={setRecommended}
                handleUpdateSelected={setSelected}
            />
            <MapView />
        </div>
    )
}

export default Main;