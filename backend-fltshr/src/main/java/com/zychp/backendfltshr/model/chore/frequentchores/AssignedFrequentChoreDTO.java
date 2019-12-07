package com.zychp.backendfltshr.model.chore.frequentchores;

import com.zychp.backendfltshr.model.user.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AssignedFrequentChoreDTO {
    private Long id;
    private UserNameDTO assignedUser;
    private FrequentChoreDTO frequentChore;
    private Timestamp assignDate;
    private Boolean done;
    private Timestamp doneDate;
    private Boolean reassigned;

    public static AssignedFrequentChoreDTO valueOf(AssignedFrequentChore entity) {
        AssignedFrequentChoreDTO dto = new AssignedFrequentChoreDTO();
        dto.setId(entity.getId());
        dto.setAssignedUser(UserNameDTO.valueOf(entity.getAssignedUser()));
        dto.setFrequentChore(FrequentChoreDTO.valueOf(entity.getFrequentChore()));
        dto.setAssignDate(entity.getAssignDate());
        dto.setDone(entity.getDone());
        dto.setDoneDate(entity.getDoneDate());
        dto.setReassigned(entity.getReassigned());
        return dto;
    }
}

