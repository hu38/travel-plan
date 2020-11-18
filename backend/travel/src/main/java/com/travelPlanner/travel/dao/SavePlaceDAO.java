package com.travelPlanner.travel.dao;

import com.travelPlanner.travel.model.Plan;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


// Might Not Need

@Repository
public class SavePlaceDAO {

    @Autowired
    SessionFactory sessionFactory;



}
