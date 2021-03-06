package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.domain.Breed;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

// Look at http://docs.spring.io/spring-data/jpa/docs/1.6.5.RELEASE/reference/html/jpa.repositories.html
// to understand how it works
public interface BreedRepository extends JpaRepository<Breed, Long> {

    List<Breed> findAll();

	Breed findById(Long breed_id);

}
