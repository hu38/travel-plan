package com.travelPlanner.travel.controller;

import com.travelPlanner.travel.model.Response;
import com.travelPlanner.travel.model.User;
import com.travelPlanner.travel.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    private final String USER_ALREADY_EXISTS = "user id already exists.";
    private final String SUCCESSFULLY_REGISTERED = "now you are successfully registered.";

    @RequestMapping(value = "/user/registration",method = RequestMethod.POST)
    public Response<String> register(@RequestBody User user){
        Response<String> response = new Response<String>(){};
        if (userService.addUser(user)){
            response.body = SUCCESSFULLY_REGISTERED;
            response.statusCode = HttpStatus.OK.value();
        }else{
            response.body = USER_ALREADY_EXISTS;
            response.statusCode = HttpStatus.NOT_ACCEPTABLE.value();
        }
        return response;
    }

    @RequestMapping("/user/login")
    public Response<String> login(@RequestBody User user){
        Response<String> response = new Response<String>(){};
        response.body = userService.verifyLogin(user);
        response.statusCode = HttpStatus.OK.value();
        return response;
    }
}
