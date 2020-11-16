package com.travelPlanner.travel.model.FindPlaceGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FindPlaceGoogleAPIResponse {
    public FindPlaceCandidate[] candidates;
}
