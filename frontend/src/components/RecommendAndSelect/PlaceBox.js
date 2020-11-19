import { Checkbox } from "antd";
import React, {useState} from "react";
import {Image} from "antd";

// Carousel 4 pics in a row

/***  Place Single Box ***/
// [Name + Picture]


// const photo_reference = "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU";

const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference";
const apikey = "key=AIzaSyAuvzzlAIwAnDg5XlJalg1tOa-pQs-tkPI";


const PlaceBox =({name, photo_reference}) =>
{
    
    const imageUrl = `${url}=${photo_reference}&${apikey}`;
    // console.log(imageUrl);


    // "https://maps.googleapis.com/maps/api/place/photo?maxwidth=%d&photoreference=%s&key=%s";

    // const [photoUrl,setPhotoUrl] = useState(undefined); 

    // const getPhoto=(photo_reference) =>{

    //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     // fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photo_reference}&key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns`).then(res=>res.json()).then(
    //     // const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photo_reference+"&key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns";
    //     //fetch(proxyurl+hardcoded)


    //     const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference";
    //     const key= "key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns";

    //     // console.log(`${proxyurl}${url}=${photo_reference}&${key}`);

    //     fetch(`${url}=${photo_reference}&${key}`
    //     // ,{
    //     //     method: 'GET',
    //     //     headers: {
    //     //         'Accept': 'application/json',
    //     //         'Content-Type': 'application/json'
    //     //     },
    //     // }
    //     )
    //     .then(res=>res.json())
    //     .then(
    //     data=>{
    //         console.log(data);
    //           {
    //             setPhotoUrl(data);
    //           }
    //         }
    //       )
    // }

    // getPhoto(photo_reference);



    return (
        <>
        <div className="placebox-container">
            <span> {name} </span>
            {/* <Image src= {photoUrl=>{  setPhotoUrl()}} alt={props.name} style={{width:"40%" }}/> */}
            <Image src={imageUrl} height={"100px"} width={"100px"}/>
        </div>
        </>
    )
    
}


export default PlaceBox;
