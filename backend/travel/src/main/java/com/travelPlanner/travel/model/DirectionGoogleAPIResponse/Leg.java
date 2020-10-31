package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Leg {
    public Distance distance;
    public Duration duration;
}
