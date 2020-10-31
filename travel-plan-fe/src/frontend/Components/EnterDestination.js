import React, { useState } from "react";
import { Modal} from 'antd';
import { Select, Button } from 'antd';

const EnterDestination = (
    visible
) => {
    var ModalText;

    const { Option } = Select;
  
    const handleOk = () => {
      console.log(ModalText);
      console.log(visible);
    };
  
    const handleCancel = () => {
      console.log("Cancel");
    };

    const handleChange = (value) => {
        ModalText = value;
    };

  
      return (
        <>
          <Modal
            title="Choose your city"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="submit" onClick={handleOk}>
                  Go
                </Button>,
              ]}
          >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Destination"
                onChange={handleChange}
            >
                <Option value="New York">New York</Option>
                <Option value="Boston">Boston</Option>
                <Option value="Dallas">Dallas</Option>
            </Select>
          </Modal>
        </>
      );
    }
  
  export default EnterDestination;