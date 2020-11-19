import React, { useState } from "react";
import { Modal, Button } from 'antd';
import { Checkbox, Row, Col, Select } from 'antd';


const SavedRecords = (props) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState()

    const { Option } = Select;

    const showModel = () => {
        props.loadAllPlans();
        setVisible(true);
    }

    const handleOk = () => {
        props.findCityLocation();
        setVisible(false);  
        setSelected("Please choose a plan");
    }
    
    const handleCancel = () => {
      console.log("cancel");
      setVisible(false);
       
    }

    const handleChange = (value) => {
        var n = value.indexOf('_');
        var city = value.substring(0, n);
        props.setCityText(city);
        setSelected(value);
    }

    const Options = [];
    if(props.records !== undefined) {   //more than 1 place is chosen
        props.records.map(rec =>
            Options.push(<Option value={rec.cityName + "_" + rec.id}>{rec.planName}</Option>)
        )
    }

    

    // function onChange(checkedValues) {
    //     console.log('checked = ', checkedValues);
    //   }

        return (
          <>
            <Button type="link" className='Records' onClick={showModel}>Records</Button>
            <Modal
              title="Please select your saved plan"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="submit" onClick={handleOk}>
                  Go
                </Button>,
              ]}
            >
                
                <Select defaultValue="Please choose a plan" style={{ width: 300 }} onChange={handleChange} value={selected} >
                    {Options}
                </Select>

            </Modal>
          </>
        );
}
export default SavedRecords;