package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Route {
    public OverviewPolyline overview_polyline;
    public Leg[] legs;
}
