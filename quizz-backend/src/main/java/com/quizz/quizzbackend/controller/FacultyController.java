package com.quizz.quizzbackend.controller;

import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/faculty")
public class FacultyController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add-faculty")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        user.setRole(User.Role.FACULTY);
        user.setPassword(user.getMobile());
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/faculties")
    public List<User> getFaculty() {
        return userRepository.findByRole(User.Role.FACULTY);
    }

}
