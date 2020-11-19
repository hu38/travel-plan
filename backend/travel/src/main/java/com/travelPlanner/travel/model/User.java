package com.travelPlanner.travel.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.io.Serializable;

import java.util.List;


@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = 2681531852204068105L;

    @JsonProperty("user_id")
    @Id
    @Column(name = "user_id")
    private long id;

    // =======================================================//

//    @OneToMany(mappedBy = "users", cascade =CascadeType.ALL, fetch = FetchType.EAGER)

//    @OneToMany(mappedBy = "user", cascade =CascadeType.ALL, fetch = FetchType.EAGER)
//    private List<Plan> savedPlans;
//
//    public List<Plan> getSavedPlans() {
//        return savedPlans;
//    }
//
//    public void setSavedPlans(List<Plan> savedPlans) {
//        this.savedPlans = savedPlans;
//    }
    // =======================================================//

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    private String password;
    private boolean enabled;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
}
