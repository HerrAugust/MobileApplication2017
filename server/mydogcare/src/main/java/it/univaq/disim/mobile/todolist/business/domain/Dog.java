package it.univaq.disim.mobile.todolist.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "dog")
public class Dog implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collarid")
    private Long collarId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "gender", nullable = false, length = 1)
    private String gender;
    
    @JsonIgnore
    @ManyToOne /* A user has many dogs; an event belongs to one user. So, many events belong to one user */
    @JoinColumn(name="own", nullable = false)
    private User user;
  
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getCollarId() {
        return collarId;
    }

    public void setCollarId(Long id) {
        this.collarId = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


}
