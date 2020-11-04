import { Checkbox } from "antd";
import React, {useState} from "react";
import {Image} from "antd";

// Carousel 4 pics in a row

/***  Place Single Box ***/
// [Name + Picture]


// const photo_reference = "CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU";

const PlaceBox =(props) =>
{

    // "https://maps.googleapis.com/maps/api/place/photo?maxwidth=%d&photoreference=%s&key=%s";

    // const [photoUrl,setPhotoUrl] = useState(undefined); 

    // const getPhoto=() =>{

    //     const proxyurl = "https://cors-anywhere.herokuapp.com/";
    //     // fetch(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${props.photo_reference}&key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns`).then(res=>res.json()).then(
    //     // const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+photo_reference+"&key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns";
        

    //     const hardcoded="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns"
    //     const url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference"
    //     const key= "key=AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns";

    //     // fetch(`${proxyurl}${url}=${photo_reference}&${key}`)
    //     fetch(proxyurl+hardcoded)
    //     .then(res=>res.json()).then(
    //     data=>{
    //           {
    //             setPhotoUrl(data);
    //           }
    //         }
    //       )
    // }



    return (
        <>
        <div className="placebox-container">
            <span>{props.name} </span>
            {/* <Image src= {photoUrl=>{  setPhotoUrl()}} alt={props.name} style={{width:"40%" }}/> */}
            {/* Surprise */}
            <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvMMiC-2B5o_EEi-MM8Rv2WRsqLRDe9-YjrA&usqp=CAU" height={"80px"} width={"80px"}/>
        </div>
        </>
    )
    
}


export default PlaceBox;