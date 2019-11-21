package com.zychp.backendfltshr.repos;

import java.util.Optional;

import com.zychp.backendfltshr.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}

