package com.travelPlanner.travel.model.Plans;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "savedplans")
public class SavedPlan implements Serializable {

    private static final long serialVersionUID = 8436097833452420299L; //98L

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String cityName;
    private String planName;
    private Date saveDate;

    private int plan_id;
    private int user_id;

    @OneToMany(mappedBy = "savedplaces", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Place> placesList;

    public int getId() {
        return id;
    }

    public void setId(int id) {
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

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public List<Place> getPlacesList() {
        return placesList;
    }

    public void setPlacesList(List<Place> placesList) {
        this.placesList = placesList;
    }
}
