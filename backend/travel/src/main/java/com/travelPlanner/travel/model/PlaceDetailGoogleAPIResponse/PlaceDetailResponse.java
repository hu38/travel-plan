package com.travelPlanner.travel.model.PlaceDetailGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceDetailResponse {
    @JsonProperty("status")
    public String status;

    @JsonProperty("result")
    public PlaceDetailResult result;
}
