package com.alzheimerchatbot.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Abstract {
    @Id
    private Long id;  // Usando pubmed_id como ID
    private String content;

    public Abstract() {}
    public Abstract(Long id, String content) {
        this.id = id;
        this.content = content;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}