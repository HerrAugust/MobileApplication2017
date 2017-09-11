package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Disease;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.User;
import it.univaq.disim.mobile.todolist.business.domain.Breed;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
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
    
    @Autowired
    private BreedRepository breedRepository;
    
    // EVENTS
    
    public List<Event> findEventsByDog(String token, Long dogid) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
            return eventRepository.findByDogIdOrderByDetailtimestampAsc(dogid);
            
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
    
    // date = "12-03-2017"
    public List<Event> findEventsByDate(String token, String date) {
    	Session session = sessionRepository.findByToken(token);
        if (session != null) {
        	String[] s = date.split("-");
        	String day = s[2];
        	day = day.length() == 1 ? '0' + day : day;
        	String month = s[1];
        	month = month.length() == 1 ? '0' + month : month;
        	String year = s[0];
        	String mydate = String.format("%s-%s-%s", year, month, day);
        	System.out.println("mydate="+mydate);
            return eventRepository.findByUserIdAndDetailtimestampOrderByDetailtimestampAsc(session.getUser().getId(), mydate);
            
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
	
	// BREEDS
	
		@Override
		public List<Breed> findBreeds() {
			List<Breed> breeds = breedRepository.findAll();
			breeds.forEach(System.out::println);
			return breeds;
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
	
	@Override
    public boolean createDog(Dog dog, String token) {
//		User u = userRepository.findByUsername(user.getUsername());
//        if (u != null) {
//            return false;
//        }
		
		Session session = sessionRepository.findByToken(token);
        if (session != null) {
            dog.setUser(session.getUser());
            
//            Breed aux = new Breed();
//            aux = dog.getBreed();
//            dog.setBreed(aux);
//            System.out.println(dog.getBreed());
//            
            
            dogRepository.save(dog);
            return true;
        }
	        dogRepository.save(dog);
	        return true;
    }
	
	
	@Override
	public Dog updateDog(String token, Dog dog, Long collar) {
		Session session = sessionRepository.findByToken(token);
        
		Dog newDog = dogRepository.findOne(dog.getId());
		
        newDog.setName(dog.getName());
        newDog.setAge(dog.getAge());
        newDog.setDate_birth(dog.getDate_birth());
        newDog.setGender(dog.getGender());
            
        return newDog;
           
        }

}
