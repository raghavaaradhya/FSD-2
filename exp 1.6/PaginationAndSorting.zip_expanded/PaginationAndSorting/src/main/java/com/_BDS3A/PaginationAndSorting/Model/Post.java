package com._BDS3A.PaginationAndSorting.Model;
import jakarta.persistence.*;

import java.time.LocalDateTime;

 

@Entity

@Table(name = "posts")

public class Post {

 

    @Id

    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

 

    private String title;

 

    @Column(length = 2000)

    private String content;

 

    private int likes;

 

    private int comments;

 

    private int views;

 

    private LocalDateTime createdAt;

 

    @ManyToOne(fetch = FetchType.LAZY)

    @JoinColumn(name = "account_id")

    private Account account;

 

    public Post() {

    }

 

    public Post(String title, String content,

                int likes, int comments,

                int views, LocalDateTime createdAt,

                Account account) {

 

        this.title = title;

        this.content = content;

        this.likes = likes;

        this.comments = comments;

        this.views = views;

        this.createdAt = createdAt;

        this.account = account;

    }

 

    public Long getId() {

        return id;

    }

 

    public String getTitle() {

        return title;

    }

 

    public String getContent() {

        return content;

    }

 

    public int getLikes() {

        return likes;

    }

 

    public int getComments() {

        return comments;

    }

 

    public int getViews() {

        return views;

    }

 

    public LocalDateTime getCreatedAt() {

        return createdAt;

    }

 

    public Account getAccount() {

        return account;

    }

 

    public void setTitle(String title) {

        this.title = title;

    }

 

    public void setContent(String content) {

        this.content = content;

    }

 

    public void setLikes(int likes) {

        this.likes = likes;

    }

 

    public void setComments(int comments) {

        this.comments = comments;

    }

 

    public void setViews(int views) {

        this.views = views;

    }

 

    public void setCreatedAt(LocalDateTime createdAt) {

        this.createdAt = createdAt;

    }

 

    public void setAccount(Account account) {

        this.account = account;

    }

}


