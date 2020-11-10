package com.travelPlanner.travel.helper;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.HttpEntity;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class HTTPRequest {
    @Autowired
    ObjectMapper mapper;
    /**
     *
     * @param responseClass 返回的instance的class
     * @param url request url
     * @param instance 如果api返回非ok或为空，默认返回的instance
     * @param <T>
     * @return response instance
     */
    public <T> T makeRequest(Class<T> responseClass,String url,T instance){
        CloseableHttpClient client = HttpClients.createDefault();
        ResponseHandler<T> responseResponseHandler = httpResponse -> {
            if (httpResponse.getStatusLine().getStatusCode()!=200){
                return instance;
            }
            HttpEntity entity = httpResponse.getEntity();
            if (entity == null){
                return instance;
            }
            return mapper.readValue(entity.getContent(),responseClass);
        };

        try {
            return client.execute(new HttpGet(url),responseResponseHandler);
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
