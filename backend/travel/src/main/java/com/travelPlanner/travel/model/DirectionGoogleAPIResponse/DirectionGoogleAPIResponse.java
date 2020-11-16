package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)    // ignore unnecessary fields
@JsonInclude(JsonInclude.Include.NON_NULL)     // skip null values
public class DirectionGoogleAPIResponse {
    @JsonProperty("geocoded_waypoints")
    public GeocodedWaypoint[] geocodedWaypoints;

    @JsonProperty("routes")
    public Route[] routes;

    @JsonProperty("status")
    public String status;
}
