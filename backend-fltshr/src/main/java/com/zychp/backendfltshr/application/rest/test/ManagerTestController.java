package com.zychp.backendfltshr.application.rest.test;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
@PreAuthorize("hasRole('ROLE_MANAGER')")
public class ManagerTestController {
    @GetMapping
    public String managerMessage(){
        return "manager ok";
    }
}


