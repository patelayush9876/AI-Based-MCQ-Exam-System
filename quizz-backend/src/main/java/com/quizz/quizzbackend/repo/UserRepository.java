package com.quizz.quizzbackend.repo;

import com.quizz.quizzbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    Optional<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.username IN :usernames")
    List<User> findAllByUsernames(@Param("usernames") List<String> usernames);

    List<User> findByRole(User.Role role);

}
