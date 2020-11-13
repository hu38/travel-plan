package com.travelPlanner.travel.model;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "plan")
public class Plan implements Serializable {

    private static final long serialVersionUID = 2652327633296064143L; //98L

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String cityName;
    private String planName;
    private Date saveDate;
    private int plan_id;
    private String placesListString;


    //===================================================//

    @OneToMany(mappedBy = "savedPlan", cascade =CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Place> placesList;

    public List<Place> getPlacesList() {
        return placesList;
    }

    public void setPlacesList(List<Place> placesList) {
        this.placesList = placesList;
    }
    //===================================================//



    //===================================================//
    @ManyToOne
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    //===================================================//


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getPlanName() {
        return planName;
    }

    public void setPlanName(String planName) {
        this.planName = planName;
    }

    public Date getSaveDate() {
        return saveDate;
    }

    public void setSaveDate(Date saveDate) {
        this.saveDate = saveDate;
    }

    public int getPlan_id() {
        return plan_id;
    }

    public void setPlan_id(int plan_id) {
        this.plan_id = plan_id;
    }

    public String getPlacesListString() {
        return placesListString;
    }

    public void setPlacesListString(String placesListString) {
        this.placesListString = placesListString;
    }
}
