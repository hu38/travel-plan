package com.travelPlanner.travel.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "place")
public class Place implements Serializable {

    private static final long serialVersionUID = 8436097833452420298L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;


    private int place_id;
    private String placeName;

    //==============================================//
    @ManyToOne
    @JsonIgnore
    private Plan savedPlan;

    public Plan getSavedPlans() {
        return savedPlan;
    }

    public void setSavedPlans(Plan savedPlan) {
        this.savedPlan = savedPlan;
    }
    //==============================================//

    public long getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPlace_id() {
        return place_id;
    }

    public void setPlace_id(int place_id) {
        this.place_id = place_id;
    }


    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }

//  private String position;
//    public String getPosition() {
//        return position;
//    }
//
//    public void setPosition(String position) {
//        this.position = position;
//    }

}
