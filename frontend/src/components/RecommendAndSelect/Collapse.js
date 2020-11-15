import React, { useState }  from "react";
import { List, Typography, Drawer, Button, Collapse, Tag  } from 'antd';
import PlaceBox from "./PlaceBox";
import Title from "antd/lib/typography/Title";
import {Checkbox, Avatar } from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import "../../styles/Collapse.css"

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

const Collapsible = ({  
    recomendAttractionList,
    updateRecomendCityList,
    loading, 
}) => {  
        const onSelectionChange = (checked, targetAttraction) => {
            // To Do
        }
    
     

    // console.log("collape list");
    // console.log(recomendCityList);

    return (
    <>
    <Collapse className = "AttractionList" defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Tourists Nearby Recommendation List" key="1" className="collapse-panel">
        <div className="scroller">      
            <Title level={5}>Nearby Attractions ({recomendAttractionList ? recomendAttractionList.length : 0})</Title>
            <p>Select the attractions you wanna visit on the map at the right side</p>
            <hr/>
                <List 
                    className="recom-list"
                    itemLayout="horizontal"
                    dataSource={recomendAttractionList}
                    loading={loading} // 
                    renderItem={ item => (
                        <List.Item actions={[<Checkbox onChange={(e) => onSelectionChange(e.target.checked, item)} checked={item.selected} />]}>   
                        {/* <List.Item actions={[]}>  */}
                            <PlaceBox   photo_reference={item.photo_reference}/>             
                            <List.Item.Meta
                            
                            // {/* avatar = {<Avatar src={item.photo_reference} size="large" alt="satellite"/>} */}
                            title={<p>{item.name}</p>}
                            description={`Description: ${item.description}`}
                            // distance={`distance: ${item.distance}`}
                            />
                        </List.Item>
                    )}
                />     
        </div>      
        
        </Panel>
        <Panel header="Selected List" key="2" className="collapse-panel">
            {/* <p>
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
            </p>  */}
        </Panel>
    </Collapse>
    
    </>
    )
}

export default Collapsible;
