package com.zychp.backendfltshr.dtos.chore;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.model.chore.QueueChore;
import lombok.Data;

@Data
public class QueueChoreCDTO {
    private String name;
    private String description;
    private UserNameDTO firstUser;

    public static QueueChore valueOf(QueueChoreCDTO dto) {
        QueueChore entity = new QueueChore();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}



