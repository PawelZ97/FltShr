package com.zychp.backendfltshr.domain.chores.queuechores;

import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AssignedQueueChoreDTO {
    private Long id;
    private UserNameDTO user;
    private QueueChoreDTO queueChore;
    private Timestamp assignDate;
    private Boolean done;
    private Timestamp doneDate;

    public static AssignedQueueChoreDTO valueOf(AssignedQueueChore entity) {
        AssignedQueueChoreDTO dto = new AssignedQueueChoreDTO();
        dto.setId(entity.getId());
        dto.setUser(UserNameDTO.valueOf(entity.getUser()));
        dto.setQueueChore(QueueChoreDTO.valueOf(entity.getQueueChore()));
        dto.setAssignDate(entity.getAssignDate());
        dto.setDone(entity.getDone());
        dto.setDoneDate(entity.getDoneDate());
        return dto;
    }
}

