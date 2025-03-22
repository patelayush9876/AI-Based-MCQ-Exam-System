package com.quizz.quizzbackend.repo;

import com.quizz.quizzbackend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByStudentUsername(String studentUsername);

    Report findByQuizId(Long quizId);
}