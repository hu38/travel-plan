package com.travelPlanner.travel.model;

import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.Distance;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.Duration;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.OverviewPolyline;

public class DirectionResponseBody {
    public Distance distance;
    public Duration duration;
    public OverviewPolyline overviewPolyline;
}
