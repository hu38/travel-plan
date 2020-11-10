package com.travelPlanner.travel.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.*;
import com.travelPlanner.travel.model.DirectionResponse;
import com.travelPlanner.travel.model.DirectionResponseBody;
import org.apache.http.HttpEntity;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.net.URLDecoder;
import java.net.URLEncoder;

@Service
public class DirectionService {
    private static final String GET_DIRECTION_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/directions/json?origin=%s&destination=%s&key=%s&waypoints=%s";

    public DirectionResponse getRoute(String placeIDList, String optimizeFlag) throws UnsupportedEncodingException {

        String[] placeList = placeIDList.split(" ");
        String origin = "place_id:".concat(placeList[0]);
        String destination = "place_id:".concat(placeList[placeList.length - 1]);
        String waypoints = "";

        if (placeList.length > 2) {
            if (optimizeFlag.equals("true")) {
                waypoints = "optimize:true|" + "place_id:" + placeList[1];
            } else {
                waypoints = "place_id:".concat(placeList[1]);
            }
        }
        for (int i = 2; i < placeList.length - 1; i++) {
            waypoints = waypoints + "|place_id:" + placeList[i];
        }

        DirectionResponse directionResponse = new DirectionResponse();

        origin = URLEncoder.encode(origin,"UTF-8");
        destination = URLEncoder.encode(destination,"UTF-8");
        waypoints = URLEncoder.encode(waypoints,"UTF-8");
        String url = String.format(GET_DIRECTION_URL_TEMPLATE, origin, destination, Constants.GOOGLE_API_KEY, waypoints);

//        System.out.println("url is: " + url);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        ResponseHandler<DirectionGoogleAPIResponse> responseHandler = httpResponse -> {
            if (httpResponse.getStatusLine().getStatusCode()!=200){
                return new DirectionGoogleAPIResponse();
            }
            HttpEntity entity = httpResponse.getEntity();

            if(entity==null) {
                return new DirectionGoogleAPIResponse();
            }

            DirectionGoogleAPIResponse directionGoogleAPIResponse = mapper.readValue(entity.getContent(), DirectionGoogleAPIResponse.class);
            return directionGoogleAPIResponse;
        };

        try {
            DirectionGoogleAPIResponse response = httpClient.execute(new HttpGet(url),responseHandler);

            Leg[] legs = response.routes[0].legs;
            Distance totalDistance = new Distance();
            Duration totalDuration = new Duration();
            double distance = 0;
            double duration = 0;
            for (Leg leg : legs) {
                System.out.println("this leg's distance is: " + leg.distance.value);
                System.out.println("this leg's duration is: " + leg.duration.value);
                distance += leg.distance.value;
                duration += leg.duration.value;
            }
            totalDistance.value = distance;
            totalDuration.value = duration;

            DirectionResponseBody body = new DirectionResponseBody();
            body.overviewPolyline = response.routes[0].overview_polyline;
            body.distance = totalDistance;
            body.duration = totalDuration;

/*            OverviewPolyline overview_polyline = response.routes[0].overview_polyline;
            directionResponse.statusCode = HttpStatus.OK.value();*/

            directionResponse.body = body;
            return directionResponse;
        }catch(Exception e) {
            e.printStackTrace();
        }
        return directionResponse;
    }

    public static void main(String[] args) throws InterruptedException, IOException, URISyntaxException {

    }
}
