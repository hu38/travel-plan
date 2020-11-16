package com.travelPlanner.travel.model.TextSearchGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Geometry;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Result {
    @JsonProperty("business_status")
    public String businessStatus;

    @JsonProperty("formatted_address")
    public String formattedAddress;

    @JsonProperty("geometry")
    public Geometry geometry;

    @JsonProperty("name")
    public String name;

    @JsonProperty("photos")
    public Photo[] photos;

    @JsonProperty("place_id")
    public String placeID;

    @JsonProperty("rating")
    public float rating;

    @JsonProperty("user_ratings_total")
    public int userRatingsTotal;

}
