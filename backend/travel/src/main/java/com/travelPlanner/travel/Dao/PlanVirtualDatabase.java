package com.travelPlanner.travel.Dao;

import com.travelPlanner.travel.model.PlanResponse.PlanData;

import java.util.HashMap;
import java.util.Map;


public class PlanVirtualDatabase {
    private static HashMap<String, PlanData> vDatabase;

    public PlanVirtualDatabase() {
    }

    public PlanVirtualDatabase(String id, PlanData data) {
        vDatabase = new HashMap<>();
        vDatabase.put(id, data);
    }

    public static boolean add(String id, PlanData data) {
        if (vDatabase == null) {
            vDatabase = new HashMap<>();
            vDatabase.put(id, data);
            return true;
        } else if (!vDatabase.containsKey(id)) {
            vDatabase.put(id, data);
            return true;
        } else {
            return false;
        }
    }

    public static PlanData get(String id) {
        if (vDatabase.containsKey(id)) {
            return vDatabase.get(id);
        }
        return null;
    }
}
