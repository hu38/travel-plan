package com.travelPlanner.travel.service;

import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.Dao.PlanVirtualDatabase;
import com.travelPlanner.travel.helper.HTTPRequest;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.CityGoogleAPIResponse;
import com.travelPlanner.travel.model.DirectionResponse;
import com.travelPlanner.travel.model.PlanResponse.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Service
public class PlanService {
//    @Autowired
//    HTTPRequest requestHelper;

    public SavePlanResponse savePlan(String planID, String dataInfo, PlanData planData) {
        SavePlanResponse savePlanResponse = new SavePlanResponse();
        SavePlanResponseBody body = new SavePlanResponseBody();

        if (dataInfo != null) {
            // preprocessing
        }

        if (PlanVirtualDatabase.add(planID, planData)) {
            body.statusMessage = "Plan Data Has Been Successfully Saved !";
            savePlanResponse.statusCode = HttpStatus.OK.value();
        } else {
            body.statusMessage = "Having Issue with Saving Plan Data! Data NOT Saved !";
            savePlanResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        }
        savePlanResponse.body = body;
        return savePlanResponse;
    }

    public ReadPlanResponse readPlan(String planID)  {
        ReadPlanResponse readPlanResponse = new ReadPlanResponse();
        ReadPlanResponseBody body = new ReadPlanResponseBody();

        // Should Already Exist
        PlanData data = PlanVirtualDatabase.get(planID);
        if (data != null) {
           body.statusMessage = "Successfully Fetch Plan Data from DB !";
           body.planID = planID;
           body.data = new PlanData();
           body.data.findCityResult = data.findCityResult; // OK
           body.data.recommendListResult = new ArrayList<AttractionSave>(data.recommendListResult);

           body.data.encodedRouteResult = data.encodedRouteResult; // OK
           readPlanResponse.statusCode = HttpStatus.OK.value();
        } else {
            body.statusMessage = "Fail to Fetch Plan Data from DB !";
            readPlanResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
        }
        readPlanResponse.body = body;
        return readPlanResponse;
    }

    public static void main(String[] args) {
        PlanService test = new PlanService();
        // test.savePlan()
        //test.savePlan("1", "data");
        PlanData testData1 = new PlanData();

        PlanData testData2 = new PlanData();
        PlanData testData3 = new PlanData();
//        test.savePlan("1", "data");
//        test.readPlan("1");
    }
}
