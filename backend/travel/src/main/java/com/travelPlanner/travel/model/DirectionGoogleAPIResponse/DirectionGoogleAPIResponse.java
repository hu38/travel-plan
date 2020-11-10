package com.travelPlanner.travel.model.DirectionGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)    // ignore unnecessary fields
@JsonInclude(JsonInclude.Include.NON_NULL)     // skip null values
public class DirectionGoogleAPIResponse {
    public Route[] routes;
    public String status;
}
