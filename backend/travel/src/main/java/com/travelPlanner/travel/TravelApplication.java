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

//		session.beginTransaction();


		// ----------------------------------------------------//
//		User administrator = new User();
//
//		administrator.setEnabled(true);
//		administrator.setId(1);
//		administrator.setPassword("xxx");


//		Plan planHardCoded = new Plan();
//		List<Place> placesHardCoded = new ArrayList<>();
//		List<Plan> plans = new ArrayList<>();
//
//		Place p1= new Place();
//		p1.setPlace_id(1);
//		p1.setPlaceName("myhouse");
//		Place p2= new Place();
//		p2.setPlace_id(2);
//		p2.setPlaceName("yourhouse");
//		//p1.setId(1); // maynot need
//
//		placesHardCoded.add(p1);
//		placesHardCoded.add(p2);
//
//		planHardCoded.setPlanName("Primitive");
//		Date date = new Date();
//		planHardCoded.setSaveDate(date);  //Date:
//		planHardCoded.setCityName("Harbin");
//		planHardCoded.setPlan_id(1);
//		planHardCoded.setPlacesList(placesHardCoded);
//		planHardCoded.setUser(administrator);  // may not need
//		planHardCoded.setId(111);  // may not need
//
//		plans.add(planHardCoded);
//		administrator.setSavedPlans(plans);
//

//		session.save(administrator);
////		session.save(plans);
////		session.save(placesHardCoded);
//
//		session.getTransaction().commit();
//
		session.close();
//


	}

}
