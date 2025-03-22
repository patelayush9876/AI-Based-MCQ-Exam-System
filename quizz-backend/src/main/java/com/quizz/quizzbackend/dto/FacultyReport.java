package com.quizz.quizzbackend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@Builder
public class FacultyReport {
    Long quizId;
    String studentName;
    String studentId;
    Integer total;
    Integer obtained;
    Character grade;
}
