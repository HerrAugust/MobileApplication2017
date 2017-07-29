package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.TodoListService;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.Task;
import it.univaq.disim.mobile.todolist.business.domain.User;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MyDogCareServiceImpl implements MyDogCareService {

    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;
    
    public List<Event> findEvents(String token) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
            /*
            Set<Task> tasks = session.getUser().getTasks();
            return Arrays.asList(tasks.toArray(new Task[0]));
            */
        	//System.out.println(session.getUser().getId());
            return eventRepository.findByUserId(session.getUser().getId());
            
        } else {
            return new ArrayList<>();
        }
    }

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
	public Event createEvent(String token, Event Event) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Event> findAllEvents(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Event findEventById(String token, Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Event updateEvent(String token, Event Event) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteEvent(String token, Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateOrderEvents(String token, List<Event> Events) {
		// TODO Auto-generated method stub
		
	}

	

}
