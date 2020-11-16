package com.travelPlanner.travel.model.PlaceDetailGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.AttractionsGoogleAPIResponse.Photo;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Geometry;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PlaceDetailGoogleAPIResponse {
    public PlaceDetailGoogleAPIResponseResult result;
}
