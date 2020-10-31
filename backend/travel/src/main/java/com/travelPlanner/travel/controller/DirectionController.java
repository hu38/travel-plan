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

    @RequestMapping(value = "/direction/overview_polyline", method = RequestMethod.GET)
    public DirectionResponse findPolyline(@RequestParam(value = "list", defaultValue = "place_id:ChIJj2tUC2bGwoARwqdCDE37YD0 place_id:ChIJkyPnxsO_woARXQl-tdWAFi8 place_id:ChIJzzgyJU--woARcZqceSdQ3dM") String placeIDList) throws UnsupportedEncodingException {
//        placeIDList = URLEncoder.encode(placeIDList,"UTF-8");
        System.out.println(placeIDList);
        DirectionResponse directionResponse = directionService.getPolylines(placeIDList);
        return directionResponse;
    }
}
