package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.model.RecommendedAttractionsResponse;
import com.travelPlanner.travel.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
