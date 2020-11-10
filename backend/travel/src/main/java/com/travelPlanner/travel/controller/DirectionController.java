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
    public DirectionResponse getRoute(@RequestParam(value = "places", defaultValue = "ChIJj2tUC2bGwoARwqdCDE37YD0 ChIJkyPnxsO_woARXQl-tdWAFi8 ChIJzzgyJU--woARcZqceSdQ3dM ChIJdZbSPDg23YAR6yR-akC2g4E") String placeIDList, @RequestParam(value = "optimize", defaultValue = "false") String optimizeFlag) throws UnsupportedEncodingException {
        System.out.println(placeIDList);
        DirectionResponse directionResponse = directionService.getRoute(placeIDList, optimizeFlag);
        return directionResponse;
    }
}
