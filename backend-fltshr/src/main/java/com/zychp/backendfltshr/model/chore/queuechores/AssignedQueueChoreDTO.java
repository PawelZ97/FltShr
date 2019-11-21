package com.zychp.backendfltshr.model.chore.queuechores;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AssignedQueueChoreDTO {
    private Long id;
    private UserNameDTO assignedUser;
    private QueueChoreDTO queueChore;
    private Timestamp assignDate;
    private Boolean done;
    private Timestamp doneDate;

    public static AssignedQueueChoreDTO valueOf(AssignedQueueChore entity) {
        AssignedQueueChoreDTO dto = new AssignedQueueChoreDTO();
        dto.setId(entity.getId());
        dto.setAssignedUser(UserNameDTO.valueOf(entity.getAssignedUser()));
        dto.setQueueChore(QueueChoreDTO.valueOf(entity.getQueueChore()));
        dto.setAssignDate(entity.getAssignDate());
        dto.setDone(entity.getDone());
        dto.setDoneDate(entity.getDoneDate());
        return dto;
    }
}

