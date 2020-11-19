package com.travelPlanner.travel.model.PlanResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.AttractionsGoogleAPIResponse.Attraction;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AttractionListResult {
    @JsonProperty("results")
    public ArrayList<AttractionSave> results;

    public AttractionListResult(ArrayList<AttractionSave> results) {
        this.results = new ArrayList<>(results);

    }
}
