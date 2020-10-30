package com.travelPlanner.travel.controller;

import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    PlaceService placeService;

    @RequestMapping(value = "/place/find-city", method = RequestMethod.GET)
    public CityResponse findCity(@RequestParam(value = "city", defaultValue = "los+angeles") String cityLocation) throws UnsupportedEncodingException {
        cityLocation = URLEncoder.encode(cityLocation,"UTF-8");
        System.out.println(cityLocation);
        CityResponse cityResponse = placeService.getCityLocation(cityLocation);
        return cityResponse;
    }

    @RequestMapping(value = "/place/recommend-places", method = RequestMethod.GET)
    public void recommendPlaces(@RequestParam(value = "city", defaultValue = "minneapolis") String cityLocation,
                                @RequestParam(value = "radius", defaultValue = "1500") double radius) {

    }
}
