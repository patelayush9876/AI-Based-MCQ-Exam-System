package com.quizz.quizzbackend;

import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class QuizzBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(QuizzBackendApplication.class, args);
        System.out.println("\n\nApplication Started .................................");

    }
    
}
