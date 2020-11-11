package com.travelPlanner.travel.dao;

import com.travelPlanner.travel.model.Place;
import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
public class SavePlanDAO {

    @Autowired
    SessionFactory sessionFactory;

    //Save Plan and places in it Together
    public void addPlan(Plan plan)
    {
        List<Place> savedPlaces = plan.getPlacesList();

        Session session =null;
        try
        {
            session = sessionFactory.openSession();
            session.beginTransaction();

            session.save(plan);
            session.save(savedPlaces);

            session.getTransaction().commit();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            assert session!=null;
            session.getTransaction().rollback();
            // throw e;
        }
        finally {
            if(session!=null)
            {
                session.close();
            }
        }
    }

    public List<Plan> getPlans(User user)
    {
        List<Plan> planResults = new ArrayList<Plan>();

        try(Session session = sessionFactory.openSession())
        {
            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<Plan> query =builder.createQuery(Plan.class);
            Root<Plan> root =  query.from(Plan.class);
            query.select(root).where(builder.equal(root.get("user"),user));

            planResults = session.createQuery(query).getResultList();
            System.out.println(planResults);

//            String sql = "FROM plans order by plans.saveDate asc";
//            Query query = session.createQuery(sql);
//            criteria.add(Restrictions.gt("user",user));
//            criteria.addOrder(Order.asc("plans.saveDate"));
//            plans = (List<Plan>) criteria.list();
        }
        catch (Exception e)
        {
            e.printStackTrace();
            //throw e;
        }
        return planResults;

    }

}
