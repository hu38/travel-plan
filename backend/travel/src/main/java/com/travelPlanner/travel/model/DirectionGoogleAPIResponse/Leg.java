package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Leg {
    @JsonProperty("distance")
    public Distance distance;

    @JsonProperty("duration")
    public Duration duration;
}
