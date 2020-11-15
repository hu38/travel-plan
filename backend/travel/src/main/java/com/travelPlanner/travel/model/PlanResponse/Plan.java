package com.travelPlanner.travel.model.PlanResponse;


public class Plan {
    private String planID;
    private PlanData planData;

    public Plan() {}
    public Plan(String planID, PlanData planData) {
        this.planID = planID;
        this.planData = planData;
    }
}
