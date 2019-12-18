package com.zychp.backendfltshr.controllers.user;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import com.zychp.backendfltshr.model.user.UserRegistrationDTO;
import com.zychp.backendfltshr.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping(path = "/users")
    ResponseEntity<List<UserNameDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping(path = "/register")
    ResponseEntity registerNewUser(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return ResponseEntity.ok(userService.registerNewUser(userRegistrationDTO));
    }

    @GetMapping(path = "/register/emailconfirm")
    ResponseEntity emailConfirm(@RequestParam("token") String confirmationToken) {
        return ResponseEntity.ok(userService.emailConfirm(confirmationToken));
    }
}
