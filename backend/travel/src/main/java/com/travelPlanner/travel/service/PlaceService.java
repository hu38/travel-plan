package com.travelPlanner.travel.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.travelPlanner.travel.Constants;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.CityGoogleAPIResponse;
import com.travelPlanner.travel.model.CityGoogleAPIResponse.Geometry;
import com.travelPlanner.travel.model.CityResponse;

import org.apache.http.HttpEntity;

import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;


@Service
public class PlaceService {
    private static final String GET_CITY_LOCATION_URL_TEMPLATE =
            "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=%s&inputtype=textquery&key=%s&fields=geometry";
    public CityResponse getCityLocation(String city) throws URISyntaxException, IOException, InterruptedException {
        CityResponse cityResponse = new CityResponse();
        String url = String.format(GET_CITY_LOCATION_URL_TEMPLATE,city, Constants.GOOGLE_API_KEY);

        CloseableHttpClient httpClient = HttpClients.createDefault();
        ObjectMapper mapper = new ObjectMapper();
        ResponseHandler<CityGoogleAPIResponse> responseHandler = httpResponse -> {
            if (httpResponse.getStatusLine().getStatusCode()!=200){
                return new CityGoogleAPIResponse();
            }
            HttpEntity entity = httpResponse.getEntity();
            if(entity==null) {
                return new CityGoogleAPIResponse();
            }


            CityGoogleAPIResponse cityGoogleAPIResponse = mapper.readValue(entity.getContent(), CityGoogleAPIResponse.class);
            return cityGoogleAPIResponse;
        };

        try {
            CityGoogleAPIResponse response = httpClient.execute(new HttpGet(url),responseHandler);
            Geometry geometry = response.candidates[0].geometry;
            cityResponse.body = geometry;
            cityResponse.statusCode = HttpStatus.OK.value();
            return cityResponse;
        }catch(Exception e) {
            e.printStackTrace();
        }
        return cityResponse;
    }

    public static void main(String[] args) throws InterruptedException, IOException, URISyntaxException {

    }
}
