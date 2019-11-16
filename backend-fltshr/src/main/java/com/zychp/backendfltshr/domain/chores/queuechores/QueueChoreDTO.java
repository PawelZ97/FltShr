package com.zychp.backendfltshr.domain.chores.queuechores;

import lombok.Data;

@Data
public class QueueChoreDTO {
    private Long id;
    private String name;
    private String description;

    public static QueueChoreDTO valueOf(QueueChore entity) {
        QueueChoreDTO dto = new QueueChoreDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        return dto;
    }
}