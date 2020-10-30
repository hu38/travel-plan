package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.service.PlaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping("/api")
public class PlaceController {

    @Autowired
    PlaceService placeService;

    @RequestMapping(value = "/place/find-city", method = RequestMethod.GET)
    public CityResponse greeting(@RequestParam(value = "city", defaultValue = "los+angeles") String cityLocation) throws InterruptedException, IOException, URISyntaxException {
        CityResponse cityResponse = placeService.getCityLocation(cityLocation);
        return cityResponse;
    }
}
