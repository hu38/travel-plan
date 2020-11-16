package com.travelPlanner.travel.controller;

import com.travelPlanner.travel.model.DirectionResponse;
import com.travelPlanner.travel.service.DirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@RestController
@RequestMapping("/api")
public class DirectionController {
    @Autowired
    DirectionService directionService;

    @RequestMapping(value = "/direction/get-route", method = RequestMethod.GET)
    public DirectionResponse getRoute(@RequestParam(value = "places") String placeIDList, @RequestParam(value = "imperial") String imperial) throws UnsupportedEncodingException {
        DirectionResponse directionResponse = directionService.getRoute(placeIDList, imperial);
        return directionResponse;
    }

    @RequestMapping(value = "/direction/optimize-route", method = RequestMethod.GET)
    public int[] getOptimizedOrder(@RequestParam(value = "places") String placeIDList) throws UnsupportedEncodingException {
        int[] order = directionService.getOptimizedOrder(placeIDList);
        return order;
    }
}
