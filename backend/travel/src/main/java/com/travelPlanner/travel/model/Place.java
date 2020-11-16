package com.travelPlanner.travel.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "place")
public class Place implements Serializable {

    private static final long serialVersionUID = 8436097833452420298L;

//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)

    @JsonProperty("place_id")
    @Id
    @Column(name = "place_id")
    private long id;

//    private int place_id;
    private String placeName;


    //==============================================//
    @ManyToOne
    @JsonIgnore
    private Plan savedPlan;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

//    public int getPlace_id() {
//        return place_id;
//    }
//
//    public void setPlace_id(int place_id) {
//        this.place_id = place_id;
//    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }



    public Plan getSavedPlan() {
        return savedPlan;
    }

    public void setSavedPlan(Plan savedPlan) {
        this.savedPlan = savedPlan;
    }
}
