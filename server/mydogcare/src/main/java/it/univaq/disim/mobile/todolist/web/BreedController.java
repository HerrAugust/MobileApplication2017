package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Breed;
import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Session;
import it.univaq.disim.mobile.todolist.business.domain.User;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/breeds")
public class BreedController {

    @Autowired
    private MyDogCareService service;

    @GetMapping("/")
    public Response getAllBreeds() {
//    	List<Breed> breeds = service.findBreeds();
//        Response<List<Breed>> response = new Response<>(true, "all breeds");
//        response.setData(breeds);
//      
    	List<Breed> breeds = service.findBreeds();
    	Response<List<Breed>> response = new Response<>(true, "all breeds");
    	response.setData(breeds);
    	
    	return response;
    }

}
