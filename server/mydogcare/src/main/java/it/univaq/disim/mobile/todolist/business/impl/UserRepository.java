package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

// Look at http://docs.spring.io/spring-data/jpa/docs/1.6.5.RELEASE/reference/html/jpa.repositories.html
// to understand how it works
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
