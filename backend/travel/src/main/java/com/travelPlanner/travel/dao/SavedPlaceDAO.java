package com.travelPlanner.travel.dao;

import com.travelPlanner.travel.model.Plans.Place;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class SavedPlaceDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public void addPlace(Place place)
    {
        Session session=null;

        try {
            session = sessionFactory.openSession();
            session.beginTransaction();
            session.save(place);
            session.getTransaction().commit();
        } catch (Exception e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }


    public List<Place> getAllPlaces()
    {
        List<Place> places = new ArrayList<Place>();
        try (Session session = sessionFactory.openSession()) {
            places = session.createCriteria(Place.class).list();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return places;

    }
}
