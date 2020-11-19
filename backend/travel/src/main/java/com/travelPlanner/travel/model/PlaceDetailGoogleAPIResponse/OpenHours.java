package com.travelPlanner.travel.model.PlaceDetailGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OpenHours {
    @JsonProperty("weekday_text")
    public String[] weekdayText;
}
