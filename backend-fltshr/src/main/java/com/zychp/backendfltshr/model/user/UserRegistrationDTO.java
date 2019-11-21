package com.zychp.backendfltshr.model.user;

import lombok.Data;

@Data
public class UserRegistrationDTO {
    private String username;
    private String password;
    private String email;
}
