package com.travelPlanner.travel.model.PlanResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Coordinate;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Geometry;

import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttractionSave {
    @JsonProperty("business_status")
    public String business_status; // e.g. "OPERATIONAL"

    @JsonProperty("formatted_address")
    public String formattedAddress;

    // public Geometry geometry;
    @JsonProperty("location")
    public Coordinate location;

    @JsonProperty("name")
    public String name;

//    @JsonProperty("opening_hours")
//    public OpenHours openHours;

    @JsonProperty("photo_reference")
    public String photo_reference;

    @JsonProperty("place_id")
    public String placeID;

    @JsonProperty("rating")
    public float rating;

    @JsonProperty("user_ratings_total")
    public int user_ratings_total;

}
