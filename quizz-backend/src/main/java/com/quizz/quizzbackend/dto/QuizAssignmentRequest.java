package com.quizz.quizzbackend.dto;

import com.quizz.quizzbackend.model.User;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@ToString
@Setter
@Getter
public class QuizAssignmentRequest {
    private List<String> studentIds;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // Getters and setters
}
