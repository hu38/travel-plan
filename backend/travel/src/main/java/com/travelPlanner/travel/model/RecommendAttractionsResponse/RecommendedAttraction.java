package com.travelPlanner.travel.model.RecommendAttractionsResponse;

import com.travelPlanner.travel.model.CityGoogleAPIResponse.Coordinate;

public class RecommendedAttraction {
    public String business_status;
    public String formatted_address;
    public Coordinate location;
    public String name;
    public String[] opening_hours;
    public String photo_reference;
    public String place_id;
    public float rating;
    public int user_ratings_total;
}
