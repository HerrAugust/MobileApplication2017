package it.univaq.disim.mobile.mydogdiary.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "events")
public class Event implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code")
    private long code;
    
    @Column(name = "note", nullable = true, length = 4000)
    private String note;
    
    @Column(name = "vaccine_visit", nullable = false)
    private String vaccine_visit;

    @Column(name = "type", nullable = false)
    private long type;
    
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public long getCode() {
		return code;
	}

	public void setCode(long code) {
		this.code = code;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getVaccine_visit() {
		return vaccine_visit;
	}

	public void setVaccine_visit(String vaccine_visit) {
		this.vaccine_visit = vaccine_visit;
	}

	public long getType() {
		return type;
	}

	public void setType(long type) {
		this.type = type;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
