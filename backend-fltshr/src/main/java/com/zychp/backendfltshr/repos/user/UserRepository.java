package com.zychp.backendfltshr.repos.user;

import com.zychp.backendfltshr.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsernameAndDeactivatedIsFalse(String username);

    User findByUsernameAndDeactivatedIsFalseAndEmailVerifiedIsTrue(String username);

    List<User> findAllByDeactivatedIsFalseAndEmailVerifiedIsTrue();

    Boolean existsUserByUsernameEqualsOrEmailEquals(String username, String email);
}

