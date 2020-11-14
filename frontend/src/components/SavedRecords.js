import React, { useState } from "react";
import { Modal, Button } from 'antd';
import { Checkbox, Row, Col } from 'antd';
import { render } from "@testing-library/react";

const SavedRecords = (props) => {
    const [visible, setVisible] = useState(false);

    const showModel = () => {
      setVisible(true);
    }

    const handleOk = () => {
      setVisible(false);  
    }
    
    const handleCancel = () => {
      console.log("cancel");
      setVisible(false);
       
    }
    function onChange(checkedValues) {
        console.log('checked = ', checkedValues);
      }

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
                <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                    <Row>
                        <Col span={24}>
                            <Checkbox value="A">10/1 Plan</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="B">10/6 Plan</Checkbox>
                        </Col>
                        <Col span={24}>
                            <Checkbox value="C">11/17 Plan</Checkbox>
                        </Col>
                    </Row>
                </Checkbox.Group>,
            </Modal>
          </>
        );
}
export default SavedRecords;

