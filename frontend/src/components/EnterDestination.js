import React, { useState } from "react";
import { Modal} from 'antd';
import { Select, Button } from 'antd';


const EnterDestination = (props) => {
    
  const [visible, setVisible] = useState(true);



    // lifted State
    /* lift to <Main />
    const [cityResult, setcityResult]= useState(undefined);  // undefined
    const [ModalText, setModalText] = useState("Boston"); //  ie.  const [cityText,   setCityText]= useState("Boston"); // lifted from EnterDestination


    */

    // destinaion Result in { } object format. 
    // http://localhost:8080/api/place/find-city?city=losangelos
    /* "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
              "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}}*/



    const { Option } = Select;

    // test
    // const useEffect{}  // side effect after done
    
    const handleOk = () => {
  
      props.findCityLocation(); 
      props.findRecommendCityList();
      setVisible(false);

    };
  
    const handleCancel = () => {
      console.log("Cancel");
      setVisible(false);
    };

    const handleChange = (value) => {
      props.setCityText(value);
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