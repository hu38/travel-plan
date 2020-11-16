package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
    @JsonProperty("legs")
    public Leg[] legs;

    @JsonProperty("overview_polyline")
    public OverviewPolyline overviewPolyline;

    @JsonProperty("waypoint_order")
    public int[] wayPointOrder;
}
