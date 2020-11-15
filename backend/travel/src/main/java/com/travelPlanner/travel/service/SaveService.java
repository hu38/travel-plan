package com.travelPlanner.travel.service;


import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.dao.SavePlanDAO;
import com.travelPlanner.travel.helper.HTTPRequest;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.CityGoogleAPIResponse;
import com.travelPlanner.travel.model.CityResponse;
import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.*;

//import java.net.URLEncoder;

@Service
public class SaveService {

    @Autowired
    private SavePlanDAO savePlanDAO;


//    @Autowired
//    private SavePlaceDAO savePlaceDAO;

    public boolean savePlansAction (Plan plan)
    {

        try
        {
            savePlanDAO.addPlan(plan);
        }
        catch (Exception e)
        {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    public List<Plan> loadPlansAction(int user_id)
    {
        List<Plan> queriedPlans = savePlanDAO.getPlans(user_id);

        // sanity check
        if (queriedPlans ==null)
        {
            return new ArrayList<Plan>();
        }

        return queriedPlans;
    }

    public List<Plan> loadAllPlansAction()
    {
        List<Plan> queriedPlans = savePlanDAO.getAllPlans();
        System.out.print("I'm in LoadAllPlans");
//        System.out.print(queriedPlans.size()); // 3? strange

        // sanity check
        if (queriedPlans ==null)
        {
            return new ArrayList<Plan>();
        }

        return queriedPlans;
    }

}

