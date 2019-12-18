package com.zychp.backendfltshr.dtos.user;

import lombok.Data;

@Data
public class UserRegistrationDTO {
    private String username;
    private String password;
    private String email;
}
