package com.travelPlanner.travel.model.TextSearchGoogleAPIResponse;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TextSearchGoogleAPIResponse {

    @JsonProperty("next_page_token")
    public String nextPageToken;

    public Result[] results;

}
