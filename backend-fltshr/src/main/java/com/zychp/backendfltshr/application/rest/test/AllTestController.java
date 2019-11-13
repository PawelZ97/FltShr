package com.zychp.backendfltshr.application.rest.test;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/all")
public class AllTestController {
    @GetMapping
    public String allMessage() {
        return "All ok";
    }
}
