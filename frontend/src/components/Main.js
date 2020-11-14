import React, { useState, useEffect} from "react";
import CollapseList from "./RecommendAndSelect/Collapse";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";
import EnterDestination from "./EnterDestination";
import { Button, message } from "antd";
import OptimizeRoute from "./RecommendAndSelect/OptimizeRoute"
import SavedRecords from "./SavedRecords";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import Register from "./Register";


const Main = () => {
  
    /***  Lifted State Sourth of Truth ***/
    // 1. <EnterDestination />
    const [cityText,   setCityText]= useState("Boston"); 
    const [cityResult, setcityResult]= useState(undefined);  
    const [enterVisible, setEnterVisible] = useState(true);
    const [recomendLoading,setRecomendLoading] = useState(false);
    
    // 2. <Collapse />
    const [recomendCityList, setRecomendCityList] = useState([]);

    //3. Optimize Routes
    const [placeID, setPlaceID] = useState("ChIJj2tUC2bGwoARwqdCDE37YD0 ChIJkyPnxsO_woARXQl-tdWAFi8 ChIJzzgyJU--woARcZqceSdQ3dM ChIJdZbSPDg23YAR6yR-akC2g4E");
    const [encodedRoute, setEncodedRoute] = useState('');

    /*** -----  Lifted State Sourth of Truth  ----- ***/


    // useEffect(  ()=>
    //     {
    //         console.log(cityResult);  // cityResult works
    //         console.log(`City Text: ${cityText}`);  // cityText works
    //     }

    // );

    //4. Login and Logout
    const [isLogin, setIsLogin] = useState(false);

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

    const changeCity=() => {    //pop out window
      setEnterVisible(true);
      console.log("open enter destination");
    }

    const closeCity=() => {   //close the window
      setEnterVisible(false);
      console.log("close enter destination")
    }


    // 2. Collapsed List
    const findRecommendCityList=() =>{

        //api/place/find-tourist-attractions?city=houston   !!! &pagetoken
        // response: got 20 arrays in data.body.results
        setRecomendLoading(true);
        fetch(`api/place/find-tourist-attractions?city=${cityText}`).then(res=>res.json()).then(
            data=>{

              // As of Now, I only need { Name & photo_reference & location & place_id} shown below.

              if (data.statusCode===200)
              {  
                // setRecomendCityList( data.body.results.map( (cityInfo)=>{
                //     let {location, name, photo_reference,place_id} =cityInfo;     // destructing
                //     let newElement = {location, name, photo_reference,place_id};  // concate the summary info
                // }



                setRecomendCityList( data.body.results);
                setRecomendLoading(false);
                closeCity();
                
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

    //3. Optimize Routes
    // console.log("placeID is here" + placeID);
    const findOptimizeRoutes=() =>{
      fetch(`api/direction/get-route?places=${placeID}&optimize=true`).then(res=>res.json()).then(
          data=>{
            if (data.statusCode===0) {
              setEncodedRoute(data.body.overviewPolyline.points);
            }
            // console.log("this is encoded route: " + data.statusCode);
            // console.log("this is url: " + "api/direction/get-route?places=" + placeID + "&optimize=true");
          })
    }

    //4. Login and Logout
    const showLogout = () =>{
      setIsLogin(true);
    }

    const showLogin = () =>{
      setIsLogin(false);
    }
    
    const getLogin = (values) => {
      const {username, password} = values;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(values);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      console.log(values)
      fetch(`api/user/login`,requestOptions)
      .then(res=>res.json()).then(
        data=>{
          if (data.statusCode===200)
          {
            showLogout();
            message.success('Login success');
            // console.log(`<Main /> : ${data.body}`);
          }
          else {
            message.error('Login error');
          }
        //   console.log(cityResult);
        }
      )
    }



    return (     
        <div>
            <EnterDestination 
                    findCityLocation={findCityLocation} 
                    setCityText={setCityText} 
                    findRecommendCityList={findRecommendCityList}
                    enterVisible={enterVisible}
                    closeCity={closeCity}
                    recomendLoading = {recomendLoading}
            /> 

            {/* <SearchAndAdd/> */}
            <CollapseList 
                    style={{position:"fixed" } }
                    recomendCityList={recomendCityList}
            />

            <Button type="primary" onClick={changeCity}>
                Change City
            </Button>

            <OptimizeRoute
                recomendCityList={recomendCityList}
                setPlaceID={setPlaceID}
                findOptimizeRoutes={findOptimizeRoutes}
            />
            {isLogin?
                <span>
                  <LogOut showLogin = {showLogin} />
                  <SavedRecords/>
                </span>
                :
                <span>
                  <LogIn showLogout = {showLogout} getLogin = {getLogin}/>
                </span>
            }
           <MapView style={{position: "absolute"}} 
                cityResult={cityResult}
                recomendCityList={recomendCityList}
                encodedRoute={encodedRoute}
            />
        </div> 

        
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
