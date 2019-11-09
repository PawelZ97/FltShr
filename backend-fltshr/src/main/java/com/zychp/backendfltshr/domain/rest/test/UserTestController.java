package com.zychp.backendfltshr.domain.rest.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserTestController {

    @GetMapping
    public String userMessage(){
        return "user ok";
    }
}