package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.model.PlanResponse.PlanData;
import com.travelPlanner.travel.model.PlanResponse.ReadPlanResponse;
import com.travelPlanner.travel.model.PlanResponse.SavePlanResponse;
import com.travelPlanner.travel.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;


@RestController
@RequestMapping("/api")
public class PlanController {

    @Autowired
    PlanService planService;

    @RequestMapping(value = "/plan/save-plan", method = RequestMethod.POST)
    public SavePlanResponse savePlan(@RequestParam(value = "planID", defaultValue = "0") String planID,
                                     @RequestParam(value = "dataInfo", defaultValue = "complete", required = false) String dataInfo,
                                     @RequestBody PlanData planData) throws UnsupportedEncodingException {
        return planService.savePlan(planID, dataInfo, planData);
    }

    @RequestMapping(value = "/plan/read-plan", method = RequestMethod.GET)
    public ReadPlanResponse readPlan(@RequestParam(value = "planID", defaultValue = "0") String planID) throws UnsupportedEncodingException {
        return planService.readPlan(planID);
    }
}

// Only one type used in Google API, more than one, ignored by API
