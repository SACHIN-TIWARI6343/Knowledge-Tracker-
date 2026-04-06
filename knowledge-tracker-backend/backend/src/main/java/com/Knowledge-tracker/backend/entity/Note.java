package com.Knowledge.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity //  it tells JPA/Hibernate to create  a database table from this class
public class Note {

    @Id // to define primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // so that database automatically id generate kare
    private Long id;

    private String title;
    private String description;
    private String category;
    private String status;
    private LocalDateTime createdAt;

    public Note() {
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}