package com.travelPlanner.travel.service;

import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.helper.HTTPRequest;
import com.travelPlanner.travel.model.PlaceDetailGoogleAPIResponse.OpenHours;
import com.travelPlanner.travel.model.PlaceDetailGoogleAPIResponse.PlaceDetailResponse;
import com.travelPlanner.travel.model.TextSearchGoogleAPIResponse.*;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.CityGoogleAPIResponse;
import com.travelPlanner.travel.model.CityResponse;

import com.travelPlanner.travel.model.FindPlaceGoogleAPIResponse.FindPlaceCandidate;
import com.travelPlanner.travel.model.FindPlaceGoogleAPIResponse.FindPlaceGoogleAPIResponse;
import com.travelPlanner.travel.model.FindPlaceResponse;
import com.travelPlanner.travel.model.FindPlaceResponseBody.PlaceInfo;
import com.travelPlanner.travel.model.RecommendedPlacesResponseBody.RecommendedPlace;
import com.travelPlanner.travel.model.RecommendedPlacesResponseBody.RecommendedPlacesResponseBody;
import com.travelPlanner.travel.model.RecommendedPlacesResponse;

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

    private static final String GET_RECOMMENDED_PLACES_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/textsearch/json?query=%s+in+%s&key=%s";

    private static final String GET_PLACE_DETAIL_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/details/json?place_id=%s&fields=business_status,opening_hours&key=%s";

    private static final String GET_PLACE_INFO_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=%s&input=%s&inputtype=textquery&fields=business_status,formatted_address,geometry,name,photos,place_id,rating,user_ratings_total";

    private final String CLOSED = "closed";
    private final String PAGE_TOKEN_QUERY = "&pagetoken=";

    public CityResponse getCityLocation(String city) throws UnsupportedEncodingException {
        CityResponse cityResponse = new CityResponse();
        city = encode(city);
        String url = String.format(GET_CITY_LOCATION_URL_TEMPLATE, city, Constants.GOOGLE_API_KEY);
        CityGoogleAPIResponse response = requestHelper.makeRequest(CityGoogleAPIResponse.class,url,new CityGoogleAPIResponse());
        if (response!=null){
            cityResponse.body = response.candidates[0].geometry;
            cityResponse.statusCode = HttpStatus.OK.value();
        }
        return cityResponse;
    }

    public RecommendedPlacesResponse getRecommendedPlaces(String type, String city, String next_page_token) throws UnsupportedEncodingException {
        RecommendedPlacesResponse recommendedPlacesResponse = new RecommendedPlacesResponse();
        type = encode(type);
        city = encode(city);
        String url = String.format(GET_RECOMMENDED_PLACES_URL_TEMPLATE, type, city, Constants.GOOGLE_API_KEY);
        if (next_page_token!=null){
            next_page_token = encode(next_page_token);
            url += PAGE_TOKEN_QUERY+next_page_token;
        }
        TextSearchGoogleAPIResponse attractionsResponse = requestHelper.makeRequest(TextSearchGoogleAPIResponse.class,url,new TextSearchGoogleAPIResponse());
        if (attractionsResponse == null){
            recommendedPlacesResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
            return recommendedPlacesResponse;
        }

        RecommendedPlacesResponseBody body = new RecommendedPlacesResponseBody();
        body.next_page_token = attractionsResponse.nextPageToken;

        Result[] results = attractionsResponse.results;
        PlaceInfo[] recommendedPlaces = new PlaceInfo[results.length];
        for (int i = 0; i < results.length; i++){
            Result result = results[i];

            PlaceInfo recommendedPlace = new PlaceInfo();
            recommendedPlace.business_status = result.businessStatus;
            recommendedPlace.formatted_address = result.formattedAddress;
            recommendedPlace.location = result.geometry.location;
            recommendedPlace.name = result.name;
            recommendedPlace.place_id = result.placeID;
            recommendedPlace.rating = result.rating;
            recommendedPlace.user_ratings_total = result.userRatingsTotal;

            if (result.photos!=null && result.photos.length > 0){
                recommendedPlace.photo_reference = result.photos[0].photoReference;
            }

            recommendedPlaces[i] = recommendedPlace;
        }
        body.results = recommendedPlaces;
        recommendedPlacesResponse.body = body;
        recommendedPlacesResponse.statusCode = HttpStatus.OK.value();
        return recommendedPlacesResponse;
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

    private String encode(String param) throws UnsupportedEncodingException {
        return URLEncoder.encode(param,"UTF-8");
    }

    public FindPlaceResponse getPlaceInfo(String address) throws UnsupportedEncodingException {
        FindPlaceResponse findPlaceResponse = new FindPlaceResponse();
        address = encode(address);
        String url = String.format(GET_PLACE_INFO_TEMPLATE, Constants.GOOGLE_API_KEY, address);

        FindPlaceGoogleAPIResponse googleAPIResponse = requestHelper.makeRequest(FindPlaceGoogleAPIResponse.class,url,new FindPlaceGoogleAPIResponse());
        FindPlaceCandidate candidate = googleAPIResponse.candidates[0];

        if (googleAPIResponse == null) {
            findPlaceResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
            return findPlaceResponse;
        }

        findPlaceResponse.statusCode = HttpStatus.OK.value();
        PlaceInfo placeInfo = new PlaceInfo();
        placeInfo.business_status = candidate.business_status;
        placeInfo.formatted_address = candidate.formattedAddress;
        placeInfo.location = candidate.geometry.location;
        placeInfo.name = candidate.name;
        placeInfo.place_id = candidate.placeID;
        placeInfo.rating = candidate.rating;
        placeInfo.user_ratings_total = candidate.user_ratings_total;
            if (candidate.photos!=null && candidate.photos.length > 0){
                placeInfo.photo_reference = candidate.photos[0].photoReference;
            }
            findPlaceResponse.body = placeInfo;
        return findPlaceResponse;
    }
}

