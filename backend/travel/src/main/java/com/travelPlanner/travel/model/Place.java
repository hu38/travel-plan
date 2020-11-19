package com.travelPlanner.travel.model;


import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "place")
public class Place implements Serializable {
    private static final long serialVersionUID = 2681531852204068106L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int place_id;

    private String position;
    private String cityName;

    public int getId() {
        return place_id;
    }

    public void setId(int id) {
        this.place_id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}

