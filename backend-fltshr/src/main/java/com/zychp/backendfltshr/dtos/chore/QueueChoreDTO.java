package com.zychp.backendfltshr.dtos.chore;

import com.zychp.backendfltshr.model.chore.QueueChore;
import lombok.Data;

@Data
public class QueueChoreDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean archived;

    public static QueueChoreDTO valueOf(QueueChore entity) {
        QueueChoreDTO dto = new QueueChoreDTO();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setArchived(entity.getArchived());
        return dto;
    }
}