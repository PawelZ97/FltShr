package com.zychp.backendfltshr.services;

import com.zychp.backendfltshr.model.user.User;
import com.zychp.backendfltshr.model.user.UserNameDTO;
import com.zychp.backendfltshr.repos.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public List<UserNameDTO> getUsers() {
        List<User> users = userRepository.findAll();
        users.remove(0);
        users.remove(0);
        log.info("getUsers()");
        return users.stream().map(UserNameDTO::valueOf).collect(Collectors.toList());
    }
}
