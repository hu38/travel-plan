package com.travelPlanner.travel.model.RecommendedPlacesResponseBody;

import com.travelPlanner.travel.model.CityGoogleAPIResponse.Coordinate;

public class RecommendedPlace {
    public String business_status;
    public String formatted_address;
    public Coordinate location;
    public String name;
    public String photo_reference;
    public String place_id;
    public float rating;
    public int user_ratings_total;
}
