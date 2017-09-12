package it.univaq.disim.mobile.todolist.business.impl;

import it.univaq.disim.mobile.todolist.business.domain.Event;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends JpaRepository<Event, Long> {
	
	//@Query(value = "select ev.code as code5_3_, ev.detailtimestamp_start as detailti6_3_, ev.detailtimestamp_end as detailti7_3_, ev.note as note8_3_, ev.place as place9_3_, ev.starred as starred10_3_, ev.type as type13_3_, ev.userid as userid14_3_, ev.vaccinevisit as vaccine11_3_ from dogevents de inner join events ev on ev.code=de.event where de.dog=:collarid order by ev.detailtimestamp_start asc", nativeQuery = true)
	List<Event> findByDogIdOrderByDetailtimestampAsc(@Param("dogid") Long dogid);
	
	List<Event> findByUserIdOrderByDetailtimestampAsc(@Param("userid") Long userid);
	
	@Query(value = "select * from events where userid=:userid and (:detailtimestamp BETWEEN DATE(detailtimestamp_start) AND DATE(detailtimestamp_end)) OR DATE(detailtimestamp_start)=:detailtimestamp OR DATE(detailtimestamp_end)=:detailtimestamp order by detailtimestamp_start asc", nativeQuery = true)
	List<Event> findByUserIdAndDetailtimestampOrderByDetailtimestampAsc(@Param("userid") Long userid, @Param("detailtimestamp") String detailtimestamp);
	
	Event findByCode(@Param("code") Long code);
}
