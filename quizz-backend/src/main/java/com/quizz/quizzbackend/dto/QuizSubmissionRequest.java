package com.quizz.quizzbackend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class QuizSubmissionRequest {
    private Long quizId;
    private String studentUsername;
    private Map<Long, String> answers; // Question ID -> Selected Option

    // Getters and Setters
}
