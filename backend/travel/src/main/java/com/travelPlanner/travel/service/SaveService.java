package com.travelPlanner.travel.service;

import com.travelPlanner.travel.dao.SavedPlaceDAO;
import com.travelPlanner.travel.dao.SavedPlanDAO;
import com.travelPlanner.travel.model.Plans.SavedPlan;
import com.travelPlanner.travel.model.SaveResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SaveService {

    @Autowired
    private SavedPlanDAO savedPlanDAO;

    @Autowired
    private SavedPlaceDAO savedPlaceDAO;

    public SaveResponse savePlansAction (Integer userid)
    {

        SaveResponse saveResponse = new SaveResponse();
        saveResponse.body = "OK";
        saveResponse.statusCode=200;

        return  saveResponse;

    }

    public SavedPlan loadPlansAction()
    {
        return savedPlanDAO.getSavedPlaces();
    }
}
