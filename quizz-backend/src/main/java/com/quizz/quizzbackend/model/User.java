package com.quizz.quizzbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String mobile;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role; // "ADMIN" or "TEACHER" or "STUDENT"

    private Date last_login;

    public enum Role {
        ADMIN, FACULTY, STUDENT
    }
    // Getters and setters
}