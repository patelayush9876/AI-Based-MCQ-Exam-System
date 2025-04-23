package com.quizz.quizzbackend.controller;

import com.quizz.quizzbackend.dto.QuizAssignmentRequest;
import com.quizz.quizzbackend.model.Quiz;
import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.QuizRepository;
import com.quizz.quizzbackend.repo.UserRepository;
import com.quizz.quizzbackend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/quiz")
public class QuizController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QuizService quizService;
    @Autowired
    private QuizRepository quizRepository;


    @PostMapping("/add-quiz")
    public ResponseEntity<String> uploadQuiz(
            @RequestParam("quizName") String quizName,
            @RequestParam("facultyId") String facultyId,
            @RequestParam("duration") Integer duration,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            Optional<User> user = userRepository.findByUsername(facultyId);
            if(user.isPresent()) {
                quizService.processQuizFile(quizName, duration, user.get(), file);
                return ResponseEntity.ok("Quiz uploaded and questions stored successfully!");
            }
            else
                return ResponseEntity.status(401).body("You are not unauthorized user");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to process quiz file: " + e.getMessage());
        }
    }

    @GetMapping("/quizzes")
    public ResponseEntity<?> getQuizzes(@RequestParam("facultyId") String facultyId) {
        Optional<User> user = userRepository.findByUsername(facultyId);
        if(user.isPresent())
            return ResponseEntity.ok(quizRepository.findByFaculty(user.get()));

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/{quizId}/assign")
    public String assignQuizToStudents(
            @PathVariable Long quizId,
            @RequestBody QuizAssignmentRequest request
    ) {
        System.out.println("Quiz Id : " + quizId);
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

        quiz.setStartTime(request.getStartTime());
        quiz.setEndTime(request.getEndTime());

        List<User> students = userRepository.findAllByUsernames(request.getStudentIds());
        quiz.getAssignedStudents().addAll(students);

        quizRepository.save(quiz);

        return "Quiz assigned successfully with schedule!";
    }

    @GetMapping("/{quizId}/attempt")
    public ResponseEntity<Object> attemptQuiz(@PathVariable Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(quiz.getStartTime()) || now.isAfter(quiz.getEndTime())) {
            // need to go through once
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Quiz is not Available at this time");
        }
        System.out.println("Quiz for Assessment : " + quiz);
        return ResponseEntity.ok(quiz);
    }

    @GetMapping("/assignedQuizzes/{username}")
    public List<Quiz> getAssignedQuizzes(@PathVariable String username) {
        return quizService.getAssignedQuizzes(username);
    }

    @GetMapping("/quiz/{quizId}")
    public Quiz getQuizById(@PathVariable Long quizId) {
        return quizRepository.findById(quizId).get();
    }

}
