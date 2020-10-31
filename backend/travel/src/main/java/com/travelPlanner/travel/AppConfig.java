package com.travelPlanner.travel;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean(name = "mapper")
    public ObjectMapper dataSource() {
        return new ObjectMapper();
    }
}
