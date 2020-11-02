import React, { useState, useEffect } from "react";
import CollapseList from "./RecommendAndSelect/Collapse";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import EnterDestination from "./EnterDestination";
import { Collapse } from "antd";





const Main = () => {

    // Sourth of Truth
    const [cityText,   setCityText]= useState("Boston"); // lifted from EnterDestination
    const [cityResult, setcityResult]= useState(undefined);  // undefined  city's location


    // const aaa="";

    // I am really smart...

    useEffect(  ()=>
        {
            console.log(cityResult);  // cityResult works
            console.log(`City Text: ${cityText}`);  // cityText works
        }

    );
        
    // Func Declaration
    // Enter Destination to Use
    const findCityLocation=() =>{

        fetch(`api/place/find-city?city=${cityText}`).then(res=>res.json()).then(
            data=>{
              if (data.statusCode===200)
              {
                console.log(`<Main /> : ${data.body}`);
                setcityResult(data.body);
              }
              console.log(cityResult);
            //   aaa=cityResult;
            }
          )
    }


    



    return (
        <div>
            <EnterDestination findCityLocation={findCityLocation} setCityText={setCityText}/>
            {/* <SearchAndAdd/> */}
            <CollapseList style={{position:"fixed" }  }/>


           <MapView style={{position: "absolute"}} cityResult={{cityResult}}  />

        </div>
    )
}

export default Main;