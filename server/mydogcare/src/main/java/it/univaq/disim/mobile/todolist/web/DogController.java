package it.univaq.disim.mobile.todolist.web;

import it.univaq.disim.mobile.todolist.business.MyDogCareService;
import it.univaq.disim.mobile.todolist.business.domain.Breed;
import it.univaq.disim.mobile.todolist.business.domain.Dog;
import it.univaq.disim.mobile.todolist.business.domain.Event;
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
    
    @PostMapping("/registration/{token}/{collarid}/{breed}")
    public Response createDog(@PathVariable(value = "token") String token, @PathVariable(value = "collarid") Long collar, @PathVariable(value = "breed") Long breed, @RequestBody Dog dog) {
    	
    	System.out.println("Collar of dog in server:"+ dog.getCollarId());
    	Breed breedaux = new Breed();
    	breedaux.setId(breed);
    	dog.setBreed(breedaux);
    	dog.setCollarId(collar);
    	
        boolean result = service.createDog(dog,token);
        
        Response<Object> response = new Response<>();
        response.setMessage("Ok");
        return response;
    }
    
    @PutMapping("/edit/{token}/{collarid}")
    public Response editDog(@PathVariable(value = "token") String token, @PathVariable(value = "collarid") Long collar, @RequestBody Dog dog) {
    	
        
    	Dog newDog = service.updateDog(token, dog, collar);
    	
    	Response<Dog> response = new Response<>(true, "event updated");
        response.setData(newDog);
        return response;
      
    }
    
}
