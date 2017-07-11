package it.univaq.disim.mobile.mydogdiary.business.impl;

import it.univaq.disim.mobile.mydogdiary.business.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}
