import React from 'react';
import { Row, Col, Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns';
function LocationItem({ location, onDelete }) {
    const { name, rating, user_ratings_total, formatted_address, photo_reference, place_id } = location;
    const photoAPI = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;
    return (
        // <div style={{height: 100}}>
        <Col>
            <Row>
            <small><b>{name}</b></small>
            </Row>
            <Row>
            <small>Rating: {rating} ({user_ratings_total})</small>
            </Row>
            {/* <Row>
                <img src={photoAPI} height={50} width={50} />
            </Row> */}
            <Row>
            <small>{formatted_address.slice(0, -15)} <a href={`https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${place_id}`} target="_blank">(details)</a> </small>
            </Row>

            <Row>
                <Col offset={20}>
                    <Button style={{float: 'right'}} size="small" shape="circle" icon={<MinusOutlined />} onClick={onDelete} />
                </Col>
                
            </Row>
        </Col>
        // </div>
    );
}

export default LocationItem;


//TODO: 4. api
