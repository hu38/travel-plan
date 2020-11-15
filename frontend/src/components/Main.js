import React, { useState, useEffect } from "react";
import CollapseList from "./RecommendAndSelect/Collapse";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import EnterDestination from "./EnterDestination";
import {Collapse, Col, Row } from "antd";
import  "../styles/Main.css";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Affix, Button } from 'antd';


const Main = () => {
  // const [loading, setLoading] = useState(false);
  // const [recomList, setRecomList] = useState([]);


    /***  Lifted State Sourth of Truth ***/
    // 1. <EnterDestination />
    const [cityText,   setCityText]= useState("Boston"); 
    const [cityResult, setcityResult]= useState(undefined);  
    
    // 2. <Collapse />
    const [recomendAttractionList, setRecomendCityList] = useState([]);

    /*** -----  Lifted State Sourth of Truth  ----- ***/
    // useEffect(  ()=>
    //     {
    //         console.log(cityResult);  // cityResult works
    //         console.log(`City Text: ${cityText}`);  // cityText works
    //     }
    // );
   

    /*** Func Declaration   ***/ 
    // 1. Enter Destination to Use
    const findCityLocation=() =>{
        fetch(`api/place/find-city?city=${cityText}`).then(res=>res.json()).then(
            data=>{
              if (data.statusCode===200)
              {
                // console.log(`<Main /> : ${data.body}`);
                setcityResult(data.body);
              }
            //   console.log(cityResult);
            }
          )
    }

    // 2. Collapsed List
    const findRecommendCityList=() =>{
        //api/place/find-tourist-attractions?city=houston   !!! &pagetoken
        // response: got 20 arrays in data.body.results
        fetch(`api/place/find-tourist-attractions?city=${cityText}`).then(res=>res.json()).then(
            data => {
              // As of Now, I only need { Name & photo_reference & location & place_id} shown below.
              if (data.statusCode===200)
              {  
                // setRecomendCityList( data.body.results.map( (cityInfo)=>{
                //     let {location, name, photo_reference,place_id} =cityInfo;     // destructing
                //     let newElement = {location, name, photo_reference,place_id};  // concate the summary info
                // }

                setRecomendCityList(data.body.results);
                
                // setRecomendCityList( data.body.results.map( (cityInfo)=>{
                    
                //     let {location, name, photo_reference,place_id} =cityInfo;     // destructing
                //     let newElement = {location, name, photo_reference,place_id};  // concate the summary info

                //     console.log("new Element City Recommended");
                //     console.log(JSON.stringify(newElement));  // works
                    
                //     return{
                //         ...cityInfo
                //     }
                
                // }));
              }
            //   console.log("=== here comes recommendation list ===")
            //   console.log(recomendCityList);  //empty
            }
        )
    }
    
  //   const menu = (
  //     <Menu>
  //       <Menu.Item>
  //         <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
  //           1st menu item
  //         </a>
  //       </Menu.Item>
  //       </Menu>
  //  );

  

    return (
       <div id = "container">
          <div>
            <EnterDestination 
            findCityLocation={findCityLocation} 
            setCityText={setCityText} 
            findRecommendCityList={findRecommendCityList}
            />
          </div> 
        <div  id="collapse-list">  
          <CollapseList  
              style={{position:"absolute" } }
              recomendAttractionList={recomendAttractionList}  />       
        </div> 
        <div id = "map">
          <MapView style={{position: "absolute"}} 
              cityResult={cityResult}
              recomendAttractionList={recomendAttractionList}
          />    
        </div>   
      </div> 
    //       <Row>
        
    //     <Col span={24}>
     
          
    //     </Col>    
        
    // </Row>

        
        // <div>
        //     <EnterDestination 
        //             findCityLocation={findCityLocation} 
        //             setCityText={setCityText} 
        //             findRecommendCityList={findRecommendCityList}
        //     /> 

        //     {/* <SearchAndAdd/> */}
        //     <CollapseList 
        //             style={{position:"fixed" } }
        //             recomendCityList={recomendCityList}
        //     />


        //    <MapView style={{position: "absolute"}} 
        //         cityResult={cityResult}
        //         recomendCityList={recomendCityList}
        //     /> 

        // </div> 

        
    );
}

export default Main;



// *** City Info ***//
//
//     "business_status": "OPERATIONAL",
//     "formatted_address": "2800 Post Oak Blvd, Houston, TX 77056, United States",
//     "location": {
//       "lat": 29.736342,
//       "lng": -95.461322
//     },
//     "name": "Gerald D. Hines Waterwall Park",
//     "opening_hours": [
//       "Monday: 8:00 AM – 9:00 PM",
//       "Tuesday: 8:00 AM – 9:00 PM",
//       "Wednesday: 8:00 AM – 9:00 PM",
//       "Thursday: 8:00 AM – 9:00 PM",
//       "Friday: 8:00 AM – 9:00 PM",
//       "Saturday: 8:00 AM – 9:00 PM",
//       "Sunday: 8:00 AM – 9:00 PM"
//     ],
//     "photo_reference": "CmRaAAAA9bykg6DmZHES49dwOO_pqQpODrkKREm9hDOHpHqMGvxGC8al77xZrHgTUJ0o_0vntt_tEhnEQp0ooLUqEOBTft_FRb8SSzt_lbkZ6sRYuNUpexNwsbjHhurwzO_bT6exEhAg0Hial0bqSCxhaCZBg0gvGhT5p5tWoQ6l_TNME3u1xUkFVe5ajA",
//     "place_id": "ChIJpTwf6G3BQIYRyZpTrmALPvQ",
//     "rating": 4.7,
//     "user_ratings_total": 3824
//   },
