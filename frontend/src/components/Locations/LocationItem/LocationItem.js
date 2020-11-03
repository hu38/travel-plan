import React from 'react';
import { Row, Col, Button } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNJpRDz7c_p0kP3YzS0iRonyWoWKdU5ns';
function LocationItem({ location, onDelete }) {
    const { name, rating, user_ratings_total, formatted_address, photo_reference, place_id } = location;
    const photoAPI = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${photo_reference}&key=${GOOGLE_MAPS_API_KEY}`;

    return (
        <Col>
            <Row>
                <b>{name}</b>
            </Row>
            <Row>
                Rating: {rating} ({user_ratings_total})
            </Row>
            <Row>
                <img src={photoAPI} height={100} width={150} />
            </Row>
            <Row>
                <a href={`https://www.google.com/maps/search/?api=1&query=${name}&query_place_id=${place_id}`} target="_blank">{formatted_address}</a>
            </Row>

            <Row>
                <Col offset={20}>
                    <Button style={{float: 'right'}} size="small" shape="circle" icon={<MinusOutlined />} onClick={onDelete} />
                </Col>
                
            </Row>
        </Col>
    );
}

export default LocationItem;


//TODO: 4. api
