package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.User;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    @PostMapping("/registration")
    public Response createDog(@RequestBody Dog dog) {
    	
    	dog.setDate_birth(null);
        boolean result = service.createDog(dog);
        
        Response<Object> response = new Response<>();
        response.setMessage("Ok");
//        response.setResult(result);
//        if (result) {
//            response.setMessage("Ok");
//        } else {
//            response.setMessage("User already exist");
//        }
        return response;
    }

}
