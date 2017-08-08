package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.domain.Event;
import it.univaq.disim.mobile.todolist.business.domain.Task;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends JpaRepository<Event, Long> {
	//Server centered version:
	// For more info see https://stackoverflow.com/questions/36328063/how-to-return-a-custom-object-from-a-spring-data-jpa-group-by-query
	//@Query("select new it.univaq.disim.mobile.todolist.business.domain.TopEventDTO(event0_.code, event0_.vaccinevisit, event0_.detailtimestamp, count(event0_.code)) from Event event0_ where event0_.user.id=:userid group by detailtimestamp")
    //List<TopEventDTO> findByUserIdOrderByDetailtimestamp(@Param("userid") Long userid);
	
	// Client centered version:
	List<Event> findByUserIdOrderByDetailtimestampAsc(@Param("userid") Long userid);
	
	Event findByCode(@Param("code") Long code);
}
