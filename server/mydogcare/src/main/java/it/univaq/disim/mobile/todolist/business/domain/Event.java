package it.univaq.disim.mobile.todolist.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Event implements java.io.Serializable {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private Long code;

	@Column(name = "note", nullable = true, length = 4000)
    private String note;
    
    @Column(name = "vaccinevisit", nullable = false)
    private String vaccinevisit;
    
    @Column(name="detailtimestamp_start", nullable = false)
    private String detailtimestamp;
    
    @Column(name="detailtimestamp_end", nullable = false)
    private String detailtimestamp_end;
    
    @Column(name="place", nullable = false)
    private String place;
    
    @Column(name="starred", nullable = false)
    private Boolean starred;

    @JsonIgnore
    @ManyToOne(cascade = { CascadeType.PERSIST,
    		CascadeType.MERGE })
    @JoinColumn(name="type")
    private Disease type;
    
    @JsonIgnore
    @ManyToOne /* A user has many events; an event belongs to one user. So, many events belong to one user */
    @JoinColumn(name="userid", nullable = false)
    private User user;

	public Long getCode() {
		return code;
	}

	public void setCode(Long code) {
		this.code = code;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getVaccinevisit() {
		return vaccinevisit;
	}

	public void setVaccinevisit(String vaccinevisit) {
		this.vaccinevisit = vaccinevisit;
	}

	public Disease getType() {
		return type;
	}

	public void setType(Disease type) {
		this.type = type;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public Boolean getStarred() {
		return starred;
	}

	public void setStarred(Boolean starred) {
		this.starred = starred;
	}

	public String getDetailtimestamp_end() {
		return detailtimestamp_end;
	}

	public void setDetailtimestamp_end(String detailtimestamp_end) {
		this.detailtimestamp_end = detailtimestamp_end;
	}

	public String getDetailtimestamp() {
		return detailtimestamp;
	}

	public void setDetailtimestamp(String detailtimestamp) {
		this.detailtimestamp = detailtimestamp;
	}


}
