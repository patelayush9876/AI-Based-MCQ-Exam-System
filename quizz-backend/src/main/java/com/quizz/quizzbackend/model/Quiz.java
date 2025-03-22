package com.quizz.quizzbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer duration;

    private Long passkey;

    private LocalDateTime startTime; // Schedule start time
    private LocalDateTime endTime;   // Schedule end time

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Question> questions; // Ensure it is a List<Question>

    @ManyToOne
    private User faculty;

    @ManyToMany
    @JoinTable(
            name = "quiz_student",
            joinColumns = @JoinColumn(name = "quiz_id"),
            inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<User> assignedStudents;
    // Getters and setters
}