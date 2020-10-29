import React from "react";
import Title from "antd/lib/typography/Title"; 
import {List, Card, Checkbox} from "antd";  //Carousel: 4 Images

import {Button} from "antd"
export const GOOGLE_PHOTO_BASEURL = "https://maps.googleapis.com/maps/api/place/photo?photoreference=";



const PlaceList= (props)=>{
 
    const click= ()=>{
        props.clicksss();
    }

    return(
        <>
        <Button type="primary" onClick={click} >
            User Done Input
        </Button>

        <div className="placelist-container">
            <Title level={5}>PlaceList ({props.placesList? props.placesList.length:0})</Title> 
            <hr/>
            <List
                className="placelist"
                itemLayout="horizontal"
                dataSource={props.placesList}
                renderItem={ item=>(
                    <List.Item>
                        <List.Item.Meta
                            title={<p>{item.name}</p>}/>
                        <Card size={10}
                        hoverable style={{height:"10",width:"10"}} 
                        // hardcode : to be changed to item.photos.photoreference ORRR  items.photos[0].photoreference
                        cover={<img alt="example" src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=AIzaSyAuvzzlAIwAnDg5XlJalg1tOa-pQs-tkPI" />}
                        >
                        </Card>
                    </List.Item>
                )}
            />
        </div>
        </>
    )

}

export default PlaceList;


//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key=YOUR_API_KEY

// actions={ [<Checkbox onChange={ (e)=> onSelectionChange(e.target.checked, item)} checked={item.selected} disabled={disabled} />]}>
