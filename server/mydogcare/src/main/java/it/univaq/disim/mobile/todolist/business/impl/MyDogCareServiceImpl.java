package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Disease;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.Task;
import it.univaq.disim.mobile.todolist.business.domain.User;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MyDogCareServiceImpl implements MyDogCareService {
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private DiseaseRepository diseaseRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private DogRepository dogRepository;
    
    // EVENTS
    
    public List<Event> findEventsByDog(String token, Long collarid) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return eventRepository.findByDogOrderByDetailtimestampAsc(collarid);
            
        } else {
            return new ArrayList<>();
        }
    }
    
    public List<Event> findEventsByUser(String token) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return eventRepository.findByUserIdOrderByDetailtimestampAsc(session.getUser().getId());
            
        } else {
            return new ArrayList<>();
        }
    }
    
    @Override
	public Event createEvent(String token, Event event) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
            event.setUser(session.getUser());
            
            Event newevent = eventRepository.save(event);
            return newevent;
        }
        return null;
	}

	@Override
	public Event findEventByCode(String token, Long code) {
		Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return eventRepository.findByCode(code);
            
        }
        return new Event();
	}

	@Override
	public Event updateEvent(String token, Event newEvent) {
		Session session = sessionRepository.findByToken(token);
        if (session != null) {
            Event event = eventRepository.findOne(newEvent.getCode());
            if (event != null && event.getUser().getId() == session.getUser().getId()) {
                event.setDetailtimestamp(newEvent.getDetailtimestamp());
                event.setDetailtimestamp_end(newEvent.getDetailtimestamp_end());
                event.setNote(newEvent.getNote());
                event.setPlace(newEvent.getPlace());
                event.setStarred(newEvent.getStarred());
                event.setType(newEvent.getType());
                event.setVaccinevisit(newEvent.getVaccinevisit());
                return event;
            }
        }
        return null;
	}

	@Override
	public void deleteEvent(String token, Long id) {
		Session session = sessionRepository.findByToken(token);
        if (session != null) {
            eventRepository.delete(id);
        }
	}
	
	// USERS

    @Override
    public Session login(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            Session session = new Session();
            session.setUser(user);
            session.setToken(Utility.generateToken());
            Session newSession = sessionRepository.save(session);
            return newSession;
        } else {
            return null;
        }
    }

    @Override
    public void logout(String token) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            sessionRepository.delete(session);
        }
    }

    @Override
    public boolean createUser(User user) {
        User u = userRepository.findByUsername(user.getUsername());
        if (u != null) {
            return false;
        }
        userRepository.save(user);
        return true;
    }

    @Override
    public void updateUser(String token, User user) {
        Session session = sessionRepository.findByToken(token);
        if (session != null) {
            User oldUser = session.getUser();
            oldUser.setFirstname(user.getFirstname());
            oldUser.setLastname(user.getLastname());
            oldUser.setEmail(user.getEmail());
        }

    }

	@Override
	public void updateOrderEvents(String token, List<Event> Events) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void toggleStartEvent(String token, Long id) {
		Session session = sessionRepository.findByToken(token);
		if(session != null) {
			Event event = this.findEventByCode(token, id);
			boolean starred = event.getStarred();
			event.setStarred(!starred);
		}
	}

	// DISEASES
	
	@Override
	public List<Disease> findDiseases() {
		List<Disease> diseases = diseaseRepository.findAll();
		diseases.forEach(System.out::println);
		return diseases;
	}
	
	// DOGS

	@Override
	public List<Dog> findDogs(String token) {
		Session session = sessionRepository.findByToken(token);
		if (session != null) {
			List<Dog> dogs = dogRepository.findByUserId(session.getUser().getId());
			dogs.forEach(System.out::println);
			return dogs;
		}
		return new ArrayList<>();
	}

}
