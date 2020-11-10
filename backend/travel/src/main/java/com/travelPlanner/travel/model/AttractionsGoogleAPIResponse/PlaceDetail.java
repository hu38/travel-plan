package com.travelPlanner.travel.model.AttractionsGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceDetail {
    @JsonProperty("opening_hours")
    public OpenHours openingHours;

}
