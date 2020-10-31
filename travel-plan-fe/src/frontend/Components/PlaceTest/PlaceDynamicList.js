import React, {useState} from "react";
import Title from "antd/lib/typography/Title"
import PlaceSearchBar from "../component/PlaceSearchBar";
import {List} from "antd";


const PlaceDynamicList = (props) =>
{


    return (
     

        <div className="placesDynmicList-container">
            <Title level={5}> PlaceList Each-By-Each ({props.placesArray? props.placesArray.length:0})</Title> 
            <hr/>
            <List
                className="placelist"
                itemLayout="horizontal"
                dataSource={props.placesArray}
                renderItem={ item=>(
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item}</p>}/>

                        {/*   Card or Carousel 4 pictures in a roll
                        <Image 
                        hoverable style={{height:150}} 
                        cover={<img alt="example" src="https://cdn140.picsart.com/315343367190201.jpg?type=webp&to=crop&r=256" />}
                        > */}
                        {/* <Checkbox></Checkbox> */}
                    </List.Item>
                )}
            />
        </div>
    )
    





}




export default PlaceDynamicList;