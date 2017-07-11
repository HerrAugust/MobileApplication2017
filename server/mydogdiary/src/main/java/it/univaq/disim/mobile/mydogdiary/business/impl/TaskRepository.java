package it.univaq.disim.mobile.mydogdiary.business.impl;

import it.univaq.disim.mobile.mydogdiary.business.domain.Task;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserIdOrderByPosition(Long userId);

}
