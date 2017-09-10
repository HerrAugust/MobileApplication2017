package it.univaq.disim.mobile.todolist.business.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.apache.tomcat.util.codec.binary.Base64;

import java.util.Date;

@Entity
@Table(name = "dog")
public class Dog implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
	
    @Column(name = "collarid", nullable = false)
    private Long collarid;

	@Column(name = "age", nullable = false)
    private Long age;
	
	@Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "gender", nullable = false, length = 1)
    private String gender;
	
	@Column(name = "src", nullable = false, length = 255)
    private String src;
    

	@JsonIgnore
    @ManyToOne
	@JoinColumn(name = "breedid", nullable = false)
    private Breed breed;
    

	@Column(name = "date_birth", nullable = false)
    private String date_birth;

	@JsonIgnore
    @ManyToOne /* A user has many dogs; an event belongs to one user. So, many events belong to one user */
    @JoinColumn(name="own", nullable = false)
    private User user;
  
	

	public Breed getBreed() {
		return breed;
	}

	public void setBreed(Breed breed) {
		this.breed = breed;
	}

	public Long getAge() {
		return age;
	}

	public void setAge(Long age) {
		this.age = age;
	}
    
    public String getDate_birth() {
		return date_birth;
	}

	public void setDate_birth(String date_birth) {
		this.date_birth = date_birth;
	}
	
    public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCollarId() {
		return collarid;
	}

	public void setCollarId(Long collarId) {
		this.collarid = collarId;
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
	
    public String getSrc() {
	    return this.src;
    	/* Debug
	File f =  new File(src);
        String encodstring = encodeFileToBase64Binary(f);
    	return encodstring;*/
    }
   
    /* Needed for debug
    private static String encodeFileToBase64Binary(File file){
    	String encodedfile = null;
    
         try {
             FileInputStream fileInputStreamReader = new FileInputStream(file);
             byte[] bytes = new byte[(int)file.length()];
             fileInputStreamReader.read(bytes);
             encodedfile = new String(Base64.encodeBase64(bytes), "UTF-8");
         } catch (FileNotFoundException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         } catch (IOException e) {
             // TODO Auto-generated catch block
             e.printStackTrace();
         }

         System.out.println(encodedfile);
         return encodedfile;
	}*/

	public void setSrc(String src) {
		this.src = src;
	}

}
