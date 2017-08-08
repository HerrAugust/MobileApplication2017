package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
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
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;
    
    // EVENTS
    
    public List<Event> findEvents(String token) {
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
            
            return eventRepository.save(event);
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
	public Event updateEvent(String token, Event Event) {
		// TODO Auto-generated method stub
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

}
