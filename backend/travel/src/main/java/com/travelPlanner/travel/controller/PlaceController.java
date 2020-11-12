package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.model.FindPlaceResponse;
import com.travelPlanner.travel.model.RecommendedAttractionsResponse;
import com.travelPlanner.travel.model.Response;
import com.travelPlanner.travel.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    PlaceService placeService;

    @RequestMapping(value = "/place/find-city", method = RequestMethod.GET)
    public CityResponse findCity(@RequestParam(value = "city", defaultValue = "los+angeles") String cityLocation) throws UnsupportedEncodingException {
        return placeService.getCityLocation(cityLocation);
    }

    @RequestMapping(value = "/place/find-tourist-attractions", method = RequestMethod.GET)
    public RecommendedAttractionsResponse recommendPlaces(@RequestParam(value = "city", defaultValue = "minneapolis") String cityLocation,
                                                          @RequestParam(value = "pagetoken", required = false) String pageToken) throws UnsupportedEncodingException {
        return placeService.getRecommendedAttractions(cityLocation,pageToken);
    }

    @RequestMapping(value = "/place/detail", method = RequestMethod.GET)
    public Response<String[]> getPlaceDetail(@RequestParam(value = "placeId") String placeId) throws UnsupportedEncodingException {
        Response response = new Response<String[]>(){};
        response.statusCode = HttpStatus.OK.value();
        response.body = placeService.getOpenHours(placeId);
        return response;
    }

    @RequestMapping(value = "/place/find-place", method = RequestMethod.GET)
    public FindPlaceResponse findPlace(@RequestParam(value = "placeID") String placeID) throws UnsupportedEncodingException {
        return placeService.getPlaceInfo(placeID);
    }
}
