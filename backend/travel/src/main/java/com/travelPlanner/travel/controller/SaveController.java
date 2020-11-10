package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.Plans.SavedPlan;
import com.travelPlanner.travel.model.SaveResponse;
import com.travelPlanner.travel.service.SaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;


// springboot post controller model
@RestController
@RequestMapping("/api")
public class SaveController {

    @Autowired
    SaveService saveService;

    /// model

    @RequestMapping(value = "/save/savePlaces", method = RequestMethod.POST)
    public SaveResponse saveInfo(@ModelAttribute(value = "userid")  userid) throws UnsupportedEncodingException
    {
        return saveService.savePlansAction();

    }



    @RequestMapping(value = "/save/loadPlaces", method = RequestMethod.GET)
    public List<SavedPlan> loadInfo() throws UnsupportedEncodingException
    {
        return saveService.loadPlansAction();
    }

}
