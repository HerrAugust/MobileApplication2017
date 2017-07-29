package it.univaq.disim.mobile.todolist.business;

import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.User;
import java.util.List;

public interface MyDogCareService {

    Session login(String username, String password);

    void logout(String token);

    boolean createUser(User user);

    void updateUser(String token, User user);

    Event createEvent(String token, Event Event);

    List<Event> findAllEvents(String username);

    Event findEventById(String token, Long id);

    Event updateEvent(String token, Event Event);

    void deleteEvent(String token, Long id);

    void updateOrderEvents(String token, List<Event> Events);
    
    List<Event> findEvents(String token);

}
