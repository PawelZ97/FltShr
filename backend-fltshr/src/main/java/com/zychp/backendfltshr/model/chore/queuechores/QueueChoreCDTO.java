package com.zychp.backendfltshr.model.chore.queuechores;

import com.zychp.backendfltshr.model.user.UserNameDTO;
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



