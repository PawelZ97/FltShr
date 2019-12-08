package com.zychp.backendfltshr.model.chore.frequentchores;

import com.zychp.backendfltshr.model.user.UserNameDTO;
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



