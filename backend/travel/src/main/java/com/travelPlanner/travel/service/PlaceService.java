package com.travelPlanner.travel.service;

import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.helper.HTTPRequest;
import com.travelPlanner.travel.model.AttractionsGoogleAPIResponse.*;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.CityGoogleAPIResponse;
import com.travelPlanner.travel.model.CityResponse;

import com.travelPlanner.travel.model.RecommendAttractionsResponse.RecommendedAttraction;
import com.travelPlanner.travel.model.RecommendAttractionsResponse.RecommendedAttractionResponseBody;
import com.travelPlanner.travel.model.RecommendedAttractionsResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


import java.io.UnsupportedEncodingException;

import java.net.URLEncoder;


@Service
public class PlaceService {
    @Autowired
    HTTPRequest requestHelper;
    private static final String GET_CITY_LOCATION_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%s&inputtype=textquery&key=%s&fields=geometry";

    private static final String GET_RECOMMENDED_ATTRACTIONS_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s+point+of+interest&location=%.2f,%.2f&radius=500&key=%s";

    private static final String GET_PLACE_DETAIL_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&fields=business_status,opening_hours&key=%s";


    private final String CLOSED = "closed";
    private final String PAGE_TOKEN_QUERY = "&pagetoken=";

    public CityResponse getCityLocation(String city) throws UnsupportedEncodingException {
        CityResponse cityResponse = new CityResponse();
        city = encode(city);
        String url = String.format(GET_CITY_LOCATION_URL_TEMPLATE,city, Constants.GOOGLE_API_KEY);
        CityGoogleAPIResponse response = requestHelper.makeRequest(CityGoogleAPIResponse.class,url,new CityGoogleAPIResponse());
        if (response!=null){
            cityResponse.body = response.candidates[0].geometry;
            cityResponse.statusCode = HttpStatus.OK.value();
        }
        return cityResponse;
    }

    public RecommendedAttractionsResponse getRecommendedAttractions(String city,String next_page_token) throws UnsupportedEncodingException {
        RecommendedAttractionsResponse recommendedAttractionsResponse = new RecommendedAttractionsResponse();
        AttractionsGoogleAPIResponse attractionsResponse = getGoogleRecommendedAttractions(city,next_page_token);
        if (attractionsResponse == null){
            recommendedAttractionsResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
            return recommendedAttractionsResponse;
        }

        RecommendedAttractionResponseBody body = new RecommendedAttractionResponseBody();
        body.next_page_token = attractionsResponse.nextPageToken;

        Attraction[] attractions = attractionsResponse.results;
        RecommendedAttraction[] recommendedAttractions = new RecommendedAttraction[attractions.length];
        for (int i = 0; i < attractions.length; i++){
            Attraction attraction = attractions[i];

            RecommendedAttraction recommendedAttraction = new RecommendedAttraction();
            recommendedAttraction.business_status = attraction.business_status;
            recommendedAttraction.formatted_address = attraction.formattedAddress;
            recommendedAttraction.location = attraction.geometry.location;
            recommendedAttraction.name = attraction.name;
            recommendedAttraction.place_id = attraction.placeID;
            recommendedAttraction.rating = attraction.rating;
            recommendedAttraction.user_ratings_total = attraction.user_ratings_total;

            if (attraction.photos!=null && attraction.photos.length > 0){
                recommendedAttraction.photo_reference = attraction.photos[0].photoReference;
            }
            recommendedAttraction.opening_hours = getOpenHours(attraction.placeID);

            recommendedAttractions[i] = recommendedAttraction;
        }
        body.results = recommendedAttractions;
        recommendedAttractionsResponse.body = body;
        recommendedAttractionsResponse.statusCode = HttpStatus.OK.value();
        return recommendedAttractionsResponse;
    }

    public String[] getOpenHours(String placeID) throws UnsupportedEncodingException {
        placeID = encode(placeID);
        String url = String.format(GET_PLACE_DETAIL_URL_TEMPLATE,placeID,Constants.GOOGLE_API_KEY);
        PlaceDetailResponse response = requestHelper.makeRequest(PlaceDetailResponse.class,url,new PlaceDetailResponse());
        if (response!=null && response.status.equals("OK")){
            if (response.result.openingHours == null){
                OpenHours openHours = new OpenHours();
                openHours.weekdayText = new String[]{CLOSED};
                response.result.openingHours = openHours;
            }
            return response.result.openingHours.weekdayText;
        }
        return new String[]{placeID,"Place detail request wasn't OK."};
    }

    private AttractionsGoogleAPIResponse getGoogleRecommendedAttractions(String city,String next_page_token) throws UnsupportedEncodingException {
        CityResponse cityResponse = getCityLocation(city);
        double lat = cityResponse.body.location.lat;
        double lng = cityResponse.body.location.lng;
        city = encode(city);
        String url = String.format(GET_RECOMMENDED_ATTRACTIONS_URL_TEMPLATE,city,lat,lng,Constants.GOOGLE_API_KEY);
        if (next_page_token!=null){
            next_page_token = encode(next_page_token);
            url += PAGE_TOKEN_QUERY+next_page_token;
        }
        return requestHelper.makeRequest(AttractionsGoogleAPIResponse.class,url,new AttractionsGoogleAPIResponse());
    }

    private String encode(String param) throws UnsupportedEncodingException {
        return URLEncoder.encode(param,"UTF-8");
    }

}
