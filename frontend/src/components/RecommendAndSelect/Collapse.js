import React, { useState }  from "react";
import { List, Typography, Drawer, Button, Collapse, Tag  } from 'antd';

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

const Collapsible = () => {
    return (
<>
    <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="Selected List" key="1" className="collapse-panel">
            <List
                header={<div></div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    </List.Item>
                )}
            />    
        </Panel>
        <Panel header="Recommendation List" key="2" className="collapse-panel">
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