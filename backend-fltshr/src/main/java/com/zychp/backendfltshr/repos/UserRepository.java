package com.zychp.backendfltshr.repos;

import com.zychp.backendfltshr.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsUserByUsernameEqualsOrEmailEquals(String username, String email);
}

