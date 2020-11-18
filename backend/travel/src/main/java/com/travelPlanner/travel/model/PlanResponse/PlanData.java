package com.travelPlanner.travel.model.PlanResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Coordinate;
import org.springframework.boot.autoconfigure.context.PropertyPlaceholderAutoConfiguration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlanData implements Serializable {

    public FindCityResult findCityResult;

    // Recommended attraction list
    @JsonProperty("recommendListResult")
    public ArrayList<AttractionSave> recommendListResult;

    // encoded Route
    @JsonProperty("encodedRouteResult")
    public String encodedRouteResult;


    @JsonProperty("findCityResult")
    private void getFindCityResult(Map<String, Object> findCityResult) {
        if (this.findCityResult == null) {
            this.findCityResult = new FindCityResult();
        }
        Map<String, Double> location = (Map<String, Double>) findCityResult.get("location");
        if (this.findCityResult.location == null) {
            this.findCityResult.location = new Coordinate();
        }
        this.findCityResult.location.lat = location.get("lat");
        this.findCityResult.location.lng = location.get("lng");
    }


    @JsonProperty("recommendListResult")
    private void getRecommendListResult(ArrayList<AttractionSave> recommendListResult) {
        if (this.recommendListResult == null) {
            this.recommendListResult = new ArrayList<>(recommendListResult);
        }
    }
}