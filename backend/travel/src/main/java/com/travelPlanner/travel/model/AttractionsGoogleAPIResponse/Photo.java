package com.travelPlanner.travel.model.AttractionsGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Photo {
    @JsonProperty("photo_reference")
    public String photoReference;
    public int width;
}
