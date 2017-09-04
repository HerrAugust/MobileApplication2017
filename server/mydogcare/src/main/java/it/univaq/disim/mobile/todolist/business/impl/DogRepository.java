package it.univaq.disim.mobile.todolist.business.impl;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import it.univaq.disim.mobile.todolist.business.domain.Dog;

public interface DogRepository extends JpaRepository<Dog, Long> {

	List<Dog> findAll();
	
    List<Dog> findByUserId(@Param("userid") Long userid);

}