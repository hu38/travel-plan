import React, {useState} from "react";
import Title from "antd/lib/typography/Title"
import { GOOGLEMAP_BASE_URL, GOOGLE_API_KEY, GOOGLE_API_SERVICE } from "../constantURL";
import PlacesList from "./PlaceList";

//***  dummy Param ***/

// const userInput ={
//     lat: 40.730610,
//     lon:-73.935242,
// }
const radius = 10000; // set default
const typeSearch = "tourist_attraction";


const PlacesNearby = ()=>{

    const [placesList, setPlacesList] = useState([]); // init{[]}

    // when user click ok

   
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

            // fetch(`${GOOGLEMAP_BASE_URL}/${GOOGLE_API_SERVICE}/json?location=${lontitude,latitude}&${radius}&type=${typeSearch}&key=${GOOGLE_API_KEY}`)
            fetch(proxyurl+"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=AIzaSyAuvzzlAIwAnDg5XlJalg1tOa-pQs-tkPI")
            .then(response => response.json())
            .then(
                data=>{

                    
                    setPlacesList(data.results.map( (item)=>{
                        return {
                            ...item,
                        }
                    }));
                }
            )
            .catch(  (e)=>{
                console.log(e);
                    // console.log(`${GOOGLEMAP_BASE_URL}/${GOOGLE_API_SERVICE}/json?location=${lontitude,latitude}&${radius}&type=${typeSearch}&key=${GOOGLE_API_KEY}`);
                });
        

    return (
        <div className="places-container">
            <Title level={5}>Nearby Places </Title>  
            <p>Here are the result. </p>
            <PlacesList placesList={placesList} onc/>
        </div>
    )



}

export default PlacesNearby;