package com.zychp.backendfltshr.model.chore.queuechores;

import lombok.Data;

@Data
public class QueueChoreCDTO {
    private String name;
    private String description;

    public static QueueChore valueOf(QueueChoreCDTO dto) {
        QueueChore entity = new QueueChore();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        return entity;
    }
}



