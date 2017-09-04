package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Dog;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dogs")
public class DogController {

    @Autowired
    private MyDogCareService service;

    @GetMapping("/all/{token}")
    public Response getAllDogs(@PathVariable(value = "token") String token) {
    	List<Dog> dogs = service.findDogs(token);
        Response<List<Dog>> response = new Response<>(true, "all dogs");
		response.setData(dogs);
    	return response;
    }

}
