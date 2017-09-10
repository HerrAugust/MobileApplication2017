package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Breed;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Task;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private MyDogCareService service;

    @PostMapping("/{token}/{dogid}")
    public Response createEvent(@PathVariable(value = "token") String token, @PathVariable(value = "dogid") Long dogid, @RequestBody Event event) {
    	System.out.println("event="+event.toString());
    	
    	Dog dogaux = new Dog();
    	dogaux.setId(dogid);
    	event.setDog(dogaux);
    	
        service.createEvent(token, event);
        Response<Event> response = new Response<>(true, "event created!");
        response.setData(event);
        return response;
    }
    
    @GetMapping("/test")
    public Response test() {
    	System.out.println("events/test started");
    	List<Event> events = new LinkedList<Event>();
    	Event e = new Event(); e.setCode((long) 999); e.setNote("This is a fake note");;
    	events.add(e);
        Response<List<Event>> response = new Response<>(true, "all events grouped");
        response.setData(events);
    	return response;
    }

    @GetMapping("/dog/{token}/{dogid}")
    public Response findAllEventsByDog(@PathVariable(value = "token") String token, @PathVariable(value = "dogid") Long dogid) {
    	List<Event> events = service.findEventsByDog(token, dogid);
        Response<List<Event>> response = new Response<>(true, "all events grouped by dog");
        response.setData(events);
    	return response;
    }
    
    @GetMapping("/{token}")
    public Response findAllEventsByUser(@PathVariable(value = "token") String token) {
    	List<Event> events = service.findEventsByUser(token);
        Response<List<Event>> response = new Response<>(true, "all events grouped by user");
        response.setData(events);
    	return response;
    }
    
    @GetMapping("/{token}/{code}")
    public Response findEventByCode(@PathVariable(value = "token") String token, @PathVariable(value = "code") Long code) {
        Event event = service.findEventByCode(token, code);
        Response<Event> response = new Response<>(true, "event by code");
        response.setData(event);
        return response;
    }

    @PutMapping("/{token}/{id}")
    public Response updateEvent(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id, @RequestBody Event event) {
        event.setCode(id);
        Event newEvent = service.updateEvent(token, event);
        Response<Event> response = new Response<>(true, "event updated");
        response.setData(newEvent);
        return response;
    }

    @DeleteMapping("/{token}/{id}")
    public Response deleteEvent(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id) {
        service.deleteEvent(token, id);
        Response<Object> response = new Response<>(true, "event deleted");
        return response;
    }
    
    @GetMapping("/starred/{token}/{id}")
    public Response toggleStar(@PathVariable(value="token") String token, @PathVariable(value="id") Long id) {
    	System.out.println("toggleStart()");
    	service.toggleStartEvent(token, id);
    	Response<Event> response = new Response<>(true, "toggle star event");
    	return response;
    }

}
