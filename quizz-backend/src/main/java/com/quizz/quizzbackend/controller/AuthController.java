package com.quizz.quizzbackend.controller;

import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/user")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
//    @Autowired
//    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        System.out.println("Username : "+ username +" Password : "+password);
        Optional<User> user = userRepository.findByUsernameAndPassword(username, password);
//        System.out.println("User : "+user.get());
        if (user.isPresent()) {
            return ResponseEntity.ok(user);
        }
        System.out.println("\nSomething went wrong..........\n");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateFaculty(@RequestBody User user){
        Optional<User> userData = userRepository.findByUsername(user.getUsername());
        if (userData.isPresent()){
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Updated Successfully");
        }
        return ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFaculty(@RequestParam String username){
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()){
            userRepository.delete(user.get());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted Successfully");
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build();
    }
}
