package com.travelPlanner.travel.model.FindPlaceGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.TextSearchGoogleAPIResponse.Photo;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Geometry;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FindPlaceCandidate {
    public String business_status;

    @JsonProperty("formatted_address")
    public String formattedAddress;

    public Geometry geometry;

    public String name;

    public Photo[] photos;

    @JsonProperty("place_id")
    public String placeID;

    public float rating;

    public int user_ratings_total;
}
