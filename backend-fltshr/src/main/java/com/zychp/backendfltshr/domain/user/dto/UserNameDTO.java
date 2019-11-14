package com.zychp.backendfltshr.domain.user.dto;

import com.zychp.backendfltshr.domain.user.User;
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
}
