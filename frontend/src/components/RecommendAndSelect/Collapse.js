import React, { useState }  from "react";
import { List, Typography, Drawer, Button, Collapse, Tag  } from 'antd';
import PlaceBox from "./PlaceBox";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

//tag
function log(e) {
    console.log(e);
  }
  
function preventDefault(e) {
e.preventDefault();
console.log('Clicked! But prevent default.');
}
//tag

//collapse
const {Panel} = Collapse;

function callback(key) {
    console.log(key);
}
//collapse


// 1. onload More ... ?  Ant Design

const Collapsible = ({recomendCityList}) => {


    // console.log("collape list");
    // console.log(recomendCityList);


    return (
    <>
    <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Tourists Nearby Recommendation List" key="1" className="collapse-panel">
            <List
                header={<div></div>}
                // footer={<div>Footer</div>}
                bordered
                dataSource={recomendCityList}
                renderItem={item => (
                    <List.Item>
                        {/* <span> {item.name} </span> */}
                        <PlaceBox name={item.name}  />   
                        {/* photo_reference={item.photo_reference} */}
                        {/* <List.Item.Meta
                            title={<p>{item.name}</p>}/> */}
                    </List.Item>
                )}
            />    
        </Panel>
        <Panel header="Selected List" key="2" className="collapse-panel">
            <p>
                <Tag closable onClose={log}>San Francisco MOMA</Tag>
            </p>
            <p>
                <Tag closable onClose={log}>Pier 39</Tag>
            </p>
            <p>
                <Tag closable onClose={log}>SF Cable Car Museum</Tag>
            </p>
            <p>
                <Tag closable onClose={log}>SF Ferry Building</Tag>
            </p>
        </Panel>
    </Collapse>
    
    </>
    )
}

export default Collapsible;