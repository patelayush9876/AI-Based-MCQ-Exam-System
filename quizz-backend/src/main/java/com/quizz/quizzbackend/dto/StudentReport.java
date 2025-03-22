package com.quizz.quizzbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@Builder
public class StudentReport {
    Long quizId;
    String quizName;
    String assignedBy;
    Integer total;
    Integer obtained;
    Character grade;
}
