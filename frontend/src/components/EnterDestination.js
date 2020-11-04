import React, { useState } from "react";
import { Modal} from 'antd';
import { Select, Button, message } from 'antd';


const EnterDestination = (props) => {
    
  const [visible, setVisible] = useState(true);
  const [options, setOptions] = useState([]);

    // lifted State
    /* lift to <Main />
    const [cityResult, setcityResult]= useState(undefined);  // undefined
    const [ModalText, setModalText] = useState("Boston"); //  ie.  const [cityText,   setCityText]= useState("Boston"); // lifted from EnterDestination


    */

    // destinaion Result in { } object format. 
    // http://localhost:8080/api/place/find-city?city=losangelos
    /* "body":{"location":{"lat":34.0522342,"lng":-118.2436849},
              "viewport":{"northeast":{"lat":34.3373061,"lng":-118.1552891},"southwest":{"lat":33.7036519,"lng":-118.6681759}}*/

    // test
    // const useEffect{}  // side effect after done
    
    const handleOk = () => {
      props.findCityLocation(); 
      props.findRecommendCityList();
      setVisible(false);

    };
  
    const handleCancel = () => {
      message.warning('Please enter a city and press Go button');
    };

    const onSearch = (searchText) => {
      setOptions(
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
      );
      if(options.indexOf(searchText,0)!= -1){
        props.setCityText(searchText);
      }
    };

    const handleChange = (data) => {
      props.setCityText(data);
    };

    const mockVal = (str, repeat = 1) => {
      return {
        value: str.repeat(repeat),
      };
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
                options={options}
                style={{ width: 200 }}
                placeholder="e.g.Boston"
                onChange={handleChange}
                onSearch={onSearch}
                filterOption={false}
            >
            </Select>
          </Modal>
          
        </>
      );
    }
  
  export default EnterDestination;