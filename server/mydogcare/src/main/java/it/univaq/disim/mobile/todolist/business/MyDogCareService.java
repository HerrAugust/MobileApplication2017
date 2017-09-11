package it.univaq.disim.mobile.todolist.business;

import it.univaq.disim.mobile.todolist.business.domain.Disease;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.User;
import it.univaq.disim.mobile.todolist.business.domain.Breed;
import java.util.List;

public interface MyDogCareService {

    Session login(String username, String password);

    void logout(String token);

    boolean createUser(User user);

    void updateUser(String token, User user);

    Event createEvent(String token, Event Event);

    Event findEventByCode(String token, Long code);

    Event updateEvent(String token, Event Event);

    void deleteEvent(String token, Long id);
    
    List<Event> findEventsByDog(String token, Long collarid);
    
    List<Event> findEventsByUser(String token);
    
    List<Event> findEventsByDate(String token, String date);
    
	void toggleStartEvent(String token, Long id);

	List<Disease> findDiseases();
	
	List<Breed> findBreeds();

	boolean createDog(Dog dog, String token);
	
	List<Dog> findDogs(String token);
	

}
