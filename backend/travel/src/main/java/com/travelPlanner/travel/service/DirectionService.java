package com.travelPlanner.travel.service;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.DirectionGoogleAPIResponse;
import com.travelPlanner.travel.model.DirectionGoogleAPIResponse.OverviewPolyline;
import com.travelPlanner.travel.model.DirectionResponse;
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

    public DirectionResponse getPolylines(String list) throws UnsupportedEncodingException {
//        list = URLDecoder.decode(list, "UTF-8");
//        System.out.println(list);
//        String[] placeList = list.split("\\+");
        String[] placeList = list.split(" ");

        //System.out.println(placeList.length);
       // System.out.println(placeList[2]);
        DirectionResponse directionResponse = new DirectionResponse();
        // placeList.length == 3
        placeList[0] = URLEncoder.encode(placeList[0],"UTF-8");
        placeList[1] = URLEncoder.encode(placeList[1],"UTF-8");
        placeList[2] = URLEncoder.encode(placeList[2],"UTF-8");
        String url = String.format(GET_DIRECTION_URL_TEMPLATE, placeList[0], placeList[1], Constants.GOOGLE_API_KEY, placeList[2]);
//        System.out.println(url);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
        ResponseHandler<DirectionGoogleAPIResponse> responseHandler = httpResponse -> {
            System.out.println(httpResponse.getStatusLine().getStatusCode());

            if (httpResponse.getStatusLine().getStatusCode()!=200){
                return new DirectionGoogleAPIResponse();
            }
            HttpEntity entity = httpResponse.getEntity();

            System.out.println(entity);

            if(entity==null) {
                return new DirectionGoogleAPIResponse();
            }

            DirectionGoogleAPIResponse directionGoogleAPIResponse = mapper.readValue(entity.getContent(), DirectionGoogleAPIResponse.class);
            return directionGoogleAPIResponse;
        };

        try {
//            url = URLEncoder.encode(url, "UTF-8");
            System.out.println(url);
            DirectionGoogleAPIResponse response = httpClient.execute(new HttpGet(url),responseHandler);
            System.out.println(response);

            OverviewPolyline overview_polyline = response.routes[0].overview_polyline;
            directionResponse.body = overview_polyline;
            directionResponse.statusCode = HttpStatus.OK.value();
            return directionResponse;
        }catch(Exception e) {
            e.printStackTrace();
        }
        return directionResponse;
    }

    public static void main(String[] args) throws InterruptedException, IOException, URISyntaxException {

    }
}
