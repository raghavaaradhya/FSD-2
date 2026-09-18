package com._BDS3A.PaginationAndSorting.Model;
import java.util.List;
 
import com.fasterxml.jackson.annotation.JsonIgnore;
 
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
 
@Entity
@Table(name = "accounts")
public class Account {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    private String username;
 
    private String platform;
 
    @OneToMany(mappedBy = "account")
    @JsonIgnore
    private List<Post> posts;
 
    public Account() {
    }
 
    public Account(String username, String platform) {
        this.username = username;
        this.platform = platform;
    }
 
    public Long getId() {
        return id;
    }
 
    public String getUsername() {
        return username;
    }
 
    public String getPlatform() {
        return platform;
    }
 
    public List<Post> getPosts() {
        return posts;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public void setPlatform(String platform) {
        this.platform = platform;
    }
}