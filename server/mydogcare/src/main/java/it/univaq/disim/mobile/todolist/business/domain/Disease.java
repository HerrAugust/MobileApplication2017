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
//(icdcode INT UNSIGNED PRIMARY KEY AUTOINCREMENT, name VARCHAR(64));
@Entity
@Table(name = "disease")
public class Disease implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "icdcode")
    private Long icdcode;
    
	@Column(name = "name", nullable = false, length = 4000)
    private String name;

    public Long getIcdcode() {
		return icdcode;
	}

	public void setIcdcode(Long icdcode) {
		this.icdcode = icdcode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}   
	
	@Override
	public String toString() {
		return "icdcode: "+this.getIcdcode() + "; name: " + this.getName();
	}


}
