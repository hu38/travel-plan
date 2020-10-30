package com.travelPlanner.travel.model.AttractionsGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Attraction {
    public String name;

    @JsonProperty("formatted_address")
    public String address;

    @JsonProperty("place_id")
    public String placeID;

    public float rating;

}
