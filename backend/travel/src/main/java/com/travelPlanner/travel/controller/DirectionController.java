package com.travelPlanner.travel.controller;

import com.travelPlanner.travel.model.DirectionResponse;
import com.travelPlanner.travel.model.OptimizedDirectionResponse;
import com.travelPlanner.travel.service.DirectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api")
public class DirectionController {
    @Autowired
    DirectionService directionService;

    @RequestMapping(value = "/direction/get-route", method = RequestMethod.GET)

    public DirectionResponse getRoute(@RequestParam(value = "places") String placeIDList, @RequestParam(value = "imperial", defaultValue = "false") String imperial) throws UnsupportedEncodingException {
        DirectionResponse directionResponse = directionService.getRoute(placeIDList, imperial);
        return directionResponse;
    }

    @RequestMapping(value = "/direction/optimize-route", method = RequestMethod.GET)

    public OptimizedDirectionResponse getOptimizedRoute(@RequestParam(value = "places") String placeIDList, @RequestParam(value = "imperial", defaultValue = "false") String imperial) throws UnsupportedEncodingException {
        OptimizedDirectionResponse optimizedDirectionResponse = directionService.getOptimizedRoute(placeIDList, imperial);
        return optimizedDirectionResponse;

    }
}
