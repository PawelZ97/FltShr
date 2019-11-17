package com.zychp.backendfltshr.domain.chores.frequentchores;

import com.zychp.backendfltshr.domain.user.dto.UserNameDTO;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class AssignedFrequentChoreDTO {
    private Long id;
    private UserNameDTO assignedUser;
    private FrequentChoreDTO frequentChoreDTO;
    private Timestamp assignDate;
    private Boolean done;
    private Timestamp doneDate;

    public static AssignedFrequentChoreDTO valueOf(AssignedFrequentChore entity) {
        AssignedFrequentChoreDTO dto = new AssignedFrequentChoreDTO();
        dto.setId(entity.getId());
        dto.setAssignedUser(UserNameDTO.valueOf(entity.getUserAssigned()));
        dto.setFrequentChoreDTO(FrequentChoreDTO.valueOf(entity.getFrequentChore()));
        dto.setAssignDate(entity.getAssignDate());
        dto.setDone(entity.getDone());
        dto.setDoneDate(entity.getDoneDate());
        return dto;
    }
}

