import React from "react";
import Title from "antd/lib/typography/Title"; 
import {List, Card, Checkbox} from "antd";  //Carousel: 4 Images

import {Button} from "antd"


const PlaceList=(props)=> {
 
    const clickMe =()=>{
        props.findPlaceOnclick();
    }

    return(
        <>
        <Button type="primary" onClick={clickMe} >
            User Done Input
        </Button>

        <div className="placelist-container">
            <Title level={5}>PlaceList ({props.placeList? props.placeList.length:0})</Title> 
            <hr/>
            <List
                className="placelist"
                itemLayout="horizontal"
                dataSource={props.placeList}
                renderItem={ item=>(
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item.name}</p>}/>
                        {/* <Card 
                        hoverable style={{height:150}} 
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                        </Card> */}
                        <Checkbox></Checkbox>
                    </List.Item>
                )}
            />
        </div>
        </>
    )

}

export default PlaceList;