package com.travelPlanner.travel.model.Plans;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "place")
public class Place implements Serializable {
    private static final long serialVersionUID = 2681531852204068106L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne
    @JsonIgnore
    private SavedPlan savedPlan;

    private int place_id;

    private String position;
    private String placeName;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public SavedPlan getSavedPlans() {
        return savedPlan;
    }

    public void setSavedPlans(SavedPlan savedPlan) {
        this.savedPlan = savedPlan;
    }

    public int getPlace_id() {
        return place_id;
    }

    public void setPlace_id(int place_id) {
        this.place_id = place_id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }
}