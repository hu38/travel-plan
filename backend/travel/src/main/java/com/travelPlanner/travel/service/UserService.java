package com.travelPlanner.travel.service;

import com.travelPlanner.travel.dao.UserDao;
import com.travelPlanner.travel.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserDao userDao;

    public boolean addUser(User user){
        try{
            userDao.addUser(user);
        }catch (Exception e){
            return false;
        }
        return true;
    }

    public String verifyLogin(User user){
        User queriedUser = userDao.getUserById(user.getId());
        if (queriedUser == null){
            return "User doesn't exists";
        }
        return queriedUser.getPassword().equals(user.getPassword())? "OK":"Incorrect Password";
    }
}
