package com.travelPlanner.travel.controller;


import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.Response;
import com.travelPlanner.travel.model.User;
import com.travelPlanner.travel.service.SaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;


// springboot post controller model
@RestController
@RequestMapping("/api")
public class SaveController {

    @Autowired
    SaveService saveService;

    @RequestMapping(value = "/save/savePlans", method = RequestMethod.POST)
    public Response<String> saveInfo(@RequestBody Plan plan)
    {
        Response<String> response = new Response<String>() {};
        if(saveService.savePlansAction(plan))
        {
            response.body="Plans Saved !";
            response.statusCode=200;
        }
        else
        {
            response.body = "Whoops...Something is Wrong...";
            response.statusCode= HttpStatus.NOT_ACCEPTABLE.value();
        }
        return response;
    }



    @RequestMapping(value = "/save/loadPlans", method = RequestMethod.GET)
    public Response<List<Plan>> loadInfo(@RequestBody User user) throws UnsupportedEncodingException
    {
        Response<List<Plan>> response = new Response<>() {};
        response.body=saveService.loadPlansAction(user);

        // Front End: needs to check if is null or Empty;
        // if (response.body==null || response.body.isEmpty())

        response.statusCode = HttpStatus.OK.value();
        return response;
    }

}
