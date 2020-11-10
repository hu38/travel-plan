package com.travelPlanner.travel.dao;


import com.travelPlanner.travel.model.Plans.Place;
import com.travelPlanner.travel.model.Plans.SavedPlan;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SavedPlanDAO {

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private SavedPlaceDAO savedPlaceDAO;

    public void addsavedPlans(SavedPlan savedPlan)
    {
        List<Place>  savedPlaces = savedPlan.getPlacesList();


        Session session = null;
        try
        {
            session=sessionFactory.openSession();
            session.beginTransaction();
            session.save(savedPlan);
            session.getTransaction().commit();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            session.getTransaction().rollback();
        }
        finally
        {
            if (session!=null)
            {
                session.close();
            }
        }
    }

    public SavedPlan getSavedPlaces()  //int userId
    {
        //NATIVE QUERY or Criteria Querry
        try (Session session = sessionFactory.openSession())
        {

//            Criteria criteria = session.createCriteria(User.class);
//            user = (User) criteria.add(Restrictions.eq("emailId", userName)).uniqueResult();

//            return session.get(SavedPlans.class,userId);
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }

        return null;

    }

}
