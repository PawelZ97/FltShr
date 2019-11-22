package com.zychp.backendfltshr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BackendFltshrApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendFltshrApplication.class, args);
    }

}
