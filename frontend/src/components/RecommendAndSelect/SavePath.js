import React, { useState }  from "react";
import { Modal, Button, Input } from 'antd';

const SavePath = ({cityText, encodedRoute, savePlan, setOptions}) => {
    let today = new Date().toDateString().replace(/\s/g , "-");
    let seconds = Math.floor(Date.now() / 1000);
    let planID = seconds;
    let planName = "My-" + cityText + "-plan-" + today;
    console.log("today " + planName);
    const planInfo = {
        "plan_id": planID,
        "planName": planName,
        "cityName": cityText,
        "placesListString": encodedRoute
    };
    console.log("today " + JSON.stringify(planInfo));
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin', 
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planInfo)
    }
    setOptions(requestOptions);

    return (
      <>
        <Button type="primary" onClick={savePlan}>
            Save Path
        </Button>
      </>
    );

}

export default SavePath;