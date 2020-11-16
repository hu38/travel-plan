package com.travelPlanner.travel.service;

import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.helper.HTTPRequest;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.*;
import com.travelPlanner.travel.model.DirectionResponse;
import com.travelPlanner.travel.model.DirectionResponseBody.DirectionResponseBody;
import com.travelPlanner.travel.model.DirectionResponseBody.OptimizedDirectionResponseBody;
import com.travelPlanner.travel.model.OptimizedDirectionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.DecimalFormat;

@Service
public class DirectionService {
    @Autowired
    HTTPRequest requestHelper;
    private static final String GET_DIRECTION_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s&waypoints=%s";

    public DirectionResponse getRoute(String placeIDList, String imperial) throws UnsupportedEncodingException {
        DirectionGoogleAPIResponse googleAPIResponse = getDirectionGoogleAPIResponse(placeIDList, "false");

        DirectionResponse directionResponse = imperial.equals("true") ? mapDirectionResponse(googleAPIResponse, true) : mapDirectionResponse(googleAPIResponse, false);
        return directionResponse;
    }

    private DirectionResponse mapDirectionResponse(DirectionGoogleAPIResponse googleAPIResponse, boolean imperial) {
        DirectionResponse directionResponse = new DirectionResponse();

        if (googleAPIResponse == null) {
            directionResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
            return directionResponse;
        }

        directionResponse.statusCode = HttpStatus.OK.value();
        DirectionResponseBody responseBody = new DirectionResponseBody();
        responseBody.overviewPolyline = googleAPIResponse.routes[0].overviewPolyline.points;

        Leg[] legs = googleAPIResponse.routes[0].legs;
        double totalDistance = 0;
        double totalDuration = 0;
        for (Leg leg : legs) {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
        }
        String distanceText = imperial == true ? formatDistance(totalDistance, true) : formatDistance(totalDistance, false);
        String durationText = formatDuration(totalDuration);
        responseBody.totalDistance = distanceText;
        responseBody.totalDuration = durationText;

        directionResponse.body = responseBody;
        return directionResponse;
    }

    private String formatDistance(double totalDistance, boolean imperial) {
        DecimalFormat oneDForm = new DecimalFormat("#.#");
        if (imperial == true) {
            totalDistance *= 3.2808399;
            if (totalDistance / 5280 < 0.1) {
                return (int) totalDistance + " ft";
            } else {
                return Double.valueOf(oneDForm.format(totalDistance / 5280)) + " mi";
            }
        } else {
            if (totalDistance < 100) {
                return (int) totalDistance + " m";
            } else {
                return Double.valueOf(oneDForm.format(totalDistance / 1000)) + " km";
            }
        }
    }

    private String formatDuration(double totalDistance) {
        int[] time = new int[4];
        time[3] = (int) (totalDistance % 60);
        totalDistance /= 60;
        time[2] = (int) (totalDistance % 60);
        totalDistance /= 60;
        time[1] = (int) (totalDistance % 24);
        totalDistance /= 24;
        time[0] = (int) totalDistance;

        String durationText;
        if (time[0] > 0) {
            if (time[0] == 1) {
                durationText = time[0] + " day";
            } else {
                durationText = time[0] + " days";
            }
            if (time[1] == 1) {
                durationText += " " + time[1] + " hour";
            } else {
                durationText += " " + time[1] + " hours";
            }
        } else if (time[1] > 0) {
            if (time[1] == 1) {
                durationText = time[1] + " hour";
            } else {
                durationText = time[1] + " hours";
            }
            if (time[2] == 1) {
                durationText += " " + time[2] + " min";
            } else {
                durationText += " " + time[2] + " mins";
            }
        } else if (time[2] > 0) {
            if (time[2] == 1) {
                durationText = time[2] + " min";
            } else {
                durationText = time[2] + " mins";
            }
            if (time[3] == 1) {
                durationText += " " + time[3] + " sec";
            } else {
                durationText += " " + time[3] + " secs";
            }
        } else {
            if (time[3] < 1) {
                durationText = time[3] + " sec";
            } else {
                durationText = time[3] + " secs";
            }
        }
        return  durationText;
    }

    public OptimizedDirectionResponse getOptimizedRoute(String placeIDList, String imperial) throws UnsupportedEncodingException {
        DirectionGoogleAPIResponse googleAPIResponse = getDirectionGoogleAPIResponse(placeIDList, "true");

        OptimizedDirectionResponse optimizedDirectionResponse = new OptimizedDirectionResponse();

        if (googleAPIResponse == null) {
            optimizedDirectionResponse.statusCode = HttpStatus.INTERNAL_SERVER_ERROR.value();
            return optimizedDirectionResponse;
        }

        optimizedDirectionResponse.statusCode = HttpStatus.OK.value();
        OptimizedDirectionResponseBody responseBody = new OptimizedDirectionResponseBody();
        responseBody.overviewPolyline = googleAPIResponse.routes[0].overviewPolyline.points;

        Leg[] legs = googleAPIResponse.routes[0].legs;
        double totalDistance = 0;
        double totalDuration = 0;
        for (Leg leg : legs) {
            totalDistance += leg.distance.value;
            totalDuration += leg.duration.value;
        }
        String distanceText = imperial.equals("true") ? formatDistance(totalDistance, true) : formatDistance(totalDistance, false);
        String durationText = formatDuration(totalDuration);
        responseBody.totalDistance = distanceText;
        responseBody.totalDuration = durationText;

        responseBody.visitOrder = googleAPIResponse.routes[0].wayPointOrder;
        optimizedDirectionResponse.body = responseBody;
        return optimizedDirectionResponse;
    }

    private DirectionGoogleAPIResponse getDirectionGoogleAPIResponse(String placeIDList, String optimizeFlag) throws UnsupportedEncodingException {
        String[] placeList = placeIDList.split(" ");
        String origin = "place_id:".concat(placeList[0]);
        String destination = "place_id:".concat(placeList[placeList.length - 1]);
        String waypoints = "";

        if (placeList.length > 2) {
            if (optimizeFlag == "true") {
                waypoints = "optimize:true|" + "place_id:" + placeList[1];
            } else {
                waypoints = "place_id:" + placeList[1];
            }
        }

        for (int i = 2; i < placeList.length - 1; i++) {
            waypoints = waypoints + "|place_id:" + placeList[i];
        }

        origin = URLEncoder.encode(origin,"UTF-8");
        destination = URLEncoder.encode(destination,"UTF-8");
        waypoints = URLEncoder.encode(waypoints,"UTF-8");
        String url = String.format(GET_DIRECTION_URL_TEMPLATE, origin, destination, Constants.GOOGLE_API_KEY, waypoints);

        DirectionGoogleAPIResponse response = requestHelper.makeRequest(DirectionGoogleAPIResponse.class, url, new DirectionGoogleAPIResponse());
        return response;
    }
}
