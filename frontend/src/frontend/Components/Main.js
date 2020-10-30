import React from "react";
import {Col, Row} from "antd";

import EnterDestination from "./EnterDestination";
import Locations from "./RecommendAndSelect/Locations";
import MapView from "./MapView";
import SearchAndAdd from "./SearchAndAdd";

const Main = () => {

    return (
        <Row>
          <Col>
              <Locations/>
          </Col>

          <Col>
              <MapView/>
          </Col>
        </Row>
    )
}

export default Main;