package com.travelPlanner.travel.model.AttractionsGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttractionsGoogleAPIResponse {

    @JsonProperty("next_page_token")
    public String nextPageToken;

    public Attraction[] results;

}
