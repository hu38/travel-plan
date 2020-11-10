package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Routes {
    public OverviewPolyline overview_polyline;
}
