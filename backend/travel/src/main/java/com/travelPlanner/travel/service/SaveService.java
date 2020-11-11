package com.travelPlanner.travel.service;


import com.travelPlanner.travel.dao.SavePlaceDAO;
import com.travelPlanner.travel.dao.SavePlanDAO;
import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Plan> loadPlansAction(User user)
    {
        List<Plan> queriedPlans = savePlanDAO.getPlans(user);

        // sanity check
        if (queriedPlans ==null)
        {
            return new ArrayList<Plan>();
        }

        return queriedPlans;
    }
}

