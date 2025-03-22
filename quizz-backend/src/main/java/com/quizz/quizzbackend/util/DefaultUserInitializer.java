package com.quizz.quizzbackend.util;

import com.quizz.quizzbackend.model.User;
import com.quizz.quizzbackend.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DefaultUserInitializer {

    @Autowired
    private UserRepository userRepository;

    @Bean
    public CommandLineRunner createDefaultUser() {
        return args -> {
            String username = "admin";
            if (userRepository.findByUsername(username).isEmpty()) {
                User defaultAdmin = new User();
                defaultAdmin.setUsername(username);
                defaultAdmin.setName("Admin");
                defaultAdmin.setMobile("1234567890");
//                defaultUser.setPassword(new BCryptPasswordEncoder().encode("password")); // Encrypted password
                defaultAdmin.setPassword("123");
                defaultAdmin.setRole(User.Role.ADMIN);
                userRepository.save(defaultAdmin);

                User defaultFaculty = new User();
                defaultFaculty.setUsername("faculty");
                defaultFaculty.setName("Faculty");
                defaultFaculty.setMobile("1234567890");
//                defaultFaculty.setPassword(new BCryptPasswordEncoder().encode("password")); // Encrypted password
                defaultFaculty.setPassword("123");
                defaultFaculty.setRole(User.Role.FACULTY);
                userRepository.save(defaultFaculty);

                User defaultStudent = new User();
                defaultStudent.setUsername("student");
                defaultStudent.setName("Student");
                defaultStudent.setMobile("1234567890");
//                defaultStudent.setPassword(new BCryptPasswordEncoder().encode("password")); // Encrypted password
                defaultStudent.setPassword("123");
                defaultStudent.setRole(User.Role.STUDENT);
                userRepository.save(defaultStudent);
                System.out.println("Default user created: " + username);
                System.out.println("Default user created: " + "faculty");
                System.out.println("Default user created: " + "student");
            } else {
                System.out.println("Default user already exists: " + username);
                System.out.println("Default user already exists: " + "faculty");
                System.out.println("Default user already exists: " + "student");
            }
        };
    }
}
