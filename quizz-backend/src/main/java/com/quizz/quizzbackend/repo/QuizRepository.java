package com.quizz.quizzbackend.repo;

import com.quizz.quizzbackend.model.Quiz;
import com.quizz.quizzbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByFaculty(User faculty);

    @Query("SELECT q FROM Quiz q JOIN q.assignedStudents s WHERE s.username = :username")
    List<Quiz> findQuizzesByStudentUsername(@Param("username") String username);
}
