package com.travelPlanner.travel;

//import com.travelPlanner.travel.model.Plans.SavedPlans;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.web.bind.annotation.RestController;

//import java.sql.Date;

@SpringBootApplication
@RestController
public class TravelApplication {

	public static void main(String[] args) {

		ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
		SessionFactory sessionFactory = (SessionFactory) context.getBean("sessionFactory") ;

		Session session = sessionFactory.openSession();
//
//		session.beginTransaction();
//
//		SavedPlans savedplan = new SavedPlans();
//		savedplan.setCityName("Harbin");
//		savedplan.setPlan_id(1);
//		savedplan.setPlanName("Rudiment");
//		String hardcodedDate = "2020-11-09";
//		Date date = Date.valueOf(hardcodedDate);
//		savedplan.setSaveDate(date);
//		savedplan.setId(1);
//		savedplan.setUser_id(1);
//
//
//
//		session.save(savedplan);   // cascade: savedplan -->place
//		session.getTransaction().commit();
//		session.close();


		//Customer customer = new Customer();
		//		customer.setFirstName("stefan");
		//		customer.setLastName("laioffer");
		//
		//		CartItem cartItem1 = new CartItem();
		//		cartItem1.setQuantity(1);
		//		cartItem1.setPrice(1);
		//
		//		CartItem cartItem2 = new CartItem();
		//		cartItem2.setQuantity(2);
		//		cartItem2.setPrice(2);
		//
		//		Cart cart = new Cart();
		//		cart.setCartItem(new ArrayList<>());
		//		cart.getCartItem().add(cartItem1);
		//		cart.getCartItem().add(cartItem2);
		//
		//		customer.setCart(cart);
		//
		//		session.save(customer);

//		session.getTransaction().commit();
//		session.close();
//
		SpringApplication.run(TravelApplication.class, args);
	}

}
