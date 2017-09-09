package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Breed;
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

import ch.qos.logback.core.net.SyslogOutputStream;

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
    
    @PostMapping("/registration/{token}/{breed}")
    public Response createDog(@PathVariable(value = "token") String token, @PathVariable(value = "breed") Long breed, @RequestBody Dog dog) {
    	
    	//System.out.println("qiuuosaidsalkndslkanlkasndka"+dog.getBreed().getId());
    	
    	Breed breedaux = new Breed();
    	breedaux.setId(breed);
    	dog.setBreed(breedaux);
    	
        boolean result = service.createDog(dog,token);
        
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
