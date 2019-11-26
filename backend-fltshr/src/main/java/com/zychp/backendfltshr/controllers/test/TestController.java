package com.zychp.backendfltshr.controllers.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String getAdminMessage(){
        return "admin ok";
    }

    @GetMapping("/manager")
    @PreAuthorize("hasRole('ROLE_MANAGER')")
    public String managerMessage(){
        return "manager ok";
    }

    @GetMapping("/user")
    public String userMessage(){
        return "user ok";
    }

    @Autowired
    public JavaMailSender emailSender;

    @GetMapping("/all")
    public String allMessage() {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo("pawelzych97@gmail.com");
            message.setSubject("Test message From Java");
            message.setText("Test message internal");
            emailSender.send(message);
            return "OK";
    }
}
