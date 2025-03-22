package com.quizz.quizzbackend.controller;

import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/uploadStudent")
    public ResponseEntity<String> uploadStudents(@RequestBody List<User> students) {
        try {
            for (User student : students) {
                if (student.getUsername() == null || student.getName() == null || student.getMobile() == null) {
                    return ResponseEntity.badRequest().body("Invalid student data. All fields are required.");
                }
                student.setPassword(student.getMobile());
                student.setRole(User.Role.STUDENT);
            }
            userRepository.saveAll(students);
            return ResponseEntity.ok("Students uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading students: " + e.getMessage());
        }
    }

    @GetMapping("/students")
    public List<User> getFaculty() {
        return userRepository.findByRole(User.Role.STUDENT);
    }

}
