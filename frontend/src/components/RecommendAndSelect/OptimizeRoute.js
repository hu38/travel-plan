import React, { useState }  from "react";
import { Modal, Select, Button, message  } from 'antd';


const OptimizeRoute = (props) => {
  const [visible, setVisible] = useState(false);
  const [start, setStart] = useState(undefined);
  const [end, setEnd] = useState(undefined);

  const { Option } = Select;

  const handleChangeStart = (value) => {
    console.log(`selected start ${value}`);
    setStart(value);
  }

  const handleChangeEnd = (value) => {
    console.log(`selected end ${value}`);
    setEnd(value);
  }

  const showModal = () => {
    setVisible(true);
  }

  const handleOk = () => {
    if (start !== undefined && end !== undefined) {
        var placeID = "";
        let startID;
        let endID;
        test.forEach(createString);
        function createString(value) {
            if (value.name == start) {
                startID = value.place_id;
            }
            if (value.name == end) {
                endID = value.place_id;
            }
            else {
                placeID = placeID + value.place_id + " ";
            }
        }
        placeID = startID + " " + placeID + endID;
        // console.log(placeID);
        props.setPlaceID(placeID);
        props.findOptimizeRoutes();
        setVisible(false);
    }
    else {
        message.warning('Please select your start and end');
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const dropDownList = [];
  const Options = [];
//   if (recomendCityList !== undefined) {
//       recomendCityList.map(place => dropDownList.push(place.name))
//   }
  const test = [
      { "place_id": "ChIJTWE_0BtawokRVJNGH5RS448",  "name": "One World Observatory"},
      { "place_id": "ChIJK3vOQyNawokRXEa9errdJiU", "name": "Brooklyn Bridge"},
      { "place_id": "ChIJAaIFAxdawokR8txc3YPbD3A", "name": "Federal Hall"},
      { "place_id": "ChIJBxw9mhhawokRJzY2jnlYsZM",  "name": "City Hall Park"}
  ]
  test.map(pos => dropDownList.push(pos.name));

//   const dropDownListStrigify = [JSON.stringify(dropDownList)];
//    const dropDownListStrigify = ["One World Observatory","Brooklyn Bridge","Brookfield Place","Federal Hall","One World Trade Center","City Hall Park","National Parks of New York","The Battery","Statue of Liberty National Monument","Castle Clinton National Monument","Silverstein Family Park","South Street Seaport Museum","Statue of Liberty View Point","Empire State Building","Zuccotti Park","Federal Reserve Bank of New York","Governors Island National Monument","New York City Hall","9/11 Memorial & Museum","Trinity Church"];
//   console.log("drop down list ready " + dropDownListStrigify);
//   console.log("drop down list size " + dropDownListStrigify.length);
//   if(dropDownListStrigify.length > 1) {   //more than 1 place is chosen
//     dropDownListStrigify.map(opt =>
//         Options.push(<Option key={opt}>{opt}</Option>)
//     )
//     console.log("Options ready")
//   }

//   console.log(typeof dropDownListStrigify);
//   console.log("drop down list ready " + Object.values(dropDownList));
//   console.log("dropDownList.length: " + dropDownList.length);
//   console.log("dropDownListStrigify.length: " + dropDownListStrigify.length);
//   console.log("dropDownList: " + dropDownList);
//   console.log("dropDownListStrigify: " + dropDownListStrigify);
//   console.log("compare: " + dropDownList === dropDownListStrigify);
  if(dropDownList.length > 1) {   //more than 1 place is chosen
    dropDownList.map(opt =>
        Options.push(<Option key={opt}>{opt}</Option>)
    )
    console.log("Options ready")
  }

    return (
      <>
        <Button type="primary" onClick={showModal}>
          Optimize Route
        </Button>
        <Modal
          title="Pick Your Start and End:"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
                <span>Start: </span>
                <Select defaultValue="" style={{ width: 280 }} onChange={handleChangeStart}>
                    {Options}
                </Select>
          </p>
          <p>
                <span>End: </span>
                <Select defaultValue="" style={{ width: 280 }} onChange={handleChangeEnd}>
                    {Options}
                </Select>
            </p>

        </Modal>
      </>
    );
}

export default OptimizeRoute;