package com.quizz.quizzbackend.repo;

import com.quizz.quizzbackend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
//    List<Question> findByQuizName(String quizName);
}
