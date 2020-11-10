package com.travelPlanner.travel.dao;

import com.travelPlanner.travel.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

@Repository
public class UserDao {
    @Autowired
    private SessionFactory sessionFactory;

    public void addUser(User user){
        user.setEnabled(true);

        Session session = null;
        try {
            session = sessionFactory.openSession();
            session.beginTransaction();

            session.save(user);
            session.getTransaction().commit();
        }catch (Exception e){
            e.printStackTrace();
            assert session != null;
            session.getTransaction().rollback();
            throw e;
        }finally {
            if (session != null){
                session.close();
            }
        }
    }

    public User getUserById(long id){
        User user;
        try(Session session = sessionFactory.openSession()) {
            session.beginTransaction();

            CriteriaBuilder builder = session.getCriteriaBuilder();
            CriteriaQuery<User> criteriaQuery = builder.createQuery(User.class);
            Root<User> root = criteriaQuery.from(User.class);
            criteriaQuery.select(root).where(builder.equal(root.get("user_id"), id));
            user = session.createQuery(criteriaQuery).getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return user;
    }
}
