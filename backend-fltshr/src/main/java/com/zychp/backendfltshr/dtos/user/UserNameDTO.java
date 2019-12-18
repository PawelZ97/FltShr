package com.zychp.backendfltshr.dtos.user;

import com.zychp.backendfltshr.model.user.User;
import lombok.Data;

@Data
public class UserNameDTO {
    private Long id;
    private String username;

    public static UserNameDTO valueOf(User entity) {
        if(entity == null) {
            return null;
        }
        UserNameDTO dto = new UserNameDTO();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        return dto;
    }

    public static User valueOf(UserNameDTO dto) {
        User entity = new User();
        entity.setId(dto.getId());
        entity.setUsername(dto.getUsername());
        return entity;
    }
}
