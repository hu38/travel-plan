package com.travelPlanner.travel;

import com.travelPlanner.travel.model.Place;
import com.travelPlanner.travel.model.Plan;
import com.travelPlanner.travel.model.User;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@SpringBootApplication
@RestController
public class TravelApplication {

	public static void main(String[] args) {

		SpringApplication.run(TravelApplication.class, args);

		ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
		SessionFactory sessionFactory = (SessionFactory) context.getBean("sessionFactory");
		Session session = sessionFactory.openSession();

		session.beginTransaction();


		// ----------------------------------------------------//
//		User administrator = new User();
//
//		administrator.setEnabled(true);
//		administrator.setId(1);
//		administrator.setPassword("xxx");
//
//
//		Plan plan1 = new Plan();
//		plan1.setPlanName("Plan A");
//		plan1.setSaveDate(new Date());
//		plan1.setPlan_id(1);
//		plan1.setCityName("Harbin");
//		//default start from 1
//		plan1.setId(1);
//
//
//		Place p1= new Place();
//		p1.setPlace_id(1);
//		p1.setPlaceName("myhouse");
//		Place p2= new Place();
//		p2.setPlace_id(2);
//		p2.setPlaceName("yourhouse");
//
//		// default start from 1;
//		p1.setId(1); // maynot need
//		p2.setId(2);
//		p1.setSavedPlans(plan1);
//		p2.setSavedPlans(plan1);
//
//		List<Place> places = new ArrayList<>();
//		places.add(p1);
//		places.add(p2);
//
//		plan1.setPlacesList(places);
//		plan1.setId(1);
//
//		List<Plan> plans = new ArrayList<>();
//		plans.add(plan1);
//		plan1.setUser(administrator);
//
//		administrator.setSavedPlans(plans);
//
//		session.save(administrator);
//
//
//		session.getTransaction().commit();
//
//		session.close();

	}

}
