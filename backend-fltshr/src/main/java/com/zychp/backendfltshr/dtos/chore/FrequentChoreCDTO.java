package com.zychp.backendfltshr.dtos.chore;

import com.zychp.backendfltshr.dtos.user.UserNameDTO;
import com.zychp.backendfltshr.model.chore.FrequentChore;
import lombok.Data;

@Data
public class FrequentChoreCDTO {
    private String name;
    private String description;
    private Long durationDays;
    private Long frequencyDays;
    private UserNameDTO user;
    private String date;

    public static FrequentChore valueOf(FrequentChoreCDTO dto) {
        FrequentChore entity = new FrequentChore();
        entity.setName(dto.getName());
        entity.setDescription(dto.getDescription());
        entity.setDurationDays(dto.getDurationDays());
        entity.setFrequencyDays(dto.getFrequencyDays());
        return entity;
    }
}



