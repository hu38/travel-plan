import React, {useState} from "react";
import {Input, Form, Button} from "antd";
import Title from "antd/lib/typography/Title";
import PlaceDynamicList from "../components/PlaceDynamicList";

const PlaceSearchBar=()=>
{

    const [placeCoord, setPlaceCoord] = useState([]);
    const [userInputPlace,setUserInputPlace] =  useState("");
    
    // for child PlacesDyanmicList
    const [placesArray,setPlacesArray] = useState([]); //array  

    // 1. name ARRAY  2. { name {lon,lat}}

    // const userInputPlace = useRef(null); ? Uncontrolled Component
    

    const onChangeHandler = (event) => { 
        // console.log(event.target.value);
        setUserInputPlace(event.target.value);  //h //hou ... click houston  
     };  

    // uncontrolled_component_Form 
    // const onChangeHandler = () => { 
    //     alert(userInputPlace.current.value);
    //     // console.log(userInputPlace);

    //   };    

    //cross-domain access: 
    //Different ports
    //react access port :http://127.0.0.1:3000,spring sever http://127.0.0.1:8080

     const handlerOnclick =()=>{
        // console.log(`use input: ${userInputPlace}`)
        setPlacesArray( currentArray =>[...currentArray, userInputPlace]);
        // console.log(`After: ${placesArray}`);
     }


     //polylin


    const onFormFinish = ()=>{

        // const proxyurl = "https://cors-anywhere.herokuapp.com/";

        // fetch("api/place/find-city?city=boston").then(res=>res.json()).then(  

            fetch("api/place/find-city?city=boston").then(res=>res.json()).then( 

            data=>{
                // console.log(data.body.location);

                }
            )
        
    };


    return (

   
        <div className="searchbar-container">
            <Title level={5}> Place Search Bar </Title>
            <Form  onFinish={onFormFinish} >
            <Form.Item
                rules={[{ 
                required: true,
                message: 'Please enter a valid City Name!',
                }]}
            >
                <Input placeholder="City Name" value={userInputPlace} onChange={onChangeHandler} />
            </Form.Item>

            <Form.Item >
            <Button type="primary" htmlType="submit" onClick={handlerOnclick} >
                Find A City
            </Button>
            </Form.Item>
        </Form>      
           
        <PlaceDynamicList placesArray={placesArray} /> 
    </div>
    )
    


}

export default PlaceSearchBar;
 //  onFinish={onFormFinish}

 /*
 fetch(`api/place/find-city?city=${userInputPlace}`).then(res=>res.json()).then(
            data=>{
                // console.log(data.body.location);
                setPlacesArray(
                    
                    data.body.map((satellite)  =>{
                    return { 
                    ...satellite,
                    selected: false,
                }
                }));
               
            }
        )
    */