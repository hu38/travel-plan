package com.travelPlanner.travel.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelPlanner.travel.model.Place;
import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.Response;
import com.travelPlanner.travel.model.User;
import com.travelPlanner.travel.service.SaveService;
import netscape.javascript.JSObject;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.List;


@RestController
@RequestMapping("/api")
public class SaveController {

    @Autowired
    SaveService saveService;

    //@PostMapping  Need:@Request body User user
    @RequestMapping(value = "/save/savePlans", method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public Response<String> saveInfo(@RequestBody Plan plan)
    {
        Response<String> response = new Response<String>() {};

//        System.out.println("I'm in!");
//        System.out.println(plan.getPlanName());
//        System.out.println(plan.getCityName());
//        System.out.println(plan.getPlan_id());
//        System.out.println(plan.getSaveDate());  // didnt support Time, default 00:00:00
//        System.out.println(plan.getPlacesList());



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


    // /save/loadPlans/{user_id}  @PathVariable
    //public Response<List<Plan>> loadInfo(@RequestBody User user)

    @RequestMapping(value = "/save/loadPlans/{user_id}", method = RequestMethod.GET)
    public Response<List<Plan>> loadInfo(@PathVariable(value="user_id") int user_id)
    {
        Response<List<Plan>> response = new Response<>() {};
        response.body=saveService.loadPlansAction(user_id);

        // Front End: needs to check if is null or Empty;
        // if (response.body==null || response.body.isEmpty())

        response.statusCode = HttpStatus.OK.value();
        return response;
    }


//    @RequestMapping(value = "/save/loadAllPlans", method = RequestMethod.GET)

     @RequestMapping(value = "/save/loadAllPlans", method = RequestMethod.GET)
     public Response<List<Plan>> loadAllInfo()
    {
        Response<List<Plan>> response = new Response<>() {};
        response.body=saveService.loadAllPlansAction();

        // Front End: needs to check if is null or Empty;
        // if (response.body==null || response.body.isEmpty())

        response.statusCode = HttpStatus.OK.value();
        return response;
    }

}