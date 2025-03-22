package com.quizz.quizzbackend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String questionText;

    @ElementCollection
    private List<String> options = new ArrayList<>();

    private String correctAnswer;


//    @ManyToOne
//    @JoinColumn(name="quiz_id")
//    private Quiz quiz;

    // Getters and Setters
    public void addOption(String option) {
        this.options.add(option);
    }
}
