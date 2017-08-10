package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
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

    @PostMapping("/{token}")
    public Response createEvent(@PathVariable(value = "token") String token, @RequestBody Event event) {
    	System.out.println("event="+event.toString());
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

    @GetMapping("/{token}")
    public Response findAllEvents(@PathVariable(value = "token") String token) {
    	List<Event> events = service.findEvents(token);
        Response<List<Event>> response = new Response<>(true, "all events grouped");
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

    /*@PutMapping("/{token}/{id}")
    public Response updateTask(@PathVariable(value = "token") String token, @PathVariable(value = "id") Long id, @RequestBody Task task) {
        task.setId(id);
        Task newTask = service.updateTask(token, task);
        Response<Task> response = new Response<>(true, "task updated");
        response.setData(newTask);
        return response;
    }*/

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
