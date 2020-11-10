package com.travelPlanner.travel.model.AttractionsGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceDetailResponse {
    public String status;
    public PlaceDetail result;
}
